import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, CheckCircle, MapPin, Package, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [promoCode, setPromoCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock order data - in real app would come from location.state
  const orderData = location.state?.orderData || {
    senderName: "John Doe",
    senderAddress: "123 Main St, City, ST 12345",
    senderPhone: "+1 (555) 123-4567",
    recipientName: "Jane Smith", 
    recipientAddress: "456 Oak Ave, City, ST 67890",
    recipientPhone: "+1 (555) 987-6543",
    packageDescription: "Electronics",
    packageWeight: "2.5 lbs",
    packageDimensions: "10x8x4 inches"
  };

  const orderSummary = {
    id: "#12345",
    date: "July 26, 2024",
    deliveryTime: "10:00 AM - 11:00 AM",
    items: "Drone Parts (2), Batteries (4)"
  };

  const paymentDetails = {
    method: "SEI Wallet",
    address: "sei1...abc123",
    subtotal: 15.5,
    shipping: 0,
    discount: 0,
    total: 15.5
  };

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "welcome") {
      paymentDetails.discount = 2.5;
      paymentDetails.total = paymentDetails.subtotal - paymentDetails.discount;
      toast({
        title: "Promo code applied!",
        description: "You saved 2.5 SEI with the WELCOME code",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your code and try again",
        variant: "destructive"
      });
    }
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order Confirmed!",
        description: "Your payment has been processed on the SEI blockchain. Drone will be dispatched shortly.",
      });
      
      // Navigate to tracking page
      setTimeout(() => {
        navigate("/track/12345");
      }, 2000);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="outline" className="p-2" onClick={() => navigate("/create-order")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Review Order</h1>
          <p className="text-muted-foreground">Confirm your delivery details and complete payment</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-primary" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium">{orderSummary.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{orderSummary.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Address</p>
                  <p className="font-medium">{orderData.recipientAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Time</p>
                  <p className="font-medium">{orderSummary.deliveryTime}</p>
                </div>
              </div>
              
              <Separator className="bg-glass-border" />
              
              <div>
                <p className="text-sm text-muted-foreground">Package Details</p>
                <p className="font-medium">{orderData.packageDescription}</p>
                <p className="text-sm text-muted-foreground">
                  Weight: {orderData.packageWeight} • Dimensions: {orderData.packageDimensions}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sender & Receiver Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Sender</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{orderData.senderName}</p>
                <p className="text-sm text-muted-foreground">{orderData.senderAddress}</p>
                <p className="text-sm text-muted-foreground">{orderData.senderPhone}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-neon-green" />
                  <span>Recipient</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{orderData.recipientName}</p>
                <p className="text-sm text-muted-foreground">{orderData.recipientAddress}</p>
                <p className="text-sm text-muted-foreground">{orderData.recipientPhone}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Section */}
        <div className="space-y-6">
          {/* Payment Details */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span>Payment Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-4 h-4" />
                    <span className="font-medium">{paymentDetails.method}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wallet Address</span>
                  <span className="font-mono text-sm">{paymentDetails.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Promo Code */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle>Promo Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="bg-glass-bg border-glass-border focus:border-primary/50"
                />
                <Button variant="outline" onClick={handlePromoCode}>
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Total */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle>Total</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{paymentDetails.subtotal} SEI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{paymentDetails.shipping} SEI</span>
                </div>
                {paymentDetails.discount > 0 && (
                  <div className="flex justify-between text-neon-green">
                    <span>Discount</span>
                    <span>-{paymentDetails.discount} SEI</span>
                  </div>
                )}
              </div>
              
              <Separator className="bg-glass-border" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-neon-green">{paymentDetails.total} SEI</span>
              </div>

              <Button 
                className="w-full mt-4" 
                size="lg"
                onClick={handleConfirmOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Order and Pay
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="w-full" onClick={() => navigate("/create-order")}>
                Cancel
              </Button>
            </CardContent>
          </Card>

          {/* Blockchain Info */}
          <Card className="bg-gradient-glass border-glass-border backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Blockchain Secured</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your payment will be processed securely on the SEI blockchain. 
                The drone will be automatically dispatched upon successful transaction confirmation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;