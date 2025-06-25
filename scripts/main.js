let scrollTimeout;
let pageNum = 1;

//Handle Loading
window.addEventListener("load", () => {
    setTimeout(() => {
        const preloader = document.getElementById("preloader");
        preloader.classList.add("fade-out");

        setTimeout(() => {
            preloader.style.display = "none"
        }, 500)
    }, 1000)
});

const sideNav = document.getElementById("side-nav");
const toolButton = document.getElementById("tool-button");
const overlay = document.getElementById("overlay");

const sections = [
    {
        page: document.getElementById("home-page"),
        img: document.querySelector("#home-page img"),
        content: document.querySelector("#home-page div")
    },
    {
        page: document.getElementById("about-page"),
        img: document.querySelector("#about-page img"),
        content: document.querySelector("#about-page div")
    },
    {
        page: document.getElementById("services-page"),
        img: document.querySelector("#services-page img"),
        content: document.querySelector("#services-page div"),
    },
    {
        page: document.getElementById("contact-page"),
    }
]

const handleSideNav = () => {
    sideNav.classList.add("active");
    overlay.classList.add("active");
}

document.addEventListener("click", function (e) {
  if (!sideNav.contains(e.target) && !toolButton.contains(e.target)) {
    sideNav.classList.remove("active");
    overlay.classList.remove("active");
  }
});

//Handle Nav Button for Style and page changing
const buttons = document.querySelectorAll(".nav-button");
buttons.forEach(btn => {
    btn.addEventListener("pointerdown", () => {
        const page = Number(btn.dataset.page);
        changePages(page);

    })
})

const changePages = (newPageNum) => {
    pageNum = newPageNum;

    sections.forEach((section, i) => {
        const isActive = i === newPageNum - 1;
        const offset = (i - (pageNum - 1)) * 100;
        section.page.style.transform = `translateY(${offset}%)`;

        if (section.img) {
            section.img.classList.toggle("active", isActive);
        }

        if (section.content) {
            section.content.classList.toggle("active", isActive);
        }
    });

    buttons.forEach(btn => {
        const isActive = parseInt(btn.dataset.page, 10) === newPageNum;
        btn.classList.toggle("active", isActive);
    });

    sideNav.classList.remove("active");
    overlay.classList.remove("active");
};

changePages(pageNum);

const handlePagesChange = (direction) => {
    if (direction === "down") {
        if (pageNum < 4) {
            pageNum = pageNum + 1;
            changePages(pageNum);
        }
    }
    else if (direction === "up") {
        if (pageNum > 1) {
            pageNum = pageNum - 1;
            changePages(pageNum);
        }
    }
}

//Debounce
let scrollLocked = false

//Desktop
const slidePages = (e) => {
    if (scrollLocked) return;

    if (Math.abs(e.deltaY) > 0) {
        handlePagesChange(e.deltaY > 0 ? "down" : "up")
    }

    scrollLocked = true;
    setTimeout(() => scrollLocked = false, 1000)
}

window.addEventListener("wheel", slidePages)

//Mobile
let startY = 0;

const swipePages = (e) => {
    if (scrollLocked) return;

    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY;

    if (Math.abs(deltaY) > 0) {
        handlePagesChange(deltaY > 0 ? "up" : "down");
    }

    scrollLocked = true;
    setTimeout(() => scrollLocked = false, 1000)
}

window.addEventListener("touchstart", (e) => {
    if (window.scrollY === 0 && e.touches[0].clientY - startY > 0) {
        e.preventDefault();
    }
    startY = e.touches[0].clientY;
}, {passive: false});

window.addEventListener("touchend", swipePages)

//Form handle
const form = document.getElementById("contact-form")

const handleSubmit = (e) => {
    console.log("Submited")
    e.preventDefault();

    const formData = new FormData(form);

    for (let [key, value] of formData.entries()) {
        console.log(key, value)
    }
}

form.addEventListener("submit", handleSubmit)

