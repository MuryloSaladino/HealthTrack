import useLoading from "@/hooks/useLoading";
import { IWorkspace } from "@/interfaces/workspaces.interfaces";
import api from "@/service/internal.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function useWorkspace() {

    const { workspaceId } = useParams()
    const [workspace, setWorkspace] = useState<IWorkspace | null>(null)

    const { loadCallback, loading } = useLoading(api.get)

    useEffect(() => {
        (async () => {
            const { data, success } = await loadCallback("/workspaces/" + workspaceId)
            if(success) {
                setWorkspace(data)
            }
        })()
    }, [workspaceId])

    return { workspace, loading }
}