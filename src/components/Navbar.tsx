import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>EzLaw</div>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="#about" className={styles.link}>About Us</Link>
        <Link href="#services" className={styles.link}>Services</Link>
        <Link href="#contact" className={styles.link}>Contact</Link>
      </div>
      <div className={styles.authButtons}>
        <Link href="/login" className={styles.loginBtn}>Login</Link>
        <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
      </div>
    </nav>
  );
} 