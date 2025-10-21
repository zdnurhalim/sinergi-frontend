import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobAd } from "@/types/JobRequirement";

interface JobAdsState {
  data: JobAd[];
  loading: boolean;
  error: string | null;
}

const initialState: JobAdsState = {
  data: [],
  loading: false,
  error: null,
};

const JobAdsListSlice = createSlice({
  name: "jobAdsList",
  initialState,
  reducers: {
    setJobAds(state, action: PayloadAction<JobAd[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetJobAds(state) {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setJobAds, setLoading, setError, resetJobAds } = JobAdsListSlice.actions;
export default JobAdsListSlice.reducer;
