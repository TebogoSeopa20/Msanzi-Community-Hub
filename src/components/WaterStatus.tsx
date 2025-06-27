
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Droplets, Gauge, Clock, TrendingDown } from "lucide-react";

const WaterStatus = () => {
  const restrictions = [
    { activity: "Garden watering", allowed: "06:00 - 08:00 & 18:00 - 20:00", level: "restricted" },
    { activity: "Car washing", allowed: "Weekends only", level: "restricted" },
    { activity: "Pool filling", allowed: "Not permitted", level: "prohibited" },
    { activity: "Household use", allowed: "Normal", level: "allowed" },
  ];

  const getRestrictionColor = (level: string) => {
    switch (level) {
      case "allowed": return "bg-green-100 text-green-700";
      case "restricted": return "bg-orange-100 text-orange-700";
      case "prohibited": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Droplets className="h-6 w-6" />
            Water Restrictions Status
          </CardTitle>
          <CardDescription className="text-blue-600">
            Current water usage guidelines for your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-blue-700">Level 1</div>
              <div className="text-sm text-blue-600">Water restrictions in effect</div>
            </div>
            <Badge className="bg-blue-200 text-blue-800 border-blue-300">
              Moderate
            </Badge>
          </div>
          
          <Alert className="bg-blue-50 border-blue-200">
            <Droplets className="h-4 w-4" />
            <AlertDescription className="text-blue-800">
              Please conserve water. Current dam levels at 68% capacity.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-teal-600" />
              Usage Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {restrictions.map((restriction, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-semibold">{restriction.activity}</div>
                      <div className="text-sm text-gray-600 mt-1">{restriction.allowed}</div>
                    </div>
                    <Badge className={getRestrictionColor(restriction.level)}>
                      {restriction.level}
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
              <Gauge className="h-5 w-5 text-teal-600" />
              Dam Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Vaal Dam</span>
                  <span className="text-sm text-gray-600">72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Katse Dam</span>
                  <span className="text-sm text-gray-600">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Theewaterskloof</span>
                  <span className="text-sm text-gray-600">58%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-teal-600" />
                  <span className="text-sm font-medium text-teal-800">Water Saving Tips</span>
                </div>
                <ul className="text-sm text-teal-700 mt-2 space-y-1">
                  <li>• Fix leaking taps immediately</li>
                  <li>• Use a bucket to collect shower water</li>
                  <li>• Install water-efficient fixtures</li>
                  <li>• Collect rainwater for garden use</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaterStatus;
