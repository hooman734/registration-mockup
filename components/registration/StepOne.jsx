import {Col, Form, Button, Container, Row, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";


const StepOne = () => {

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
    zipCode: '',
    shippingAddressToggled: false,
    shippingAddress: '',
    shippingCountry: '',
    shippingCity: '',
    shippingZipCode: '',
  });

  const updateWip = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "shippingAddressToggled") {
      value = e.target.checked;

      if (value) {
        return setWip({
          ...wip,
          [name]: value,
          shippingAddress: wip.address,
          shippingCountry: wip.country,
          shippingCity: wip.city,
          shippingZipCode: wip.zipCode,
        });
      }
    }

    setWip({...wip, [name]: value});
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
    if (wip.shippingCountry) {
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
          <Form>
            {/* first name field */}
            <Form.Group controlId="formFirstname">
              <InputGroup hasValidation>
                <Form.Control type="text"
                              placeholder={"Enter your first name"}
                              name={"firstname"}
                              onChange={updateWip}
                              value={wip.firstname}
                              isValid={wip.firstname}
                              required/>
                <Form.Control.Feedback type="valid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* last name field */}
            <Form.Group controlId="formLastname">
              <InputGroup hasValidation>
                <Form.Control type="text"
                              name={"lastname"}
                              onChange={updateWip}
                              placeholder="Enter your last name"
                              isValid={wip.lastname}
                              required/>
                <Form.Control.Feedback type="invalid">
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
                <Form.Control as="select" name="country" onChange={updateWip}>
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
                <Form.Control as="select" name="city" onChange={updateWip}>
                  {data.cities.map(city =>
                    <option key={city} selected={wip.city === city}>{city}</option>)}
                </Form.Control>
              </InputGroup>
            </Form.Group>

            {/* address */}
            <Form.Group controlId="formAddress">
              <InputGroup hasValidation>
                <Form.Control type="text" required isValid={wip.address} placeholder="Enter your address"
                              value={wip.address}
                              onChange={updateWip}
                              name="address"/>
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* postal code */}
            <Form.Group controlId="formPostalCode">
              <InputGroup hasValidation>
                <Form.Control type="text"
                              placeholder={"Enter your postal code"}
                              value={wip.zipCode}
                              onChange={updateWip}
                              pattern="[0-9]{5}"
                              name="zipCode"
                              isValid={wip.zipCode}
                              required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
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
                <Form.Control as="select" disabled={wip.shippingAddressToggled} onChange={updateWip}
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
                <Form.Control as="select" disabled={wip.shippingAddressToggled} onChange={updateWip}
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
                <Form.Control type="text" isValid={wip.shippingAddress}
                              placeholder="Enter your shipping address"
                              value={wip.shippingAddress}
                              disabled={wip.shippingAddressToggled}
                              onChange={updateWip}
                              name="shippingAddress"
                              required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/*  shipping address */}
            {/* postal code */}
            <Form.Group controlId="formShippingPostalCode">
              <InputGroup hasValidation>
                <Form.Control type="text"
                              placeholder={"Enter your shipping postal code"}
                              disabled={wip.shippingAddressToggled}
                              isValid={wip.shippingZipCode}
                              value={wip.shippingZipCode}
                              onChange={updateWip}
                              name="shippingZipCode"
                              required
                />
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
