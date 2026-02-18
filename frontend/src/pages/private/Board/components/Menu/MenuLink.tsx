import Icon from "@/components/Icon"
import styles from "./styles.module.css"
import Text from "@/components/Text"
import Link from "@/components/Link"

interface IMenuCardProps {
    text: string
    icon: string
    link?: string
    active?: boolean
}

export default function MenuLink({ icon, text, active, link = "" }: IMenuCardProps) {
    return (
        <Link type="box" to={link}>
            <div className={styles.menu_link} data-active={active}>
                <Icon name={icon} size="md"/>
                <Text>{ text }</Text>
            </div>
        </Link>
    )    
}