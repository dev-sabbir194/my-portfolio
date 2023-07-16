import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import swal from "sweetalert";
const EditProject = ({ selectedProject, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(
    selectedProject ? selectedProject.title : ""
  );
  const [type, setType] = useState(selectedProject ? selectedProject.type : "");
  const [image, setImage] = useState(
    selectedProject ? selectedProject.image : ""
  );
  const [description, setDescription] = useState(
    selectedProject ? selectedProject.description : ""
  );
  const [details, setDetails] = useState(
    selectedProject ? selectedProject.details : []
  );
  const [techStack, setTechStack] = useState(
    selectedProject ? selectedProject.techStack : []
  );
  const [feature, setFeature] = useState(
    selectedProject ? selectedProject.feature : []
  );
  const [github, setGithub] = useState(
    selectedProject ? selectedProject.github : ""
  );
  const [liveDemo, setLiveDemo] = useState(
    selectedProject ? selectedProject.liveDemo : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const techStackArray = techStack.map((tech) => tech.trim());
    const featureArray = Array.isArray(feature)
      ? feature.map((tech) => tech.trim())
      : [];
    const detailsArray = details.map((tech) => tech.trim());

    if (selectedProject) {
      const updatedData = {
        ...selectedProject,
        title,
        type,
        image,
        description,
        details: detailsArray,
        techStack: techStackArray,
        feature: featureArray,
        github,
        liveDemo,
      };

      
      // Make an API request to update the project on the server
      fetch(
        `https://portfolio-server-dev-sabbir194.vercel.app/projects/${updatedData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated project:", data);
          // Update the project locally or perform any necessary actions
          onSubmit(updatedData);
          swal("Success", "Project updated successfully.", "success");
        })
        .catch((error) => {
          console.error("Error updating project:", error);
          swal("Error", "Failed to update project.", "error");
        });
    }
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="form-container">
          <h1>Update</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Write title"
              />
            </Form.Group>

            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                placeholder="Write type"
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                placeholder="Submit project img URL"
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Write description"
              />
            </Form.Group>

            <Form.Group controlId="formDetails">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                placeholder="Write details"
              />
            </Form.Group>

            <Form.Group controlId="formTechStack">
              <Form.Label>Tech Stack</Form.Label>
              <Form.Control
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="Write technology"
              />
            </Form.Group>

            <Form.Group controlId="formFeature">
              <Form.Label>Feature</Form.Label>
              <Form.Control
                type="text"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                placeholder="Write feature"
              />
            </Form.Group>

            <Form.Group controlId="formGithub">
              <Form.Label>Github</Form.Label>
              <Form.Control
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                required
                placeholder="Github code link"
              />
            </Form.Group>

            <Form.Group controlId="formLiveDemo">
              <Form.Label>Live Demo</Form.Label>
              <Form.Control
                type="url"
                value={liveDemo}
                onChange={(e) => setLiveDemo(e.target.value)}
                required
                placeholder="Live link"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditProject;
