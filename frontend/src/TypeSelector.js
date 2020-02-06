import React from 'react';
import TypeButton from './TypeButton';

class TypeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileTypes :[
        {name: 'ical', active: true},
        {name: 'json', active: false},
        // {name: 'rss', active: false}
      ]
    }
  }

  setType = (chosenTypeName) => {
    const newTypes = this.state.fileTypes.map((type) => {
      return {
        name: type.name,
        active: (type.name === chosenTypeName)
      }
    });

    this.setState({fileTypes: newTypes});
    this.props.typeCallback(chosenTypeName);
  };

  render() {
    console.log('rendering');
    const buttons = this.state.fileTypes.map((fileType) =>
      <TypeButton clickHandler={this.setType} fileType={fileType} />
    );

    return (
      <div className={'field'}>
        <label className={'label'}> Vælg type</label>
        <div className="buttons has-addons">
          {buttons}
        </div>
      </div>
    );
  }
}

export default TypeSelector;
