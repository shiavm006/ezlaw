import styles from "./VisionSection.module.css";

export default function VisionSection() {
  return (
    <section className={styles.visionSection} id="vision">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Vision</h2>
          <p className={styles.subtitle}>
            Redefining justice through technology, empathy, and accessibility
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.visionCard}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Breaking Down Barriers</h3>
            <p className={styles.cardText}>
              We envision a world where justice is accessible, fearless, and inclusive for all. Our mission begins with breaking down the traditional barriers that stop individuals from seeking legal help — fear of judgment, societal pressure, complex systems, and lack of trust.
            </p>
          </div>
          
          <div className={styles.visionCard}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Safe & Secure Platform</h3>
            <p className={styles.cardText}>
              Our platform offers a safe and secure space where users can file cases confidentially, upload evidence, track progress in real time, and connect with trusted legal professionals — all without fear or hesitation.
            </p>
          </div>
          
          <div className={styles.visionCard}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Empowering Voices</h3>
            <p className={styles.cardText}>
              Whether it&apos;s accessing simplified explanations of laws, understanding their rights, or connecting with pro bono legal aid, Ezaw empowers users to take action and reclaim their voice through technology.
            </p>
          </div>
        </div>
        
        <div className={styles.missionStatement}>
          <div className={styles.missionContent}>
            <h3 className={styles.missionTitle}>More Than a Service</h3>
            <p className={styles.missionText}>
              Ezaw is more than a digital legal service — it&apos;s a movement to redefine justice. By combining transparency, empathy, and innovation, we aim to build a legal ecosystem where public trust is restored, silence is replaced by courage, and access to justice becomes a universal right, not a privilege.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 