import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component{

  renderInput({ input, label }){    
    return(
      <div className="field">
        <label>{label}</label>
        <input {...input} />
      </div>
    )
  }

  onFormSubmit(formValues){
    console.log(formValues);
  }

  render(){
     
      return (      
      <form 
       onSubmit={this.props.handleSubmit(this.onFormSubmit)}
       className="ui form"
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
  form: 'createStream'
})(StreamCreate);