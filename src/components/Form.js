import React, {useState} from 'react';
import './Form.css';

const Form = (props)=> {
console.log('form props', props)
	const [currentMessage, setCurrentMessage]= useState();
	const mySubmitHandler = (event) => {
		event.preventDefault();
		if (currentMessage !== ''){
			props.onMessageSend(currentMessage)
		}
		clearForm();
	}


	const scrollForm = () => {
		setTimeout(() => {
			let objDiv = document.getElementById("form_box");
			objDiv.scrollTop = objDiv.scrollHeight;
		}, 1)
	}

	const clearForm = () => {
		document.getElementById("myForm").reset(); 
		setCurrentMessage('')
		scrollForm();
	}

	const myChangeHandler = (event) => {
		setCurrentMessage(event.target.value);
	}

	const remove = () => {
		// dispatch new acction to deelte message
	}

	// userStyle = () => {
	// 	return (
	// 		<div></div>
	// 	)
	// }

	return (

		<>
			<form onSubmit={mySubmitHandler} id="myForm" className="form">
				<div id="form_box" className="form_box">
					{props.message.map((m, index) => {
					return (
						<div key={index} id={m.username + index}>
							<>
							<span>
								{m.username}
							</span>
							<span className="form_box_blocks">
								{m.text}
								<span>
									{m.timestamp}
								</span>
							</span>
								{/* <a onClick={()=>{remove}}>&#10005;</a> */}
							</>
						</div>
					)
					})}
				</div>
				<div>
					<input
						id="form_input"
						className="form_input"
						type='text'
						onChange={myChangeHandler}
						placeholder="Enter message..."
						autoComplete="off"
					/>
					<input type='submit' className="form_submit"/>
				</div>
			</form>
		</>
	);

}

export default Form;