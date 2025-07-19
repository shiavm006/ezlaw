import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandColumn}>
            <div className={styles.logo}>Ezaw</div>
            <p className={styles.description}>
              Providing confidential legal assistance for those who need support but feel unable to speak up due to family or social pressure.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook" className={styles.socialIcon}>FB</a>
              <a href="#" aria-label="LinkedIn" className={styles.socialIcon}>IN</a>
              <a href="#" aria-label="Twitter" className={styles.socialIcon}>TW</a>
              <a href="#" aria-label="Email" className={styles.socialIcon}>EM</a>
            </div>
          </div>
          
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><a href="#about">About Us</a></li>
              <li><a href="#vision">Our Vision</a></li>
              <li><a href="/file-case">File Your Case</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
          </div>
          
          <div className={styles.contactColumn}>
            <h4 className={styles.columnTitle}>Contact Info</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Phone:</span>
                <span>123-456-7890</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email:</span>
                <span>info@ezaw.com</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Address:</span>
                <div>
                  <div>500 Terry Francine St.</div>
                  <div>San Francisco, CA 94158</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Hours:</span>
                <div>
                  <div>Mon-Fri: 9AM-6PM</div>
                  <div>Sat: 10AM-4PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.bottomSection}>
          <div className={styles.legalLinks}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#accessibility">Accessibility Statement</a>
            <a href="#disclaimer">Legal Disclaimer</a>
          </div>
          <div className={styles.copyright}>
            © 2024 Ezaw Legal Services. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 