import styles from "./VisionSection.module.css";

export default function VisionSection() {
  return (
    <section className={styles.visionSection} id="vision">
      <div className={styles.container}>
        <h2 className={styles.heading}>OUR VISION</h2>
        <div className={styles.content}>
          <p className={styles.paragraph}>
          At Ezlaw, we envision a world where justice is accessible, fearless, and inclusive for all. Our mission begins with breaking down the traditional barriers that stop individuals from seeking legal help — fear of judgment, societal pressure, complex systems, and lack of trust. We believe that no one should suffer in silence or be denied justice due to their background, gender, or circumstances.
          </p>
          
          <p className={styles.paragraph}>
          Our platform offers a safe and secure space where users can file cases confidentially, upload evidence, track progress in real time, and connect with trusted legal professionals — all without fear or hesitation. Whether it’s accessing simplified explanations of laws, understanding their rights, or connecting with pro bono legal aid, Easlaw empowers users to take action and reclaim their voice through technology.
          </p>
          
          <p className={styles.paragraph}>
          Ezlaw is more than a digital legal service — it’s a movement to redefine justice. By combining transparency, empathy, and innovation, we aim to build a legal ecosystem where public trust is restored, silence is replaced by courage, and access to justice becomes a universal right, not a privilege.
          </p>
        </div>
      </div>
    </section>
  );
} 