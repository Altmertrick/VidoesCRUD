import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';

import {createStream} from '../../actions';

class StreamCreate extends React.Component{

  renderError({touched, error}){
    if(touched && error){
      return(
        <div className="ui error message">
        <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) =>{    
    console.log(meta);
    const classError = `field ${meta.touched && meta.error? 'error': ''}`;
    return(
      <div className={classError}>
        <label>{label}</label>
        <input {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    )
  }

  onFormSubmit = (formValues) =>{
    console.log(formValues);
    this.props.createStream(formValues);
  }

  render(){
     
    return (      
      <form 
       onSubmit={this.props.handleSubmit(this.onFormSubmit)}
       className="ui form error"
      >
        <Field 
         name="title"
         component={this.renderInput}
         label="Enter Title"
        />
        <Field
         name="description"
         component={this.renderInput} 
         label="Enter Description"
        />
        <button className="ui button">Submit</button>
      </form>
    );
  }  
}

const validate =  (formValues)=>{
  const errors = {};

  if(!formValues.title){
    errors.title = 'You must enter title!';
  }
  if(!formValues.description){
    errors.description = 'You must enter description!';
  }

  return errors; 
}

const WrappedForm =  reduxForm({
  form: 'createStream',
  validate
})(StreamCreate);

export default connect(null, {createStream})(WrappedForm)