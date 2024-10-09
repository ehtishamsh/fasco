import { useState } from "react";

import axios from "axios";
import { X } from "lucide-react";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";

function ImageUpload({
  filePath,
  setFilePath,
}: {
  filePath: string;
  setFilePath: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [file, setFile] = useState<any>(null);
  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("https://fascobackend-production.up.railway.app/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res) {
          setFilePath(res.data.filePath);
          toast({
            title: "Success",
            description: "File uploaded successfully",
            variant: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteFile = async () => {
    const filename = filePath.slice(9);
    const deleteReq = await fetch(
      "https://fascobackend-production.up.railway.app/upload/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
      }
    );

    const data = await deleteReq.json();

    if (data.status === 200) {
      setFilePath("");
      setFile(null);
      toast({
        title: "Success",
        description: "File deleted successfully",
        variant: "success",
      });
    } else {
      setFilePath("");
      setFile(null);
      toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="w-full mx-auto my-5 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
      {!filePath && (
        <>
          <div className="relative w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
            <input
              type="file"
              onChange={fileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <span className="text-gray-500">
              Drag and drop or click to upload
            </span>
          </div>
          {file && (
            <div className="mt-4 text-gray-700">Selected file: {file.name}</div>
          )}
          <div className="mt-6">
            <Button type="button" onClick={uploadFile} variant={"default"}>
              Upload
            </Button>
          </div>
        </>
      )}

      {filePath && (
        <div className="mt-6">
          <div className="relative">
            <img
              src={`https://fascobackend-production.up.railway.app${filePath}`}
              alt="Uploaded"
              className="w-full max-h-96 object-cover border border-gray-300 rounded-lg"
            />
            <Button
              type="button"
              variant={"destructive"}
              className="absolute top-2 right-2"
              onClick={deleteFile}
              aria-label="Delete"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
