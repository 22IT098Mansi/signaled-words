
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, UserPlus, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(passwordStrengthRegex, { 
      message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character" 
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await signup(values.email, values.password, values.name);
    } catch (error) {
      console.error("Sign up error:", error);
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign up to start using Sign Scribe
            </p>
          </div>

          <div className="mt-8 bg-white p-8 shadow-md rounded-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            placeholder="John Doe" 
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
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1 pl-3">
                        <li className={field.value?.length >= 8 ? "text-green-500" : ""}>At least 8 characters</li>
                        <li className={/[A-Z]/.test(field.value) ? "text-green-500" : ""}>One uppercase letter</li>
                        <li className={/[a-z]/.test(field.value) ? "text-green-500" : ""}>One lowercase letter</li>
                        <li className={/\d/.test(field.value) ? "text-green-500" : ""}>One number</li>
                        <li className={/[@$!%*?&]/.test(field.value) ? "text-green-500" : ""}>One special character (@$!%*?&)</li>
                      </ul>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Sign up
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

              <div className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-primary hover:text-primary/90 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
