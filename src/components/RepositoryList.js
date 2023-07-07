import { React } from "react";
import { useMeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";
import { Card, Col, Row } from "react-bootstrap";

const RepositoryList = () => {
  const { repositories } = useMeOnGitHubContextProvider();

  return (
    <>
      <Row>
        {repositories.map((r) => (
          <Col>
            <Card style={{ width: "16rem", margin: 10 }}>
              <Card.Header>{r.name}</Card.Header>
              <Card.Body>
                <Card.Title>{r.fullname}</Card.Title>
                <Card.Text>{r.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default RepositoryList;
