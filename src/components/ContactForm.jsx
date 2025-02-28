import axios from "axios";
import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    content: "",
    content_type: "plain",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/send`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Email sent successfully!");
        setFormData({ to: "", subject: "", content: "", content_type: "plain" });
      }
    } catch (err) {
      setError("Failed to send email. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="to">Recipient Email</label>
          <input
            type="email"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Message</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content_type">Content Type</label>
          <select
            id="content_type"
            name="content_type"
            value={formData.content_type}
            onChange={handleChange}
          >
            <option value="plain">Plain Text</option>
            <option value="html">HTML</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
