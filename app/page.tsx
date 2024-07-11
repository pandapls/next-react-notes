import styles from "./page.module.css";
import './style.css'
export default function Home() {
  return (
    <main className={styles.main}>
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    </main>
  );
}
