import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Code, Globe, Server, Database, LayoutDashboard } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import InteractiveResume from '../resume/InteractiveResume'

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillLevel {
  title: string;
  description: string;
  opacity: string;
  skills: Skill[];
}

const skillLevels: SkillLevel[] = [
  {
    title: "Expert",
    description: "Advanced proficiency and deep understanding",
    opacity: "20",
    skills: [
      { name: 'JavaScript (ES6+)', icon: <Code size={16} /> },
      { name: 'TypeScript', icon: <Code size={16} /> },
      { name: 'React', icon: <Globe size={16} /> },
    ]
  },
  {
    title: "Intermediate",
    description: "Strong working knowledge and experience",
    opacity: "15",
    skills: [
      { name: 'Angular', icon: <Globe size={16} /> },
      { name: '.Net', icon: <Server size={16} /> },
      { name: 'Bootstrap', icon: <LayoutDashboard size={16} /> },
    ]
  },
  {
    title: "Beginner",
    description: "Basic understanding and learning in progress",
    opacity: "10",
    skills: [
      { name: 'Sql', icon: <Database size={16} /> },
      { name: 'Node.js', icon: <Server size={16} /> },
    ]
  }
];

const ProfileImage = () => (
  <div className="relative flex items-center justify-center">
    <div className="relative w-56 h-56 rounded-full overflow-hidden group transition-transform duration-300 hover:scale-105 shadow-[0_10px_40px_-15px] shadow-primary/50">
      <img
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=512&h=512&fit=crop"
        alt="Profile"
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-primary/10 rounded-full transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-50 transition-opacity duration-300 group-hover:opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        <span className="text-sm font-medium block">Your Name</span>
        <span className="text-xs text-white/80">Full Stack Developer</span>
      </div>
    </div>
    <div className="absolute inset-0 border-2 border-primary rounded-full translate-x-3 translate-y-3 -z-10 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
  </div>
);

const DownloadButton = () => (
  <button
    onClick={() => {
      const link = document.createElement('a');
      link.href = '/path/to/your/cv.pdf';
      link.download = 'MyCV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }}
    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
  >
    <svg
      className="w-5 h-5 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
    Download CV
  </button>
);

const About = () => {
  return (
    <motion.section
      className="container py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">About Me</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="md:hidden">
            <ProfileImage />
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-muted-foreground text-justify">
                  Hello! I'm [Your Name], passionate about web development. My journey began in [year] with custom Tumblr themes, sparking my interest in HTML & CSS.
                </p>
                <p className="text-muted-foreground text-justify">
                  Today, I've worked on [companies/projects], focusing on creating accessible and inclusive digital experiences.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {skillLevels.map((level, index) => (
                    <div key={level.title} className="relative md:px-4 first:pl-0 last:pr-0">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`text-sm font-medium text-primary/${level.opacity} cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary/${level.opacity} after:transition-all after:duration-300 hover:after:w-full`}>
                              {level.title}
                            </h4>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-48">
                          <div className="text-xs text-muted-foreground">
                            {level.description}
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                      <div className="flex flex-wrap gap-1">
                        {level.skills.map((skill) => (
                          <Badge
                            key={skill.name}
                            variant="secondary"
                            className={`flex items-center gap-1 bg-secondary/${level.opacity} hover:bg-secondary/${Number(level.opacity) + 10} transition-colors`}
                          >
                            {skill.icon}
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                      {index < skillLevels.length - 1 && (
                        <>
                          <div className="md:hidden h-px w-full bg-border my-4" />
                          <div className="hidden md:block absolute -right-0.5 top-0 w-px h-full bg-border" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block space-y-6">
              <ProfileImage />
              <div className="flex justify-center">
                <DownloadButton />
              </div>
            </div>
          </div>

          <div className="md:hidden flex justify-center">
            <DownloadButton />
          </div>
        </CardContent>
        <InteractiveResume />
      </Card>

    </motion.section>
  )
}

export default About
