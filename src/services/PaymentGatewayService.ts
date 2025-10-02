export interface PaymentGatewayPayload{
    user_id:number;
    name:string;
    email:string;
    amount:number;
    mobile:string;
    redirectUrl:string;
    description:string;
    expiredAt:string;
}

export interface PaymentGatewayResponse{
    data:{
        id:string;
        transaction_id:string;
        link:string;
        user_id:number;
        name:string;
        email:string;
        amount:number;
        mobile:string;
        redirectUrl:string;
        description:string
        expiredAt:string;
    }
}

export class PaymentGatewayService {
    private baseUrl: string; 

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    }  

    private async handleResponse(res: Response) {
        if (res.status === 401) {
            alert('Payment Failed !')
            return;
        } 
        if (!res.ok) {
              let errorData = {};
              try {
                errorData = await res.json();
              } catch (e) {
                console.log("Failed to parse error response as JSON", e);
              }
              throw { status: res.status, ...errorData };
        } 
        return res.json();
    }

    async createPayment(payload: PaymentGatewayPayload) {
       const safePayload = {
            ...payload,
            user_id: Number(payload.user_id),
            amount: Number(payload.amount),
            expiredAt: payload.expiredAt
                ? new Date(payload.expiredAt).toISOString()
                : new Date().toISOString(),
        };

        const res = await fetch(`${this.baseUrl}/payment/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(safePayload),
        });

        return this.handleResponse(res);
    }

    async getPayment(){

    }

    async detailPayment(){

    }

    async editPayment(){

    }

    async closePayment(){

    }

    async reopenPayment(){
        
    }
    
}