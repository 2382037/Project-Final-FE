import { useState, useEffect } from 'react';
import { Shoes } from '../types';
import AxiosInstance from '../utils/AxiosInstance';
import { useAuth } from '../utils/AuthProvider';

interface ShoesFormProps {
  editing: Shoes | null;
  onDone: () => void; // Callback on success
  onError: (message: string) => void; // Callback on error
  setIsSubmitting: (isSubmitting: boolean) => void; // To update parent's submitting state
  isSubmitting: boolean; // To disable button during submission
  submitError: string | null; // To display submission errors
}

export default function ShoesForm({
  editing,
  onDone,
  onError,
  setIsSubmitting,
  isSubmitting,
  submitError,
}: ShoesFormProps) {
  const { getToken } = useAuth();
  const [name, setName] = useState('');
  const [size, setSize] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setSize(editing.size);
      setPrice(editing.price);
      setValidationError(null); // Clear validation errors when populating for edit
    } else {
      // Reset form fully when not editing or adding new
      setName('');
      setSize('');
      setPrice('');
      setValidationError(null);
    }
  }, [editing]); 

  const validateForm = (): boolean => {
    if (!name.trim()) {
        setValidationError('Name is required.');
        return false;
    }
    if (size === '' || size <= 0) {
        setValidationError('Size must be a positive number.');
        return false;
    }
     if (price === '' || price <= 0) {
        setValidationError('Price must be a positive number.');
        return false;
    }
    setValidationError(null); 
    return true;
  }

  const handleSubmit = async () => {
    onError('');
    if (!validateForm()) {
        return;
    }

    const token = getToken ? getToken() : null;
    if (!token) {
      onError('Authentication error: Cannot get token.');
      return;
    }

    setIsSubmitting(true); 
    setValidationError(null); 

    const shoesData = { name: name.trim(), size, price };
    const url = editing ? `/api/shoes/${editing.id}` : '/api/shoes';
    const method = editing ? 'put' : 'post';

    try {
      await AxiosInstance({
        method: method,
        url: url,
        data: shoesData,
        headers: { Authorization: `Bearer ${token}` },
      });
      onDone();
    } catch (err: any) {
      console.error('Failed to save shoe data:', err);
      const message = err.response?.data?.message || err.message || `Failed to ${editing ? 'update' : 'add'} shoe.`;
      onError(`Submit Error: ${message}`);
    } finally {
         setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
      onDone(); 
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        {editing ? 'Edit Shoe Details' : 'Add a New Shoe'}
      </h2>

      {validationError && (
        <p className="text-sm text-red-600 bg-red-100 p-2 rounded border border-red-200">
            {validationError}
        </p>
      )}
      {submitError && (
        <p className="text-sm text-red-600 bg-red-100 p-2 rounded border border-red-200">
            {submitError}
        </p>
      )}

      <div>
        <label htmlFor="shoeName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
            id="shoeName"
            className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="e.g., Running Pro X"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="shoeSize" className="block text-sm font-medium text-gray-700 mb-1">Size (US)</label>
        <input
            id="shoeSize"
            type="number"
            className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="e.g., 10.5"
            value={size}
            onChange={(e) => setSize(e.target.value === '' ? '' : Number(e.target.value))}
            min="1"
            step="0.5"
            disabled={isSubmitting}
        />
      </div>
      <div>
         <label htmlFor="shoePrice" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
        <input
            id="shoePrice"
            type="number"
            className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="e.g., 129.99"
            value={price}
            onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            min="0.01" // Minimum price
            step="0.01" // Allow cents
            disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {editing && (
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-150 ease-in-out disabled:opacity-50"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Saving...' : (editing ? 'Update Shoe' : 'Add Shoe')}
        </button>
      </div>
    </div>
  );
}