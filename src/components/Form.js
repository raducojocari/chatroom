import React from 'react';
import './Form.css';




class Form extends React.Component {

	constructor(props) {
		super(props);
		this.state = { message: '' };
		this.state = { itemArray: []};
	}

	mySubmitHandler = (event) => {
		event.preventDefault();

		this.renderNewMessage();
	}

	renderNewMessage = () => {
		const item = this.state.itemArray;
		if (this.state.message !== '') {
			item.push(
				<>
					{this.state.message}
				</>
			)
			this.setState({itemArray: item})
		}
		this.clearForm();
	}

	scrollForm = () => {
		setTimeout(() => {
			let objDiv = document.getElementById("form_box");
			objDiv.scrollTop = objDiv.scrollHeight;
		}, 1)
	}

	clearForm = () => {
		document.getElementById("myForm").reset(); 
		this.setState({message: ''})
		this.scrollForm();
	}

	myChangeHandler = (event) => {
		this.setState({message: event.target.value});
	}

	render () {

		return (
			<>
				<h1>Form here</h1>

				<form onSubmit={this.mySubmitHandler} id="myForm" className="form">
					<div id="form_box" className="form_box">
						{this.state.itemArray.map((item, index) => {
						return (
							<div className="form_box_blocks" key={index}>{item}</div>
						)
						})}
					</div>
					<div>
						<input
							className="form_input"
							type='text'
							onChange={this.myChangeHandler}
							placeholder="Enter message..."
						/>
						<input
							type='submit'
						/>
					</div>
				</form>
			</>
		);

	}

}

export default Form;