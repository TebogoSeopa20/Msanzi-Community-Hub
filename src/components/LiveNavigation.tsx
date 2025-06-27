
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navigation, MapPin, Navigation2, Clock, Route, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LiveNavigation = () => {
  const { toast } = useToast();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [routeInfo, setRouteInfo] = useState<any>(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location Found",
            description: "Your current location has been detected.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to get your current location. Please enable location services.",
            variant: "destructive"
          });
        }
      );
    }
  }, [toast]);

  const handleStartNavigation = () => {
    if (!fromLocation || !toLocation) {
      toast({
        title: "Missing Information",
        description: "Please enter both starting point and destination.",
        variant: "destructive"
      });
      return;
    }

    setIsNavigating(true);
    
    // Simulate route calculation
    setTimeout(() => {
      setRouteInfo({
        distance: "12.5 km",
        duration: "18 minutes",
        traffic: "Moderate",
        route: "R24 → M1 → N3"
      });
      
      toast({
        title: "Navigation Started",
        description: `Route to ${toLocation} calculated successfully.`,
      });
    }, 2000);

    // Open in Google Maps for actual navigation
    const mapsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(fromLocation)}/${encodeURIComponent(toLocation)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      setFromLocation("Current Location");
      toast({
        title: "Current Location Set",
        description: "Using your current location as starting point.",
      });
    } else {
      toast({
        title: "Location Unavailable",
        description: "Current location not available. Please enable location services.",
        variant: "destructive"
      });
    }
  };

  const quickDestinations = [
    { name: "Hospital", query: "hospital near me" },
    { name: "Police Station", query: "police station near me" },
    { name: "Shopping Mall", query: "shopping mall near me" },
    { name: "Bank", query: "bank near me" },
    { name: "Pharmacy", query: "pharmacy near me" },
    { name: "Petrol Station", query: "petrol station near me" }
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Navigation className="h-6 w-6" />
          Live Navigation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Location Status */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="text-sm">
              {currentLocation ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Location Detected
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Location Pending
                </Badge>
              )}
            </span>
          </div>

          {/* Navigation Form */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="From (Starting point)"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleUseCurrentLocation}
                disabled={!currentLocation}
              >
                Use Current
              </Button>
            </div>
            
            <Input
              placeholder="To (Destination)"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
            />

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleStartNavigation}
              disabled={isNavigating || !fromLocation || !toLocation}
            >
              {isNavigating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Calculating Route...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Navigation2 className="h-4 w-4" />
                  Start Navigation
                </div>
              )}
            </Button>
          </div>

          {/* Route Information */}
          {routeInfo && (
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Route className="h-4 w-4" />
                Route Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Distance:</span>
                  <div className="font-semibold">{routeInfo.distance}</div>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <div className="font-semibold flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {routeInfo.duration}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Traffic:</span>
                  <div className="font-semibold">{routeInfo.traffic}</div>
                </div>
                <div>
                  <span className="text-gray-600">Route:</span>
                  <div className="font-semibold">{routeInfo.route}</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Destinations */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Quick Destinations</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {quickDestinations.map((dest, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => {
                    setToLocation(dest.query);
                    toast({
                      title: "Destination Set",
                      description: `Set destination to ${dest.name}`,
                    });
                  }}
                >
                  {dest.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Traffic Alerts */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <h5 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Traffic Alerts
            </h5>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>• Heavy traffic on M1 Highway (15:30 - 18:00)</p>
              <p>• Road construction on R24 - Expect delays</p>
              <p>• Accident reported on N3 Southbound</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveNavigation;
