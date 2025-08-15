import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './pages/dashboard.page';
import CreateOrderPage from './pages/createOrder.page';
import OrderPage from './pages/order.page';

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateOrderPage />} />
        <Route path="/orders/:id" element={<OrderPage />} />
      </Routes>
      <ToastContainer/>

    </>
  );
}

export default App;