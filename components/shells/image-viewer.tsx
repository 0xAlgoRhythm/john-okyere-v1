"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useImageStore } from "@/lib/store/use-image";
import Image from "next/image";
import React from "react";

export function ImageViewer() {
  const [isImageLoading, setImageLoading] = React.useState(true);
  const { setDialogOpen, isDialogOpen, selectedImage } = useImageStore();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="w-full max-w-screen-lg p-0 sm:rounded-xl overflow-hidden border-none bg-transparent shadow-none">
        <DialogTitle className="sr-only">Image Preview</DialogTitle>
        <DialogDescription className="sr-only">
          Full screen view of the selected image.
        </DialogDescription>
        {selectedImage && (
          <Image
            alt="Image Preview"
            src={selectedImage}
            width={1200}
            height={800}
            className="object-cover h-auto w-full object-center"
            style={{
              WebkitFilter: isImageLoading ? "blur(8px)" : "none",
              transition: "all 0.5s ease",
            }}
            onLoad={() => setImageLoading(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
