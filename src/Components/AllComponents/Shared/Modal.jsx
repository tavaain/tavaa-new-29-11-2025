import { RxCross1 } from "react-icons/rx";

// Insert 3 line your main component where use this modal and pass props.
// const [isModalOpen, setIsModalOpen] = useState(false);
// const openModal = () => setIsModalOpen(true);
// const closeModal = () => setIsModalOpen(false);

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[600px]">
                <button
                    className="absolute text-1xl top-3 right-3 text-red-700 bg-red-200 p-2 rounded-full"
                    onClick={onClose}
                >
                    <RxCross1 />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;