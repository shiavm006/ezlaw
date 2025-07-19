"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin.module.css";

interface Lawyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialization: string[];
  registrationDate: string;
  status: 'active' | 'suspended' | 'pending' | 'verified';
  verified: boolean;
  kycStatus: 'pending' | 'approved' | 'rejected';
  casesHandled: number;
  successRate: number;
  proBonoCases: number;
  lastActivity: string;
  availability: 'available' | 'busy' | 'offline';
  licenseNumber: string;
  experience: number;
}

export default function LawyerManagement() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showLawyerModal, setShowLawyerModal] = useState(false);

  // Mock lawyer data
  const [lawyers, setLawyers] = useState<Lawyer[]>([
    {
      id: "LAW-001",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@lawfirm.com",
      phone: "+1-555-1234",
      location: "Los Angeles, CA",
      specialization: ["Criminal Law", "Family Law"],
      registrationDate: "2023-11-15",
      status: "verified",
      verified: true,
      kycStatus: "approved",
      casesHandled: 45,
      successRate: 92,
      proBonoCases: 8,
      lastActivity: "2024-07-03",
      availability: "available",
      licenseNumber: "CA-LAW-2019-456",
      experience: 8
    },
    {
      id: "LAW-002",
      name: "Michael Chen",
      email: "m.chen@legalservices.com",
      phone: "+1-555-5678",
      location: "San Francisco, CA",
      specialization: ["Corporate Law", "Tax Law"],
      registrationDate: "2024-01-20",
      status: "active",
      verified: true,
      kycStatus: "approved",
      casesHandled: 23,
      successRate: 87,
      proBonoCases: 3,
      lastActivity: "2024-07-02",
      availability: "busy",
      licenseNumber: "CA-LAW-2020-789",
      experience: 5
    },
    {
      id: "LAW-003",
      name: "Sarah Johnson",
      email: "sarah.j@legalaid.org",
      phone: "+1-555-9012",
      location: "New York, NY",
      specialization: ["Property Law", "Contract Law"],
      registrationDate: "2024-02-10",
      status: "pending",
      verified: false,
      kycStatus: "pending",
      casesHandled: 0,
      successRate: 0,
      proBonoCases: 0,
      lastActivity: "2024-06-28",
      availability: "offline",
      licenseNumber: "NY-LAW-2023-123",
      experience: 2
    },
    {
      id: "LAW-004",
      name: "David Wilson",
      email: "d.wilson@chambers.com",
      phone: "+1-555-3456",
      location: "Chicago, IL",
      specialization: ["Immigration Law", "Human Rights"],
      registrationDate: "2023-08-05",
      status: "suspended",
      verified: true,
      kycStatus: "approved",
      casesHandled: 67,
      successRate: 78,
      proBonoCases: 15,
      lastActivity: "2024-06-15",
      availability: "offline",
      licenseNumber: "IL-LAW-2018-345",
      experience: 12
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

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialization = filterSpecialization === 'all' || 
                                  lawyer.specialization.some(spec => spec.toLowerCase().includes(filterSpecialization.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || lawyer.status === filterStatus;
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const updateLawyerStatus = (lawyerId: string, newStatus: 'active' | 'suspended' | 'pending' | 'verified') => {
    setLawyers(lawyers.map(lawyer => 
      lawyer.id === lawyerId ? { ...lawyer, status: newStatus } : lawyer
    ));
  };

  const approveKYC = (lawyerId: string) => {
    setLawyers(lawyers.map(lawyer => 
      lawyer.id === lawyerId ? { ...lawyer, kycStatus: 'approved', verified: true, status: 'verified' } : lawyer
    ));
  };

  const rejectKYC = (lawyerId: string) => {
    setLawyers(lawyers.map(lawyer => 
      lawyer.id === lawyerId ? { ...lawyer, kycStatus: 'rejected' } : lawyer
    ));
  };

  const openLawyerModal = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setShowLawyerModal(true);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading lawyer management...</p>
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
            <div className={`${styles.navItem} ${styles.active}`}>
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
            <h1 className={styles.pageTitle}>Lawyer Management</h1>
            <p className={styles.dateRange}>Manage lawyer registrations and verifications</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.notificationBadge}>
              <span className={styles.notificationIcon}>🔔</span>
              <span className={styles.notificationCount}>2</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        </header>

        {/* Lawyer Stats */}
        <section className={styles.metricsSection}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>⚖️</span>
              <h3 className={styles.metricTitle}>Total Lawyers</h3>
            </div>
            <div className={styles.metricValue}>{lawyers.length}</div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>+{lawyers.filter(l => l.status === 'verified').length}</span>
              <span className={styles.changePercentage}>Verified</span>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>⏳</span>
              <h3 className={styles.metricTitle}>Pending KYC</h3>
            </div>
            <div className={styles.metricValue}>{lawyers.filter(l => l.kycStatus === 'pending').length}</div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>{lawyers.filter(l => l.status === 'pending').length}</span>
              <span className={styles.changePercentage}>Awaiting</span>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>📈</span>
              <h3 className={styles.metricTitle}>Avg Success Rate</h3>
            </div>
            <div className={styles.metricValue}>
              {Math.round(lawyers.filter(l => l.casesHandled > 0)
                .reduce((acc, l) => acc + l.successRate, 0) / 
                lawyers.filter(l => l.casesHandled > 0).length || 0)}%
            </div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>{lawyers.reduce((acc, l) => acc + l.casesHandled, 0)}</span>
              <span className={styles.changePercentage}>Total Cases</span>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>💚</span>
              <h3 className={styles.metricTitle}>Pro Bono Cases</h3>
            </div>
            <div className={styles.metricValue}>{lawyers.reduce((acc, l) => acc + l.proBonoCases, 0)}</div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>{lawyers.filter(l => l.availability === 'available').length}</span>
              <span className={styles.changePercentage}>Available</span>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className={styles.filtersSection}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search lawyers by name, email, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterContainer}>
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
              className={styles.filterSelect}
              title="Filter by specialization"
            >
              <option value="all">All Specializations</option>
              <option value="criminal">Criminal Law</option>
              <option value="family">Family Law</option>
              <option value="corporate">Corporate Law</option>
              <option value="property">Property Law</option>
              <option value="immigration">Immigration Law</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.filterSelect}
              title="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </section>

        {/* Lawyers Table */}
        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h3 className={styles.sectionTitle}>Lawyer Directory</h3>
            <span className={styles.resultCount}>{filteredLawyers.length} lawyers found</span>
          </div>
          
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Lawyer ID</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Location</th>
                  <th>Cases</th>
                  <th>Success Rate</th>
                  <th>KYC Status</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLawyers.map((lawyer) => (
                  <tr key={lawyer.id}>
                    <td className={styles.userId}>{lawyer.id}</td>
                    <td className={styles.userName}>{lawyer.name}</td>
                    <td className={styles.specialization}>
                      {lawyer.specialization.slice(0, 2).join(', ')}
                      {lawyer.specialization.length > 2 && '...'}
                    </td>
                    <td className={styles.userLocation}>{lawyer.location}</td>
                    <td className={styles.casesCount}>{lawyer.casesHandled}</td>
                    <td className={styles.successRate}>
                      <span className={`${styles.successBadge} ${lawyer.successRate >= 90 ? styles.excellent : lawyer.successRate >= 80 ? styles.good : styles.average}`}>
                        {lawyer.successRate}%
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.kycBadge} ${styles[lawyer.kycStatus]}`}>
                        {lawyer.kycStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.availabilityBadge} ${styles[lawyer.availability]}`}>
                        {lawyer.availability}
                      </span>
                    </td>
                    <td className={styles.actionButtons}>
                      <button 
                        className={styles.viewBtn}
                        onClick={() => openLawyerModal(lawyer)}
                      >
                        View
                      </button>
                      {lawyer.kycStatus === 'pending' && (
                        <>
                          <button 
                            className={styles.verifyBtn}
                            onClick={() => approveKYC(lawyer.id)}
                          >
                            Approve
                          </button>
                          <button 
                            className={styles.suspendBtn}
                            onClick={() => rejectKYC(lawyer.id)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {lawyer.status === 'verified' || lawyer.status === 'active' ? (
                        <button 
                          className={styles.suspendBtn}
                          onClick={() => updateLawyerStatus(lawyer.id, 'suspended')}
                        >
                          Suspend
                        </button>
                      ) : (
                        <button 
                          className={styles.activateBtn}
                          onClick={() => updateLawyerStatus(lawyer.id, 'active')}
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

        {/* Lawyer Details Modal */}
        {showLawyerModal && selectedLawyer && (
          <div className={styles.modalOverlay} onClick={() => setShowLawyerModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>Lawyer Details: {selectedLawyer.name}</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setShowLawyerModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.modalContent}>
                <div className={styles.userDetailGrid}>
                  <div className={styles.detailItem}>
                    <label>Lawyer ID:</label>
                    <span>{selectedLawyer.id}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Full Name:</label>
                    <span>{selectedLawyer.name}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Email:</label>
                    <span>{selectedLawyer.email}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Phone:</label>
                    <span>{selectedLawyer.phone}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>License Number:</label>
                    <span>{selectedLawyer.licenseNumber}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Experience:</label>
                    <span>{selectedLawyer.experience} years</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Specializations:</label>
                    <span>{selectedLawyer.specialization.join(', ')}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Cases Handled:</label>
                    <span>{selectedLawyer.casesHandled}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Success Rate:</label>
                    <span>{selectedLawyer.successRate}%</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Pro Bono Cases:</label>
                    <span>{selectedLawyer.proBonoCases}</span>
                  </div>
                </div>
                
                <div className={styles.modalActions}>
                  <button className={styles.primaryBtn}>View Case History</button>
                  <button className={styles.secondaryBtn}>Download KYC Documents</button>
                  <button className={styles.warningBtn}>Send Alert</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 