const sections  = document.querySelectorAll(".section");
const allSec = document.querySelector(".main-content");

window.addEventListener('scroll',reveal);

        function reveal(){
            var reveals = document.querySelectorAll('.reveal');

            for(var i=0; i<reveals.length; i++)
            {
                var windowheight = window.innerHeight;
                var revealtop = reveals[i].getBoundingClientRect().top;
                var revealpoint = 150;

                if(revealtop < windowheight-revealpoint)
                {
                    reveals[i].classList.add('active');
                }
                else{
                    reveals[i].classList.remove('active');
                }
            }
        }

const spans = document.querySelectorAll(".progress-bar span");

spans.forEach((span) =>{
    span.style.width = span.dataset.width;
    span.innerHTML = span.dataset.width;
})


document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".more-btn").forEach(button => {
            button.addEventListener("click", function () {
                const moreText = this.previousElementSibling;
                if (moreText.style.display === "inline") {
                    moreText.style.display = "none";
                    this.textContent = "More...";
                } else {
                    moreText.style.display = "inline";
                    this.textContent = "Less";
                }
            });
        });
    });









    document.addEventListener("DOMContentLoaded", function () {
        const galleryOverlay = document.querySelector(".gallery-overlay");
        const galleryImage = document.getElementById("gallery-image");
        const prevBtn = document.querySelector(".gallery-prev");
        const nextBtn = document.querySelector(".gallery-next");
        const closeBtn = document.querySelector(".gallery-close");
    
        let currentImages = [];
        let currentIndex = 0;
    
        document.querySelectorAll(".open-gallery").forEach(button => {
            button.addEventListener("click", function () {
                currentImages = this.getAttribute("data-images").split(",");
                currentIndex = 0;
                updateGalleryImage();
                galleryOverlay.style.display = "flex";
            });
        });
    
        function updateGalleryImage() {
            if (currentImages.length > 0) {
                galleryImage.src = currentImages[currentIndex];
            }
        }
    
        prevBtn.addEventListener("click", function () {
            if (currentIndex > 0) {
                currentIndex--;
                updateGalleryImage();
            }
        });
    
        nextBtn.addEventListener("click", function () {
            if (currentIndex < currentImages.length - 1) {
                currentIndex++;
                updateGalleryImage();
            }
        });
    
        closeBtn.addEventListener("click", function () {
            galleryOverlay.style.display = "none";
        });
    });
    