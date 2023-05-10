import styles from './homepage.module.css'
import Link from 'next/link'

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <Link href={'/'}>Lichess Scout by</Link>
            <a rel="noopener" href="https://waynebeam.net" target="_blank"> waynebeam.net</a>

        </div>
    )
}