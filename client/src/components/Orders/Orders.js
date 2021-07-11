import React, {useEffect, useState} from 'react';
import {connect,  useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import Title from '../Title/Title';
import {fetchOrdersStart} from '../../redux/orders/orderActions'
import { all } from '@redux-saga/core/effects';
import { updateOrder } from '../../firebase/firebase.utils';
import CustomModal from '../Modal/Modal'

// Generate Order Data
function createData(id, date, name, city, state, status,action,total, cartItems) {
 
  return { id, date, name, city, state, status,action, total, cartItems };
}

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


const Orders=({allOrders, fetchOrdersStart}) =>{
  
  const [show, setShow] = useState('');

const [rows, setRows]= useState([])
  const handleClose = () => setShow(false);
  const handleShow = (orderId) => {
  setShow(orderId)
}

useEffect(()=>{
  if(allOrders){
    getRows()
  }

},[allOrders])

const getRows=()=>{
  const rows = allOrders.sort((a, b) => b.orderDate - a.orderDate).map(order=>{
    const {status} = order
    if(status!=='started'){
      const {orderDate, 
        total,  
        cartItems,
        currentUser,
        shippingCity, 
        shippingState, 
        status,
        billingName,
        billingEmail,
        shippingMethod,
        shippingFee,
        id} = order

      const dateString=orderDate.toDate().toDateString()
      let action=''
      if(status==='Prepare For Pickup') action = 'Mark As Ready'
      if(status==='Prepare For Shipping')action = 'Ship Order'
      if(status==='Pending Pickup') action='Mark As Picked Up'
      if(status==='Complete') action='ORDER COMPLETE'
      
      return (createData(id,dateString,billingEmail,shippingCity,shippingState,status,action, total, cartItems))
    }
 })
 setRows(filterRows(rows))
}

const filterRows=(rows)=>{
return rows.filter(row=>row!==undefined)
}

 const readyForPickUp = async(orderId)=>{
  
   //update order status to waiting for pickup
   const order = {status:'Pending Pickup'}
   const updatedOrder = await updateOrder({order,orderId})
   //send customer email with instructions for pickup
   //change action button
   sendReadyForPickUpEmail(updatedOrder)
   fetchOrdersStart()
   handleClose()
 }

 const sendReadyForPickUpEmail=(order)=>{
  window
  .fetch('/email/ready-for-pickup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
 }
 const readyForShipping=async(orderId, trackingNumber, actualShippingCost)=>{
  handleClose()
  const order={status:'Complete', trackingNumber:trackingNumber, actualShippingCost:actualShippingCost}
  const updatedOrder = await updateOrder({order,orderId})
  sendShippingConfirmation(updatedOrder)
 fetchOrdersStart()
}

const sendShippingConfirmation=(order)=>{
  window
  .fetch('/email/shipping-confirmation', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
 }

 const wasPickedUp =async(orderId)=>{
  
   const order= {status:'Complete'}
   const updatedOrder = await updateOrder({orderId, order})
  sendPickedUpConfirmation(updatedOrder)
   fetchOrdersStart()
   handleClose()
 }

 const sendPickedUpConfirmation=(order)=>{
  window
  .fetch('/email/was-picked-up', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
 }

 
  const classes = useStyles();
  if(!allOrders)return<div>Loading...</div>
  return (
    <React.Fragment>
      <Title>All Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Next Step</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{
                row.status==='Complete' ? (
                  <Button variant="outline-success" disabled>{row.action}</Button>
                ) : (
                  <Button variant='contained' color='primary' onClick={()=>handleShow(row.id)}>{row.action}</Button>

                )
                }

              </TableCell>
              <TableCell align="right">${row.total}</TableCell>
              <TableCell><Link to={`/admin/orders/${row.id}`}>VIEW</Link></TableCell>
              <CustomModal
                handleClose={handleClose}  
                cartItems={row.cartItems} 
                status={row.status} 
                orderId={row.id}
                handleConfirm={(row.status==='Prepare For Pickup') ? readyForPickUp : (row.status==='Prepare For Shipping') ? readyForShipping : wasPickedUp}show={show===row.id}/>
            </TableRow>
          ))}
        </TableBody>
        

      </Table>


    </React.Fragment>
  );
}
const mapDispatchToProps=dispatch=>({
  fetchOrdersStart: ()=>dispatch(fetchOrdersStart())
})
export default connect(null, mapDispatchToProps)(Orders) 