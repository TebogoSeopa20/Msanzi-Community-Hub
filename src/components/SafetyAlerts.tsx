
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, MapPin, Clock, Phone } from "lucide-react";

const SafetyAlerts = () => {
  const alerts = [
    {
      type: "High Crime Area",
      location: "Johannesburg CBD",
      time: "2 hours ago",
      severity: "high",
      description: "Increased robbery incidents reported. Avoid carrying valuables."
    },
    {
      type: "Road Closure",
      location: "N1 Highway",
      time: "4 hours ago",
      severity: "medium",
      description: "Accident causing traffic delays. Use alternative routes."
    },
    {
      type: "Community Watch",
      location: "Sandton",
      time: "6 hours ago",
      severity: "low",
      description: "Neighborhood watch patrol active. Report suspicious activity."
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-orange-100 text-orange-700 border-orange-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-green-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Shield className="h-6 w-6" />
            Community Safety Status
          </CardTitle>
          <CardDescription className="text-green-600">
            Real-time safety updates and alerts for your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-green-700">Good</div>
              <div className="text-sm text-green-600">Overall safety rating</div>
            </div>
            <Badge className="bg-green-200 text-green-800 border-green-300">
              Stable
            </Badge>
          </div>
          
          <Alert className="bg-green-50 border-green-200">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-green-800">
              Community watch programs are active. Report any suspicious activity to local authorities.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-teal-600" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold">{alert.type}</div>
                    <Badge variant="outline" className="text-xs">
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-3 w-3" />
                    <span>{alert.location}</span>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{alert.time}</span>
                  </div>
                  <p className="text-sm">{alert.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-teal-600" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="font-semibold text-red-800">Emergency Services</div>
                <div className="text-2xl font-bold text-red-700">10111</div>
                <div className="text-sm text-red-600">Police emergency line</div>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="font-semibold text-orange-800">Medical Emergency</div>
                <div className="text-2xl font-bold text-orange-700">10177</div>
                <div className="text-sm text-orange-600">Ambulance services</div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-800">Fire Department</div>
                <div className="text-2xl font-bold text-blue-700">10117</div>
                <div className="text-sm text-blue-600">Fire and rescue</div>
              </div>

              <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                <div className="font-semibold text-teal-800 mb-2">Safety Tips</div>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>• Stay aware of your surroundings</li>
                  <li>• Travel in groups when possible</li>
                  <li>• Keep emergency contacts handy</li>
                  <li>• Trust your instincts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyAlerts;
