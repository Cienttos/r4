import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500">
        <h3 className="text-lg font-bold text-green-400 mb-4">{title}</h3>
        <div className="text-green-300 mb-6">{children}</div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded border border-gray-500 mr-2 transition">
            Cancelar
          </button>
          <button onClick={onConfirm} className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded border border-red-500 transition">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
