import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title/Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

// const data = [
//   createData('12:00AM', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];

export default function Chart({allOrders}) {

  const todaysOrders = !allOrders ? [] : (allOrders.map(order=>{
    if(order.status!=='started'){
      const {orderDate, orderTotal} = order
       if (isToday(orderDate.toDate())){
      // const hour = orderDate.toDate().getHours()
      // const minutes = orderDate.toDate().getMinutes()
      // const time = `${hour}:${minutes}`
      return createData(orderDate.toDate(), orderTotal)
    }

    }
    
    return null
   })
 )

 const unsortedData= !todaysOrders ? [] : (todaysOrders.filter(order=>order!==null))

 const sortData= (unsortedData) =>{
   return unsortedData.sort((a,b)=>a.time-b.time)
 }
let accumalatedTotalSales = 0
 const data =sortData(unsortedData).map(order=>{
  const {time, amount} = order
  accumalatedTotalSales+= amount
  const hour = time.getHours()
     let minutes = time.getMinutes()
     if(minutes<10){minutes = `0${minutes}`}
     const formattedTime = `${hour}:${minutes}`

   return createData(formattedTime, accumalatedTotalSales)
})

 
  const theme = useTheme();


  return (
    <React.Fragment>
      <Title>Total Sales Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}