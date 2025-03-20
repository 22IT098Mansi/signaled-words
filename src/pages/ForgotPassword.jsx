
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await resetPassword(values.email);
      setEmailSent(true);
    } catch (error) {
      console.error("Reset password error:", error);
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
            <h1 className="text-3xl font-bold tracking-tight">Reset your password</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>

          {emailSent ? (
            <div className="mt-8 bg-white p-8 shadow-md rounded-lg text-center">
              <svg 
                className="mx-auto h-16 w-16 text-green-500"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="mt-6 text-xl font-medium">Check your email</h2>
              <p className="mt-2 text-gray-600">
                We've sent a password reset link to your email. Please check your inbox and follow the instructions.
              </p>
              <div className="mt-6">
                <Link
                  to="/sign-in"
                  className="text-primary hover:text-primary/90 font-medium transition-colors"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 bg-white p-8 shadow-md rounded-lg">
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

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending reset link...
                      </span>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <Link
                  to="/sign-in"
                  className="flex items-center justify-center gap-2 text-primary hover:text-primary/90 font-medium transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
