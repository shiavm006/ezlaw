import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>
            We provide confidential legal assistance for those who need support but feel unable to speak up due to family or social pressure.
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Our Mission</h2>
            <p className={styles.columnText}>
              EzLaw specializes in peaceful family dispute resolution, focusing on divorce mediation. 
              Our experienced team fosters effective communication, ensuring swift conflict resolution while 
              prioritizing family well-being.
            </p>
          </div>
          
          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Our Approach</h2>
            <p className={styles.columnText}>
              With a focus on empathy and expertise, our mediators aim to create a supportive environment 
              where families can navigate the complexities of divorce with clarity and respect. We believe 
              every family deserves a peaceful resolution.
            </p>
          </div>
        </div>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureNumber}>01</div>
            <h3 className={styles.featureTitle}>Confidential</h3>
            <p className={styles.featureText}>Your privacy is our priority. All discussions remain strictly confidential.</p>
          </div>
          
          <div className={styles.feature}>
            <div className={styles.featureNumber}>02</div>
            <h3 className={styles.featureTitle}>Experienced</h3>
            <p className={styles.featureText}>Over 15 years of experience in family mediation and dispute resolution.</p>
          </div>
          
          <div className={styles.feature}>
            <div className={styles.featureNumber}>03</div>
            <h3 className={styles.featureTitle}>Compassionate</h3>
            <p className={styles.featureText}>We understand the emotional challenges families face during difficult times.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 