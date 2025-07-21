"use client";

import styles from "./signup.module.css";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      // Handle signup logic here
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.brand}>
          <div className={styles.logo}>EzLaw</div>
        </div>
        
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Create Account</h1>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label htmlFor="firstName" className={styles.label}>First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                required 
                className={styles.input}
                placeholder="Enter your first name"
              />
            </div>
            
            <div className={styles.fieldGroup}>
              <label htmlFor="lastName" className={styles.label}>Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                required 
                className={styles.input}
                placeholder="Enter your last name"
              />
            </div>
            
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className={styles.input}
                placeholder="Enter your email"
              />
            </div>
            
            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                className={styles.input}
                placeholder="Create a password"
              />
            </div>
            
            <button type="submit" className={styles.signupBtn} disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>
          
          <div className={styles.divider}>
            <span>or</span>
          </div>
          
          <button type="button" className={styles.googleBtn}>
            <span className={styles.googleIcon}>G</span>
            Continue with Google
          </button>
          
          <div className={styles.loginLink}>
            Already have an account? <Link href="/login">Sign in</Link>
          </div>
          
          <div className={styles.terms}>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.testimonialContent}>
          <div className={styles.avatars}>
            <div className={styles.avatar}>S</div>
            <div className={styles.avatar}>M</div>
            <div className={styles.avatar}>L</div>
          </div>
          
          <h2 className={styles.testimonialTitle}>
            EzLaw is trusted by thousands of people seeking confidential
          </h2>
          
          <p className={styles.testimonialText}>
            "The platform's commitment to privacy and security gave me the confidence to seek legal help. The anonymous filing option is a game-changer for people in vulnerable situations."
          </p>
        </div>
      </div>
    </div>
  );
} 