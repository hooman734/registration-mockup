import {Col, Form, Button, Container, Row, InputGroup} from "react-bootstrap";
import {useState} from "react";

const StepTwo = (props) => {
  const { onNext, onPrevious } = props
  const [wip, setWip] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    standardPackage: true,
    premiumPackage: false
  });

  const updateWip = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "standardPackage" || name === "premiumPackage") {
      setWip({...wip, standardPackage: !wip.standardPackage, premiumPackage: !wip.premiumPackage})
    } else {
      setWip({...wip, [name]: value});
    }
    console.log(e);
    console.log(`
      ================================
      name => ${name} - value => ${value}
      ----------------------------------
      ${e.id}
      email: '${wip.email}',
      password: '${wip.password}',
      passwordConfirmation: '${wip.passwordConfirmation}',
      isPremiumPackage: '${wip.premiumPackage}',
      isStandardPackage: '${wip.standardPackage}
    `)
  }

  const formIsValid = () => {
    if (
        (wip.standardPackage || wip.premiumPackage) &&
        (validatePassword(wip.password)) &&
        (validatePassword(wip.passwordConfirmation)) &&
        (passwordsDoMatch()) &&
        (validateEmail())
    ) {return true;}
    else {return false;}
  }

  const passwordsDoMatch = () => {
    return wip.password === wip.passwordConfirmation;
  }

  const validatePassword = pass => {
    const re = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return re.test(String(pass).toLowerCase());
  }

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(wip.email).toLowerCase());
  }


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
                <Form.Control
                    type="text"
                    name="email"
                    value={wip.email}
                    onChange={updateWip}
                    isValid={wip.email}
                    isInvalid={!validateEmail()}
                    placeholder={"Enter your email"} required/>
                <Form.Control.Feedback type="invalid">
                  Please choose a valid email address.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* password field */}
            <Form.Group controlId="formPassword">
              <InputGroup hasValidation>
                <Form.Control
                    type="password"
                    name="password"
                    value={wip.password}
                    onChange={updateWip}
                    isValid={wip.password}
                    isInvalid={!validatePassword(wip.password)}
                    placeholder="Select password"
                    required
                />
                <Form.Control.Feedback type="invalid">
                  Password should be 6 character long including numbers.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* repeat password field */}
            <Form.Group controlId="formRepeatPassword">
              <InputGroup hasValidation>
                <Form.Control
                    type="password"
                    name="passwordConfirmation"
                    onChange={updateWip}
                    value={wip.passwordConfirmation}
                    isValid={wip.passwordConfirmation}
                    isInvalid={!passwordsDoMatch() || !validatePassword(wip.password)}
                    placeholder="Repeat password"
                    required
                />
                <Form.Control.Feedback type="invalid">
                  Repeated password either does not match or is invalid.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* radio toggle */}
            {/* switch whether to select standard package */}
            <Form.Group controlId="formRadioStandard">
              <Form.Check
                  value={wip.standardPackage}
                  type="checkbox"
                  label="Standard package"
                  name="standardPackage"
                  onClick={updateWip}
                  checked={wip.standardPackage}
              />
            </Form.Group>

            {/* radio toggle */}
            {/* switch whether to select premium package */}
            <Form.Group controlId="formRadioPremium">
              <Form.Check
                  value={wip.premiumPackage}
                  type="checkbox"
                  label="Premium package"
                  name="premiumPackage"
                  onClick={updateWip}
                  checked={wip.premiumPackage}
              />
            </Form.Group>

            {/*  previous button */}
            <Button variant="primary" type="submit" className={"px-3 mx-auto"} onClick={onPrevious}>
              Previous
            </Button>

            {/*  Next button */}
            <Button variant="primary" type="submit" className={"px-3 mx-3"} onClick={onNext} disabled={!formIsValid()}>
              Next
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default StepTwo
