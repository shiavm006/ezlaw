import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Contact</h2>
          <p className={styles.subtitle}>
            Get in touch for confidential legal assistance.
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email</span>
              <a href="mailto:info@ezaw.com" className={styles.value}>info@ezaw.com</a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Phone</span>
              <a href="tel:123-456-7890" className={styles.value}>123-456-7890</a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Address</span>
              <span className={styles.value}>500 Terry Francine St.<br />San Francisco, CA 94158</span>
            </div>
          </div>
          
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={styles.row}>
                <input 
                  name="firstName" 
                  type="text" 
                  placeholder="First Name"
                  required 
                  className={styles.input}
                />
                <input 
                  name="lastName" 
                  type="text" 
                  placeholder="Last Name"
                  required 
                  className={styles.input}
                />
              </div>
              
              <input 
                name="email" 
                type="email" 
                placeholder="Email"
                required 
                className={styles.input}
              />
              
              <input 
                name="subject" 
                type="text" 
                placeholder="Subject"
                required 
                className={styles.input}
              />
              
              <textarea 
                name="message" 
                placeholder="Message"
                rows={4} 
                required 
                className={styles.textarea}
              />
              
              <button type="submit" className={styles.submitBtn}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 