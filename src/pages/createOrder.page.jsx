import CreateOrderForm from '../components/createOrderForm';

 function CreateOrderPage() {
 
    return (
        <>
            <div className="container col-md-8 col-lg-8 mt-4">
                <h3 className="p-2" >Create New Order </h3>
                <CreateOrderForm />
            </div>
        </>
    )
}

export default CreateOrderPage;