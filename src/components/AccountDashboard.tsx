import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { 
  Package, 
  Ship, 
  Plane, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  MessageSquare, 
  Mail,
  Phone,
  ChevronRight,
  AlertCircle
} from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: "processing" | "ready-to-ship" | "in-transit" | "arriving" | "out-for-delivery" | "delivered";
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  timeline: {
    status: string;
    description: string;
    date: string;
    completed: boolean;
    location?: string;
  }[];
  estimatedDelivery: string;
  trackingNumber?: string;
  documents: {
    name: string;
    type: "invoice" | "loan" | "receipt";
    date: string;
  }[];
}

interface AccountDashboardProps {
  user: { name: string; email: string };
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "VS-2025-001234",
    date: "2025-09-15",
    total: 3295,
    status: "in-transit",
    estimatedDelivery: "2025-10-18",
    trackingNumber: "MAEU7890123456",
    items: [
      {
        name: "Modern Velvet Sofa",
        quantity: 1,
        price: 1299,
        image: "https://images.unsplash.com/photo-1603192399946-8bbb0703cfc4?w=400"
      },
      {
        name: "Oak Coffee Table",
        quantity: 1,
        price: 499,
        image: "https://images.unsplash.com/photo-1658367754793-1200cee7b3d6?w=400"
      },
      {
        name: "Arc Floor Lamp",
        quantity: 2,
        price: 299,
        image: "https://images.unsplash.com/photo-1759647020559-2f91a4290ae4?w=400"
      }
    ],
    timeline: [
      {
        status: "Order Confirmed",
        description: "Your order has been confirmed and is being processed",
        date: "2025-09-15",
        completed: true
      },
      {
        status: "Items Ready for Shipment",
        description: "All items packed and ready at Shanghai warehouse",
        date: "2025-09-22",
        completed: true,
        location: "Shanghai, China"
      },
      {
        status: "In Transit to Brunei",
        description: "Shipped via sea freight - vessel departed Shanghai",
        date: "2025-09-28",
        completed: true,
        location: "South China Sea"
      },
      {
        status: "Arriving in Brunei",
        description: "Vessel arriving at Muara Port, clearing customs",
        date: "2025-10-14",
        completed: false,
        location: "Muara Port, Brunei"
      },
      {
        status: "Out for Delivery",
        description: "Items will be delivered to your address",
        date: "2025-10-18",
        completed: false,
        location: "Brunei-Muara District"
      }
    ],
    documents: [
      { name: "Order Invoice", type: "invoice", date: "2025-09-15" },
      { name: "Loan Agreement", type: "loan", date: "2025-09-15" },
      { name: "Shipping Receipt", type: "receipt", date: "2025-09-28" }
    ]
  },
  {
    id: "2",
    orderNumber: "VS-2025-001189",
    date: "2025-08-10",
    total: 2895,
    status: "delivered",
    estimatedDelivery: "2025-09-20",
    trackingNumber: "MAEU7890123455",
    items: [
      {
        name: "Executive Desk",
        quantity: 1,
        price: 999,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400"
      },
      {
        name: "Ergonomic Office Chair",
        quantity: 1,
        price: 699,
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400"
      }
    ],
    timeline: [
      {
        status: "Order Confirmed",
        description: "Your order has been confirmed and is being processed",
        date: "2025-08-10",
        completed: true
      },
      {
        status: "Items Ready for Shipment",
        description: "All items packed and ready at Miri warehouse",
        date: "2025-08-15",
        completed: true,
        location: "Miri, Malaysia"
      },
      {
        status: "In Transit to Brunei",
        description: "Shipped via truck from Miri",
        date: "2025-09-18",
        completed: true,
        location: "Miri-Brunei Highway"
      },
      {
        status: "Arriving in Brunei",
        description: "Cleared border customs",
        date: "2025-09-19",
        completed: true,
        location: "Sungai Tujoh Border"
      },
      {
        status: "Delivered",
        description: "Successfully delivered and set up",
        date: "2025-09-20",
        completed: true,
        location: "Bandar Seri Begawan"
      }
    ],
    documents: [
      { name: "Order Invoice", type: "invoice", date: "2025-08-10" },
      { name: "Delivery Receipt", type: "receipt", date: "2025-09-20" }
    ]
  },
  {
    id: "3",
    orderNumber: "VS-2025-001098",
    date: "2025-10-01",
    total: 5440,
    status: "processing",
    estimatedDelivery: "2025-11-10",
    items: [
      {
        name: "Walnut Dining Table",
        quantity: 1,
        price: 1599,
        image: "https://images.unsplash.com/photo-1525427232291-d509af8c67f7?w=400"
      },
      {
        name: "Dining Chairs",
        quantity: 6,
        price: 1794,
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400"
      }
    ],
    timeline: [
      {
        status: "Order Confirmed",
        description: "Your order has been confirmed and is being processed",
        date: "2025-10-01",
        completed: true
      },
      {
        status: "Items Ready for Shipment",
        description: "Being prepared at our warehouse",
        date: "Expected 2025-10-08",
        completed: false,
        location: "Shanghai, China"
      },
      {
        status: "In Transit to Brunei",
        description: "Will be shipped via sea freight",
        date: "Expected 2025-10-12",
        completed: false
      },
      {
        status: "Arriving in Brunei",
        description: "Customs clearance at Muara Port",
        date: "Expected 2025-11-08",
        completed: false
      },
      {
        status: "Out for Delivery",
        description: "Delivery to your address",
        date: "Expected 2025-11-10",
        completed: false
      }
    ],
    documents: [
      { name: "Order Invoice", type: "invoice", date: "2025-10-01" },
      { name: "Loan Agreement", type: "loan", date: "2025-10-01" }
    ]
  }
];

