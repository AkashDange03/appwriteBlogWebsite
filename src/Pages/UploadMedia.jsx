import React, { useState } from 'react';
import axios from 'axios';

const UploadMedia = () => {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Replace YOUR_CLOUD_NAME with your actual Cloudinary cloud name
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dphzerv30/upload';
  const UPLOAD_PRESET = 'ml_default'; // Replace with your unsigned upload preset name

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedUrl('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedUrl(response.data.secure_url);
      setError('');
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container flex flex-col justify-center items-center h-screen px-10" >
      <div className='border-border'>
      <h2>Upload Media</h2>
      <input
        type="file"
        accept="video/*,audio/*"
        onChange={handleFileChange}
        className="border-border border-2 p-4 rounded-md"
        style={{ margin: '20px 0' }}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="m-4"
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: uploading ? 'not-allowed' : 'pointer',
        }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {uploadedUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>File Uploaded Successfully:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
        </div>
      )}
      </div>
     
    </div>
  );
};

export default UploadMedia;
