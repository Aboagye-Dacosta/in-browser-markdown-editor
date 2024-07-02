import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiGetFiles } from "../helpers/apiFiles";
import { File } from "../entities";

export function useFiles() {

    const { data, isPending, error } = useQuery<File[]>({
        queryKey: ["files"],
        queryFn: apiGetFiles
    })

    if (error) toast.error(error.message    );
    
    return {
        files: data,
        isPending,
    }
}