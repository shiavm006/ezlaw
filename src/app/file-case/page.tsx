import styles from "./file-case.module.css";
import Link from "next/link";

export default function FileCasePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/dashboard" className={styles.backBtn}>← Back to Dashboard</Link>
          <h1 className={styles.title}>File a New Case</h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <div className={styles.privacyNotice}>
            <h2>Your Privacy is Protected</h2>
            <p>
              We understand that seeking legal help can be sensitive. You can file your case anonymously 
              or with your identity. All information is handled with strict confidentiality.
            </p>
          </div>

          <form className={styles.form}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Case Information</h3>
              
              <div className={styles.fieldGroup}>
                <label htmlFor="caseType" className={styles.label}>Type of Case *</label>
                <select id="caseType" name="caseType" required className={styles.select}>
                  <option value="">Select case type</option>
                  <option value="criminal">Criminal Law</option>
                  <option value="domestic">Domestic Violence</option>
                  <option value="harassment">Harassment/Bullying</option>
                  <option value="fraud">Financial Fraud</option>
                  <option value="employment">Employment Issues</option>
                  <option value="property">Property Disputes</option>
                  <option value="family">Family Law</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="title" className={styles.label}>Case Title *</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  placeholder="Brief description of your case"
                  required 
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="description" className={styles.label}>Detailed Description *</label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows={6}
                  placeholder="Please provide as much detail as possible about your situation. Include dates, locations, and people involved if relevant."
                  required 
                  className={styles.textarea}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="priority" className={styles.label}>Urgency Level *</label>
                <select id="priority" name="priority" required className={styles.select}>
                  <option value="">Select urgency</option>
                  <option value="high">High - Immediate danger or emergency</option>
                  <option value="medium">Medium - Important but not emergency</option>
                  <option value="low">Low - General legal consultation</option>
                </select>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Contact Information</h3>
              
              <div className={styles.anonymousOption}>
                <input type="checkbox" id="anonymous" name="anonymous" className={styles.checkbox} />
                <label htmlFor="anonymous" className={styles.checkboxLabel}>
                  File this case anonymously (Your identity will not be shared)
                </label>
              </div>

              <div className={styles.contactFields}>
                <div className={styles.row}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="firstName" className={styles.label}>First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      placeholder="Optional if filing anonymously"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="lastName" className={styles.label}>Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      placeholder="Optional if filing anonymously"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Required for case updates (kept confidential)"
                    className={styles.input}
                  />
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
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Additional Information</h3>
              
              <div className={styles.fieldGroup}>
                <label htmlFor="evidence" className={styles.label}>Evidence/Documents</label>
                <div className={styles.fileUpload}>
                  <input 
                    type="file" 
                    id="evidence" 
                    name="evidence" 
                    multiple 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className={styles.fileInput}
                  />
                  <label htmlFor="evidence" className={styles.fileLabel}>
                    Choose files (PDF, Word documents, Images)
                  </label>
                  <p className={styles.fileHint}>
                    Upload any relevant documents, photos, or evidence. All files are encrypted and secure.
                  </p>
                </div>
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
              </div>
            </div>

            <div className={styles.consent}>
              <input type="checkbox" id="consent" name="consent" required className={styles.checkbox} />
              <label htmlFor="consent" className={styles.checkboxLabel}>
                I consent to M. Torres reviewing my case and potentially assigning a lawyer for assistance. 
                I understand that all information will be kept confidential. *
              </label>
            </div>

            <div className={styles.submitSection}>
              <button type="submit" className={styles.submitBtn}>
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
            <h3>Need Immediate Help?</h3>
            <p>If you are in immediate danger, please contact emergency services.</p>
            <div className={styles.emergencyNumbers}>
              <p><strong>Emergency:</strong> 911</p>
              <p><strong>Crisis Hotline:</strong> 1-800-273-8255</p>
              <p><strong>Legal Aid:</strong> 1-800-LAW-HELP</p>
            </div>
          </div>

          <div className={styles.supportCard}>
            <h3>Anonymous Support</h3>
            <p>
              If you're not ready to file a case but need someone to talk to, 
              our confidential support line is available 24/7.
            </p>
            <p><strong>Support Line:</strong> 1-800-SUPPORT</p>
          </div>
        </div>
      </main>
    </div>
  );
} 