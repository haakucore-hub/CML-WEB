import React, { useEffect, useState } from 'react';
import { useApplyJobStore } from '@/store/useApplyJobStore';
import { uploadFilesWithProgress } from '@/lib/storage';
import { toast } from "sonner";  

interface Props {
  open: boolean;
  onClose: () => void;
  jobName?: string;
}

const ApplyJobPopup: React.FC<Props> = ({ open, onClose, jobName = '' }) => {
  const { applyJob, loading, error, success } = useApplyJobStore();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [job, setJob] = useState(jobName);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  useEffect(() => {
    setJob(jobName);
  }, [jobName]);

  useEffect(() => {
    if (success) {
      toast.success("Application submitted successfully 🎉");
      setName('');
      setNumber('');
      setFile(null);
      setSubmitting(false);
      onClose();
    }
  }, [success, onClose]);

  useEffect(() => {
    if (error) {
      toast.error(error || "Something went wrong. Please try again."); 
    }
  }, [error]);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalError(null);
    const f = e.target.files && e.target.files[0];
    if (f) {
      setFile(f);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!name.trim() || !number.trim() || !job.trim()) {
      setLocalError('Please fill all required fields.');
      toast.error("Please fill all required fields."); 
      return;
    }
    if (!file) {
      setLocalError('Please upload your CV.');
      toast.error("Please upload your CV.");
      return;
    }

    try {
      setSubmitting(true);
      const urls = await uploadFilesWithProgress([file], 'job_applicants', (p) => setUploadProgress(p));
      const cv_url = urls[0] || '';

      await applyJob({ cv_url, name: name.trim(), number: number.trim(), jobName: job.trim() });
    } catch (err) {
      console.error(err);
      setLocalError('Failed to submit application. Please try again.');
      toast.error("Failed to submit application. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-cml-orange"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-cml-green mb-4 text-center">Apply for Job</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="tel"
            name="number"
            placeholder="Phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="text"
            name="job"
            placeholder="Job title"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          <div>
            <label className="block text-sm font-medium mb-1">Upload CV (PDF/DOC)</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          </div>

          {localError && <div className="text-sm text-red-500">{localError}</div>}
          {uploadProgress !== null && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-2">
                <div
                  className="h-3 bg-cml-green"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className="text-right text-xs text-gray-500">{uploadProgress}%</div>
            </>
          )}

          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full bg-cml-green text-white py-2 rounded font-semibold hover:bg-cml-green/90 transition-colors"
          >
            {submitting || loading ? 'Submitting...' : 'Apply Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobPopup;
