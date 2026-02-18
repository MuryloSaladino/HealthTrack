import { useParams } from "react-router-dom"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import api from "@/service/internal.services"
import { ICard, ICardList } from "@/interfaces/cards.interfaces"
import CardList from "../CardList"
import CreateList from "./CreateList"

export default function CardsBoard() {

    const { boardId } = useParams()
    const [loading, setLoading] = useState(false)
    const [cardsData, setCardsData] = useState<ICardList[]>([])

    const [dragging, setDragging] = useState(false)
    const [currentListIndex, setCurrentListIndex] = useState<number>()

    const moveCard = (id: string, previousListIndex: number) => {
        if(currentListIndex == undefined) {
            return false
        }
        if(currentListIndex == previousListIndex) {
            return false
        }
        api.patch(`/cards/${id}/card-lists/${cardsData[currentListIndex].id}`)

        const updatedData = cardsData
        const cardIndex = updatedData[previousListIndex].cards.findIndex(c => c.id == id)
        const [cardToMove] = updatedData[previousListIndex].cards.splice(cardIndex, 1)
        updatedData[currentListIndex].cards.push(cardToMove)
        return true
    } 

    const addList = async (name: string) => {
        const { data } = await api.post<ICardList>(`/card-lists/boards/${boardId}`, { name, index: cardsData.length })
        if(data) {
            setCardsData(prev => [...prev, { ...data, cards: [] }])
        }
    }

    const addCard = async (description: string, listIndex: number) => {
        const { data } = await api.post<ICard>(`/cards/card-lists/${cardsData[listIndex].id}`, 
            { 
                description,
                index: cardsData[listIndex].cards.length,
                detailedDescription: "",
                startDate: null,
                finishDate: null,
            }
        )
        if(data) {
            const updatedData = cardsData
            updatedData[listIndex].cards.push(data)
            setCardsData(updatedData)
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            const { data } = await api.get<ICardList[]>(`/card-lists/boards/${boardId}`)
            if(!data) return;

            const listsWithCards = await Promise.all(
                data.map(async (list) => {
                    const { data: cards } = await api.get<ICard[]>(`/cards/card-lists/${list.id}`)
                    return { ...list, cards: cards || [] }
                })
            )

            setCardsData(listsWithCards)
            setLoading(false)
        })()
    }, [boardId])
    
    return (
        <div 
            className={`${styles.container} ${loading ? "loading" : ""}`}
            onMouseMove={(e) => {
                const { left } = (e.currentTarget as HTMLElement).getBoundingClientRect()
                const x = (e.clientX - left)
                setCurrentListIndex((x % 288 < 33) ? undefined : Math.floor(x / (288)))
            }}
        >
            <ol>
                {cardsData.map((list, i) => (
                    <CardList
                        key={list.id}
                        cardList={list}
                        index={i}
                        currentListIndex={currentListIndex}
                        dragging={dragging} 
                        setDragging={(b: boolean) => setDragging(b)}
                        moveCard={moveCard}
                        addCard={addCard}
                    />
                ))}
                
                <CreateList addList={addList}/>
            </ol>
        </div>
    )
}