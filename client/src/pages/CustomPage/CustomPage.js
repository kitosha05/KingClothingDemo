import React, {useEffect, useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {fetchPagesStart} from '../../redux/admin/adminActions'
import Template from '../../components/Template/Template'


const CustomPage = ({ route,fetchPagesStart, pages})=>{
    const [page, setPage] = useState(null)
    
useEffect(() => {
   if(!pages){
       fetchPagesStart()
    }else{
        console.log(pages)
        setPage(pages.filter(p=>p.route === route)[0])
    }
},  [pages]) 


return(
    page ? <Template page={page}/> : <div>Loading</div>
    
)



}


const mapDispatchToProps= dispatch=>({
    fetchPagesStart: ()=>dispatch(fetchPagesStart())
})
const mapStateToProps = (state, ownProps) =>({
    pages:state.admin.pages,
    route:ownProps.match.params.pageId
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomPage)