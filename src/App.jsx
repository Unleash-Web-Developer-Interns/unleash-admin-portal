import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./webpages/Login"
import Sidebar from "./components/Sidebar"
import Dashboard from "./webpages/Dashboard"
import { useState } from "react"
import Refund from "./webpages/Refund"
import RefundV2 from "./webpages/Refund-v2"
import ReturnRefund from "./webpages/Return-refund"
import { ALL_AUTHORIZED, USER_ROLES } from "./variables/USER_ROLES"
import ProductManagement from "./webpages/Product-management"
import UserManagement from "./webpages/User-management"

function App() {
  const [accountStatus, setAccountStatus] = useState(false);
  const [accountType, setAccountType] = useState(USER_ROLES.VISITOR);

  const PUBLIC_ROUTES = [
    {
      path: "/sign-in",
      element:
        <Login
          mode="SIGN_IN"
          accountStatus={{ value: accountStatus, setter: setAccountStatus }}
          accountType={{ value: accountType, setter: setAccountType }}
        />
    },
    {
      path: "/sign-up",
      element:
        <Login
          mode="SIGN_UP"
          accountStatus={{ value: accountStatus, setter: setAccountStatus }}
          accountType={{ value: accountType, setter: setAccountType }}
        />
    }
  ]

  const PRIVATE_ROUTES = [
    {
      path: "/",
      element: <Dashboard />,
      roles: ALL_AUTHORIZED
    },
    {
      path: "/orders/return-refund",
      element: <ReturnRefund />,
      roles: ALL_AUTHORIZED
    },
    {
      path: "/management/product",
      element: <ProductManagement />,
      roles: ALL_AUTHORIZED
    },

    {
        path: "/management/user",
        element: <UserManagement />,
        roles: ALL_AUTHORIZED
    }
    /*
    ADD YOUR PATHS AND ELEMENTS HERE.
    FOR THE ROLES, PUT ALL_AUTHORIZED FOR NOW.
    */
  ]

  const ERROR_ROUTES = [
    {
      path: "/403",
      element: <Dashboard />,
      metadata: {
        error_name: "403 - FORBIDDEN",
        reason: "Authorized but lacks permission to access the page."
      }
    },
    {
      path: "/404",
      element: <Dashboard />,
      metadata: {
        error_name: "404 - NOT FOUND",
        reason: "Webpage does not exist."
      }
    }
  ]

  return (
    <BrowserRouter>
      <Sidebar accountStatus={{ value: accountStatus, setter: setAccountStatus }}>
        <Routes>
          {PUBLIC_ROUTES.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
          {PRIVATE_ROUTES.map(({ path, element, roles }, index) => (
            <Route
              key={`protected-${index}`}
              path={path}
              element={
                <ProtectedRoute
                  element={element}
                  validator={accountStatus}
                  userRole={accountType}
                  allowedRoles={roles}
                />
              }
            />
          ))}
          {ERROR_ROUTES.map(({ path, element }, index) => (
            <Route key={`error-${index}`} path={path} element={element} />
          ))}
          <Route path="/*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

function ProtectedRoute({ element, validator, userRole, allowedRoles }) {
  if (!validator) return <Navigate to="/sign-in" replace />;
  if (!allowedRoles.some(role => role === userRole)) return <Navigate to="/403" replace />;

  return element;
}

export default App
