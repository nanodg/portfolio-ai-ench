import { useState, useEffect } from 'react'
import { Link, useLocation, To } from 'react-router-dom'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserIcon,
  FolderIcon,
  EnvelopeIcon,
  SunIcon,
  MoonIcon,
  // DocumentIcon
} from '@heroicons/react/24/solid'
import {
  HomeIcon as HomeIconOutline,
  UserIcon as UserIconOutline,
  FolderIcon as FolderIconOutline,
  EnvelopeIcon as EnvelopeIconOutline,
  // DocumentIcon as DocumentIconOutline
} from '@heroicons/react/24/outline'
import { useTheme } from '../../hooks/use-theme'

interface NavigationItem {
  name: string;
  path?: To;
  href?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  outlineIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navigation: NavigationItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIcon,
    outlineIcon: HomeIconOutline
  },
  {
    name: 'About',
    path: '/about',
    icon: UserIcon,
    outlineIcon: UserIconOutline
  },
  // {
  //   name: 'Resume',
  //   path: '/resume',
  //   icon: DocumentIcon,
  //   outlineIcon: DocumentIconOutline
  // },
  {
    name: 'Projects',
    path: '/projects',
    icon: FolderIcon,
    outlineIcon: FolderIconOutline
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: EnvelopeIcon,
    outlineIcon: EnvelopeIconOutline
  }
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getNavbarClass = () => {
    if (isOpen) {
      return 'bg-primary text-background dark:bg-primary-dark'
    }
    if (isScrolled) {
      return 'bg-background/30 backdrop-blur-md text-primary shadow-md dark:bg-background-dark/80 dark:text-primary-dark'
    }
    return 'bg-transparent text-primary dark:text-primary-dark'
  }

  const getLinkClass = (isActive: boolean) => {
    const baseClass = 'transition-colors px-3 py-2 text-sm flex items-center'
    if (isOpen) {
      return `${baseClass} text-background hover:bg-primary-dark dark:hover:bg-primary-light`
    }
    if (isActive) {
      return `${baseClass} text-primary dark:text-primary-dark`
    }
    return `${baseClass} text-muted-foreground hover:text-primary dark:hover:text-primary-dark`
  }

  const getMobileLinkClass = (isActive: boolean) => {
    const baseClass = 'flex items-center px-3 py-2 text-base'
    if (isActive) {
      return `${baseClass} text-background bg-primary-light dark:bg-primary-dark font-bold`
    }
    return `${baseClass} text-background hover:bg-primary-light dark:hover:bg-primary-dark`
  }

  const ThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
    </button>
  )

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${getNavbarClass()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className={`text-2xl font-extrabold ${isOpen ? 'text-background' : 'text-primary dark:text-primary-dark'}`}
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navigation.map(({ name, path, icon: Icon, outlineIcon: OutlineIcon }) => {
                if (!path) return null;
                const isActive = location.pathname === path
                const IconComponent = isOpen || isActive ? Icon : OutlineIcon
                return (
                  <Link key={name} to={path} className={getLinkClass(isActive)}>
                    {IconComponent && <IconComponent className="h-6 w-6 mr-2" />}
                    {name}
                  </Link>
                )
              })}
            </div>
            <ThemeToggleButton />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <ThemeToggleButton />
            <button
              onClick={() => {
                console.log('Current theme:', theme);
                setIsOpen(!isOpen);
              }}
              className={`${isOpen ? 'text-background' : theme === 'dark' ? 'text-primary-dark hover:text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary dark:bg-primary-dark">
          {navigation.map(({ name, path, icon: Icon }) => {
            if (!path) return null;
            return (
              <Link
                key={name}
                to={path}
                className={getMobileLinkClass(location.pathname === path)}
                onClick={() => setIsOpen(false)}
              >
                {Icon && <Icon className="h-6 w-6 mr-2" />}
                {name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  )
}

export default Navbar