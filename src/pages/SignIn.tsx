
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, Mail, Lock, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const phoneFormSchema = z.object({
  phoneNumber: z.string().regex(/^\+[1-9]\d{10,14}$/, { message: "Please enter a valid phone number with country code (e.g., +919876543210)" }),
  otp: z.string().optional(),
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneAuth, setIsPhoneAuth] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const { login, loginWithGoogle, setupRecaptcha, verifyOtp } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const phoneForm = useForm({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phoneNumber: "",
      otp: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async (values) => {
    setIsLoading(true);
    try {
      const result = await setupRecaptcha(values.phoneNumber);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (error) {
      console.error("Send OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtpSubmit = async (values) => {
    setIsLoading(true);
    try {
      await verifyOtp(confirmationResult, values.otp);
    } catch (error) {
      console.error("Verify OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <div className="mt-8 bg-white p-8 shadow-md rounded-lg">
            {isPhoneAuth ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Sign in with Phone</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPhoneAuth(false)}
                  >
                    Use Email
                  </Button>
                </div>

                <Form {...phoneForm}>
                  <form onSubmit={phoneForm.handleSubmit(otpSent ? verifyOtpSubmit : sendOtp)} className="space-y-6">
                    {!otpSent ? (
                      <FormField
                        control={phoneForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (with country code)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <Input 
                                  placeholder="+919876543210" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={phoneForm.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter OTP</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123456" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* reCAPTCHA container */}
                    {!otpSent && <div id="recaptcha-container" className="my-3"></div>}

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {otpSent ? "Verifying..." : "Sending OTP..."}
                        </span>
                      ) : (
                        <span>{otpSent ? "Verify OTP" : "Send OTP"}</span>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            ) : (
              <>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input 
                                placeholder="you@example.com" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <Link
                          to="/forgot-password"
                          className="text-primary hover:text-primary/90 transition-colors"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Signing in...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <LogIn className="h-4 w-4" />
                          Sign in
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                      </svg>
                      Continue with Google
                    </Button>

                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsPhoneAuth(true)}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Sign in with Phone
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-primary hover:text-primary/90 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
