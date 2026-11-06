import React from 'react';

export const ClientStrip: React.FC = () => {
  const clients = [
    'Dribbble',
    'eBay',
    'Instagram',
    'Twitter',
    'Facebook',
    'Snapchat',
    'Spotify',
  ];

  return (
    <div className="w-full py-8 border-y border-white/10 bg-white/[0.02] backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <span className="text-xs uppercase tracking-widest font-mono font-bold text-zinc-500 whitespace-nowrap">
          OUR CLIENTS
        </span>

        <div className="flex flex-wrap items-center gap-8 lg:gap-12 text-sm font-semibold tracking-wide text-zinc-400">
          {clients.map((client) => (
            <span
              key={client}
              className="hover:text-rose-400 transition-colors cursor-default whitespace-nowrap"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
