'use client';


import { useState } from "react";
import UsernameEntry from "./usernameentry";
import ScoutingReport from "./scoutingreport";
import Link from "next/link";

export default function Page() {

  const [username, setUsername] = useState('');


  return <main>

    <label htmlFor="username">Enter Lichess Username: </label>
    <input id="username" type="text" defaultValue={username} onChange={e => setUsername(e.target.value)} />
    <Link href={`/report/${username}/`}>Scout!</Link>

  </main>
}