import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTimes,
  faSave,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.254.33:44362/";

const CollegeDetails = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchColleges = async () => {
    try {
      const response = await axios.get("api/College/GetCollege");
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData({ ...submittedData[index] });
  };

  const handleDelete = async (index) => {
    try {
      const id = submittedData[index].id;
      await axios.delete(`api/College/id?id=${id}`);
      setSubmittedData(submittedData.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting college:", error);
    }
  };

  const handleUpdate = async (index) => {
    try {
      const id = submittedData[index].id;
      const url = `api/College/${id}`;

      // Ensure editData is in the correct format
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("location", editData.location);
      formData.append("contact", editData.contact);
      formData.append("img", editData.img || null);

      // Send the PUT request with proper headers and data
      await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the state with the edited data
      const updatedData = [...submittedData];
      updatedData[index] = { ...editData, id };
      setSubmittedData(updatedData);
      setEditingIndex(null);
      setEditData({});
    } catch (error) {
      console.error("Error updating college:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData({});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditData({ ...editData, img: file });
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <center>
      <div className="submitted-data">
        <h2>College Details</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={data.id}>
                {editingIndex === index ? (
                  <>
                    <td>{data.id}</td>
                    <td>
                      <input
                        type="file"
                        accept="image/*"
                        name="img"
                        onChange={handleImageChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="location"
                        value={editData.location}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="contact"
                        value={editData.contact}
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
                      <FontAwesomeIcon icon={faBan} onClick={handleCancel} />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{data.id}</td>
                    <td>
                      {data.imagePath && (
                        <img
                          src={`${axios.defaults.baseURL}${data.imagePath}`}
                          alt="College"
                        />
                      )}
                    </td>
                    <td>{data.name}</td>
                    <td>{data.location}</td>
                    <td>{data.contact}</td>
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

export default CollegeDetails;
