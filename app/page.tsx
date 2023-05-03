'use client';

import UsernameEntry from "./usernameentry";

export default function Page() {

  function scoutUser(username: string) {
    console.log(username);
  }

  return <main>
    <UsernameEntry scoutUser={scoutUser} />
  </main>
}