import React, { useState } from 'react';
import CollegeDetails from './CollegeDetails';
import Form from './StudentForm';
import CForm from './CollegeForm';
import './Form.css'
import StudentDetails from './StudentDetails';

const Nav = () => {
  const STUDENT_FORM = 'StudentForm';
  const COLLEGE_FORM = 'CollegeForm';
  const STUDENT_DETAIL = "StudentDetails";
  const COLLEGE_DETAIL = "CollegeDetails";
  
  const [activeTab, setActiveTab] = useState(STUDENT_FORM);

  const renderComponent = () => {
    switch (activeTab) {
      case STUDENT_FORM:
        return <Form />;
      case COLLEGE_FORM:
        return <CForm />;
      case STUDENT_DETAIL:
        return <StudentDetails />;
      case COLLEGE_DETAIL:
        return <CollegeDetails />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="buttonContainer">
        <button
          className={`tab ${activeTab === STUDENT_FORM ? "activeTab" : ""}`}
          onClick={() => setActiveTab(STUDENT_FORM)}
        >
          Student Form
        </button>
        <button
          className={`tab ${activeTab === COLLEGE_FORM ? "activeTab" : ""}`}
          onClick={() => setActiveTab(COLLEGE_FORM)}
        >
          College Form
        </button>
        <button
          className={`tab ${activeTab === STUDENT_DETAIL ? "activeTab" : ""}`}
          onClick={() => setActiveTab(STUDENT_DETAIL)}
        >
          Student Details
        </button>
        <button
          className={`tab ${activeTab === COLLEGE_DETAIL ? "activeTab" : ""}`}
          onClick={() => setActiveTab(COLLEGE_DETAIL)}
        >
          College Details
        </button>
      </div>
      {renderComponent()}
    </div>
  );
};

export default Nav;