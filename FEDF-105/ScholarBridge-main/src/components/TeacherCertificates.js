// src/components/TeacherCertificates.js
import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { api, fileBaseUrl } from "../api/client";
import "./TeacherDashboard.css";

export default function TeacherCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [emails, setEmails] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "certificates"), orderBy("issuedDate", "desc"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const certs = [];
      const userIds = new Set();

      querySnapshot.forEach((docSnap) => {
        const cert = { id: docSnap.id, ...docSnap.data() };
        certs.push(cert);
        if (cert.userId) userIds.add(cert.userId);
      });

      const emailsMap = {};
      await Promise.all(
        Array.from(userIds).map(async (uid) => {
          const userDoc = await getDoc(doc(db, "users", uid));
          emailsMap[uid] = userDoc.exists() ? userDoc.data().email : "Unknown";
        })
      );

      setCertificates(certs);
      setEmails(emailsMap);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Also try backend as a fallback (current user's certificates) if Firestore has none
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await api.getCertificates();
        if (!mounted) return;
        if (list && list.length > 0 && certificates.length === 0) {
          setCertificates(list);
        }
      } catch (e) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, [certificates.length]);

  const formatDate = (issuedDate) => {
    if (!issuedDate) return "N/A";
    if (issuedDate.toDate) return issuedDate.toDate().toLocaleDateString();
    if (issuedDate.seconds) return new Date(issuedDate.seconds * 1000).toLocaleDateString();
    if (typeof issuedDate === "string") return new Date(issuedDate).toLocaleDateString();
    if (issuedDate instanceof Date) return issuedDate.toLocaleDateString();
    return "N/A";
  };

  const filteredCertificates = certificates.filter((cert) => {
    const title = cert.title || "";
    const email = emails[cert.userId] || "";
    const issuedDate = formatDate(cert.issuedDate) || "";
    const searchLower = search.toLowerCase();
    return (
      title.toLowerCase().includes(searchLower) ||
      email.toLowerCase().includes(searchLower) ||
      issuedDate.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <p>Loading certificates...</p>;

  return (
    <div className="teacher-dashboard-container">
      <h2>Student Certificates</h2>
      <input
        type="text"
        placeholder="Search by name, email, or date"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <table className="certificate-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Issued Date</th>
            <th>Email</th>
            <th>View File</th>
          </tr>
        </thead>
        <tbody>
          {filteredCertificates.map((cert) => (
            <tr key={cert.id}>
              <td>{cert.title || "N/A"}</td>
              <td>{formatDate(cert.issuedDate)}</td>
              <td>{emails[cert.userId] || "Unknown"}</td>
              <td>
                {cert.fileUrl ? (
                  <a
                    href={cert.fileUrl.startsWith("http") ? cert.fileUrl : `${fileBaseUrl}${cert.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 View
                  </a>
                ) : (
                  "No file"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
