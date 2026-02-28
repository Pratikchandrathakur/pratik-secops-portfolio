import React, { forwardRef } from 'react';

interface TerminalProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(({ children, title = "bash", className = "", onClick, id }, ref) => {
  return (
    <div 
      ref={ref}
      id={id}
      onClick={onClick}
      className={`rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl flex flex-col ${className}`}
    >
      <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center text-xs font-mono text-slate-400 opacity-75">
          {title}
        </div>
      </div>
      <div className="p-4 font-mono text-sm text-slate-300 overflow-y-auto flex-1 cursor-text terminal-scrollbar">
        {children}
      </div>
    </div>
  );
});

Terminal.displayName = 'Terminal';

export const CommandPrompt: React.FC<{ command: string; output?: React.ReactNode }> = ({ command, output }) => (
  <div className="mb-4">
    <div className="flex gap-2 items-center text-primary-400">
      <span className="text-blue-400">root@pratik</span>
      <span className="text-slate-500">:</span>
      <span className="text-purple-400">~/portfolio</span>
      <span className="text-slate-500">$</span>
      <span className="text-slate-100">{command}</span>
    </div>
    {output && <div className="mt-2 text-slate-300 pl-4 border-l-2 border-slate-800">{output}</div>}
  </div>
);