import { useState, useEffect } from 'react';
import { Shoes } from '../types';
import axios from 'axios';

export default function ShoesForm({
  editing,
  onDone,
}: {
  editing: Shoes | null;
  onDone: () => void;
}) {
  const [name, setName] = useState('');
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setSize(editing.size);
      setPrice(editing.price);
    } else {
      setName('');
      setSize(0);
      setPrice(0);
    }
  }, [editing]);

  const handleSubmit = async () => {
    if (!name || size <= 0 || price <= 0) return alert('Semua field harus diisi dengan benar.');

    const token = localStorage.getItem('token'); // ← ambil token dari localStorage
    if (!token) return alert('Token tidak ditemukan.');

    const data = { name, size, price };
    const url = editing
      ? `http://localhost:3000/shoes/${editing.id}`
      : 'http://localhost:3000/shoes';
    const method = editing ? 'put' : 'post';

    try {
      await axios[method](url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDone();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan data sepatu.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        {editing ? 'Edit Shoe' : 'Add New Shoe'}
      </h2>
      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Size"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />
      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        {editing ? 'Update' : 'Add'} Shoe
      </button>
    </div>
  );
}
