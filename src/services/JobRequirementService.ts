export interface GuestJobAdsPayload {
    company_description : string;
    talent_description  : string;
}

export class JobRequirementService {
    private baseUrl: string;
    
    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    }

    async createGuestJobAd(payload: GuestJobAdsPayload) {
        const res = await fetch(`${this.baseUrl}/job-ads/guest`, {
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