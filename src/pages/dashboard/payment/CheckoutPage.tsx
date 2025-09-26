import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CheckoutPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // simulasi proses publish 3 detik
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <Card className="max-w-md w-full text-center p-8 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {isProcessing ? "Sedang Memproses..." : "Job Ad Sukses!"}
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600">
            {isProcessing
              ? "Job Ad Anda sedang diproses untuk publish. Mohon tunggu sebentar."
              : "Terima kasih! Pembayaran sudah Berhasil dan Job Ad Anda berhasil dipublish."}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6 flex flex-col items-center gap-4">
          {isProcessing ? (
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          ) : (
            <CheckCircle className="w-16 h-16 text-green-500" />
          )}
          {!isProcessing && (
            <Button
            variant="default"
            size="lg"
            className="mt-4"
            onClick={() => window.location.replace("/dashboard")}
            >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Dashboard
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
