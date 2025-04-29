import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Terminal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CommandHistory {
  command: string;
  output: string;
}

interface FileSystem {
  [key: string]: {
    type: 'directory' | 'file';
    content: string | FileSystem;
  };
}

const TerminalPractice = () => {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState("/home/user");
  const [fileSystem, setFileSystem] = useState<FileSystem>({
    '/home/user': {
      type: 'directory',
      content: {
        'Documents': { type: 'directory', content: {} },
        'Downloads': { type: 'directory', content: {} },
        'Pictures': { type: 'directory', content: {} },
        'Music': { type: 'directory', content: {} },
        'Videos': { type: 'directory', content: {} },
      }
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const getCurrentDirectoryContent = (): FileSystem => {
    const pathParts = currentDirectory.split('/').filter(Boolean);
    let current: FileSystem | string = fileSystem;
    
    for (const part of pathParts) {
      if (typeof current === 'string') return {};
      if (!current[part]) return {};
      current = current[part].content;
    }
    
    return typeof current === 'string' ? {} : current;
  };

  const createDirectory = (path: string, dirName: string) => {
    const pathParts = path.split('/').filter(Boolean);
    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    
    let current: any = newFileSystem;
    
    for (const part of pathParts) {
      if (!current[part]) current[part] = { type: 'directory', content: {} };
      current = current[part].content;
    }
    
    current[dirName] = { type: 'directory', content: {} };
    setFileSystem(newFileSystem);
  };

  const createFile = (path: string, fileName: string, content: string = '') => {
    const pathParts = path.split('/').filter(Boolean);
    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    
    let current: any = newFileSystem;
    
    for (const part of pathParts) {
      if (!current[part]) current[part] = { type: 'directory', content: {} };
      current = current[part].content;
    }
    
    current[fileName] = { type: 'file', content: content };
    setFileSystem(newFileSystem);
  };

  const removeItem = (path: string, name: string) => {
    const pathParts = path.split('/').filter(Boolean);
    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    
    let current: any = newFileSystem;
    
    for (const part of pathParts) {
      if (!current[part]) return false;
      current = current[part].content;
    }
    
    if (current[name]) {
      delete current[name];
      setFileSystem(newFileSystem);
      return true;
    }
    
    return false;
  };

  const handleCommand = (command: string) => {
    const parts = command.trim().split(" ");
    const mainCommand = parts[0];
    const args = parts.slice(1);
    let output = "";

    switch (mainCommand) {
      case "pwd":
        output = currentDirectory;
        break;
      case "ls":
        const dirContent = getCurrentDirectoryContent();
        if (Object.keys(dirContent).length === 0) {
          output = "Directory is empty";
        } else {
          output = Object.entries(dirContent)
            .map(([name, item]) => `${(item as any).type === 'directory' ? name + '/' : name}`)
            .join("\n");
        }
        break;
      case "cd":
        if (args.length === 0) {
          setCurrentDirectory("/home/user");
          output = "";
        } else if (args[0] === "..") {
          const newPath = currentDirectory.split("/").slice(0, -1).join("/");
          setCurrentDirectory(newPath || "/");
          output = "";
        } else if (args[0]) {
          const targetDir = args[0].startsWith('/') 
            ? args[0] 
            : `${currentDirectory === '/' ? '' : currentDirectory}/${args[0]}`;
          const dirExists = getCurrentDirectoryContent()[args[0]]?.type === 'directory';
          
          if (dirExists) {
            setCurrentDirectory(targetDir);
            output = "";
          } else {
            output = `cd: ${args[0]}: No such directory`;
          }
        }
        break;
      case "mkdir":
        if (args.length === 0) {
          output = "mkdir: missing operand";
        } else {
          const dirName = args[0];
          createDirectory(currentDirectory, dirName);
          output = `Created directory: ${dirName}`;
        }
        break;
      case "touch":
        if (args.length === 0) {
          output = "touch: missing file operand";
        } else {
          const fileName = args[0];
          createFile(currentDirectory, fileName);
          output = `Created file: ${fileName}`;
        }
        break;
      case "rm":
        if (args.length === 0) {
          output = "rm: missing operand";
        } else if (args[0] === "-r" && args.length > 1) {
          const removed = removeItem(currentDirectory, args[1]);
          output = removed ? `Removed: ${args[1]}` : `No such file or directory: ${args[1]}`;
        } else {
          const removed = removeItem(currentDirectory, args[0]);
          output = removed ? `Removed: ${args[0]}` : `No such file or directory: ${args[0]}`;
        }
        break;
      case "cat":
        if (args.length === 0) {
          output = "cat: missing file operand";
        } else {
          const dirContent = getCurrentDirectoryContent();
          const file = dirContent[args[0]];
          if (file && (file as any).type === 'file') {
            output = (file as any).content || "(empty file)";
          } else {
            output = `cat: ${args[0]}: No such file`;
          }
        }
        break;
      case "echo":
        if (args.length > 2 && args[1] === ">") {
          // Echo with redirection
          const content = args[0];
          const fileName = args[2];
          createFile(currentDirectory, fileName, content);
          output = "";
        } else {
          output = args.join(" ");
        }
        break;
      case "clear":
        setCommandHistory([]);
        return;
      case "help":
        output = `Available commands:
pwd - Print working directory
ls - List directory contents
cd - Change directory
mkdir - Create directory
touch - Create an empty file
rm - Remove file (use -r for directories)
cat - Display file contents
echo - Display text or write to file with >
clear - Clear the terminal
help - Show this help message
man - Show manual pages for commands
whoami - Display current logged in user
date - Display current date and time
top - Show running processes
df - Display disk space usage
du - Show directory space usage
ps - Show running processes
find - Search for files and directories`;
        break;
      case "man":
        output = "Manual pages are not implemented in this terminal.";
        break;
      case "whoami":
        output = "user";
        break;
      case "date":
        output = new Date().toLocaleString();
        break;
      case "top":
        output = "Running processes:\n(Here you would see process details)";
        break;
      case "df":
        output = "Filesystem Disk Space Usage\n(Details of filesystem space would appear here)";
        break;
      case "du":
        output = "Directory Space Usage\n(Details of directory usage would appear here)";
        break;
      case "ps":
        output = "Process status:\n(Here you would see process status)";
        break;
      case "find":
        output = "find: missing operand";
        break;
      default:
        output = `Command not found: ${mainCommand}. Type 'help' for available commands.`;
    }

    setCommandHistory(prev => [...prev, { command, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-terminal-dark">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <Terminal className="h-6 w-6 text-terminal-green" />
          <h1 className="text-2xl font-bold text-terminal-green">Practice Terminal</h1>
        </div>

        <Card className="bg-terminal-dark border border-terminal-green/20">
          <CardHeader>
            <CardTitle className="text-terminal-green flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Linux Terminal Simulator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={terminalRef}
              className="bg-[#1a1a1a] rounded-lg p-4 h-[400px] overflow-y-auto font-mono text-sm"
            >
              <div className="space-y-2">
                <p className="text-terminal-green">Welcome to the Linux Terminal Simulator!</p>
                <p className="text-terminal-white/70">Type 'help' to see available commands.</p>
                {commandHistory.map((entry, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-terminal-green">user@linux:</span>
                      <span className="text-terminal-purple">{currentDirectory}$</span>
                      <span className="text-terminal-white">{entry.command}</span>
                    </div>
                    {entry.output && (
                      <pre className="text-terminal-white/80 whitespace-pre-wrap">
                        {entry.output}
                      </pre>
                    )}
                  </div>
                ))}
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <span className="text-terminal-green">user@linux:</span>
                  <span className="text-terminal-purple">{currentDirectory}$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-b-2 border-terminal-green text-terminal-white outline-none"
                  />
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default TerminalPractice;
