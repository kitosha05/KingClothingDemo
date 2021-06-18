import React from 'react';
import {ErrorImageOverlay,ErrorImageContainer, ErrorImageText} from './ErrorBoundaryStyles'
class ErrorBoundary extends React.Component{
    state={
        hasErrored:false
    };
    static getDerivedStateFromError(error){
        return {hasErrored: true}
    }
    componentDidCatch(error, info){
        console.log(error)
    }

    render(){
        if (this.state.hasErrored){
            return (
            <ErrorImageOverlay>
                <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png'/>
                <ErrorImageText>Oops! It seems this page is lost in space!</ErrorImageText>
            </ErrorImageOverlay>
                )
        }
        return this.props.children

    }
}
export default ErrorBoundary