import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Navbar from '@/components/layout/Navbar'
import LogisticsScene from '@/components/3d/LogisticsScene'
import { 
  Truck, 
  MapPin, 
  BarChart3, 
  Shield, 
  Zap, 
  Clock,
  Users,
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import heroImage from '@/assets/hero-logistics.jpg'

export default function Index() {
  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Real-time Tracking",
      description: "Track your shipments in real-time with our advanced GPS monitoring system."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and reporting to optimize your logistics operations."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Integration",
      description: "Enterprise-grade security with seamless backend system integration."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized performance for high-volume operations during peak times."
    }
  ]

  const benefits = [
    "Never lose an order with our resilient architecture",
    "Handle high volumes during peak shopping seasons", 
    "Seamless integration with CMS, ROS, and WMS systems",
    "Comprehensive billing and contract management",
    "Real-time notifications and status updates",
    "Advanced route optimization capabilities"
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-12">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* 3D Scene Overlay */}
        <div className="absolute inset-0 z-10 opacity-30">
          <LogisticsScene />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Next-Generation
              <span className="block text-gradient-primary text-9xl">
                Logistics Portal
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Empower your e-commerce business with SwiftTrack's comprehensive logistics management platform. 
              Real-time tracking, seamless integration, and enterprise-grade reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="glass" size="xl" className="w-full sm:w-auto">
                  Client Portal
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">1M+</div>
                <div className="text-gray-300">Deliveries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
                <div className="text-gray-300">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">24/7</div>
                <div className="text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Logistics
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to streamline your logistics operations and scale your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose SwiftTrack?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Built specifically for e-commerce businesses that need reliable, 
                scalable logistics solutions with seamless system integration.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link to="/signup">
                  <Button variant="gradient" size="lg">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <LogisticsScene interactive={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join hundreds of e-commerce businesses already using SwiftTrack to streamline their operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                Existing Client?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">SwiftTrack</span>
            </div>
            
            <div className="text-muted-foreground text-center md:text-right">
              <p>&copy; 2024 Swift Logistics (Pvt) Ltd. All rights reserved.</p>
              <p className="text-sm">Advanced logistics solutions for modern businesses.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}