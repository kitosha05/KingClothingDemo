import React, {useEffect}from 'react'
import { Style } from "react-style-tag";

const Template = ({page})=>{

    useEffect(() => {
       console.log(page.html)
    }, [])
  
    return(
        <div>
            <Style>{page.css}</Style>
            <div dangerouslySetInnerHTML={{__html: `${page.html}`}} />
        </div>
        
    )
}

export default Template