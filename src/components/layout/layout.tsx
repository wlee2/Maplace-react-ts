import React from 'react';
import './layout.scss';
import NavBar from '../nav-bar/NavBar';

const layout: React.FC<any> = ({
    children
}) => {
    return (
        <>
            <NavBar />
            <div className="grid-layout" >
                <div className="main-body">
                    {children}
                </div>
            </div>
            <div className="footer">

            </div>
        </>
    );
};

export default layout;