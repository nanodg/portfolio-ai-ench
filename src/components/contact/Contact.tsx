import { motion } from 'framer-motion'
import { useState, FormEvent, ChangeEvent } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/Button"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Add your form submission logic here
      console.log(formData)
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        className: "bg-green-100",
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
        className: "bg-red-500",
      })
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
        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Get In Touch</CardTitle>
            <CardDescription className="text-center">
              I'm currently looking for new opportunities. Whether you have a question
              or just want to say hi, I'll try my best to get back to you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id} className="space-y-2">
                  <label htmlFor={id} className="text-sm font-medium">{label}</label>
                  <Input
                    type={type}
                    id={id}
                    value={formData[id as keyof FormData]}
                    onChange={handleInputChange}
                    className="bg-tertiary"
                    required
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="bg-tertiary resize-none"
                  required
                  placeholder="Your message here..."
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">&#10227;</span>
                    Sending...
                  </>
                ) : (
                  <>
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
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

export default Contact
