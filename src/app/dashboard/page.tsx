import Dashboard from "@/components/Dashboard"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const Page = () => {
    const { getUser } = getKindeServerSession()
    const user = getUser() 

    if(!user.id || !user.email ) return 'Unauthorized'

    return <Dashboard userId={user.id} />
}

export default Page