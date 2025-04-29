
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const quizTopics: QuizTopic[] = [
  {
    id: "linux-fundamentals",
    title: "Linux Fundamentals",
    description: "Test your knowledge of Linux fundamentals and basics",
    questions: [
      {
        id: 1,
        question: "What is the correct way to display the first 10 lines of a file in Linux?",
        options: [
          "cat -n 10 filename",
          "head -n 10 filename",
          "tail -n 10 filename",
          "less -n 10 filename"
        ],
        correctAnswer: 1,
        explanation: "The 'head -n 10 filename' command displays the first 10 lines of a file."
      },
      {
        id: 2,
        question: "Which command is used to view the running processes in Linux?",
        options: ["ls", "cat", "ps", "pwd"],
        correctAnswer: 2,
        explanation: "The 'ps' command is used to view the currently running processes."
      },
      {
        id: 3,
        question: "What command would you use to create a new directory?",
        options: ["touch", "mkdir", "cd", "rmdir"],
        correctAnswer: 1,
        explanation: "The 'mkdir' command is used to create a new directory in Linux."
      },
      {
        id: 4,
        question: "Which file contains the encrypted passwords in Linux?",
        options: ["/etc/passwd", "/etc/shadow", "/etc/users", "/etc/security"],
        correctAnswer: 1,
        explanation: "The '/etc/shadow' file stores encrypted passwords in Linux."
      },
      {
        id: 5,
        question: "What does the chmod 755 command do?",
        options: [
          "Gives read, write, and execute permissions to owner and read and execute to group and others",
          "Gives read and write permissions to everyone",
          "Gives full permissions to everyone",
          "Removes all permissions"
        ],
        correctAnswer: 0,
        explanation: "chmod 755 gives read, write, and execute (7) to the owner, and read and execute (5) to both the group and others."
      }
    ]
  },
  {
    id: "file-permissions",
    title: "File Permissions",
    description: "Test your understanding of Linux file permissions",
    questions: [
      {
        id: 1,
        question: "What does the 'r' represent in file permissions?",
        options: ["Run", "Read", "Remove", "Rename"],
        correctAnswer: 1,
        explanation: "The 'r' represents read permissions in Linux file permissions."
      },
      {
        id: 2,
        question: "What is the numerical value of the 'write' permission in Linux?",
        options: ["1", "2", "4", "8"],
        correctAnswer: 1,
        explanation: "Write permission has a value of 2 in the octal notation."
      },
      {
        id: 3,
        question: "Which command is used to change the owner of a file?",
        options: ["chmod", "chown", "chgrp", "chattr"],
        correctAnswer: 1,
        explanation: "The 'chown' command is used to change the owner of a file."
      },
      {
        id: 4,
        question: "What permission is represented by the octal value 6?",
        options: [
          "Read and execute",
          "Read and write",
          "Write and execute",
          "Read, write, and execute"
        ],
        correctAnswer: 1,
        explanation: "The octal value 6 represents read (4) + write (2) permissions."
      },
      {
        id: 5,
        question: "What does the 'sticky bit' do when set on a directory?",
        options: [
          "Makes the directory immutable",
          "Prevents anyone from creating files in the directory",
          "Only allows the owner to delete files in the directory",
          "Makes the directory executable"
        ],
        correctAnswer: 2,
        explanation: "The sticky bit ensures that only the owner of a file can delete or rename it within that directory."
      }
    ]
  },
  {
    id: "process-management",
    title: "Process Management",
    description: "Test your knowledge of Linux process management",
    questions: [
      {
        id: 1,
        question: "What command is used to forcefully terminate a process in Linux?",
        options: ["kill -9", "stop", "terminate", "end -f"],
        correctAnswer: 0,
        explanation: "The 'kill -9 PID' command forcefully terminates a process without allowing it to perform any cleanup."
      },
      {
        id: 2,
        question: "Which key combination is used to suspend a running process in the terminal?",
        options: ["Ctrl+C", "Ctrl+Z", "Ctrl+D", "Ctrl+X"],
        correctAnswer: 1,
        explanation: "Ctrl+Z is used to suspend a currently running process in the terminal."
      },
      {
        id: 3,
        question: "What does the 'nice' command do in Linux?",
        options: [
          "Terminates processes politely",
          "Starts processes with higher priority",
          "Starts processes with lower priority",
          "Renames processes to more friendly names"
        ],
        correctAnswer: 2,
        explanation: "The 'nice' command starts a process with a lower priority, being 'nice' to other processes by using fewer resources."
      },
      {
        id: 4,
        question: "What command would you use to list all running processes with a user-friendly interface?",
        options: ["ps", "ls -p", "top", "htop"],
        correctAnswer: 3,
        explanation: "htop is an interactive process viewer that provides a user-friendly interface to monitor system processes."
      },
      {
        id: 5,
        question: "What does the 'bg' command do?",
        options: [
          "Starts a process in the background",
          "Resumes a suspended process in the background",
          "Terminates background processes",
          "Shows all background processes"
        ],
        correctAnswer: 1,
        explanation: "The 'bg' command resumes a suspended process and runs it in the background."
      }
    ]
  },
  {
    id: "disk-storage",
    title: "Disk & Storage Management",
    description: "Test your knowledge of disk and storage management in Linux",
    questions: [
      {
        id: 1,
        question: "Which command shows disk space usage in a human-readable format?",
        options: ["du -h", "df -h", "ls -lh", "free -h"],
        correctAnswer: 1,
        explanation: "The 'df -h' command displays disk space usage in a human-readable format."
      },
      {
        id: 2,
        question: "What tool would you use to create disk partitions in Linux?",
        options: ["fsck", "mount", "fdisk", "mkfs"],
        correctAnswer: 2,
        explanation: "fdisk is a dialog-driven command used for creating and manipulating disk partition tables."
      },
      {
        id: 3,
        question: "Which command is used to format a partition with the ext4 filesystem?",
        options: ["format ext4", "fdisk -t ext4", "mkfs.ext4", "fsformat -ext4"],
        correctAnswer: 2,
        explanation: "The 'mkfs.ext4' command is used to create an ext4 filesystem on a partition."
      },
      {
        id: 4,
        question: "What does LVM stand for in Linux storage management?",
        options: [
          "Linux Volume Manager",
          "Logical Volume Management",
          "Large Volume Manipulation",
          "Linux Virtualization Method"
        ],
        correctAnswer: 1,
        explanation: "LVM stands for Logical Volume Management, which is a storage management solution for Linux."
      },
      {
        id: 5,
        question: "Which file contains the filesystem mount configuration in Linux?",
        options: ["/etc/mounts", "/etc/fstab", "/proc/mounts", "/var/mount.conf"],
        correctAnswer: 1,
        explanation: "The '/etc/fstab' file contains static filesystem mount information."
      }
    ]
  }
];

