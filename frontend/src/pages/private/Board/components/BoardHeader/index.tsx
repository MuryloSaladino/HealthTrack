import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import { useParams } from "react-router-dom"
import useLoading from "@/hooks/useLoading"
import { IBoard } from "@/interfaces/boards.interfaces"
import api from "@/service/internal.services"
import Text from "@/components/Text"
import Icon from "@/components/Icon"

export default function BoardHeader() {

    const { boardId } = useParams()
    const { loading, loadCallback } = useLoading(api.get)
    const [board, setBoard] = useState<IBoard>()

    useEffect(() => {
        (async () => {
            const { data } = await loadCallback(`/boards/${boardId}`)
            setBoard(data)
        })()
    }, [])

    return (
        <div className={styles.container}>
            {!loading && board &&
                <>
                    <Icon name="developer_board" size="lg"/>
                    <Text fontSize="xl2" fontWeight="bold">{ board.name }</Text>
                </>
            }
        </div>
    )
}