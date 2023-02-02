// let's create a form in which the user can book a table in the restaurant!
// we're going to use the React Bootstrap Form component

import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

// this is going to be a table booking form, I want to collect this data
// from the user:
// name --> string
// phone --> string/number
// numberOfPeople --> string/number
// smoking --> boolean
// dateTime --> date into ISO string format
// specialRequests --> string

// since I already know I'm going to use the state for creating a form,
// I'll create ReservationForm as a Class Component!

class ReservationForm extends Component {
  // now it's time to make our input fields CONTROLLED
  // let's create a state object, and initialize every input field
  // with a value

  state = {
    reservation: {
      // this is a sub-object into the state
      name: '', // we're not using null here, since the value of an input field
      // has to be of type "string"
      phone: '',
      numberOfPeople: 1,
      smoking: false,
      dateTime: '',
      specialRequests: '',
      // these values are the content of the form
      // upon every refresh
    },
  }

  sendReservation = async () => {
    try {
      // about to send the form!
      // do we have to still collect the data for our network call?
      // no! the data is already in the state :)
      console.log("I'm about to send this:", this.state.reservation)
      // let's do it!
      // HTTP VERBS
      // GET <-- retrieves record/records
      // POST <-- saves a new record
      // PUT/PATCH <-- updates a record
      // DELETE <-- deletes a record
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/reservation',
        {
          // like a configuration object
          method: 'POST',
          body: JSON.stringify(this.state.reservation),
          // the "body" property just accepts a string
          // that means that I have to "stringify" the object (transform it in a string)
          headers: {
            // a place for metadata in our call
            'Content-Type': 'application/json', // we're telling the API
            // that our stringified reservation was actually an object in the first place
          },
        }
      )
      console.log(response)
      if (response.ok) {
        alert('reservation saved!')
        // let's flush the form! I just have to restore the initial values
        // for this.state.reservation
        this.setState({
          reservation: {
            name: '',
            phone: '',
            numberOfPeople: 1,
            smoking: false,
            dateTime: '',
            specialRequests: '',
          },
        }) // since our form (input fields) is connected to the state,
        // resetting the state actually flushes the form!
      } else {
        alert('problem accepting your reservation :(')
      }
    } catch (error) {
      console.log(error)
      // we're going to fall here just in case of type errors, or very serious
      // network problems (like airplane mode enabled)
    }
  }

  sendReservationWithThen = () => {
    fetch('https://striveschool-api.herokuapp.com/api/reservation', {
      // like a configuration object
      method: 'POST',
      body: JSON.stringify(this.state.reservation),
      // the "body" property just accepts a string
      // that means that I have to "stringify" the object (transform it in a string)
      headers: {
        // a place for metadata in our call
        'Content-Type': 'application/json', // we're telling the API
        // that our stringified reservation was actually an object in the first place
      },
    })
      .then((response) => {
        // this block will execute JUST WHEN the fetch() is going to fulfill
        console.log(response)
        if (response.ok) {
          alert('reservation saved with .then()!')
          // let's flush the form even here
          this.setState({
            reservation: {
              name: '',
              phone: '',
              numberOfPeople: 1,
              smoking: false,
              dateTime: '',
              specialRequests: '',
            },
          })
        } else {
          alert('problem accepting your reservation :(')
        }
      })
      .catch(
        (e) => console.log(e)
        // we're going to fall here just in case of type errors, or very serious
        // network problems (like airplane mode enabled)
      )
  }

  render() {
    return (
      <>
        <h2>BOOK A TABLE TODAY!</h2>
        <Form
          onSubmit={(e) => {
            // e is a submission event from the form
            e.preventDefault() // <-- with this the page is not refreshing, yay!
            console.log('form is submitting...', e)
            // now we can attach our custom behavior
            this.sendReservationWithThen()
          }}
        >
          <Form.Group>
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Insert your name here"
              value={this.state.reservation.name} // basically it's ''
              onChange={(e) => {
                // console.log('letter inputted!', e.target.value)
                // we want to change the "name" property into
                // this.state.reservation every time we input a letter
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    // ??? *MAGIC*
                    // the spread operator (...) takes into this new object
                    // all the key/value pairs of the object you're using it with
                    name: e.target.value,
                    // and then I'm over-writing the name value
                  },
                })
              }}
            />
            {/* Form.Control is the <input /> tag */}
          </Form.Group>

          {/* this is an example of a CONDITIONAL RENDERING */}
          {/* the && means this: if the condition on the left is met,
              render the JSX block on the right */}
          {/* It's also called the "short circuit" operator */}
          {this.state.reservation.name === 'Stefano' && (
            <Form.Group>
              <Form.Control type="text" value="Great Name!" disabled />
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label>Your phone</Form.Label>
            <Form.Control
              type="tel"
              required
              placeholder="Insert your phone here"
              value={this.state.reservation.phone}
              onChange={(e) => {
                console.log('letter inputted!', e.target.value)
                // we want to change the "name" property into
                // this.state.reservation every time we input a letter
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    phone: e.target.value,
                  },
                })
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>How many are you?</Form.Label>
            <Form.Control
              as="select"
              value={this.state.reservation.numberOfPeople}
              onChange={(e) => {
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    numberOfPeople: e.target.value,
                  },
                })
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Do you smoke?"
              checked={this.state.reservation.smoking}
              onChange={(e) => {
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    smoking: e.target.checked, // <-- the value of a checkbox
                    // is "on" or "off"
                  },
                })
              }}
            />
            {/* checkboxes don't use the "value" attribute
                they use instead the "checked" attribute */}
          </Form.Group>

          {this.state.reservation.smoking === true && (
            <Form.Group>
              <Form.Label>Do you want to be placed in the garden?</Form.Label>
              <Form.Control as="select">
                <option>Yes</option>
                <option>No</option>
              </Form.Control>
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label>When are you planning to come?</Form.Label>
            <Form.Control
              type="datetime-local"
              value={this.state.reservation.dateTime}
              required
              onChange={(e) => {
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    dateTime: e.target.value,
                  },
                })
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Any special request?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={this.state.reservation.specialRequests}
              onChange={(e) => {
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    specialRequests: e.target.value,
                  },
                })
              }}
            />
          </Form.Group>

          <Button
            variant="info"
            type="submit"
            // onClick={(e) => {
            //   // alternative way! work with the "onClick" event listener
            //   // of a button of type "submit"
            //   // it achieves the exact same effect
            //   // e is a submission event from the form
            //   e.preventDefault() // <-- with this the page is not refreshing, yay!
            //   console.log('form is submitting...', e)
            //   // now we can attach our custom behavior
            // }}
          >
            Book table
          </Button>
        </Form>
      </>
    )
  }
}

export default ReservationForm
