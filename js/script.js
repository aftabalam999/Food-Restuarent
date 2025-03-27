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

