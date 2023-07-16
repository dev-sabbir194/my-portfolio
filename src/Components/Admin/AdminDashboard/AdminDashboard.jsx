import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./AdminDashboard.css";
import AddProject from "../AddProject/AddProject";
import AllProject from "../AllProject/AllProjects";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("AdminHome");

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleLogout = () => {
    // Perform logout actions here
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "AllProjects":
        return <AllProjects />;
      case "AddNewProject":
        return <AddNewProject />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Container fluid>
        <Row>
          <Col md={3} className="sidebar">
            <h2>Admin Dashboard</h2>
            <ul className="nav flex-column">
              <li
                className={`nav-item ${
                  activeComponent === "AdminHome" ? "active" : ""
                }`}
              >
                <Button
                  className="nav-link"
                  onClick={() => handleComponentChange("AdminHome")}
                >
                  Admin Home
                </Button>
              </li>
              <li
                className={`nav-item ${
                  activeComponent === "AllProjects" ? "active" : ""
                }`}
              >
                <Button
                  className="nav-link"
                  onClick={() => handleComponentChange("AllProjects")}
                >
                  All Projects
                </Button>
              </li>
              <li
                className={`nav-item ${
                  activeComponent === "AddNewProject" ? "active" : ""
                }`}
              >
                <Button
                  className="nav-link"
                  onClick={() => handleComponentChange("AddNewProject")}
                >
                  Add New Project
                </Button>
              </li>
            </ul>
            <Button className="logout-button" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
          <Col md={9} className="main-content">
            {renderComponent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const AdminHome = () => {
  return (
    <div className="admin-home">
      <h1>Welcome to Admin Home</h1>
    </div>
  );
};

const AllProjects = () => {
  return (
    <div className="all-projects">
      <h1>All Projects</h1>
      <AllProject></AllProject>
    </div>
  );
};

const AddNewProject = () => {
  return (
    <div className="add-new-project">
      <h1>Add New Project</h1>
      <AddProject></AddProject>
    </div>
  );
};

export default AdminDashboard;
