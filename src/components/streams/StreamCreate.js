import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import StreamFrom from './StreamForm';
import {createStream} from '../../actions';

class StreamCreate extends React.Component{

  onSubmit = (formValues) =>{
    console.log(formValues);
    this.props.createStream(formValues);
  }

  render(){     
    return (      
     <div>
      <h3>Create a Stream</h3>
      <StreamFrom onSubmit={this.onSubmit} />
     </div>
    );
  }  
}

export default connect(null, {createStream})(StreamCreate);