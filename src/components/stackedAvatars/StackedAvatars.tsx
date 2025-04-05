import Image from "next/image";

interface StackedAvatarsProps {
  images: string[]; // Array of image URLs
}

const StackedAvatars: React.FC<StackedAvatarsProps> = ({ images }) => {
  return (
    <div className="relative flex items-center justify-start">
      {images.map((image, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-300 ${
            index > 0 ? "-ml-4" : ""
          } relative`}
          style={{ zIndex: index + 10 }} // Dynamic stacking order
        >
          <Image
            src={image}
            alt={`Avatar ${index + 1}`}
            width={20}
            height={20}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default StackedAvatars;
