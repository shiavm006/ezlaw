import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Ezaw
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>
        
        <div className={styles.authSection}>
          <Link href="/login" className={styles.loginLink}>Login</Link>
          <Link href="/signup" className={styles.signupButton}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
} 