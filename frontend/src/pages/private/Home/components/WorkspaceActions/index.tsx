import Link from "@/components/Link";
import styles from "./styles.module.css"
import Button from "@/components/Button";
import { Routes } from "@/constants/routes";

export default function WorkspaceActions() {
    return(
        <div className={styles.container}>
            <Link to={Routes.HOME + ""} type="box">
                <Button className="" size="sm" fullwidth iconName="dashboard">Boards</Button>
            </Link>
            <Link to={Routes.HOME + ""} type="box">
                <Button className="" size="sm" fullwidth iconName="groups">Members</Button>
            </Link>
            <Link to={Routes.HOME + ""} type="box">
                <Button className="" size="sm" fullwidth iconName="settings">Settings</Button>
            </Link>
        </div>
    )
}