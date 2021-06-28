import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NoteIcon from '@material-ui/icons/Note';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import StoreIcon from '@material-ui/icons/Store';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AdminDash from '../../pages/AdminDash/AdminDash';
import OrderAdminPanel from '../../components/OrderAdminPanel/OrderAdminPanel'
import {Link} from 'react-router-dom'

export const mainListItems = (
  <div>
  <Link to='/admin' as='button'>
    <ListItem>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>
    <Link to='/admin/orders' as='button'>
    <ListItem  >
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
     <ListItemText primary="Orders" />
    </ListItem>
    </Link> 
    <Link to='/admin/products' as='button'>
    <ListItem button>
      <ListItemIcon>
        <StoreIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
    </Link>
    <Link to='/admin/pages' as='button'>
    <ListItem button>
      <ListItemIcon>
        <NoteIcon />
      </ListItemIcon>
      <ListItemText primary="Pages" />
    </ListItem>
    </Link>
    <Link to='/admin/reports' as='button'>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    </Link>
    
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);