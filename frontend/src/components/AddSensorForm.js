import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const AddSensorsForm = ({ setSensors, user }) => {
	const [error, setError] = useState("");

	const nameRef = useRef();
	const roomRef = useRef();
	const typeRef = useRef();

	const handleAddSensor = async e => {
		e.preventDefault();

		if (nameRef.current.value.length < 3) {
			setError("Name must have at least 3 characters");
			return;
		}
		if (roomRef.current.value.length < 3) {
			setError("Room must have at least 3 characters");
			return;
		}
		if (typeRef.current.value.length < 3) {
			setError("Type must have at least 3 characters");
			return;
		}
		setError("");

		const headers = {
			Authorization: `Bearer ${user.token}`,
		};

		const response = await axios({
			method: "post",
			url: `${process.env.REACT_APP_URL_BASE}/api/v1/sensors`,
			data: {
				name: nameRef.current.value,
				room: roomRef.current.value,
				type: typeRef.current.value,
			},
			headers,
		});

		const newSensor = response.data;
		setSensors(prev => [...prev, newSensor]);

		nameRef.current.value = "";
		roomRef.current.value = "";
		typeRef.current.value = "";
	};

	return (
		<div className='d-flex justify-content-center'>
			<Card
				className='p-5 border border-secondary ml-3 mt-3 h-2 d-flex justify-content-center'
				style={{ width: "70rem" }}>
				<Form className='addSensorWrapper' onSubmit={handleAddSensor}>
					<h1>Add new sensor</h1>
					<Form.Group className='mb-3'>
						<Form.Label>Name</Form.Label>
						<Form.Control placeholder='Enter name' ref={nameRef} />
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Room</Form.Label>
						<Form.Control placeholder='Enter room' ref={roomRef} />
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Type</Form.Label>
						<Form.Control placeholder='Enter type' ref={typeRef} />
					</Form.Group>
					<Button variant='primary' type='submit' className='loginButton'>
						Add
					</Button>
					{error ? <Alert variant='danger'>{error}</Alert> : null}
				</Form>
			</Card>
		</div>
	);
};

export default AddSensorsForm;
