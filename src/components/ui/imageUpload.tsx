import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { HiX } from "react-icons/hi";

const ImageUpload = () => {
  const [images, setImages] = useState<string[]>([]);

  // Handle image change (file selection)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && images.length < 4) { // Limit to 4 images
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result as string]); // Add the new image to the state
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove an image (clear it from the state)
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1); // Remove the image at the specified index
    setImages(newImages); // Update state with remaining images
  };

  // Handle clicking the Add Image button
  const handleAddImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the page from scrolling
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-[23rem] object-contain bg-gray-200 border border-dashed border-gray-400 rounded-md">
            <img
              src={image}
              alt={`Uploaded preview ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-3 right-2 bg-red-500 text-white rounded-full p-2"
            >
                <HiX size={16} />
            </button>
          </div>
        ))}

        {/* Show the upload area only if no images have been uploaded yet */}
        {images.length < 4 && images.length === 0 && (
          <div className="relative w-full h-60  bg-gray-200 border border-dashed border-gray-400 rounded-md flex justify-center items-center">
            <FaUpload className="text-4xl text-gray-500" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Button for adding more images if there are less than 4 images */}
      {images.length < 4 && (
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleAddImage}
            className="px-4 py-2 Blue_button text-white rounded-md"
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
