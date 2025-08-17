import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, Package, Truck, CheckCircle, Zap } from "lucide-react";
import packageImage from "@/assets/package.png";

const OrderDetails = () => {
  const { id } = useParams();

  const orderData = {
    id: id || "12345",
    status: "En Route",
    progress: 65,
    sender: {
      name: "Liam Carter",
      address: "123 Maple Street, Anytown, USA",
      contact: "+1 (555) 123-4567"
    },
    receiver: {
      name: "Sophia Bennett", 
      address: "456 Oak Avenue, Anytown, USA",
      contact: "+1 (555) 987-6543"
    },
    parcel: {
      description: "Electronics",
      weight: "2 lbs",
      dimensions: "10x8x4 inches",
      image: packageImage
    },
    drone: {
      id: "DRN-001",
      currentLocation: "34.0522° N, 118.2437° W",
      eta: "10:30 AM"
    },
    tracking: "1234567890"
  };

  const deliveryStages = [
    { stage: "Order Placed", completed: true, icon: Package },
    { stage: "Drone Dispatched", completed: true, icon: Truck }, 
    { stage: "In Transit", completed: true, icon: Zap, current: true },
    { stage: "Delivered", completed: false, icon: CheckCircle }
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
        <div>
          <h1 className="text-3xl font-bold">Delivery Details</h1>
          <p className="text-muted-foreground">Tracking number: {orderData.tracking}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sender Information */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Sender Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{orderData.sender.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{orderData.sender.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{orderData.sender.contact}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receiver Information */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-neon-green" />
                <span>Receiver Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{orderData.receiver.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{orderData.receiver.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{orderData.receiver.contact}</p>
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
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">{orderData.progress}%</span>
                </div>
                <Progress value={orderData.progress} className="h-2" />
              </div>

              <div className="space-y-4">
                {deliveryStages.map((stage, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      stage.completed 
                        ? 'bg-gradient-primary' 
                        : stage.current 
                        ? 'bg-neon-green animate-pulse' 
                        : 'bg-muted'
                    }`}>
                      <stage.icon className={`w-5 h-5 ${
                        stage.completed || stage.current ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${stage.current ? 'text-neon-green' : ''}`}>
                        {stage.stage}
                      </p>
                      {stage.current && (
                        <p className="text-sm text-muted-foreground">Currently in progress</p>
                      )}
                    </div>
                    {stage.completed && (
                      <Badge className="bg-gradient-primary border-0">Complete</Badge>
                    )}
                    {stage.current && (
                      <Badge className="bg-neon-green text-primary-foreground border-0">Active</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Parcel Information */}
          <Card className="bg-gradient-card border-glass-border overflow-hidden">
            <CardHeader>
              <CardTitle>Parcel Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-neon-green/20 to-blue-light/20 rounded-xl flex items-center justify-center">
                <img 
                  src={orderData.parcel.image} 
                  alt="Package"
                  className="max-w-full max-h-full object-contain p-4"
                />
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-medium">{orderData.parcel.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{orderData.parcel.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dimensions</p>
                  <p className="font-medium">{orderData.parcel.dimensions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drone Status */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <span>Drone Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Drone ID</p>
                  <p className="font-medium">{orderData.drone.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Location</p>
                  <p className="font-medium">{orderData.drone.currentLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                  <p className="font-medium text-neon-green">{orderData.drone.eta}</p>
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to={`/track/${orderData.id}`}>
                  <MapPin className="w-4 h-4 mr-2" />
                  View Live Tracking
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;