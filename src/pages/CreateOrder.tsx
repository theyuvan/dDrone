import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Package, MapPin } from "lucide-react";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    deliveryAddress: "",
    recipientName: "",
    recipientPhone: "",
    packageDescription: "",
    packageWeight: "",
    packageDimensions: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePay = () => {
    navigate("/confirm-order", { state: { orderData } });
  };

  const isStep1Valid = orderData.senderName && orderData.senderAddress && orderData.deliveryAddress && orderData.recipientName;
  const isStep2Valid = orderData.packageDescription && orderData.packageWeight;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Send a Package</h1>
          <p className="text-muted-foreground">Create a new drone delivery order</p>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
              currentStep >= 1 ? 'bg-gradient-primary text-primary-foreground shadow-neon' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <span className={`font-medium ${currentStep >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Addresses
            </span>
          </div>
          
          <div className={`w-20 h-1 rounded-full transition-all duration-300 ${
            currentStep >= 2 ? 'bg-gradient-primary' : 'bg-muted'
          }`}></div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
              currentStep >= 2 ? 'bg-gradient-primary text-primary-foreground shadow-neon' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <span className={`font-medium ${currentStep >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Package Details
            </span>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <Card className="bg-gradient-card border-glass-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {currentStep === 1 ? (
              <>
                <MapPin className="w-5 h-5 text-primary" />
                <span>Delivery Addresses</span>
              </>
            ) : (
              <>
                <Package className="w-5 h-5 text-primary" />
                <span>Package Information</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <>
              {/* Sender Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sender Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Full Name</Label>
                    <Input
                      id="senderName"
                      value={orderData.senderName}
                      onChange={(e) => handleInputChange("senderName", e.target.value)}
                      className="bg-glass-bg border-glass-border focus:border-primary/50"
                      placeholder="Enter sender name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderPhone">Phone Number</Label>
                    <Input
                      id="senderPhone"
                      value={orderData.senderPhone}
                      onChange={(e) => handleInputChange("senderPhone", e.target.value)}
                      className="bg-glass-bg border-glass-border focus:border-primary/50"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderAddress">Pickup Address</Label>
                  <Textarea
                    id="senderAddress"
                    value={orderData.senderAddress}
                    onChange={(e) => handleInputChange("senderAddress", e.target.value)}
                    className="bg-glass-bg border-glass-border focus:border-primary/50"
                    placeholder="Enter complete pickup address"
                    rows={3}
                  />
                </div>
              </div>

              {/* Recipient Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recipient Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Full Name</Label>
                    <Input
                      id="recipientName"
                      value={orderData.recipientName}
                      onChange={(e) => handleInputChange("recipientName", e.target.value)}
                      className="bg-glass-bg border-glass-border focus:border-primary/50"
                      placeholder="Enter recipient name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientPhone">Phone Number</Label>
                    <Input
                      id="recipientPhone"
                      value={orderData.recipientPhone}
                      onChange={(e) => handleInputChange("recipientPhone", e.target.value)}
                      className="bg-glass-bg border-glass-border focus:border-primary/50"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Textarea
                    id="deliveryAddress"
                    value={orderData.deliveryAddress}
                    onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                    className="bg-glass-bg border-glass-border focus:border-primary/50"
                    placeholder="Enter complete delivery address"
                    rows={3}
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Package Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Package Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="packageDescription">Package Description</Label>
                  <Input
                    id="packageDescription"
                    value={orderData.packageDescription}
                    onChange={(e) => handleInputChange("packageDescription", e.target.value)}
                    className="bg-glass-bg border-glass-border focus:border-primary/50"
                    placeholder="e.g., Electronics, Documents, Clothing"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="packageWeight">Weight</Label>
                    <Input
                      id="packageWeight"
                      value={orderData.packageWeight}
                      onChange={(e) => handleInputChange("packageWeight", e.target.value)}
                      className="bg-glass-bg border-glass-border focus:border-primary/50"
                      placeholder="e.g., 2.5 lbs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="packageDimensions">Dimensions</Label>
                    <Input
                      id="packageDimensions"
                      value={orderData.packageDimensions}
                      onChange={(e) => handleInputChange("packageDimensions", e.target.value)}
                      className="bg-glass-bg border-glass-border focus:border-primary/50"
                      placeholder="e.g., 10x8x4 inches"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={orderData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="bg-glass-bg border-glass-border focus:border-primary/50"
                    placeholder="Any special handling instructions..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Estimated Cost */}
              <div className="p-4 bg-gradient-glass border border-glass-border rounded-xl">
                <h4 className="font-semibold mb-2">Estimated Cost</h4>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="text-2xl font-bold text-neon-green">15.5 SEI</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Final cost will be calculated based on distance and package specifications
                </p>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="min-w-24"
            >
              Previous
            </Button>
            
            {currentStep < 2 ? (
              <Button 
                onClick={nextStep}
                disabled={!isStep1Valid}
                className="min-w-24"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handlePay}
                disabled={!isStep2Valid}
                className="min-w-24"
              >
                Proceed to Payment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateOrder;