"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin.module.css";

interface Case {
  id: string;
  title: string;
  client: string;
  type: string;
  priority: 'high' | 'medium' | 'low' | 'critical';
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  assignedLawyer: string;
  dateFiled: string;
  region: string;
  isAnonymous: boolean;
  description: string;
  evidence: number;
  lastUpdated: string;
}

export default function CaseManagement() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Mock case data
  const [cases, setCases] = useState<Case[]>([
    {
      id: "CASE-2024-001",
      title: "Emergency Custody Dispute",
      client: "Sarah Johnson",
      type: "Family Law",
      priority: "critical",
      status: "in-progress",
      assignedLawyer: "Dr. Emily Rodriguez",
      dateFiled: "2024-07-01",
      region: "Los Angeles, CA",
      isAnonymous: false,
      description: "Urgent custody case involving child safety concerns",
      evidence: 8,
      lastUpdated: "2024-07-03"
    },
    {
      id: "CASE-2024-002",
      title: "Corporate Fraud Investigation",
      client: "TechCorp Inc.",
      type: "Corporate Law",
      priority: "high",
      status: "pending",
      assignedLawyer: "Michael Chen",
      dateFiled: "2024-06-28",
      region: "San Francisco, CA",
      isAnonymous: false,
      description: "Investigation into alleged financial misconduct",
      evidence: 15,
      lastUpdated: "2024-07-02"
    },
    {
      id: "CASE-2024-003",
      title: "Property Boundary Dispute",
      client: "Anonymous",
      type: "Property Law",
      priority: "medium",
      status: "resolved",
      assignedLawyer: "Sarah Johnson",
      dateFiled: "2024-06-15",
      region: "Austin, TX",
      isAnonymous: true,
      description: "Neighbor dispute over property boundaries",
      evidence: 5,
      lastUpdated: "2024-06-30"
    },
    {
      id: "CASE-2024-004",
      title: "Employment Discrimination",
      client: "Maria Garcia",
      type: "Employment Law",
      priority: "high",
      status: "in-progress",
      assignedLawyer: "David Wilson",
      dateFiled: "2024-06-20",
      region: "Chicago, IL",
      isAnonymous: false,
      description: "Workplace discrimination and harassment case",
      evidence: 12,
      lastUpdated: "2024-07-01"
    },
    {
      id: "CASE-2024-005",
      title: "Immigration Status Appeal",
      client: "Anonymous",
      type: "Immigration Law",
      priority: "medium",
      status: "pending",
      assignedLawyer: "Unassigned",
      dateFiled: "2024-07-02",
      region: "Miami, FL",
      isAnonymous: true,
      description: "Appeal for immigration status denial",
      evidence: 3,
      lastUpdated: "2024-07-02"
    }
  ]);

  // Available lawyers for assignment
  const availableLawyers = [
    "Dr. Emily Rodriguez",
    "Michael Chen", 
    "Sarah Johnson",
    "David Wilson",
    "Jessica Brown",
    "Robert Davis"
  ];

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

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.assignedLawyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || case_.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesPriority = filterPriority === 'all' || case_.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || case_.status === filterStatus;
    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const updateCaseStatus = (caseId: string, newStatus: 'pending' | 'in-progress' | 'resolved' | 'closed') => {
    setCases(cases.map(case_ => 
      case_.id === caseId ? { ...case_, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] } : case_
    ));
  };

  const assignLawyer = (caseId: string, lawyer: string) => {
    setCases(cases.map(case_ => 
      case_.id === caseId ? { ...case_, assignedLawyer: lawyer, lastUpdated: new Date().toISOString().split('T')[0] } : case_
    ));
    setShowAssignModal(false);
  };

  const openCaseModal = (case_: Case) => {
    setSelectedCase(case_);
    setShowCaseModal(true);
  };

  const openAssignModal = (case_: Case) => {
    setSelectedCase(case_);
    setShowAssignModal(true);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading case management...</p>
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
            <div className={`${styles.navItem} ${styles.active}`}>
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
            <h1 className={styles.pageTitle}>Case Management</h1>
            <p className={styles.dateRange}>Monitor and manage all legal cases</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.notificationBadge}>
              <span className={styles.notificationIcon}>🔔</span>
              <span className={styles.notificationCount}>3</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        </header>

        {/* Case Stats */}
        <section className={styles.metricsSection}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>📋</span>
              <h3 className={styles.metricTitle}>Total Cases</h3>
            </div>
            <div className={styles.metricValue}>{cases.length}</div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>+{cases.filter(c => c.status === 'in-progress').length}</span>
              <span className={styles.changePercentage}>In Progress</span>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>⏳</span>
              <h3 className={styles.metricTitle}>Pending Cases</h3>
            </div>
            <div className={styles.metricValue}>{cases.filter(c => c.status === 'pending').length}</div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>{cases.filter(c => c.assignedLawyer === 'Unassigned').length}</span>
              <span className={styles.changePercentage}>Unassigned</span>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>🚨</span>
              <h3 className={styles.metricTitle}>High Priority</h3>
            </div>
            <div className={styles.metricValue}>{cases.filter(c => c.priority === 'critical' || c.priority === 'high').length}</div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>{cases.filter(c => c.priority === 'critical').length}</span>
              <span className={styles.changePercentage}>Critical</span>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>✅</span>
              <h3 className={styles.metricTitle}>Resolved Cases</h3>
            </div>
            <div className={styles.metricValue}>{cases.filter(c => c.status === 'resolved').length}</div>
            <div className={styles.metricChange}>
              <span className={styles.changeAmount}>{cases.filter(c => c.isAnonymous).length}</span>
              <span className={styles.changePercentage}>Anonymous</span>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className={styles.filtersSection}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search cases by ID, title, client, or lawyer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterContainer}>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={styles.filterSelect}
              title="Filter by case type"
            >
              <option value="all">All Types</option>
              <option value="family">Family Law</option>
              <option value="corporate">Corporate Law</option>
              <option value="property">Property Law</option>
              <option value="employment">Employment Law</option>
              <option value="immigration">Immigration Law</option>
              <option value="criminal">Criminal Law</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className={styles.filterSelect}
              title="Filter by priority"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.filterSelect}
              title="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </section>

        {/* Cases Table */}
        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h3 className={styles.sectionTitle}>Case Directory</h3>
            <span className={styles.resultCount}>{filteredCases.length} cases found</span>
          </div>
          
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned Lawyer</th>
                  <th>Evidence</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((case_) => (
                  <tr key={case_.id}>
                    <td className={styles.userId}>{case_.id}</td>
                    <td className={styles.caseTitle}>
                      {case_.title}
                      {case_.isAnonymous && <span className={styles.anonymousBadge}>Anonymous</span>}
                    </td>
                    <td className={styles.userName}>{case_.client}</td>
                    <td className={styles.caseType}>{case_.type}</td>
                    <td>
                      <span className={`${styles.priorityTag} ${styles[case_.priority]}`}>
                        {case_.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[case_.status.replace('-', '')]}`}>
                        {case_.status}
                      </span>
                    </td>
                    <td className={styles.assignedLawyer}>
                      {case_.assignedLawyer === 'Unassigned' ? (
                        <span className={styles.unassigned}>Unassigned</span>
                      ) : (
                        case_.assignedLawyer
                      )}
                    </td>
                    <td className={styles.evidenceCount}>{case_.evidence} files</td>
                    <td className={styles.actionButtons}>
                      <button 
                        className={styles.viewBtn}
                        onClick={() => openCaseModal(case_)}
                      >
                        View
                      </button>
                      <button 
                        className={styles.assignBtn}
                        onClick={() => openAssignModal(case_)}
                      >
                        Assign
                      </button>
                      {case_.status === 'pending' && (
                        <button 
                          className={styles.activateBtn}
                          onClick={() => updateCaseStatus(case_.id, 'in-progress')}
                        >
                          Start
                        </button>
                      )}
                      {case_.status === 'in-progress' && (
                        <button 
                          className={styles.verifyBtn}
                          onClick={() => updateCaseStatus(case_.id, 'resolved')}
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Case Details Modal */}
        {showCaseModal && selectedCase && (
          <div className={styles.modalOverlay} onClick={() => setShowCaseModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>Case Details: {selectedCase.title}</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setShowCaseModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.modalContent}>
                <div className={styles.userDetailGrid}>
                  <div className={styles.detailItem}>
                    <label>Case ID:</label>
                    <span>{selectedCase.id}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Title:</label>
                    <span>{selectedCase.title}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Client:</label>
                    <span>{selectedCase.client}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Type:</label>
                    <span>{selectedCase.type}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Priority:</label>
                    <span className={`${styles.priorityTag} ${styles[selectedCase.priority]}`}>
                      {selectedCase.priority}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Status:</label>
                    <span className={`${styles.statusBadge} ${styles[selectedCase.status.replace('-', '')]}`}>
                      {selectedCase.status}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Assigned Lawyer:</label>
                    <span>{selectedCase.assignedLawyer}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Date Filed:</label>
                    <span>{selectedCase.dateFiled}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Region:</label>
                    <span>{selectedCase.region}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Evidence Files:</label>
                    <span>{selectedCase.evidence}</span>
                  </div>
                </div>
                
                <div className={styles.descriptionSection}>
                  <label>Description:</label>
                  <p>{selectedCase.description}</p>
                </div>
                
                <div className={styles.modalActions}>
                  <button className={styles.primaryBtn}>View Evidence</button>
                  <button className={styles.secondaryBtn}>Download Summary</button>
                  <button className={styles.warningBtn}>Add Note</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assign Lawyer Modal */}
        {showAssignModal && selectedCase && (
          <div className={styles.modalOverlay} onClick={() => setShowAssignModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>Assign Lawyer: {selectedCase.title}</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setShowAssignModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.modalContent}>
                <div className={styles.assignSection}>
                  <label>Select Lawyer:</label>
                  <div className={styles.lawyerGrid}>
                    {availableLawyers.map((lawyer) => (
                      <button
                        key={lawyer}
                        className={styles.lawyerOption}
                        onClick={() => assignLawyer(selectedCase.id, lawyer)}
                      >
                        {lawyer}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 