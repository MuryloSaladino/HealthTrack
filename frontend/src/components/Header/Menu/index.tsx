import { MouseEventHandler } from "react";
import styles from "./styles.module.css"
import Icon from "@/components/Icon";

interface IMenuProps {
    open: boolean;
    handleClose: () => void;
}

export default ({ open, handleClose }:IMenuProps) => {

    const handleModalClick:MouseEventHandler = (e) => {
        e.stopPropagation()
    }

    return (
        <div 
            className={`${styles.backdrop} ${open ? styles.backdrop_showing : styles.backdrop_closing}`}
            onClick={handleClose}
        >
            <div 
                className={`${styles.menu} ${open ? styles.menu_showing : styles.menu_closing}`}
                onClick={handleModalClick}
            >
                <Icon 
                    name="close"
                    size="lg"
                    className={styles.close_button}
                    onClick={handleClose}
                >X</Icon>

                <div className={styles.link_list}>
                    
                </div>
            </div>
        </div>
    )
}