export const examQuestions: Question[] = [
  {
    id: 1,
    question: "What command is used to display the manual page for a command?",
    options: ["help", "manual", "man", "info"],
    correctAnswer: 2,
    explanation: "The 'man' command displays the manual page for a specific command."
  },
  {
    id: 2,
    question: "Which directory contains most of the system configuration files in Linux?",
    options: ["/bin", "/etc", "/var", "/usr"],
    correctAnswer: 1,
    explanation: "The '/etc' directory contains most system-wide configuration files."
  },
  {
    id: 3,
    question: "What does the command 'chmod 644 file.txt' do?",
    options: [
      "Gives read and write permission to owner, and read-only to others",
      "Makes the file executable for everyone",
      "Gives full permission to owner only",
      "Makes the file readable for everyone"
    ],
    correctAnswer: 0,
    explanation: "chmod 644 gives read and write permissions (6) to the owner and read-only permissions (4) to both group and others."
  },
  {
    id: 4,
    question: "Which command is used to search for files in Linux?",
    options: ["search", "grep", "find", "locate"],
    correctAnswer: 2,
    explanation: "The 'find' command is used to search for files in a directory hierarchy based on various criteria."
  },
  {
    id: 5,
    question: "What is the purpose of the 'sudo' command?",
    options: [
      "To log in as a different user",
      "To run a command as a superuser",
      "To switch to a different directory",
      "To create a new user"
    ],
    correctAnswer: 1,
    explanation: "The 'sudo' command allows a permitted user to execute a command as the superuser or another user."
  },
  {
    id: 6,
    question: "Which command is used to create an empty file in Linux?",
    options: ["cat", "touch", "echo", "nano"],
    correctAnswer: 1,
    explanation: "The 'touch' command is used to create an empty file or update file timestamps."
  },
  {
    id: 7,
    question: "What is the purpose of the 'grep' command?",
    options: [
      "To search for text patterns in files",
      "To create graphics in the terminal",
      "To group users together",
      "To grab and move files"
    ],
    correctAnswer: 0,
    explanation: "The 'grep' command searches for text patterns in files using regular expressions."
  },
  {
    id: 8,
    question: "Which command displays the processes using the most CPU?",
    options: ["cpu", "ps", "top", "proc"],
    correctAnswer: 2,
    explanation: "The 'top' command provides a real-time view of running processes sorted by CPU usage by default."
  },
  {
    id: 9,
    question: "What does the 'useradd' command do?",
    options: [
      "Adds new hardware to the system",
      "Creates a new user account",
      "Adds a user to an existing group",
      "Increases user disk quota"
    ],
    correctAnswer: 1,
    explanation: "The 'useradd' command creates a new user account on the system."
  },
  {
    id: 10,
    question: "Which command is used to mount a filesystem in Linux?",
    options: ["mount", "attach", "connect", "link"],
    correctAnswer: 0,
    explanation: "The 'mount' command is used to mount filesystems in Linux."
  },
  {
    id: 11,
    question: "What is the default shell in most Linux distributions?",
    options: ["csh", "zsh", "bash", "fish"],
    correctAnswer: 2,
    explanation: "Bash (Bourne Again SHell) is the default shell in most Linux distributions."
  },
  {
    id: 12,
    question: "What does the command 'ls -la' do?",
    options: [
      "Lists all files sorted by size",
      "Lists all files including hidden files in long format",
      "Lists only directory names",
      "Lists files with their creation dates"
    ],
    correctAnswer: 1,
    explanation: "The 'ls -la' command lists all files and directories (including hidden ones) in long format."
  },
  {
    id: 13,
    question: "Which command is used to change your password in Linux?",
    options: ["pwd", "passwd", "password", "chpass"],
    correctAnswer: 1,
    explanation: "The 'passwd' command is used to change your user password."
  },
  {
    id: 14,
    question: "What does the 'ifconfig' command show?",
    options: [
      "Current system configuration",
      "Network interface configuration",
      "Available internet connections",
      "File system configuration"
    ],
    correctAnswer: 1,
    explanation: "The 'ifconfig' command displays network interface configuration information."
  },
  {
    id: 15,
    question: "Which command is used to view the content of a file one screen at a time?",
    options: ["more", "cat", "view", "read"],
    correctAnswer: 0,
    explanation: "The 'more' command displays text one screen at a time."
  },
  {
    id: 16,
    question: "What is the purpose of the 'cron' service in Linux?",
    options: [
      "To compress files",
      "To schedule tasks",
      "To encrypt communications",
      "To control system resources"
    ],
    correctAnswer: 1,
    explanation: "The 'cron' service is used to schedule tasks to run at specific times or intervals."
  },
  {
    id: 17,
    question: "Which command shows the amount of free and used memory in the system?",
    options: ["memory", "free", "vmstat", "meminfo"],
    correctAnswer: 1,
    explanation: "The 'free' command displays the total amount of free and used memory in the system."
  },
  {
    id: 18,
    question: "What file system is commonly used in modern Linux distributions?",
    options: ["FAT32", "NTFS", "ext4", "HFS+"],
    correctAnswer: 2,
    explanation: "ext4 (fourth extended file system) is commonly used in modern Linux distributions."
  },
  {
    id: 19,
    question: "Which key combination is used to exit the 'vi' editor without saving changes?",
    options: [":wq", ":q!", "Ctrl+C", "Esc+ZZ"],
    correctAnswer: 1,
    explanation: "':q!' is used to exit the vi editor without saving changes."
  },
  {
    id: 20,
    question: "What does the command 'ping' primarily test?",
    options: [
      "Disk access speed",
      "CPU performance",
      "Network connectivity",
      "Memory utilization"
    ],
    correctAnswer: 2,
    explanation: "The 'ping' command primarily tests network connectivity between two hosts."
  }
];