const statusConfig = {
  processing: { label: "Processing", color: "bg-blue-500", icon: Package },
  "ready-to-ship": { label: "Ready to Ship", color: "bg-indigo-500", icon: Package },
  "in-transit": { label: "In Transit", color: "bg-purple-500", icon: Ship },
  arriving: { label: "Arriving", color: "bg-orange-500", icon: Plane },
  "out-for-delivery": { label: "Out for Delivery", color: "bg-amber-500", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-500", icon: CheckCircle2 }
};

export function AccountDashboard({ user }: AccountDashboardProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  const getOrderProgress = (order: Order) => {
    const completedSteps = order.timeline.filter(t => t.completed).length;
    return (completedSteps / order.timeline.length) * 100;
  };

  const handleViewTracking = (order: Order) => {
    setSelectedOrder(order);
    setIsTrackingOpen(true);
  };

  const handleDownloadDocument = (docName: string) => {
    // Mock download - in real app would fetch actual PDF
    alert(`Downloading ${docName}...`);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">My Account</h1>
          <p className="text-muted-foreground text-lg">Welcome back, {user.name}</p>
        </div>

        <Tabs defaultValue="orders" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="grid gap-6">
              {mockOrders.map((order) => {
                const config = statusConfig[order.status];
                const StatusIcon = config.icon;
                
                return (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-stone-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">Order {order.orderNumber}</CardTitle>
                          <CardDescription>
                            Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </CardDescription>
                        </div>
                        <Badge className={`${config.color} text-white border-0`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-6 space-y-6">
                      {/* Order Items */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.price}
                              </p>
                            </div>
                            <p className="font-medium">${item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Order Progress</span>
                          <span className="font-medium">{Math.round(getOrderProgress(order))}%</span>
                        </div>
                        <Progress value={getOrderProgress(order)} className="h-2" />
                      </div>

                      {/* Current Status */}
                      <div className="bg-stone-50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className={`${config.color} text-white p-2 rounded-full`}>
                            <StatusIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium mb-1">
                              {order.timeline.find(t => !t.completed)?.status || "Delivered"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.timeline.find(t => !t.completed)?.description || "Your order has been successfully delivered"}
                            </p>
                            {order.timeline.find(t => !t.completed)?.location && (
                              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {order.timeline.find(t => !t.completed)?.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Estimated Delivery */}
                      {order.status !== "delivered" && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Estimated Delivery:</span>
                          </div>
                          <span className="font-medium">
                            {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleViewTracking(order)}
                        >
                          View Tracking Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="font-medium">Total Amount</span>
                        <span className="text-2xl font-semibold">${order.total.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Documents</CardTitle>
                <CardDescription>
                  Download invoices, loan agreements, and receipts for your orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.flatMap(order => 
                    order.documents.map((doc, idx) => (
                      <div 
                        key={`${order.id}-${idx}`}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-stone-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-stone-600" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Order {order.orderNumber} • {new Date(doc.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadDocument(doc.name)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Live Chat Support
                  </CardTitle>
                  <CardDescription>
                    Get instant help from our customer service team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Start Chat
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Support
                  </CardTitle>
                  <CardDescription>
                    Send us an email and we'll respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:support@visionstudio.bn">
                      support@visionstudio.bn
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Phone Support
                  </CardTitle>
                  <CardDescription>
                    Call us Monday-Saturday, 9am-6pm
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="tel:+6732234567">
                      +673 223 4567
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Request Service
                  </CardTitle>
                  <CardDescription>
                    Need assembly help or have an issue?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Submit Service Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Tracking Details Dialog */}
      <Dialog open={isTrackingOpen} onOpenChange={setIsTrackingOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Tracking Details</DialogTitle>
            <DialogDescription>
              {selectedOrder && `Order ${selectedOrder.orderNumber}`}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 py-4">
              {/* Tracking Number */}
              {selectedOrder.trackingNumber && (
                <div className="bg-stone-50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                  <p className="font-mono font-medium">{selectedOrder.trackingNumber}</p>
                </div>
              )}

              {/* Timeline */}
              <div className="space-y-1">
                {selectedOrder.timeline.map((step, idx) => {
                  const isLast = idx === selectedOrder.timeline.length - 1;
                  
                  return (
                    <div key={idx} className="relative">
                      <div className="flex gap-4 pb-8">
                        {/* Timeline Line */}
                        <div className="relative flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                            step.completed 
                              ? "bg-green-500 text-white" 
                              : "bg-stone-200 text-stone-400"
                          }`}>
                            {step.completed ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <Clock className="h-5 w-5" />
                            )}
                          </div>
                          {!isLast && (
                            <div className={`w-0.5 h-full absolute top-10 ${
                              step.completed ? "bg-green-500" : "bg-stone-200"
                            }`} />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-medium">{step.status}</h4>
                            <span className="text-sm text-muted-foreground">
                              {step.date.includes('Expected') ? step.date : new Date(step.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {step.description}
                          </p>
                          {step.location && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {step.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Estimated Delivery */}
              {selectedOrder.status !== "delivered" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900 mb-1">
                        Estimated Delivery
                      </p>
                      <p className="text-sm text-blue-700">
                        Your order is expected to arrive on{" "}
                        <strong>
                          {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Support */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Updates
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
