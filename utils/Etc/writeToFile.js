function writeToFile(content, filename, mimeType) {
  // Create a blob from the content
  const blob = new Blob([content], {
    type: mimeType
  });
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary anchor element
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  
  // Append to body, click, and clean up
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // Revoke the blob URL to free memory
  URL.revokeObjectURL(url);

export default writeToFile;