import { useForm } from 'react-hook-form';
import { useCreateProductMutation } from '@/store/slice/products';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

const ProductForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createProduct, { isLoading, isSuccess, isError }] = useCreateProductMutation();

  const [selectedFile, setSelectedFile] = useState();
  const [selectedDoc, setSelectedDoc] = useState();
  const [selectedDemo, setSelectedDemo] = useState();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedDoc(e.target.files[0]);
    }
  };
  const handleDemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedDemo(e.target.files[0]);
    }
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', defaultValue: 'Sample' },
    { name: 'location', label: 'Location', type: 'text', defaultValue: 'Sample' },
    { name: 'user', label: 'User ID', type: 'number', defaultValue: 1 },
    { name: 'category', label: 'Category', type: 'number', defaultValue: 1 },
    { name: 'rendement', label: 'Rendement (%)', type: 'number', defaultValue: 10 },
    { name: 'price', label: 'Price', type: 'number', step: '0.01', defaultValue: 100.0 },
    { name: 'short_description', label: 'Company short description', type: 'text', defaultValue: 'Sample ' },
    { name: 'investment_range', label: 'Investment Range', type: 'text', defaultValue: 'Sample' },
    { name: 'team_info', label: 'Team Info', type: 'text', defaultValue: 'Sample' },
    { name: 'business_plan', label: 'Business Plan', type: 'text', defaultValue: 'Sample' },
    { name: 'use_of_investment', label: 'Use of Investment', type: 'text', defaultValue: 'Sample' },
    { name: 'financial_forecasts', label: 'Financial Forecasts', type: 'text', defaultValue: 'Sample' },
    { name: 'team_details', label: 'Team Details', type: 'text', defaultValue: 'Sample' },
    { name: 'market_analysis', label: 'Market Analysis', type: 'text', defaultValue: 'Sample' },
    { name: 'contact_info', label: 'Company Contact Info', type: 'text', defaultValue: 'Sample' },
    { name: 'description', label: 'Description', type: 'textarea', defaultValue: 'Sample' },
  ];
  
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const formData = new FormData();
  
    // Append all text fields to FormData
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('user', String(data.user)); // Ensure `user` is a string
    formData.append('category', String(data.category)); // Ensure `category` is a string
    formData.append('rendement', `${data.rendement}%`);
    formData.append('price', parseFloat(data.price).toFixed(2));
    formData.append('short_description', data.short_description);
    formData.append('investment_range', data.investment_range);
    formData.append('team_info', data.team_info);
    formData.append('business_plan', data.business_plan);
    formData.append('use_of_investment', data.use_of_investment);
    formData.append('financial_forecasts', data.financial_forecasts);
    formData.append('team_details', data.team_details);
    formData.append('market_analysis', data.market_analysis);
    formData.append('contact_info', data.contact_info);
  
    // Append selected files
    if (selectedFile) {
      formData.append('image', selectedFile); // 'image' matches your API key for the image file
    }
    if (selectedDoc) {
      formData.append('legal_documents', selectedDoc); // 'legal_documents' matches your API key for the document
    }
    if (selectedDemo) {
      formData.append('prototype_demo', selectedDemo); // 'legal_documents' matches your API key for the document
    }
  
    try {
      // Call the createProduct mutation
      await createProduct(formData).unwrap();
      console.log("Product added successfully.");
      toast({
        description: "Product successfully created!",
        variant: "success",
        duration: 3000,
      });
      reset(); // Reset form fields
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        description: "Failed to create the product. Please try again.",
        variant: "destructive",
      });
    }
  };
  

  return (
    <div className="bg-gray-100  mx-auto py-9  shadow-md rounded-lg">
      <h2 className="text-2xl text-center font-bold mb-7">Create Product</h2>
      <form encType="w-full multipart/form-data" onSubmit={handleSubmit(onSubmit)} 
      className="max-w-7xl m-auto grid content-center justify-items-center grid-cols-2 gap-4 gap-x-14 text-custom-gray">
        {fields.map((field) => (
          <div key={field.name} className='w-full flex flex-col justify-center'>
            <label className="block text-sm font-medium capitalize leading-9">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                
                {...register(field.name, { required: true })}
                defaultValue={field.defaultValue || ''} 
                className="w-full  border-gray-300 p-2 px-3 rounded-xl"
              />
            ) : (
              <input
                type={field.type}
                required
                step={field.step || undefined}
                defaultValue={field.defaultValue || ''} 
                {...register(field.name, { required: true })}
                className="w-full p-2   border-gray-300 rounded-xl "
              />
            )}
          </div>
        ))}
        <div className='w-full grid'>
          <label htmlFor="image" className='text-sm'>Image</label>
          <input className='p-2 border-gray-300 rounded-xl' type="file" name="image" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className='w-full grid'>
          <label htmlFor="legal_documents" className='text-sm'>Legal Document</label>
          <input className='p-2 border-gray-300 rounded-xl' type="file" name="legal_documents" accept="image/*" onChange={handleDocChange} />
        </div>
        <div className='w-full grid'>
          <label htmlFor="prototype_demo" className='text-sm'>Prototype Demo</label>
          <input className='p-2 border-gray-300 rounded-xl' type="file" name="prototype_demo" accept="image/*" onChange={handleDemoChange} />
        </div>

        <button
          type="submit"
          className={`w-full Blue_button y mt-5 py-2 px-4 text-white font-medium rounded-xl shadow-sm ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
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
