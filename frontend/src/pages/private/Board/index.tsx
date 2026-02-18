import styles from "./styles.module.css"
import Header from "@/components/Header";
import Menu from "./components/Menu";
import CardsBoard from "./components/CardsBoard";
import BoardHeader from "./components/BoardHeader";
import CardModal from "./components/CardModal";

export default function Board() {
    return(
        <>
            <Header/>

            <div className={styles.container}>
                <Menu/>

                <div className={styles.main_content}>
                    <BoardHeader/>
                    <CardsBoard/>
                </div>
            </div>

            <CardModal/>
        </>
    )
}