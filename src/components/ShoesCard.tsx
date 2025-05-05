import { Shoes } from '../types';
import axios from 'axios';
import { useAuth } from '../utils/AuthProvider';
import AxiosInstance from '../utils/AxiosInstance';

export default function ShoesCard({
  shoes,
  onEdit,
  onDelete,
}: {
  shoes: Shoes;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { getToken } = useAuth(); 

  const handleDelete = async () => {
    const confirm = window.confirm(`Yakin ingin menghapus sepatu "${shoes.name}"?`);
    if (!confirm) return;

    try {
      await AxiosInstance.delete(`/api/shoes/${shoes.id}`, {
        headers: { Authorization: `Bearer ${getToken}` },
      });
      onDelete();
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus sepatu.');
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow space-y-2 bg-gray-50">
      <h3 className="text-lg font-bold">{shoes.name}</h3>
      <p>Size: {shoes.size}</p>
      <p>Price: ${shoes.price}</p>
      <div className="flex gap-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
