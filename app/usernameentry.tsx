import { useState } from "react";

interface usernameEntryProps {
    scoutUser: (username: string) => void
}

export default function UsernameEntry({ scoutUser }: usernameEntryProps) {
    const [username, setUsername] = useState('');

    return (
        <div>
            <label htmlFor="username">Enter Lichess Username</label>
            <input id="username" type="text" defaultValue={username} onChange={e => setUsername(e.target.value)}></input>
            <button onClick={() => scoutUser(username)}>Scout</button>
        </div>
    )

}