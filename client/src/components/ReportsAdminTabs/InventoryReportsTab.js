import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import InventoryValueByCollectionBarChart from '../Chart/InventoryValueByCollectionBarChart'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const InventoryReportsTab = ({products})=>{
    const [totalInventoryValue, setTotalInventoryValue]=useState(0)
    return(
        <Col>
        <Row className='text-center mb-3'>
            <h1>Current Inventory: ${totalInventoryValue}</h1>
        </Row>
        <Row>
            <Col className='text-center'>
            <Row>
                <h4>Inventory By Collection (in $)</h4>
            </Row>
            <Row className='justify-content-center align-items-center'>
             <InventoryValueByCollectionBarChart products={products} setTotalInventoryValue={setTotalInventoryValue}/>
            </Row>
           
            </Col>
        </Row> 
        </Col>
    )
}
export default InventoryReportsTab