import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import "../common/Button/Button.css"

//Creates a row with title and all necessary radio buttons
export default class BaseDropDown extends React.Component {
    render() {
        return (
        <div>
            <DropdownButton id="dropdown-basic-button" title={this.props.value}
            variant="basicButton">
                {this.props.options.map((item) => {
                    return (
                        <Dropdown.Item
                            key={item.type}
                            name={this.props.type}
                            onClick={(e) => this.props.handleChange(this.props.type, item)}
                        >
                            {this.props.type === 'Size' ? `${item.type} - $${item.price.toFixed(2)}` : `${item.type}`}
                        </Dropdown.Item>
                    );
                })}
            </DropdownButton>
        </div>
        );
    }
}