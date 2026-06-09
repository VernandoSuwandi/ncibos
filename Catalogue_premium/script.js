const tenants = [
  {
    name: "Kopi Kenangan",
    floor: "GF",
    unit: "GF-12",
    category: "Food & Beverage",
    hours: "10:00 - 22:00",
    description: "Coffee shop nyaman untuk meeting ringan, kerja santai, dan menikmati kopi sore.",
    logo: "logos/kopken.png",
    detailPage: "kopken.html"
  },
  {
    name: "BOOST",
    floor: "2F",
    unit: "2F-08",
    category: "Food & Beverage",
    hours: "10:00 - 22:00",
    description: "Boost Juice Bars adalah gerai berspesialisasi dalam jus buah dan smoothie",
    logo: "logos/bus.jpg",
    detailPage: "bus.html"
  },
  {
    name: "UNIQLO",
    floor: "1F",
    unit: "1F-21",
    category: "Fashion",
    hours: "10:00 - 22:00",
    description: "Toko fashion modern untuk pakaian casual, formal, dan aksesoris harian.",
    logo: "logos/uni.webp",
    detailPage: "uni.html"
  },
  {
    name: "Ranch Market",
    floor: "LG",
    unit: "LG-01",
    category: "Supermarket",
    hours: "10:00 - 22:00",
    description: "Supermarket untuk kebutuhan harian, buah, sayur, makanan segar, dan produk impor.",
    logo: "logos/ranch-market.svg"
  },
  {
    name: "XXI",
    floor: "3F",
    unit: "3F-01",
    category: "Entertainment",
    hours: "10:00 - 23:00",
    description: "Bioskop modern untuk menonton film terbaru bersama teman dan keluarga.",
    logo: "logos/xxi.jpg",
    detailPage: "xxi.html"
  },
  {
    name: "Sociolla",
    floor: "UG",
    unit: "1F-11",
    category: "Beauty",
    hours: "10:00 - 22:00",
    description: "Tenant beauty untuk skincare, kosmetik, dan kebutuhan perawatan diri.",
    logo: "logos/beauty-glow.svg"
  }
];

const tenantGrid = document.querySelector(".tenant-grid");
const floorButtons = document.querySelectorAll(".floor-filter");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const tenantTitle = document.getElementById("tenantTitle");
const tenantSubtitle = document.getElementById("tenantSubtitle");

const tenantModal = document.getElementById("tenantModal");
const closeModal = document.getElementById("closeModal");
const modalLogo = document.getElementById("modalLogo");

let selectedFloor = "all";

const floorNames = {
  all: "Semua Tenant",
  LG: "Tenant LG",
  GF: "Tenant GF",
  UG: "Tenant UG",
  "1F": "Tenant 1F",
  "2F": "Tenant 2F",
  "3F": "Tenant 3F"
};

function getLogoContent(tenant) {
  if (tenant.logo) {
    return `<img src="${tenant.logo}" alt="Logo ${tenant.name}">`;
  }

  return tenant.name.charAt(0);
}

function renderTenants(data) {
  tenantGrid.innerHTML = "";

  if (data.length === 0) {
    tenantGrid.innerHTML = `
      <p class="empty-message">Tenant tidak ditemukan.</p>
    `;
    updateTenantHeading(0);
    return;
  }

  data.forEach((tenant) => {
    const tenantCard = document.createElement("div");
    tenantCard.classList.add("tenant-card");

    tenantCard.innerHTML = `
      <div class="tenant-logo">${getLogoContent(tenant)}</div>

      <div class="tenant-content">
        <div class="tenant-meta">${tenant.category}</div>
        <h3>${tenant.name}</h3>
        <p>${tenant.description}</p>

        <div class="tenant-footer">
          <span class="badge">${tenant.floor} • ${tenant.unit}</span>
          <span class="detail-hint">Detail →</span>
        </div>
      </div>
    `;

    tenantCard.addEventListener("click", () => {
      openTenantModal(tenant);
    });

    tenantGrid.appendChild(tenantCard);
  });

  updateTenantHeading(data.length);
}

function updateTenantHeading(total) {
  tenantTitle.textContent = floorNames[selectedFloor] || "Tenant";
  tenantSubtitle.textContent = `Menampilkan ${total} tenant yang sesuai dengan pilihan lantai dan pencarian.`;
}

function applyFilters() {
  const keyword = searchInput.value.toLowerCase().trim();

  let filteredTenants = tenants;

  if (selectedFloor !== "all") {
    filteredTenants = filteredTenants.filter((tenant) => {
      return tenant.floor === selectedFloor;
    });
  }

  if (keyword !== "") {
    filteredTenants = filteredTenants.filter((tenant) => {
      return (
        tenant.name.toLowerCase().includes(keyword) ||
        tenant.category.toLowerCase().includes(keyword) ||
        tenant.floor.toLowerCase().includes(keyword) ||
        tenant.unit.toLowerCase().includes(keyword) ||
        tenant.description.toLowerCase().includes(keyword)
      );
    });
  }

  renderTenants(filteredTenants);
}

floorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    floorButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    selectedFloor = button.dataset.floor;
    applyFilters();

    document.getElementById("tenant").scrollIntoView({
      behavior: "smooth"
    });
  });
});

searchButton.addEventListener("click", () => {
  applyFilters();

  document.getElementById("tenant").scrollIntoView({
    behavior: "smooth"
  });
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    applyFilters();

    document.getElementById("tenant").scrollIntoView({
      behavior: "smooth"
    });
  }
});

function openTenantModal(tenant) {
  const modalLogo = document.getElementById("modalLogo");

  if (tenant.logo) {
    modalLogo.innerHTML = `<img src="${tenant.logo}" alt="${tenant.name} logo">`;
  } else {
    modalLogo.textContent = tenant.name.charAt(0);
  }

  document.getElementById("modalName").textContent = tenant.name;
  document.getElementById("modalCategory").textContent = tenant.category;
  document.getElementById("modalFloor").textContent = tenant.floor;
  document.getElementById("modalUnit").textContent = tenant.unit;
  document.getElementById("modalHours").textContent = tenant.hours;
  document.getElementById("modalDescription").textContent = tenant.description;

  const locationBtn = document.querySelector(".location-btn");

  locationBtn.onclick = () => {
    window.location.href = tenant.detailPage;
  };

  tenantModal.classList.add("show");
}

closeModal.addEventListener("click", () => {
  tenantModal.classList.remove("show");
});

tenantModal.addEventListener("click", (event) => {
  if (event.target === tenantModal) {
    tenantModal.classList.remove("show");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    tenantModal.classList.remove("show");
  }
});

renderTenants(tenants);
