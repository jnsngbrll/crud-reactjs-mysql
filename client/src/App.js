import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddNewPlayer from './pages/AddNewPlayer';
import UpdatePlayer from './pages/UpdatePlayer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/players" element={<Home />} />
        <Route path="/players/add-new-player" element={<AddNewPlayer />} />
        <Route path="/players/update-player/:id" element={<UpdatePlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
