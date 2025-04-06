import UploadModal from "@/components/pdf-upload/upload-modal"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/ui/data-table/columns"
import { testResults } from "@/data/results"
import { UploadedFile } from "@/types"

export default function Dashboard() {

  const handleSubmit = (files: UploadedFile[]) => {
    console.log(
      "Files to upload",
      files.map(f => f.file)
    );
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
