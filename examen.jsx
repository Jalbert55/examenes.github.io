const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
let files;

document.getElementById("activityForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const activityName = document.getElementById("activityName").value;
  const dueDate = document.getElementById("dueDate").value;
  const description = document.getElementById("description").value;

  if (!activityName) {
    alert("Por favor, coloque un nombre a la actividad.");
    return;
  }

  console.log(activityName);
  console.log(dueDate);
  console.log(description);
});

const fileInputBtn = document.getElementById("fileInputBtn");
fileInputBtn.addEventListener("click", () => {
  input.click();
});

input.addEventListener("change", (e) => {
  files = input.files;
  dropArea.classList.add("active");
  showFiles(files);
  dropArea.classList.remove("active");
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Suelta para subir los archivos";
});

dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  dragText.textContent = "Arrastra y suelta los archivos aquí";
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  files = e.dataTransfer.files;
  showFiles(files);
  dropArea.classList.remove("active");
  dragText.textContent = "Arrastra y suelta los archivos aquí";
});

function showFiles(files) {
  if (files.length === undefined) {
    processFile(files);
  } else {
    for (const file of files) {
      processFile(file);
    }
  }
}

function processFile(file) {
  const docType = file.type;
  const validExtensions = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (validExtensions.includes(docType)) {
    const fileReader = new FileReader();
    const id = `file-${Math.random().toString(32).substring(7)}`;

    fileReader.addEventListener("load", (e) => {
      const fileUrl = fileReader.result;
      const fileContainer = document.createElement("div");
      fileContainer.id = id;
      fileContainer.classList.add("file-container");
      document.body.appendChild(fileContainer);

      const statusText = document.createElement("div");
      statusText.classList.add("status-text");
      fileContainer.appendChild(statusText);

      document.body.appendChild(fileContainer);
      const html = document.querySelector("#preview").innerHTML;
      document.querySelector("#preview").innerHTML =
        html + fileContainer.innerHTML;
    });

    fileReader.readAsDataURL(file);
    uploadFile(file, id);
  } else {
    alert("No es un archivo válido");
  }
}

async function uploadFile(file, id) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Muestra el mensaje "Cargando archivo..."
    document.querySelector("#status-container").innerHTML =
      `<span>Cargando archivo...</span>`;

    const response = await fetch(
      "https://032bb482-73c0-4289-922e-142d415d2f9c-00-212vxz7qdqe0s.riker.replit.dev:3000/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const responseText = await response.text();
    console.log(responseText);

    // Muestra el mensaje dentro del modal
    document.querySelector("#status-container").innerHTML =
      `<span class="success">Archivo subido correctamente...</span>`;
  } catch (error) {
    // Muestra el mensaje dentro del modal
    document.querySelector("#status-container").innerHTML =
      `<span class="failure">El archivo no pudo subirse...</span>`;
  }
}