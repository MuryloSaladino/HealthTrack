import Icon from "@/components/Icon"
import styles from "./styles.module.css"
import { useState } from "react"
import { useWorkspace } from "../../hooks/useWorkspace"
import WorkspaceTitle from "@/components/WorkspaceTitle"
import MenuLink from "./MenuLink"
import Text from "@/components/Text"
import { useParams } from "react-router-dom"

export default function Menu() {
    
    const [open, setOpen] = useState(window.innerWidth > 500)
    const { workspace, loading } = useWorkspace()
    const { boardId } = useParams()
    
    return (
        <div className={styles.container}>
            <div className={`${styles.menu} ${open && !loading ? styles.open : ""}`}>
                {workspace && !loading && (
                    
                    <div className={styles.content}>

                        <div className={styles.content_top}>
                            <WorkspaceTitle name={workspace?.name} size="sm" />
                        </div>

                        <MenuLink
                            icon="groups"
                            text="Members"
                        />
                        <MenuLink
                            icon="settings"
                            text="Workspace Settings"
                        />

                        <div className={styles.board_list}>
                            <Text className={styles.board_list_title}>Your Boards</Text>

                            {workspace.boards?.map(board => (
                                <MenuLink 
                                    key={board.id}
                                    icon="developer_board" 
                                    text={board.name}
                                    active={board.id === boardId && open}
                                    link={`/w/${workspace.id}/b/${board.id}`}
                                />
                            ))}
                        </div>

                    </div>
                )}
            </div>
 
            <div className={styles.close_button}>
                <Icon
                    onClick={() => setOpen(prev => !prev)} 
                    name={open && !loading ? "chevron_left" : "chevron_right"}
                />
            </div>
        </div>
    )
}

