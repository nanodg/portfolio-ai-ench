import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/Button"

const Home = () => (
  <section className="section-padding min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 text-center sm:text-left"
      >
        <h2 className="text-secondary text-base sm:text-lg">Hi, my name is</h2>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold">Your Name</h1>
        <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold text-muted-foreground">
          I build things for the web.
        </h3>
        <p className="max-w-xl text-muted-foreground mx-auto sm:mx-0">
          I'm a software developer specializing in building exceptional digital experiences.
          Currently, I'm focused on building accessible, human-centered products.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Button asChild>
            <Link to="/projects">View My Work</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
)

export default Home
