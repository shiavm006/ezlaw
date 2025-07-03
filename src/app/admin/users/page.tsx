"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin.module.css";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  registrationDate: string;
  status: 'active' | 'suspended' | 'pending';
  verified: boolean;
  casesCount: number;
  lastActivity: string;
  riskScore: 'low' | 'medium' | 'high';
}

export default function UserManagement() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);

  // Mock user data
  const [users, setUsers] = useState<User[]>([
    {
      id: "USR-001",
      name: "John Anderson",
      email: "john.anderson@email.com",
      phone: "+1-555-0123",
      location: "Los Angeles, CA",
      registrationDate: "2024-01-15",
      status: "active",
      verified: true,
      casesCount: 3,
      lastActivity: "2024-07-02",
      riskScore: "low"
    },
    {
      id: "USR-002",
      name: "Sarah Martinez",
      email: "sarah.m@email.com",
      phone: "+1-555-0456",
      location: "New York, NY",
      registrationDate: "2024-02-20",
      status: "active",
      verified: true,
      casesCount: 1,
      lastActivity: "2024-07-01",
      riskScore: "low"
    },
    {
      id: "USR-003",
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1-555-0789",
      location: "San Francisco, CA",
      registrationDate: "2024-03-10",
      status: "pending",
      verified: false,
      casesCount: 0,
      lastActivity: "2024-06-28",
      riskScore: "medium"
    },
    {
      id: "USR-004",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+1-555-0321",
      location: "Chicago, IL",
      registrationDate: "2024-01-05",
      status: "suspended",
      verified: true,
      casesCount: 2,
      lastActivity: "2024-06-15",
      riskScore: "high"
    }
  ]);

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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateUserStatus = (userId: string, newStatus: 'active' | 'suspended' | 'pending') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const verifyUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verified: true } : user
    ));
  };

  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading user management...</p>
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
          <h2>EzLaw Admin</h2>
        </div>
        
        <div className={styles.sidebarMain}>
          <nav className={styles.navigation}>
            <div className={styles.navItem} onClick={() => router.push('/admin')}>
              <span className={styles.navIcon}>📊</span>
              <span>Dashboard</span>
            </div>
            <div className={`${styles.navItem} ${styles.active}`}>
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
            <div className={styles.navItem} onClick={() => navigateToPage('evidence')}>
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
            <h1 className={styles.pageTitle}>User Management</h1>
            <p className={styles.dateRange}>Manage platform users and their access</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.notificationBadge}>
              <span className={styles.notificationIcon}>🔔</span>
              <span className={styles.notificationCount}>4</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        </header>

        {/* User Stats */}
        <section className={styles.metricsSection}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>👥</span>
              <h3 className={styles.metricTitle}>Total Users</h3>
            </div>
            <div className={styles.metricValue}>{users.length}</div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>+{users.filter(u => u.status === 'active').length}</span>
              <span className={styles.changePercentage}>Active</span>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>✅</span>
              <h3 className={styles.metricTitle}>Verified Users</h3>
            </div>
            <div className={styles.metricValue}>{users.filter(u => u.verified).length}</div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>{users.filter(u => !u.verified).length}</span>
              <span className={styles.changePercentage}>Pending</span>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>⚠️</span>
              <h3 className={styles.metricTitle}>High Risk Users</h3>
            </div>
            <div className={styles.metricValue}>{users.filter(u => u.riskScore === 'high').length}</div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>{users.filter(u => u.status === 'suspended').length}</span>
              <span className={styles.changePercentage}>Suspended</span>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className={styles.filtersSection}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search users by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterContainer}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.filterSelect}
              title="Filter users by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </section>

        {/* Users Table */}
        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h3 className={styles.sectionTitle}>User Directory</h3>
            <span className={styles.resultCount}>{filteredUsers.length} users found</span>
          </div>
          
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Cases</th>
                  <th>Status</th>
                  <th>Risk Score</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className={styles.userId}>{user.id}</td>
                    <td className={styles.userName}>{user.name}</td>
                    <td className={styles.userEmail}>{user.email}</td>
                    <td className={styles.userLocation}>{user.location}</td>
                    <td className={styles.casesCount}>{user.casesCount}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.riskBadge} ${styles[user.riskScore]}`}>
                        {user.riskScore}
                      </span>
                    </td>
                    <td>
                      <span className={user.verified ? styles.verified : styles.unverified}>
                        {user.verified ? '✓' : '✗'}
                      </span>
                    </td>
                    <td className={styles.actionButtons}>
                      <button 
                        className={styles.viewBtn}
                        onClick={() => openUserModal(user)}
                      >
                        View
                      </button>
                      {!user.verified && (
                        <button 
                          className={styles.verifyBtn}
                          onClick={() => verifyUser(user.id)}
                        >
                          Verify
                        </button>
                      )}
                      {user.status === 'active' ? (
                        <button 
                          className={styles.suspendBtn}
                          onClick={() => updateUserStatus(user.id, 'suspended')}
                        >
                          Suspend
                        </button>
                      ) : (
                        <button 
                          className={styles.activateBtn}
                          onClick={() => updateUserStatus(user.id, 'active')}
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* User Details Modal */}
        {showUserModal && selectedUser && (
          <div className={styles.modalOverlay} onClick={() => setShowUserModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>User Details: {selectedUser.name}</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setShowUserModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.modalContent}>
                <div className={styles.userDetailGrid}>
                  <div className={styles.detailItem}>
                    <label>User ID:</label>
                    <span>{selectedUser.id}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Full Name:</label>
                    <span>{selectedUser.name}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Email:</label>
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Phone:</label>
                    <span>{selectedUser.phone}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Location:</label>
                    <span>{selectedUser.location}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Registration Date:</label>
                    <span>{selectedUser.registrationDate}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Last Activity:</label>
                    <span>{selectedUser.lastActivity}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Total Cases:</label>
                    <span>{selectedUser.casesCount}</span>
                  </div>
                </div>
                
                <div className={styles.modalActions}>
                  <button className={styles.primaryBtn}>View Case History</button>
                  <button className={styles.secondaryBtn}>Reset Password</button>
                  <button className={styles.warningBtn}>Send Message</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 