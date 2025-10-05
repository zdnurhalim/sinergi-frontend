export interface ApplicationPayload {
    id?: number;
    job_ads_id: number;
    full_name: string;
    whatsapp: string | null;
    domicile: string | null;
    last_education: string | null;
    major: string | null;
    cv_path?: string | null;
    portfolio_path?: string | null;
    email?: string | null;
    recruiter_id?: number;
    application_status?: number;
  }
  
  export interface ApplicationResponse {
    data: ApplicationPayload;
  }
  
  class ApplicationService {
    private baseUrl: string;
  
    constructor() {
      this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    }
  
    private async handleResponse(res: Response) {
      if (res.status === 401) {
        alert("Create Application Failed!");
        throw new Error("Unauthorized");
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
  
    async createApplication(formData: FormData) {
      const res = await fetch(`${this.baseUrl}/applications/create`, {
        method: "POST",
        body: formData,
      });
  
      return this.handleResponse(res);
    }
  
    async getApplication(id: number, token: string): Promise<ApplicationResponse> {
      const res = await fetch(`${this.baseUrl}/application/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return this.handleResponse(res);
    }
  }
  
  export default new ApplicationService();
  