import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

type EditorActionsType = {
    preview: boolean;
    maximize: boolean;
}

const initialState: EditorActionsType = {
    preview: false,
    maximize: false,
}


const editorActions = createSlice({
    name: "editorActions",
    initialState,
    reducers: {
        togglePreview: (state) => {
            state.preview = !state.preview;
        },
        toggleMaximize: (state) => {
            state.maximize = !state.maximize;
        }
    }
});


export const { toggleMaximize, togglePreview } = editorActions.actions;
export const getPreviewState = (state: RootState) => state.editorActions.preview;
export const getMaximizeState = (state: RootState) => state.editorActions.maximize;

export default editorActions.reducer;