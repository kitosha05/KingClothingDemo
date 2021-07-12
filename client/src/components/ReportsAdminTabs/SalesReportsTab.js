import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import SalesWithNetMarginChart from '../Chart/SalesWithNetMarginChart';
import SalesWithGrossMarginPieChart from '../Chart/SaleswithGrossMarginPieChart';
import SalesByCollectionRadarChart from '../Chart/SalesByCollectionRadarChart';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SalesReportsTab = ({allOrders, products})=>{
    const [view, setView] = React.useState('month')
    const [data, setData] = React.useState(null)
    const [pieData, setPieData] = React.useState(null)
    const [grossSales, setGrossSales]= React.useState(null)
    const [radarData, setRadarData]= React.useState(null)

    useEffect(() => {
      
        if(allOrders && products)formatOrderData(view)
        console.log(allOrders)
        console.log(products)
       }, [products, allOrders, view])

       const formatOrderData = (view) =>{
        if(view==='month'){
            const orders =  ordersThisMonth()
            const pieData = preparePieData(orders)
            const radarData = prepareRadarData(orders)
            setPieData(pieData)
            setRadarData(radarData)
            //if view = month then get all days of this month
            const dailyTotals = getDailyTotals(orders)
            setData(dailyTotals.reverse())
        }
        if(view==='year'){
            const orders = ordersThisYear()
            const pieData = preparePieData(orders)
            const radarData = prepareRadarData(orders)
            setRadarData(radarData)
            setPieData(pieData)
            const monthlyTotals = getMonthlyTotals(orders)
            setData(monthlyTotals.reverse())
        } 
    }
    
    const prepareRadarData =(orders)=>{
      let hatsCOGS =0
      let hatsGrossSales = 0
      let jacketsCOGS =0
      let jacketsGrossSales = 0
      let sneakersCOGS =0
      let sneakersGrossSales = 0
      let womensCOGS =0
      let womensGrossSales = 0
      let mensCOGS =0
      let mensGrossSales = 0
    
      orders.map(order=>{
        order.cartItems.map(item=>{
          const cogs = getItemCOGS(item)
          if(item.collection==='Hats'){
            hatsCOGS+= cogs*item.quantity
            hatsGrossSales+=item.price*item.quantity
          }
          if(item.collection==='Jackets'){
            jacketsCOGS+= cogs*item.quantity
            jacketsGrossSales+=item.price*item.quantity
          }
          if(item.collection==='Mens'){
            mensCOGS+= cogs*item.quantity
            mensGrossSales+=item.price*item.quantity
          }
          if(item.collection==='Womens'){
            womensCOGS+= cogs*item.quantity
            womensGrossSales+=item.price*item.quantity
          }
          if(item.collection==='Sneakers'){
            sneakersCOGS+= cogs*item.quantity
            sneakersGrossSales+=item.price*item.quantity
          }
    
      })
    })
    
    const{cogs, grossMargin} = accumulateMarginAndCogs(orders)
    const grossSales = cogs+grossMargin
    const radarData=[
      {collection: 'Hats',
                A: (hatsGrossSales/grossSales)*100,
                B: (hatsGrossSales-hatsCOGS)/grossMargin*100
      },
      {collection: 'Jackets',
                A: (jacketsGrossSales/grossSales)*100,
                B: (jacketsGrossSales-jacketsCOGS)/grossMargin*100
      },
      {collection: 'Sneakers',
                A: (sneakersGrossSales/grossSales)*100,
                B: (sneakersGrossSales-sneakersCOGS)/grossMargin*100
      },
      {collection: 'Womens',
                A: (womensGrossSales/grossSales)*100,
                B: (womensGrossSales-womensCOGS)/grossMargin*100
      },
      {collection: 'Mens',
      A: (mensGrossSales/grossSales)*100,
      B: (mensGrossSales-mensCOGS)/grossMargin*100
    }
    
    ]
    return radarData
    }
    
    const preparePieData = (orders)=>{
       const {cogs, grossMargin, shippingCosts} = accumulateMarginAndCogs(orders)
        const pieData=[{name:'Shipping Costs', value: shippingCosts},{name:'Cost of Goods Sold', value: cogs}, {name: 'Gross Margin', value: grossMargin}]
        const totalSales=cogs+grossMargin
        setGrossSales(totalSales)
        return pieData
    }
    const accumulateMarginAndCogs=(orders)=>{
      let cogs =0
      let grossMargin=0
      let shippingCosts=0
      orders.map(order=>{
          cogs+=order.orderCOGS
          grossMargin+=order.orderGrossMargin
          shippingCosts+=order.shippingCost
      })
      return {cogs, grossMargin, shippingCosts}
    }
    const isThisWeek=(date) =>{
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();
      
        // get first date of week
        const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
      
        // get last date of week
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
      
        // if date is equal or within the first and last dates of the week
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
      }
    
      const isTargetDate = (targetDate, testDate) => {
      
        return testDate.toDate().getDate() == targetDate.getDate() &&
         testDate.toDate().getMonth() == targetDate.getMonth() &&
         testDate.toDate().getFullYear() == targetDate.getFullYear()
      }
      const isSameMonth = (targetDate, testDate) => {
      
        return testDate.toDate().getMonth() === targetDate.getMonth()
      }
    
      const isThisMonth = (someDate) => {
        const today = new Date()
        return someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear()
      }
      const isThisYear = (someDate) => {
        const today = new Date()
        return someDate.getFullYear() == today.getFullYear()
      }
    
       ////Sales today
       
    //    let todaysTotalSales = 0
    //   const todaysOrders = (completedOrders)=>{ 
        
    //      completedOrders.map(order=>{
    //     const {orderDate, total} = order
    //     if (isToday(orderDate.toDate())){
    //       todaysTotalSales += total
          
    //     }
    //     return null
    //    })
    //  }
    
    
     
     const ordersThisMonth =()=>{
        const orderData= allOrders.filter(order=>order.status!=="started").map(order=>{
                const {orderDate, cartItems, total, shippingFee, shippingMethod} = order
                let shippingCost=0
                if(shippingMethod!=='pickUp') shippingCost = order.actualShippingCost
        
                    if (isThisMonth(orderDate.toDate())){
                        let orderCOGS=0
                         cartItems.map(item=>{
                             const {quantity} = item
                             const cogs = getItemCOGS(item)
                             orderCOGS+=cogs*quantity
    
                         })
                         
                         const orderGrossMargin =total - orderCOGS - shippingCost
                        return {orderDate, orderCOGS, orderGrossMargin, cartItems, shippingMethod,shippingCost, shippingFee}
                    }
                return null
         })
         return orderData.filter(order=>order!==null)
    }
    
    const  ordersThisYear = ()=>{
       const orderData= allOrders.filter(order=>order.status!=='started').map(order=>{
            const {orderDate, cartItems, total, shippingMethod,shippingFee} = order
            let shippingCost=0
            if(shippingMethod!=='pickUp') shippingCost = order.actualShippingCost
            if (isThisYear(orderDate.toDate())){
                let orderCOGS=0
                cartItems.map(item=>{
                    const {quantity} = item
                    const cogs = getItemCOGS(item)
                    orderCOGS+=cogs*quantity
    
                })
                
                const orderGrossMargin =total - orderCOGS - shippingCost
               return {orderDate, orderCOGS, orderGrossMargin, cartItems, shippingMethod, shippingCost, shippingFee}
           }
       return null
    })
    return orderData.filter(order=>order!==null)
    }
    
    
    const getDailyTotals = (orders)=>{
        const today = new Date()
        const dailyTotals = []
        //work backwards from today to first day of the month and grab orders that match target date
        for (let i=0; i<today.getDate(); i++){
            let targetDate = new Date(today)
            targetDate.setDate(targetDate.getDate()-i)
            
             const dailyOrders = orders.filter(order=>isTargetDate(targetDate, order.orderDate))
            let dailyCOGS = 0
            let dailyGrossMargin = 0
            let dailyShippingCost=0
            let dailyShippingFee=0
            dailyOrders.map(order=>{
                dailyCOGS+=order.orderCOGS
                dailyGrossMargin+=order.orderGrossMargin
                if(order.shippingMethod!=='pickUp'){
                  dailyShippingCost += order.shippingCost
                  dailyShippingFee+= order.shippingFee
                }
            })
            const dateString = targetDate.getDate()
            dailyTotals.push({date:dateString, COGS: dailyCOGS, grossMargin:dailyGrossMargin, shippingCosts: dailyShippingCost,shippingFees:dailyShippingFee})  
        }
        return dailyTotals
    }
    
    const getMonthlyTotals = (orders)=>{
        const today = new Date()
        const month = today.getMonth()
        const monthlyTotals = []
        //work backwards from this month to beginning of year
        for (let i=0; i<=month; i++){
            let targetDate = new Date(today)
            targetDate.setMonth(targetDate.getMonth()-i)
            
             const monthlyOrders = orders.filter(order=>isSameMonth(targetDate, order.orderDate))
            let monthlyCOGS = 0
            let monthlyGrossMargin = 0
            let monthlyShippingFee=0
            let monthlyShippingCost=0
            monthlyOrders.map(order=>{
                monthlyCOGS+=order.orderCOGS
                monthlyGrossMargin+=order.orderGrossMargin
                if(order.shippingMethod!=='pickUp'){
                  monthlyShippingCost += order.shippingCost
                monthlyShippingFee+= order.shippingFee
                }
            })
            const MONTHS =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            const dateString = MONTHS[targetDate.getMonth()]
            monthlyTotals.push({date:dateString, COGS: monthlyCOGS, grossMargin:monthlyGrossMargin, shippingFees:monthlyShippingFee, shippingCosts:monthlyShippingCost})  
        }
        
        return monthlyTotals
    }
    
    const getItemCOGS=(item)=>{
       const product = products.filter(product=>product.id === item.id)[0]
        return product.cogs
    
    }
    
    const onChange=(e)=>{
        setView(e.target.value)
    }
    return(
        <div>
        <h2>Sales Data</h2>
        <Form.Group controlId="selectView">
           <Form.Label>Select Time Frame</Form.Label>
               <Form.Control as="select" onChange={(e)=>onChange(e)}>
                  <option eventKey='month' value='month'>This Month</option>
                   <option eventKey='year' value='year'>This Year</option>     
              </Form.Control>
      </Form.Group>
      <Row>
          <Col className='text-center'>
          <h2>Total Sales</h2>
              <SalesWithNetMarginChart data={data}/>
          </Col>
          <Col className='text-center'>
          <h2>Margin vs Cost Of Goods Sold</h2>
              <SalesWithGrossMarginPieChart pieData={pieData}/>
              <h4>Total Sales: ${grossSales}</h4>
          </Col>
      </Row>
      <Row>
        <h2>Percent Of Total Sales By Collection</h2>
        <SalesByCollectionRadarChart data={radarData}/>
      </Row> 
      </div>
    )
}
export default SalesReportsTab
