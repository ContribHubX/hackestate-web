import type { ColumnDef } from "@tanstack/react-table"
import { FileText, User, FileBox, Calendar } from "lucide-react"
import type { TestResult } from "@/types/test-result"

export const columns: ColumnDef<TestResult>[] = [
  {
    accessorKey: "testName",
    header: ({ column }) => (
      <div className="flex items-center space-x-1 font-medium">
        <span>Test Name</span>
      </div>
    ),
    cell: ({ row }) => {
      const testName = row.getValue("testName") as string
      return (
        <div className="flex items-center gap-2 font-medium">
          <FileText className="h-4 w-4 text-primary" />
          <span>{testName}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "userPid",
    header: ({ column }) => (
      <div className="flex items-center space-x-1 font-medium">
        <span>PID</span>
      </div>
    ),
    cell: ({ row }) => {
      const pid = row.getValue("userPid") as string
      return (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-muted-foreground text-sm">{pid}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <div className="flex items-center space-x-1 font-medium">
        <span>Size</span>
      </div>
    ),
    cell: ({ row }) => {
      const size = row.getValue("size") as number

      const formattedSize = formatFileSize(size)

      return (
        <div className="flex items-center gap-2">
          <FileBox className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-muted-foreground text-sm">{formattedSize}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "testDate",
    header: ({ column }) => (
      <div className="flex items-center space-x-1 font-medium">
        <span>Date</span>
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.testDate!)

      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })

      return (
        <div className="flex items-center gap-2" title={`${formatted} at ${time}`}>
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{formatted}</span>
        </div>
      )
    },
  },
]

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

