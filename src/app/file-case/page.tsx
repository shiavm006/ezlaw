"use client";

import styles from "./file-case.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import FileUpload from "../../components/FileUpload";

export default function FileCasePage() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateCaseId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `CASE-${timestamp}-${random}`.toUpperCase();
  };

  const handleAnonymousToggle = () => {
    setIsAnonymous(!isAnonymous);
    if (!isAnonymous) {
      setCaseId(generateCaseId());
    } else {
      setCaseId("");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.backBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          <h1 className={styles.title}>File a New Case</h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
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

          <div className={styles.privacyNotice}>
            <div className={styles.noticeIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <h2>Your Privacy is Protected</h2>
              <p>
                We understand that seeking legal help can be sensitive. You can file your case anonymously 
                or with your identity. All information is handled with strict confidentiality.
              </p>
            </div>
          </div>

          <form className={styles.form}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Filing Options</h3>
                <p className={styles.sectionSubtitle}>Choose how you'd like to file your case</p>
              </div>
              
              <div className={styles.filingOptions}>
                <label className={styles.filingOption}>
                  <input 
                    type="radio" 
                    name="filingType" 
                    value="registered" 
                    checked={!isAnonymous}
                    onChange={() => setIsAnonymous(false)}
                    className={styles.radioInput}
                  />
                  <div className={styles.optionContent}>
                    <div className={styles.optionIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div className={styles.optionText}>
                      <div className={styles.optionTitle}>File with Account</div>
                      <div className={styles.optionDesc}>Create an account for full access to case tracking and direct communication</div>
                    </div>
                  </div>
                </label>
                
                <label className={styles.filingOption}>
                  <input 
                    type="radio" 
                    name="filingType" 
                    value="anonymous" 
                    checked={isAnonymous}
                    onChange={handleAnonymousToggle}
                    className={styles.radioInput}
                  />
                  <div className={styles.optionContent}>
                    <div className={styles.optionIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <div className={styles.optionText}>
                      <div className={styles.optionTitle}>File Anonymously</div>
                      <div className={styles.optionDesc}>Submit your case without providing personal information</div>
                    </div>
                  </div>
                </label>
              </div>

              {isClient && isAnonymous && caseId && (
                <div className={styles.caseIdDisplay}>
                  <div className={styles.caseIdHeader}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <span>Your Case ID</span>
                  </div>
                  <div className={styles.caseIdValue}>{caseId}</div>
                  <p className={styles.caseIdNote}>
                    Save this ID to track your case progress. You won't be able to retrieve it later.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Case Information</h3>
                <p className={styles.sectionSubtitle}>Tell us about your legal situation</p>
              </div>
              
              <div className={styles.fieldGroup}>
                <label htmlFor="caseType" className={styles.label}>
                  Type of Case <span className={styles.required}>*</span>
                </label>
                <div className={styles.selectWrapper}>
                  <select id="caseType" name="caseType" required className={styles.select}>
                    <option value="">Choose case type</option>
                    <option value="criminal">Criminal Law</option>
                    <option value="domestic">Domestic Violence</option>
                    <option value="harassment">Harassment/Bullying</option>
                    <option value="fraud">Financial Fraud</option>
                    <option value="employment">Employment Issues</option>
                    <option value="property">Property Disputes</option>
                    <option value="family">Family Law</option>
                    <option value="other">Other</option>
                  </select>
                  <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="title" className={styles.label}>
                  Case Title <span className={styles.required}>*</span>
                </label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  placeholder="Brief description of your case"
                  required 
                  className={styles.input}
                />
                <p className={styles.fieldHint}>Keep it concise but descriptive</p>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="description" className={styles.label}>
                  Detailed Description <span className={styles.required}>*</span>
                </label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows={6}
                  placeholder="Please provide as much detail as possible about your situation. Include dates, locations, and people involved if relevant."
                  required 
                  className={styles.textarea}
                />
                <p className={styles.fieldHint}>The more details you provide, the better we can assist you</p>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="priority" className={styles.label}>
                  Urgency Level <span className={styles.required}>*</span>
                </label>
                <div className={styles.priorityOptions}>
                  <label className={styles.priorityOption}>
                    <input type="radio" name="priority" value="high" required />
                    <div className={styles.priorityContent}>
                      <div className={styles.priorityTitle}>High Priority</div>
                      <div className={styles.priorityDesc}>Immediate danger or emergency</div>
                    </div>
                  </label>
                  <label className={styles.priorityOption}>
                    <input type="radio" name="priority" value="medium" required />
                    <div className={styles.priorityContent}>
                      <div className={styles.priorityTitle}>Medium Priority</div>
                      <div className={styles.priorityDesc}>Important but not emergency</div>
                    </div>
                  </label>
                  <label className={styles.priorityOption}>
                    <input type="radio" name="priority" value="low" required />
                    <div className={styles.priorityContent}>
                      <div className={styles.priorityTitle}>Low Priority</div>
                      <div className={styles.priorityDesc}>General legal consultation</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {!isAnonymous && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Contact Information</h3>
                  <p className={styles.sectionSubtitle}>How should we reach you?</p>
                </div>
                
                <div className={styles.contactFields}>
                  <div className={styles.row}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="firstName" className={styles.label}>
                        First Name <span className={styles.required}>*</span>
                      </label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        placeholder="Your first name"
                        required 
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="lastName" className={styles.label}>
                        Last Name <span className={styles.required}>*</span>
                      </label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        placeholder="Your last name"
                        required 
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address <span className={styles.required}>*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="your.email@example.com"
                      required 
                      className={styles.input}
                    />
                    <p className={styles.fieldHint}>We'll send you updates about your case</p>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="Optional - for urgent contact only"
                      className={styles.input}
                    />
                    <p className={styles.fieldHint}>Only used for urgent matters</p>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Additional Information</h3>
                <p className={styles.sectionSubtitle}>Help us understand your case better</p>
              </div>
              
              <div className={styles.fieldGroup}>
                <label htmlFor="evidence" className={styles.label}>Evidence/Documents</label>
                <FileUpload 
                  onFilesChange={setUploadedFiles}
                  maxFiles={10}
                  maxFileSize={50}
                  acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt']}
                />
                <p className={styles.fieldHint}>
                  Upload any relevant documents, photos, or evidence. All files are encrypted and secure.
                </p>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="previousAction" className={styles.label}>Previous Legal Action</label>
                <textarea 
                  id="previousAction" 
                  name="previousAction" 
                  rows={3}
                  placeholder="Have you taken any previous legal action regarding this matter? If yes, please describe."
                  className={styles.textarea}
                />
                <p className={styles.fieldHint}>This helps us understand your case history</p>
              </div>
            </div>

            <div className={styles.consent}>
              <input type="checkbox" id="consent" name="consent" required className={styles.checkbox} />
              <label htmlFor="consent" className={styles.checkboxLabel}>
                <div className={styles.checkboxContent}>
                  <div className={styles.checkboxTitle}>
                    I consent to EzLaw reviewing my case <span className={styles.required}>*</span>
                  </div>
                  <div className={styles.checkboxDesc}>
                    I understand that all information will be kept confidential and I may be assigned a lawyer for assistance.
                  </div>
                </div>
              </label>
            </div>

            <div className={styles.submitSection}>
              <button type="submit" className={styles.submitBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
                Submit Case
              </button>
              <p className={styles.submitNote}>
                Your case will be reviewed within 24 hours. You will receive a confirmation email 
                with your case number shortly.
              </p>
            </div>
          </form>
        </div>

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
              If you're not ready to file a case but need someone to talk to, 
              our confidential support line is available 24/7.
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