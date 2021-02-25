import {Col, Form, Button, Container, Row, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";


const StepOne = props => {
  const { onNext } = props;

  const [data, updateData] = useState({
    countries: [],
    cities: [],
    shippingCities: []
  });

  const [wip, setWip] = useState({
    firstname: '',
    lastname: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    shippingAddressToggled: false,
    shippingAddress: '',
    shippingCountry: '',
    shippingCity: '',
    shippingPostalCode: '',
  });

  const updateWip = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "shippingAddressToggled") {
      value = e.target.checked;
    }

    return setWip({...wip, [name]: value})
  }

  const formIsValid = () => {
    if (
        wip.firstname &&
        wip.lastname &&
        wip.country &&
        wip.city &&
        wip.address &&
        wip.postalCode &&
        wip.shippingCountry &&
        wip.shippingCity &&
        wip.shippingAddress &&
        wip.shippingPostalCode
    ) {return true;}
    else {return false;}
  }

  const getCity = (country) => fetch(`/api/location/city/${country}`)
    .then(response => response.json())
    .then(data => data["name"]);

  useEffect(() => {
    fetch("/api/location/countries")
      .then(response => response.json())
      .then((countries) => {
        updateData({...data, countries});
      });
  }, []);

  useEffect(() => {
    if (wip.country) {
      getCity(wip.country).then(city => {
        updateData({...data, cities: [city]});
        setWip({...wip, city: wip.city || city});
      });
    }
  }, [wip.country, data.countries])

  useEffect(() => {
    if (wip.shippingAddressToggled) {
      updateData({
        ...data,
        shippingCities: data.cities
      })
      setWip({
        ...wip,
        shippingAddress: wip.address,
        shippingCountry: wip.country,
        shippingCity: wip.city,
        shippingPostalCode: wip.postalCode,
      })
    }
  }, [wip.shippingAddressToggled, wip.address, wip.city, wip.country, wip.postalCode])

  useEffect(() => {
    console.log(`-----> ${!wip.shippingAddressToggled}`)
    if (wip.shippingCountry && !wip.shippingAddressToggled) {
      getCity(wip.shippingCountry)
        .then((city) => {
          updateData({...data, shippingCities: [city]});
          setWip({...wip, shippingCity: wip.shippingCity || city});
        });
    }
  }, [wip.shippingCountry, data.countries]);


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
          <Form novalidate>
            {/* first name field */}
            <Form.Group controlId="formFirstname">
              <InputGroup hasValidation>
                <Form.Control type="text"
                              placeholder={"Enter your first name"}
                              name={"firstname"}
                              onChange={updateWip}
                              value={wip.firstname}
                              isInvalid= {!wip.firstname}
                              isValid={formIsValid()}
                              required/>
                <Form.Control.Feedback type="invalid">
                  Please enter valid name format.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* last name field */}
            <Form.Group controlId="formLastname">
              <InputGroup hasValidation>
                <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    name={"lastname"}
                    onChange={updateWip}
                    value={wip.lastname}
                    isInvalid={!wip.lastname}
                    isValid={formIsValid()}
                    required/>
                <Form.Control.Feedback type="invalid">
                  Please enter valid last name format.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* choose country */}
            <Form.Group controlId="formCountry">
              <InputGroup hasValidation>
                <InputGroup.Prepend>
                  <InputGroup.Text>Country</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    as="select"
                    name="country"
                    onChange={updateWip}
                    >
                  {data.countries.map(country => <option key={country}
                                                         selected={wip.country === country}>
                    {country}
                  </option>)}
                </Form.Control>
              </InputGroup>
            </Form.Group>

            {/* choose city */}
            <Form.Group controlId="formCity">
              <InputGroup hasValidation>
                <InputGroup.Prepend>
                  <InputGroup.Text>City</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    as="select"
                    name="city"
                    onChange={updateWip}
                    >
                  {data.cities.map(city =>
                    <option key={city} selected={wip.city === city}>{city}</option>)}
                </Form.Control>
              </InputGroup>
            </Form.Group>

            {/* address */}
            <Form.Group controlId="formAddress">
              <InputGroup hasValidation>
                <Form.Control
                    type="text"
                    required placeholder="Enter your address"
                    value={wip.address}
                    onChange={updateWip}
                    isInvalid={!wip.address}
                    isValid={formIsValid()}
                    name="address"/>
                <Form.Control.Feedback type="invalid">
                  Please enter valid address format.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* postal code */}
            <Form.Group controlId="formPostalCode">
              <InputGroup hasValidation>
                <Form.Control
                    type="number"
                    placeholder={"Enter your postal code"}
                    value={wip.postalCode}
                    onChange={updateWip}
                    pattern="[0-9]{5}"
                    name="postalCode"
                    isInvalid={!wip.postalCode}
                    isValid={formIsValid()}
                    required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter valid postal code format.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* switch toggle */}
            {/* switch whether to use personal address as the shipping address */}
            <Form.Group controlId="formUseShippingAddress">
              <Form.Check
                value={wip.shippingAddressToggled}
                name="shippingAddressToggled"
                type="switch"
                label="Use filled data for shipping"
                onChange={updateWip}
              />
            </Form.Group>

            {/*  shipping address */}
            {/* choose country */}
            <Form.Group controlId="formShippingCountry">
              <InputGroup hasValidation>
                <InputGroup.Prepend>
                  <InputGroup.Text>Shipping country</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    as="select"
                    disabled={wip.shippingAddressToggled}
                    onChange={updateWip}
                    name="shippingCountry">
                  {data.countries.map(country => <option key={country}
                                                         selected={wip.shippingCountry === country}>
                    {country}
                  </option>)}
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
                <Form.Control
                    as="select"
                    disabled={wip.shippingAddressToggled}
                    onChange={updateWip}
                    name="shippingCity">
                  {data.shippingCities.map(city => <option key={city}
                                                           selected={wip.shippingCity === city}>{city}</option>)}
                </Form.Control>
              </InputGroup>
            </Form.Group>

            {/*  shipping address */}
            {/* address */}
            <Form.Group controlId="formShippingAddress">
              <InputGroup hasValidation>
                <Form.Control
                    type="text"
                    isInvalid={!wip.shippingAddress}
                    isValid={formIsValid()}
                    placeholder="Enter your shipping address"
                    value={wip.shippingAddress}
                    disabled={wip.shippingAddressToggled}
                    onChange={updateWip}
                    name="shippingAddress"
                    required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter valid address format.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/*  shipping address */}
            {/* postal code */}
            <Form.Group controlId="formShippingPostalCode">
              <InputGroup hasValidation>
                <Form.Control
                    type="number"
                    placeholder={"Enter your shipping postal code"}
                    disabled={wip.shippingAddressToggled}
                    isInvalid={!wip.shippingPostalCode}
                    isValid={formIsValid()}
                    value={wip.shippingPostalCode}
                    onChange={updateWip}
                    name="shippingPostalCode"
                    required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter valid postal code format.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/*  submit button */}
            <Button variant="primary" type="submit" className={"px-3"} onClick={() => onNext(wip)} disabled={!formIsValid()}>
              Next
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default StepOne;
