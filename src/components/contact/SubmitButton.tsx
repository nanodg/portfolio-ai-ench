import { Button } from "@/components/ui/Button"
import { LoadingSpinner } from './LoadingSpinner'

interface SubmitButtonProps {
    isLoading: boolean
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => (
    <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
    >
        {isLoading ? (
            <div className="flex items-center justify-center">
                <LoadingSpinner />
                Sending...
            </div>
        ) : (
            <div className="flex items-center justify-center">
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
            </div>
        )}
    </Button>
) 