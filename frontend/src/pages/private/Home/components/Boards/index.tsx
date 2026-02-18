import styles from "./styles.module.css"
import Link from "@/components/Link"
import Text from "@/components/Text"
import { Routes } from "@/constants/routes"
import { IBoard } from "@/interfaces/boards.interfaces"
import { useContext } from "react"
import { HomeContext } from "../../context"
import Icon from "@/components/Icon"

interface IBoardCardProps {
    boards: IBoard[]
    workspaceId: string
}

export default function Boards({ boards, workspaceId }: IBoardCardProps) {

    const { boardModal, setWorkspaceId } = useContext(HomeContext) 

    const openModal = () => {
        setWorkspaceId(workspaceId)
        boardModal.show()
    }

    return(
        <div className={styles.grid_container}>
            {boards.map(({ color, name, workspaceId, id: boardId }) => (
                <Link
                    type="box"
                    key={boardId}
                    className={styles.grid_child}
                    to={Routes.BOARD.params({ boardId, workspaceId })}
                >
                    <div className={styles.card} style={{ backgroundColor: color }}>
                        <Text fontSize="xl2" className={styles.card_title}>{ name }</Text>
                    </div>
                </Link>
            ))}
            <div
                onClick={openModal}
                className={`${styles.grid_child} ${styles.creation_btn}`}>
                <Icon name="add" size="lg"/>
            </div>
        </div>
    )
}

