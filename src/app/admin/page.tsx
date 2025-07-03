"use client";

import styles from "./admin.module.css";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
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
          <p>Loading admin dashboard...</p>
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

  // Dashboard metrics data
  const dashboardMetrics = [
    {
      title: "Total Registered Users",
      value: "12,847",
      change: "+234",
      percentage: "+2.1%",
      isPositive: true,
      icon: "👥"
    },
    {
      title: "Total Registered Lawyers",
      value: "1,203",
      change: "+45",
      percentage: "+3.9%",
      isPositive: true,
      icon: "⚖️"
    },
    {
      title: "Cases Filed Today",
      value: "156",
      change: "+23",
      percentage: "+17.3%",
      isPositive: true,
      icon: "📋"
    },
    {
      title: "Pending Cases",
      value: "2,847",
      change: "-127",
      percentage: "-4.3%",
      isPositive: false,
      icon: "⏳"
    },
    {
      title: "Resolved Cases",
      value: "8,456",
      change: "+189",
      percentage: "+2.3%",
      isPositive: true,
      icon: "✅"
    }
  ];

  // Cases filed over time (daily for last 7 days)
  const casesFiledData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Cases Filed',
        data: [145, 189, 167, 203, 178, 134, 156],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Case status distribution
  const caseStatusData = {
    labels: ['Pending', 'In Progress', 'Resolved', 'Closed'],
    datasets: [
      {
        data: [2847, 1234, 8456, 567],
        backgroundColor: [
          '#ef4444',
          '#f59e0b',
          '#10b981',
          '#6b7280'
        ],
        borderWidth: 0,
      },
    ],
  };

  // Most active regions
  const regionData = {
    labels: ['California', 'Texas', 'New York', 'Florida', 'Illinois'],
    datasets: [
      {
        label: 'Cases Filed',
        data: [1245, 892, 756, 634, 523],
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderColor: '#f59e0b',
        borderWidth: 1,
      },
    ],
  };

  // Urgent/Priority cases
  const urgentCases = [
    {
      id: "CASE-2024-001",
      title: "Emergency Custody Case",
      client: "Sarah Johnson",
      priority: "Critical",
      assignedLawyer: "Michael Chen",
      timeLeft: "2 hours",
      location: "Los Angeles, CA"
    },
    {
      id: "CASE-2024-002", 
      title: "Corporate Fraud Investigation",
      client: "TechCorp Inc.",
      priority: "High",
      assignedLawyer: "Emily Rodriguez",
      timeLeft: "6 hours",
      location: "San Francisco, CA"
    },
    {
      id: "CASE-2024-003",
      title: "Property Dispute Resolution",
      client: "David Kim",
      priority: "High",
      assignedLawyer: "Sarah Johnson",
      timeLeft: "1 day",
      location: "Austin, TX"
    }
  ];

  // Notifications
  const notifications = [
    {
      id: 1,
      type: "urgent",
      message: "3 critical cases require immediate attention",
      time: "2 minutes ago"
    },
    {
      id: 2,
      type: "info",
      message: "New lawyer Sarah Wilson has joined the platform",
      time: "15 minutes ago"
    },
    {
      id: 3,
      type: "warning",
      message: "High case load detected in Los Angeles region",
      time: "1 hour ago"
    },
    {
      id: 4,
      type: "success",
      message: "System backup completed successfully",
      time: "2 hours ago"
    }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#8a8a8a',
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#8a8a8a'
        },
        grid: {
          color: '#2a2a2a'
        }
      },
      y: {
        ticks: {
          color: '#8a8a8a'
        },
        grid: {
          color: '#2a2a2a'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#8a8a8a',
          font: {
            size: 12
          },
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>EzLaw Admin</h2>
        </div>
        
        <div className={styles.sidebarMain}>
          <nav className={styles.navigation}>
            <div 
              className={`${styles.navItem} ${pathname === '/admin' ? styles.active : ''}`}
              onClick={() => router.push('/admin')}
            >
              <span className={styles.navIcon}>📊</span>
              <span>Dashboard</span>
            </div>
            <div 
              className={`${styles.navItem} ${pathname === '/admin/users' ? styles.active : ''}`}
              onClick={() => navigateToPage('users')}
            >
              <span className={styles.navIcon}>👥</span>
              <span>User Management</span>
            </div>
            <div 
              className={`${styles.navItem} ${pathname === '/admin/lawyers' ? styles.active : ''}`}
              onClick={() => navigateToPage('lawyers')}
            >
              <span className={styles.navIcon}>⚖️</span>
              <span>Lawyer Management</span>
            </div>
            <div 
              className={`${styles.navItem} ${pathname === '/admin/cases' ? styles.active : ''}`}
              onClick={() => navigateToPage('cases')}
            >
              <span className={styles.navIcon}>📋</span>
              <span>Case Management</span>
            </div>
            <div 
              className={`${styles.navItem} ${pathname === '/admin/evidence' ? styles.active : ''}`}
              onClick={() => navigateToPage('evidence')}
            >
              <span className={styles.navIcon}>🔍</span>
              <span>Evidence Management</span>
            </div>
          </nav>
        </div>
        
        <div className={styles.sidebarFooter}>
          <div 
            className={`${styles.navItem} ${pathname === '/admin/settings' ? styles.active : ''}`}
            onClick={() => navigateToPage('settings')}
          >
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
            <h1 className={styles.pageTitle}>Admin Dashboard</h1>
            <p className={styles.dateRange}>Real-time Legal Platform Analytics</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.notificationBadge}>
              <span className={styles.notificationIcon}>🔔</span>
              <span className={styles.notificationCount}>4</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        </header>

        {/* Dashboard Metrics */}
        <section className={styles.metricsSection}>
          {dashboardMetrics.map((metric, index) => (
            <div key={index} className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <span className={styles.metricIcon}>{metric.icon}</span>
                <h3 className={styles.metricTitle}>{metric.title}</h3>
              </div>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricChange}>
                <span className={styles.changeAmount}>{metric.change}</span>
                <span className={`${styles.changePercentage} ${metric.isPositive ? styles.positive : styles.negative}`}>
                  {metric.percentage}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Charts Section */}
        <section className={styles.chartsSection}>
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Cases Filed (Last 7 Days)</h3>
            <div className={styles.chartContainer}>
              <Line data={casesFiledData} options={chartOptions} />
            </div>
          </div>

          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Case Status Distribution</h3>
            <div className={styles.chartContainer}>
              <Doughnut data={caseStatusData} options={doughnutOptions} />
            </div>
          </div>

          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Most Active Regions</h3>
            <div className={styles.chartContainer}>
              <Bar data={regionData} options={chartOptions} />
            </div>
          </div>
        </section>

        {/* Priority Cases */}
        <section className={styles.priorityCasesSection}>
          <div className={styles.priorityCases}>
            <h3 className={styles.sectionTitle}>🚨 Urgent/Priority Cases</h3>
            <div className={styles.casesList}>
              {urgentCases.map((case_, index) => (
                <div key={index} className={styles.caseItem}>
                  <div className={styles.caseHeader}>
                    <span className={styles.caseId}>{case_.id}</span>
                    <span className={`${styles.priorityTag} ${styles[case_.priority.toLowerCase()]}`}>
                      {case_.priority}
                    </span>
                  </div>
                  <h4 className={styles.caseTitle}>{case_.title}</h4>
                  <div className={styles.caseDetails}>
                    <span>Client: {case_.client}</span>
                    <span>Lawyer: {case_.assignedLawyer}</span>
                    <span>Location: {case_.location}</span>
                    <span className={styles.timeLeft}>⏰ {case_.timeLeft}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className={styles.notificationsSection}>
          <h3 className={styles.sectionTitle}>🔔 Recent Notifications</h3>
          <div className={styles.notificationsList}>
            {notifications.map((notification) => (
              <div key={notification.id} className={`${styles.notificationItem} ${styles[notification.type]}`}>
                <div className={styles.notificationContent}>
                  <p className={styles.notificationMessage}>{notification.message}</p>
                  <span className={styles.notificationTime}>{notification.time}</span>
                </div>
                <button className={styles.dismissBtn}>×</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 