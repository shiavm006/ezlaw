import styles from "./ServicesSection.module.css";

const services = [
  {
    title: "Mediation",
    subtitle: "Conflict Resolution",
    img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NZWRpYXRpb248L3RleHQ+PC9zdmc+",
  },
  {
    title: "Consultation",
    subtitle: "Expert Advice",
    img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Db25zdWx0YXRpb248L3RleHQ+PC9zdmc+",
  },
  {
    title: "Support",
    subtitle: "Guidance and Care",
    img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TdXBwb3J0PC90ZXh0Pjwvc3ZnPg==",
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.servicesSection} id="services">
      <h2 className={styles.heading}>Our Services</h2>
      <div className={styles.cards}>
        {services.map((service) => (
          <div className={styles.card} key={service.title}>
            <img src={service.img} alt={service.title} className={styles.cardImg} />
            <div className={styles.cardTitle}>{service.title}</div>
            <div className={styles.cardSubtitle}>{service.subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 