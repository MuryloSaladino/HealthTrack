import Text from "@/components/Text"
import styles from "./styles.module.css"
import Form from "@/components/Form"
import { fields } from "./schema"
import internalAPI from "@/service/internal.services"
import { useNavigate } from "react-router-dom"
import { Routes } from "@/constants/routes"
import Link from "@/components/Link"
import { toast } from "react-toastify"

interface IRegisterPayload {
    email: string 
	password: string 
	confirm: string 
    birthdate: string 
    firstName: string 
    lastName: string 
}

export default function Register() {

    const navigate = useNavigate()

    const submit = async ({ email, password, confirm, ...details }: IRegisterPayload) => {
        const { success, showMessage } = await internalAPI.post("/users", { email, password, confirm, details })
        
        if(success) {
            toast.success("Account created! Login to start your projects.")
            setTimeout(() => navigate(Routes.LOGIN), 2000)
        } else {
            showMessage()
        }
    }

    return(
        <div className={styles.background} >
            <div className={styles.container}>
                <Text fontSize="xl3" fontWeight="semibold" textAlign="center">KanBosch</Text>

                <Form
                    fields={fields}
                    onSubmit={submit}
                    submitText="register"
                />

                <Text textAlign="center" fontSize="lg">
                    Already with us? <br/> <Link to={Routes.LOGIN}>Login to your account</Link>
                </Text>
            </div>
        </div>
    )
}