import { useForm } from 'react-hook-form';
import { useCreateProductMutation } from '@/store/slice/products';
import { useState } from 'react';

const ProductForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createProduct, { isLoading, isSuccess, isError }] = useCreateProductMutation();

  const [selectedFile, setSelectedFile] = useState<{}>(null);
  const [selectedDoc, setSelectedDoc] = useState<{}>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      setSelectedDoc(e.target.files[0]);
    }
  };

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

    { name: 'short_description', label: 'Company short_description', type: 'text' },
    { name: 'investment_range', label: 'investment_range', type: 'text' },
    { name: 'team_info', label: 'team_info Name', type: 'text' },
    { name: 'business_plan', label: 'business_plan Name', type: 'text' },
    { name: 'use_of_investment', label: 'use_of_investment Name', type: 'text' },
    { name: 'financial_forecasts', label: 'financial_forecasts Name', type: 'text' },
    { name: 'team_detaill', label: 'team_detaill Name', type: 'text' },
    { name: 'market_analysis', label: 'market_analysis Name', type: 'text' },
    { name: 'legal_documents', label: 'legal_documents Name', type: 'file' },
    { name: 'contact_info', label: 'Company contact_info	null', type: 'text' },

    { name: 'oylik_daromadi', label: 'Monthly Revenue', type: 'number', step: '0.01' },
    { name: 'soff_foydasi', label: 'Net Profit', type: 'number', step: '0.01' },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Add all text fields to FormData
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('user', data.user);
    formData.append('category', data.category);

    formData.append('short_description', data.short_description);
    formData.append('investment_range', data.investment_range);
    formData.append('team_info', data.team_info);
    formData.append('business_plan', data.business_plan);
    formData.append('use_of_investment', data.use_of_investment);
    formData.append('financial_forecasts', data.financial_forecasts);
    formData.append('team_detaill', data.team_detaill);
    formData.append('market_analysis', data.market_analysis);
    formData.append('contact_info', data.contact_info);
    formData.append('rendement', `${data.rendement}%`);

    formData.append('price', parseFloat(data.price).toFixed(2));

    // Add the file
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    if (selectedDoc) {
      formData.append('legal_documents', selectedDoc);
    }

    try {
      await createProduct(formData).unwrap();
      reset();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <input type="file" name="image" accept="image/*" onChange={handleFileChange} />

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-medium rounded-md shadow-sm ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
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
