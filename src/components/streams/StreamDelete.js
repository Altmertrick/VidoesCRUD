import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamDelete extends React.Component {

  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id)
  }

  renderActions(){
    return (
      <React.Fragment>
        <button className="ui negative button">Delete</button>
        <button className="ui button">Cancel</button>
      </React.Fragment>
    );
  }

  renderContent(){
    if(!this.props.stream){
    return `Are you sure yuo want to delete stream?`;
    }

    return `Are you sure you want to delete stream with title ${this.props.stream.title}`

  }

  render(){
    return (
      <Modal 
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={()=> history.push('/')}
      />      
    );
  }
}

const mapStateToProps = (state, ownProps) =>{
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchStream})(StreamDelete);