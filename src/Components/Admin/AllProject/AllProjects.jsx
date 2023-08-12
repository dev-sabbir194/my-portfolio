import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import swal from "sweetalert";

import "./AllProject.css";
import EditProject from "../EditProject/EditProject";

const AllProject = () => {
  const [projects, setProjects] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "https://portfolio-server-dev-sabbir194.vercel.app/projects/"
      );
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await fetch(
        `https://portfolio-server-dev-sabbir194.vercel.app/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );
      fetchProjects(); // Fetch projects again after successful deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

const updateProject = async (updatedData) => {
  try {
    const { _id, ...data } = updatedData;

    await fetch(
      `https://portfolio-server-dev-sabbir194.vercel.app/projects/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    fetchProjects();
  } catch (error) {
    console.error("Error updating project:", error);
  }
};


  const openEditModal = (projectId) => {
    setSelectedProject(projects.find((project) => project._id === projectId));
    setEditModalOpen(true);
  };

  useEffect(() => {
    fetchProjects();
  }, []);


  return (
    <Container>
      <Row className="text-center">
        {projects.map((project) => (
          <Col id="bb" key={project._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="project-card">
              <Card.Img
                variant="top"
                className="img-fluid c-img"
                src={project.image}
                alt={project.title}
              />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <div className="icons d-flex gap-5">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => openEditModal(project._id)}
                  />
                  <FaTrash
                    className="delete-icon"
                    onClick={() => deleteProject(project._id)}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {editModalOpen && (
        <EditProject
          selectedProject={selectedProject}
          onSubmit={async (updatedData) => {
            try {
              await updateProject(updatedData);
              setEditModalOpen(false);
              swal("Success", "Project updated successfully.", "success");
            } catch (error) {
              console.error("Error updating project:", error);
              swal("Error", "Failed to update project.", "error");
            }
          }}
          onCancel={() => setEditModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default AllProject;
