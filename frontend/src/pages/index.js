import Link from 'next/link';
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>

      <main className={`${styles.main} self-center`}>
        <h2 className={`${styles.title} tracking-widest`}>通知摘要研究問卷</h2>
        <div className="flex flex-row self-center w-[35em] justify-between">
          {[..."探究智慧型手機使用者對於通知之理想摘要方式"].map((char) => <p className="my-0 text-xl">{char}</p>)}
        </div>
        
        <Link href="/login" className="my-4" passHref>
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
