import React from 'react';

class TypeButton extends React.Component{
  clickHandler = () => {
    this.props.clickHandler(this.props.fileType.name);
  };

  getClassName = () => {
    return this.props.fileType.active ? 'button is-success' : 'button';
  };

  render(){
    return <span className={this.getClassName()} onClick={this.clickHandler}>{this.props.fileType.name}</span>
  }

}

export default TypeButton
