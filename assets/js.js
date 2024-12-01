
    document.getElementById("toggleButton").addEventListener("click", function () {
        var titleContainer = document.getElementById("title-container");
        var detailsContainer = document.getElementById("details-container");
        var button = document.getElementById("toggleButton");
        var icon = button.querySelector("i");

        if (titleContainer.style.display === "none") {
            titleContainer.style.display = "block";
            detailsContainer.style.display = "block";
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
        } else {
            titleContainer.style.display = "none";
            detailsContainer.style.display = "none";
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
        }
    });




    document.getElementById("toggleButtonAttachments").addEventListener("click", function () {
        var titleContainer = document.getElementById("title-container-attachments");
        var dropZone = document.getElementById("dropZone");
        var button = document.getElementById("toggleButtonAttachments");
        var icon = document.getElementById("chevronIconAttachments");

        if (titleContainer.style.display === "none") {
            titleContainer.style.display = "block";
            dropZone.style.display = "block";
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
        } else {
            titleContainer.style.display = "none";
            dropZone.style.display = "none";
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
        }
    });

    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");

    dropZone.addEventListener("click", function () {
        fileInput.click();
    });

    dropZone.addEventListener("dragover", function (event) {
        event.preventDefault();
        dropZone.style.backgroundColor = "#e9ecef";
    });

    dropZone.addEventListener("dragleave", function () {
        dropZone.style.backgroundColor = "#f8f9fa";
    });

    dropZone.addEventListener("drop", function (event) {
        event.preventDefault();
        dropZone.style.backgroundColor = "#f8f9fa";
        const files = event.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener("change", function (event) {
        const files = event.target.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileElement = document.createElement("div");
            fileElement.classList.add("file-item");
            fileElement.textContent = file.name;
            fileList.appendChild(fileElement);
        }
    }


    function handleFiles(files) {
        for (let file of files) {
            const fileItem = document.createElement("div");
            fileItem.classList.add("file-item");

            const fileIcon = document.createElement("i");
            fileIcon.classList.add("file-icon");

            if (file.type.startsWith("image")) {
                fileIcon.classList.add("fas", "fa-image");
            } else if (file.type.startsWith("video")) {
                fileIcon.classList.add("fas", "fa-video");
            } else {
                fileIcon.classList.add("fas", "fa-file");
            }

            const fileName = document.createElement("span");
            fileName.classList.add("file-name");
            fileName.textContent = file.name;

            const fileDetails = document.createElement("div");
            fileDetails.classList.add("file-details");
            fileDetails.style.display = "flex";
            fileDetails.style.alignItems = "center";
            fileDetails.style.justifyContent = "center";
            fileDetails.style.flexGrow = "1";
            fileDetails.appendChild(fileIcon);
            fileDetails.appendChild(fileName);
            fileItem.appendChild(fileDetails);
            const downloadBtn = document.createElement("i");
            downloadBtn.classList.add("fas", "fa-download");
            downloadBtn.addEventListener("click", function () {
                const url = URL.createObjectURL(file);
                const a = document.createElement("a");
                a.href = url;
                a.download = file.name;
                a.click();
            });
            fileItem.appendChild(downloadBtn);

            const deleteBtn = document.createElement("i");
            deleteBtn.classList.add("fas", "fa-trash");
            deleteBtn.addEventListener("click", function () {
                fileItem.remove();
            });
            fileItem.appendChild(deleteBtn);

            fileList.appendChild(fileItem);
        }
    }

    document.getElementById('addUrl').addEventListener('click', function () {
        const url = prompt("Which URL would you like to paste here?");

        if (url) {
            const domain = new URL(url).hostname;
            const urlDiv = document.createElement('div');
            urlDiv.classList.add('url-item');
            const urlIcon = document.createElement('i');
            urlIcon.classList.add('url-icon');

            if (domain.includes('facebook.com')) {
                urlIcon.classList.add('fab', 'fa-facebook');
            } else if (domain.includes('twitter.com')) {
                urlIcon.classList.add('fab', 'fa-twitter');
                urlIcon.classList.add('fab', 'fa-google');
            } else if (domain.includes('youtube.com')) {
                urlIcon.classList.add('fab', 'fa-youtube');
            } else {
                urlIcon.classList.add('fas', 'fa-link');
            }

            const urlText = document.createElement('span');
            urlText.classList.add('url-text');
            urlText.textContent = url;

            const deleteBtn = document.createElement('i');
            deleteBtn.classList.add('fas', 'fa-trash', 'delete-btn');
            deleteBtn.addEventListener('click', function () {
                urlDiv.remove();
            });

            urlDiv.appendChild(urlIcon);
            urlDiv.appendChild(urlText);
            urlDiv.appendChild(deleteBtn);

            document.getElementById('urlList').appendChild(urlDiv);
        }
    });

    document.getElementById('chevronBtn').addEventListener('click', function () {
        const linkForm = document.getElementById('linkForm');
        const chevronIcon = document.querySelector('#chevronBtn i');

        $(linkForm).toggle();

        if (linkForm.style.display === 'none') {
            chevronIcon.classList.remove('fa-chevron-up');
            chevronIcon.classList.add('fa-chevron-down');
        } else {
            chevronIcon.classList.remove('fa-chevron-down');
            chevronIcon.classList.add('fa-chevron-up');
        }
    });


    document.getElementById('saveDraftBtn').addEventListener('click', function () {
        const title = document.getElementById('title').value;
        const details = document.getElementById('details').value;

        const draftData = {
            title: title,
            details: details
        };

        localStorage.setItem('draftData', JSON.stringify(draftData));

        alert('Draft Saved!');

        window.location.reload();
    });

    document.getElementById('submitBtn').addEventListener('click', function () {
        const title = document.getElementById('title').value;
        const details = document.getElementById('details').value;
        const attachmentsTitle = document.getElementById('title2').value;
        const fileInput = document.getElementById('fileInput').files;
        const linkTitle = document.getElementById('linkTitle').value;
        const url = document.getElementById('url').value;

        const formData = {
            title: title,
            details: details,
            attachments: attachmentsTitle,
            files: Array.from(fileInput).map(file => file.name),
            linkTitle: linkTitle,
            url: url
        };

        console.log('Form Data Submitted:', formData);

        alert('Form Submitted!');

        window.location.reload();
    });

    window.addEventListener('load', function () {
        const draftData = localStorage.getItem('draftData');

        if (draftData) {
            const { title, details } = JSON.parse(draftData);
            document.getElementById('title').value = title;
            document.getElementById('details').value = details;
        }
    });
