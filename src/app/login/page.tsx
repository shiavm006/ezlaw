"use client";

import styles from "./login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Simple authentication logic (in real app, this would be API calls)
    if (email && password) {
      // Store user data in localStorage
      const userData = {
        email: email,
        name: email.split('@')[0], // Use email prefix as name
        isAdmin: email.includes('admin') || email === 'admin@mtorres.com'
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Use Next.js router for navigation
      if (userData.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      alert('Please enter both email and password');
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
          <h1 className={styles.title}>Sign in to your account</h1>
          
          <form className={styles.form} onSubmit={handleLogin}>
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
                placeholder="Enter your password"
                required 
              />
            </div>
            
            <div className={styles.forgotPassword}>
              <Link href="/forgot-password">Forgot your password?</Link>
            </div>
            
            <button type="submit" className={styles.loginBtn} disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <div className={styles.signupLink}>
              Don't have an account? <Link href="/signup">Sign up</Link>
            </div>
            
            <div className={styles.divider}>
              <span>Or continue with</span>
            </div>
            
            <button type="button" className={styles.googleBtn}>
              <span className={styles.googleIcon}>G</span>
              Google
            </button>
          </form>

          <div className={styles.demoCredentials}>
            <h4>Demo Credentials:</h4>
            <div className={styles.credentialsList}>
              <p><strong>User Account:</strong><br />user@mtorres.com / password123</p>
              <p><strong>Admin Account:</strong><br />admin@mtorres.com / admin123</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.testimonialContent}>
          <div className={styles.avatars}>
            <div className={styles.avatar}>U</div>
            <div className={styles.avatar}>S</div>
            <div className={styles.avatar}>E</div>
            <div className={styles.avatar}>R</div>
            <div className={styles.avatar}>S</div>
            <div className={styles.avatar}>!</div>
          </div>
          
          <h2 className={styles.testimonialTitle}>Welcome back</h2>
          
          <p className={styles.testimonialText}>
            Continue your journey with M. Torres and access 
            our comprehensive legal assistance services.
          </p>
        </div>
      </div>
    </div>
  );
} 