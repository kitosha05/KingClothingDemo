import './directory.scss'
import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import MenuItem from '../MenuItem/MenuItem.js'
import{selectDirectorySections} from '../../redux/directory/directorySelector'

const Directory = ({sections}) =>{
  return(
    <div className='directory-menu'>
        {
              sections.map(({id, ...otherSectionProps})=>{
               return <MenuItem key={id} {...otherSectionProps}/>
            })
        }
    </div>
    )
}


    
 

  const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
  })    
 

export default connect(mapStateToProps)(Directory)