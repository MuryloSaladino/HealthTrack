import { IFormInput } from "@/components/Form/types"
import styles from "./styles.module.css"
import Form from "@/components/Form"
import { z } from "zod"
import Text from "@/components/Text"
import Link from "@/components/Link"
import { Routes } from "@/constants/routes"
import internalAPI from "@/service/internal.services"
import { useNavigate } from "react-router-dom"
import useLoading from "@/hooks/useLoading"

interface ILoginPayload {
    email: string
    password: string
}

export default function Login() {

    const navigate = useNavigate()
    const { loadCallback, loading } = useLoading(internalAPI.post)

    const fields:IFormInput[] = [
        { fieldName: "email", label: "email", zodSchema: z.string().email() },
        { fieldName: "password", label: "password", required: true, type: "password" }
    ]

    const submit = async (payload:ILoginPayload) => {
        const { data, success, showMessage } = await loadCallback("/login", payload)
        
        if(!success) {
            showMessage()
            return
        }

        localStorage.setItem("@TOKEN", data.token)
        navigate("/u/" + data.user.id)
    }

    return(
        <div className={styles.background}>
            <div className={`${styles.container} ${loading ? "loading" : ""}`}>
                <Text fontSize="xl3" fontWeight="semibold" textAlign="center">KanBosch</Text>

                <Form
                    fields={fields}
                    onSubmit={submit}
                    submitText="login"
                />

                <Text textAlign="center" fontSize="lg">
                    You don't have an account yet? <br/> <Link to={Routes.REGISTER}>Register right now!</Link>
                </Text>
            </div>
        </div>
    )
}