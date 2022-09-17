import 'bootstrap/dist/css/bootstrap.min.css';
// 3rd party import
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// local imports
import Login from './authentication/Login';
import Registration from './authentication/Registration';
import Page1 from './pages/page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Page4 />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
