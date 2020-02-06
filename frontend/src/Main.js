import React, {Component} from "react";
import "bulma";
import TypeSelector from './TypeSelector';
import AddressSearch from './AddressSearch';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type:'ical',
      addressId: null
    }
  }

  generateFile = () => {
    if(this.state.addressId !== null){
      return `http://localhost:4000/address/${this.state.type}/${this.state.addressId}`
    }
    return '';
  };

  setAddress = (addressId) => {
    this.setState({addressId })
  };

  setType = (type) => {
    this.setState({type: type});
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">
            Affaldsportalen - Støvring kommune
          </h1>
          <p className="subtitle">
            Se tider for hvornår du får hentet dagrenovation, genbrug og storskrald i kalender!
          </p>
          <AddressSearch addressCallback={this.setAddress}/>
          <TypeSelector typeCallback={this.setType} initialType={this.state.type}/>
          <strong>Bemærk! Vi har kun dato for <em>næste</em> dagrenovation</strong>


          <p>Url til din personlige .{this.state.type}-fil: <br/>
            {this.generateFile()}</p>
        </div>
      </section>
    );
  }
}

export default Main;
