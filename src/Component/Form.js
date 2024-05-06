import React, { useState } from 'react';
import './form.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';


function Form () {
  // State variables for form fields, submitted data, and edit index FirstName, LastName, Email, Phone, Address, City, Education(M)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    education: ''
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // If editIndex is set, update the corresponding item in submittedData
      const updatedData = [...submittedData];
      updatedData[editIndex] = formData;
      setSubmittedData(updatedData);
      setEditIndex(null); // Reset editIndex
    } else {
      // Otherwise, add a new item to submittedData
      setSubmittedData([...submittedData, formData]);
    }
    // Clear the form fields
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      education: ''
    });
  };

  // Function to handle item deletion
  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  };

  // Function to handle edit button click
  const handleEdit = (index) => {
    const editItem = submittedData[index];
    // Populate form fields with data of the item being edited
    setFormData(editItem);
    setEditIndex(index); // Set editIndex to indicate an item is being edited
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <center>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                placeholder='First Name'
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                placeholder='Last Name'
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                placeholder='Email'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                placeholder='Phone'
                type="tel"
                name="phone"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className='form-group'>
            <input
                placeholder='Address'
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                placeholder='City'
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                placeholder='Education Field'
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="form-input"
                required
              />
              <button type="submit">{editIndex !== null ? 'Update' : 'Save'}</button>
              </div>
               
          </form>
          {/* Display submitted data */}
          <div className="submitted-data">
            <h2>Student Details</h2>
            <table>
              <thead>
                <tr>
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
                    <td>{data.firstname}&nbsp;{data.lastname}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>{data.city}</td>
                    <td>{data.address}</td>
                    <td>{data.education}</td>
                    <td>
                      <FontAwesomeIcon icon={faPencilAlt}  onClick={() => handleEdit(index)}/>
                      
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faTimes} onClick={() => handleDelete(index)} />
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </center>
    </>
  );
};

export default Form;