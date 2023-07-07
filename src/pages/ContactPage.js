import React from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import logo from "../logo.svg";

const ContactPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm>
          <Card bg="light" style={{ width: "20rem" }}>
            {/* <Card.Img variant="top" src={logo} style={{ width: "10rem" }} /> */}
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title>Title</Card.Title>
              <Card.Text>
                This is some example text which shoud be wraped if widther then
                width of the card itself
              </Card.Text>
            </Card.Body>
            <Card.Footer>Footer</Card.Footer>
          </Card>
        </Col>
        <Col sm>
          <Container className="w-25">
            <p>
              TTo jest przyładowy tekst kóry powinien sę odpowiednio skalowć.
              Jezeli sę nie skaluje to znaczyże cś jest chyba nie tako iaitk
            </p>
          </Container>
        </Col>
        <Col>
          <Container className="w-75">
            <p>
              TTo jest przyładowy tekst kóry powinien sę odpowiednio skalowć.
              Jezeli sę nie skaluje to znaczyże cś jest chyba nie tako iaitk
            </p>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
