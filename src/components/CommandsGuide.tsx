
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, FileTerminal } from 'lucide-react';

interface CommandSection {
  title: string;
  description: string;
  commands: { command: string; description: string; }[];
}

const commandSections: CommandSection[] = [
  {
    title: "Basic File Commands",
    description: "Essential commands for file management",
    commands: [
      { command: "ls", description: "List directory contents" },
      { command: "cd /path", description: "Change directory" },
      { command: "pwd", description: "Print working directory" },
      { command: "mkdir dir", description: "Create directory" },
      { command: "rm file", description: "Remove file" },
      { command: "cp source dest", description: "Copy files/directories" },
      { command: "mv old new", description: "Move/rename files" },
      { command: "touch file", description: "Create empty file" },
      { command: "find . -name", description: "Search for files" },
      { command: "ln -s file link", description: "Create symbolic link" }
    ]
  },
  {
    title: "File Viewing Commands",
    description: "Commands for viewing file contents",
    commands: [
      { command: "cat file", description: "Display file content" },
      { command: "less file", description: "View file with pagination" },
      { command: "head file", description: "Show first lines of file" },
      { command: "tail file", description: "Show last lines of file" },
      { command: "grep pattern", description: "Search text in files" },
      { command: "wc file", description: "Count lines, words, bytes" },
      { command: "diff file1 file2", description: "Compare files" },
      { command: "sort file", description: "Sort file contents" }
    ]
  },
  {
    title: "System Commands",
    description: "System monitoring and control",
    commands: [
      { command: "top", description: "Display system processes" },
      { command: "ps aux", description: "List running processes" },
      { command: "df -h", description: "Show disk space usage" },
      { command: "free -m", description: "Display memory usage" },
      { command: "uptime", description: "Show system uptime" },
      { command: "uname -a", description: "Show system information" },
      { command: "lsblk", description: "List block devices" },
      { command: "dmesg", description: "Show kernel messages" }
    ]
  },
  {
    title: "User Management",
    description: "Commands for managing users",
    commands: [
      { command: "useradd user", description: "Create new user" },
      { command: "passwd user", description: "Change user password" },
      { command: "usermod", description: "Modify user account" },
      { command: "userdel user", description: "Delete user account" },
      { command: "groups user", description: "Show user groups" },
      { command: "id user", description: "Show user ID info" },
      { command: "su username", description: "Switch user" },
      { command: "who", description: "Show logged-in users" }
    ]
  },
  {
    title: "Permissions",
    description: "File permission management",
    commands: [
      { command: "chmod", description: "Change file permissions" },
      { command: "chown", description: "Change file owner" },
      { command: "chgrp", description: "Change group ownership" },
      { command: "umask", description: "Set default permissions" },
      { command: "setfacl", description: "Set file ACLs" },
      { command: "getfacl", description: "Display file ACLs" }
    ]
  },
  {
    title: "Network Commands",
    description: "Network configuration and monitoring",
    commands: [
      { command: "ip addr", description: "Show IP addresses" },
      { command: "ping host", description: "Test connectivity" },
      { command: "netstat", description: "Network statistics" },
      { command: "ss", description: "Socket statistics" },
      { command: "traceroute", description: "Trace packet route" },
      { command: "nslookup", description: "DNS lookup" },
      { command: "curl url", description: "Transfer data" },
      { command: "wget url", description: "Download files" }
    ]
  },
  {
    title: "Package Management",
    description: "Software installation and updates",
    commands: [
      { command: "apt update", description: "Update package list" },
      { command: "apt install", description: "Install package" },
      { command: "apt remove", description: "Remove package" },
      { command: "dpkg -i file.deb", description: "Install .deb file" },
      { command: "snap install", description: "Install snap package" },
      { command: "apt search", description: "Search packages" }
    ]
  },
  {
    title: "Process Control",
    description: "Process management commands",
    commands: [
      { command: "kill pid", description: "Terminate process" },
      { command: "killall name", description: "Kill by name" },
      { command: "nice", description: "Set process priority" },
      { command: "renice", description: "Change priority" },
      { command: "nohup", description: "Run immune to hangups" },
      { command: "pidof", description: "Find process ID" }
    ]
  }
];

const CommandsGuide: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <FileTerminal className="h-6 w-6 text-terminal-green" />
        <h2 className="text-2xl font-bold text-terminal-green">Essential Linux Commands</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {commandSections.map((section) => (
          <Card key={section.title} className="bg-terminal-dark border border-terminal-green/20 hover:border-terminal-green/40 transition-colors">
            <CardHeader>
              <CardTitle className="text-terminal-green flex items-center gap-2">
                <Command className="h-5 w-5" />
                {section.title}
              </CardTitle>
              <CardDescription className="text-terminal-white/70">
                {section.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.commands.map((cmd) => (
                  <div key={cmd.command} className="flex items-start">
                    <code className="bg-black/30 px-2 py-1 rounded text-terminal-green font-mono min-w-[120px]">
                      {cmd.command}
                    </code>
                    <span className="ml-3 text-terminal-white/60">
                      {cmd.description}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CommandsGuide;
