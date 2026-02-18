import CreateBoardModal from "./components/CreateBoardModal";
import Header from "@/components/Header";
import CreateWorkspaceModal from "./components/CreateWorkspaceModal";
import { HomeProvider } from "./context";
import WorkspaceList from "./components/WorkspaceList";

export default function Home() {

    return(
        <HomeProvider>
            <CreateBoardModal/>
            <CreateWorkspaceModal/>

            <Header/>

            <WorkspaceList/>
        </HomeProvider>
    )
}