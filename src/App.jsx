import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FloorPlan from './components/FloorPlan';
import RoomDetail from './components/RoomDetail';


function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FloorPlan />} />
        <Route path="/room/:roomId" element={<RoomDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
