// SEO regression test: builds the site, serves dist/ with the production server (server.ts), runs the audit
// against it and exits non-zero if any check FAILs. Run before every production deployment: npm run seo:test
// Pass --no-build to audit an existing dist/.
import { spawn, spawnSync } from 'node:child_process';

const PORT = process.env.SEO_TEST_PORT ?? '4173';
const run = (cmd: string, args: string[], env: NodeJS.ProcessEnv = {}) => spawnSync(cmd, args, { stdio: 'inherit', env: { ...process.env, ...env } }).status ?? 1;

if (!process.argv.includes('--no-build') && run('npx', ['vite', 'build'], { VITE_CONFIG_NATIVE_IGNORE_WARNING: 'true' }) !== 0) process.exit(1);

const server = spawn('npx', ['tsx', 'server.ts'], { stdio: 'ignore', env: { ...process.env, NODE_ENV: 'production', PORT }, detached: true });
const stop = () => { try { process.kill(-server.pid!); } catch { /* already stopped */ } };
process.on('exit', stop);

const base = `http://localhost:${PORT}`;
for (let i = 0; ; i++) {
  try { if ((await fetch(`${base}/robots.txt`)).ok) break; } catch { /* starting */ }
  if (i > 60) { console.error(`Server did not start on ${base}`); process.exit(1); }
  await new Promise((resolve) => setTimeout(resolve, 500));
}
const status = run('npx', ['tsx', 'scripts/seo-audit.ts', '--base', base, '--out', 'seo-reports']);
stop();
process.exit(status);
