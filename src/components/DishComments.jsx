import { ListGroup } from 'react-bootstrap'

const DishComments = (props) => {
  return (
    <ListGroup>
      {props.currentPasta?.comments.map((c) => {
        // why the ?
        // currentPasta in Home is connected to the state.selectedPasta
        // therefore, it can also be null initially!
        // ? checks just that
        return (
          <ListGroup.Item key={c.id}>
            {c.rating} | {c.comment}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default DishComments
