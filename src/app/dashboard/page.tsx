"use client";

import styles from "./dashboard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated (in real app, check token/session)
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true);
      const userData = JSON.parse(currentUser);
      setUserName(userData.name || "User");
    } else {
      // Redirect to login if not authenticated
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  // Show loading state during hydration to prevent mismatch
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Mock data for demonstration
  const userCases = [
    {
      id: "CASE-001",
      title: "Workplace Harassment",
      type: "Employment Law",
      status: "Under Review",
      dateSubmitted: "2024-01-15",
      assignedLawyer: null
    },
    {
      id: "CASE-002", 
      title: "Property Dispute",
      type: "Property Law",
      status: "Lawyer Assigned",
      dateSubmitted: "2024-01-10",
      assignedLawyer: "Sarah Johnson"
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>My Dashboard</h1>
          <div className={styles.userInfo}>
            <span>Welcome back, {userName}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.quickActions}>
          <Link href="/file-case" className={styles.primaryAction}>
            File New Case
          </Link>
          <Link href="/consultation" className={styles.secondaryAction}>
            Book Consultation
          </Link>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>My Cases</h2>
          <div className={styles.casesGrid}>
            {userCases.map((caseItem) => (
              <div key={caseItem.id} className={styles.caseCard}>
                <div className={styles.caseHeader}>
                  <span className={styles.caseId}>{caseItem.id}</span>
                  <span className={`${styles.status} ${styles[caseItem.status.replace(' ', '').toLowerCase()]}`}>
                    {caseItem.status}
                  </span>
                </div>
                <h3 className={styles.caseTitle}>{caseItem.title}</h3>
                <p className={styles.caseType}>{caseItem.type}</p>
                <div className={styles.caseDetails}>
                  <p>Filed: {caseItem.dateSubmitted}</p>
                  {caseItem.assignedLawyer && (
                    <p>Lawyer: {caseItem.assignedLawyer}</p>
                  )}
                </div>
                <Link href={`/case/${caseItem.id}`} className={styles.viewCase}>
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>AS</div>
              <div className={styles.activityContent}>
                <p>Case CASE-002 has been assigned to lawyer Sarah Johnson</p>
                <span className={styles.activityTime}>2 hours ago</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>UR</div>
              <div className={styles.activityContent}>
                <p>Your case CASE-001 is now under review</p>
                <span className={styles.activityTime}>1 day ago</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Support Resources</h2>
          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCard}>
              <h4>Anonymous Filing</h4>
              <p>File your case anonymously to protect your identity while seeking justice.</p>
            </div>
            <div className={styles.resourceCard}>
              <h4>24/7 Crisis Support</h4>
              <p>Get immediate help through our crisis support hotline available round the clock.</p>
            </div>
            <div className={styles.resourceCard}>
              <h4>Legal Resources</h4>
              <p>Access educational materials and know your rights in various legal situations.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 