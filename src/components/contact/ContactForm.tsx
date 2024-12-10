import { FormEvent, ChangeEvent } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormData, FormField } from './types'
import { Button } from "@/components/ui/Button"

interface ContactFormProps {
    formData: FormData
    errors: Partial<Record<keyof FormData, string>>
    isLoading: boolean
    onSubmit: (e: FormEvent) => Promise<void>
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const formFields: FormField[] = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' }
]

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => (
    <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
    >
        {isLoading ? 'Sending...' : 'Send Message'}
    </Button>
)

export const ContactForm = ({ formData, errors, isLoading, onSubmit, onChange }: ContactFormProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {formFields.map(({ id, label, type, placeholder }) => (
                <div key={id} className="space-y-2">
                    <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
                    <Input
                        type={type}
                        id={id}
                        value={formData[id]}
                        onChange={onChange}
                        className={`bg-background text-foreground ${errors[id] ? 'border-red-500' : ''}`}
                        required
                        placeholder={placeholder}
                    />
                    {errors[id] && (
                        <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
                    )}
                </div>
            ))}
            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <Textarea
                    id="message"
                    value={formData.message}
                    onChange={onChange}
                    rows={5}
                    className={`bg-background text-foreground resize-none ${errors.message ? 'border-red-500' : ''}`}
                    required
                    placeholder="Write your message here..."
                />
                {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
            </div>
            <SubmitButton isLoading={isLoading} />
        </form>
    )
} 