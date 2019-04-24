import React, {Component} from "react";
import "bulma";
// import TypeSelector from './TypeSelector';


class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            address: ''
        }
    }

    handleChange = async (event) => {
        this.setState({address: event.target.value});
        const result = await fetch(`http://localhost:4000/address/getAddress/${event.target.value}`);
        const data = await result.json();
        console.log(data);

    };
    render() {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">
                        Affaldsportalen
                    </h1>
                    <p className="subtitle">
                        Se tider for hvornår du får hentet dagrenovation, genbrug og storskrald i kalender!
                    </p>
                    <div>
                    <label htmlFor={"addressInput"}>Adresse: </label>
                    <input id={'addressInput'} type="text" className={'input'}  value={this.state.address} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <div className="buttons has-addons">
                            <span className="button is-success is-selected">Yes</span>
                            <span className="button">Maybe</span>
                            <span className="button">No</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Main;