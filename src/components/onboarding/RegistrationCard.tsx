import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../reusable/LoadingSpinner";

interface RegistrationCardProps {
  onBack?: () => void;
  onRegister?: (data: {
    email: string;
    password: string;
    fullName: string;
    company: string;
  }) => void;
  onLogin?: () => void;
  errors?: { [key: string]: string[] };
}

const RegistrationCard: React.FC<RegistrationCardProps> = ({
  onBack,
  onRegister,
  onLogin,
  errors: backendErrors = {},
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    password_confirmation: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // hapus error field saat diketik
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Full name is required";
      if (!formData.company) newErrors.company = "Company name is required";
      if (!formData.password_confirmation)
        newErrors.password_confirmation = "Please confirm your password";
      else if (formData.password_confirmation !== formData.password)
        newErrors.password_confirmation = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        onLogin?.();
      } else {
        onRegister?.({
          email: formData.email,
          password: formData.password,
          fullName: formData.name,
          company: formData.company,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative z-10">
      <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-lg p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-white/70">
            {isLogin
              ? "Sign in to your account to continue."
              : "Register to get started with Sinergi.AI"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name" className="text-white/90">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      handleInputChange("name", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="bg-white/5 text-white placeholder:text-white/50 border-white/20"
                  />
                  {(errors.name || backendErrors?.name) && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name || backendErrors.name?.[0]}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="company" className="text-white/90">
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    placeholder="Enter your company name"
                    className="bg-white/5 text-white placeholder:text-white/50 border-white/20"
                  />
                  {(errors.company || backendErrors?.company) && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company || backendErrors.company?.[0]}
                    </p>
                  )}
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email" className="text-white/90">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="name@company.com"
                className="bg-white/5 text-white placeholder:text-white/50 border-white/20"
              />
              {(errors.email || backendErrors?.email) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email || backendErrors.email?.[0]}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-white/90">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  handleInputChange("password", e.target.value)
                }
                placeholder="••••••••"
                className="bg-white/5 text-white placeholder:text-white/50 border-white/20"
              />
              {(errors.password || backendErrors?.password) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password || backendErrors.password?.[0]}
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <Label
                  htmlFor="password_confirmation"
                  className="text-white/90"
                >
                  Confirm Password
                </Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={formData.password_confirmation}
                  onChange={(e) =>
                    handleInputChange("password_confirmation", e.target.value)
                  }
                  placeholder="Confirm your password"
                  className="bg-white/5 text-white placeholder:text-white/50 border-white/20"
                />
                {(errors.password_confirmation ||
                  backendErrors?.password_confirmation) && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password_confirmation ||
                      backendErrors.password_confirmation?.[0]}
                  </p>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-[#f6c178] to-[#aacde5] text-black 
                hover:brightness-110 transition-all duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {loading ? (
                <>
                  <LoadingSpinner className="h-5 w-5 text-black" />
                  <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full flex items-center justify-center gap-2 border-white/30 text-white bg-white/5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>

            <p className="text-sm text-center text-white/70">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <a
                    onClick={() => setIsLogin(false)}
                    className="underline cursor-pointer"
                  >
                    Sign Up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a
                    onClick={() => navigate("/login")}
                    className="underline cursor-pointer"
                  >
                    Sign In
                  </a>
                </>
              )}
            </p>
          </form>
        </CardContent>
      </Card>

      {!isLogin && (
        <div className="mt-6 text-center text-sm text-white/50 drop-shadow">
          <p>
            By creating an account, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      )}
    </div>
  );
};

export default RegistrationCard;
