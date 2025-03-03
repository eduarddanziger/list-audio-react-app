import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NavBar from './components/NavBar';

function App() {
    return (
        <Router basename="/list-audio-react-app">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Router>
    );
}

export default App;