// Utility function to convert image URL to base64
export const toBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = reject;
    xhr.responseType = 'blob';
    xhr.open('GET', url);
    
    // Add CORS headers if needed
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send();
  });
};

// Alternative method using canvas for better compatibility
export const urlToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Enable CORS
    
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      try {
        const base64 = canvas.toDataURL('image/png');
        resolve(base64);
      } catch (e) {
        reject(e);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
};

// Function to extract image URL from front_photo_path
export const getImageUrl = (frontPhotoPath) => {
  try {
    if (!frontPhotoPath) return null;
    
    // Handle string or already parsed array
    let urls;
    if (typeof frontPhotoPath === 'string') {
      urls = JSON.parse(frontPhotoPath);
    } else {
      urls = frontPhotoPath;
    }
    
    return Array.isArray(urls) && urls.length > 0 ? urls[0] : null;
  } catch (e) {
    console.error('Error parsing front_photo_path:', e);
    return null;
  }
};