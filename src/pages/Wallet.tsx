/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Wallet as WalletIcon, 
  Send, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle,
  Plus,
  Info,
  LogIn,
  LogOut,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Extend Window interface for SEI Compass wallet
declare global {
  interface Window {
    compass?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      isCompass?: boolean;
    };
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      isMetaMask?: boolean;
    };
  }
}

const Wallet = () => {
  const { toast } = useToast();
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  // Check for existing wallet connection on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.compass) {
        try {
          const accounts = await window.compass.request({ method: 'sei_accounts' });
          if (accounts.length > 0) {
            setIsConnected(true);
            setWalletAddress(accounts[0].address);
          }
        } catch (error) {
          console.error('Error checking Compass wallet connection:', error);
        }
      }
    };
    
    checkWalletConnection();
  }, []);

  const walletData = {
    balance: isConnected ? 123.45 : 0,
    address: isConnected ? walletAddress || "sei1abc123def456ghi789..." : "",
    recentTransactions: isConnected ? [
      {
        id: "tx1",
        type: "received",
        amount: 10,
        description: "Received 10 SEI",
        orderId: "#12345",
        timestamp: "2 hours ago",
        status: "completed"
      },
      {
        id: "tx2", 
        type: "sent",
        amount: 5,
        description: "Sent 5 SEI",
        orderId: "#67890",
        timestamp: "5 hours ago",
        status: "completed"
      },
      {
        id: "tx3",
        type: "received", 
        amount: 20,
        description: "Received 20 SEI",
        orderId: "#11223",
        timestamp: "1 day ago",
        status: "completed"
      }
    ] : []
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      if (typeof window !== 'undefined' && window.compass) {
        const result = await window.compass.request({
          method: 'sei_connect',
        });
        
        if (result && result.accounts && result.accounts.length > 0) {
          setIsConnected(true);
          setWalletAddress(result.accounts[0].address);
          toast({
            title: "Compass Wallet Connected!",
            description: `Connected to ${result.accounts[0].address.slice(0, 10)}...${result.accounts[0].address.slice(-4)}`,
          });
        }
      } else {
        toast({
          title: "Compass Wallet Not Found",
          description: "Please install the Compass wallet extension for SEI",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error connecting Compass wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Compass wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
    setSendAmount("");
    setSendAddress("");
    setIsDialogOpen(false);
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully",
    });
  };

  const handleSendSEI = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    if (!sendAmount || !sendAddress) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and recipient address",
        variant: "destructive"
      });
      return;
    }

    // Simulate transaction
    toast({
      title: "Transaction Sent!",
      description: `Successfully sent ${sendAmount} SEI to ${sendAddress.slice(0, 10)}...`,
    });
    
    setSendAmount("");
    setSendAddress("");
    setIsDialogOpen(false);
  };

  // If wallet is not connected, show connection interface
  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Connect Your Wallet</h1>
            <p className="text-muted-foreground">Connect your SEI wallet to start managing your drone deliveries</p>
          </div>

          <Card className="max-w-md mx-auto bg-gradient-card border-glass-border">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <WalletIcon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">SEI Wallet</h2>
                <p className="text-sm text-muted-foreground">
                  Connect your SEI-compatible wallet to access your balance and make transactions
                </p>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </>
                )}
              </Button>

              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" />
                <span>Secured by blockchain technology</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-4 bg-gradient-glass border-glass-border">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Secure</h3>
                <p className="text-xs text-muted-foreground">Your keys, your crypto</p>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-glass border-glass-border">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <Send className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Fast</h3>
                <p className="text-xs text-muted-foreground">Instant transactions</p>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-glass border-glass-border">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <CheckCircle className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Reliable</h3>
                <p className="text-xs text-muted-foreground">Blockchain verified</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Wallet</h1>
          <p className="text-muted-foreground">Manage your SEI balance and transactions</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" onClick={disconnectWallet}>
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Send SEI
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-card border-glass-border">
              <DialogHeader>
                <DialogTitle>Send SEI</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (SEI)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="bg-glass-bg border-glass-border focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Recipient Address</Label>
                  <Input
                    id="address"
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                    placeholder="sei1..."
                    className="bg-glass-bg border-glass-border focus:border-primary/50"
                  />
                </div>
                <Button onClick={handleSendSEI} className="w-full">
                  Send Transaction
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Wallet Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Card */}
          <Card className="bg-gradient-card border-glass-border overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <WalletIcon className="w-5 h-5 text-primary" />
                <span>SEI Balance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-4xl font-bold text-neon-green">{walletData.balance} SEI</p>
                  <p className="text-sm text-muted-foreground">≈ $247.89 USD</p>
                </div>
                
                <div className="bg-glass-bg rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                  <p className="font-mono text-sm break-all">
                    {walletAddress ? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-8)}` : walletData.address}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {walletData.recentTransactions.length > 0 ? (
                <div className="space-y-4">
                {walletData.recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-glass-bg rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'received' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {tx.type === 'received' ? (
                          <ArrowDownLeft className={`w-5 h-5 ${tx.type === 'received' ? 'text-green-500' : 'text-red-500'}`} />
                        ) : (
                          <ArrowUpRight className={`w-5 h-5 ${tx.type === 'received' ? 'text-green-500' : 'text-red-500'}`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>Order {tx.orderId}</span>
                          <span>•</span>
                          <span>{tx.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-bold ${tx.type === 'received' ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.type === 'received' ? '+' : '-'}{tx.amount} SEI
                      </p>
                      <Badge variant="secondary" className="text-xs bg-glass-bg border-glass-border">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              ) : (
                <div className="text-center py-8">
                  <WalletIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No transactions yet</p>
                  <p className="text-sm text-muted-foreground">Start using your wallet to see transaction history</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gradient-card border-glass-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add Funds
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Send Payment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Transaction History
              </Button>
            </CardContent>
          </Card>

          {/* Drone Dispatch Info */}
          <Card className="bg-gradient-glass border-glass-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-primary" />
                <span>Drone Dispatch</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Your drone will be dispatched after successful payment. You will receive a notification when the drone is on its way.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pending Orders</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available Balance</span>
                  <span className="font-medium text-neon-green">{walletData.balance} SEI</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Status */}
          <Card className="bg-gradient-glass border-glass-border backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">SEI Network Status</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Block Height: 1,234,567</p>
                <p>Network: Mainnet</p>
                <p>Gas Price: 0.02 SEI</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Wallet;