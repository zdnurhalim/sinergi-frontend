import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAuth, setAuthLoading, setAuthError } from "@/store/AuthSlice";
import { AuthenticationService } from "@/services/AuthenticationService";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
    const dispatch = useDispatch();
    const authService = new AuthenticationService();
    const { loading, error } = useSelector((state: RootState) => state.auth);
  
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
        email: "",
        password: "",
        remember: false,
        },
    });

    const onSubmit = async (data: FormValues) => {
        dispatch(setAuthLoading(true));
        dispatch(setAuthError(null));

        try {
            const response = await authService.login({ email: data.email, password: data.password });
            dispatch(setAuth({ data: response.data, token: response.token }));
            localStorage.setItem("authToken", response.token);
            console.log("Login successful", response);
            // redirect user to dashboard
            window.location.href = "/dashboard";
        } catch (err: any) {
            console.error(err);
            dispatch(setAuthError(err.message || "Login failed"));
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

  return (
    <div
    className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-tr from-[#551e86] to-[#2f3082]"
    >
      <div className="w-full max-w-md">
        <Card className="shadow-xl backdrop-blur-sm bg-white/90">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  aria-invalid={Boolean(errors.password)}
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" {...register("remember")} />
                  <Label htmlFor="remember" className="mb-0">
                    Remember me
                  </Label>
                </div>

                <a href="#" className="text-sm underline-offset-4 hover:underline">
                  Forgot password?
                </a>
              </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Please wait..." : "Sign In"}
            </Button>


            <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => window.history.back()}
            >
            <ArrowLeft className="w-4 h-4" />
                Back
            </Button>

              <p className="text-sm text-center text-muted-foreground">
                Don’t have an account? <a href="#" className="underline">Sign Up</a>
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-white drop-shadow">
          <p>By signing in, you agree to our terms and conditions.</p>
        </div>
      </div>
    </div>
  );
}