// 1. Advanced Theme Logic (System Aware)
const toggleBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

// Check for saved user preference or use system settings
if (currentTheme === "light") {
  document.body.classList.add("light-theme");
  toggleBtn.textContent = "🌙";
} else if (window.matchMedia("(prefers-color-scheme: light)").matches && !currentTheme) {
  document.body.classList.add("light-theme");
  toggleBtn.textContent = "🌙";
}

toggleBtn.addEventListener("click", () => {
  // Smoothly toggle the class
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  
  // Save preference
  localStorage.setItem("theme", isLight ? "light" : "dark");
  
  // Icon Swap with a slight rotation effect (handled via CSS transition)
  toggleBtn.textContent = isLight ? "🌙" : "🌞";
});

// 2. Humanized Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["College Student", "AI-ML Enthusiast", "Full-Stack Coder", "UI/UX Designer"];
const typingDelay = 120; // Slightly slower for readability
const erasingDelay = 60;
const newTextDelay = 2500; 

let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    // Add a blinking cursor class while typing
    if(!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
    
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    
    // Randomize speed slightly to feel like a real human typing
    const randomSpeed = typingDelay + Math.random() * 50;
    setTimeout(type, randomSpeed);
  } else {
    typedTextSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    typedTextSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

// 3. Scroll Reveal Logic (The "Pro" Feel)
// This makes sections fade in as you scroll down to them
const revealOnScroll = () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 150;
    
    if (sectionTop < triggerPoint) {
      section.classList.add('active');
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // Initiate Typing
  if (textArray.length) setTimeout(type, 1000);
  
  // Attach Scroll Listener
  window.addEventListener('scroll', revealOnScroll);
});

const magButtons=document.querySelectorAll('.social-links');

magButtons.forEach((btn) =>{
    btn.addEventListener('mousemove', (e) => {
      const rect=btn.getBoundingClientRect();
      
      const x=e.clientX- rect.left - rect.width/2;
      const y=e.clientY - rect.top - rect.height/2;
      btn.style.transform=`translate(${x*0.3}px,${y*0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.tranform=`translate(0px,0px)`;
  });
});

document.querySelectorAll(".work-card").forEach((card) => {
  card.onmousemove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
});


let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come back! 🚀";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});
