import {Col, Form, Button, Container, Row, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";


const StepOne = () => {

    const [listOfCountries, setListOfCountries] = useState([]);
    const [listOfCities, setListOfCities] = useState([]);
    const [shippingAddressToggled, setShippingAddressToggled] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("")


    useEffect(() => {
        fetch("/api/location/countries")
            .then(response => response.json())
            .then((data) => {
                setListOfCountries(data)
            })
    }, [])

    useEffect(() => {
        try {
            if (selectedCountry) {
                fetch(`/api/location/city/${selectedCountry}`)
                    .then(response => response.json())
                    .then((data) => {
                        setListOfCities([data["name"]])
                        setSelectedCity(data["name"])
                    })
            }
        } catch (e) {
            console.log("retrieving city list was unsuccessful!")
        }
    }, [selectedCountry, selectedCity, listOfCountries])


    return (
        <Container fluid={"sm"}>
            <Row className="my-3">
                <Col>
                    <h3>Step 1 / 3</h3>
                    <p>Tell us who you are.</p>
                </Col>
                <Col>
                    <h1 className="text-right text-muted">
                        <i className="fas fa-user"/>
                    </h1>
                </Col>
            </Row>
            <Row className="mt-2 p-3 bg-light">
                <Col>
                    <Form>
                        {/* first name field */}
                        <Form.Group controlId="formFirstname">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder={"Enter your first name"} required isValid />
                                <Form.Control.Feedback type="valid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* last name field */}
                        <Form.Group controlId="formLastname">
                            <InputGroup hasValidation>
                                <Form.Control type="text" required isValid placeholder="Enter your last name"/>
                                <Form.Control.Feedback type="invalid" >
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* choose country */}
                        <Form.Group controlId="formCountry">
                            <InputGroup hasValidation>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Country</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" defaultValue={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
                                    {listOfCountries.map(country => <option key={country}>{country}</option>)}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        {/* choose city */}
                        <Form.Group controlId="formCity">
                            <InputGroup hasValidation>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>City</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" defaultValue={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                                    {listOfCities.map(city => <option key={city}>{city}</option>)}
                                    <option>...</option>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        {/* address */}
                        <Form.Group controlId="formAddress">
                            <InputGroup hasValidation>
                                <Form.Control type="text" required isInvalid placeholder="Enter your address"/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* postal code */}
                        <Form.Group controlId="formPostalCode">
                            <InputGroup hasValidation>
                                <Form.Control type="text" required isInvalid placeholder={"Enter your postal code"}/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* switch toggle */}
                        {/* switch whether to use personal address as the shipping address */}
                        <Form.Group controlId="formUseShippingAddress">
                            <Form.Check
                                type="switch"
                                label="Use filled data for shipping"
                                onClick={() => setShippingAddressToggled(!shippingAddressToggled)}
                            />
                        </Form.Group>

                        {/*  shipping address */}
                        {/* choose country */}
                        <Form.Group controlId="formShippingCountry">
                            <InputGroup hasValidation>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Shipping country</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" defaultValue="Country..." disabled={shippingAddressToggled}>
                                    {listOfCountries.map(country => <option key={country}>{country}</option>)}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        {/*  shipping address */}
                        {/* choose city */}
                        <Form.Group controlId="formShippingCity">
                            <InputGroup hasValidation>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Shipping city</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" defaultValue="City..." disabled={shippingAddressToggled}>
                                    {listOfCities.map(city => <option key={city}>{city}</option>)}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        {/*  shipping address */}
                        {/* address */}
                        <Form.Group controlId="formShippingAddress">
                            <InputGroup hasValidation>
                                <Form.Control type="text" required isInvalid placeholder="Enter your shipping address" disabled={shippingAddressToggled}/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/*  shipping address */}
                        {/* postal code */}
                        <Form.Group controlId="formShippingPostalCode">
                            <InputGroup hasValidation>
                                <Form.Control type="text" required isInvalid placeholder={"Enter your shipping postal code"} disabled={shippingAddressToggled}/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/*  submit button */}
                        <Button variant="primary" type="submit" className={"px-3"}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default StepOne;