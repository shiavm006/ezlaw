import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            Get in touch for confidential legal assistance. We're here to help you navigate your legal challenges with discretion and care.
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <div className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>Get in Touch</h2>
              <p className={styles.sectionDesc}>
                Reach out to us through any of these channels. All communications are kept strictly confidential.
              </p>
              
              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <div className={styles.itemIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className={styles.itemContent}>
                    <span className={styles.itemLabel}>Email</span>
                    <a href="mailto:info@ezaw.com" className={styles.itemValue}>info@ezaw.com</a>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.itemIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className={styles.itemContent}>
                    <span className={styles.itemLabel}>Phone</span>
                    <a href="tel:123-456-7890" className={styles.itemValue}>123-456-7890</a>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.itemIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className={styles.itemContent}>
                    <span className={styles.itemLabel}>Address</span>
                    <span className={styles.itemValue}>
                      500 Terry Francine St.<br />
                      San Francisco, CA 94158
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.supportSection}>
              <h2 className={styles.sectionTitle}>Emergency Support</h2>
              <p className={styles.sectionDesc}>
                If you're in immediate danger or need urgent assistance, please contact these resources.
              </p>
              
              <div className={styles.emergencyItems}>
                <div className={styles.emergencyItem}>
                  <div className={styles.emergencyIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className={styles.emergencyContent}>
                    <span className={styles.emergencyLabel}>Emergency:</span>
                    <span className={styles.emergencyNumber}>911</span>
                  </div>
                </div>
                
                <div className={styles.emergencyItem}>
                  <div className={styles.emergencyIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div className={styles.emergencyContent}>
                    <span className={styles.emergencyLabel}>Crisis Hotline:</span>
                    <span className={styles.emergencyNumber}>1-800-273-8255</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Send us a Message</h2>
              <p className={styles.formDesc}>
                Fill out the form below and we'll get back to you as soon as possible. All information is kept confidential.
              </p>
            </div>
            
            <form className={styles.form}>
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="firstName" className={styles.label}>
                    First Name <span className={styles.required}>*</span>
                  </label>
                  <input 
                    id="firstName"
                    name="firstName" 
                    type="text" 
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
                    id="lastName"
                    name="lastName" 
                    type="text" 
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
                  id="email"
                  name="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  required 
                  className={styles.input}
                />
              </div>
              
              <div className={styles.fieldGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject <span className={styles.required}>*</span>
                </label>
                <input 
                  id="subject"
                  name="subject" 
                  type="text" 
                  placeholder="What is this regarding?"
                  required 
                  className={styles.input}
                />
              </div>
              
              <div className={styles.fieldGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea 
                  id="message"
                  name="message" 
                  placeholder="Tell us about your situation..."
                  rows={6} 
                  required 
                  className={styles.textarea}
                />
              </div>
              
              <div className={styles.submitSection}>
                <button type="submit" className={styles.submitBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                  Send Message
                </button>
                <p className={styles.submitNote}>
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 