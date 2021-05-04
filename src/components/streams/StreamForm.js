import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component{

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
    const classError = `field ${meta.touched && meta.error? 'error': ''}`;
    return(
      <div className={classError}>
        <label>{label}</label>
        <input {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) =>{
    this.props.onSubmit(formValues);
  }

  render(){
     
    return (      
      <form 
       onSubmit={this.props.handleSubmit(this.onSubmit)}
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

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
