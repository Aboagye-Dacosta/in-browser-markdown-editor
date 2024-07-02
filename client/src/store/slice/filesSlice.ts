import { createSlice } from "@reduxjs/toolkit";
import { File } from "../../entities";
import { RootState } from "../store";




const initialState: {
    openedFiles: File[];
    current: File;
} = {
    openedFiles: [],
    current: {} as File,
}

const files = createSlice({
    name: "files",
    initialState,
    reducers: {

        openFile: (state, action) => {
            const updatedFiles = state.openedFiles.map((file) => {
                if (file.fileId === state.current.fileId) {
                    return state.current;
                }
                return file;
            });

            state.current = action.payload;
            state.openedFiles = updatedFiles;
        },

        setCurrentFileContent: (state, action) => {
            state.current.content = action.payload;
        },

        addFileToOpenedFiles(state, action) {
            const updatedFiles = state.openedFiles.map((file) => {
                if (file.fileId === state.current.fileId) {
                    return state.current;
                }
                return file;
            });

            const isPresent = state.openedFiles.find((file) => file.fileId === action.payload.fileId);

            return {
                ...state,
                current: action.payload,
                openedFiles: isPresent ? state.openedFiles : [...updatedFiles, action.payload as File],
            }
        },
        removeFileFromOpenedFiles(state, action) {
            const index = state.openedFiles.findIndex(file => file.fileId == action.payload.fileId);
            const openedFiles = state.openedFiles.filter((file,) => file.fileId !== action.payload.fileId);
            const value = openedFiles.length > 0 ? openedFiles[Math.max(0, index - 1)] : {} as File;

            return {
                ...state,
                openedFiles,
                current: value,
            }
        }

    }
})


export const { openFile, addFileToOpenedFiles, removeFileFromOpenedFiles, setCurrentFileContent } = files.actions;


export const getCurrentFile = (state: RootState) => state.files.current;

export default files.reducer;