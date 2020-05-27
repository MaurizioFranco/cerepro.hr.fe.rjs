import React, {Component} from 'react';
import './CandidateUpdateForm.css';
import * as Constants from '../../../constants' ;
import * as Commons from '../../../commons.js' ;
import CandidateUpdateFormPositionCodeSelect from './CandidateUpdateFormPositionCodeSelect.js' ;
import CandidateProfileCVDownloadImage from '../CandidateProfileCVDownloadImage.js' ;

import CandidateProfileImage from '../CandidateProfileImage.js';
import { Redirect, withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap';

class CandidateUpdateForm extends Component {
	
	componentDidMount() {			
		Commons.debugMessage("CandidateUpdateForm.componentDidMount - START");
//		this.fetchCourseCodes.bind(this);
//		this.fetchCourseCodes();
		this.fetchUserDetail();
      }
	
	constructor (props) {
		super(props);
		const { match: { params } } = props;
		Commons.debugMessage("constructor - DEBUG - id: " + params.id);
		this.goBack = this.goBack.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.state = {
				currentCandidateId : params.id,
				courseCodes : [],
				id: '',
				firstname : '',
				lastname : '',
				email: '',
				courseCode: '',
				oldCV: '',
				oldImg: '',
				domicileCity: '',
				studyQualification: '',
				graduate: false,
				highGraduate: false,
				stillHighStudy: false,
				
				
				
				
				redirect: false
		}
		
		this.loggedUserId = Commons.getUserLoggedId() ;
	}
	
	fetchCourseCodes = () =>{
		Commons.executeFetch (Constants.FULL_COURSECODE_API_URI, 'GET', this.setCourseCodes);
	}
	
	fetchUserDetail = () =>{
		Commons.debugMessage("CandidateUpdateForm.fetchUserDetail - DEBUG - id: " + this.state.currentCandidateId);
		Commons.executeFetch (Constants.FULL_CANDIDATE_API_URI + this.state.currentCandidateId, 'GET', this.setCurrentCandidate);
	}
	
	setCurrentCandidate = (responseData) => {
		Commons.debugMessage("CandidateUpdateForm.setCurrentCandidate - START - destructuring");
		let {id, firstname, lastname, email, courseCode, imgpath, cvExternalPath, 
			domicileCity, studyQualification, graduate, highGraduate, stillHighStudy} = responseData ;
		this.setState({ 
			    id: id,
			    firstname: firstname,
			    lastname: lastname,
			    email: email,
			    courseCode: courseCode,
			    oldImg: imgpath,
			    oldCV: cvExternalPath,
			    domicileCity: (domicileCity!==null?domicileCity:''),
			    studyQualification: (studyQualification!==null?studyQualification:''),
			    graduate: (graduate!==null?graduate:false),
			    highGraduate: (highGraduate!==null?highGraduate:false),
			    stillHighStudy: (stillHighStudy!==null?stillHighStudy:false),
			});
	}
	  
	  handleSubmit(event) {
   	      Commons.debugMessage("CandidateUpdateForm.handleSubmit - START");
   	      Commons.debugMessage(this.state);
	      event.preventDefault();
	    this.sendUpdateRequest();
	  }
	
	sendUpdateRequest = () => {
		const formData = new FormData();

		const fileInput = document.querySelector("#imgpath");
		if (fileInput.files[0]!==undefined) {
			console.log("fileInput: " + fileInput);
			console.log("fileInput.files[0]: " + fileInput.files[0]);
			console.log("fileInput.files[0].name: " + fileInput.files[0].name);
			formData.append("files", fileInput.files[0])
			formData.append("imgpath", fileInput.files[0].name)
		}
		const fileInput2 = document.querySelector("#cvpath");
		if (fileInput2.files[0]!==undefined) {
			console.log("fileInput2: " + fileInput2);
			console.log("fileInput2.files[0]: " + fileInput2.files[0]);
			console.log("fileInput2.files[0].name: " + fileInput2.files[0].name);
			formData.append("files", fileInput2.files[0])
			formData.append("cvExternalPath", fileInput2.files[0].name)
		}
		
	    formData.append("firstname", this.state.firstname);
	    formData.append("lastname", this.state.lastname);
	    formData.append("email", this.state.email);
	    formData.append("oldImg", this.state.oldImg);
	    formData.append("oldCV", this.state.oldCV);
	    formData.append("userId", this.loggedUserId);
	    formData.append("insertedBy", this.loggedUserId);
	    formData.append("positionCode", this.state.courseCode);
	    
	    formData.append("domicileCity", this.state.domicileCity);
	    formData.append("studyQualification", this.state.studyQualification);
//	    Commons.debugMessage("this.state.graduate: " + this.state.graduate);
	    formData.append("graduate", this.state.graduate);
	    formData.append("highGraduate", this.state.highGraduate);
	    formData.append("stillHighStudy", this.state.stillHighStudy);
	    
	    
	    
	    
	    
	    
	    formData.append("candidateStatusCode", 100);
	    
//	    Commons.debugMessage(formData);
	    Commons.executeFetch (Constants.FULL_CANDIDATE_API_URI + this.state.currentCandidateId, 'PUT', this.redirectToCandidatesList, this.callbackKoFunction, formData);
		
	}
	
	callbackKoFunction = () => {
		alert ("INSERIMENTO KO") ;
	}
	
	redirectToCandidatesList = () => {
	    this.setState({
	      redirect: true
	    })
	}
	
	renderRedirect = () => {
	    Commons.debugMessage("CandidateUpdateForm.renderRedirect - START - this.state.redirect: " + this.state.redirect);
	    if (this.state.redirect) {
	    	Commons.debugMessage("CandidateUpdateForm.renderRedirect - START - this.state.courseCode: " + this.state.courseCode);
//	    	  let target = '/candidates/'+this.state.positionCode ;
	    	let target = '/candidates/' + this.state.courseCode;
	        return <Redirect to={target} />
	    }
	}
	
    handleInputChange(event) {
	    const value = event.target.value;
	    const name = event.target.name;
	    this.setState({
		      [name]: value,    });
	}

    handleCheckboxChange(event) {
	    const checked = event.target.checked;
	    const name = event.target.name;
	    Commons.debugMessage("CandidateUpdateForm.handleCheckboxChange - START - name: " + name + " - checked: " + checked);
	    this.setState({[name]: checked});
	    console.log(this.state);
	}
    
    goBack(event){
    	event.preventDefault();
        this.props.history.goBack();
    }
    
    setCandidateNewPositionCode = (code) => {
    	Commons.debugMessage("code: " + code);
//    	this.setState({candidate: { courseCode: code}});
//    	this.state.courseCode = code ;
    	this.setState({courseCode: code});
//    	this.setState({positionCode: this.state.candidate.courseCode });
    }
	
	render () {
		return (
			<div className="panel-container">
			    {this.renderRedirect()}
			    <div className="panel">
			        <div className="panel-heading">
			           Modifica candidato
			        </div>
			        <div className="panel-body">
			            <form onSubmit={this.handleSubmit}>
				            <div className="row">
				                <div className="col-25">
                                    <label>Nome</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" className="candidate-input-form" name="firstname" placeholder="Nome" onChange={this.handleInputChange} value={this.state.firstname} required/>
                                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label >Cognome</label>
				                </div>
				                <div className="col-75">
				                    <input type="text" className="candidate-input-form" name="lastname" placeholder="Cognome" onChange={this.handleInputChange} value={this.state.lastname} required/>
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Email</label>
				                </div>
				                <div className="col-75">
				                    <input type="email" className="candidate-input-form" name="email" placeholder="Email" onChange={this.handleInputChange} value={this.state.email} required/>
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Domicilio</label>
				                </div>
				                <div className="col-75">
				                    <input type="text" className="candidate-input-form" name="domicileCity" placeholder="Domicilio" onChange={this.handleInputChange} value={this.state.domicileCity} />
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Titolo di studio</label>
				                </div>
				                <div className="col-75">
				                    <input type="text" className="candidate-input-form" name="studyQualification" placeholder="Laurea/Diploma in..." onChange={this.handleInputChange} value={this.state.studyQualification} />
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Laureato</label>
				                </div>
				                <div className="col-75">
				                    <input
				                    name="graduate"
				                    type="checkbox"
				                    checked={this.state.graduate}
				                    onChange={this.handleCheckboxChange} 
				                    className="form-control" />
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Laurea Magistrale (già conseguita)</label>
				                </div>
				                <div className="col-75">
				                    <input
				                    name="highGraduate"
				                    type="checkbox"
				                    checked={this.state.highGraduate}
				                    onChange={this.handleCheckboxChange} 
				                    className="form-control" />
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Laurea in corso</label>
				                </div>
				                <div className="col-75">
				                    <input
				                    name="stillHighStudy"
				                    type="checkbox"
				                    checked={this.state.stillHighStudy}
				                    onChange={this.handleCheckboxChange} 
				                    className="form-control" />
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Posizione</label>
				              </div>
				              <div className="col-75">
				              {/*
					              <select name="positionCode" className="candidate-input-form" onChange={this.handleInputChange} required>
					              {this.state.courseCodes.map((e, key) => {
							        	if (this.state.candidate.courseCode===e.code) {
							        		return <option key={key} defaultValue value={e.code}>{e.title}</option>;	
							        	} else {
							        		return <option key={key} value={e.code}>{e.title}</option>;
							        	}
							        })}
						          </select>
						       */}
						          <CandidateUpdateFormPositionCodeSelect defaultValue={this.state.courseCode} setCandidateNewPositionCode={this.setCandidateNewPositionCode}/>
				              </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Allega CV(.doc,.pdf,.docx,.odt)</label>
				                </div>
				                <div className="col-75">
				                    <CandidateProfileCVDownloadImage cvExternalPath={this.state.oldCV} />
				                    &nbsp;&nbsp;&nbsp;
				                    <input type="file" id="cvpath" accept=".doc,.pdf,.docx,.odt" />
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Allega immagine profilo(.png,.jpeg,.gif,.jpg)</label>
				                </div>
				                <div className="col-75">
				                    <CandidateProfileImage img={this.state.oldImg}/>
				                    &nbsp;&nbsp;&nbsp;
				                    <input type="file" id="imgpath" accept=".png,.jpeg,.gif,.jpg" />
				                </div>
				            </div>
				            <div className="row insert-form-buttons">
				                <Button type="submit" variant="secondary">MODIFICA</Button>
				                &nbsp;&nbsp;&nbsp;&nbsp;
				                <Button variant="warning" onClick={this.goBack}>Annulla</Button>
				            </div>
			            </form>
		            </div>
	            </div>
	        </div>
		);
	}
}

export default withRouter(CandidateUpdateForm);
