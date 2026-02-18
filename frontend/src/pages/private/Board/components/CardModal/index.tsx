import Modal from "@/components/Modal"
import api from "@/service/internal.services"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./styles.module.css"
import useLoading from "@/hooks/useLoading"
import { ICard } from "@/interfaces/cards.interfaces"
import Text from "@/components/Text"
import MarkdownEditor from "@uiw/react-markdown-editor"

export default function CardModal() {

    const { cardId, workspaceId, boardId } = useParams()
    const { loadCallback, loading } = useLoading(api.get)
    const [card, setCard] = useState<ICard>()
    const [text, setText] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const { data } = await loadCallback("/cards/" + cardId)
            setCard(data)
            setText(data.detailedDescription)
        })()
    }, [cardId])

    return (
        <Modal 
            open={!!cardId}
            onClose={() => navigate(`/w/${workspaceId}/b/${boardId}`)}
            maxWidth="lg"
        >
            <div className={`${styles.container} ${loading ? "loading" : ""}`} data-color-mode="light">
                {card &&

                    <>
                        <Text fontSize="xl4" fontWeight="semibold">{ card.description }</Text>

                        <div className={styles.md_container}>
                            <Text fontSize="xl3" fontWeight="semibold">Description</Text>
                            <MarkdownEditor
                                value={text}
                                onChange={(value, _) => setText(value)}
                                height="300px"
                            />
                        </div>
                    </>
                }
            </div>
        </Modal>
    )
}