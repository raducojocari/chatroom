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
		item.push(
			<>
			{this.state.message}
			</>
		)
		this.setState({itemArray: item})

		// this.updateScroll();
		this.clearForm();
	}

	clearForm = () => {
		document.getElementById("myForm").reset(); 
		this.setState({message: ''})
	}

	myChangeHandler = (event) => {
		this.setState({message: event.target.value});
	}

	render () {

		return (
			<>
				<h1>Form here</h1>

				<form onSubmit={this.mySubmitHandler} id="myForm" className="form">
					<div className="form_box">
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