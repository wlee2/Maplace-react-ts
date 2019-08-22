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
                <aside id="left">
                </aside>
                <div id="center">
                    {children}
                </div>
                <aside id="right">
                </aside>
            </div>
            <div className="footer">

            </div>
        </>
    );
};

export default layout;