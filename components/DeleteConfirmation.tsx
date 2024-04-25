// components/ConfirmationModal.tsx
import React from 'react';

interface DeleteConfirmation {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmation> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white p-4 rounded shadow-md z-20">
            <p>Are you sure you want to delete this order?</p>
            <div className="flex justify-end mt-4">
              <button className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded" onClick={onClose}>Cancel</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirmation;
