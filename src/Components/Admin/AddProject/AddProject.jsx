import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./AddProject.css";
import swal from "sweetalert";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [details, setDetails] = useState("");
  const [feature, setFeature] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split the techStack string by commas and trim each technology
       const techStackArray = techStack.split(",").map((tech) => tech.trim());
       const featureArray = feature.split(",").map((tech) => tech.trim());
       const detailsArray = details.split(",").map((tech) => tech.trim());

    // Create a project object with the form data
    const project = {
      title,
      type,
      image,
      description,
      techStack: techStackArray,
      github,
      liveDemo,
      details: detailsArray,
      feature: featureArray,
    };

    try {
      // Send the project data as JSON to the specified URL
      const response = await fetch(
        "https://portfolio-server-dev-sabbir194.vercel.app/projects/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        }
      );

      // Reset form fields after successful submission
      setTitle("");
      setType("");
      setImage("");
      setDescription("");
      setTechStack("");
      setGithub("");
      setLiveDemo("");
      setDetails("");
      setFeature("");

      // Show success message
      if (response.ok) {
        swal("Success", "Form submitted successfully!", "success");
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      // Handle error and show error message
      swal("Error", "Error submitting form", "error");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container className="form-container">
      <h1>Add New Project</h1>
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
            placeholder="Submit project img url"
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
            placeholder="write description"
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
            placeholder="write description"
          />
        </Form.Group>

        <Form.Group controlId="formTechStack">
          <Form.Label>Tech Stack</Form.Label>
          <Form.Control
            placeholder="Write technology"
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formFeature">
          <Form.Label>Feature</Form.Label>
          <Form.Control
            placeholder="Write feature"
            type="text"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
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
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddProject;
