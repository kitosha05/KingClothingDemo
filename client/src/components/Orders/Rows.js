import React, {useEffect} from 'react'

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const prepareRows = (allOrders)=>{
     const rows = allOrders.map(order=>{
     const {orderDate, 
       orderTotal, 
       billing_name, 
       billing_address_city, 
       billing_address_state, 
       id} = order
       const dateString = orderDate.toDate().toDateString()
     return{
       dateString,
       orderTotal,
       billing_name,
       billing_address_city,
       billing_address_state,
       id
       }
     })    
   }

  

   
const OrderRows = ({allOrders})=>{
    
  useEffect(() => {
    
      if(allOrders){
       prepareRows(allOrders)
      }   
    }, [allOrders])

   


    
    
    
    if(!rows){
        return (<div>Loading...</div>)
     }
    rows.map((row) => {
                return(
                    <TableRow key={row.id}>
                    <TableCell>{row.dateString}</TableCell>
                    <TableCell>{row.billing_name}</TableCell>
                    <TableCell>{row.billing_address_city}</TableCell>
                    <TableCell>{row.billing_address_state}</TableCell>
                    <TableCell align="right">{row.orderTotal}</TableCell>
                  </TableRow>

                )
                
            })
       
     
        
    
    
}
export default OrderRows
