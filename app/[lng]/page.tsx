import './style.css'
import styles from "./page.module.css";
import { useTranslation } from "@/i18n/index";

export default async function Home({ params: { lng } }: {
  params: {
    lng: string
  }
}) {
  const { t } = await useTranslation(lng);

  return (
    <main className={styles.main}>
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          {t('initText')}
        </span>
      </div>
    </main>
  );
}
