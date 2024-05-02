import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm } from './pages/LoginForm';
import { MyPlants } from './pages/MyPlants';
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './router/route';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route element={<PrivateRoute />}>
              <Route path="/myplants" element={<MyPlants />} />
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
