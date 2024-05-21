import axios from "axios";
import "./Form.css";
import React, { useState, useEffect } from "react";

axios.defaults.baseURL = "http://192.168.254.33:44362/";

function CForm() {
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    location: "",
    contact: "",
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/College/GetCollege");
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, img: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      name: formData.name,
      location: formData.location,
      contact: formData.contact,
      img: formData.img || null,
    };

    try {
      await submitData(newData);
      setSubmissionStatus("Submitted Data Sucessfully");
      clearForm();
    } catch (error) {
      console.error("Error submitting data:", error);
      setSubmissionStatus("Error Submitting Data");
      alert("Error submitting data");
    }
  };

  const submitData = async (newData) => {
    try {
      const formData = new FormData();
      formData.append("name", newData.name);
      formData.append("location", newData.location);
      formData.append("contact", newData.contact);
      formData.append("img", newData.img);

      const response = await axios.post("/api/College", formData);
      setSubmittedData([...submittedData, response.data]);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  };

  const clearForm = () => {
    setFormData({
      img: "",
      name: "",
      location: "",
      contact: "",
    });
  };
  
  const handleCancel = () => {
    clearForm();
  };
  

  return (
    <center>
      <div className="form-container">
        <h1>College Form</h1>
        <form>
          <div className="form-group">
            <input
              type="file"
              accept="image/*"
              name="img"
              onChange={handlePictureChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              placeholder="Location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              placeholder="Contact"
              type="tel"
              name="contact"
              maxLength={10}
              value={formData.contact}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <button onClick={handleSubmit}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </center>
  );
}

export default CForm;
