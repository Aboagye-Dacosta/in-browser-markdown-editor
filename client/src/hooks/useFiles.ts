import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiGetFiles } from "../helpers/apiFiles";
import { FileType } from "../helpers/type";

export function useFiles() {

    const { data, isPending, error } = useQuery<FileType[]>({
        queryKey: ["files"],
        queryFn: apiGetFiles
    })

    if (error) toast.error(error.message    );
    
    return {
        files: data,
        isPending,
    }
}