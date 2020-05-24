import React from 'react';
import Header from './components/Header';
import App from './App';
import Footer from './components/Footer';

const Main = () => {
    return (
        <>
            <Header />
            <main>
                <App />
            </main>
            <Footer />
        </>
    );
}

export default Main;