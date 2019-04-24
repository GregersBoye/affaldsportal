import React from 'react';

class TypeSelector extends React{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div class="buttons has-addons">
            <span class="button is-success is-selected">Yes</span>
            <span class="button">Maybe</span>
            <span class="button">No</span>
        </div>
        );
    }
}

export default TypeSelector;
