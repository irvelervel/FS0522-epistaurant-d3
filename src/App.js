import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomNavbar from './components/CustomNavbar'
import Home from './components/Home'
import ReservationForm from './components/ReservationForm'
import ReservationList from './components/ReservationList'
import { Col, Container, Row } from 'react-bootstrap'

function App() {
  return (
    <div>
      {/* a prop is an additional piece of info you add on the
      INVOCATION of a component */}
      <CustomNavbar additionalBrand="Best Italian Restaurant" />
      {/* so far we still don't know how to create a new "page"
      for our restaurant website, so let's put the reservation
      section here, temporarily! */}

      {/* I want to write Container, Row and Col in a single place */}
      <Container>
        <Row className="mt-3 justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <ReservationList />
            <ReservationForm />
            <Home />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
