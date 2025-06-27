import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Droplets, Shield, Briefcase, MapPin, Phone, Users, AlertTriangle, Clock, TrendingUp, Navigation } from "lucide-react";
import LoadSheddingTracker from "@/components/LoadSheddingTracker";
import WaterStatus from "@/components/WaterStatus";
import SafetyAlerts from "@/components/SafetyAlerts";
import JobBoard from "@/components/JobBoard";
import BusinessDirectory from "@/components/BusinessDirectory";
import EmergencyContacts from "@/components/EmergencyContacts";
import CommunityForum from "@/components/CommunityForum";
import LiveNavigation from "@/components/LiveNavigation";
import PanicButton from "@/components/PanicButton";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-orange-500 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mzansi Connect</h1>
                <p className="text-sm text-gray-600">Your South African Community Hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Alert */}
        <Alert className="mb-8 bg-gradient-to-r from-teal-50 to-orange-50 border-teal-200">
          <Users className="h-4 w-4" />
          <AlertDescription className="text-teal-800">
            Welcome to Mzansi Connect! Stay informed about load shedding, water restrictions, safety updates, and connect with your community. Together we're stronger! 🇿🇦
          </AlertDescription>
        </Alert>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Load Shedding</p>
                  <p className="text-2xl font-bold text-red-700">Stage 2</p>
                </div>
                <Zap className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Water Status</p>
                  <p className="text-2xl font-bold text-blue-700">Level 1</p>
                </div>
                <Droplets className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Safety Score</p>
                  <p className="text-2xl font-bold text-green-700">Good</p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">New Jobs</p>
                  <p className="text-2xl font-bold text-orange-700">142</p>
                </div>
                <Briefcase className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="navigation" className="flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              <span className="hidden sm:inline">Navigate</span>
            </TabsTrigger>
            <TabsTrigger value="loadshedding" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Power</span>
            </TabsTrigger>
            <TabsTrigger value="water" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              <span className="hidden sm:inline">Water</span>
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Safety</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Local Biz</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Forum</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-teal-600" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Load Shedding</span>
                      <span className="text-sm text-red-600">14:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Water Restrictions</span>
                      <span className="text-sm text-blue-600">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Quick Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert>
                      <AlertDescription>
                        Stage 2 load shedding continues until further notice. Plan accordingly.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertDescription>
                        Community meeting tonight at 19:00 - Community Hall
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="navigation">
            <LiveNavigation />
          </TabsContent>

          <TabsContent value="loadshedding">
            <LoadSheddingTracker />
          </TabsContent>

          <TabsContent value="water">
            <WaterStatus />
          </TabsContent>

          <TabsContent value="safety">
            <SafetyAlerts />
          </TabsContent>

          <TabsContent value="jobs">
            <JobBoard />
          </TabsContent>

          <TabsContent value="business">
            <BusinessDirectory />
          </TabsContent>

          <TabsContent value="community">
            <CommunityForum />
          </TabsContent>
        </Tabs>

        {/* Emergency Section */}
        <div className="mt-12">
          <EmergencyContacts />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              Built with ❤️ for South Africa. Stay safe, stay connected.
            </p>
          </div>
        </div>
      </footer>

      {/* Panic Button - Fixed Position */}
      <PanicButton />
    </div>
  );
};

export default Index;
