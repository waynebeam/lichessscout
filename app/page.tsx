'use client';


import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from './homepage.module.css'

export default function Page() {

  const [username, setUsername] = useState('');
  const router = useRouter();

  function scoutUser(ev: React.FormEvent) {
    ev.preventDefault();
    router.push(`/report/${username}`);
  }

  return <main className={styles.main}>
    <h1 className={styles.heading}>Lichess Scout by <a rel="noopener" href="https://waynebeam.net" target="_blank">waynebeam.net</a></h1>

    <form onSubmit={scoutUser}>
      <label htmlFor="username">Enter Lichess Username: </label>
      <input id="username" type="text" defaultValue={username} onChange={e => setUsername(e.target.value)} />
      <input type="submit" value='Scout!'></input>
    </form>

  </main>
}