import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './pages/Login';
import DefaultLayout from 'layouts/DefaultLayout';

import { PrivateRoutes } from 'Routes/indext';
import CompanyDetail from 'components/Company/CompanyDetail';
import InspectionDetail from 'components/Inspection/InspectionDetail';
import LocationDetail from 'components/Location/LocationDetail';
import RegionDetail from 'components/Region/RegionDetail';
import { getUser } from 'api/httpClient';

function App() {
  const token = useSelector((state: any) => state.auth.token);
  // const user = getUser();
  // console.log('user: ' + user);

  const ProtectedRoute = ({ children }: any) => {
    // const refreshUserRole = getUser().then((data) => data?.data);
    // console.log(refreshUserRole);

    if (!token) {
      return <Navigate to={'/login'} />;
    }
    return <div>{children}</div>;
  };

  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          {/* nested route */}
          <Route path="/dashboard">
            {/* auto navigate to Inspections Page */}
            <Route
              index
              element={<Navigate to={'/dashboard/inspections'} />}
            ></Route>

            {/* List page */}
            {PrivateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <route.component />
                  </ProtectedRoute>
                }
              />
            ))}

            {/* Company Detail Page */}
            <Route
              path="companies/:id"
              element={
                <ProtectedRoute>
                  <CompanyDetail />
                </ProtectedRoute>
              }
            />

            {/* Inspection Detail Page */}
            <Route
              path="inspections/:id"
              element={
                <ProtectedRoute>
                  <InspectionDetail />
                </ProtectedRoute>
              }
            />

            {/* Location Detail Page */}
            <Route
              path="locations/:id"
              element={
                <ProtectedRoute>
                  <LocationDetail />
                </ProtectedRoute>
              }
            />

            {/* Region Detail Page */}
            <Route
              path="regions/:id"
              element={
                <ProtectedRoute>
                  <RegionDetail />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* if url= '/dashboard/login' redirect to Inspections page (if logged in) or Login page (if not logged in)*/}
          <Route
            path={'/login'}
            element={token ? <Navigate to={'/dashboard/'} /> : <Login />}
          />

          {/* Invalid url will redirect to Inspections Page */}
          <Route path="*" element={<Navigate to={'/dashboard'} />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;
