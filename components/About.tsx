import React, { useState, useRef, useEffect } from 'react';
import { CommandPrompt, Terminal } from './Terminal';
import { TECH_STACK } from '../constants';

const ABOUT_TEXT = (
  <div className="space-y-2 text-sm md:text-base leading-relaxed text-slate-300">
    <p>Cybersecurity isn't just about firewalls; it's about understanding the code that powers the world.</p>
    <p>With a background in <span className="text-primary-400">Full Stack Development</span> and a current role as a <span className="text-primary-400">Security Analyst</span>, I don't just find vulnerabilities — I understand how they were built and how to fix them.</p>
    <br />
    <p className="text-slate-400"># Current Objectives:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Cloud Security Architecture</li>
      <li>Advanced SOC Operations</li>
      <li>Building Secure Digital Ecosystems</li>
    </ul>
  </div>
);

const STATS_OUTPUT = (
  <div className="grid grid-cols-2 gap-4 mt-2">
    <div className="bg-slate-800/50 p-2 rounded border border-slate-700">
      <div className="text-xs text-slate-500">TRYHACKME RANK</div>
      <div className="text-primary-400 font-bold">TOP 6%</div>
    </div>
    <div className="bg-slate-800/50 p-2 rounded border border-slate-700">
      <div className="text-xs text-slate-500">CERTIFICATIONS</div>
      <div className="text-purple-400 font-bold">15+ EARNED</div>
    </div>
  </div>
);

const RESUME_OUTPUT = (
  <div className="space-y-2">
    <div className="text-slate-400 italic">Reading binary data...</div>
    <div className="text-primary-400">
      Successfully decoded 'Pratik_Chandra_Thakur_Resume.pdf'
    </div>
    <div className="text-slate-300 text-xs font-mono border border-slate-700 p-2 rounded bg-slate-900/50">
      [PDF HEADER] %PDF-1.7<br/>
      1 0 obj &lt;&lt; /Type /Catalog /Pages 2 0 R &gt;&gt; endobj<br/>
      ...<br/>
      <span className="text-primary-500">Opening file in external viewer...</span>
    </div>
  </div>
);

// Constants for Autocomplete
const FILES = ['about_me.txt', 'show_stats.py', 'resume.pdf'];
const COMMANDS = ['ls', 'cat', 'clear', 'help', 'exit', './show_stats.py', 'open', 'read', 'whoami'];

interface HistoryItem {
  id: number;
  command: string;
  output: React.ReactNode;
}

