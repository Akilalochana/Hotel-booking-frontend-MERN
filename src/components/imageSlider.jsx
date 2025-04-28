import { useState } from "react"

export default function ImageSlider(props) {
  const images = props.images
  console.log(images)
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="w-full flex flex-col items-center">
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          className="object-cover w-full h-[300px] rounded-xl shadow-md"
        />
      )}

      <div className="flex justify-center items-center gap-4 mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`w-[70px] h-[70px] object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 ${
              image === selectedImage ? "border-4 border-[#53c28b]" : "border-2 border-transparent"
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
}