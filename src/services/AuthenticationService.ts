export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    company_name: string;
    claim_token: string;
}

export class AuthenticationService {
    private baseUrl: string;    
    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL; 
    }   
    async register(payload: RegisterPayload) {
        const res = await fetch(`${this.baseUrl}/recruiters`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
        });   
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
}