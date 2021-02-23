import {Col, Form, Button, Container, Row, InputGroup} from "react-bootstrap";
import {useState} from "react";

const StepThree = () => {

  const [wip, setWip] = useState({
    fullName: '',
    number: '',
    cvc: '',
    expiration: '',
  });

  const updateWip = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setWip({...wip, [name]: value});
  }

  return (
    <Container fluid={"sm"}>
      <Row className="my-3">
        <Col>
          <h3>Step 3 / 3</h3>
          <p>Fill your credit details.</p>
        </Col>
        <Col>
          <h1 className="text-right text-muted">
            <i className="fas fa-credit-card"/>
          </h1>
        </Col>
      </Row>
      <Row className="mt-2 p-3 bg-light">
        <Col>
          <Form>
            {/* card number field */}
            <Form.Group controlId="formFirstname">
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="number"
                  value={wip.number}
                  isValid={wip.number}
                  onChange={updateWip}
                  placeholder={"Enter card number"} required/>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid card number.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* card owner full name field */}
            <Form.Group controlId="formFirstname">
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="fullName"
                  isValid={wip.fullName}
                  onChange={updateWip}
                  placeholder={"Enter card owner full name"}
                  required/>
                <Form.Control.Feedback type="invalid">
                  Please choose a valid email address.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* card CVC number field */}
            <Form.Group controlId="formFirstname">
              <InputGroup hasValidation>
                <Form.Control
                  type="number"
                  name="cvc"
                  isValid={wip.cvc}
                  onChange={updateWip}
                  placeholder={"Enter CVC number"}
                  required/>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid CVC number, should be found on the back side of your card.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* card expiration field */}
            <Form.Group controlId="formFirstname">
              <InputGroup hasValidation>
                <Form.Control
                  type="date"
                  name="expiration"
                  isValid={wip.expiration}
                  onChange={updateWip}
                  placeholder={"Enter card expiration date"}
                  required/>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid date format.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/*  previous button */}
            <Button variant="primary" type="submit" className={"px-3 mx-auto"}>
              Previous
            </Button>

            {/*  Next button */}
            <Button variant="primary" type="submit" className={"px-3 mx-3"}>
              Next
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default StepThree
