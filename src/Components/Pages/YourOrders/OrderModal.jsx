// eslint-disable-next-line no-unused-vars
import React from "react";

const OrderModal = ({ items , customer }) => {

  return (
    <div>
      
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box bg-slate-100">
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">x</button>
            </form>
          </div>
                  <div>
            {items?.map((data) => 
                <div
                  key={data?._id}
                  className="border-b-2 border-black p-4   xl:flex lg:flex md:flex  gap-4 max-w-[850px] mx-auto justify-between"
                >
                  {/* to={`/productDetails/${_id}`} */}

                  <div>
                    <h1 className="text-black text-2xl">{data?.name}</h1>
                    <h1 className="text-black text-xl">
                      <span>Price : </span>
                      {data?.originalPrice}
                    </h1>
                
                    <h1 className="text-black text-xl">
                      <span>DiscountPrice : </span>
                      {data?.discountPrice}
                    </h1>
                        <h1 className="text-black text-xl">
                      <span>Adress: </span>
                      {customer.address.Name} , {customer.address.Location} , {customer.address.state} , {customer.address.zipCode} ,
                    </h1>
                   
                    <div className="flex">
                      <h1 className="text-xl text-black">Quantity :</h1>
                      <div className="border-2 flex justify-between p-1 rounded-md ">
                                <h4 className="text-black">{data?.quantity}</h4>
                      </div>
                    </div>
                  </div>
                    <div className="avatar">
                      <div className="w-28 rounded">
                        <img src={data?.image} alt="" />
                      </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OrderModal;
