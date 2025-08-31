import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-foreground">Profile</h1>
        <p className="text-muted-foreground mb-6">This is your profile page. More details coming soon.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
