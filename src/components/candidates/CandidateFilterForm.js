import React, {Component} from 'react';
import './candidates.css';

class CandidateFilterForm extends Component {
//	constructor (props) {
//		super(props);
//		console.log("this.props: ");
//		console.log(this.props);
//		this.setState({selectedCourseCode: this.props.selectedCourseCode});
//		this.state= {selectedCourseCode: this.props.selectedCourseCode};
//		console.log("email ricevuta: " + this.props.email);
//		console.log("this.props.selectedCourseCode: ");
//		console.log(this.props.selectedCourseCode);
//		this.courses = ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05'] ;
		
//		this.state = {
//		    filterInputText:''
//		}
//	}
	
//	onChangeFilter = (event) => {
////		console.log(event.target.value);
//		this.setState({filterInputText:event.target.value});
//		
//	} 
//	
	searchFormSubmit = (event) => {
		console.log(event.target.value);
		//this.props.onSearchFormSubmit(this.state.filterInputText);
		this.props.onSearchFormSubmit(event.target.value);
//		event.preventDefault();
	}
	
	render () {
		return (
				
				
				<input type="text" name="filter" className="candidates-list-input-filter" onChange={this.searchFormSubmit}/>
		);
	}
}

export default CandidateFilterForm ;
