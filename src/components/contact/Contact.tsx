import { motion } from 'framer-motion'
import { useState, FormEvent, ChangeEvent } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card"
import { useToast } from "../../hooks/use-toast"
import { useTheme } from "../../hooks/use-theme"
import { ContactForm } from './ContactForm'
import { FormData } from './types'

const initialFormState: FormData = {
  name: '',
  email: '',
  message: ''
}

const GOOGLE_SHEETS_URL = 'LINK SCRIPT'

const Contact = () => {
  const [formData, setFormData] = useState<FormData>(initialFormState)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const { toast } = useToast()
  const { theme } = useTheme()

  const validateForm = (data: FormData): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!data.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        newErrors.email = 'Invalid email format'
      }
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (data.message.length > 1000) {
      newErrors.message = 'Message is too long (maximum 1000 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    if (errors[id as keyof FormData]) {
      setErrors(prev => ({ ...prev, [id]: '' }))
    }
  }

  const showSuccessToast = () => {
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I will get back to you soon.",
      className: theme === 'dark' ? "bg-green-100 text-black" : "bg-green-100",
    })
  }

  const showErrorToast = (error: unknown) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: error instanceof Error ? error.message : "An error occurred. Please try again.",
      className: theme === 'dark' ? "bg-red-100 text-black" : "bg-red-400",
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm(formData)) {
      return
    }

    setIsLoading(true)

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      showSuccessToast()
      setFormData(initialFormState)

    } catch (error) {
      console.error('Error submitting form:', error)
      showErrorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="section-padding pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4"
      >
        <Card className="border-secondary">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Contact Me</CardTitle>
            <CardDescription className="text-center text-foreground/70">
              I'm currently looking for new opportunities. If you have any questions
              or just want to say hi, I'll try my best to get back to you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm
              formData={formData}
              errors={errors}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onChange={handleInputChange}
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground text-right">
              *I will reply to your message as soon as possible. Thank you!
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  )
}

export default Contact
