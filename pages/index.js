import Head from 'next/head'
import Register from "../components/registration";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Willing & Able</title>
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
