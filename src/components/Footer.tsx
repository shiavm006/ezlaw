import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandColumn}>
            <div className={styles.logo}>M. Torres</div>
            <p className={styles.description}>
              Providing compassionate and professional family mediation services. 
              We help families navigate difficult times with dignity and respect.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook" className={styles.socialIcon}>FB</a>
              <a href="#" aria-label="LinkedIn" className={styles.socialIcon}>IN</a>
              <a href="#" aria-label="Twitter" className={styles.socialIcon}>TW</a>
              <a href="#" aria-label="Email" className={styles.socialIcon}>EM</a>
            </div>
          </div>
          
          <div className={styles.servicesColumn}>
            <h4 className={styles.columnTitle}>Our Services</h4>
            <ul className={styles.linkList}>
              <li><a href="#services">Family Mediation</a></li>
              <li><a href="#services">Divorce Mediation</a></li>
              <li><a href="#services">Conflict Resolution</a></li>
              <li><a href="#services">Legal Consultation</a></li>
              <li><a href="#services">Support Services</a></li>
            </ul>
          </div>
          
          <div className={styles.resourcesColumn}>
            <h4 className={styles.columnTitle}>Resources</h4>
            <ul className={styles.linkList}>
              <li><a href="#about">About Us</a></li>
              <li><a href="#vision">Our Vision</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#faqs">FAQs</a></li>
              <li><a href="#contact">Contact</a></li>
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
                <span>info@mtorres.com</span>
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
            © 2024 M. Torres Family Mediation Services. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 