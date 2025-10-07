import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Array<{
    url: string;
    alt: string;
    type: string;
  }>;
  initialIndex?: number;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  isOpen,
  onClose,
  photos,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentPhoto = photos[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const downloadImage = () => {
    if (currentPhoto?.url) {
      window.open(currentPhoto.url, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Photo Gallery</DialogTitle>
          <DialogDescription>
            Viewing photo {currentIndex + 1} of {photos.length}
          </DialogDescription>
        </DialogHeader>

        <div className="relative bg-black/95 rounded-lg overflow-hidden">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-50 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Download Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-16 z-50 bg-black/50 hover:bg-black/70 text-white"
            onClick={downloadImage}
          >
            <Download className="w-5 h-5" />
          </Button>

          {/* Main Image */}
          <div className="relative flex items-center justify-center min-h-[70vh] p-8">
            <img
              src={currentPhoto?.url}
              alt={currentPhoto?.alt || `Photo ${currentIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
              }}
            />
          </div>

          {/* Navigation Buttons */}
          {photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full"
                onClick={goToNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Photo Info */}
          <div className="bg-gradient-to-t from-black/90 to-transparent p-6">
            <p className="text-white font-semibold text-lg">{currentPhoto?.alt}</p>
            {currentPhoto?.type && (
              <p className="text-white/70 text-sm mt-1 capitalize">{currentPhoto.type}</p>
            )}
          </div>

          {/* Thumbnail Strip */}
          {photos.length > 1 && (
            <div className="bg-black/70 p-4 overflow-x-auto">
              <div className="flex gap-2">
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex
                        ? 'border-primary scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoGalleryModal;

