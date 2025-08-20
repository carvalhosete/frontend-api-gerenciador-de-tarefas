import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import ProtectedRoute from './pages/components/ProtectedRoute.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={ 
        <ProtectedRoute> 
          <DashboardPage /> 
        </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;
