import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="error-page-section">
      <div className="error-page-container">
        <h1 className="error-page-title">ERROR 401</h1>
        <button className="error-page-btn">
          <Link to="/">Voltar</Link>
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
