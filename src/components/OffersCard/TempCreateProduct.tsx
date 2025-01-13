import { useForm } from 'react-hook-form';
import { useCreateProductMutation } from '@/store/slice/products';

const ProductForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createProduct, { isLoading, isSuccess, isError }] = useCreateProductMutation();

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'user', label: 'User ID', type: 'number' },
    { name: 'category', label: 'Category', type: 'number' },
    { name: 'rendement', label: 'Rendement (%)', type: 'number' },
    { name: 'price', label: 'Price', type: 'number', step: '0.01' },
    { name: 'kampanya_egasi', label: 'Company Owner', type: 'text' },
    { name: 'kontact', label: 'Contact', type: 'text' },
    { name: 'campany_name', label: 'Company Name', type: 'text' },
    { name: 'oylik_daromadi', label: 'Monthly Revenue', type: 'number', step: '0.01' },
    { name: 'soff_foydasi', label: 'Net Profit', type: 'number', step: '0.01' },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const payload = {
      name: data.name,
      description: data.description,
      location: data.location,
      user: parseInt(data.user, 10),
      category: parseInt(data.category, 10),
      rendement: `${data.rendement}%`,
      image: null,
      price: parseFloat(data.price).toFixed(2),
      product_file: null,
      private_information: {
        kampanya_egasi: data.kampanya_egasi,
        kontact: data.kontact,
        campany_name: data.campany_name,
        oylik_daromadi: parseFloat(data.oylik_daromadi).toFixed(2),
        soff_foydasi: parseFloat(data.soff_foydasi).toFixed(2),
      },
    };

    try {
      await createProduct(payload).unwrap();
      reset();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                {...register(field.name, { required: true })}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
              />
            ) : (
              <input
                type={field.type}
                step={field.step || undefined}
                {...register(field.name, { required: true })}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-medium rounded-md shadow-sm ${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {isSuccess && <p className="text-green-600 mt-2">Product created successfully!</p>}
        {isError && <p className="text-red-600 mt-2">Failed to create product.</p>}
      </form>
    </div>
  );
};

export default ProductForm;
