import './App.css';
import Home from './Home';
import About from './About';
import Posts from './Posts';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/posts?fname=Noraset&lname=Naluan">Post Greeting</Link></li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        {/* Remove this if not used */}
        {/* <Route path="/posts/:id" element={<Posts />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

