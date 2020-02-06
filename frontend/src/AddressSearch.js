import React from 'react';

class AddressSearch extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      address: ''
    }
  }


  handleChange = async (event) => {
    this.setState({address: event.target.value});
    const result = await fetch(`http://localhost:4000/address/getAddress/${event.target.value}`);
    const {value: addressId, label: address} = await result.json();

    if (addressId !== "0000") {
      this.setAddress(address, addressId);
    }
  };

  setAddress = (address, addressId) => {
    this.setState({address});
    this.props.addressCallback(addressId);
  };

  render() {
    return (
      <div className={'field'}>
        <label htmlFor={"addressInput"} className={'label'}>Adresse: </label>
        <input id={'addressInput'} type="text" className={'input'} value={this.state.address}
               onChange={this.handleChange}/>
      </div>
    );
  }
}

export default AddressSearch
