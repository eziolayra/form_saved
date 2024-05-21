import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes, faSave, faBan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.254.33:44362/";

const StudentDetails = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

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

  useEffect(() => {
    fetchStudents();
    fetchColleges();
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData({ ...submittedData[index] });
  };

  const handleDelete = async (index) => {
    try {
      const id = submittedData[index].id;
      await axios.delete(`api/Student/${id}`);
      setSubmittedData(submittedData.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleUpdate = async (index) => {
    try {
      const id = submittedData[index].id;
      await axios.put(`api/Student/${id}`, editData);
      const updatedData = [...submittedData];
      updatedData[index] = editData;
      setSubmittedData(updatedData);
      setEditingIndex(null);
      setEditData({});
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <center>
      <div className="submitted-data">
        <h2>Student Details</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>City</th>
              <th>Address</th>
              <th>Education</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                {editingIndex === index ? (
                  <>
                    <td>{data.id}</td>
                    <td>
                      <input
                        type="text"
                        name="firstName"
                        value={editData.firstName}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={editData.lastName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="city"
                        value={editData.city}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="address"
                        value={editData.address}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="education"
                        value={editData.education}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faSave}
                        onClick={() => handleUpdate(index)}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faBan}
                        onClick={handleCancel}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{data.id}</td>
                    <td>{data.firstName} {data.lastName}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>{data.city}</td>
                    <td>{data.address}</td>
                    <td>{data.education}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        onClick={() => handleEdit(index)}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => handleDelete(index)}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </center>
  );
};

export default StudentDetails;