
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Star, Clock, Globe, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BusinessDirectory = () => {
  const [isAddBusinessOpen, setIsAddBusinessOpen] = useState(false);
  const [businessForm, setBusinessForm] = useState({
    name: "",
    category: "Restaurant",
    address: "",
    phone: "",
    hours: "",
    description: "",
    website: ""
  });
  const { toast } = useToast();

  const businesses = [
    {
      name: "Mama's Kitchen",
      category: "Restaurant",
      rating: 4.8,
      address: "123 Main St, Soweto",
      phone: "011-123-4567",
      hours: "08:00 - 22:00",
      status: "Open",
      description: "Authentic South African cuisine with traditional flavors"
    },
    {
      name: "Fix-It Hardware",
      category: "Hardware Store",
      rating: 4.5,
      address: "456 Church St, Johannesburg",
      phone: "011-987-6543",
      hours: "07:00 - 17:00",
      status: "Closed",
      description: "Your one-stop shop for all hardware and repair needs"
    },
    {
      name: "Ubuntu Tech Solutions",
      category: "IT Services",
      rating: 4.9,
      address: "789 Nelson Mandela Ave, Sandton",
      phone: "011-456-7890",
      hours: "09:00 - 17:00",
      status: "Open",
      description: "Professional IT support and digital solutions for businesses"
    },
    {
      name: "Thabo's Auto Repair",
      category: "Auto Service",
      rating: 4.6,
      address: "321 Victoria St, Pretoria",
      phone: "012-345-6789",
      hours: "08:00 - 16:00",
      status: "Open",
      description: "Trusted auto repair and maintenance services"
    }
  ];

  const categories = [
    { name: "Restaurants", count: 45, color: "bg-red-100 text-red-700" },
    { name: "Retail", count: 38, color: "bg-blue-100 text-blue-700" },
    { name: "Services", count: 52, color: "bg-green-100 text-green-700" },
    { name: "Healthcare", count: 23, color: "bg-purple-100 text-purple-700" },
    { name: "Education", count: 19, color: "bg-orange-100 text-orange-700" },
    { name: "Automotive", count: 31, color: "bg-teal-100 text-teal-700" }
  ];

  const businessCategories = [
    "Restaurant", "Retail", "Services", "Healthcare", "Education", "Automotive", "Technology", "Construction", "Beauty", "Other"
  ];

  const getStatusColor = (status: string) => {
    return status === "Open" 
      ? "bg-green-100 text-green-700" 
      : "bg-red-100 text-red-700";
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleVisit = (businessName: string) => {
    toast({
      title: "Opening website",
      description: `Redirecting to ${businessName}'s website...`,
    });
  };

  const handleAddBusiness = () => {
    if (!businessForm.name.trim() || !businessForm.address.trim() || !businessForm.phone.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Business added!",
      description: "Your business has been submitted for review and will appear in the directory soon.",
    });

    setBusinessForm({
      name: "",
      category: "Restaurant",
      address: "",
      phone: "",
      hours: "",
      description: "",
      website: ""
    });
    setIsAddBusinessOpen(false);
  };

  const updateBusinessForm = (field: string, value: string) => {
    setBusinessForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="border-teal-200 bg-gradient-to-r from-teal-50 to-teal-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-800">
            <MapPin className="h-6 w-6" />
            Local Business Directory
          </CardTitle>
          <CardDescription className="text-teal-600">
            Discover and support local businesses in your community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div key={index} className={`p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${category.color}`}>
                <div className="font-semibold">{category.count}</div>
                <div className="text-sm">{category.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {businesses.map((business, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{business.name}</CardTitle>
                  <CardDescription className="text-teal-600">
                    {business.category}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{business.rating}</span>
                  </div>
                  <Badge className={getStatusColor(business.status)}>
                    {business.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{business.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <span>{business.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-gray-500" />
                  <span>{business.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span>{business.hours}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition-colors"
                  onClick={() => handleCall(business.phone)}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
                  onClick={() => handleVisit(business.name)}
                >
                  <Globe className="h-3 w-3 mr-1" />
                  Visit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>List Your Business</CardTitle>
          <CardDescription>
            Join our local business directory and connect with your community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-teal-600" />
              </div>
              <h4 className="font-semibold mb-2">Get Found</h4>
              <p className="text-sm text-gray-600">
                Make it easy for customers to discover your business
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">Build Trust</h4>
              <p className="text-sm text-gray-600">
                Collect reviews and showcase your reputation
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Grow</h4>
              <p className="text-sm text-gray-600">
                Connect with local customers and expand your reach
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Dialog open={isAddBusinessOpen} onOpenChange={setIsAddBusinessOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700 transition-colors">
                  Add Your Business
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Your Business</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Business Name *</Label>
                      <Input
                        id="name"
                        value={businessForm.name}
                        onChange={(e) => updateBusinessForm("name", e.target.value)}
                        placeholder="Enter business name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={businessForm.category}
                        onChange={(e) => updateBusinessForm("category", e.target.value)}
                      >
                        {businessCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={businessForm.address}
                      onChange={(e) => updateBusinessForm("address", e.target.value)}
                      placeholder="Full business address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={businessForm.phone}
                        onChange={(e) => updateBusinessForm("phone", e.target.value)}
                        placeholder="011-123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours">Operating Hours</Label>
                      <Input
                        id="hours"
                        value={businessForm.hours}
                        onChange={(e) => updateBusinessForm("hours", e.target.value)}
                        placeholder="09:00 - 17:00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website (optional)</Label>
                    <Input
                      id="website"
                      value={businessForm.website}
                      onChange={(e) => updateBusinessForm("website", e.target.value)}
                      placeholder="https://yourbusiness.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={businessForm.description}
                      onChange={(e) => updateBusinessForm("description", e.target.value)}
                      placeholder="Brief description of your business..."
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleAddBusiness}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Business
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessDirectory;
