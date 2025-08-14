
import { useState } from 'react';
import { createOrder } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateOrderForm() {
  const [formInputs, setFormInputs] = useState({ customerName: '', orderAmount: '', invoiceFile: '' });
  const [nameError, setNameError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [invoiceFileError, setInvoiceFileError] = useState('');

  const navigate = useNavigate();

  const submitOrder = async (formData) => {
    try {
      const response = await createOrder(formData);
      if (response) {
        toast.success("order created successfully");
        navigate('/');
       }
    } catch (error) {
      toast.error('Failed to fetch order details.');
      console.error('Error fetching order:', error);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    // validation 
    if (formInputs.customerName === '') {
      return setNameError("Name is required")
    }
    if (formInputs.orderAmount === '' || isNaN(formInputs.orderAmount)) {
      return setAmountError("Valid Order Amount is required")
    }
    if (formInputs.invoiceFile === '') {
      return setInvoiceFileError("Invoice file is required")
    }

    // formData api 
    const formData = new FormData();
    formData.append('customerName', formInputs.customerName);
    formData.append('orderAmount', formInputs.orderAmount);
    formData.append('invoiceFile', formInputs.invoiceFile);

    // send data and clear form
    submitOrder(formData);
    setNameError('');
    setAmountError('');
    setInvoiceFileError('');
    setFormInputs({ customerName: '', orderAmount: '', invoiceFile: '' });
  }

  function onChangeHandler(event) {
    setFormInputs({
      ...formInputs, [event.target.name]: event.target.value
    })
    if (event.target.name === 'customerName' ) {
      setNameError('')
    }
     if (event.target.name === 'orderAmount' ) {
      setAmountError('')
    }
  }

  function onChangeHandlerForFile(event) {
    setFormInputs({ ...formInputs, [event.target.name]: event.target.files[0] });
    
    if (event.target.name === 'invoiceFile' ) {
      setInvoiceFileError('')
    }
     
  }
  return (
    <>

      <form onSubmit={handleSubmit} className="p-4 border rounded"   >
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            name="customerName"
            type="text"
            className="form-control"
            defaultValue={formInputs.customerName}
            onChange={onChangeHandler}
            placeholder="enter name"
          />
          {nameError && <div className="text-danger">{nameError}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Order Amount</label>
          <input
            name="orderAmount"
            type="double"
            className="form-control"
            defaultValue={formInputs.orderAmount}
            onChange={onChangeHandler}
            placeholder="enter amount"
          />
          {amountError && <div className="text-danger">{amountError}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Invoice (PDF)</label>
          <input
            name="invoiceFile"
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={onChangeHandlerForFile}
            defaultValue={formInputs.invoice}
          />
          {invoiceFileError && <div className="text-danger">{invoiceFileError}</div>}
        </div>
        <div className="conatiner d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-dark">
            Create Order
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateOrderForm;