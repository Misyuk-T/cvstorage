const FileUploadField = ({ name, register, onChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onChange(name, file);
  };

  return (
    <input
      {...register(name)}
      type="file"
      id={name}
      onChange={handleFileChange}
    />
  );
};

export default FileUploadField;
