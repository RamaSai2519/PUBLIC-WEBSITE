import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const GenModal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null; // Don't render modal if show is false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
        
          {/* <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-lg"
          >
            &times;
          </button> */}
        </div>

        {/* Modal Body */}
        <div className="my-4">
          {children} {/* The children (content) passed into the modal */}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenModal;
