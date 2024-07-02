import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

type ThemeType = {
    isDarkMode: boolean
}

const initialState : ThemeType = {
    isDarkMode: false
}


const theme = createSlice({
    name: "theme",
    initialState,
    reducers : {
        toggleTheme: (state)=>{
            state.isDarkMode = !state.isDarkMode;  
        }
    }
})
 

export const {toggleTheme} = theme.actions;

export const getTheme = (state: RootState)=> state.theme.isDarkMode;

export default theme.reducer;