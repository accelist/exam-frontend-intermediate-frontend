import { useRouter } from 'next/router';
import { WithDefaultLayout } from '@/components/DefautLayout';

export default function DeleteOrderPage() {
  const router = useRouter();
  const { id } = router.query; //You get this from the URL, which you get from the MainMenu.

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) {
      return;
    }

    // Make a DELETE request to your API
    const response = await fetch(`api/be/api/v1/Order/DeleteOrder/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // If the order was successfully deleted, redirect to the main menu
      router.push('/MainMenu');
    } else {
      // Handle error
      alert('Failed to delete order');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Delete Order</h2>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleDelete}>
        Delete Order
      </button>
    </div>
  );
}

DeleteOrderPage.layout = WithDefaultLayout;
