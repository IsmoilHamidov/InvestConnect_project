import { useGetProductQuery } from "@/store/slice/products";
import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const imageBasicUrl = "https://bakirali007.pythonanywhere.com/"


const ImageSlider = () => {
  const { productid } = useParams<{ productid: string | any }>();
  const { data, error, isLoading } = useGetProductQuery(productid);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (data?.image) {
      setImages([
        data.image]);
      setSelectedImage(data.image);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div className="flex flex-col justify-between w-[47%] gap-y-4">
      <div className="w-full h-auto">
        <img
          src={imageBasicUrl + selectedImage}
          alt="Selected"
          className="border h-[23rem] w-full object-cover rounded-xl"
        />
      </div>

      <div className="flex w-full gap-x-5">
        {images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer transition-transform transform 
            hover:scale-105 rounded-lg ${selectedImage === image ? "ring-[2.5px] ring-[#B29C6F]" : ""
              }`}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={imageBasicUrl + image}
              alt={`Thumbnail ${index + 1}`}
              className="h-16 w-20 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
