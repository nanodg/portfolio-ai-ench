// Import statements
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { SkeletonCard } from './SkeletonCard'

// Interfaces
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

interface ProjectContentProps {
  project: Project
  truncatedDescription: string
  showReadMore: boolean
}

interface ProjectLinksProps {
  github: string
  demo: string
}

// Constants
const DESCRIPTION_MAX_LENGTH = 100

// Helper functions
const getTruncatedDescription = (description: string): string => {
  if (description.length <= DESCRIPTION_MAX_LENGTH) {
    return description
  }
  return `${description.slice(0, DESCRIPTION_MAX_LENGTH)}...`
}

const openInNewTab = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

// Components
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = project.image
    img.onload = () => setImageLoaded(true)
  }, [project.image])

  if (!imageLoaded) {
    return <SkeletonCard />
  }

  const truncatedDescription = getTruncatedDescription(project.description)
  const showReadMore = project.description.length > DESCRIPTION_MAX_LENGTH

  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-xl font-bold">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <ProjectContent
          project={project}
          truncatedDescription={truncatedDescription}
          showReadMore={showReadMore}
        />
      </CardContent>

      <CardFooter className="mt-auto pt-4 border-t">
        <ProjectLinks
          github={project.github}
          demo={project.demo}
        />
      </CardFooter>
    </Card>
  )
}

const ProjectContent = ({ project, truncatedDescription, showReadMore }: ProjectContentProps) => (
  <div className="flex flex-col sm:flex-row items-start gap-4">
    <Avatar className="w-20 h-20 rounded-full overflow-hidden group">
      <AvatarImage
        src={project.image}
        alt={project.title}
        className="object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
      />
      <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Avatar>

    <div className="flex-1 space-y-4">
      <CardDescription className="text-sm">
        {truncatedDescription}
        {showReadMore && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                Hover Me 👋
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
          <Badge
            key={tech}
            variant="secondary"
            className="px-2 py-1 text-xs"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  </div>
)

const ProjectLinks = ({ github, demo }: ProjectLinksProps) => (
  <div className="flex justify-between w-full">
    <Button
      onClick={() => openInNewTab(github)}
      variant="outline"
      className="w-[48%]"
    >
      <GithubIcon />
      GitHub
    </Button>
    <Button
      onClick={() => openInNewTab(demo)}
      className="w-[48%]"
    >
      <LiveDemoIcon />
      Live Demo
    </Button>
  </div>
)

// Icons
const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LiveDemoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)
