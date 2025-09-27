export interface GuestJobAdsPayload {
  company_description: string;
  talent_description: string;
}

export interface GenerateJobAdPayload {
  job_requirement_id: number;
  company_description: string;
  talent_description: string;
}

export class JobRequirementService {
    private baseUrl: string;    
    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    }   
    private async handleResponse(res: Response) {
        if (res.status === 401) {

            window.location.href = "/login"; // ganti sesuai route login
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

    async createGuestJobAd(payload: GuestJobAdsPayload) {
      const res = await fetch(`${this.baseUrl}/job-ads/guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });   
      return this.handleResponse(res);
    }

    async generateJobAd(payload: GenerateJobAdPayload, token: string) {
      const res = await fetch(`${this.baseUrl}/job-ads/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });   
      return this.handleResponse(res);
    }

    async chooseJobVersion(job_requirement_id: number, version: "version_1" | "version_2", token: string) {
      const res = await fetch(`${this.baseUrl}/job-ads/version/1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_requirement_id,
          version,
        }),
      });   
      return this.handleResponse(res);
    }

    async getJobAdById(id: number, token: string) {
        const res = await fetch(`${this.baseUrl}/job-ads/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }); 
        return this.handleResponse(res);
    }
}
