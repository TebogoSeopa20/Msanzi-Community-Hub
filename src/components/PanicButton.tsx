
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PanicButton = () => {
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handlePanicPress = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmPanic = () => {
    setShowConfirmDialog(false);
    setIsPanicActive(true);
    setCountdown(5);

    // Start countdown
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          activatePanicMode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: "PANIC MODE ACTIVATING",
      description: "Emergency services will be contacted in 5 seconds. Press cancel to abort.",
      variant: "destructive"
    });
  };

  const activatePanicMode = () => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude}, ${position.coords.longitude}`;
          
          // Send emergency alert (simulated)
          sendEmergencyAlert(location);
          
          // Call emergency services
          setTimeout(() => {
            window.open('tel:10111', '_self');
          }, 1000);
        },
        (error) => {
          console.error("Location error:", error);
          sendEmergencyAlert("Location unavailable");
          
          // Call emergency services anyway
          setTimeout(() => {
            window.open('tel:10111', '_self');
          }, 1000);
        }
      );
    } else {
      sendEmergencyAlert("Location unavailable");
      
      // Call emergency services
      setTimeout(() => {
        window.open('tel:10111', '_self');
      }, 1000);
    }
  };

  const sendEmergencyAlert = (location: string) => {
    // Simulate sending emergency alert to contacts and authorities
    const emergencyData = {
      timestamp: new Date().toISOString(),
      location: location,
      type: "PANIC_BUTTON_ACTIVATED",
      userId: "user123" // In real app, this would be actual user ID
    };

    console.log("Emergency Alert Sent:", emergencyData);
    
    toast({
      title: "🚨 EMERGENCY ALERT SENT",
      description: "Emergency services contacted. Location shared with authorities.",
      variant: "destructive"
    });

    // Simulate sending SMS to emergency contacts
    setTimeout(() => {
      toast({
        title: "📱 Emergency Contacts Notified",
        description: "SMS sent to your emergency contacts with your location.",
      });
    }, 2000);
  };

  const handleCancelPanic = () => {
    setIsPanicActive(false);
    setCountdown(0);
    toast({
      title: "Panic Mode Cancelled",
      description: "Emergency activation has been cancelled.",
    });
  };

  return (
    <>
      {/* Panic Button */}
      <div className="fixed bottom-4 right-4 z-50">
        {isPanicActive && countdown > 0 ? (
          <div className="flex flex-col items-center gap-2">
            <div className="bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold animate-pulse shadow-lg">
              {countdown}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelPanic}
              className="bg-white hover:bg-gray-100"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 shadow-lg transform hover:scale-105 transition-all duration-200 animate-pulse"
            onClick={handlePanicPress}
            disabled={isPanicActive}
          >
            <AlertTriangle className="h-8 w-8" />
          </Button>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-red-50 border-red-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-6 w-6" />
              Emergency Panic Button
            </AlertDialogTitle>
            <AlertDialogDescription className="text-red-700">
              <div className="space-y-3">
                <p className="font-semibold">
                  Are you sure you want to activate panic mode?
                </p>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Emergency services (10111) will be called</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Your location will be shared with authorities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Emergency contacts will be notified</span>
                  </div>
                </div>
                <p className="text-xs text-red-600 font-medium">
                  Only use this button in real emergencies!
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-gray-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmPanic}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Activate Emergency Mode
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PanicButton;
