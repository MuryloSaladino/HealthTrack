import useOpen, { IOpenHook } from "@/hooks/useOpen";
import { IBoard } from "@/interfaces/boards.interfaces";
import { IWorkspace } from "@/interfaces/workspaces.interfaces";
import { createContext, ReactNode, useState } from "react";

interface IHomeContext {
    boardModal: IOpenHook
    workspaceModal: IOpenHook
    workspaces: IWorkspace[]
    addWorkspace: (w: IWorkspace) => void
    setWorkspaces: (ws: IWorkspace[]) => void
    workspaceId?: string
    setWorkspaceId: (id: string) => void
    addBoard: (b: IBoard, id: string) => void
}

export const HomeContext = createContext({} as IHomeContext)

export function HomeProvider({ children }: { children: ReactNode }) {
    
    const boardModal = useOpen() 
    const workspaceModal = useOpen() 

    const [workspaces, setWorkspaces] = useState<IWorkspace[]>([])
    const [workspaceId, setWorkspaceId] = useState<string>()

    const addWorkspace = (w: IWorkspace) => setWorkspaces(prev => [...prev, w])
    const addBoard = (b: IBoard, id: string) => {
        const index = workspaces.findIndex(w => w.id == id)
        const workspace = workspaces.splice(index, 1)[0]
        if(workspace?.boards) {
            workspace.boards.push(b)
        }
        setWorkspaces(prev => [...prev, workspace])
    }

    return (
        <HomeContext.Provider
            children={children}
            value={{
                boardModal,
                workspaceModal,
                workspaceId,
                workspaces,
                addWorkspace,
                addBoard,
                setWorkspaceId: (id: string) => setWorkspaceId(id),
                setWorkspaces: (ws: IWorkspace[]) => setWorkspaces(ws)
            }}
        />
    )
}
