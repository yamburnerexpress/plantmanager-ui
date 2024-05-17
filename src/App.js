import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm } from './pages/LoginForm';
import { Registration } from './pages/Registration';
import { MyPlants } from './pages/MyPlants';
import { ChangePassword } from './pages/ChangePassword';
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
              <Route path="/register" element={<Registration />} />
              <Route element={<PrivateRoute />}>
                <Route path="/myplants" element={<MyPlants />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<MyPlants />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/changepassword" element={<ChangePassword />} />
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
