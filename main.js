// Splash Screen Handler
const initSplashScreen = () => {
  const splashScreen = document.getElementById("splash-screen");
  const countdownTimer = document.getElementById("countdown-timer");
  if (!splashScreen) return;

  // Show splash screen on page load
  splashScreen.style.display = "flex";

  let timeLeft = 5;
  const countdownInterval = setInterval(() => {
    timeLeft--;
    if (countdownTimer) {
      countdownTimer.textContent = timeLeft;
    }
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  // Hide splash screen after 5 seconds
  setTimeout(() => {
    splashScreen.classList.add("hidden");
    clearInterval(countdownInterval);

    // Remove splash screen completely after animation
    setTimeout(() => {
      if (splashScreen.parentNode) {
        splashScreen.parentNode.removeChild(splashScreen);
      }
    }, 800);
  }, 5000);
};

// Initialize splash screen on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSplashScreen);
} else {
  initSplashScreen();
}

AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: true,
  offset: 60,
});

const header = document.getElementById("site-header");
const backToTop = document.getElementById("backToTop");
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.scrollY > 60;
    header.classList.toggle("scrolled", scrolled);
    const heroHeight = document.getElementById("overview").offsetHeight;
    backToTop.classList.toggle("visible", window.scrollY > heroHeight * 0.5);
  },
  { passive: true },
);

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

mainNav.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.classList.remove("open");
    document.body.style.overflow = "";
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const statItems = document.querySelectorAll(".stat-item");

const startCounters = () => {
  statItems.forEach((item) => {
    const el = item.querySelector(".stat-number");
    const target = parseInt(el.dataset.target, 10);
    const counter = new countUp.CountUp(el, target, {
      duration: 2.2,
      separator: ",",
      suffix: target === 96 ? "%" : "",
    });
    if (!counter.error) counter.start();
  });
};

const heroSection = document.getElementById("overview");
const observerOptions = { threshold: 0.4 };
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(startCounters, 600);
      heroObserver.disconnect();
    }
  });
}, observerOptions);
heroObserver.observe(heroSection);

GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true });

const doughnutCtx = document.getElementById("doughnutChart").getContext("2d");
const ageData = {
  labels: ["6–8 tuổi", "9–11 tuổi", "12–14 tuổi", "15–17 tuổi"],
  datasets: [
    {
      data: [28, 45, 38, 37],
      backgroundColor: ["#BAE6FD", "#38BDF8", "#0EA5E9", "#0284C7"],
      borderWidth: 0,
      hoverOffset: 8,
    },
  ],
};
new Chart(doughnutCtx, {
  type: "doughnut",
  data: ageData,
  options: {
    responsive: true,
    cutout: "68%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed} em`,
        },
      },
    },
    animation: { animateRotate: true, duration: 1200 },
  },
});

const legendContainer = document.getElementById("doughnut-legend");
ageData.labels.forEach((label, i) => {
  const item = document.createElement("div");
  item.className = "legend-item";
  item.innerHTML = `<span class="legend-dot" style="background:${ageData.datasets[0].backgroundColor[i]}"></span>${label}`;
  legendContainer.appendChild(item);
});

const barCtx = document.getElementById("barChart").getContext("2d");
const weekLabels = [
  "Tuần 1",
  "Tuần 2",
  "Tuần 3",
  "Tuần 4",
  "Tuần 5",
  "Tuần 6",
  "Tuần 7",
  "Tuần 8",
];
const weekData = [20, 10, 13, 15, 20, 17, 20, 20];

const barGradient = barCtx.createLinearGradient(0, 0, 0, 300);
barGradient.addColorStop(0, "#0EA5E9");
barGradient.addColorStop(1, "#BAE6FD");

new Chart(barCtx, {
  type: "bar",
  data: {
    labels: weekLabels,
    datasets: [
      {
        label: "Thiếu nhi",
        data: weekData,
        backgroundColor: barGradient,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y} em tham gia`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: "Plus Jakarta Sans", size: 11 },
          color: "#94A3B8",
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(148, 163, 184, 0.15)" },
        ticks: {
          font: { family: "Plus Jakarta Sans", size: 11 },
          color: "#94A3B8",
        },
      },
    },
    animation: { duration: 1200, easing: "easeOutQuart" },
  },
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerH = header.offsetHeight;
        const top =
          target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  });
});
