import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { startCodespace } from './startCodespace';

function App() {
    useEffect(() => {
        if (process.env.NODE_ENV != 'development') {
            startCodespace().then(r => console.log(r));
        }
    }, []);

    return (
        <Router basename="/list-audio-react-app">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </Router>
    );
}

export default App;