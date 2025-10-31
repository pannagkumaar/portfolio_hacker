"use client"

import type React from "react"
import ExternalLink from './ExternalLink'
import { useEffect, useRef, useState } from "react"

// Define the structure for a log entry
type LogEntry = {
  type: 'input' | 'system' | 'prompt' | 'error';
  text: string;
};

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState('start'); // start, name, email, message, confirm, sending, sent
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of log on new entries
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [log]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && step === 'start') {
          setIsVisible(true);
          setLog([{ type: 'system', text: 'Contact protocol loaded.' }, { type: 'system', text: 'Type "sendmsg" to initiate secure transmission.' }]);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    }
  }, [step]); // Re-run if step resets

  // Focus input when the section becomes visible
  useEffect(() => {
    if (isIntersecting) {
      inputRef.current?.focus();
    }
  }, [isIntersecting]);


  const validateEmail = (email: string) => {
    // A simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const addLog = (entry: LogEntry) => {
    setLog(prev => [...prev, entry]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim();
    if (step !== 'sending') addLog({ type: 'input', text: command });
    setInputValue('');

    switch (step) {
      case 'start':
        if (command.toLowerCase() === 'sendmsg') {
          addLog({ type: 'prompt', text: 'Enter your name:' });
          setStep('name');
        } else if (command) {
          addLog({ type: 'error', text: `command not found: ${command}` });
        }
        break;

      case 'name':
        if (!command) {
          addLog({ type: 'error', text: 'ERROR: Name cannot be empty.' });
          addLog({ type: 'prompt', text: 'Enter your name:' });
        } else {
          setFormData(prev => ({ ...prev, name: command }));
          addLog({ type: 'prompt', text: 'Enter your email:' });
          setStep('email');
        }
        break;

      case 'email':
        if (!validateEmail(command)) {
          addLog({ type: 'error', text: 'ERROR: Invalid email format.' });
          addLog({ type: 'prompt', text: 'Enter your email:' });
        } else {
          setFormData(prev => ({ ...prev, email: command }));
          addLog({ type: 'prompt', text: 'Enter your message:' });
          setStep('message');
        }
        break;

      case 'message':
        if (!command) {
          addLog({ type: 'error', text: 'ERROR: Message cannot be empty.' });
          addLog({ type: 'prompt', text: 'Enter your message:' });
        } else {
          setFormData(prev => ({ ...prev, message: command }));
          addLog({ type: 'system', text: `Name: ${formData.name}` });
          addLog({ type: 'system', text: `Email: ${formData.email}` });
          addLog({ type: 'system', text: `Message: ${command.substring(0, 50)}...` });
          addLog({ type: 'prompt', text: 'Proceed with transmission? [Y/N]' });
          setStep('confirm');
        }
        break;

      case 'confirm':
        if (command.toLowerCase() === 'y' || command.toLowerCase() === 'yes') {
          addLog({ type: 'system', text: 'Transmitting packet...' });
          setStep('sending');
          
          // Fake submission
          setTimeout(() => {
            addLog({ type: 'system', text: 'Packet sent successfully ✓' });
            addLog({ type: 'system', text: 'Connection terminated. Type "sendmsg" to restart.' });
            setStep('start'); // Reset to start
            setFormData({ name: '', email: '', message: '' });
          }, 2000);
        } else if (command.toLowerCase() === 'n' || command.toLowerCase() === 'no') {
          addLog({ type: 'system', text: 'Transmission aborted.' });
          addLog({ type: 'system', text: 'Type "sendmsg" to restart.' });
          setStep('start');
          setFormData({ name: '', email: '', message: '' });
        } else {
          addLog({ type: 'error', text: 'Invalid input. Please enter [Y/N].' });
        }
        break;
      
      case 'sending':
        // Do nothing while sending
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
          {/* Interactive Terminal */}
          <div 
            className="terminal-border bg-black/70 font-mono text-sm h-96 flex flex-col"
            onClick={() => inputRef.current?.focus()} // Focus input on terminal click
          >
            {/* Terminal Header */}
            <div className="terminal-header flex items-center bg-muted/30 p-2 border-b border-primary/30">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-grow text-center text-muted-foreground text-xs">pannag@portfolio: ~/contact</div>
            </div>
            
            {/* Terminal Body */}
            <div ref={logContainerRef} className="flex-grow overflow-y-auto p-4 space-y-1 terminal-text-glow">
              {log.map((line, index) => (
                <div key={index} className="flex">
                  {line.type === 'input' && (
                    <div className="flex w-full">
                      <span className="text-primary">pannag@portfolio:~$</span>
                      <span className="flex-1 ml-2">{line.text}</span>
                    </div>
                  )}
                  {line.type === 'system' && <div className="text-muted-foreground">{line.text}</div>}
                  {line.type === 'prompt' && <div className="text-secondary">{line.text}</div>}
                  {line.type === 'error' && <div className="text-destructive">{line.text}</div>}
                </div>
              ))}
            </div>
            
            {/* Terminal Input Line */}
             {step !== 'sending' && (
              <form onSubmit={handleCommand} className="flex items-center p-4 border-t border-primary/30">
                <label className="text-primary mr-2">
                  {step === 'start' ? 'pannag@portfolio:~$' : `${getPromptLabel()}`}
                </label>
                <input
                  ref={inputRef}
                  type={step === 'email' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-grow bg-transparent text-foreground focus:outline-none"
                  disabled={step === 'sending'}
                />
                <span className="terminal-cursor"></span>
              </form>
            )}
          </div>

          {/* Contact Links */}
          <div className="space-y-4">
            {contacts.map((contact) => (
              <ExternalLink
                key={contact.label}
                href={contact.href}
                className="terminal-border p-4 bg-card/50 hover:shadow-lg hover:shadow-primary/30 transition-all block"
              >
                <div className="font-mono text-sm text-secondary">[{contact.label}]</div>
                <div className="text-muted-foreground font-mono text-sm mt-1 hover:text-primary transition-colors">
                  {contact.value}
                </div>
              </ExternalLink>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center border-t border-primary/30 pt-8">
          <p className="font-mono text-muted-foreground text-sm">
            {"> © 2025 Pannag Kumaar. All systems operational."}
          </p>
          <p className="font-mono text-primary text-xs mt-2">{"> Explore. Learn. Build. Secure."}</p>
        </div>
      </div>
    </section>
  )
}