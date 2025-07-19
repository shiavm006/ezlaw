"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin.module.css";

export default function EvidenceManagement() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      if (userData.isAdmin) {
        setIsAuthenticated(true);
        setIsAdmin(true);
      } else {
        alert('Access denied. Admin privileges required.');
        router.push('/dashboard');
      }
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const navigateToPage = (page: string) => {
    router.push(`/admin/${page}`);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading evidence management...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Checking admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Ezaw Admin</h2>
        </div>
        
        <div className={styles.sidebarMain}>
          <nav className={styles.navigation}>
            <div className={styles.navItem} onClick={() => router.push('/admin')}>
              <span className={styles.navIcon}>📊</span>
              <span>Dashboard</span>
            </div>
            <div className={styles.navItem} onClick={() => navigateToPage('users')}>
              <span className={styles.navIcon}>👥</span>
              <span>User Management</span>
            </div>
            <div className={styles.navItem} onClick={() => navigateToPage('lawyers')}>
              <span className={styles.navIcon}>⚖️</span>
              <span>Lawyer Management</span>
            </div>
            <div className={styles.navItem} onClick={() => navigateToPage('cases')}>
              <span className={styles.navIcon}>📋</span>
              <span>Case Management</span>
            </div>
            <div className={`${styles.navItem} ${styles.active}`}>
              <span className={styles.navIcon}>🔍</span>
              <span>Evidence Management</span>
            </div>
          </nav>
        </div>
        
        <div className={styles.sidebarFooter}>
          <div className={styles.navItem} onClick={() => navigateToPage('settings')}>
            <span className={styles.navIcon}>⚙️</span>
            <span>Settings</span>
          </div>
          <div className={styles.navItem} onClick={handleLogout}>
            <span className={styles.navIcon}>🚪</span>
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Evidence Management</h1>
            <p className={styles.dateRange}>Browse and verify case evidence</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.notificationBadge}>
              <span className={styles.notificationIcon}>🔔</span>
              <span className={styles.notificationCount}>1</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        </header>

        {/* Coming Soon */}
        <section className={styles.comingSoonSection}>
          <div className={styles.comingSoonContent}>
            <div className={styles.comingSoonIcon}>🔍</div>
            <h2>Coming Soon!</h2>
            <p>
              The Evidence Management module is currently under construction. 
              This section will allow you to browse, verify, and track all evidence files uploaded for each case.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
} 