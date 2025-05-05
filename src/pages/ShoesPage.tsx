import { useEffect, useState, useCallback } from 'react';
import { Shoes } from '../types';
import ShoesForm from '../components/ShoesForm';
import ShoesCard from '../components/ShoesCard';
import { useAuth } from '../utils/AuthProvider';
import AxiosInstance from '../utils/AxiosInstance';

export default function ShoesPage() {
  const { getToken } = useAuth();
  const [shoesList, setShoesList] = useState<Shoes[]>([]);
  const [editing, setEditing] = useState<Shoes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // State specifically for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Memoized fetch function to avoid re-creating it on every render
  const fetchShoes = useCallback(async () => {
    const token = getToken ? getToken() : null; // Get token string or null

    if (!token) {
      setError('Authentication required. Please log in.');
      setShoesList([]); // Clear list if not authenticated
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous fetch errors

    try {
      const res = await AxiosInstance.get<Shoes[]>('/api/shoes', { // Use relative path
        headers: { Authorization: `Bearer ${token}` },
      });
      setShoesList(res.data);
    } catch (err: any) {
      console.error('Failed to fetch shoes:', err);
      const message = err.response?.data?.message || err.message || 'Failed to load shoes data.';
      setError(`Error: ${message}`);
      setShoesList([]); // Clear list on error
    } finally {
      setIsLoading(false);
    }
  }, [getToken]); // Dependency: only refetch if getToken function changes (rare)

  // Initial fetch and refetch on demand
  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]); // Run fetchShoes when the component mounts or fetchShoes changes

  // Handler when form completes an action (add/edit)
  const handleFormDone = () => {
    setEditing(null); // Clear editing state
    setSubmitError(null); // Clear form submission errors
    setIsSubmitting(false); // Reset submitting state
    fetchShoes(); // Refetch the list
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Scroll to bottom to see new/updated item
  };

    // Handler when form encounters an error during submission
  const handleFormError = (errorMessage: string) => {
    setSubmitError(errorMessage);
    setIsSubmitting(false); // Reset submitting state
  }

  // Handler to set which shoe is being edited
  const handleEdit = (shoesToEdit: Shoes) => {
    setEditing(shoesToEdit);
    setSubmitError(null); // Clear any previous form errors when starting edit
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to see the form
  };

  // Handler after a successful delete action
  const handleDeleteSuccess = () => {
    fetchShoes(); // Refetch the list
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Shoes Manager</h1>

      {/* Form Section */}
      <ShoesForm
        key={editing ? `edit-${editing.id}` : 'add'} // Force re-render form on edit change
        editing={editing}
        onDone={handleFormDone}
        onError={handleFormError} // Pass error handler
        setIsSubmitting={setIsSubmitting} // Pass submitting state setter
        isSubmitting={isSubmitting} // Pass submitting state
        submitError={submitError} // Pass submission error message
      />

      {/* Display Area Separator */}
      <hr className="my-8" />

      {/* List Section */}
      <div className='mt-8'>
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">Shoes Collection</h2>

        {/* Loading Indicator */}
        {isLoading && <p className="text-center text-gray-500 py-4">Loading shoes...</p>}

        {/* Fetch Error Message */}
        {error && !isLoading && (
            <div className="text-center text-red-600 bg-red-100 p-3 rounded border border-red-300 mb-4">
                {error}
            </div>
        )}

        {/* Shoes List or Empty State */}
        {!isLoading && !error && shoesList.length === 0 && (
            <p className="text-center text-gray-500 py-4">No shoes found. Add one using the form above!</p>
        )}

        {!isLoading && !error && shoesList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {shoesList.map((shoes) => (
              <ShoesCard
                key={shoes.id}
                shoes={shoes}
                onEdit={() => handleEdit(shoes)}
                onDeleteSuccess={handleDeleteSuccess} // Pass specific success handler
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}