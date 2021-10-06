import React from 'react';
import CryptoJS from 'crypto-js';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainPage = ({ login, loginState }) => {

    const test = () => {//3C39jgyKxOMA1CsYEZXC96116b9bee399f611d1e888fffee6fa1ffed8ea76967b70a04b7fe59199dd1eeasdasda?qJO({mY!
        var key = CryptoJS.PBKDF2("asdasd", "96116b9bee399f611d1e888fffee6fa1ffed8ea76967b70a04b7fe59199dd1ee", { keySize: 8, iterations: 1000 });
        var aesKey = CryptoJS.enc.Hex.stringify(key);
        //console.log(aesKey);
        var authorization = CryptoJS.SHA512("a?qJO({mY!", aesKey);
        //console.log(authorization.toString());
        var e = CryptoJS.AES.encrypt("edaeda", aesKey);
        var p = CryptoJS.AES.encrypt("eda123", aesKey);
        //console.log("e:" + e);
        //console.log("p:" + p);
        var hash = CryptoJS.HmacSHA512("a?qJO({mY!", "dffea8e770030d692a4d9a02c3b5080a7d1fb98a7d55c051e78e83ff7512a0a4");
        //console.log(hash.toString());
    }

    return (
        <div>
            <Header />
            <div style={{ backgroundColor: "blue", width: "100%", height: 1000 }} onClick={() => test()} />
            <div style={{marginBottom: 20}}>
                <Footer />
            </div>
        </div>
    )
}

export default MainPage;
