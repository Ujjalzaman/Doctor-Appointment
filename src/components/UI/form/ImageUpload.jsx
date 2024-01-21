import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUpload = ({ setSelectedImage }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <div class="change-photo-btn">
        <span className="d-flex align-items-center justify-content-center gap-2"><FaCloudUploadAlt className="icon" style={{ fontSize: '2rem' }} /> Upload Photo</span>
        <input type="file" class="upload" onChange={handleFileChange} />
      </div>
      <div>
        <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
      </div>
    </>
  );
};
export default ImageUpload;