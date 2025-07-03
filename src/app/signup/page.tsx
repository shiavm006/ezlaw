"use client";

import styles from "./signup.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Simple signup logic (in real app, this would be API calls)
    if (fullName && email && password) {
      // Store user data in localStorage
      const userData = {
        email: email,
        name: fullName,
        isAdmin: false // New signups are regular users
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // In a real app, you'd create the account via API
      alert(`Account created successfully for ${fullName}! Redirecting to dashboard...`);
      
      // Use Next.js router for navigation
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      alert('Please fill in all required fields');
    }
    
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.brand}>
          <div className={styles.logo}>M. Torres</div>
        </div>
        
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Sign up for an account</h1>
          
          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.fieldGroup}>
              <label htmlFor="fullName" className={styles.label}>Full name</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                className={styles.input}
                placeholder="Enter your full name"
                required 
              />
            </div>
            
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>Email address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className={styles.input}
                placeholder="Enter your email"
                required 
              />
            </div>
            
            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className={styles.input}
                placeholder="Create a password"
                required 
              />
            </div>
            
            <button type="submit" className={styles.signupBtn} disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
            
            <div className={styles.loginLink}>
              Already have an account? <Link href="/login">Sign in</Link>
            </div>
            
            <div className={styles.divider}>
              <span>Or continue with</span>
            </div>
            
            <button type="button" className={styles.googleBtn}>
              <span className={styles.googleIcon}>G</span>
              Google
            </button>
            
            <div className={styles.terms}>
              By clicking on sign up, you agree to our{" "}
              <Link href="/terms">Terms of Service</Link> and{" "}
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </form>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.testimonialContent}>
          <div className={styles.avatars}>
            <div className={styles.avatar}>M</div>
            <div className={styles.avatar}>T</div>
            <div className={styles.avatar}>O</div>
            <div className={styles.avatar}>R</div>
            <div className={styles.avatar}>R</div>
            <div className={styles.avatar}>S</div>
          </div>
          
          <h2 className={styles.testimonialTitle}>People love us</h2>
          
          <p className={styles.testimonialText}>
            M. Torres is trusted by thousands of people seeking confidential 
            legal assistance. Join our community and get the help you deserve.
          </p>
        </div>
      </div>
    </div>
  );
} 