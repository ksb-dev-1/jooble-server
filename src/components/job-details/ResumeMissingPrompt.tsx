"use client";

export default function ResumeMissingPrompt({
  setShowUploadResume,
}: {
  setShowUploadResume: (show: boolean) => void;
}) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
        Resume Required
      </h2>
      <p>You need to upload a resume to apply for this position.</p>
      <button
        onClick={() => setShowUploadResume(true)}
        className="text-primary underline font-medium"
        aria-label="Upload resume"
      >
        Click here to upload your resume
      </button>
    </div>
  );
}
