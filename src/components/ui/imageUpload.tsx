import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { HiX } from "react-icons/hi";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Handle file change (file selection)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a file reader to generate the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Remove the selected image
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview("");
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4">
        {/* Display image preview if available */}
        {imagePreview && selectedFile && (
          <div className="relative w-full h-[23rem] bg-gray-200 border border-dashed border-gray-400 rounded-md">
            <img
              src={imagePreview}
              alt="Uploaded preview"
              className="w-full h-full object-cover rounded-md"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-3 right-2 bg-red-500 text-white rounded-full p-2"
            >
              <HiX size={16} />
            </button>
          </div>
        )}

        {/* Show upload area only if no image has been selected */}
        {!imagePreview && !selectedFile && (
          <div className="relative w-full h-60 bg-gray-200 border border-dashed border-gray-400 rounded-md flex justify-center items-center">
            <FaUpload className="text-4xl text-gray-500" />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              required
            />
          </div>
        )}
      </div>

      {/* Show upload button if no image is selected */}
    
        <div className="mt-4 flex justify-between">
          <button
            onClick={() =>
              (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()
            }
            className="px-4 py-2 Blue_button text-white rounded-md"
          >
            Upload Image
          </button>
        </div>

      
    </div>
  );
};

export default ImageUpload;
