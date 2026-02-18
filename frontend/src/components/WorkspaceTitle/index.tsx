import styles from "./styles.module.css"
import icon from "./icon.module.css"
import Text from "../Text"

interface IWorkspaceTitleProps {
    name: string
    size?: "sm" | "md" | "lg"
}

export default function WorkspaceTitle({ name, size = "md" }: IWorkspaceTitleProps) {
    return(
        <div className={styles.container}>
            <div className={`${icon.letter_icon} ${icon[size]}`}>{ name[0] }</div>
            <Text fontSize={size == "sm" ? "md" : size == "md" ? "xl2" : "xl4"} textAlign="center">{ name }</Text>
        </div>
    )
}