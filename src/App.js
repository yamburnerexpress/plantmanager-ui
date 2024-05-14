import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm } from './pages/LoginForm';
import { MyPlants } from './pages/MyPlants';
import AuthProvider from './hooks/AuthProvider';
import { ModalProvider } from './hooks/ModalProvider';
import PrivateRoute from './router/route';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ModalProvider>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route element={<PrivateRoute />}>
                <Route path="/myplants" element={<MyPlants />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<MyPlants />} />
              </Route>
              {/* Other routes */}
            </Routes>
          </ModalProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
