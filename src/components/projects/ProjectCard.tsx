import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { SkeletonCard } from './SkeletonCard'

export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  image: string
}

interface ProjectCardProps {
  project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = project.image;
    img.onload = () => setImageLoaded(true);
  }, [project.image]);

  if (!imageLoaded) return <SkeletonCard />;

  const truncatedDescription = project.description.length > 100
    ? `${project.description.slice(0, 100)}...`
    : project.description;

  const openInNewTab = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Avatar className="w-24 h-24 rounded-full overflow-hidden">
            <AvatarImage src={project.image} alt={project.title} className="object-cover" />
          </Avatar>
          <div className="flex-1 space-y-4">
            <CardDescription className="text-sm">
              {truncatedDescription}
              {project.description.length > 100 && (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                      Read more
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm">{project.description}</p>
                  </HoverCardContent>
                </HoverCard>
              )}
            </CardDescription>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(tech => (
                <Badge key={tech} variant="secondary" className="px-2 py-1 text-xs">{tech}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4 border-t">
        <div className="flex justify-between w-full">
          <Button onClick={() => openInNewTab(project.github)} variant="outline" className="w-[48%]">
            <GithubIcon />
            GitHub
          </Button>
          <Button onClick={() => openInNewTab(project.demo)} className="w-[48%]">
            <LiveDemoIcon />
            Live Demo
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LiveDemoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)
