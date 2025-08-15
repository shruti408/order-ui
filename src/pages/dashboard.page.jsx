import { useState, useEffect } from 'react';
import { getOrders } from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderTable from '../components/orderTable';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
     } catch (error) {
      toast.error('Failed to fetch orders.');
      console.error('Error fetching orders:', error);
    }
  };
  useEffect(() => {

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4 mb-3">
      <div className="d-flex justify-content-between align-items-center ">
        <h2> Dashboard</h2>
        <Link to="/create" className="btn btn-dark">
          + Create Order
         </Link>
      </div>
      <OrderTable orders={orders} />

    </div>
  );
};

export default Dashboard;