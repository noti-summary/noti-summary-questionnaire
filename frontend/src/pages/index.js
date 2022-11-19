import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import SummaryList from '../components/summaryList';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Noti-Summary Logger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Notification Summary
        </h1>
        
        <Link href="/login" passHref>
          <button>登入</button>
        </Link>

        <SummaryList userId={"001"}/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
