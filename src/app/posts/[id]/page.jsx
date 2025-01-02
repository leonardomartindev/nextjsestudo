import prisma from "../../../lib/db"

export default async function Page({ params }) {
    const id = (await params).id

    const user = await prisma.user.findUnique({where: {id: Number(id)}})

    return (
      <>
      <h1>{user.email}</h1>
      <div>My Post: {id}</div>
      </>
    )
  }