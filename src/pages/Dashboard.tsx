import { Link } from "react-router-dom";
import { Card, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, CheckCircle, Truck, ArrowRight, Plus } from "lucide-react";
import droneImage from "@/assets/drone-delivery.png";
import packageImage from "@/assets/package.png";

const Dashboard = () => {
  const recentOrders = [
    {
      id: "12345",
      type: "delivery",
      address: "123 Elm Street",
      status: "In Transit",
      statusColor: "bg-yellow-500",
      image: droneImage,
      description: "Delivery to 123 Elm Street"
    },
    {
      id: "67890",
      type: "order",
      vendor: "Local Market",
      items: "Groceries",
      status: "Preparing",
      statusColor: "bg-blue-500",
      image: packageImage,
      description: "Order from Local Market"
    },
    {
      id: "54321",
      type: "package",
      vendor: "Online Store", 
      contents: "Electronics",
      status: "Delivered",
      statusColor: "bg-green-500",
      image: packageImage,
      description: "Package from Online Store"
    }
  ];

  const stats = [
    { label: "Total Deliveries", value: "24", icon: Package },
    { label: "In Transit", value: "3", icon: Truck },
    { label: "Completed Today", value: "8", icon: CheckCircle },
    { label: "Avg Delivery Time", value: "18m", icon: Clock }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Here's what's happening with your deliveries today</p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link to="/create-order">
            <Plus className="w-4 h-4 mr-2" />
            New Delivery
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-glass-border hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <Button variant="ghost" asChild>
            <Link to="/orders" className="text-primary">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6">
          {recentOrders.map((order) => (
            <Card key={order.id} className="bg-gradient-card border-glass-border hover:border-primary/30 transition-all duration-300 overflow-hidden group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-1/3 lg:w-1/4 relative">
                    <div className="aspect-video md:aspect-square bg-gradient-to-br from-neon-green/20 to-blue-light/20 flex items-center justify-center">
                      <img 
                        src={order.image} 
                        alt={order.description}
                        className="max-w-full max-h-full object-contain p-4"
                      />
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className={`w-3 h-3 ${order.statusColor} rounded-full animate-pulse`}></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-glass-bg border-glass-border">
                            {order.type === "delivery" ? "Delivery" : order.type === "order" ? "Order" : "Package"} ID: {order.id}
                          </Badge>
                          <Badge className={`${order.statusColor} text-white border-0`}>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-semibold">{order.description}</h3>
                        
                        <div className="text-sm text-muted-foreground">
                          {order.type === "delivery" && order.address && (
                            <p>Destination: {order.address}</p>
                          )}
                          {order.type === "order" && order.vendor && order.items && (
                            <p>From: {order.vendor} • Items: {order.items}</p>
                          )}
                          {order.type === "package" && order.vendor && order.contents && (
                            <p>From: {order.vendor} • Contents: {order.contents}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                          className="group-hover:border-primary/50"
                        >
                          <Link to={`/order/${order.id}`}>
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;