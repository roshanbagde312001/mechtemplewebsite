// Lab Core Web Vitals measurement with the locally installed Chrome (no npm dependencies; Node 22+ built-in WebSocket).
// Emulates a mid-range phone like Lighthouse's mobile preset: 412x823 viewport, 4x CPU slowdown, ~1.6 Mbps / 150 ms RTT.
// Measures LCP, CLS, TTFB, FCP, total blocking time (long tasks over 50 ms) and bytes transferred by type.
// INP needs real user interactions, so it is not measured here (field data: Search Console / CrUX).
//
// Usage: npx tsx scripts/cwv-lab.ts <url> [<url> ...] [--runs 3] [--out seo-reports/cwv-lab.json]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name: string, fallback: string) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args.splice(i, 2)[1] : fallback; };
const runs = Number(opt('runs', '3'));
const out = opt('out', '');
const chromePath = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const urls = args.filter((a) => /^https?:/.test(a));
if (!urls.length) { console.error('Usage: npx tsx scripts/cwv-lab.ts <url> [...] [--runs 3]'); process.exit(1); }

const OBSERVER = `(() => {
  window.__cwv = { lcp: 0, cls: 0, tbt: 0, fcp: 0, lcpElement: '' };
  new PerformanceObserver((list) => { for (const e of list.getEntries()) { window.__cwv.lcp = e.startTime; const el = e.element; window.__cwv.lcpElement = el ? (el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '')) : ''; } }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((list) => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cwv.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver((list) => { for (const e of list.getEntries()) window.__cwv.tbt += Math.max(0, e.duration - 50); }).observe({ type: 'longtask', buffered: true });
  new PerformanceObserver((list) => { for (const e of list.getEntries()) if (e.name === 'first-contentful-paint') window.__cwv.fcp = e.startTime; }).observe({ type: 'paint', buffered: true });
})();`;

async function launch() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cwv-'));
  const chrome = spawn(chromePath, ['--headless=new', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=0', `--user-data-dir=${dir}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const wsUrl = await new Promise<string>((resolve, reject) => {
    let buffer = '';
    chrome.stderr.on('data', (chunk) => { buffer += chunk; const m = buffer.match(/DevTools listening on (ws:\/\/\S+)/); if (m) resolve(m[1]); });
    setTimeout(() => reject(new Error('Chrome did not start')), 20000);
  });
  return { chrome, wsUrl, dir };
}

function connect(wsUrl: string) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map<number, (value: any) => void>();
  const listeners: ((msg: any) => void)[] = [];
  ws.onmessage = (event) => {
    const msg = JSON.parse(String(event.data));
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)!(msg); pending.delete(msg.id); } else listeners.forEach((l) => l(msg));
  };
  const send = (method: string, params: Record<string, unknown> = {}, sessionId?: string) => new Promise<any>((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
  return { ready: new Promise((r) => { ws.onopen = r; }), send, on: (l: (msg: any) => void) => listeners.push(l), close: () => ws.close() };
}

async function measure(url: string) {
  const { chrome, wsUrl, dir } = await launch();
  const cdp = connect(wsUrl);
  await cdp.ready;
  try {
    const { result: { targetId } } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { result: { sessionId } } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    const s = (method: string, params: Record<string, unknown> = {}) => cdp.send(method, params, sessionId);
    const bytes: Record<string, number> = {};
    const types = new Map<string, string>();
    cdp.on((msg) => {
      if (msg.sessionId !== sessionId) return;
      if (msg.method === 'Network.responseReceived') types.set(msg.params.requestId, msg.params.type);
      if (msg.method === 'Network.loadingFinished') { const t = types.get(msg.params.requestId) ?? 'Other'; bytes[t] = (bytes[t] ?? 0) + msg.params.encodedDataLength; }
    });
    await s('Network.enable');
    await s('Network.setCacheDisabled', { cacheDisabled: true });
    await s('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await s('Emulation.setCPUThrottlingRate', { rate: 4 });
    await s('Emulation.setDeviceMetricsOverride', { width: 412, height: 823, deviceScaleFactor: 1.75, mobile: true });
    await s('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' });
    await s('Page.enable');
    await s('Page.addScriptToEvaluateOnNewDocument', { source: OBSERVER });
    const loaded = new Promise<void>((resolve) => cdp.on((msg) => { if (msg.sessionId === sessionId && msg.method === 'Page.loadEventFired') resolve(); }));
    await s('Page.navigate', { url });
    await Promise.race([loaded, new Promise((r) => setTimeout(r, 45000))]);
    await new Promise((r) => setTimeout(r, 6000)); // let late LCP candidates, shifts and long tasks settle
    // LCP is finalized on input; a synthetic keypress-free check: read the latest candidate.
    const { result: { result: { value } } } = await s('Runtime.evaluate', {
      expression: `JSON.stringify({ ...window.__cwv, ttfb: performance.getEntriesByType('navigation')[0]?.responseStart ?? 0 })`, returnByValue: true,
    });
    const metrics = JSON.parse(value);
    return { url, ...metrics, kb: Object.fromEntries(Object.entries(bytes).map(([k, v]) => [k, Math.round(v / 1024)])), totalKb: Math.round(Object.values(bytes).reduce((a, b) => a + b, 0) / 1024) };
  } finally {
    cdp.close();
    const exited = new Promise((r) => chrome.once('exit', r));
    chrome.kill('SIGKILL');
    await exited;
    try { fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch { /* temp profile; OS cleans it */ }
  }
}

const median = (values: number[]) => { const v = [...values].sort((a, b) => a - b); return v[Math.floor(v.length / 2)]; };
const results: Record<string, unknown>[] = [];
for (const url of urls) {
  const samples = [];
  for (let i = 0; i < runs; i++) samples.push(await measure(url));
  const row = {
    url,
    runs,
    lcpMs: Math.round(median(samples.map((r) => r.lcp))),
    cls: Number(median(samples.map((r) => r.cls)).toFixed(3)),
    fcpMs: Math.round(median(samples.map((r) => r.fcp))),
    ttfbMs: Math.round(median(samples.map((r) => r.ttfb))),
    tbtMs: Math.round(median(samples.map((r) => r.tbt))),
    lcpElement: samples[samples.length - 1].lcpElement,
    transferKb: samples[samples.length - 1].kb,
    totalKb: samples[samples.length - 1].totalKb,
  };
  results.push(row);
  const verdict = (ok: boolean) => (ok ? 'good' : 'needs work');
  console.log(`${url}\n  LCP ${row.lcpMs} ms (${verdict(row.lcpMs <= 2500)}) · CLS ${row.cls} (${verdict(row.cls <= 0.1)}) · FCP ${row.fcpMs} ms · TTFB ${row.ttfbMs} ms · TBT ${row.tbtMs} ms · ${row.totalKb} KB · LCP element ${row.lcpElement}`);
  console.log(`  bytes by type (KB): ${JSON.stringify(row.transferKb)}`);
}
if (out) fs.writeFileSync(out, JSON.stringify({ measuredAt: new Date().toISOString(), profile: 'mobile, 4x CPU, 1.6 Mbps/150 ms', results }, null, 2));
