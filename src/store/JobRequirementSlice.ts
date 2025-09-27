import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobRequirementResponse } from "@/types/JobRequirement";

interface JobRequirementState {
    data: JobRequirementResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: JobRequirementState = {
    data: null,
    loading: false,
    error: null,
};

const JobRequirementSlice = createSlice({
    name: "jobRequirement",
    initialState,
    reducers: {
        setJobRequirement(state, action: PayloadAction<JobRequirementResponse>) {
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
        resetJobRequirement(state) {
            state.data = null;
            state.error = null;
            state.loading = false;
        },
    },
});

export const { setJobRequirement, setLoading, setError, resetJobRequirement } =
  JobRequirementSlice.actions;

export default JobRequirementSlice.reducer;
