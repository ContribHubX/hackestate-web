import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useRegister } from "@/service/auth/register"
import { useNavigate } from "react-router-dom"
import { toast } from "@/hooks/use-toast"

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    contactNumber: "",
    name: "",
    confirm: "",
  })
  const navigate = useNavigate();

  const { mutate } = useRegister();

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log("Form submitted:", formData)
    console.log("email", formData.email)
    console.log("password", formData.password)
    console.log("role", formData.role)
    console.log("contact", formData.contactNumber)
    console.log("name", formData.name)

    mutate(formData, {
      onSuccess: () => {
        console.log("Successfully registered");
        navigate("/auth/login");
      },
      onError: (error) => {
        toast({
          title: "Register Error",
          description: error.message
        })
        console.log(`err: `, JSON.stringify(error, null, 2));
      }
    })
    // // Add your form submission logic here
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-primary text-4xl">Register</CardTitle>
        <CardDescription>Enter your details to register</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              placeholder="Enter your contact number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirm"
                name="confirm"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirm}
                onChange={handleInputChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={handleRoleChange} required>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
