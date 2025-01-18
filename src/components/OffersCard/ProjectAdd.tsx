import { useForm } from 'react-hook-form';
import { useCreateProductMutation } from '@/store/slice/products';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ProductForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast()
  const [createProduct, { isLoading, isSuccess, isError }] = useCreateProductMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
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
    { name: 'short_description', label: 'Short Description', type: 'text' },
    { name: 'investment_range', label: 'Investment Range', type: 'text' },
    { name: 'team_info', label: 'Team Info', type: 'text' },
    { name: 'business_plan', label: 'Business Plan', type: 'text' },
    { name: 'use_of_investment', label: 'Use of Investment', type: 'text' },
    { name: 'financial_forecasts', label: 'Financial Forecasts', type: 'text' },
    { name: 'team_detaill', label: 'Team Detail', type: 'text' },
    { name: 'market_analysis', label: 'Market Analysis', type: 'text' },
    { name: 'legal_documents', label: 'Legal Documents', type: 'file' },
    { name: 'contact_info', label: 'Contact Info', type: 'text' },
    { name: 'oylik_daromadi', label: 'Monthly Revenue', type: 'number', step: '0.01' },
    { name: 'soff_foydasi', label: 'Net Profit', type: 'number', step: '0.01' },
  ];

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Add all text and number fields to FormData
    Object.keys(data).map((key) => {
      if (data[key]) {
        formData.append(key, String(data[key]));
      }
    });

    // Add selected files to FormData
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    if (selectedDoc) {
      formData.append('legal_documents', selectedDoc);
    }

    try {
      await createProduct(formData).unwrap();
      reset(); // Clear the form
      setSelectedFile(null); // Clear file inputs
      setSelectedDoc(null);
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        variant: "destructive",
        description: "Xatolik",
      })

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
                {...register(field.name, { required: field.type !== 'file' })}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Legal Documents</label>
          <input type="file" name="legal_documents" accept=".pdf,.doc,.docx" onChange={handleDocChange} />
        </div>

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
 