import { getUser } from "@/src/lib/dal";
import { redirect } from "next/navigation"


export default async function Page() {
    const user = await getUser()
    const userRole = user.userRole

    if(!user || userRole !== 'admin'){
      return redirect('/')
    }
  
    return (
      <div>
        <h1>DASHBOARD</h1>
      </div>
    );
  }