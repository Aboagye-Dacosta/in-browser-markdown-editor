import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type LifecycleType = {
    value: "initial" | "active"
}

const initialState: LifecycleType = {
    value: "initial"
}


const appLifecycle = createSlice({
    name: "lifecycle",
    initialState,
    reducers: {
        init: (state) => {
            state.value = "initial";
        },
        activate: (state) => {
            state.value = "active"
        }
    }
});


export const { init, activate } = appLifecycle.actions;

export const getLifecycle = (state: RootState) => state.appLifecycle.value;

export default appLifecycle.reducer;