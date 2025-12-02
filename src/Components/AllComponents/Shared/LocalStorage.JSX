const getLocaldata = () => {
    const getdata = localStorage.getItem("product");
    if (getdata) {
        return JSON.parse(getdata);
    }
    return [];
};

const saveLocalData = (localPostdata, _id) => {
    const storedadata = getLocaldata();
    // Corrected the find method to properly compare _id and size
    const exists = storedadata.find(cardId => cardId._id === _id );

    // If the item does not exist, add it to the array and save to localStorage
    if (!exists) {
        storedadata.push(localPostdata);
        localStorage.setItem("product", JSON.stringify(storedadata));
    }
};
const deleteDta = ( _id) => {
    const storedadata = getLocaldata();
    // Corrected the find method to properly compare _id and size
    const exists = storedadata.find(cardId => cardId._id === _id );
    

    // If the item does not exist, add it to the array and save to localStorage
    if (exists) {
        storedadata.push();
        localStorage.setItem("product", JSON.stringify(storedadata));
    }
};

export { getLocaldata, saveLocalData,deleteDta };