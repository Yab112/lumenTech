"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/lib/services/upload";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
  accept = "image/jpeg,image/jpg,image/png,image/gif,image/webp",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      toast.error(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    // Validate file type
    if (!accept.split(",").some((type) => file.type.match(type.trim()))) {
      toast.error("Invalid file type. Please upload an image.");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const fileUrl = await uploadFile(file, "image");
      onChange(fileUrl);
      toast.success("Image uploaded successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <div className="space-y-2">
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemove}
              disabled={disabled || uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors",
              disabled || uploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-accent",
            )}
            onClick={() => !disabled && !uploading && fileInputRef.current?.click()}
          >
            <Input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
              disabled={disabled || uploading}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-muted-foreground">
                  PNG, JPG, GIF, WEBP up to {maxSize / 1024 / 1024}MB
                </span>
              </div>
            )}
          </div>
        )}
        {value && !preview && (
          <div className="text-sm text-muted-foreground">
            Current image: <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{value}</a>
          </div>
        )}
      </div>
    </div>
  );
}

