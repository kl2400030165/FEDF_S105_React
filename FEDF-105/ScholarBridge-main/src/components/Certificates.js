import React, { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import { api, fileBaseUrl } from "../api/client";
import "./Certificates.css";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await api.getCertificates();
        if (mounted) setCertificates(data);
      } catch (e) {
        if (mounted) setError(e.message || "Failed to load certificates");
      }
      if (mounted) setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await api.deleteCertificate(id);
      setCertificates((prev) => prev.filter((c) => (c._id || c.id) !== id));
      alert("Certificate deleted successfully.");
    } catch (error) {
      console.error("Error deleting certificate:", error);
      alert("Failed to delete certificate: " + error.message);
    }
  };

  const formatDate = (dateField) => {
    if (!dateField) return "Invalid Date";
    return new Date(dateField).toLocaleDateString();
  };

  return (
    <div className="certificate-page">
      <h2 className="certificate-title">My Certificates</h2>

      <section className="certificate-upload-box">
        <h3>Upload Certificate or File</h3>
        <FileUpload />
      </section>

      {loading ? (
        <p className="loading-text">Loading certificates...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : certificates.length === 0 ? (
        <p className="empty-text">No certificates found.</p>
      ) : (
        <ul className="certificate-list">
          {certificates.map((cert) => (
            <li key={cert._id || cert.id} className="certificate-item">
              <span>
                {cert.title || cert.name} - {formatDate(cert.issuedDate)}
              </span>
              <div className="certificate-actions">
                {cert.fileUrl && (
                  <a
                    href={`${fileBaseUrl}${cert.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-btn"
                  >
                    View
                  </a>
                )}
                <button
                  className="certificate-btn"
                  onClick={() => handleDelete(cert._id || cert.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
