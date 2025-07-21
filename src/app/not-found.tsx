export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16 }}>404</h1>
      <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 12 }}>Page Not Found</h2>
      <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 480, textAlign: 'center' }}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
    </div>
  );
} 