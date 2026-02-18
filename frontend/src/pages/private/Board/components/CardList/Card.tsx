import styles from "./styles.module.css"
import { ICard } from "@/interfaces/cards.interfaces"
import Text from "@/components/Text"
import { useState } from "react"
import Draggable, { DraggableEventHandler } from "react-draggable"
import { useNavigate } from "react-router-dom"

interface ICardProps {
    card: ICard
    setDragging: (b: boolean) => void
    moveCard: (id: string, previousListIndex: number) => boolean
    index: number
}

export default function Card({ card, setDragging: setContextDragging, moveCard, index }: ICardProps) {

    const [mouseMoved, setMouseMoved] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const navigate = useNavigate()

    const startDrag: DraggableEventHandler = () => {
        setContextDragging(true)
        setMouseMoved(false)
    }

    const drag: DraggableEventHandler = (_, { x, y }) => {
        setMouseMoved(true)
        setPosition({ x, y })
    }

    const endDrag: DraggableEventHandler = () => {
        setContextDragging(false)
        
        if(!moveCard(card.id, index)) {
            setPosition({ x: 0, y: 0 })
        }
    }

    return (
        <Draggable
            position={position}
            onStart={startDrag}
            onStop={endDrag}
            onDrag={drag}
        >
            <div>
                <div 
                    className={`${styles.card} ${position.x > 20 || position.x < -20 ? styles.dragging : ""}`}
                    onClick={() => !mouseMoved && navigate(`c/${card.id}`)}
                >
                    <Text>{card.description}</Text>
                </div>
            </div>
        </Draggable>
    )
}