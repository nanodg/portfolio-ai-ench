import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { ProjectCard, Project } from './ProjectCard'
import { SkeletonCard } from './SkeletonCard'
import { mockProjects } from './mockData'
import { Button } from "@/components/ui/Button"

// Konstanta
const PROJECTS_PER_PAGE = 8
const INITIAL_PAGE = 1
const ANIMATION_DURATION = 0.5

const Projects = () => {
  // State
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)

  // Load projects saat komponen dimount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setProjects(mockProjects)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  // Hitung projects yang ditampilkan per halaman
  const paginatedProjects = useMemo(() => {
    const lastIndex = currentPage * PROJECTS_PER_PAGE
    const firstIndex = lastIndex - PROJECTS_PER_PAGE
    return projects.slice(firstIndex, lastIndex)
  }, [currentPage, projects])

  // Hitung total halaman
  const totalPages = useMemo(() => {
    return Math.ceil(projects.length / PROJECTS_PER_PAGE)
  }, [projects.length])

  // Render tombol pagination
  const paginationButtons = useMemo(() => {
    if (loading || projects.length <= PROJECTS_PER_PAGE) {
      return null
    }

    return (
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            variant={currentPage === index + 1 ? "default" : "outline"}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    )
  }, [loading, projects.length, currentPage, totalPages])

  // Render project cards
  const projectCards = useMemo(() => {
    if (loading) {
      return [...Array(4)].map((_, index) => (
        <SkeletonCard key={index} />
      ))
    }

    return paginatedProjects.map((project) => (
      <ProjectCard
        key={project.title}
        project={project}
      />
    ))
  }, [loading, paginatedProjects])

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION }}
        >
          <h2 className="text-3xl font-bold mb-8">
            Some Things I've Built
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectCards}
          </div>

          {paginationButtons}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
