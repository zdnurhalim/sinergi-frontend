import { AppDispatch } from "./store";
import { JobRequirementService } from "@/services/JobRequirementService";
import { setJobAds, setLoading, setError } from "./JobAdsSlice";

export const fetchJobAds = (token?: string) => async (dispatch: AppDispatch) => {
  const service = new JobRequirementService();
  dispatch(setLoading(true));
  try {
    const response = await service.getAllJobAds(token); // API return { data: JobAd[], ... }
    dispatch(setJobAds(response.data)); // ambil data array
  } catch (err: any) {
    dispatch(setError(err.message || "Failed to fetch job ads"));
  }
};
