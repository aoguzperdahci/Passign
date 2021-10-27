import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainPage = ({ login, loginState }) => {

    return (
        <div>
            <Header />
            <div style={{ backgroundColor: "#004d40", width: "100%", height: 800 }}/>
            <div style={{marginBottom: 20}}>
                <Footer />
            </div>
        </div>
    )
}

export default MainPage;
