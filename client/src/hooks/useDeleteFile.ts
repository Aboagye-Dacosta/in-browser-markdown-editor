import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiDeleteFile } from "../helpers/apiFiles";

export function useDeleteFile() {
    const queryClient = useQueryClient()
    const { mutate: deleteFile, isPending: isPendingDeleteFile } = useMutation({
        mutationFn: apiDeleteFile,
        onSuccess: () => {
            toast.success("File delete successful");
            queryClient.invalidateQueries({
                queryKey: ["files"]
            },);

        },
        onError: (error) => {
            toast.error(error.message);
        },
    })

    return {
        deleteFile,
        isPendingDeleteFile
    }
}