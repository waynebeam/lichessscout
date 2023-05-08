'use client';


import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {

  const [username, setUsername] = useState('');
  const router = useRouter();

  function scoutUser(ev: React.FormEvent) {
    ev.preventDefault();
    router.push(`/report/${username}`);
  }

  return <main>

    <form onSubmit={scoutUser}>
      <label htmlFor="username">Enter Lichess Username: </label>
      <input id="username" type="text" defaultValue={username} onChange={e => setUsername(e.target.value)} />
      <input type="submit" value='Scout!'></input>
    </form>
  </main>
}