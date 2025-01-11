import { useCreateProductMutation } from '@/store/slice/products';
import React from 'react';
import { useForm } from 'react-hook-form';

type PrivateInformation = {
  kampanya_egasi: string;
  kontact: string;
  campany_name: string;
  oylik_daromadi: number;
  soff_foydasi: number;
};

type ProductFormData = {
  user: number;
  name: string;
  rendement: string;
  location: string;
  image: FileList;
  description: string;
  category: string;
  price: number;
  product_file: FileList;
  private_information: PrivateInformation;
};

const CreateProductForm: React.FC = () => {
  const { handleSubmit, control, register } = useForm<ProductFormData>();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
  
    // Прочие данные
    formData.append('user', String(data.user));
    formData.append('name', data.name);
    formData.append('rendement', data.rendement);
    formData.append('location', data.location);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', String(data.price));
    
    if (data.image.length) {
      formData.append('image', data.image[0]);
    }
    if (data.product_file.length) {
      formData.append('product_file', data.product_file[0]);
    }
  
    // Данные для private_information
    const privateInformation = {
      kampanya_egasi: data.private_information.kampanya_egasi,
      kontact: data.private_information.kontact,
      campany_name: data.private_information.campany_name,
      oylik_daromadi: data.private_information.oylik_daromadi,
      soff_foydasi: data.private_information.soff_foydasi,
    };
  
    formData.append('private_information', JSON.stringify(privateInformation));
  
    try {
      await createProduct(formData).unwrap();
      alert('Product created successfully!');
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('user')} type="hidden" value={1} />
      <div>
        <label>Product Name</label>
        <input {...register('name')} className="border" required />
      </div>
      <div>
        <label>Rendement</label>
        <input {...register('rendement')} className="border" required />
      </div>
      <div>
        <label>Location</label>
        <input {...register('location')} className="border" required />
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description')} className="border" required />
      </div>
      <div>
        <label>Category</label>
        <input {...register('category')} className="border" required />
      </div>
      <div>
        <label>Price</label>
        <input {...register('price')} type="number" className="border" required />
      </div>
      <div>
        <label>Image</label>
        <input {...register('image')} type="file" className="border" />
      </div>
      <div>
        <label>Product File</label>
        <input {...register('product_file')} type="file" className="border" />
      </div>
      <fieldset>
        <legend>Private Information</legend>
        <div>
          <label>Owner</label>
          <input
            {...register('private_information.kampanya_egasi')}
            className="border"
            required
          />
        </div>
        <div>
          <label>Contact</label>
          <input
            {...register('private_information.kontact')}
            className="border"
            required
          />
        </div>
        <div>
          <label>Company Name</label>
          <input
            {...register('private_information.campany_name')}
            className="border"
            required
          />
        </div>
        <div>
          <label>Monthly Income</label>
          <input
            {...register('private_information.oylik_daromadi')}
            type="number"
            className="border"
            required
          />
        </div>
        <div>
          <label>Net Profit</label>
          <input
            {...register('private_information.soff_foydasi')}
            type="number"
            className="border"
            required
          />
        </div>
      </fieldset>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default CreateProductForm;
