import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NavBar from './components/NavBar';
import { ThemeProviderComponent } from './contexts/ThemeContext';

const App: React.FC<{ appTitle: string }> = ({ appTitle }) => {
    return (
        <ThemeProviderComponent>
            <Router>
                <NavBar appTitle={appTitle} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Router>
        </ThemeProviderComponent>
    );
}

export default App;