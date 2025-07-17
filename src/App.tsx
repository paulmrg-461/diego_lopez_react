import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Hours from './pages/Hours';
import Schedule from './pages/Schedule';
import Vehicles from './pages/Vehicles';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="hours" element={<Hours />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="vehicles" element={<Vehicles />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
