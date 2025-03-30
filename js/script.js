document.addEventListener('DOMContentLoaded', function() {
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Function to update active section
    const updateActiveSection = () => {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const correspondingLink = document.querySelector(`a[href="#${section.id}"]`);
                
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
    
    // Update active section on page load
    updateActiveSection();

    // Smooth scrolling with active state update
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    });



document.addEventListener("DOMContentLoaded", () => {
    const ctaButton = document.querySelector(".cta");
    ctaButton.addEventListener("click", () => {
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });

    // Simple slider animation
    let index = 0;
    const reviews = document.querySelectorAll(".testimonial-slider p");

    function showReview() {
        reviews.forEach((review, i) => {
            review.style.display = i === index ? "block" : "none";
        });
        index = (index + 1) % reviews.length;
    }

    setInterval(showReview, 3000);
});


document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll("nav ul li a");
    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
        });
    });
});

// Gallery
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let autoRotateInterval;

    function updateSlidePositions() {
        slides.forEach(slide => {
            const position = parseInt(slide.dataset.position);
            
            if (position >= -1 && position <= 1) {
                slide.classList.remove('hidden');
            } else {
                slide.classList.add('hidden');
            }

            if (position < -2) {
                slide.dataset.position = '2';
            } else if (position > 2) {
                slide.dataset.position = '-2';
            }
        });
    }

    function moveSlides(direction) {
        slides.forEach(slide => {
            const currentPosition = parseInt(slide.dataset.position);
            const newPosition = currentPosition - direction;
            slide.dataset.position = newPosition;

            if (direction > 0 && newPosition === 1) {
                slide.classList.remove('hidden');
            } else if (direction < 0 && newPosition === -1) {
                slide.classList.remove('hidden');
            }
        });
        
        setTimeout(() => {
            updateSlidePositions();
        }, 500);
    }

    function startAutoRotate() {
        stopAutoRotate();
        autoRotateInterval = setInterval(() => {
            moveSlides(1);
        }, 2000);
    }

    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
    }

    prevBtn.addEventListener('click', () => {
        stopAutoRotate();
        moveSlides(-1);
        startAutoRotate();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoRotate();
        moveSlides(1);
        startAutoRotate();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoRotate();
            moveSlides(-1);
            startAutoRotate();
        } else if (e.key === 'ArrowRight') {
            stopAutoRotate();
            moveSlides(1);
            startAutoRotate();
        }
    });

    updateSlidePositions();
    startAutoRotate();

    document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoRotate);
    document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoRotate);



    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add visual feedback
            const button = this.querySelector('button[type="submit"]');
            button.style.transform = 'scale(0.98)';
            button.style.boxShadow = 'inset 3px 3px 6px var(--shadow-color), inset -3px -3px 6px var(--highlight-color)';
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                button.style.transform = '';
                button.style.boxShadow = '';
            }, 300);
        });
    }
});


// Typing Animation
const typingAnimationElement = document.getElementById("typing-animation");

// Create an array of typing text
const typingTexts = [ "Explorer"];

// Create a function to display the typing animation for a given text
function playTypingAnimation(text) {
  // Loop through each character and add it to the element
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      typingAnimationElement.textContent += text[i];
    }, i * 200); // Increase the delay to slow down the typing animation
  }

  // Once the animation is complete, reset the text and start over
  setTimeout(() => {
    typingAnimationElement.textContent = "";
    playTypingAnimation(
      typingTexts[(typingTexts.indexOf(text) + 1) % typingTexts.length]
    );
  }, text.length * 200);
}

// Start the typing animation loop
playTypingAnimation(typingTexts[0]);