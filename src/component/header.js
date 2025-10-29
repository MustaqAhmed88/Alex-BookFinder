import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="container-fluid bg-dark text-white py-3 position-relative shadow-sm">
      <h1 className="text-center m-0 fw-bold">🕮 Alex’s Book Finder</h1>
      <div className="position-absolute top-0 end-0 d-flex align-items-center h-100 pe-4">
        <Link to="/" className="btn btn-link text-white text-decoration-none me-3">
          Home
        </Link>
        <Link to="/about" className="btn btn-outline-light">
          About
        </Link>
      </div>
    </header>
  );
}
