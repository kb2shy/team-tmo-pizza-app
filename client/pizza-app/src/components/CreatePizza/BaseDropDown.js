import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../common/Button/StyledButton'

//Creates a row with title and all necessary radio buttons
export default class BaseDropDown extends React.Component {
    render() {
        return (
        <div>
            <h5>{this.props.type}</h5>
            <DropdownButton variant="basicButton" id="dropdown-basic-button" title={this.props.value}>
                {this.props.options.map((item) => {
                    return (
                        <Dropdown.Item
                            
                            key={this.props.type === 'Size' ? item.type : item}
                            name={this.props.type}
                            onClick={(e) => {
                                this.props.type === 'Size' 
                                ? this.props.handleChange(this.props.type, item.type, item.price) 
                                : this.props.handleChange(this.props.type, item);
                            }}
                        >
                            {this.props.type === 'Size' ? `${item.type} - $${item.price.toFixed(2)}` : `${item}`}
                        </Dropdown.Item>
                    );
                })}
            </DropdownButton>
        </div>
        );
    }
}