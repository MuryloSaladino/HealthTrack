import Icon from "@/components/Icon";
import styles from "./styles.module.css"
import Text from "@/components/Text";
import Input from "@/components/Input";
import { useEffect, useRef, useState } from "react";

interface ICreateCardProps {
    addCard: (description: string, listIndex: number) => void
    index: number
}

export default function CreateCard({ addCard, index }: ICreateCardProps) {

    const [creating, setCreating] = useState(false)
    const [description, setDescription] = useState("")

    const createListRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if(createListRef.current && !createListRef.current.contains(event.target as Node)) {
            setCreating(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])
    
    return (
        <div
            className={styles.create_card}
            onClick={() => setCreating(true) }
            ref={createListRef}
        >
            {
                creating ?
                
                <Input
                    className={styles.input}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            addCard(description, index)
                            setDescription("")
                        }
                    }}
                /> :

                <Text>Add new card<Icon name="add"/></Text>
            }
            
        </div>
    )
}