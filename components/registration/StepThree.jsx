import {Col, Form, Button, Container, Row, InputGroup, FormGroup} from "react-bootstrap";
import {useEffect, useState} from "react";

const StepThree = (props) => {
  const { onPrevious } = props
  const [wip, setWip] = useState({
    fullName: '',
    number: '',
    decoratedNumber: '',
    cvc: '',
    expiration: '',
  });

  useEffect(() => {
    let firstSegment = wip.number.slice(0, 4) || "";
    const secondSegment = wip.number.slice(4, 8) || "";
    const thirdSegment = wip.number.slice(8, 12) || "";
    const fourthSegment = wip.number.slice(12, 16) || "";
    setWip({...wip, decoratedNumber: `${firstSegment}  ${secondSegment}  ${thirdSegment}  ${fourthSegment}`});
    console.log(`----->> number -> ${wip.number} --->> decoratedNumber -> ${wip.decoratedNumber}`)
  }, [wip.number]);

  const updateWip = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "number") {
      const modifiedNumber = value.replace(/\D*/g, '');
      console.log(`if has ran and modifiedNumber is ${modifiedNumber}`)
      setWip({...wip, number: modifiedNumber})
    } else {
      setWip({...wip, [name]: value});
    }
  }

  const validateCardNumber = cardNumber => {
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

    const isVisa = visaRegEx.test(cardNumber);
    const isMastercard = mastercardRegEx.test(cardNumber);
    const isAmexp = amexpRegEx.test(cardNumber);
    const isDiscov = discovRegEx.test(cardNumber);

    if (isVisa) {return "VISA CARD"}
    else if (isMastercard) {return "MASTER CARD"}
    else if (isAmexp) {return "AMERICAN EXPRESS"}
    else if (isDiscov) {return "DISCOVERY CARD"}
    else {return ""}
  }

  const validateDate = () => {
    const cardExpDate = new Date(wip.expiration).getTime();
    const today = new Date(Date.now()).getTime()
    return cardExpDate > today;
  }

  const formIsValid = () => {
    return !!((wip.fullName) &&
        (wip.number) &&
        (validateCardNumber(wip.number).length > 0) &&
        (wip.cvc) &&
        (validateDate()));
  }

  const finalMessage = () => {
    alert("The registration was successful!")
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
              <Form.Label>Enter your card number</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="number"
                  pattern="[0-9\s]{13,19}"
                  autocomplete="cc-number"
                  maxlength="25"
                  value={wip.decoratedNumber}
                  isValid={wip.number}
                  onChange={updateWip}
                  placeholder={"Enter card number (**** **** **** ****)"} required/>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid card number.
                </Form.Control.Feedback>

                {validateCardNumber(wip.number).length > 0 ? (<InputGroup.Append>
                  <InputGroup.Text><span className="text-success font-weight-bolder">{validateCardNumber(wip.number)}</span></InputGroup.Text>
                </InputGroup.Append>) : ''}

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
                  type="text"
                  name="cvc"
                  pattern="[0-9\s]{13,19}"
                  autocomplete="cc-number"
                  maxlength="4"
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
              <Form.Label>Enter your card expiration date</Form.Label>
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
            <Button variant="primary" type="submit" className={"px-3 mx-auto"} onClick={onPrevious}>
              Previous
            </Button>

            {/*  Next button */}
            <Button variant="primary" type="submit" className={"px-3 mx-3"}  disabled={!formIsValid()} onClick={finalMessage}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default StepThree
