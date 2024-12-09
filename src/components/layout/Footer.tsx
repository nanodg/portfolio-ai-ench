import { cn } from "@/lib/utils"
import { Github, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: Linkedin },
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: Twitter },
  ];

  return (
    <footer className={cn(
      "w-full bg-background/80 backdrop-blur-sm",
      "fixed bottom-0 left-0 right-0 z-10",
      "border-t border-border/40"
    )}>
      <div className="w-full max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
