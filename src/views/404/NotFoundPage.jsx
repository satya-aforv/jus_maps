import { Link, Navigate } from 'react-router-dom';

// Simple Bootstrap-only version
export default function NotFoundPage() {
  const isUserExists = localStorage.getItem('user') || sessionStorage.getItem('user');

  if (!isUserExists) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-3">
      <h1 className="display-1 fw-bold text-danger mb-4">404</h1>
      <h2 className="h3 mb-3">Page Not Found</h2>
      <p className="lead mb-4 text-muted">We couldn't find what you're looking for.</p>
      <Link to="/" className="btn btn-primary btn-lg">
        Go Home
      </Link>
    </div>
  );
}
