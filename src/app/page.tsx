import styles from "./page.module.css";
import VisionSection from "../components/VisionSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.heroWrapper}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {"Caring\nMediators\nfor You"}
          </h1>
          <p className={styles.heroDesc}>
            At M. Torres, we provide confidential legal assistance for those who need support but feel unable to speak up due to family or social pressure. File your case anonymously and get the help you deserve.
          </p>
          <Link href="/file-case" className={styles.heroButton}>File Your Case</Link>
        </div>
      </div>
      <VisionSection />
    </>
  );
}
