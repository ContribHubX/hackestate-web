"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/mode-toggle"
import { Menu } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { usePropertyContext } from "@/providers/property"

export const LayoutHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAgent, setIsAgent] = useState(false)
  const navigate = useNavigate()
  const { logOut } = usePropertyContext()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Events", path: "/events" },
  ]

  // Check user login status and role from localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setIsLoggedIn(true)
      const userInfo = JSON.parse(user)
      if (userInfo.role === "agent") {
        setIsAgent(true)
      }
    } else {
      setIsLoggedIn(false)
      setIsAgent(false)
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    logOut()
    setIsLoggedIn(false)
    setIsAgent(false)
    navigate("/auth/login")
  }

  // Handle signup button click
  const handleSignupClick = () => {
    navigate("/auth/signup")
  }

  // Handle login button click
  const handleLoginClick = () => {
    navigate("/auth/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full p-3 sm:p-4 bg-background  flex items-center justify-between shadow-sm border-b border-gray-200 dark:border-0">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <h1 onClick={() => navigate("/")}  className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">AtHOMEA</h1>
      </div>

      {/* Desktop Navigation (Only if not an agent) */}
      {!isAgent && (
        <nav className="hidden md:flex items-center justify-center">
          {navLinks.map((link, index) => (
            <Button key={index} variant="ghost" className="text-muted-foreground" onClick={() => navigate(link.path)}>
              {link.name}
            </Button>
          ))}
        </nav>
      )}

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <ModeToggle />

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-2">
          {isLoggedIn ? (
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleSignupClick} className="whitespace-nowrap">
                Sign up
              </Button>
              <Button className="bg-primary whitespace-nowrap" onClick={handleLoginClick}>
                Log in
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Dropdown */}
        <div className="md:hidden">
          <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="end">
              <div className="flex flex-col space-y-2">
                {!isAgent &&
                  navLinks.map((link, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => {
                        navigate(link.path)
                        setIsMenuOpen(false)
                      }}
                    >
                      {link.name}
                    </Button>
                  ))}
                <div className="my-2 border-t border-muted" />
                {isLoggedIn ? (
                  <Button variant="destructive" onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleSignupClick} className="w-full">
                      Sign up
                    </Button>
                    <Button className="bg-primary w-full" onClick={handleLoginClick}>
                      Log in
                    </Button>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
