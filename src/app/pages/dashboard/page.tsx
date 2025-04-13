import UploadModal from "@/components/pdf-upload/upload-modal"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/ui/data-table/columns"
import { useGetResults } from "@/service/result/get-results"
import { useFileUpload } from "@/service/result/upload"
import { UploadedFile } from "@/types"

export default function Dashboard() {
  const { mutateAsync } = useFileUpload();
  const { data: testResults, isLoading } = useGetResults();

  if (!testResults || isLoading) {
    return <p>Loading...</p>
  }

  console.log(`Res: ${JSON.stringify(testResults,null, 2)}`);

  const handleSubmit = async (filesToUpload: UploadedFile[]) => {
    if (filesToUpload.length === 0) {
      console.log("No files selected.");
      return;
    }

    console.log(
      "Starting upload for:",
      filesToUpload.map((f) => f.file.name),
    );


    // Process files sequentially
    for (const uploadedFile of filesToUpload) {
      const { id, file } = uploadedFile;
      console.log(`Uploading ${file.name}...`);
      console.log(`Uploading actual file ${JSON.stringify(file, null, 2)}`);
      console.log(`File instance ${file instanceof File}`);


      try {
        // Use mutateAsync to wait for the upload to complete or fail
        const result = await mutateAsync(file);
        console.log(`Successfully uploaded ${file.name}:`, result);
      } catch (error: any) {
        console.error(`Failed to upload ${file.name}:`, error);
      }
    }

    console.log("All file uploads attempted.");
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mb-4">
        <UploadModal handleSubmit={handleSubmit}  />
      </div>
      <DataTable columns={columns} data={testResults} />
    </div>
  )
}
