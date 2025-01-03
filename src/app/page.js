import Link from "next/link";
import styles from "./page.module.css";
import { getUser } from "../lib/dal";
import { performRequest } from "../lib/datocms";

const PAGE_CONTENT_QUERY = `
query {
  landing {
    heroSection {
			title
    }
  }
}`;

export default async function Home() {
  const user = await getUser();
  const response = await performRequest(PAGE_CONTENT_QUERY);
  console.log(response)




  return (
    <div>
      <h1>Home</h1>

      <div className={styles.linksContainer}>
        <Link href="/sobre">Sobre</Link>
        <Link href="/posts">Posts</Link>

        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Cadastro</Link>
          </>
        )}
      </div>

      <h2>Novo titulo vindo do DatoCMS: {response.landing.heroSection.title}</h2>
    </div>
  );
}
