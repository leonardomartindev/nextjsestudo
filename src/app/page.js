import Link from "next/link";
import styles from "./page.module.css"
import { getUser } from "../lib/dal";


export default async function Home() {
  
  const user = await getUser()

  return (
    <div>
      <h1>Home</h1>

      <div className={styles.linksContainer}>
        <Link href="/sobre">Sobre</Link>
        <Link href="/posts">Posts</Link>

        {!user && <><Link href="/login">Login</Link>
          <Link href="/signup">Cadastro</Link></>}
        
      </div>

          <h2>Novo titulo na versão preview feature</h2>
    </div>
  );
}


