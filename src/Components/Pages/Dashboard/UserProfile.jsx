

const UserProfile = () => {
    return (
        <>
            <div className="h-screen w-full bg-gray-50 flex justify-center pt-10">
                <div className="h-56 w-72 absolute flex justify-center items-center">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                </div>
                <div
                    className=" h-56 mx-4 w-5/6 bg-blue-400 rounded-3xl shadow-md sm:w-80 sm:mx-0">
                    <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5">
                        <h1 className="text-white">Profile</h1>
                        
                    </div>
                    <div
                        className="bg-white h-1/2 w-full rounded-3xl flex flex-col justify-around items-center">
                        <div className="w-full h-1/2 flex justify-between items-center px-3 pt-2">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-gray-500 text-base">Admin</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-gray-500 text-xs">Spent</h1>
                                <h1 className="text-gray-600 text-sm">$2,004</h1>
                            </div>
                        </div>
                        <div className="w-full h-1/2 flex flex-col justify-center items-center">
                            <h1 className="text-gray-700 font-bold">Maria R.</h1>
                            <h1 className="text-gray-500 text-sm">New York, USA</h1>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <button className="btn w-full btn-outline">Update Profile</button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default UserProfile;