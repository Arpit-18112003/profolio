

// Typing animation — loops forever: types then erases "hello , I'am Arpit Dhakad"
const textToType = "hello , I'am Arpit Dhakad";
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 100;   
const erasingSpeed = 50;   // Speed per character while erasing
const pauseAfterType = 1800; // Pause (ms) after full text is typed
const pauseAfterErase = 400; // Pause (ms) after text is fully erased

const typingTextSpan = document.getElementById("typing-text");

function type() {
    if (!typingTextSpan) return;

    if (isDeleting) {
        // Erase one character at a time
        typingTextSpan.textContent = textToType.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Type one character at a time
        typingTextSpan.textContent = textToType.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? erasingSpeed : typingSpeed;

    if (!isDeleting && charIndex === textToType.length) {
        // Finished typing — pause then start erasing
        delay = pauseAfterType;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Finished erasing — pause then start typing again
        isDeleting = false;
        delay = pauseAfterErase;
    }

    setTimeout(type, delay);
}

document.addEventListener("DOMContentLoaded", () => {
    if (typingTextSpan) {
        setTimeout(type, 800);
    }

    document.querySelectorAll("[data-scroll-target]").forEach((navItem) => {
        const scrollToSection = () => {
            const target = document.querySelector(navItem.dataset.scrollTarget);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        };

        navItem.addEventListener("click", scrollToSection);
        navItem.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                scrollToSection();
            }
        });
    });
});
