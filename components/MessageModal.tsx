interface MessageModalProps {
    message: string;
    isOpen: boolean;
    onClose: () => void;
  }
  
  const MessageModal: React.FC<MessageModalProps> = ({ message, isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <p className="text-lg mb-4 text-gray-800 font-semibold">{message}</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default MessageModal;