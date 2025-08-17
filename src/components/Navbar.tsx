import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Wallet, Package, Truck, Home, Bell } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  
  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/create-order", label: "Orders", icon: Package },
    { to: "/wallet", label: "Wallet", icon: Wallet },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-glass-border bg-gradient-glass backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-neon transition-all duration-300">
              <Truck className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SkyRoute
            </span>
          </Link>

          {/* Search Bar - Hide on mobile */}
          <div className="hidden md:flex relative max-w-md w-full mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search orders, drones..."
              className="pl-10 bg-glass-bg/50 border-glass-border focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Button
                key={to}
                variant={location.pathname === to ? "glass" : "ghost"}
                size="sm"
                asChild
                className={location.pathname === to ? "border-primary/30" : ""}
              >
                <Link to={to} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              </Button>
            ))}
            
            <Button variant="ghost" size="icon" className="ml-2">
              <Bell className="w-4 h-4" />
            </Button>

            <Button variant="outline" size="sm" asChild className="ml-2">
              <Link to="/wallet">
                <Wallet className="w-4 h-4 mr-2" />
                123.45 SEI
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/wallet">
                <Wallet className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}