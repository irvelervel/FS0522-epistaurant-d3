// Let's create now a component for listing the actual existing reservations!

// CHAIN OF EVENTS
// 1) render() gets called
// 2) componentDidMount() gets called just after the initial render() invocation
// 3) the remote data is fetched, the state is set with this new data
// 4) because a new state is detected, render() fires AGAIN
// 5) now the .map() on the reservations actually creates the list

import { parseISO, format } from 'date-fns'
import { Component } from 'react'
import { ListGroup, Spinner, Alert } from 'react-bootstrap'

class ReservationList extends Component {
  // the goal of this component is to provide a list of existing reservations
  // this array of reservations is not embedded locally anywhere, we are
  // supposed to obtain it from a remote source (the /reservations API)

  // every time you have to grab a resource from an http call, you'll store
  // the obtained data in the STATE of the component!
  state = {
    reservations: [], // since our data will always come in the shape of an array,
    // let's default the initial value of the property holding it as an []
    isLoading: true, // now I want to bind the UI with it, the Spinner!
    isError: false,
  }

  fetchReservations = async () => {
    // notice how I don't need to initialize fetchReservations, nice :)
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/reservation'
      )
      console.log(response)
      if (response.ok) {
        // alright, everything looks good! but where is my array of reservations?
        // it is stored in the BODY of this response object, but unfortunately
        // it is not still ready to be read...
        // we need to parse the body with a method called .json() in order to read it
        let data = await response.json() // we wait for the promise to be completed
        // before assigning whatever comes back from it to the "data" variable
        // response.json() gives you back the body of the response in an usable format
        console.log(data) // now data is assigned
        // what are we going to do with data??
        // our interface knows how to read it out and create a list,
        // but how are we going to pass it to the interface?
        // the bridge between our fetch result and the interface is the state object

        // 3)
        this.setState({
          reservations: data,
          // let's put the reservations into the state!
          // but watch out, setting the state fires render() again!!!
          isLoading: false,
        })
      } else {
        // this else statement means response.ok is NOT TRUE
        // so we got an error from the server
        // alert('error!') // let's remove this, now we have an Alert message
        this.setState({
          isLoading: false,
          isError: true,
        }) // even here, the loading process has somewhat finished
      }
    } catch (error) {
      // very generic errors here, like network ones
      console.log(error)
      this.setState({
        isLoading: false,
        isError: true,
      }) // even here, the loading process has somewhat finished
    }
  }

  // we need to find another place for invoking our fetchReservation function,
  // not render....
  // we'd like to find a place that is guaranteed to be invoked just ONCE,
  // even if we set the state into it...

  // we need to use another lifecycle method, not render()!
  // this method, which is invoked just once after the initial render invocation
  // is called componentDidMount

  // 2)
  componentDidMount() {
    // componentDidMount is a lifecycle method available in every class component
    // what it does is FIRING ITSELF JUST ONCE, just after the initial render()
    // invocation
    // componentDidMount is designed for launching fetch() functions, which
    // are supposed to grab initial data for the component
    this.fetchReservations() // let's invoke the fetch()
  }

  // 1)
  // 4)
  render() {
    // render() is a method capable of outputting the JSX out of the component
    // it is the only MANDATORY method, without it the component just doesn't work

    // this.fetchReservations() // let's invoke the fetch()
    // render() is not the right place for our function invocation, because
    // its job is to mantain the state/props and the JSX in sync!
    // render() fires AGAIN any time there's a change in the STATE or in the PROPS
    // of the component!
    // so, if we put our function (which sets the state) into render(),
    // we just entered an infinite loop, because setting the state
    // launches render() again, which fires the function which sets the state,
    // and so on, so forth...

    return (
      <div>
        <h2>EXISTING RESERVATIONS</h2>

        {this.state.isLoading && ( // isLoading is true or false
          <Spinner animation="border" variant="success" />
        )}
        {this.state.isError && (
          <Alert variant="danger">Aww snap, we got an error!😨</Alert>
        )}

        <ListGroup className="my-4">
          {/* Create a connection between your DATA and your INTERFACE */}
          {/* 5) */}
          {
            // let's create as many ListGroup.Item as elements in the
            // reservations array
            this.state.reservations.map((res) => {
              return (
                <ListGroup.Item key={res._id}>
                  {res.name} for {res.numberOfPeople} at{' '}
                  {format(parseISO(res.dateTime), "EEEE, MMMM 'the' do")}
                </ListGroup.Item>
              )
            })
            // this allows me from now on to focus just on the DATA,
            // the interface already knows how to behave!
          }
        </ListGroup>
      </div>
    )
  }
}

export default ReservationList

// 2023-02-02T11:31:00.000Z
// this date string format points to a moment in time
// in order to print it in a better way for the user, something like:
// Thursday, February the 2nd

// the process is divided in 2 phases:
// 1) convert this string into a proper Date object <-- parseISO()
// 2) from a Date object, print a better string out of it <-- format()
// select from the docs of date-fns the elements you want to format the string with
