
import { LayoutHeader } from "@/components/layouts/LayoutHeader"
import { Button } from "@/components/ui/button"
import { MessageSquare, Search, ThumbsUp, Bot } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function LandingPage() {

  const navigate = useNavigate()

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="fixed w-full z-40">
        <LayoutHeader />
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-background/50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">AI-Powered Recommendations & Advice</h1>
              <p className="text-xl text-muted-foreground">
                Meet your personal AI assistants: Hestia for smart recommendations and Athena for expert advice on any
                listing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={() => navigate('/chat')} className="bg-primary hover:bg-primary/90">
                  <Bot className="h-4 w-4" /> Try Hestia AI 
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="bg-card rounded-xl shadow-xl p-6 border border-border">
                  <div className="flex items-center gap-3 border-b pb-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI Chat Assistant</h3>
                      <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">I'm looking for a beachfront property under $500k</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 ml-auto max-w-[80%]">
                      <p className="text-sm font-medium text-primary">Hestia AI</p>
                      <p className="text-sm">
                        I've found 3 beachfront properties that match your criteria. Would you like to see them?
                      </p>
                    </div>
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Yes, and what do you think about the investment potential?</p>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-3 ml-auto max-w-[80%]">
                      <p className="text-sm font-medium text-secondary">Athena AI</p>
                      <p className="text-sm">
                        Based on market trends, beachfront properties in this area have appreciated 12% annually over
                        the last 5 years, making them excellent investment opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistants Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Your AI Assistants</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powered by advanced AI, our chatbots help you find and understand listings with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Hestia AI */}
            <div className="bg-primary/5 rounded-xl p-8 border border-primary/10 transition-all hover:shadow-md">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Hestia AI</h3>
              <p className="text-muted-foreground mb-6">
                Hestia analyzes thousands of listings to recommend the perfect matches based on your preferences and
                search history.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary">•</div>
                  <span>Personalized recommendations</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary">•</div>
                  <span>Smart filtering based on your preferences</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary">•</div>
                  <span>Discovers hidden gems you might have missed</span>
                </li>
              </ul>
            </div>

            {/* Athena AI */}
            <div className="bg-primary/5 rounded-xl p-8 border border-primary/10 transition-all hover:shadow-md">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <ThumbsUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Athena AI</h3>
              <p className="text-muted-foreground mb-6">
                Athena provides expert advice and insights on any listing, helping you make informed decisions with
                confidence.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary">•</div>
                  <span>Provides insights of properties to ease decision making</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary">•</div>
                  <span>Negotiation tips and comparable listings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Getting AI-powered recommendations and advice has never been easier.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Chat with Hestia</h3>
              <p className="text-muted-foreground">
                Ask Hestia to recommend listings based on your specific criteria and preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Advice from Athena</h3>
              <p className="text-muted-foreground">
                Ask Athena for detailed insights and advice about any listing you're interested in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our AI assistants have helped users find their perfect match.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-muted mr-4"></div>
                <div>
                  <h4 className="font-bold">Sarah K.</h4>
                  <p className="text-sm text-muted-foreground">Home Buyer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Hestia recommended a property I would have never found on my own. It was exactly what I was looking for
                but in a neighborhood I hadn't considered."
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-muted mr-4"></div>
                <div>
                  <h4 className="font-bold">Michael T.</h4>
                  <p className="text-sm text-muted-foreground">Investor</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Athena's market analysis helped me identify an investment property with great potential. Her advice on
                negotiation saved me thousands."
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-muted mr-4"></div>
                <div>
                  <h4 className="font-bold">Jennifer L.</h4>
                  <p className="text-sm text-muted-foreground">First-time Buyer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "As a first-time buyer, I had so many questions. Having both Hestia and Athena guide me through the
                process made everything so much easier."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 text-primary-foreground py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Find Your Perfect Match?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-foreground">
            Join thousands of satisfied users who found their ideal listings with the help of our AI assistants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Link to={"/auth/signup"}>
                Register
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">© 2025 AI Chatbot App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
