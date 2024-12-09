import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './components/home/Home'
import About from './components/about/About'
import Projects from './components/projects/Projects'
import Contact from './components/contact/Contact'
import Footer from './components/layout/Footer'
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <Router>
      <div className="min-h-screen w-screen flex flex-col overflow-x-hidden bg-background text-foreground">
        <Navbar />
        <Toaster />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
