import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Truck, 
  Clock, 
  Navigation,
  Zap,
  Package,
  CheckCircle,
  Plus,
  Minus
} from "lucide-react";

const PackageTracker = () => {
  const { id } = useParams();

  const trackingData = {
    orderId: id || "12345",
    droneId: "DRN-001",
    currentLocation: {
      lat: "34.0522° N",
      lng: "118.2437° W",
      address: "Beverly Hills, CA"
    },
    eta: "10:30 AM",
    progress: 75,
    status: "En Route",
    battery: 85,
    altitude: "150 ft",
    speed: "25 mph",
    distance: {
      total: "8.2 miles",
      remaining: "2.1 miles"
    }
  };

  const deliveryProgress = [
    { stage: "Order Confirmed", time: "9:15 AM", completed: true },
    { stage: "Drone Dispatched", time: "9:30 AM", completed: true },
    { stage: "In Transit", time: "9:45 AM", completed: true, current: true },
    { stage: "Arriving Soon", time: "10:25 AM", completed: false },
    { stage: "Delivered", time: "10:30 AM", completed: false }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Live Delivery Tracking</h1>
          <p className="text-muted-foreground">Monitor the progress of your drone deliveries in real-time</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="mb-8 bg-gradient-card border-glass-border">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by Drone ID or Order Number"
                className="pl-10 bg-glass-bg border-glass-border focus:border-primary/50"
                defaultValue={trackingData.droneId}
              />
            </div>
            <Button>Track</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-glass-border overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Live Map</span>
                <Badge className="bg-neon-green text-primary-foreground border-0 animate-pulse">
                  LIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mock Map Interface */}
              <div className="aspect-video bg-gradient-to-br from-blue-deep to-blue-light relative overflow-hidden">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-white/10"></div>
                    ))}
                  </div>
                </div>

                {/* Drone Position */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-6 h-6 bg-neon-green rounded-full animate-pulse shadow-neon"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-glass-bg border border-glass-border rounded-lg px-2 py-1 text-xs whitespace-nowrap">
                      Drone {trackingData.droneId}
                    </div>
                  </div>
                </div>

                {/* Route Path */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 50 300 Q 200 150 350 200"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--neon-green))" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Location Markers */}
                <div className="absolute bottom-6 left-6 bg-green-500 w-4 h-4 rounded-full"></div>
                <div className="absolute bottom-6 left-10 text-xs bg-glass-bg border border-glass-border rounded px-2 py-1">
                  Park Cone
                </div>
                
                <div className="absolute top-1/2 right-1/4 bg-gray-500 w-4 h-4 rounded-full"></div>
                <div className="absolute top-1/2 right-6 text-xs bg-glass-bg border border-glass-border rounded px-2 py-1">
                  Deepa's Art Studio
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                  <Button size="icon" variant="outline" className="w-8 h-8">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="w-8 h-8">
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="w-8 h-8">
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Search Input on Map */}
              <div className="absolute top-6 left-6 right-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search for a location"
                    className="pl-10 bg-glass-bg/90 backdrop-blur-sm border-glass-border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* View Delivery Details Button */}
          <div className="mt-6 text-center">
            <Button asChild className="w-full lg:w-auto">
              <Link to={`/order/${trackingData.orderId}`}>
                <Package className="w-4 h-4 mr-2" />
                View Delivery Details
              </Link>
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Drone Status */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <span>Drone Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Drone ID</p>
                  <p className="font-semibold">{trackingData.droneId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge className="bg-neon-green text-primary-foreground border-0">
                    {trackingData.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Current Location</p>
                  <p className="font-semibold">{trackingData.currentLocation.address}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Arrival</p>
                  <p className="font-semibold text-neon-green">{trackingData.eta}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Coordinates</p>
                  <p className="font-mono text-xs">{trackingData.currentLocation.lat}</p>
                  <p className="font-mono text-xs">{trackingData.currentLocation.lng}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Battery</p>
                  <div className="flex items-center space-x-2">
                    <Progress value={trackingData.battery} className="h-2" />
                    <span className="text-xs">{trackingData.battery}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Progress */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-primary" />
                <span>Delivery Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{trackingData.progress}%</span>
                </div>
                <Progress value={trackingData.progress} className="h-2" />
              </div>

              <div className="space-y-3">
                {deliveryProgress.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.completed 
                        ? 'bg-gradient-primary' 
                        : step.current 
                        ? 'bg-neon-green animate-pulse' 
                        : 'bg-muted'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-4 h-4 text-primary-foreground" />
                      ) : step.current ? (
                        <Zap className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${step.current ? 'text-neon-green' : ''}`}>
                        {step.stage}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Flight Info */}
          <Card className="bg-gradient-glass border-glass-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-sm">Flight Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Altitude</span>
                <span className="font-medium">{trackingData.altitude}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Speed</span>
                <span className="font-medium">{trackingData.speed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance Remaining</span>
                <span className="font-medium">{trackingData.distance.remaining}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Distance</span>
                <span className="font-medium">{trackingData.distance.total}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PackageTracker;