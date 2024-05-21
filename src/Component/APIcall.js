import React, { useState, useEffect } from 'react';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
  fetch('http://192.168.254.34:44397/api/Student/GetStudents')
    .then(response =>  response.json())
    .then(data => {
      console.log("Fetched Data",data);
      setStudents(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);


  return (
    <div>
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>City</th>
            <th>Address</th>
            <th>Education</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>
              <td>{student.city}</td>
              <td>{student.address}</td>
              <td>{student.education}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;