import React, { useState } from 'react';
import { toast } from 'sonner';

interface PhotoUploadProps {
  opacity: number;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ opacity }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div className="relative w-full h-full">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="w-full h-full object-contain"
          style={{ opacity }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5">
          <label className="cursor-pointer px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload an image to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;