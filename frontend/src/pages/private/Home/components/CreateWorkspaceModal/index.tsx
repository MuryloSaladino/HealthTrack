import styles from "./styles.module.css"
import Modal from "@/components/Modal"
import { HomeContext } from "../../context"
import { useContext } from "react"
import Text from "@/components/Text"
import Form from "@/components/Form"
import { IFormInput } from "@/components/Form/types"
import { IWorkspaceCreation } from "@/interfaces/workspaces.interfaces"
import { z } from "zod"
import internalAPI from "@/service/internal.services"
import { toast } from "react-toastify"

export default function CreateWorkspaceModal() {

    const { workspaceModal, addWorkspace } = useContext(HomeContext)

    const fields: IFormInput[] = [
        { fieldName: "name", label: "workspace name", zodSchema: z.string().min(3) }
    ]

    const submit = async (payload: IWorkspaceCreation) => {
        const { success, data } = await internalAPI.post("/workspaces", payload)

        if(success) {
            toast.success(`Workspace "${data.name}" created!`)
            addWorkspace(data)
            workspaceModal.hide()
        }
    }

    return(
        <Modal 
            open={workspaceModal.open} 
            onClose={workspaceModal.hide}
            maxWidth="sm"
        >
            <div className={styles.container}>
                <Text fontSize="xl2">Create Workspace</Text>

                <Form
                    onSubmit={submit}
                    fields={fields}
                    submitText="create"
                />
            </div>
        </Modal>
    )
}