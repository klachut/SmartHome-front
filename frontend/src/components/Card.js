import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SensorCard = ({sensor, handleToggleSensor, handleRemoveSensor}) => {

    return (
        <Card className='sensorsCard'>
  <Card.Header>{sensor.type}
  <Button variant="danger" className="removeButton" onClick={()=>handleRemoveSensor(sensor._id)}>Remove</Button>
  </Card.Header>
  <Card.Body>
    <Card.Title>{sensor.name}</Card.Title>
    <Card.Text>
      {sensor.room}
    </Card.Text>
    {sensor.isActivated 
    ?
     <Button variant="primary" className="cardActiveButton" onClick={()=>handleToggleSensor(sensor._id, false)}>Active</Button> 
     :  <Button variant="danger" onClick={()=>handleToggleSensor(sensor._id, true)}>Not active</Button>}
  </Card.Body>
</Card>
    )
}



export default SensorCard;