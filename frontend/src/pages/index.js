import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css'


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
          <Button variant="contained" size="large">登入</Button>
        </Link>

      </main>

      <footer className={styles.footer}>
        <a>
          Copyright © 2022 noti-summary, MUI Lab
        </a>
      </footer>
    </div>
  )
}
