// src/pages/PricingPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Crown } from "lucide-react"; // Icon lucide-react
import { PaymentGatewayService, PaymentGatewayPayload } from "@/services/PaymentGatewayService";

const pricingPlans = [
  {
    id: "plus",
    name: "Plus",
    price: 1000,
    description: "Cocok untuk individu atau tim kecil yang ingin mulai dengan Sinergi.ai",
    features: ["Akses fitur dasar", "Support via email", "5 project aktif"],
    icon: <Star className="w-8 h-8 text-yellow-500" />,
  },
  {
    id: "pro",
    name: "Pro",
    price: 1001,
    description: "Untuk tim profesional yang ingin produktivitas maksimal tanpa batasan apapun",
    features: ["Semua fitur Plus", "Support prioritas", "Unlimited project"],
    icon: <Crown className="w-8 h-8 text-purple-500" />,
  },
];

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const paymentService = new PaymentGatewayService();

  const handleSelectPlan = async (planId: string, price: number, name: string) => {
    // console.log("Selected Plan:", planId);
    // nanti bisa redirect ke checkout atau simpan di state global
    // navigate("checkout"); // contoh redirect
    try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        console.log(user)
        if (!user?.id) {
          alert("Silakan login terlebih dahulu");
          navigate("/login");
          return;
        }
    
        const payload: PaymentGatewayPayload = {
          user_id: Number(user.id),
          name: user.user?.name || user.name || "",
          email: user.user?.email || user.email || "",
          amount: Number(price),
          mobile: user.phone || "",
          redirectUrl: `${window.location.origin}/pricing/checkout`,
          description: `Pembayaran plan ${planId}`,
          expiredAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        };

        const response = await paymentService.createPayment(payload);
        if (response?.data?.link) {
            window.location.href = response.data.link; 
        }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Gagal membuat pembayaran.");
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Pilih Plan Terbaikmu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {pricingPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex items-center gap-4">
              {plan.icon}
              <div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 mt-2">
              <span className="text-3xl font-bold text-gray-800">Rp {plan.price.toLocaleString()}</span>
              <ul className="list-disc ml-5 space-y-1 text-gray-700">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <Button 
                className="mt-4 w-full"
                onClick={() => handleSelectPlan(plan.id, plan.price)}
              >
                Pilih {plan.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
