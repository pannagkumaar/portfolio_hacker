"use client"

import type React from "react"
import ExternalLink from './ExternalLink'
import { useEffect, useRef, useState } from "react"

// ... (Keep existing LogEntry type, getRandomChars, neofetchArt) ...
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
@@@@@@@@@@@@@@@@@@@@%%#*++++*#%%%@%%%%%%%@@@@@@@@
@@@@@@@@@@@@#=::::.........:::::---+#%%@@@@@@@@@@
@@@@@@%@@@=--::::::........:::::---==+#@@@@@@@@@@
@@@@@@@@@+=-::::::::.......:::::::--=++*@@@@@@@@@
@@@@@@@@#+=+#%%%#+-..::..:..:+#%%%%%+++*#@@@@@@@@
@@@@@@@@*#@@@@@@@%+#%=::::+*#@@@@@@@@@***@@@@@@@@
@@@@@@@@#@@#**#%@@@@##*--#%@@@%=-::--*@#*%@@@@@@@
@@@@@@@@#*=--:::-*@@@+:::+@@#=----==++##*%@@@@@@@
@@@@@@@@#*++%%####%%@@:..#%*#%#%%%%@#*##*%@@@@@@@
@@@@@@@@=%#@%@@@@@@#+=:..==#%@@@@@@#%%%*+#@@@@@@@
@@@@@@@@==::-==--:..:=:..==:.:--===-::-+*#@@@@@@@
@@@@@@@@=::::......::-:..==-......:::::-+#@@@@@@@
@@@@@@@@+----::::::::-:..-=-:::::::---==#%@@@@@@@
@@@@@@@@%%*++++*#%+::=:::=+::+#%*+===+*%%%@@@@@@@
@@@@@@@@%+@@@@%=::=@@@@@@@@@@%::=#@@@@@#%@@@@@@@@
@@@@@@@@@@#+@#::::::-@@@@@@*-::::--@@@%#@%@@@@@@@
@@@@@@@@@@@=+%@*+###@@@+=@@@%#**#@@#%=*@@@@@@@@@@
@@@@@@@@@@@@=%-=#%%@@@@@@@@@@%%%#*+@-+@@%@@@@@@@@
@@@@@@@@@@@@@=#@%+=--::::::::-+#@@%-*@@%@@@@@@@@@
@@@@@@@@@@@@@@==#++*#%@@@@@@%%##@*=%@@%@@@@@@@@@@
@@@@@@@@@@@@@@@*-#=--::@@%:-=+*%-*@@%@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@-==-:-@@@-:-=+=%%%@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@#+=--@@@--=+#@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@#+=@@%++#%@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
`;

// 1. Define command list for tab-completion
const availableCommands = [
    'help', 
    'sendmsg', 
    'whoami', 
    'ls', 
    'cat', 
    'neofetch', 
    'echo', 
    'history', 
    'scan', 
    'theme', 
    'clear',
    'decrypt', // 2. Add new commands
    'connect'
];

// 3. ASCII art for decrypt
const decryptedFileArt = `
+------------------------------------------+
|  ACCESS GRANTED: FILE DECRYPTED          |
+------------------------------------------+
|                                          |
|  Thanks for checking out my portfolio!   |
|                                          |
|  I'm passionate about building secure     |
|  and innovative systems. If you're       |
|  interested in collaborating, feel       |
|  free to reach out via 'sendmsg'.        |
|                                          |
|  - Pannag Kumaar                         |
|                                          |
+------------------------------------------+
`;


export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState('start'); 
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [transmissionProgress, setTransmissionProgress] = useState(0);
  const [transmissionData, setTransmissionData] = useState('');
  
  // 4. State for command history
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  
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
          observer.unobserve(entry.target); // Observe only once
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    }
  }, [step]);

  // Focus input when the section becomes visible
  useEffect(() => {
    // 5. Don't focus while 'decrypting'
    if (isIntersecting && (step !== 'sending' && step !== 'decrypting')) { 
      inputRef.current?.focus();
    }
  }, [isIntersecting, step]);

  // Transmission/Decryption Animation Effect
  useEffect(() => {
    // 6. Run for both 'sending' and 'decrypting'
    if (step !== 'sending' && step !== 'decrypting') return;

    const duration = step === 'sending' ? 3000 : 2000; // Decryption is faster
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
            if (step === 'sending') {
                addLog({ type: 'success', text: 'Packet sent successfully ✓' });
                addLog({ type: 'system', text: 'Connection terminated. Type "help" for a list of commands.' });
                setFormData({ name: '', email: '', message: '' });
            } else if (step === 'decrypting') {
                // 7. Show decrypted content
                addLog({ type: 'success', text: 'Decryption complete.' });
                addLog({ type: 'ascii', text: decryptedFileArt });
            }
            setStep('start');
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

  // ADDITION: Helper function for 'scan' command
  const runFakeScan = (domain: string) => {
    const scanLines = [
        `Starting scan on ${domain}...`,
        `[+] Resolving DNS... IP resolved to 104.26.10.123`,
        `[+] Pinging host... Host is LIVE`,
        `[+] Starting Nmap scan...`,
        `   PORT   STATE SERVICE`,
        `   80/tcp  OPEN  http`,
        `   443/tcp OPEN  https`,
        `   8443/tcp OPEN  https-alt`,
        `[+] Checking for common vulnerabilities...`,
        `   [INFO] Checking for XSS... (1/3)`,
        `   [INFO] Checking for SQLi... (2/3)`,
        `   [WARN] Weak SSL cipher suites detected. (3/3)`,
        `[+] Scan complete. 1 warning found.`,
    ];
    let index = 0;
    const interval = setInterval(() => {
        if (index < scanLines.length) {
            addLog({ type: 'system', text: scanLines[index] });
            index++;
        } else {
            clearInterval(interval);
        }
    }, 350); // 350ms delay per line
  };

  // 8. Add 'connect' simulation
  const runFakeConnect = (ip: string) => {
    const connectLines = [
        `Connecting to ${ip}:443...`,
        `[+] Pinging ${ip} with 32 bytes of data:`,
        `   Reply from ${ip}: bytes=32 time=12ms TTL=58`,
        `   Reply from ${ip}: bytes=32 time=11ms TTL=58`,
        `[+] Connection established.`,
        `[+] Running traceroute...`,
        `   1  1ms  192.168.1.1`,
        `   2  8ms  10.0.0.1`,
        `   3  11ms  203.0.113.1`,
        `   4  12ms  ${ip}`,
        `[+] Trace complete. Connection secure.`,
    ];
    let index = 0;
    const interval = setInterval(() => {
        if (index < connectLines.length) {
            addLog({ type: 'system', text: connectLines[index] });
            index++;
        } else {
            clearInterval(interval);
        }
    }, 350);
  }

  // ADDITION: Helper function for 'theme' command
  const setTheme = (themeName: string) => {
    document.documentElement.setAttribute('data-theme', themeName);
    addLog({ type: 'success', text: `Theme set to ${themeName}` });
  }

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim();
    if (command) {
        setCommandHistory(prev => [command, ...prev]); // 9. Add to history (newest first)
    }
    setHistoryIndex(-1); // 10. Reset history index

    const [baseCommand, ...args] = command.split(' ');
    const arg = args.join(' '); // Re-join all args

    if (step !== 'sending' && step !== 'decrypting') addLog({ type: 'input', text: command });
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
            addLog({ type: 'system', text: '  decrypt <file>   - Decrypt an encoded file.' }); // 11. Add to help
            addLog({ type: 'system', text: '  connect <ip>     - Simulate a connection to an IP/domain.' }); // 11. Add to help
            addLog({ type: 'system', text: '  neofetch         - Display system information.' });
            addLog({ type: 'system', text: '  echo <text>      - Print text to terminal.' });
            addLog({ type: 'system', text: '  history          - View command history.' });
            addLog({ type: 'system', text: '  scan <domain>    - Run a mock vulnerability scan.' });
            addLog({ type: 'system', text: '  theme <name>     - Change terminal theme (matrix, amber, ice).' });
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
            addLog({ type: 'system', text: '  secrets.txt.enc' }); // 12. Add new file to ls
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
             } else if (arg === 'secrets.txt.enc') { // 13. Handle new file
                addLog({ type: 'error', text: 'ACCESS DENIED: FILE ENCRYPTED.' });
                addLog({ type: 'system', text: 'Hint: Try the `decrypt` command.' });
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

          // ADDITION: New command cases
          case 'echo':
            addLog({ type: 'system', text: arg || '' });
            break;
          case 'history':
            if (commandHistory.length === 0) {
              addLog({ type: 'system', text: 'No history.' });
              break;
            }
            // 14. Show history in reverse (newest first)
            [...commandHistory].reverse().forEach((cmd, index) => {
                addLog({ type: 'system', text: `  ${commandHistory.length - index}: ${cmd}` });
            });
            break;
          case 'scan':
            if (arg) {
                runFakeScan(arg);
            } else {
                addLog({ type: 'error', text: 'usage: scan <domain>' });
            }
            break;
          case 'theme':
            if (arg === 'matrix' || arg === 'amber' || arg === 'ice') {
                setTheme(arg);
            
            } else {
                addLog({ type: 'error', text: 'usage: theme <matrix|amber|ice>' });
            }
            break;
          
          // 15. Add new command cases
          case 'decrypt':
            if (arg === 'secrets.txt.enc') {
                addLog({ type: 'system', text: '[ INITIATING DECRYPTION PROTOCOL ]' });
                setStep('decrypting');
            } else {
                addLog({ type: 'error', text: `decrypt: ${arg || ''}: No such file or file is not encrypted` });
            }
            break;
          case 'connect':
            if (arg) {
                runFakeConnect(arg);
            } else {
                addLog({ type: 'error', text: 'usage: connect <ip/domain>' });
            }
            break;
          
          // END ADDITION

          case 'clear':
            setLog([]);
            break;
          default:
            if (command) {
              addLog({ type: 'error', text: `command not found: ${command}` });
            }
        }
        break;

      // ... (Keep existing cases for 'name', 'email', 'message', 'confirm') ...
      case 'name':
        if (command) {
            setFormData(prev => ({ ...prev, name: command }));
            addLog({ type: 'prompt', text: 'Enter your email:' });
            setStep('email');
        } else {
            addLog({ type: 'error', text: 'Name cannot be empty.' });
        }
        break;
      case 'email':
        if (validateEmail(command)) {
            setFormData(prev => ({ ...prev, email: command }));
            addLog({ type: 'prompt', text: 'Enter your message:' });
            setStep('message');
        } else {
            addLog({ type: 'error', text: 'Invalid email format.' });
        }
        break;
      case 'message':
         if (command) {
            setFormData(prev => ({ ...prev, message: command }));
            addLog({ type: 'system', text: '--- New Transmission ---' });
            addLog({ type: 'system', text: `Name: ${formData.name}` });
            addLog({ type: 'system', text: `Email: ${formData.email}` });
            addLog({ type: 'system', text: `Message: ${command}` });
            addLog({ type: 'prompt', text: 'Proceed with transmission? [Y/N]' });
            setStep('confirm');
        } else {
            addLog({ type: 'error', text: 'Message cannot be empty.' });
        }
        break;
      case 'confirm':
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
      case 'decrypting': // 16. Disable input while decrypting
        break;
    }
  }

  // 17. Add KeyDown handler for History and Tab-complete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if in a state that should process keydowns
    if (step !== 'start') {
        // Allow default behavior for name, email, message, confirm steps
        return;
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
            const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
            setHistoryIndex(newIndex);
            setInputValue(commandHistory[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            const newIndex = Math.max(historyIndex - 1, 0);
            setHistoryIndex(newIndex);
            setInputValue(commandHistory[newIndex]);
        } else if (historyIndex === 0) { // At the "oldest" command
            setHistoryIndex(-1);
            setInputValue('');
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const partialCommand = inputValue.split(' ')[0];
        const matches = availableCommands.filter(cmd => cmd.startsWith(partialCommand));
        
        if (matches.length === 1) {
            setInputValue(matches[0] + ' ');
        } else if (matches.length > 1) {
            // Add a new log entry to show the matches
            addLog({ type: 'system', text: matches.join('   ') });
        }
    }
  }

  // ... (Keep existing contacts array) ...
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
    // ... (Keep existing JSX, no changes needed to the <section> structure) ...
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
                                {line.type === 'input' && <div className="flex w-full"><span className="text-primary">pannag@portfolio:~$</span><span className="flex-1 ml-2 break-all">{line.text}</span></div>}
                                {line.type === 'system' && <div className="text-muted-foreground break-all">{line.text}</div>}
                                {line.type === 'prompt' && <div className="text-secondary break-all">{line.text}</div>}
                                {line.type === 'error' && <div className="text-destructive break-all">{line.text}</div>}
                                {line.type === 'success' && <div className="text-primary break-all">{line.text}</div>}
                                {line.type === 'ascii' && <pre className="text-secondary text-xs leading-tight whitespace-pre-wrap">{line.text}</pre>}
                            </div>
                        ))}
                        {/* 18. Modify 'sending' block to handle 'decrypting' */}
                        {(step === 'sending' || step === 'decrypting') && (
                            <div className="mt-2">
                                <div className="text-left h-24 overflow-hidden relative"><div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div><p className="text-xs break-all opacity-30 animate-pulse">{transmissionData}</p></div>
                                <div className="w-full mx-auto mt-2">
                                    <div className="text-primary font-mono text-xs mb-1">
                                        {step === 'sending' 
                                            ? `> Transmission progress... [${Math.floor(transmissionProgress)}%]`
                                            : `> Decrypting... [${Math.floor(transmissionProgress)}%]`
                                        }
                                    </div>
                                <div className="w-full h-3 border border-primary p-0.5"><div className="h-full bg-primary" style={{ width: `${transmissionProgress}%` }}></div></div></div>
                            </div>
                        )}
                    </div>
                    
                    {/* 19. Disable input for both 'sending' and 'decrypting' */}
                    {(step !== 'sending' && step !== 'decrypting') && (
                        <form onSubmit={handleCommand} className="flex items-center p-4 border-t border-primary/30">
                            <label className="text-primary mr-2">{step === 'start' ? 'pannag@portfolio:~$' : `${getPromptLabel()}`}</label>
                            {/* 20. Add onKeyDown handler to input */}
                            <input 
                                ref={inputRef} 
                                type={step === 'email' ? 'email' : 'text'} 
                                value={inputValue} 
                                onChange={(e) => setInputValue(e.target.value)} 
                                onKeyDown={handleKeyDown} // 20. ADDED
                                className="flex-grow bg-transparent text-foreground focus:outline-none" 
                                autoComplete="off" // 21. Disable browser autocomplete
                            />
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