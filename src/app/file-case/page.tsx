"use client";

import React, { useState, useRef } from "react";
import styles from "./file-case.module.css";

export default function FileCasePage() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    urgency: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleFilingType = (anonymous: boolean) => {
    setIsAnonymous(anonymous);
    if (anonymous) {
      setCaseId(`CASE-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`.toUpperCase());
    } else {
      setCaseId("");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setUploadedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Left: Form */}
        <div className={styles.formContainer}>
          <h1 className={styles.title}>File a New Case</h1>

          {/* Stepper/Progress Bar */}
          <div className={styles.progressBar}>
            <div className={styles.progressStep}>
              <div className={styles.stepNumber}>1</div>
              <span>Case Details</span>
            </div>
            <div className={styles.progressStep}>
              <div className={styles.stepNumber}>2</div>
              <span>Contact Info</span>
            </div>
            <div className={styles.progressStep}>
              <div className={styles.stepNumber}>3</div>
              <span>Review & Submit</span>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className={styles.privacyNotice}>
            <div className={styles.noticeIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <h2>Your Privacy is Protected</h2>
              <p>
                We understand that seeking legal help can be sensitive. You can file your case anonymously or with your identity. All information is handled with strict confidentiality.
              </p>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Filing Type */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Filing Type</h2>
              <div className={styles.filingOptions}>
                <label className={styles.filingOption}>
                  <input
                    type="radio"
                    name="filingType"
                    checked={!isAnonymous}
                    onChange={() => handleFilingType(false)}
                    className={styles.radioInput}
                  />
                  <div className={styles.optionContent}>
                    <div className={styles.optionTitle}>File with Account</div>
                    <div className={styles.optionDesc}>Create an account for full access to case tracking and direct communication</div>
                  </div>
                </label>
                <label className={styles.filingOption}>
                  <input
                    type="radio"
                    name="filingType"
                    checked={isAnonymous}
                    onChange={() => handleFilingType(true)}
                    className={styles.radioInput}
                  />
                  <div className={styles.optionContent}>
                    <div className={styles.optionTitle}>File Anonymously</div>
                    <div className={styles.optionDesc}>Submit your case without providing personal information</div>
                  </div>
                </label>
              </div>
              {isAnonymous && caseId && (
                <div className={styles.caseIdDisplay}>
                  <div className={styles.caseIdHeader}>Your Case ID</div>
                  <div className={styles.caseIdValue}>{caseId}</div>
                  <p className={styles.caseIdNote}>
                    Save this ID to track your case progress. You won&apos;t be able to retrieve it later.
                  </p>
                </div>
              )}
            </div>

            {/* Case Details */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Case Details</h2>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Case Title <span className={styles.required}>*</span>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="Brief description of your case"
                  />
                </label>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Type of Case <span className={styles.required}>*</span>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className={styles.select}
                  >
                    <option value="">Select type</option>
                    <option value="criminal">Criminal Law</option>
                    <option value="domestic">Domestic Violence</option>
                    <option value="harassment">Harassment/Bullying</option>
                    <option value="fraud">Financial Fraud</option>
                    <option value="employment">Employment Issues</option>
                    <option value="property">Property Disputes</option>
                    <option value="family">Family Law</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Detailed Description <span className={styles.required}>*</span>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    className={styles.textarea}
                    placeholder="Please provide as much detail as possible."
                  />
                </label>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Urgency <span className={styles.required}>*</span>
                  <select
                    name="urgency"
                    value={form.urgency}
                    onChange={handleChange}
                    required
                    className={styles.select}
                  >
                    <option value="">Select urgency</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </label>
              </div>
            </div>

            {/* File Upload (UI only) */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Evidence/Documents</h2>
              <div
                className={styles.fileUpload}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                tabIndex={0}
                role="button"
                aria-label="Upload evidence or documents"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className={styles.fileInput}
                  onChange={handleFileSelect}
                  aria-label="Upload files"
                />
                <div className={styles.fileLabel}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>Drag &amp; drop or click to browse files</span>
                  <span className={styles.fileTypes}>Accepted: PDF, DOC, JPG, PNG, TXT</span>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className={styles.fileHint}>
                    {uploadedFiles.length} file(s) selected
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info (if not anonymous) */}
            {!isAnonymous && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
                <div className={styles.row}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                      First Name <span className={styles.required}>*</span>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="Your first name"
                      />
                    </label>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                      Last Name <span className={styles.required}>*</span>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="Your last name"
                      />
                    </label>
                  </div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Email <span className={styles.required}>*</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="your.email@example.com"
                    />
                  </label>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Phone
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Optional"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Consent */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Consent</h2>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  required
                  className={styles.checkbox}
                />
                <span className={styles.checkboxContent}>
                  I consent to EzLaw reviewing my case. All information will be kept confidential.
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className={styles.submitSection}>
              <button type="submit" className={styles.submitBtn}>
                Submit Case
              </button>
              {submitted && (
                <div className={styles.successMsg}>
                  <strong>Case submitted!</strong> (This is a demo. No data is saved.)
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right: Support/Help Section */}
        <div className={styles.supportSection}>
          <div className={styles.supportCard}>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h3>Need Immediate Help?</h3>
            <p>If you are in immediate danger, please contact emergency services.</p>
            <div className={styles.emergencyNumbers}>
              <div className={styles.emergencyItem}>
                <span className={styles.emergencyLabel}>Emergency:</span>
                <span className={styles.emergencyNumber}>911</span>
              </div>
              <div className={styles.emergencyItem}>
                <span className={styles.emergencyLabel}>Crisis Hotline:</span>
                <span className={styles.emergencyNumber}>1-800-273-8255</span>
              </div>
              <div className={styles.emergencyItem}>
                <span className={styles.emergencyLabel}>Legal Aid:</span>
                <span className={styles.emergencyNumber}>1-800-LAW-HELP</span>
              </div>
            </div>
          </div>
          <div className={styles.supportCard}>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3>Anonymous Support</h3>
            <p>
              If you&apos;re not ready to file a case but need someone to talk to, our confidential support line is available 24/7.
            </p>
            <div className={styles.supportNumber}>
              <span className={styles.supportLabel}>Support Line:</span>
              <span className={styles.supportNumberValue}>1-800-SUPPORT</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 