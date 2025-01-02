import Link from "next/link";
import style from "./styles.module.css";
import prisma from "../../lib/db";

export default async function Page() {
  const users = await prisma.user.findMany();

  return (  
    <div>
      <h1>POSTS</h1>
      <div className={style.linksContainer}>
        <Link href="/sobre">Ir para sobre</Link>
        <Link href="/">Ir para home</Link>
      </div>

      <div>
        <div className={style.linksContainer}>
          {users.map((user) => {
            return <Link href={`posts/${user.id}`}>{user.name}</Link>;
          })}
        </div>
      </div>
    </div>
  );
}
