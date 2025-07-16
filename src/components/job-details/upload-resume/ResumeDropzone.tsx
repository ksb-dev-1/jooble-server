import { SlCloudUpload } from "react-icons/sl";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
  fileName: string;
}

export default function ResumeDropzone({
  onChange,
  isPending,
  fileName,
}: Props) {
  return (
    <div className="relative border-2 border-dashed border-primary rounded h-40 flex items-center justify-center">
      <input
        id="resume-upload"
        type="file"
        accept=".pdf,.txt,.docx"
        onChange={onChange}
        disabled={isPending}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-describedby="file-upload-instructions"
      />
      <div className="flex flex-col items-center p-4 text-center">
        <SlCloudUpload className="text-3xl text-primary" aria-hidden="true" />
        <p className="font-medium mt-2">
          {fileName || "Drag and drop or click to select a file"}
        </p>
        <p id="file-upload-instructions" className="text-sm text-gray-500 mt-1">
          Supported formats: PDF, TXT, DOCX (Max 5MB)
        </p>
      </div>
    </div>
  );
}
