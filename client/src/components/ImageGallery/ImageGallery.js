
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import PlainSpinner from '../PlainSpinner/PlainSpinner'

const ImageGallery =({imageUrl}) =>{
//    const renderImages = imageUrls.map(imageUrl=>{
//           return (
//                <div>
//                    <img src={imageUrl}/>
//                 </div>
//     )})
        return (
            <div>
                <Carousel autoPlay interval="3000" transitionTime="500">
                           <div>
                               <img src={imageUrl}/>
                           </div>
                           <div>
                               <img src='https://images.unsplash.com/photo-1609535766106-0864edad28e4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3RyZWV0JTIwZmFzaGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>
                           </div>
                           <div>
                               <img src='https://images.unsplash.com/photo-1568196004494-b1ee34f3b436?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'/>
                           </div>
                </Carousel>
            </div>
        )
};

export default ImageGallery;