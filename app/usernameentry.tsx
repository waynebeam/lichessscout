import { useState } from "react";

interface usernameEntryProps {
    scoutUser: (username: string) => void
}

export default function UsernameEntry({ scoutUser }: usernameEntryProps) {
    const [username, setUsername] = useState('');

    return (
        <div>
            <button onClick={() => scoutUser(username)}>Scout</button>
        </div>
    )

}