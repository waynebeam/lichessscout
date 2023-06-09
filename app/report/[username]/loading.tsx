'use client';
import { useState, useEffect } from "react";
import styles from './loading.module.css';


export default function Loading() {
    const loadingPhrases = ['loading games', 'passing pawns', 'en passanting', 'checking mate', 'queening',
        'pinning and winning', 'texting Magnus', 'stocking fish', 'scouting'];
    const [index, setIndex] = useState(Math.floor(Math.random() * loadingPhrases.length));

    useEffect(function () {
        const timeout = setTimeout(function () {
            setIndex(Math.floor(Math.random() * loadingPhrases.length));
        }, 2000);
        return () => clearTimeout(timeout);
    })

    return <div className={styles.loading}><h1>...{loadingPhrases[index]}...</h1></div>
}