import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from '../ListItems/ListItems';
import {fetchProductsStart} from '../../redux/shop/shopActions'
import SalesWithNetMarginChart from '../Chart/SalesWithNetMarginChart';
import SalesWithGrossMarginPieChart from '../Chart/SaleswithGrossMarginPieChart';
import SalesByCollectionRadarChart from '../Chart/SalesByCollectionRadarChart';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        King Clothing
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  summaryHeaders:{
      display: 'inline-block',
      textAlign: 'center'
  }
}));

const ReportsAdminPanel=({fetchProductsStart, allOrders, products})=>{

  const classes = useStyles();
  const [view, setView] = React.useState('month')
  const [data, setData] = React.useState(null)
  const [pieData, setPieData] = React.useState(null)
  const [open, setOpen] = React.useState(true);
  const [grossSales, setGrossSales]= React.useState(null)
  const [radarData, setRadarData]= React.useState(null)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    if(!products)fetchProductsStart()
    if(allOrders && products)formatOrderData(view)
    
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
console.log(hatsGrossSales)
console.log(hatsCOGS)
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
   const {cogs, grossMargin} = accumulateMarginAndCogs(orders)
    const pieData=[{name:'Cost of Goods Sold', value: cogs}, {name: 'Gross Margin', value: grossMargin}]
    const totalSales=cogs+grossMargin
    setGrossSales(totalSales)
    return pieData
}
const accumulateMarginAndCogs=(orders)=>{
  let cogs =0
  let grossMargin=0
  orders.map(order=>{
      cogs+=order.orderCOGS
      grossMargin+=order.orderGrossMargin
  })
  return {cogs, grossMargin}
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
            const {orderDate, cartItems, total} = order
    
                if (isThisMonth(orderDate.toDate())){
                    let orderCOGS=0
                     cartItems.map(item=>{
                         const {quantity} = item
                         const cogs = getItemCOGS(item)
                         orderCOGS+=cogs*quantity

                     })
                     
                     const orderGrossMargin =total - orderCOGS
                    return {orderDate, orderCOGS, orderGrossMargin, cartItems}
                }
            return null
     })
     return orderData.filter(order=>order!==null)
}

const  ordersThisYear = ()=>{
   const orderData= allOrders.filter(order=>order.status!=='started').map(order=>{
        const {orderDate, cartItems, total} = order
        if (isThisYear(orderDate.toDate())){
            let orderCOGS=0
            cartItems.map(item=>{
                const {quantity} = item
                const cogs = getItemCOGS(item)
                orderCOGS+=cogs*quantity

            })
            
            const orderGrossMargin =total - orderCOGS
           return {orderDate, orderCOGS, orderGrossMargin, cartItems}
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
        dailyOrders.map(order=>{
            dailyCOGS+=order.orderCOGS
            dailyGrossMargin+=order.orderGrossMargin
        })
        const dateString = targetDate.getDate()
        dailyTotals.push({date:dateString, cogs: dailyCOGS, grossMargin:dailyGrossMargin})  
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
        monthlyOrders.map(order=>{
            monthlyCOGS+=order.orderCOGS
            monthlyGrossMargin+=order.orderGrossMargin
        })
        const MONTHS =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const dateString = MONTHS[targetDate.getMonth()]
        monthlyTotals.push({date:dateString, cogs: monthlyCOGS, grossMargin:monthlyGrossMargin})  
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


 
 
 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            <Grid item xs={12}>
              <Paper className={classes.paper}>
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
                   
                    
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

const mapDispatchToProps = dispatch =>({
  fetchProductsStart: ()=>dispatch(fetchProductsStart())
})
const mapStateToProps = state=>({
    products: state.shop.products
    
})
export default connect(mapStateToProps, mapDispatchToProps)(ReportsAdminPanel)