const form = document.getElementById("myForm");
const inputFile = document.getElementById("myFile");
const pourcentage = document.querySelector(".pourcentage");

const handleSubmit = (ev) => {
    ev.preventDefault();
    let xhr = new XMLHttpRequest();
    let formData = new FormData(form);
    xhr.open("post", "upload");
    
    console.log(xhr);

    xhr.upload.addEventListener("progress", (ev) => {
        const progress = Math.round(((ev.loaded / ev.total)*100));
       pourcentage.textContent =  progress+ "%";
       pourcentage.style.width = `${progress}%`;
       if(ev.loaded === ev.total){
           alert("Le fichier à bien été uploadé ");
            pourcentage.style.width="0%";
            pourcentage.textContent = "0%"

       }
    });
    xhr.send(formData)
}

form.addEventListener("submit", handleSubmit);
