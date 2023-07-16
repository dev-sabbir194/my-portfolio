import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { AiOutlineArrowUp } from "react-icons/ai";
import { VscGithub } from "react-icons/vsc";

const ProjectCard = ({
  title,
  type,
  image,
  description,
  techStack,
  github,
  liveDemo,
  details,
  feature,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex flexDirection="column" className="ProjectCard">
      <Box className="cardImg" backgroundImage={image} />
      <Box>
        <Flex>
          <Heading size="md">{title}</Heading>
          <Badge variant="outline" colorScheme="green">
            {type}
          </Badge>
        </Flex>
        <Text>
          <span style={{ fontWeight: 700 }}>Tech Stack:</span>{" "}
          {techStack.join(", ")}
        </Text>
        <Text>{description}</Text>
      </Box>
      <Box>
        <HStack>
          <Link href={liveDemo} target="_blank">
            <Button size="sm">
              Live Demo <BiLinkExternal />
            </Button>
          </Link>
          <Link onClick={handleOpenModal}>
            <Button size="sm">
              View <AiOutlineArrowUp />
            </Button>
          </Link>
          {github && (
            <Link
              href={github}
              target="_blank"
              style={{ pointerEvents: github ? "" : "none" }}
            >
              <Button
                size="sm"
                style={{
                  backgroundColor: github ? "#111a2f" : "#111a2fbc",
                  color: github ? "#fff" : "#8d8d8d",
                }}
              >
                Code Base <VscGithub />
              </Button>
            </Link>
          )}
        </HStack>
      </Box>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="full">
        <ModalOverlay />
        <ModalContent backgroundColor="#1a202c" color="white">
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <h1 className="text-center mb-5">{title}</h1>
            <div className="d-flex gap-2">
              <div className="mt-5">
                <h1 className="text-center mb-5">Description</h1>{" "}
                {Array.isArray(details) ? (
                  details.map((item, i) => (
                    <div key={i}>
                      <p style={{ marginBottom: "20px" }}>{item}</p>
                    </div>
                  ))
                ) : (
                  <div className="gap-5">
                    <p>{details}</p>
                  </div>
                )}
                <h1 className="mb-5 text-center">Feature</h1>
                {Array.isArray(feature) ? (
                  feature.map((item, i) => (
                    <div key={i}>
                      <li style={{ marginBottom: "20px" }}>{item}</li>
                    </div>
                  ))
                ) : (
                  <div>
                    <li style={{ marginBottom: "20px" }}>{feature}</li>
                  </div>
                )}
                <h1 className="text-center mt-5 mb-5">View code & Demo</h1>
                <div className="text-center">
                  <Link href={liveDemo} target="_blank">
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: github ? "#111a2f" : "#111a2fbc",
                        color: github ? "#fff" : "#8d8d8d",
                      }}
                    >
                      Live Demo <BiLinkExternal />
                    </Button>
                  </Link>
                  {github && (
                    <Link
                      href={github}
                      target="_blank"
                      style={{ pointerEvents: github ? "" : "none" }}
                    >
                      <Button
                        className="ms-5"
                        size="sm"
                        style={{
                          backgroundColor: github ? "#111a2f" : "#111a2fbc",
                          color: github ? "#fff" : "#8d8d8d",
                        }}
                      >
                        Code Base <VscGithub />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              <img className="img-fluid img-bb" src={image} alt="" />
            </div>

            {/* <p>{feature}</p> */}
          </ModalBody>
          <ModalFooter>
            <Button
              style={{
                backgroundColor: github ? "#111a2f" : "#111a2fbc",
                color: github ? "#fff" : "#8d8d8d",
              }}
              onClick={handleCloseModal}
              size="sm"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ProjectCard;
