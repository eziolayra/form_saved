import React, { useState, useEffect } from "react";
import "./Form.css";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.254.28:44362/";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    education: "",
    collegeId: "",
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("api/Student/GetStudents");
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchColleges = async () => {
    try {
      const response = await axios.get("api/College/GetCollege");
      setCollegeOptions(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = { ...formData };

    try {
      await submitData(newData);
      clearForm();
      setSubmissionStatus("Submitted Data Sucessfully");
    } catch (error) {
      console.error("Error Submitting Data:", error);
      setSubmissionStatus("Error Submitting Data");
    }
  };

  const submitData = async (newData) => {
    try {
      const response = await axios.post("api/Student", newData);
      setSubmittedData([...submittedData, response.data]);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      education: "",
      collegeId: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCollegeChange = (e) => {
    setFormData({ ...formData, collegeId: e.target.value });
  };

  const handleCancel = () => {
    clearForm();
  };

  useEffect(() => {
    fetchStudents();
    fetchColleges();
  }, []);

  return (
    <center>
      <div className="form-container">
        <h1>Student Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              placeholder="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              placeholder="Phone"
              type="tel"
              name="phone"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              placeholder="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              placeholder="Education Field"
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="form-input"
              required
            />
            <select value={formData.collegeId} onChange={handleCollegeChange}>
              <option value="" disabled>
                select college
              </option>
              {collegeOptions.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
        {submissionStatus && <p>{submissionStatus}</p>}
      </div>
    </center>
  );
}

export default Form;