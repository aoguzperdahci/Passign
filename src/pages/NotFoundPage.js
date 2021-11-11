import React from 'react';
import Header from '../components/Header';
import notFound from "../images/404.png"

const NotFoundPage = () => {

    return (
        <>
              <Header/>
              <div style={{alignContent: "center", alignItems:"center"}}>
                <img src={notFound} alt="404 Page Not Found" style={{marginLeft:"auto", marginRight:"auto", width:"50%", display:"block", marginTop:100}}></img>
            </div>
        </>
    )
}

export default NotFoundPage;
