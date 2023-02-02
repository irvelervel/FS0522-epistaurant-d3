// let's create now our Custom Navbar component, starting from the
// responsive navbar example in the react-bootstrap documentation!

// which component should I create for this?
// this is not going to be a very powerful or important component,
// it will not hold a lot of logic... so I will use a function!

import { Navbar, Nav } from 'react-bootstrap'

const CustomNavbar = (props) => {
  // console.log(props)
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        Epistaurant - {props.additionalBrand}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#">Menu</Nav.Link>
          <Nav.Link href="#">Reservation</Nav.Link>
          <Nav.Link href="#">Find us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar
