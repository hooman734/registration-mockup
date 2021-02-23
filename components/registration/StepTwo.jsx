import {Col, Form, Button, Container, Row, InputGroup} from "react-bootstrap";



const StepTwo = () => {
    return (
        <Container fluid={"sm"}>
            <Row className="my-3">
                <Col>
                    <h3>Step 2 / 3</h3>
                    <p>Choose a package.</p>
                </Col>
                <Col>
                    <h1 className="text-right text-muted">
                        <i className="fas fa-window-restore"/>
                    </h1>
                </Col>
            </Row>
            <Row className="mt-2 p-3 bg-light">
                <Col>
                    <Form>
                        {/* email address field */}
                        <Form.Group controlId="formEmail">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder={"Enter your email"} required isValid />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid email address.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* password field */}
                        <Form.Group controlId="formPassword">
                            <InputGroup hasValidation>
                                <Form.Control type="password" required isValid placeholder="Select password"/>
                                <Form.Control.Feedback type="invalid" >
                                    Password should be 6 character long including capital letter and especial character.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* repeat password field */}
                        <Form.Group controlId="formRepeatPassword">
                            <InputGroup hasValidation>
                                <Form.Control type="password" required isValid placeholder="Repeat password"/>
                                <Form.Control.Feedback type="invalid" >
                                    Password should be 6 character long including capital letter and especial character.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* radio toggle */}
                        {/* switch whether to select standard package */}
                        <Form.Group controlId="formRadioStandard">
                            <Form.Check
                                type="radio"
                                label="Standard package"
                                name="package"
                            />
                        </Form.Group>

                        {/* radio toggle */}
                        {/* switch whether to select premium package */}
                        <Form.Group controlId="formRadioPremium">
                            <Form.Check
                                type="radio"
                                label="Premium package"
                                name="package"
                            />
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

export default StepTwo