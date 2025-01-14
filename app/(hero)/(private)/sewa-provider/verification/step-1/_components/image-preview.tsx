import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PreviewImage {
  url: string;
  name: string;
}

const ImagePreviewSlider = ({
  previewImages,
}: {
  previewImages: PreviewImage[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === previewImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? previewImages.length - 1 : prevIndex - 1
    );
  };

  if (previewImages.length === 0) {
    return (
      <div className="w-full max-w-3xl mt-8">
        <h2 className="text-xl font-semibold text-center mb-4">
          Preview of Documents
        </h2>
        <div className="h-80 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No documents uploaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mt-8">
      <h2 className="text-xl font-semibold text-center mb-4">
        Preview of Documents
      </h2>
      <div className="relative h-80 bg-gray-100 rounded-lg overflow-hidden">
        {/* Image Container */}
        <div className="h-full w-full relative">
          {/* <img
            src={previewImages[currentIndex].url}
            alt={previewImages[currentIndex].name}
            className="h-full w-full object-contain"
          /> */}
          <Image
            src={previewImages[currentIndex].url}
            alt={previewImages[currentIndex].name}
            layout="fill"
            className="object-contain"
          />

          <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2 text-center">
            {previewImages[currentIndex].name}
          </p>
        </div>

        {/* Navigation Controls */}
        {previewImages.length > 1 && (
          <>
            <button
              onClick={goToPrevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Pagination Indicators */}
        {previewImages.length > 1 && (
          <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2">
            {previewImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-4"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Counter */}
      {previewImages.length > 1 && (
        <p className="text-center mt-2 text-sm text-gray-500 font-medium">
          Image {currentIndex + 1} of {previewImages.length}
        </p>
      )}
    </div>
  );
};

export default ImagePreviewSlider;
