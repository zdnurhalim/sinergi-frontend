import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAuth, setAuthLoading, setAuthError } from "@/store/AuthSlice";
import { AuthenticationService } from "@/services/AuthenticationService";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authService = new AuthenticationService();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
     
      localStorage.setItem("authToken", response.token);
      const userInfo = {
        id: response.data.id,
        name: response.data.user?.name,
        email: response.data.user?.email,
        phone: response.data.phone,
        company: response.data.company?.company_name,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));

      dispatch(setAuth({ data: response.data, token: response.token }));
      window.location.href = "/dashboard";
    } catch (err: any) {
      dispatch(setAuthError(err.message || "Login failed"));
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    // from-purple-900 via-blue-900 to-indigo-900
    <div className="min-h-screen flex items-center justify-center p-6 antialiased relative overflow-hidden"
    style={{
        backgroundImage:
          "url('https://api.builder.io/api/v1/image/assets/TEMP/df095bc2f4e8115febab0386b8096ac19c3a4553?placeholderIfAbsent=true')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="pointer-events-none absolute inset-x-0 top-[-20rem] mx-auto h-[40rem] w-[80rem] opacity-60 blur-3xl" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at center, rgba(170,205,229,0.25), rgba(246,193,120,0.18) 40%, rgba(170,205,229,0.1) 60%, transparent 70%)' }}></div>
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      {/* Subtle glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent 70%)] pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
        <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-lg p-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-white/70">
              Sign in to your account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white/90">Email</Label>
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
                  className="bg-white/5 text-white placeholder:text-white/50 border-white/20"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-white/90">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  aria-invalid={Boolean(errors.password)}
                  className="bg-white/5 text-white placeholder:text-white/50 border-white/20"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-white/80">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" {...register("remember")} />
                  <Label htmlFor="remember" className="mb-0">Remember me</Label>
                </div>
                <a href="#" className="text-sm underline-offset-4 hover:underline">Forgot password?</a>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#f6c178] to-[#aacde5] text-black hover:brightness-110"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Sign In"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-white/30 text-white bg-white/5"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Button>

              <p className="text-sm text-center text-white/70">
                Don’t have an account? <a href="#" className="underline">Sign Up</a>
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-white/50 drop-shadow">
          <p>By signing in, you agree to our terms and conditions.</p>
        </div>
      </div>
    </div>
  );
}