const About: React.FC = () => {
  const [isInteractive, setIsInteractive] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Command History State
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Handle click outside to reset
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (terminalRef.current && !terminalRef.current.contains(event.target as Node)) {
        setIsInteractive(false);
        setHistory([]);
        setInput('');
        setCmdHistory([]);
        setHistoryPointer(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [history, isInteractive]);

  // Focus input when interactive
  useEffect(() => {
    if (isInteractive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInteractive, history]);

  const handleTerminalClick = () => {
    if (!isInteractive) {
      setIsInteractive(true);
    }
    if (inputRef.current) inputRef.current.focus();
  };

  const handleResumeAction = () => {
    // Simulate download
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'Pratik_Chandra_Thakur_Resume.pdf';
        // In a real scenario, this would trigger the download
        alert("System Message: Downloading Pratik_Chandra_Thakur_Resume.pdf...");
    }, 800);
    return RESUME_OUTPUT;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newPtr = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(newPtr);
      setInput(cmdHistory[newPtr]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const newPtr = historyPointer + 1;
      if (newPtr >= cmdHistory.length) {
        setHistoryPointer(-1);
        setInput('');
      } else {
        setHistoryPointer(newPtr);
        setInput(cmdHistory[newPtr]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocomplete();
    }
  };

  const handleAutocomplete = () => {
    const trimmedInput = input;
    const parts = trimmedInput.split(' ');
    
    if (parts.length === 1) {
      // Autocomplete command
      const matches = COMMANDS.filter(c => c.startsWith(parts[0]));
      if (matches.length === 1) {
        // If it's a script like ./show_stats.py, don't add space immediately if we want to support args later, 
        // but generally commands have a space after
        setInput(matches[0] + (matches[0].endsWith('.py') ? '' : ' '));
      }
    } else if (parts.length === 2) {
      // Autocomplete file arg
      const currentArg = parts[1];
      const matches = FILES.filter(f => f.startsWith(currentArg));
      if (matches.length === 1) {
        setInput(`${parts[0]} ${matches[0]}`);
      }
    }
  };

  const executeCommand = () => {
    const cmd = input.trim();
    
    // Add to history if not empty
    if (cmd) {
      setCmdHistory(prev => [...prev, cmd]);
      setHistoryPointer(-1); // Reset pointer
    }

    let output: React.ReactNode = null;

    if (!cmd) {
      setHistory(prev => [...prev, { id: Date.now(), command: '', output: null }]);
      setInput('');
      return;
    }

    // Command Parsing
    const args = cmd.split(' ');
    const baseCmd = args[0].toLowerCase();
    const arg1 = args[1]?.toLowerCase();

    switch (baseCmd) {
      case 'ls':
        output = <div className="text-primary-300">about_me.txt&nbsp;&nbsp;show_stats.py&nbsp;&nbsp;resume.pdf</div>;
        break;
      
      case 'cat':
      case 'read':
      case 'open':
        if (!arg1) {
          output = <div className="text-slate-400">Usage: {baseCmd} [filename]</div>;
        } else if (arg1 === 'about_me.txt') {
          output = ABOUT_TEXT;
        } else if (arg1 === 'resume.pdf') {
          output = handleResumeAction();
        } else if (arg1 === 'show_stats.py') {
          output = <div className="text-slate-400">Binary file (script). Execute with ./show_stats.py</div>;
        } else {
          output = <div className="text-red-400">File not found: {args[1]}</div>;
        }
        break;

      case './show_stats.py':
      case 'python': // Handle 'python show_stats.py'
        if (baseCmd === 'python' && arg1 !== 'show_stats.py') {
             output = <div className="text-red-400">File not found or not executable.</div>;
        } else {
             output = STATS_OUTPUT;
        }
        break;

      case 'help':
        output = (
          <div className="text-slate-400">
            Available commands:<br/>
            <span className="text-primary-400">ls</span> - List directory contents<br/>
            <span className="text-primary-400">cat/read [file]</span> - Read/Display file<br/>
            <span className="text-primary-400">./[script]</span> - Execute script<br/>
            <span className="text-primary-400">clear</span> - Clear terminal<br/>
            <span className="text-primary-400">exit</span> - Exit interactive mode
          </div>
        );
        break;

      case 'whoami':
        output = <div className="text-primary-400">root</div>;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        setIsInteractive(false);
        setHistory([]);
        setInput('');
        setCmdHistory([]);
        return;

      default:
        output = <div className="text-red-400">Command not found: {cmd}. Type 'help' for available commands.</div>;
    }

    setHistory(prev => [...prev, { id: Date.now(), command: cmd, output }]);
    setInput('');
  };

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Visual/Terminal */}
        <div className="order-2 lg:order-1 h-full">
          <Terminal 
            ref={terminalRef}
            title={isInteractive ? "bash - interactive" : "pratik_profile.sh"} 
            className="shadow-primary-900/20 h-[500px] w-full"
            onClick={handleTerminalClick}
          >
            {!isInteractive ? (
              // Static State (Demo)
              <>
                <CommandPrompt 
                  command="cat about_me.txt" 
                  output={ABOUT_TEXT} 
                />
                 <CommandPrompt 
                  command="./show_stats.py" 
                  output={STATS_OUTPUT} 
                />
                <div className="mt-4 flex gap-2 items-center animate-pulse text-slate-500">
                  <span>Click terminal to interact</span>
                  <span className="h-4 w-2 bg-primary-500/50 block"></span>
                </div>
              </>
            ) : (
              // Interactive State
              <div className="flex flex-col">
                <div className="text-slate-500 mb-4 text-xs">Interactive Mode Enabled. Type 'ls' to list files.</div>
                {history.map((item) => (
                  <CommandPrompt key={item.id} command={item.command} output={item.output} />
                ))}
                
                {/* Active Input Line */}
                <div className="flex gap-2 items-center text-primary-400">
                  <span className="text-blue-400">root@pratik</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-purple-400">~/portfolio</span>
                  <span className="text-slate-500">$</span>
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-transparent outline-none border-none text-slate-100 font-mono p-0 m-0"
                      autoComplete="off"
                      autoFocus
                    />
                  </div>
                </div>
                <div ref={bottomRef} />
              </div>
            )}
          </Terminal>
        </div>

        {/* Right Column: Skills */}
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="text-primary-500 font-mono">01.</span>
            Technical Arsenal
          </h2>
          
          <div className="space-y-6">
            <p className="text-slate-400 text-lg">
               I bring a defensive mindset backed by a builder's perspective. Certified by ISC2, Google, and Cisco.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {TECH_STACK.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-sm text-slate-300 group-hover:text-primary-400 transition-colors">{skill.name}</span>
                    <span className="font-mono text-xs text-primary-500/50">{skill.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-600 to-purple-600 transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_theme('colors.primary.500')]"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;