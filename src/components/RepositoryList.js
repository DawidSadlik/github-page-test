import { React } from "react";
import { useMeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";
import { Card, Container, Row } from "react-bootstrap";

const RepositoryList = () => {
  const { repositories } = useMeOnGitHubContextProvider();

  return (
    <>
      <Container>
        <Row>
          {repositories.map((r) => (
            <Card style={{ width: "20rem" }} className="p-5">
              <Card.Header>{r.name}</Card.Header>
              <Card.Body>
                <Card.Title>{r.fullname}</Card.Title>
                <Card.Text>{r.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
};
export default RepositoryList;
