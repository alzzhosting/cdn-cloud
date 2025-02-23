const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const fileName = document.getElementById('fileName');
        const status = document.getElementById('status');

        // Handle click on drop zone
        dropZone.addEventListener('click', () => fileInput.click());

        // Handle file selection
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                fileName.textContent = `Selected file: ${fileInput.files[0].name}`;
            }
        });

        // Drag and drop handlers
        function handleDragOver(e) {
            e.preventDefault();
            dropZone.classList.add('dragover');
        }

        function handleDragLeave(e) {
            e.preventDefault();
            dropZone.classList.remove('dragover');
        }

        function handleDrop(e) {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length) {
                fileInput.files = files;
                fileName.textContent = `Selected file: ${files[0].name}`;
            }
        }

        // Upload function
        async function uploadFile() {
            if (!fileInput.files.length) {
                showStatus('Please select a file first!', 'error');
                return;
            }

            const btn = document.querySelector('.btn');
            btn.innerHTML = `<div class="loading"></div> Uploading...`;
            btn.disabled = true;

            try {
                const formData = new FormData();
                formData.append('file', fileInput.files[0]);

                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                showStatus(`File uploaded successfully! <a href="${data.url}" target="_blank">View file</a>`, 'success');
            } catch (error) {
                console.error('Error:', error);
                showStatus('Upload failed. Please try again.', 'error');
            } finally {
                btn.innerHTML = `<i class="fas fa-upload"></i> Upload File`;
                btn.disabled = false;
            }
        }

        function showStatus(message, type) {
            status.className = type;
            status.innerHTML = message;
        }