import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EmailsPage.css";

const EmailsPage = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/emails`,
          {
            headers: {
              "X-API-KEY": import.meta.env.VITE_API_KEY,
            },
          }
        );
        setEmails(response.data);
      } catch (err) {
        setError("Failed to fetch emails. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return <p className="loading">Loading emails...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="emails-page">
      <h2>All Emails</h2>
      {emails.length === 0 ? (
        <p className="no-emails">No emails found.</p>
      ) : (
        <div className="table-container">
          <table className="emails-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Recipient</th>
                <th>Subject</th>
                <th>Content</th>
                <th>Type</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email.id}>
                  <td data-label="ID">{email.id}</td>
                  <td data-label="Recipient">{email.recipient}</td>
                  <td data-label="Subject">{email.subject}</td>
                  <td data-label="Content">{email.content}</td>
                  <td data-label="Type">{email.content_type}</td>
                  <td data-label="Timestamp">{email.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmailsPage;