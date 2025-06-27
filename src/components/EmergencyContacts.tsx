
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Heart, Flame, Zap, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyContacts = () => {
  const { toast } = useToast();

  const emergencyServices = [
    {
      name: "Police Emergency",
      number: "10111",
      icon: Shield,
      color: "bg-red-500 hover:bg-red-600",
      description: "Crime, accidents, general emergencies"
    },
    {
      name: "Medical Emergency",
      number: "10177",
      icon: Heart,
      color: "bg-orange-500 hover:bg-orange-600",
      description: "Ambulance, medical emergencies"
    },
    {
      name: "Fire Department",
      number: "10117",
      icon: Flame,
      color: "bg-yellow-500 hover:bg-yellow-600",
      description: "Fire, rescue operations"
    }
  ];

  const utilityServices = [
    {
      name: "Electricity Faults",
      number: "086 037 566",
      provider: "City Power",
      icon: Zap,
      description: "Power outages, electrical faults"
    },
    {
      name: "Water Issues",
      number: "011 375 5555",
      provider: "Johannesburg Water",
      icon: Droplets,
      description: "Water leaks, supply issues"
    }
  ];

  const handleEmergencyCall = (number: string, serviceName: string) => {
    // Show confirmation for emergency services
    toast({
      title: `Calling ${serviceName}`,
      description: `Dialing ${number}...`,
    });
    
    // Initiate the call
    window.open(`tel:${number}`, '_self');
  };

  const handleUtilityCall = (number: string, serviceName: string) => {
    toast({
      title: `Calling ${serviceName}`,
      description: `Dialing ${number}...`,
    });
    
    window.open(`tel:${number}`, '_self');
  };

  return (
    <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <Phone className="h-6 w-6" />
          Emergency Contacts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Emergency Services */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Emergency Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="text-center">
                    <Button
                      className={`w-full h-20 ${service.color} text-white mb-2 flex flex-col items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95`}
                      onClick={() => handleEmergencyCall(service.number, service.name)}
                    >
                      <IconComponent className="h-6 w-6" />
                      <div>
                        <div className="font-bold text-lg">{service.number}</div>
                        <div className="text-sm">{service.name}</div>
                      </div>
                    </Button>
                    <p className="text-xs text-gray-600">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Utility Services */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Utility Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {utilityServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={index} 
                    className="p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:shadow-md hover:border-teal-300 transition-all transform hover:scale-105"
                    onClick={() => handleUtilityCall(service.number, service.name)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{service.name}</div>
                        <div className="text-sm text-gray-600">{service.provider}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-teal-700 mb-1">{service.number}</div>
                    <p className="text-xs text-gray-600">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Save these numbers in your phone for quick access</li>
              <li>• In case of immediate danger, call 10111 first</li>
              <li>• Keep your location and address ready when calling</li>
              <li>• Stay calm and speak clearly to emergency operators</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContacts;
