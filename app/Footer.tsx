import styles from './homepage.module.css'

export default function Footer() {
    return (
        <div className={styles.footerContainer}>
            <a rel="noopener" href="https://waynebeam.net" target="_blank"> Made by waynebeam.net</a>
            <a rel="noopener" href="https://lichess.org/@/waynebeam" target="_blank"> My Lichess profile</a>
            <a rel="noopener" href="https://twitter.com/@waynebeam" target="_blank">Twitter</a>
            <a rel="noopener" href="https://github.com/waynebeam/lichessscout" target="_blank">View source code</a>
            <a rel="noopener" href="https://lichess.org" target="_blank">Lichess.org</a>
            <a rel="noopener" href="https://lichess.org/patron" target="_blank">Please support Lichess!</a>
            <a rel="noopener" href="mailto:wayne@waynebeam.net" target="_blank">Email me</a>
            <a rel="noopener" href="https://waynebeam.net/humaneval" target="_blank">Human Eval</a>

        </div>
    )
}