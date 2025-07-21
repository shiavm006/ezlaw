"use client";

import styles from "./login.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Demo credentials
    const demoCredentials = {
      admin: { email: 'admin@ezlaw.com', password: 'admin123', isAdmin: true },
      user: { email: 'user@ezlaw.com', password: 'user123', isAdmin: false }
    };
    
    // Check credentials
    const user = Object.values(demoCredentials).find(
      cred => cred.email === email && cred.password === password
    );
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (user) {
        // Store user data
        localStorage.setItem('currentUser', JSON.stringify({
          email: user.email,
          isAdmin: user.isAdmin,
          name: email.split('@')[0]
        }));
        
        // Redirect based on user type
        if (user.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError("Invalid email or password");
      }
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.brand}>
          <div className={styles.logo}>EzLaw</div>
        </div>
        
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Welcome Back</h1>
          
          <form className={styles.form} onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
              />
            </div>
            
            <div className={styles.forgotPassword}>
              <Link href="/forgot-password">Forgot your password?</Link>
            </div>
            
            {error && <div className={styles.error}>{error}</div>}
            
            <button type="submit" className={styles.loginBtn} disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          
          <div className={styles.demoCredentials}>
            <h4>Demo Credentials:</h4>
            <div className={styles.credentialsList}>
              <div className={styles.credentialItem}>
                <strong>Admin:</strong> admin@ezlaw.com / admin123
              </div>
              <div className={styles.credentialItem}>
                <strong>User:</strong> user@ezlaw.com / user123
              </div>
            </div>
          </div>
          
          <div className={styles.divider}>
            <span>or</span>
          </div>
          
          <button type="button" className={styles.googleBtn}>
            <span className={styles.googleIcon}>G</span>
            Continue with Google
          </button>
          
          <div className={styles.signupLink}>
            Don't have an account? <Link href="/signup">Sign up</Link>
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
            Continue your journey with EzLaw and access
          </h2>
          
          <p className={styles.testimonialText}>
            "The anonymous filing feature gave me the courage to seek help when I needed it most. The platform is incredibly secure and the legal team was professional and compassionate throughout my case."
          </p>
        </div>
      </div>
    </div>
  );
} 