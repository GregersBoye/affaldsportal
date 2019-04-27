import React from 'react';

class TypeSelector extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            active: 'ical'
        }
    }

    switchType = (chosenType) => {
        this.setState({active: chosenType});

    };

    render(){

      const classes = {
        json: this.state.active === 'json' ? 'button is-success': 'button',
        ical: this.state.active === 'ical' ? 'button is-success': 'button',
        rss: this.state.active === 'rss' ? 'button is-success': 'button',
      };

        return (
          <div className={'field'}>
            <label className={'label'}> Vælg type</label>
          <div className="buttons has-addons">
              <span className={classes.json} onClick={() => {this.switchType('json')}}>JSON</span>
              <span className={classes.ical} onClick={() => {this.switchType('ical')}}>ICAL</span>
              <span className={classes.rss}  onClick={() => {this.switchType('rss')}}>RSS</span>
          </div>
          </div>
        );
    }
}

export default TypeSelector;
