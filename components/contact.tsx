"use client"

import type React from "react"
import ExternalLink from './ExternalLink'
import { useEffect, useRef, useState } from "react"

// Define the structure for a log entry
type LogEntry = {
  type: 'input' | 'system' | 'prompt' | 'error' | 'success' | 'ascii';
  text: string;
};

const getRandomChars = (length: number) => {
    const chars = '0123456789ABCDEF!@#$%^&*()_+{}|:<>?[]';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const neofetchArt = `
           -oyhddddhyo-
         -ydmmmmmmmmmmdy-
       -dmmmmmmmmmmmmmmd-
      :dmmmmmmmmmmmmmmd:
     'dmmmmmmmmmmmmmmms'
     'smmmmmmmmmmmmmmms'
     'smmmmmmmmmmmmmmms'
     'smmmmmmmmmmmmmmms'
     'smmmmmmmmmmmmmmms'
     'smmmmmmmmmmmmmmms'
     'smmmmmmmmmmmmmmms'
     'dmmmmmmmmmmmmmmms'
      :dmmmmmmmmmmmmmms:
       -dmmmmmmmmmmmmd-
         -ydmmmmmmmdy-
           -oydddyo-
`;

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState('start'); // 'start', 'name', 'email', 'message', 'confirm', 'sending'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [transmissionProgress, setTransmissionProgress] = useState(0);
  const [transmissionData, setTransmissionData] = useState('');
  
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of log on new entries
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [log, transmissionProgress]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && step === 'start') {
          setIsVisible(true);
          setLog([{ type: 'system', text: 'Contact protocol loaded.' }, { type: 'system', text: 'Type "help" for a list of commands.' }]);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    }
  }, [step]);

  // Focus input when the section becomes visible
  useEffect(() => {
    if (isIntersecting && step !== 'sending') {
      inputRef.current?.focus();
    }
  }, [isIntersecting, step]);

  // Transmission Animation Effect
  useEffect(() => {
    if (step !== 'sending') return;

    const duration = 3000; // 3 seconds
    const intervalTime = 50;
    let elapsedTime = 0;

    const interval = setInterval(() => {
      elapsedTime += intervalTime;
      const currentProgress = Math.min((elapsedTime / duration) * 100, 100);
      setTransmissionProgress(currentProgress);
      setTransmissionData(getRandomChars(2000));

      if (elapsedTime >= duration) {
        clearInterval(interval);
        setTimeout(() => {
            addLog({ type: 'success', text: 'Packet sent successfully ✓' });
            addLog({ type: 'system', text: 'Connection terminated. Type "help" for a list of commands.' });
            setStep('start');
            setFormData({ name: '', email: '', message: '' });
            setTransmissionProgress(0);
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [step]);


  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const addLog = (entry: LogEntry) => {
    setLog(prev => [...prev, entry]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim();
    const [baseCommand, arg] = command.split(' ');
    if (step !== 'sending') addLog({ type: 'input', text: command });
    setInputValue('');

    switch (step) {
      case 'start':
        switch (baseCommand.toLowerCase()) {
          case 'help':
            addLog({ type: 'system', text: 'Available commands:' });
            addLog({ type: 'system', text: '  sendmsg          - Initiate secure transmission.' });
            addLog({ type: 'system', text: '  whoami           - Display user information.' });
            addLog({ type: 'system', text: '  ls               - List available files.' });
            addLog({ type: 'system', text: '  cat <file>       - Display file content (e.g., cat projects.txt).' });
            addLog({ type: 'system', text: '  neofetch         - Display system information.' });
            addLog({ type: 'system', text: '  clear            - Clear the terminal.' });
            break;
          case 'sendmsg':
            addLog({ type: 'prompt', text: 'Enter your name:' });
            setStep('name');
            break;
          case 'whoami':
            addLog({ type: 'success', text: 'user: guest' });
            addLog({ type: 'success', text: 'privileges: limited' });
            break;
          case 'ls':
            addLog({ type: 'system', text: '  projects.txt' });
            addLog({ type: 'system', text: '  skills.txt' });
            addLog({ type: 'system', text: '  contact.sh' });
            break;
          case 'cat':
             if (arg === 'projects.txt') {
                 addLog({ type: 'system', text: '--- PryGuard: Anti-Fingerprinting Browser ---' });
                 addLog({ type: 'system', text: '--- Malicious URL Scanner: ML-based Web Threat Analyzer ---' });
                 addLog({ type: 'system', text: '--- WebVuln Scanner: Web Vulnerability Scanner ---' });
             } else if (arg === 'skills.txt') {
                 addLog({ type: 'system', text: 'Languages: Python, C++, JavaScript, Bash' });
                 addLog({ type: 'system', text: 'Penetration Testing: Metasploit, Nmap, Burp Suite, Hydra' });
                 addLog({ type: 'system', text: 'Web Security: OWASP Top 10, XSS, SQL Injection' });
             } else if (arg === 'contact.sh') {
                addLog({ type: 'error', text: 'Permission denied. Use `sendmsg` command.' });
             } else {
                 addLog({ type: 'error', text: `cat: ${arg || ''}: No such file or directory` });
             }
             break;
          case 'neofetch':
             addLog({ type: 'ascii', text: neofetchArt });
             addLog({ type: 'system', text: 'pannag_kumaar@portfolio' });
             addLog({ type: 'system', text: '-------------------------' });
             addLog({ type: 'system', text: 'OS:           Web-based Kernel v1.3.3.7' });
             addLog({ type: 'system', text: 'Host:         Vercel Edge Network' });
             addLog({ type: 'system', text: 'Resolution:   Dynamic' });
             addLog({ type: 'system', text: 'Shell:        zsh (emulated)' });
             addLog({ type: 'system', text: 'CPU:          Quantum Core @ 9.8GHz' });
             addLog({ type: 'system', text: 'GPU:          Neural Matrix Renderer' });
             addLog({ type: 'system', text: 'Memory:       CLASSIFIED' });
             break;
          case 'clear':
            setLog([]);
            break;
          default:
            if (command) {
              addLog({ type: 'error', text: `command not found: ${command}` });
            }
        }
        break;

      case 'name': //... same as before
      case 'email': //... same as before
      case 'message': //... same as before
      case 'confirm': //... same as before
      // ... (The rest of the cases for the contact form remain unchanged)
        if (command.toLowerCase() === 'y' || command.toLowerCase() === 'yes') {
          addLog({ type: 'system', text: '[ ENCRYPTING & TRANSMITTING PACKET ]' });
          setStep('sending');
        } else if (command.toLowerCase() === 'n' || command.toLowerCase() === 'no') {
          addLog({ type: 'system', text: 'Transmission aborted.' });
          addLog({ type: 'system', text: 'Type "help" for a list of commands.' });
          setStep('start');
          setFormData({ name: '', email: '', message: '' });
        } else {
          addLog({ type: 'error', text: 'Invalid input. Please enter [Y/N].' });
        }
        break;
      
      case 'sending': // Input is disabled during sending
        break;
    }
  }

  const contacts = [
    { label: "Email", value: "kumaarpannag@gmail.com", href: "mailto:kumaarpannag@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/pannag-kumaar", href: "https://linkedin.com/in/pannag-kumaar" },
    { label: "GitHub", value: "github.com/pannagkumaar", href: "https://github.com/pannagkumaar" },
    { label: "Medium", value: "medium.com/@pannagkumaar", href: "https://medium.com/@pannagkumaar" },
    { label: "TryHackMe", value: "tryhackme.com/p/0N1", href: "https://tryhackme.com/p/0N1" },
  ]

  const getPromptLabel = () => {
    switch(step) {
      case 'name': return 'name:';
      case 'email': return 'email:';
      case 'message': return 'message:';
      case 'confirm': return '[Y/N]:';
      default: return '$';
    }
  }

  return (
    <section id="contact" ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? "fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 neon-glow text-glitch">{"> Connect with Pannag"}</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="terminal-border bg-black/70 font-mono text-sm h-96 flex flex-col" onClick={() => inputRef.current?.focus()}>
                    <div className="terminal-header flex items-center bg-muted/30 p-2 border-b border-primary/30">
                        <div className="flex space-x-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                        <div className="flex-grow text-center text-muted-foreground text-xs">pannag@portfolio: ~/contact</div>
                    </div>
                    
                    <div ref={logContainerRef} className="flex-grow overflow-y-auto p-4 space-y-1 terminal-text-glow">
                        {log.map((line, index) => (
                            <div key={index} className="flex">
                                {line.type === 'input' && <div className="flex w-full"><span className="text-primary">pannag@portfolio:~$</span><span className="flex-1 ml-2">{line.text}</span></div>}
                                {line.type === 'system' && <div className="text-muted-foreground">{line.text}</div>}
                                {line.type === 'prompt' && <div className="text-secondary">{line.text}</div>}
                                {line.type === 'error' && <div className="text-destructive">{line.text}</div>}
                                {line.type === 'success' && <div className="text-primary">{line.text}</div>}
                                {line.type === 'ascii' && <pre className="text-secondary text-xs leading-tight">{line.text}</pre>}
                            </div>
                        ))}
                        {step === 'sending' && (
                            <div className="mt-2">
                                <div className="text-left h-24 overflow-hidden relative"><div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div><p className="text-xs break-all opacity-30 animate-pulse">{transmissionData}</p></div>
                                <div className="w-full mx-auto mt-2"><div className="text-primary font-mono text-xs mb-1">{`> Transmission progress... [${Math.floor(transmissionProgress)}%]`}</div><div className="w-full h-3 border border-primary p-0.5"><div className="h-full bg-primary" style={{ width: `${transmissionProgress}%` }}></div></div></div>
                            </div>
                        )}
                    </div>
                    
                    {step !== 'sending' && (
                        <form onSubmit={handleCommand} className="flex items-center p-4 border-t border-primary/30">
                            <label className="text-primary mr-2">{step === 'start' ? 'pannag@portfolio:~$' : `${getPromptLabel()}`}</label>
                            <input ref={inputRef} type={step === 'email' ? 'email' : 'text'} value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-grow bg-transparent text-foreground focus:outline-none" />
                            <span className="terminal-cursor"></span>
                        </form>
                    )}
                </div>
                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <ExternalLink key={contact.label} href={contact.href} className="terminal-border p-4 bg-card/50 hover:shadow-lg hover:shadow-primary/30 transition-all block">
                            <div className="font-mono text-sm text-secondary">[{contact.label}]</div>
                            <div className="text-muted-foreground font-mono text-sm mt-1 hover:text-primary transition-colors">{contact.value}</div>
                        </ExternalLink>
                    ))}
                </div>
            </div>
            <div className="mt-16 text-center border-t border-primary/30 pt-8">
                <p className="font-mono text-muted-foreground text-sm">{"> © 2025 Pannag Kumaar. All systems operational."}</p>
                <p className="font-mono text-primary text-xs mt-2">{"> Explore. Learn. Build. Secure."}</p>
            </div>
        </div>
    </section>
  )
}