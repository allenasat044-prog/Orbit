import { useRef, useState, type ChangeEvent } from "react";

const MAX_FILE_BYTES = 15 * 1024 * 1024;

/** Crops the picture to the target shape, shrinks it and returns a small JPEG data URL. */
export async function resizeToDataUrl(file: File, width: number, height: number, quality: number): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("unreadable image"));
      el.src = url;
    });
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const sw = width / scale;
    const sh = height / scale;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no canvas");
    ctx.fillStyle = "#0d1526";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}

type Options = { width: number; height: number; quality?: number; onImage: (dataUrl: string) => void };

/** File picker for profile pictures: opens the chooser, resizes the choice, hands back a data URL. */
export function useImageUpload({ width, height, quality = 0.85, onImage }: Options) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleThumbnailClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please choose an image file.");
    if (file.size > MAX_FILE_BYTES) return setError("That image is larger than 15 MB.");
    try {
      onImage(await resizeToDataUrl(file, width, height, quality));
      setError("");
    } catch {
      setError("Could not read that image.");
    }
  };

  return { fileInputRef, handleThumbnailClick, handleFileChange, error };
}
