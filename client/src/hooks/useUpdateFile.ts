import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiUpdateFile } from "../helpers/apiFiles";

export function useUpdateFile() {
    const queryClient = useQueryClient();
    const { mutate: updateFile, isPending: isPendingFileUpdate } = useMutation({
        mutationFn: apiUpdateFile,
        onSuccess: () => {
            toast.success("File save successfully");
            queryClient.invalidateQueries(
                {
                    queryKey: ["files"]
                }
            );
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return {
        updateFile, isPendingFileUpdate
    }
}