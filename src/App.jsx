import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./webpages/Login"
import Sidebar from "./components/Sidebar"
import Dashboard from "./webpages/Dashboard"
import OrderProduct from "./webpages/ProductOrder"

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/sign-in" element={<Login mode="SIGN_IN" />} />
          <Route path="/sign-up/merchant" element={<Login mode="SIGN_UP" />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="orders/product" element={<OrderProduct />} />

        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
