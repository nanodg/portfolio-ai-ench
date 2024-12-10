export interface FormData {
    name: string
    email: string
    message: string
}

export interface FormField {
    id: keyof FormData
    label: string
    type: string
    placeholder: string
} 