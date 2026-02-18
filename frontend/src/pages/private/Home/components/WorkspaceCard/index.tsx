import styles from "./styles.module.css"
import WorkspaceTitle from "@/components/WorkspaceTitle"
import { IWorkspace } from "@/interfaces/workspaces.interfaces"
import WorkspaceActions from "../WorkspaceActions"
import Boards from "../Boards"

interface IWorkspaceCardProps {
    workspace: IWorkspace
}

export default function WorkspaceCard({ workspace }:IWorkspaceCardProps) {

    return(
        <div className={styles.container}>
            <div className={styles.container_header}>
                <WorkspaceTitle name={workspace.name}/>
                <WorkspaceActions/>
            </div>

            <Boards 
                boards={workspace.boards || []}
                workspaceId={workspace.id}
            />
        </div>
    )
}
