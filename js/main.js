document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // FACULTIES AND ONLINE PROGRAMS DATA
    // =====================================

    const programsData = [

        // MEDICAL
        {
            id: "allied-health-sciences",
            title: "Allied Health Sciences",
            category: "medical",
            description: "Explore programs in allied health sciences.",
            url: "https://sgtuniversity.ac.in/ahs/"
        },
        {
            id: "dental-sciences",
            title: "Dental Sciences",
            category: "medical",
            description: "Explore education and opportunities in dental sciences.",
            url: "https://sgtuniversity.ac.in/dental/"
        },
        {
            id: "indian-medical-system",
            title: "Indian Medical System (Ayurveda)",
            category: "medical",
            description: "Explore traditional Indian medical education in Ayurveda.",
            url: "https://sgtuniversity.ac.in/ims/"
        },
        {
            id: "medicine-health-sciences",
            title: "Medicine and Health Sciences",
            category: "medical",
            description: "Explore medical and health sciences education.",
            url: "https://sgtuniversity.ac.in/medical/"
        },
        {
            id: "naturopathy-yogic-sciences",
            title: "Naturopathy and Yogic Sciences",
            category: "medical",
            description: "Explore naturopathy and yogic sciences.",
            url: "https://sgtuniversity.ac.in/fnys/"
        },
        {
            id: "nursing",
            title: "Nursing",
            category: "medical",
            description: "Explore nursing education and healthcare careers.",
            url: "https://sgtuniversity.ac.in/nursing/"
        },
        {
            id: "pharmacy",
            title: "Pharmacy",
            category: "medical",
            description: "Explore pharmaceutical education and sciences.",
            url: "https://sgtuniversity.ac.in/pharmacy/"
        },
        {
            id: "physiotherapy",
            title: "Physiotherapy",
            category: "medical",
            description: "Explore physiotherapy and rehabilitation sciences.",
            url: "https://sgtuniversity.ac.in/physiotherapy/"
        },
        {
            id: "pharmaceutical-sciences-research",
            title: "Pharmaceutical Sciences and Research",
            category: "medical",
            description: "Explore pharmaceutical sciences and research.",
            url: "https://sgtuniversity.ac.in/"
        },

        // NON-MEDICAL
        {
            id: "agricultural-sciences",
            title: "Agricultural Sciences",
            category: "non-medical",
            description: "Explore agricultural sciences and related fields.",
            url: "https://sgtuniversity.ac.in/agri/"
        },
        {
            id: "applied-basic-sciences",
            title: "Applied and Basic Sciences",
            category: "non-medical",
            description: "Explore applied and basic science disciplines.",
            url: "https://sgtuniversity.ac.in/science/"
        },
        {
            id: "behavioural-sciences",
            title: "Behavioural Sciences",
            category: "non-medical",
            description: "Explore human behaviour and behavioural sciences.",
            url: "https://sgtuniversity.ac.in/bhs/"
        },
        {
            id: "commerce-management",
            title: "Commerce & Management",
            category: "non-medical",
            description: "Explore commerce, business and management education.",
            url: "https://sgtuniversity.ac.in/cm/"
        },
        {
            id: "design",
            title: "Design",
            category: "non-medical",
            description: "Explore creative design and related disciplines.",
            url: "https://sgtuniversity.ac.in/fashion/"
        },
        {
            id: "education",
            title: "Education",
            category: "non-medical",
            description: "Explore education and teacher-training disciplines.",
            url: "https://sgtuniversity.ac.in/education/"
        },
        {
            id: "engineering-technology",
            title: "Engineering & Technology",
            category: "non-medical",
            description: "Explore engineering and technology disciplines.",
            url: "https://sgtuniversity.ac.in/engineering/"
        },
        {
            id: "hotel-tourism-management",
            title: "Hotel & Tourism Management",
            category: "non-medical",
            description: "Explore hospitality, tourism and hotel management.",
            url: "https://sgtuniversity.ac.in/htm/"
        },
        {
            id: "humanities-social-sciences",
            title: "Humanities, Social Sciences, and Liberal Arts",
            category: "non-medical",
            description: "Explore humanities, social sciences and liberal arts.",
            url: "https://sgtuniversity.ac.in/hsla/"
        },
        {
            id: "law",
            title: "Law",
            category: "non-medical",
            description: "Explore legal studies and law-related disciplines.",
            url: "https://sgtuniversity.ac.in/law/"
        },
        {
            id: "mass-communication",
            title: "Mass Communication and Media Technology",
            category: "non-medical",
            description: "Explore media, journalism and communication.",
            url: "https://sgtuniversity.ac.in/masscomm/"
        },

        // SGT ONLINE
        {
            id: "online-bba",
            title: "BBA",
            category: "online",
            description: "Bachelor of Business Administration.",
            url: "https://sgtonline.in/bba.html"
        },
        {
            id: "online-bca",
            title: "BCA",
            category: "online",
            description: "Bachelor of Computer Applications.",
            icon: "fa-laptop-code",
            url: "https://sgtonline.in/bca.html"
        },
        {
            id: "online-bcom",
            title: "B.COM",
            category: "online",
            description: "Bachelor of Commerce.",
            url: "https://sgtonline.in/bcom.html"
        },
        {
            id: "online-mba",
            title: "MBA",
            category: "online",
            description: "Master of Business Administration.",
            url: "https://sgtonline.in/mba.html"
        },
        {
            id: "online-mca",
            title: "MCA",
            category: "online",
            description: "Master of Computer Applications.",
            url: "https://sgtonline.in/mca.html"
        }

    ];

    // =====================================
    // DOM ELEMENTS
    // =====================================

    const programsGrid = document.getElementById("programs-grid");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("program-search-input");
    const emptyMessage = document.getElementById("program-empty");

    if (!programsGrid) return;

    // =====================================
    // UPDATE CATEGORY COUNTS
    // =====================================

    function updateCounts() {
        filterBtns.forEach(function (button) {
            const category = button.dataset.filter;
            const countElement = button.querySelector(".filter-count");

            if (!countElement) return;

            const count = programsData.filter(function (program) {
                return program.category === category;
            }).length;

            countElement.textContent = count;
        });
    }

    // =====================================
    // RENDER PROGRAM CARDS (NO ICONS, NO TAGS)
    // =====================================

    function renderPrograms(filter = "medical", searchQuery = "") {

        programsGrid.innerHTML = "";

        const query = searchQuery.trim().toLowerCase();

        const filteredPrograms = programsData.filter(function (program) {

            const matchesCategory =
                filter === "all" || program.category === filter;

            const searchableText = [
                program.title,
                program.description
            ].join(" ").toLowerCase();

            const matchesSearch = searchableText.includes(query);

            return matchesCategory && matchesSearch;
        });

        // Empty state
        if (filteredPrograms.length === 0) {
            emptyMessage.hidden = false;
            emptyMessage.innerHTML = `
                <i class="fa-solid fa-folder-open"></i>
                <h3>No matching faculties or programs found</h3>
                <p>Try another search or select a different category.</p>
            `;
            return;
        }

        emptyMessage.hidden = true;

        // Render Cards
        filteredPrograms.forEach(function (program) {

            const card = document.createElement("article");
            card.className = "program-card";

            // Title
            const title = document.createElement("h3");
            title.className = "program-title";
            title.textContent = program.title;

            // Description
            const description = document.createElement("p");
            description.className = "program-description";
            description.textContent = program.description;

            // Footer (Uniform Action Button)
            const footer = document.createElement("div");
            footer.className = "program-card-footer";

            if (program.url) {
                const link = document.createElement("a");
                link.className = "program-action";
                link.href = program.url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                const actionLabel =
                    program.category === "online"
                        ? "Explore Program"
                        : "Explore Faculty";

                link.appendChild(document.createTextNode(actionLabel + " "));

                const arrow = document.createElement("i");
                arrow.className = "fa-solid fa-arrow-right";
                arrow.setAttribute("aria-hidden", "true");

                link.appendChild(arrow);
                footer.appendChild(link);

            } else {
                const missingLink = document.createElement("span");
                missingLink.className = "program-link-missing";
                missingLink.textContent = "Link not available";
                footer.appendChild(missingLink);
            }

            card.append(title, description, footer);
            programsGrid.appendChild(card);
        });
    }

    // =====================================
    // CATEGORY FILTERS
    // =====================================

    filterBtns.forEach(function (button) {
        button.addEventListener("click", function () {
            filterBtns.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            renderPrograms(
                button.dataset.filter,
                searchInput ? searchInput.value : ""
            );
        });
    });

    // =====================================
    // SEARCH
    // =====================================

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const activeButton = document.querySelector(".filter-btn.active");
            renderPrograms(
                activeButton ? activeButton.dataset.filter : "medical",
                searchInput.value
            );
        });
    }

    // =====================================
    // INITIALIZE
    // =====================================

    updateCounts();
    renderPrograms("medical");

});


  function initCampusTabs() {
    const tabBtns = document.querySelectorAll('.tabs-header .tab-btn');
    const tabPanes = document.querySelectorAll('.tabs-content .tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();

        // 1. Get the target tab name from the button
        const targetTab = this.getAttribute('data-tab');
        if (!targetTab) return;

        // 2. Remove 'active' class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // 3. Add 'active' class to the clicked button
        this.classList.add('active');

        // 4. Show the matching tab pane
        const targetPane = document.getElementById(`tab-${targetTab}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // Ensure it executes regardless of where it is placed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCampusTabs);
  } else {
    initCampusTabs();
  }



  (function initHappeningsSlider() {
    const slides = document.querySelectorAll('.happening-slide');
    const prevBtn = document.getElementById('lhPrev');
    const nextBtn = document.getElementById('lhNext');
    let currentIndex = 0;

    if (!slides.length || !prevBtn || !nextBtn) return;

    function goToSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    nextBtn.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(prevIndex);
    });
  })();
