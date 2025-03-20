
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Upload, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateProfile, updateEmail } from 'firebase/auth';

export const ProfileSettings = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      const updates = [];
      
      // Update name and photo URL
      if (name !== currentUser.displayName || photoURL !== currentUser.photoURL) {
        updates.push(updateProfile(currentUser, {
          displayName: name,
          photoURL: photoURL
        }));
      }
      
      // Update email if changed and not empty
      if (email !== currentUser.email && email.trim()) {
        updates.push(updateEmail(currentUser, email));
      }
      
      if (updates.length > 0) {
        await Promise.all(updates);
        
        toast({
          title: "Profile updated!",
          description: "Your profile information has been updated successfully.",
        });
      } else {
        toast({
          title: "No changes made",
          description: "No profile information was changed.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      let errorMessage = "Failed to update profile.";
      
      if (error.code === 'auth/requires-recent-login') {
        errorMessage = "For security reasons, please sign in again before updating your email.";
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already in use by another account.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address is not valid.";
      }
      
      toast({
        variant: "destructive",
        title: "Update failed",
        description: errorMessage,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, this would upload to Firebase Storage
      // For this demo, we'll use a local URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoURL(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Settings
        </CardTitle>
        <CardDescription>
          Update your personal information and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src={photoURL} alt={name} />
                <AvatarFallback className="text-xl">{getInitials(name)}</AvatarFallback>
              </Avatar>
              
              <div className="relative">
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => document.getElementById('picture').click()}
                  className="flex items-center gap-1"
                >
                  <Upload className="h-3 w-3" />
                  Change Photo
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
                <p className="text-xs text-muted-foreground">
                  Changing your email will require you to sign in again.
                </p>
              </div>
            </div>
          </div>
          
          <CardFooter className="px-0 pt-6">
            <Button 
              type="submit" 
              disabled={isUpdating}
              className="flex items-center gap-2 ml-auto"
            >
              {isUpdating ? (
                <>
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
