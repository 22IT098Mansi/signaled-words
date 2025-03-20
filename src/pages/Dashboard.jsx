
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Webcam, MessageSquareText, User, FileDown, LogOut } from 'lucide-react';
import { TranslationModule } from '@/components/dashboard/TranslationModule';
import { ProfileSettings } from '@/components/dashboard/ProfileSettings';
import { TranslationLogs } from '@/components/dashboard/TranslationLogs';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("translation");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Sign Scribe Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 hidden md:block">
              Welcome, {currentUser?.displayName || currentUser?.email}
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser?.photoURL} alt={currentUser?.displayName} />
              <AvatarFallback>{getInitials(currentUser?.displayName)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="translation" className="flex items-center gap-2">
              <Webcam className="h-4 w-4" />
              <span>Translation</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              <span>Logs</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="translation" className="mt-6">
            <TranslationModule />
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="logs" className="mt-6">
            <TranslationLogs />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
