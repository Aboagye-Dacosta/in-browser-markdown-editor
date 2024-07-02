import { combineReducers } from "@reduxjs/toolkit";
import appLifecycle from "./slice/appStateSlice";
import editorActions from "./slice/editorActionsSlice";
import files from "./slice/filesSlice";
import theme from "./slice/theme";



const rootReducer = combineReducers({
    files,
    appLifecycle,
    editorActions,
    theme
})



export default rootReducer;