import React, {Component} from "react";
import "bulma";

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            address: 'my address'
        }
    }

    handleChange = async (event) => {
        this.setState({address: event.target.value});
        const result = await fetch("http://localhost:4000/address/getServices?addId=17034")
        console.log(result);

    };
    render() {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">
                        Hello World
                    </h1>
                    <p className="subtitle">
                        My first website with <strong>Bulma</strong> and <strong>React</strong>!
                    </p>
                    <input type="text" value={this.state.address} onChange={this.handleChange}/>
                </div>
            </section>
        );
    }
}

export default Main;