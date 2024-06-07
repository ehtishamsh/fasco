import { generateUploadButton } from "@uploadthing/react";
import { generateUploadDropzone } from "@uploadthing/react";

export const UploadButton = generateUploadButton({
  url: "http://localhost:4000/api/uploadthing",
});

export const UploadDropzone = generateUploadDropzone({
  url: "http://localhost:4000/api/uploadthing",
});
