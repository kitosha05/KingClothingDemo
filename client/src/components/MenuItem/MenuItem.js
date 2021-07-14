import './MenuItem.scss'
import React from 'react'
import { withRouter } from 'react-router-dom'
import Slide from 'react-reveal/Slide'

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
    return (
        <Slide right>
            <div
                className={`${size} menu-item`}
                onClick={() => history.push(`${match.url}${linkUrl}`)}
            >
                <div
                    className="background-image"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                    }}
                />
                <div className="content">
                    <h1 className="title">{title.toUpperCase()}</h1>
                    <span className="subtitle">SHOP NOW</span>
                </div>
            </div>
        </Slide>
    )
}

export default withRouter(MenuItem)
