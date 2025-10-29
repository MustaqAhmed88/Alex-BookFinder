import { useState } from "react";
import SearchBar from "./searchbar";
import MapView from "./mapview";

export default function BookFinder() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authorFilter, setAuthorFilter] = useState("");
  const [isbnFilter, setIsbnFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [error, setError] = useState("");

  // 🔹 Handle book search
  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);

    try {
      setError("");
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      const results = data.docs.slice(0, 40);
      setBooks(results);
      setFilteredBooks(results);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Something went wrong while fetching books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Apply filters (Author + ISBN)
  const applyFilters = (booksData, author, isbn) => {
    let filtered = [...booksData];

    if (author) {
      filtered = filtered.filter(
        (b) =>
          b.author_name &&
          b.author_name.some((a) =>
            a.toLowerCase().includes(author.toLowerCase())
          )
      );
    }

    if (isbn) {
      filtered = filtered.filter(
        (b) =>
          b.isbn &&
          b.isbn.some((num) =>
            num.toLowerCase().includes(isbn.toLowerCase())
          )
      );
    }

    return filtered;
  };

  // 🔹 Author filter change
  const handleAuthorFilter = (e) => {
    const value = e.target.value;
    setAuthorFilter(value);
    const filtered = applyFilters(books, value, isbnFilter);
    setFilteredBooks(filtered);
  };

  // 🔹 ISBN filter change
  const handleIsbnFilter = (e) => {
    const value = e.target.value;
    setIsbnFilter(value);
    const filtered = applyFilters(books, authorFilter, value);
    setFilteredBooks(filtered);
  };

  // 🔹 Sort change
  const handleSort = (e) => {
    const sortType = e.target.value;
    setSortBy(sortType);

    let sortedBooks = [...filteredBooks];
    if (sortType === "title") {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "year") {
      sortedBooks.sort(
        (a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0)
      );
    }

    setFilteredBooks(sortedBooks);
  };

  // 🔹 Reset Filters
  const handleReset = () => {
    setAuthorFilter("");
    setIsbnFilter("");
    setSortBy("");
    setFilteredBooks(books);
  };

  return (
    <div
      className="py-5"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1740&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* 🔹 Search Bar Section */}
      <div className="container bg-light bg-opacity-75 p-4 rounded-3 shadow-lg">
        <div className="d-flex justify-content-center align-items-center">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* 🔹 Filters Section */}
      {books.length > 0 && (
        <div className="container bg-light bg-opacity-75 p-3 mt-3 rounded-3 shadow-sm">
          <div className="row g-3 align-items-center">
            {/* Author Filter */}
            <div className="col-md-4">
              <label className="fw-semibold me-2">Filter by Author:</label>
              <input
                type="text"
                placeholder="Enter author name..."
                value={authorFilter}
                onChange={handleAuthorFilter}
                className="form-control"
              />
            </div>

            {/* ISBN Filter */}
            <div className="col-md-4">
              <label className="fw-semibold me-2">Filter by ISBN:</label>
              <input
                type="text"
                placeholder="Enter ISBN..."
                value={isbnFilter}
                onChange={handleIsbnFilter}
                className="form-control"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="col-md-4">
              <label className="fw-semibold me-2">Sort by:</label>
              <select
                className="form-select"
                value={sortBy}
                onChange={handleSort}
              >
                <option value="">Select</option>
                <option value="title">Title (A–Z)</option>
                <option value="year">Year (Oldest–Newest)</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <div className="text-end mt-3">
            <button className="btn btn-outline-secondary" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Error Message */}
      {error && (
        <div className="container mt-3">
          <p className="text-danger text-center">{error}</p>
        </div>
      )}

      {/* 🔹 Books List */}
      <div className="container bg-light bg-opacity-75 p-4 mt-4 rounded-3 shadow-lg">
        {loading && <p className="text-center mt-3">Loading...</p>}

        <div className="row mt-4">
          {filteredBooks.map((book, index) => (
            <div className="col-sm-6 col-md-3 mb-4" key={index}>
              <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 shadow-sm hover-shadow transition">
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      className="card-img-top"
                      alt={book.title}
                    />
                  ) : (
                    <div
                      className="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center"
                      style={{ height: "200px" }}
                    >
                      No Image
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title text-primary">{book.title}</h5>
                    <p className="card-text mb-1">
                      {book.author_name
                        ? book.author_name.join(", ")
                        : "Unknown Author"}
                    </p>
                    <p className="text-muted mb-0">
                      {book.first_publish_year
                        ? `Published: ${book.first_publish_year}`
                        : ""}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}

          {!loading && filteredBooks.length === 0 && (
            <p className="text-center mt-4 text-muted">
              No books found — try another search or filter 📚
            </p>
          )}
        </div>
      </div>

      {/* 🔹 Map Section */}
      <div className="container bg-light bg-opacity-75 p-4 mt-4 rounded-3 shadow-lg">
        <h4 className="text-center mb-3 text-primary">Library Map</h4>
        <MapView />
      </div>
    </div>
  );
}
