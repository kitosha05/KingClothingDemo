import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AddProductForm from '../ProductForm/AddProductForm'
import EditProductForm from '../EditProductForm/EditProductForm'
import BulkEditInventory from '../BulkEditInventory/BulkEditInventory';
import AddPostForm from './AddPostForm';
import EditPostForm from './EditPostForm'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper
    }
  }));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
  }


export default function BlogAdminTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
         <Tab label="Add A New Blog Post" {...a11yProps(0)} />
          <Tab label="Edit A Blog Post" {...a11yProps(1)} />
    </Tabs>

    <TabPanel value={value} index={0}>
        <AddPostForm/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditPostForm/>
      </TabPanel>
    
    </Paper>
  );
}