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
