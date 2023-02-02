import { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import items from '../data/menu.json'
import DishComments from './DishComments'
// ../ brings me up a level, so I can reach the "data" folder

// items is an array of pastas

// The final feature of today is about generating dynamically a list of reviews
// The reviews should belong to the last slide (pasta) we clicked on
// ...this involves our Home component remembering which is the last pasta
// we clicked on! ...which is the currently selected pasta
// we'd like to add to the Home component a "memory"... a state!

// Let's add a state to the Home component
// We can add a state to any CLASS COMPONENT
// ...and Home unfortunately right now is a FUNCTIONAL COMPONENT :(
// so, let's convert Home to become a Class Component :)

class Home extends Component {
  // just Class Components can have a state object!

  // we have EVERY TIME to create our own class components extending
  // Component, which is the main class component React has to offer

  // now that we have a Class Component, we can use some superpowers
  // like e.g. the STATE OBJECT

  // the state object is a short-term memory for a Class Component
  // it will help you remembering things or keeping its internal state tidy

  // let's create this state!
  state = {
    // it has to be called state!

    // notice how in classes we don't have to initialize variables/methods
    // done! now we can put here anything we'd like to remember
    selectedPasta: null, // null is a VERY falsy value!
    // since we didn't click on any pasta yet, initial
    // value is going to be null
  }

  // render() is the ONLY MANDATORY method in a class component!
  render() {
    return (
      // let's wrap everything in a REACT FRAGMENT <></>
      <>
        <h2>Welcome to Epistaurant!</h2>
        <p>The most famous pasta restaurant</p>
        <Carousel>
          {/* I want to create a dynamic number of slides,
            based on the number of pastas in the menu.json */}
          {items.map((pasta) => {
            // what are we going to do with each pasta?
            // we're going to generate a carousel slide

            // pasta is an object of the array! a different one every time
            return (
              <Carousel.Item
                key={pasta.id} // helps React figuring out the difference
                // in between all the dynamically generated elements!
                onClick={() => {
                  console.log('Clicked!')
                  // now I want to change the value of selectedPasta in
                  // the state with the pasta object I just clicked on...
                  // problem: the state object is READ-ONLY
                  // state.selectedPasta = 'stefano' <-- DOESN'T WORK!
                  this.setState({
                    // let's pass a new state object to this.setState()
                    // this object will be merged with the existing state
                    selectedPasta: pasta, // pasta is the current pasta object!
                    // the one you just clicked on :)
                  })
                }}
              >
                {/* this key prop is essential for PERFORMANCE reasons */}
                <img
                  className="d-block w-100"
                  src={pasta.image}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{pasta.name}</h3>
                  <p>{pasta.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })}
        </Carousel>
        {/* let's create now the reviews section, based on the comments
        of the current selectedPasta */}

        <h3>
          You clicked{' '}
          {this.state.selectedPasta
            ? this.state.selectedPasta.name
            : 'nothing yet'}
          {/* ALTERNATE SOLUTION */}
          {/* {this.state.selectedPasta?.name} */}
          {/* called 'OPTIONAL CHAINING' */}
        </h3>
        <DishComments currentPasta={this.state.selectedPasta} />
      </>
    )
  }
}

export default Home
