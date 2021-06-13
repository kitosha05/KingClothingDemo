import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import './ProductAccordion.scss'

const ProductAccordion = () =>{
    return(
        <Accordion defaultActiveKey="0">
                                <Card className='accordion-card'>
                                 <Card.Header>
                                     <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                         Description
                                    </Accordion.Toggle>
                                 </Card.Header>
                                     <Accordion.Collapse eventKey="0">
                                         <Card.Body>
                                             Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                             when an unknown printer took a galley of type and scrambled it to make a type 
                                             specimen book. It has survived not only five centuries, but also the leap into 
                                             electronic typesetting, remaining essentially unchanged.
                                         </Card.Body>
                                     </Accordion.Collapse>
                                 </Card>
                                <Card>
                                 <Card.Header>
                                     <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                          Size Chart
                                    </Accordion.Toggle>
                                </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                             <Card.Body><Image src='https://c.zmags.com/assets/images/5ea75578faf7ea59dfe4af2a-optimized.png'/></Card.Body>
                                        </Accordion.Collapse>
                                 </Card>
                                 <Card>
                                 <Card.Header>
                                     <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                          Shipping & Returns
                                    </Accordion.Toggle>
                                </Card.Header>
                                        <Accordion.Collapse eventKey="2">
                                             <Card.Body>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                             when an unknown printer took a galley of type and scrambled it to make a type 
                                             specimen book. It has survived not only five centuries, but also the leap into 
                                             electronic typesetting, remaining essentially unchanged.</Card.Body>
                                        </Accordion.Collapse>
                                 </Card>
                            </Accordion>
    )
}

export default ProductAccordion