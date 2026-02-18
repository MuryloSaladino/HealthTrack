import Icon from "@/components/Icon";
import styles from "./styles.module.css"
import Text from "@/components/Text";
import Input from "@/components/Input";
import { useEffect, useRef, useState } from "react";

interface ICreateListProps {
    addList: (name: string) => void
}

export default function CreateList({ addList }: ICreateListProps) {

    const [creating, setCreating] = useState(false)
    const [name, setName] = useState("")

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
            className={`${styles.create_list} ${creating ? styles.creating : ""}`}
            onClick={() => setCreating(true) }
            ref={createListRef}
        >
            {
                creating ?
                
                <Input
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            addList(name)
                            setName("")
                        }
                    }}
                /> :

                <Text>Add new list<Icon name="add"/></Text>
            }
            
        </div>
    )
}