
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sign up with email and password
  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Send email verification
      await sendEmailVerification(userCredential.user);
      
      toast({
        title: "Account created!",
        description: "Please check your email for verification link.",
      });
      
      return userCredential.user;
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "Failed to create account.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already in use.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters.";
      }
      
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: errorMessage,
      });
      
      throw error;
    }
  };

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      navigate('/');
      return result;
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Failed to sign in.";
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed login attempts. Please try again later.";
      }
      
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: errorMessage,
      });
      
      throw error;
    }
  };

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast({
        title: "Welcome to Sign Scribe!",
        description: "You've successfully signed in with Google.",
      });
      navigate('/');
      return result;
    } catch (error) {
      console.error("Google sign in error:", error);
      toast({
        variant: "destructive",
        title: "Google sign in failed",
        description: "Failed to sign in with Google.",
      });
      throw error;
    }
  };

  // Setup phone auth
  const setupRecaptcha = (phoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        toast({
          variant: "destructive",
          title: "Captcha expired",
          description: "Please solve the captcha again.",
        });
      }
    });
    
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  // Verify OTP code
  const verifyOtp = (confirmationResult, otp) => {
    return confirmationResult.confirm(otp);
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password reset email sent",
        description: "Check your email for a link to reset your password.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      let errorMessage = "Failed to send password reset email.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      }
      
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: errorMessage,
      });
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "Failed to sign out. Please try again.",
      });
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    loginWithGoogle,
    setupRecaptcha,
    verifyOtp,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
