
import React, { useState, useCallback } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  className?: string;
}

const ImageUpload = ({ onImageChange, className }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleImageSelection(file);
    }
  }, []);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageSelection(e.target.files[0]);
    }
  };

  const handleImageSelection = (file: File) => {
    if (!file.type.match('image.*')) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
        onImageChange(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className={cn("w-full animate-fade-in", className)}>
      {!preview ? (
        <div
          className={cn(
            "dropzone",
            isDragging && "dropzone-active"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelection}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Upload an image</h3>
              <p className="text-muted-foreground text-sm">
                Drag and drop or click to browse
              </p>
            </div>
            <Button 
              variant="secondary" 
              className="mt-2"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              Select Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative w-full">
          <div className="aspect-video w-full rounded-lg overflow-hidden relative bg-muted">
            <img
              src={preview}
              alt="Uploaded preview"
              className="w-full h-full object-contain"
            />
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="absolute -top-3 -right-3 rounded-full shadow-lg"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
