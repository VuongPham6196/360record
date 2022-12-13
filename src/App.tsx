import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { IRoute } from './constants/interface';

import Home from './pages/Home';

import Login from './pages/Login';
import { useSelector } from 'react-redux';

function App() {
  const isLogged = useSelector((state: any) => state.auth.loginStatus);

  const PublicRoutes: IRoute[] = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
  ];

  const ProtectedRoute = ({ children }: any): any => {
    if (!isLogged) {
      return <Navigate to={'/login'} replace />;
    }
    return <div>{children}</div>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={isLogged ? <Navigate to={'/'} /> : <Login />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
