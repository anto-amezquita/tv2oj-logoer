/****************************************
 * SECTION: One-page Navigation
 ****************************************/

// JavaScript to add active class to navigation items based on scroll position
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((navLink) => {
    navLink.classList.remove("active");
    if (navLink.getAttribute("href").substring(1) === current) {
      navLink.classList.add("active");
    }
  });
});

/****************************************
 * SECTION: Colors
 ****************************************/

// Function to create color card inner HTML
const createColorCardInnerHTML = (colorName, hex, rgb, cmyk) => {
  const colorCardHTML = `
    <div class="color-card bg-white rounded-lg shadow-md text-center overflow-hidden flex flex-col gap-0 w-44" 
         data-href="${hex}" data-rgb="${rgb}" data-cmyk="${cmyk}">
      <div class="w-full aspect-video bg-gray-200 inline-flex overflow-hidden m-0" 
           style="background-color: ${hex}" alt="${colorName}"></div>
      <div class="flex flex-col gap-2 pt-2 pb-4 px-4 overflow-hidden">
        <h2 class="color-name mb-1 text-lg text-black">${colorName}</h2>
        <button class="copy-href-btn inline-block p-1 mb-2 text-sm text-green-600 border border-green-600 transition hover:bg-green-600 hover:text-white">HEX</button>
        <div class="flex gap-2 w-full">
          <button class="copy-rgb-btn w-2/4 block p-1 text-sm text-green-600 border border-green-600 transition hover:bg-green-600 hover:text-white">RGB</button>
          <button class="copy-cmyk-btn w-2/4 block p-1 text-sm text-green-600 border border-green-600 transition hover:bg-green-600 hover:text-white">CMYK</button>
        </div>
      </div>
    </div>
  `;
  return colorCardHTML;
};

// Render Colors
const colorsSection = document.getElementById("colors");
tokensAPI.colors.forEach((color) => {
  const colorCard = createColorCardInnerHTML(
    color.Name,
    color.Hex,
    color.RGB,
    color.CMYK
  );
  colorsSection.insertAdjacentHTML("beforeend", colorCard);
});

// Color card: Copy color values
document.querySelectorAll(".color-card").forEach((card) => {
  card.querySelector(".copy-href-btn").addEventListener("click", () => {
    const button = card.querySelector(".copy-href-btn");
    copyText(button, card.dataset.href);
  });

  card.querySelector(".copy-rgb-btn").addEventListener("click", () => {
    const button = card.querySelector(".copy-rgb-btn");
    copyText(button, `rgb(${card.dataset.rgb})`);
  });

  card.querySelector(".copy-cmyk-btn").addEventListener("click", () => {
    const button = card.querySelector(".copy-cmyk-btn");
    copyText(button, `cmyk(${card.dataset.cmyk})`);
  });
});

// Function to copy text to clipboard
const copyText = (button, text) => {
  const originalText = button.innerText;
  button.innerText = "Kopieret!";
  navigator.clipboard.writeText(text);

  setTimeout(() => {
    button.innerText = originalText;
  }, 5000);
};

/****************************************
 * SECTION: Carousel
 ****************************************/

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all carousels
  document.querySelectorAll('.carousel').forEach(carousel => {
      initializeCarousel(carousel);
  });
});

function initializeCarousel(carouselElement) {
  // Set the first slide of this carousel as active
  const firstSlideColor = carouselElement.querySelector('.thumbnail').getAttribute('data-color');
  switchSlide(carouselElement, firstSlideColor);

  // Set up event listeners for this carousel
  carouselElement.querySelectorAll('.thumbnail').forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
          const color = this.getAttribute('data-color');
          switchSlide(carouselElement, color);
      });
  });
}

function switchSlide(carouselElement, color) {
  const slides = carouselElement.querySelectorAll('.carousel__slide');
  let activeSlide = carouselElement.querySelector('.carousel__slide.active');

  if (activeSlide) {
      activeSlide.classList.remove('active');
  }

  activeSlide = carouselElement.querySelector(`.carousel__slide[data-color="${color}"]`);
  if (activeSlide) {
      activeSlide.classList.add('active');
  }
}


/****************************************
 * SECTION: Glide Carousel (Design Guide)
 ****************************************/
//Initialize Glide carousel
new Glide(".glide").mount();

// Open Design guide
document.getElementById("open-designguide").addEventListener("click", function () {
  var elem = document.getElementById("designguide-carousel");
  elem.classList.toggle("fullscreen-active");
});

//Close design guide
document.getElementById("close-designguide").addEventListener("click", function () {
  var elem = document.getElementById("designguide-carousel");
  elem.classList.toggle("fullscreen-active");
});

