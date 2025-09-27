export interface UpdateCompanyPayload {
  id: number;
  company_name: string;
  industry: string | null | number;
  company_size: string | null;
  other_information: string | null;
  website: string | null;
}


export interface CompanyResponse {
  data: {
    id: number;
    company_name: string;
    industry: string | null;
    company_size: string | null;
    other_information: string | null;
    created_at: string;
    updated_at: string;
    website: string | null;
  };
}

export class CompanyService {
    private baseUrl: string;    
    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    }  
    
    private async handleResponse(res: Response) {
        if (res.status === 401) {

            window.location.href = "/login"; 
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

    async getCompany(id: number, token: string): Promise<CompanyResponse> {
        const res = await fetch(`${this.baseUrl}/companies/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return this.handleResponse(res);
    }

    async updateCompany(
        id: number,
        payload: UpdateCompanyPayload,
        token: string
      ): Promise<CompanyResponse> {
        const res = await fetch(`${this.baseUrl}/companies/update/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        return this.handleResponse(res);
    }
    

    
}