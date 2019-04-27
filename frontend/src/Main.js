import React, {Component} from "react";
import "bulma";
import TypeSelector from './TypeSelector';
import AddressSearch from './AddressSearch';

class Main extends Component {

    generateFile = () => {
      console.log(AddressSearch.state.address);
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
                        <AddressSearch />
                        <TypeSelector />

<div className={'field'}>
    <button className={'submit button is-link'} onClick={this.generateFile}>Generér fil</button>
</div>
                </div>
            </section>
        );
    }
}

export default Main;
