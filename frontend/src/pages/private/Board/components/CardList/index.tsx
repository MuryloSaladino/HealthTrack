import Text from "@/components/Text"
import styles from "./styles.module.css"
import { ICardList } from "@/interfaces/cards.interfaces"
import Card from "./Card"
import CreateCard from "./CreateCard"

interface ICardListProps {
    cardList: ICardList
    dragging: boolean
    setDragging: (b: boolean) => void
    currentListIndex?: number
    index: number
    moveCard: (id: string, previousListIndex: number) => boolean
    addCard: (description: string, listIndex: number) => void
}

export default function CardList({
    cardList,
    dragging,
    setDragging,
    index,
    currentListIndex,
    moveCard,
    addCard,
}: ICardListProps) {

    return (
        <li className={styles.container}>
            <Text fontSize="lg" fontWeight="semibold" color={cardList.color}>{ cardList.name }</Text>

            {cardList.cards.map(card => (
                <Card
                    key={card.id}
                    card={card}
                    setDragging={(b: boolean) => setDragging(b)}
                    moveCard={moveCard}
                    index={index}
                />
            ))}

            {dragging && currentListIndex == index &&
                <div className={styles.shadow_card}></div>
            }

            <CreateCard addCard={addCard} index={index}/>
        </li>
    )
}

