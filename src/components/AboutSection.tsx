import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.left}>
        <h2 className={styles.heading}>About Us</h2>
        <div className={styles.subheading}>Our Story</div>
      </div>
      <div className={styles.right}>
        <div className={styles.col}>
          M. Torres specializes in peaceful family dispute resolution, focusing on divorce mediation. Our experienced team fosters effective communication, ensuring swift conflict resolution while prioritizing family well-being
        </div>
        <div className={styles.col}>
          With a focus on empathy and expertise, our mediators aim to create a supportive environment where families can navigate the complexities of divorce with clarity and respect
        </div>
      </div>
    </section>
  );
} 