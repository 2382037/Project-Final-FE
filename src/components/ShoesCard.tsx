import { useState } from 'react'; // Import useState for delete loading state
import { Shoes } from '../types';
import { useAuth } from '../utils/AuthProvider';
import AxiosInstance from '../utils/AxiosInstance';

interface ShoesCardProps {
    shoes: Shoes;
    onEdit: () => void;
    onDeleteSuccess: () => void; // Callback specifically for delete success
}

export default function ShoesCard({
  shoes,
  onEdit,
  onDeleteSuccess,
}: ShoesCardProps) {
  const { getToken } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false); // State for delete loading

  const handleDelete = async () => {
    const token = getToken ? getToken() : null;
    if (!token) {
        alert('Authentication error: Cannot get token.');
        return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete the shoe "${shoes.name}"?`);
    if (!confirmDelete) return;

    setIsDeleting(true); // Start deleting visual state

    try {
      // Use relative path
      await AxiosInstance.delete(`/api/shoes/${shoes.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeleteSuccess(); // Call the success callback passed from ShoesPage
    } catch (error: any) {
      console.error('Failed to delete shoe:', error);
      const message = error.response?.data?.message || error.message || 'Failed to delete shoe.';
      alert(`Delete Error: ${message}`); // Show error to user
       setIsDeleting(false); // Stop deleting visual state on error
    }
    // No finally needed here, as success calls onDeleteSuccess which triggers refetch
    // and error stops the loading state above.
  };

  return (
    <div className="border border-gray-200 p-4 rounded-xl shadow-md space-y-2 bg-white hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
        <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{shoes.name}</h3>
            <p className="text-sm text-gray-600">Size: {shoes.size}</p>
            <p className="text-sm text-gray-600">Price: ${shoes.price ? shoes.price.toFixed(2) : 'N/A'}</p>
        </div>
        <div className="flex gap-2 pt-3 mt-2 border-t border-gray-100">
            <button
            className="flex-1 bg-yellow-500 text-white px-3 py-1.5 rounded text-sm hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50"
            onClick={onEdit}
            disabled={isDeleting} // Disable edit while deleting
            >
            Edit
            </button>
            <button
            className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={isDeleting} // Disable button while deleting
            >
            {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    </div>
  );
}