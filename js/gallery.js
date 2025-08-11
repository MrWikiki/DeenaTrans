// ==== CONFIG ====
const username = "MrWikiki"; // ikut username GitHub
const repo = "DeenaTrans"; // ikut nama repo
const folder = "images"; // folder gambar

const carousel = document.getElementById("image-carousel");

fetch(`https://api.github.com/repos/${username}/${repo}/contents/${folder}`)
  .then(res => res.json())
  .then(files => {
    files.forEach(file => {
      if (file.type === "file" && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
        const img = document.createElement("img");
        img.src = file.download_url;
        img.alt = file.name;
        carousel.appendChild(img);
      }
    });

    // Auto-scroll effect
    let scrollAmount = 0;
    setInterval(() => {
      carousel.scrollBy({ left: 150, behavior: 'smooth' });
      scrollAmount += 150;
      if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
        scrollAmount = 0;
      }
    }, 2500);
  })
  .catch(err => {
    console.error("Error loading images:", err);
    carousel.innerHTML = "<p>⚠️ Failed to load images.</p>";
  });
