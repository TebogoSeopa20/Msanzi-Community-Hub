
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Clock, MapPin, AlertTriangle } from "lucide-react";

const LoadSheddingTracker = () => {
  const schedule = [
    { time: "12:00 - 14:00", status: "completed", area: "Group 1" },
    { time: "14:00 - 16:00", status: "active", area: "Group 2" },
    { time: "16:00 - 18:00", status: "upcoming", area: "Group 3" },
    { time: "18:00 - 20:00", status: "upcoming", area: "Group 4" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-gray-100 text-gray-600";
      case "active": return "bg-red-100 text-red-700";
      case "upcoming": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-red-200 bg-gradient-to-r from-red-50 to-red-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Zap className="h-6 w-6" />
            Load Shedding Status
          </CardTitle>
          <CardDescription className="text-red-600">
            Current stage and schedule for your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-red-700">Stage 2</div>
              <div className="text-sm text-red-600">Active until further notice</div>
            </div>
            <Badge className="bg-red-200 text-red-800 border-red-300">
              High Impact
            </Badge>
          </div>
          
          <Alert className="bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              Power outage currently in progress for Group 2 areas. Expected restoration: 16:00
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-teal-600" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {schedule.map((slot, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    slot.status === "active" 
                      ? "border-red-200 bg-red-50" 
                      : slot.status === "upcoming"
                      ? "border-orange-200 bg-orange-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{slot.time}</div>
                      <div className="text-sm text-gray-600">{slot.area}</div>
                    </div>
                    <Badge className={getStatusColor(slot.status)}>
                      {slot.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-teal-600" />
              Area Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 rounded-lg">
                <div className="font-semibold text-teal-800">Your Area: Sandton</div>
                <div className="text-sm text-teal-600">Group 2 - Current Status</div>
                <div className="mt-2">
                  <Badge className="bg-red-100 text-red-700">
                    Currently Off
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Preparation Tips:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Charge devices before scheduled outages</li>
                  <li>• Keep flashlights and candles ready</li>
                  <li>• Backup important work frequently</li>
                  <li>• Plan meals that don't require cooking</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoadSheddingTracker;
