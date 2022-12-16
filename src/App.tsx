import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { IRoute } from './constants/interface';

import Home from './pages/Home';

import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { getStorageToken } from 'api/httpClient';
import { useEffect, useState } from 'react';
import Company from 'components/Company/Company';
import Companies from 'pages/Companies';

function App() {
  const token = useSelector((state: any) => state.auth.token);
  console.log(token);

  const ProtectedRoute = ({ children }: any): any => {
    if (!token) {
      return <Navigate to={'/login'} replace />;
    }
    return <div>{children}</div>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="companies"
            element={
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path={'/login'}
          element={token ? <Navigate to={'/'} /> : <Login />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
