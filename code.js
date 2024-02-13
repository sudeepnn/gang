function openModal() {
    document.getElementById('uploadModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

function closeModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

async function uploadImage() {
    const form = document.getElementById('imageForm');
    const fileInput = document.getElementById('photo');
    const formData = new FormData(form);
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const imagePreview = document.getElementById('imagePreview');
    
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (fileInput.files[0] && fileInput.files[0].size > maxSize) {
        alert('File size exceeds 2MB limit. Please choose a smaller file.');
        return;
    }
    if (!fileInput.files[0]) {
        alert('Please select an image before uploading.');
        return;
    }
    loadingOverlay.style.display = 'flex';

    try {
        
        const response = await fetch('https://gang-api.onrender.com/upload', {
            method: 'POST',
            body: formData
        });
      

        if (response.ok) {
            clearImagePreview();
            console.log('Image uploaded successfully');
            form.reset();
            closeModal()
            // You can handle the response or perform other actions here
        } else {
            console.error('Failed to upload image. Server returned:', response.status, response.statusText);
        }
    } catch (error) {
        alert('Error:', error.message);
    }finally {
        // Hide the loading indicator after the upload is complete (success or failure)
        loadingOverlay.style.display = 'none';
        
        // Clear the form after successful submission
        form.reset();
    }
}



function previewImage(event) {
    const fileInput = event.target;
    const imagePreview = document.getElementById('imagePreview');

    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        // Read the selected file as a data URL and set it as the source of the image preview
        reader.onload = function (e) {
            const image = new Image();
            image.src = e.target.result;

            // Clear previous previews
            while (imagePreview.firstChild) {
                imagePreview.removeChild(imagePreview.firstChild);
            }

            // Append the new preview image
            imagePreview.appendChild(image);
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

function clearImagePreview() {
    const imagePreview = document.getElementById('imagePreview');
    
    // Clear the image preview container
    while (imagePreview.firstChild) {
        imagePreview.removeChild(imagePreview.firstChild);
    }
}