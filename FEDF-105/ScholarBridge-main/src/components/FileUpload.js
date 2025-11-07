import React, { useState, useRef } from "react";
import { api, fileBaseUrl } from "../api/client";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setDownloadURL("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    setUploading(true);
    setDownloadURL("");
    try {
      const resp = await api.uploadCertificate({ file, title: file.name });
      // resp.fileUrl is relative (e.g., /uploads/xyz)
      const absolute = `${fileBaseUrl}${resp.fileUrl}`;
      setDownloadURL(absolute);
      alert("Upload successful!");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed: " + error.message);
    }
    setUploading(false);
  };

  return (
    <div style={{ maxWidth: 360, margin: "20px auto" }}>
      <input type="file" onChange={handleFileChange} ref={fileInputRef} disabled={uploading} />
      <button onClick={handleUpload} disabled={uploading} style={{ marginTop: 12 }}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {downloadURL && (
        <div style={{ marginTop: 16 }}>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            View Uploaded File
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
