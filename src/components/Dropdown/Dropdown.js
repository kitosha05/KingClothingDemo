import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const Dropdown = ({handleSelect}) => {
    return(
        <Dropdown onSelect={handleSelect(e)}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
         {dropDownLabel}
         </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item eventKey="1" active>1</Dropdown.Item>
             <Dropdown.Item eventKey="2">2</Dropdown.Item>
             <Dropdown.Item eventKey="3">3</Dropdown.Item>
             <Dropdown.Item eventKey="4">4</Dropdown.Item>
             <Dropdown.Item eventKey="5">5</Dropdown.Item>
         </Dropdown.Menu>
    </Dropdown>
    )
}
export default Dropdown