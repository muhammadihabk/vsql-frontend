import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Landing Page</h1>
      <Link to="/build">
        <p style={{ textAlign: 'center' }}>Start building</p>
      </Link>
    </div>
  );
}

export default LandingPage;
