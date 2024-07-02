import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiCreateFile } from "../helpers/apiFiles";


export function useNewFile() {

    const { mutate, isPending } = useMutation({
        mutationFn: apiCreateFile,
        onSuccess: () => {
            toast.success("file create successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return {
        mutate,
        isPending,
    }
}