import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const UPLOAD_RESUME_MUTATION = gql`
  mutation UploadResume($file: Upload!) {
    uploadResume(file: $file) {
      success
      message
      filename
      path
    }
  }
`;

const UploadResume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadResume, { data, error, loading }] = useMutation(UPLOAD_RESUME_MUTATION);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    try {
      const response = await uploadResume({
        variables: { file },
      });

      console.log(response.data.uploadResume);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button type="submit" disabled={!file || loading}>
        Upload Resume
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && data.uploadResume.success && <p>File uploaded successfully!</p>}
    </form>
  );
};

export default UploadResume;
