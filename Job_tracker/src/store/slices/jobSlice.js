import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  loading: false,
  error: null
};

const jobSlice = createSlice({
  name: "job",
  initialState,
    reducers: {

        setJobs: (state, action) => {
            state.jobs = action.payload;
            state.loading = false;
            state.error = null;
        },

        addJob: (state, action) => {  
            state.jobs.push(action.payload);
            state.loading = false;
            state.error = null;
        },

        updateJob: (state, action) => {
            const index = state.jobs.findIndex(job => job.$id === action.payload.$id);
            if (index !== -1) {
                state.jobs[index] = action.payload;
                state.loading = false;
                state.error = null;
            } else {
                state.error = "Job not found";
                state.loading = false;
            }
        },

        removeJob: (state, action) => {
            state.jobs = state.jobs.filter(job => job.$id !== action.payload);
            state.loading = false;
            state.error = null;
        },
    }
});

export const { setJobs, addJob, updateJob, removeJob } = jobSlice.actions;
export default jobSlice.reducer;