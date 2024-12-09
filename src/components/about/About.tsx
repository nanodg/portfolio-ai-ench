import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const About = () => {
  const skills = [
    'JavaScript (ES6+)', 'TypeScript', 'React',
    'Node.js', 'Next.js', 'Tailwind CSS',
  ]

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
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Hello! I'm [Your Name], passionate about web development. My journey began in [year] with custom Tumblr themes, sparking my interest in HTML & CSS.
            </p>
            <p className="text-muted-foreground">
              Today, I've worked on [companies/projects], focusing on creating accessible and inclusive digital experiences.
            </p>
            <div>
              <h3 className="text-xl font-semibold mb-2">Recent Technologies:</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="relative group aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-secondary/20 rounded" />
            <div className="absolute inset-0 border-2 border-primary rounded translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

export default About
