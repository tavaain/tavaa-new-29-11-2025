/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UseAuth from '../AllComponents/Hooks/UseAuth';

const ForgotPassword = () => {
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [t, setT] = useState(false);
    const { ForgotPassword} = UseAuth();



    const handlePasswordReset = async (e) => {
        
        try {
            await ForgotPassword(email)
            setMessage('Password reset email sent!');
            setT(!t)
            setError('');
        } catch (err) {
            setMessage('');
            setError(err.message);
        }
    };
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal ">
                <div className="modal-box bg-slate-50 text-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Forgot Password!</h3>
                    

                    {t ? <div>
                        <h1>Check your email and make new password!! . then <Link to='/login'>Login</Link> </h1>
                         </div> : <div >
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className=" mb-2 text-sm">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-3 py-2 border rounded-md bg-gray-100  "
                                />
                            </div>

                        </div>
                        <button
                            onClick={handlePasswordReset}
                            className="w-full px-5 my-5 py-3 font-semibold rounded-md bg-yellow-500 hover:bg-yellow-600  text-black"
                            value=""
                        >Next Step</button>
                    </div>}


                </div>
            </dialog>
        </div>
    );
};

export default ForgotPassword;