import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import { UploadedFile } from "@/types";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";


interface UploadModalProp {
  handleSubmit: (files: UploadedFile[]) => void;
}

export default function UploadModal({ handleSubmit }: UploadModalProp) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [open, setOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles
      .filter((file) => file.type === "application/pdf")
      .map((file) => ({
        file,
        id: Math.random().toString(36).substring(2),
      }));

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleContinue = () => {
    handleSubmit(files);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload file 📁</DialogTitle>
          <p className="text-sm text-muted-foreground">Add test result files here</p>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={cn(`
            h-[180px] border-2 border-dashed flex flex-col items-center justify-center p-4 rounded-2xl`,
            isDragActive? " border-primary" : " ")}>
          <input {...getInputProps()} />
          <Upload className="w-10 h-10 text-muted-foreground mb-2" />
          {isDragActive ? (
            <p className="text-sm text-center text-primary">Drop the files here ...</p>
          ) : (
            <p className="text-sm text-center text-muted-foreground">
              Drag 'n' drop some files here, or  <span className="text-primary cursor-pointer hover:underline">click to select files</span>
            </p>
          )}
        </div>
        <div className="flex items-center justify-between py-2">
          <p className="text-[12px] text-muted-foreground">Supported files: .pdf only</p>
          <p className="text-[12px] text-muted-foreground">Maximum files: 10</p>
        </div>
        {files.length > 0 && (
              <div className="mt-4">
                <div className="max-h-[150px] overflow-y-auto">
                  {files.map((file) => (
                    <div key={file.id} className="flex justify-between p-2" >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{file.file.name}</span>
                      </div>
                      <Button onClick={() => removeFile(file.id)} variant="destructive">
                        <X className="h-4 w-4"/>
                       </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
        <DialogFooter>
          <Button
            className="w-full"
            onClick={handleContinue}
            disabled={!files.length}
          >
            Continue
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
