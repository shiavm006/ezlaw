"use client";

import styles from "./cases.module.css";
import { useState, useEffect } from "react";

interface Case {
  id: string;
  title: string;
  client: string;
  type: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'assigned' | 'in-progress' | 'review' | 'resolved' | 'closed';
  assignedLawyer?: string;
  filedDate: string;
  lastUpdated: string;
  location: string;
  description: string;
  evidenceCount: number;
  isAnonymous: boolean;
}



export default function CasesManagement() {
  const [cases, setCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const mockCases: Case[] = [
        {
          id: "CASE-2024-001",
          title: "Emergency Custody Case",
          client: "Sarah Johnson",
          type: "Family Law",
          priority: "critical",
          status: "assigned",
          assignedLawyer: "Michael Chen",
          filedDate: "2024-01-15",
          lastUpdated: "2024-01-19",
          location: "Los Angeles, CA",
          description: "Emergency custody case involving domestic violence allegations.",
          evidenceCount: 5,
          isAnonymous: false
        },
        {
          id: "CASE-2024-002",
          title: "Corporate Fraud Investigation",
          client: "TechCorp Inc.",
          type: "Corporate Law",
          priority: "high",
          status: "in-progress",
          assignedLawyer: "Emily Rodriguez",
          filedDate: "2024-01-10",
          lastUpdated: "2024-01-18",
          location: "San Francisco, CA",
          description: "Complex corporate fraud case involving multiple parties.",
          evidenceCount: 12,
          isAnonymous: false
        },
        {
          id: "CASE-2024-003",
          title: "Property Dispute Resolution",
          client: "Anonymous",
          type: "Property Law",
          priority: "medium",
          status: "pending",
          filedDate: "2024-01-17",
          lastUpdated: "2024-01-17",
          location: "Austin, TX",
          description: "Property boundary dispute between neighbors.",
          evidenceCount: 3,
          isAnonymous: true
        },
        {
          id: "CASE-2024-004",
          title: "Employment Discrimination",
          client: "David Kim",
          type: "Employment Law",
          priority: "high",
          status: "review",
          assignedLawyer: "Sarah Wilson",
          filedDate: "2024-01-12",
          lastUpdated: "2024-01-19",
          location: "New York, NY",
          description: "Employment discrimination case with multiple witnesses.",
          evidenceCount: 8,
          isAnonymous: false
        },
        {
          id: "CASE-2024-005",
          title: "Criminal Defense",
          client: "Anonymous",
          type: "Criminal Law",
          priority: "critical",
          status: "assigned",
          assignedLawyer: "James Thompson",
          filedDate: "2024-01-16",
          lastUpdated: "2024-01-19",
          location: "Chicago, IL",
          description: "Serious criminal charges requiring immediate attention.",
          evidenceCount: 15,
          isAnonymous: true
        }
      ];

              setCases(mockCases);
        setFilteredCases(mockCases);
        setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = cases;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(case_ =>
        case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.client.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(case_ => case_.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(case_ => case_.priority === priorityFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(case_ => case_.type === typeFilter);
    }

    setFilteredCases(filtered);
  }, [cases, searchTerm, statusFilter, priorityFilter, typeFilter]);

  const handleStatusChange = (caseId: string, newStatus: Case['status']) => {
    setCases(prev => prev.map(case_ => 
      case_.id === caseId ? { ...case_, status: newStatus } : case_
    ));
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return styles.pending;
      case 'assigned': return styles.assigned;
      case 'in-progress': return styles.inProgress;
      case 'review': return styles.review;
      case 'resolved': return styles.resolved;
      case 'closed': return styles.closed;
      default: return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return styles.low;
      case 'medium': return styles.medium;
      case 'high': return styles.high;
      case 'critical': return styles.critical;
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading cases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Case Management</h1>
          <p className={styles.subtitle}>Manage and track all legal cases</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.exportBtn}>Export Data</button>
        </div>
      </header>

      {/* Filters and Search */}
      <section className={styles.filtersSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search cases by ID, title, or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
            aria-label="Filter by status"
            title="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Under Review</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={styles.filterSelect}
            aria-label="Filter by priority"
            title="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={styles.filterSelect}
            aria-label="Filter by case type"
            title="Filter by case type"
          >
            <option value="all">All Types</option>
            <option value="Family Law">Family Law</option>
            <option value="Corporate Law">Corporate Law</option>
            <option value="Property Law">Property Law</option>
            <option value="Employment Law">Employment Law</option>
            <option value="Criminal Law">Criminal Law</option>
          </select>
        </div>
      </section>

      {/* Cases List */}
      <section className={styles.casesSection}>
        <div className={styles.casesHeader}>
          <h2>Cases ({filteredCases.length})</h2>
          <div className={styles.casesStats}>
            <span>Pending: {filteredCases.filter(c => c.status === 'pending').length}</span>
            <span>In Progress: {filteredCases.filter(c => c.status === 'in-progress').length}</span>
            <span>Resolved: {filteredCases.filter(c => c.status === 'resolved').length}</span>
          </div>
        </div>

        <div className={styles.casesList}>
          {filteredCases.map((case_) => (
            <div key={case_.id} className={styles.caseCard}>
              <div className={styles.caseHeader}>
                <div className={styles.caseId}>{case_.id}</div>
                <div className={styles.caseActions}>
                  <span className={`${styles.statusTag} ${getStatusColor(case_.status)}`}>
                    {case_.status.replace('-', ' ')}
                  </span>
                  <span className={`${styles.priorityTag} ${getPriorityColor(case_.priority)}`}>
                    {case_.priority}
                  </span>
                </div>
              </div>

              <div className={styles.caseContent}>
                <h3 className={styles.caseTitle}>{case_.title}</h3>
                <p className={styles.caseDescription}>{case_.description}</p>
                
                <div className={styles.caseDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Client:</span>
                    <span className={styles.detailValue}>
                      {case_.isAnonymous ? 'Anonymous' : case_.client}
                    </span>
                  </div>
                  
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Type:</span>
                    <span className={styles.detailValue}>{case_.type}</span>
                  </div>
                  
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Location:</span>
                    <span className={styles.detailValue}>{case_.location}</span>
                  </div>
                  
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Filed:</span>
                    <span className={styles.detailValue}>{formatDate(case_.filedDate)}</span>
                  </div>
                  
                  {case_.assignedLawyer && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Lawyer:</span>
                      <span className={styles.detailValue}>{case_.assignedLawyer}</span>
                    </div>
                  )}
                  
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Evidence:</span>
                    <span className={styles.detailValue}>{case_.evidenceCount} files</span>
                  </div>
                </div>
              </div>

                             <div className={styles.caseActions}>
                 <select
                   value={case_.status}
                   onChange={(e) => handleStatusChange(case_.id, e.target.value as Case['status'])}
                   className={styles.statusSelect}
                   aria-label={`Change status for case ${case_.id}`}
                   title={`Change status for case ${case_.id}`}
                 >
                   <option value="pending">Pending</option>
                   <option value="assigned">Assigned</option>
                   <option value="in-progress">In Progress</option>
                   <option value="review">Under Review</option>
                   <option value="resolved">Resolved</option>
                   <option value="closed">Closed</option>
                 </select>
                 
                 <button className={styles.viewBtn}>View Details</button>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 