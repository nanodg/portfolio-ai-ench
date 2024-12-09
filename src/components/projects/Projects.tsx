import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ProjectCard, Project } from './ProjectCard'
import { SkeletonCard } from './SkeletonCard'
import { mockProjects } from './mockData'
import { Button } from "@/components/ui/Button"

const Projects = () => {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 8

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 0))
      setProjects(mockProjects)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject)
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8">Some Things I've Built</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading
              ? [...Array(4)].map((_, index) => <SkeletonCard key={index} />)
              : currentProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))
            }
          </div>
          {!loading && projects.length > projectsPerPage && (
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
