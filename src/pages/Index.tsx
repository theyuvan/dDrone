import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Truck, Package, Zap, Shield, ArrowRight } from "lucide-react";
import droneImage from "@/assets/drone-delivery.png";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to dashboard after 3 seconds if user doesn't interact
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const features = [
    {
      icon: Truck,
      title: "Autonomous Delivery",
      description: "AI-powered drones deliver packages with precision and reliability"
    },
    {
      icon: Zap,
      title: "Blockchain Powered",
      description: "Secure, transparent transactions using SEI blockchain technology"
    },
    {
      icon: Shield,
      title: "Real-time Tracking",
      description: "Monitor your deliveries live with GPS coordinates and ETA updates"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Future of
                  </span>
                  <br />
                  <span className="text-foreground">Drone Delivery</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Experience autonomous drone delivery powered by blockchain technology. 
                  Fast, secure, and transparent package delivery to your doorstep.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/dashboard")}
                  className="group"
                >
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/create-order")}
                >
                  <Package className="w-5 h-5 mr-2" />
                  Send Package
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-3xl"></div>
              <Card className="relative p-8 bg-gradient-card border-glass-border shadow-card overflow-hidden">
                <div className="absolute top-4 right-4 w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <img 
                  src={droneImage} 
                  alt="Delivery Drone" 
                  className="w-full h-auto rounded-xl"
                />
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-neon-green font-medium">En Route</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ETA</span>
                    <span className="text-foreground">12 minutes</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full w-3/4 transition-all duration-500"></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">SkyRoute</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionary technology meets practical delivery solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-glass-border hover:border-primary/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:shadow-neon transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-12 text-center bg-gradient-glass border-glass-border backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-4">Ready to Send Your First Package?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the future of logistics with our blockchain-powered drone delivery platform
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/create-order")}
            className="group"
          >
            Start Delivery
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Index;