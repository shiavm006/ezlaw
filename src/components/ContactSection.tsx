import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            {"CONTACT\nKNOLL &\nWALTERS"}
          </h2>
        </div>
        
        <div className={styles.right}>
          <div className={styles.addressSection}>
            <h3 className={styles.addressTitle}>OUR ADDRESS</h3>
            <div className={styles.addressInfo}>
              <p>500 Terry Francine St. San Francisco, CA 94158</p>
              <p><span className={styles.label}>Email:</span> info@mysite.com</p>
              <p><span className={styles.label}>Tel:</span> 123-456-7890</p>
              <a href="#" className={styles.findUsLink}>Click Here to Find Us</a>
            </div>
          </div>
          
          <div className={styles.formSection}>
            <p className={styles.formDescription}>
              For any general inquiries, please fill in the following contact form:
            </p>
            
            <form className={styles.form}>
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="firstName">First Name *</label>
                  <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    required 
                    className={styles.input}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="lastName">Last Name *</label>
                  <input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    required 
                    className={styles.input}
                  />
                </div>
              </div>
              
              <div className={styles.fieldGroup}>
                <label htmlFor="email">Email *</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  className={styles.input}
                />
                <div className={styles.emailHint}>
                  * Enter an email address like example@mysite.com
                </div>
              </div>
              
              <div className={styles.fieldGroup}>
                <label htmlFor="subject">Subject *</label>
                <input 
                  id="subject" 
                  name="subject" 
                  type="text" 
                  required 
                  className={styles.input}
                />
              </div>
              
              <div className={styles.fieldGroup}>
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  required 
                  className={styles.textarea}
                />
              </div>
              
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 