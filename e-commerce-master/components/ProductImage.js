import { useState } from "react";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <div className="text-center h-4/5 max-w-full ">
        <img className="h-4/5 max-w-full" src={activeImage} alt="" />
      </div>
      <div className="flex gap-2 mt-10">
        {images.map((image) => (
          <div
            key={image}
            className={`border-2 ${
              image === activeImage ? "border-gray-300" : "border-transparent"
            } h-40 w-40 p-2 cursor-pointer rounded-md`}
            onClick={() => setActiveImage(image)}
          >
            <img
              className="max-w-full max-h-full object-contain"
              src={image}
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
}
