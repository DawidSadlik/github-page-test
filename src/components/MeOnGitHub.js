import { React } from "react";
import { Image, Row, Col, Container, Table } from "react-bootstrap";
import { useMeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";
import { getUserProperties } from "./getUserProperties";

const MeOnGitHub = () => {
  const { user } = useMeOnGitHubContextProvider();

  if (!user) return <h1>Loading....</h1>;

  const properties = getUserProperties(user);

  return (
    <div className="m-3">
      <h1>Me On Github</h1>
      <Container>
        <Row>
          <Col>
            <Image src={user.avatar_url} roundedCircle className="m-10" />
          </Col>
          <Col>
            <Table>
              <tbody>
                {properties.map((p) => (
                  <tr>
                    <td>{p.name}</td>
                    <td>{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MeOnGitHub;
