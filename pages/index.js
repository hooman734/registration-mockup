import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Register} from "../components/registration";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://kit.fontawesome.com/ba7061d606.js" crossOrigin="anonymous" />
      </Head>

      <main>
        <Register />
      </main>

      <footer>

      </footer>
    </div>
  )
}
