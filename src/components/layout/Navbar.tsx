import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, HomeIcon, UserIcon, FolderIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { HomeIcon as HomeIconOutline, UserIcon as UserIconOutline, FolderIcon as FolderIconOutline, EnvelopeIcon as EnvelopeIconOutline } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', path: '/', icon: HomeIcon, outlineIcon: HomeIconOutline },
  { name: 'About', path: '/about', icon: UserIcon, outlineIcon: UserIconOutline },
  { name: 'Projects', path: '/projects', icon: FolderIcon, outlineIcon: FolderIconOutline },
  { name: 'Contact', path: '/contact', icon: EnvelopeIcon, outlineIcon: EnvelopeIconOutline },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navbarClass = `fixed w-full z-50 transition-all duration-300 ${isOpen ? 'bg-primary text-background' :
      isScrolled ? 'bg-background/80 backdrop-blur-md text-primary shadow-md' :
        'bg-transparent text-primary'
    }`

  const linkClass = (isActive: boolean) => `
    transition-colors px-3 py-2 text-sm flex items-center
    ${isOpen ? 'text-background hover:bg-primary-dark' :
      isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
    }
  `

  const mobileLinkClass = (isActive: boolean) => `
    flex items-center px-3 py-2 text-base
    ${isActive ? 'text-background bg-primary-light font-bold' : 'text-background hover:bg-primary-light'}
  `

  return (
    <nav className={navbarClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className={`text-2xl font-extrabold ${isOpen ? 'text-background' : 'text-primary'}`}>
            Portfolio
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map(({ name, path, icon: Icon, outlineIcon: OutlineIcon }) => {
                const isActive = location.pathname === path
                const IconComponent = isOpen || isActive ? Icon : OutlineIcon
                return (
                  <Link key={name} to={path} className={linkClass(isActive)}>
                    <IconComponent className="h-6 w-6 mr-2" />
                    {name}
                  </Link>
                )
              })}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${isOpen ? 'text-background' : 'text-muted-foreground hover:text-primary'}`}
          >
            {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-dark">
          {navigation.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className={mobileLinkClass(location.pathname === path)}
              onClick={() => setIsOpen(false)}
            >
              <Icon className="h-6 w-6 mr-2" />
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar