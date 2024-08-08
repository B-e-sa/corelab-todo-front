import MagnifierIcon from "../icons/magnifier";
import NoteIcon from "../icons/note";
import XIcon from "../icons/x";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <NoteIcon />
      <p>CoreNotes</p>
      <div className={styles["search-bar"]}>
        <input type="text" placeholder="Pesquisar notas" />
        <MagnifierIcon />
      </div>
      <XIcon className={styles["x-icon"]} />
    </header>
  );
}
