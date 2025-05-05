import { useEffect, useState } from 'react';
import { Shoes } from '../types';
import ShoesForm from '../components/ShoesForm';
import ShoesCard from '../components/ShoesCard';
import { useAuth } from '../utils/AuthProvider';
import AxiosInstance from '../utils/AxiosInstance';

export default function ShoesPage() {
  const { getToken } = useAuth();
  const [shoesList, setShoesList] = useState<Shoes[]>([]);
  const [editing, setEditing] = useState<Shoes | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchShoes = async () => {
      if (!getToken) return;

      try {
        const res = await AxiosInstance.get<Shoes[]>('api/shoes', {
          headers: { Authorization: `Bearer ${getToken}` },
        });
        setShoesList(res.data);
      } catch (error) {
        console.error('Failed to fetch shoes:', error);
        alert('Gagal mengambil data sepatu.');
      }
    };

    fetchShoes();
  }, [refresh, getToken]);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Shoe Manager</h1>

      {/* Form untuk menambah atau mengedit sepatu */}
      <ShoesForm
        editing={editing}
        onDone={() => {
          setEditing(null);
          setRefresh((prev) => !prev);
        }}
      />

      {/* Daftar kartu sepatu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shoesList.map((shoes) => (
          <ShoesCard
            key={shoes.id}
            shoes={shoes}
            onEdit={() => setEditing(shoes)}
            onDelete={() => setRefresh((prev) => !prev)}
          />
        ))}
      </div>
    </div>
  );
}
