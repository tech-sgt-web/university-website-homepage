/**
 * Aetheria International University - Main JavaScript Module
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Academic Programs Data & Filter
  const programsData = [
    {
      id: 'cs',
      title: 'B.S. Computer Science & Artificial Intelligence',
      level: 'undergraduate',
      department: 'School of Engineering & Applied Sciences',
      duration: '4 Years',
      credits: '128 Credits',
      tuition: '$18,500 / yr',
      description: 'Master core algorithms, deep neural networks, software architecture, and quantum computing fundamentals.',
      curriculum: ['Data Structures & Algorithms', 'Machine Learning & Neural Networks', 'Distributed Systems', 'Computer Vision Lab'],
      careerPaths: ['AI Research Engineer', 'Full-Stack Architect', 'Robotics Systems Specialist']
    },
    {
      id: 'bio',
      title: 'B.S. Biomedical Engineering & Regenerative Medicine',
      level: 'undergraduate',
      department: 'School of Medicine & Biotechnology',
      duration: '4 Years',
      credits: '132 Credits',
      tuition: '$19,200 / yr',
      description: 'Integrate engineering principles with biological sciences to pioneer artificial organs and gene therapy devices.',
      curriculum: ['Biomaterials Design', 'Tissue Engineering', 'Biomechanics', 'Genomic Editing Techniques'],
      careerPaths: ['Biomedical Device Designer', 'Clinical Engineer', 'Biotech R&D Scientist']
    },
    {
      id: 'bus',
      title: 'M.B.A. Global Executive Leadership & Innovation',
      level: 'postgraduate',
      department: 'Aetheria Business School',
      duration: '2 Years',
      credits: '60 Credits',
      tuition: '$24,000 / yr',
      description: 'Transform organizational strategy, drive sustainable finance, and manage global venture innovation.',
      curriculum: ['Corporate Strategic Management', 'Venture Capital & Private Equity', 'Digital Business Models', 'Global Supply Chain Strategy'],
      careerPaths: ['Chief Executive Officer', 'Management Consultant', 'Venture Capital Associate']
    },
    {
      id: 'ds',
      title: 'M.S. Data Science & Business Analytics',
      level: 'postgraduate',
      department: 'School of Computational Mathematics',
      duration: '2 Years',
      credits: '48 Credits',
      tuition: '$21,500 / yr',
      description: 'Turn massive datasets into actionable strategic intelligence using predictive statistical modelling and big data pipelines.',
      curriculum: ['Applied Machine Learning', 'Big Data Engineering (Spark/Hadoop)', 'Statistical Inference', 'Data Visualization Studio'],
      careerPaths: ['Lead Data Scientist', 'Quantitative Risk Analyst', 'BI Operations Director']
    },
    {
      id: 'phd-ai',
      title: 'Ph.D. Quantum Computing & Advanced Physics',
      level: 'doctoral',
      department: 'Institute for Theoretical Physics',
      duration: '4-5 Years',
      credits: 'Fully Funded Stipend',
      tuition: '$0 (Stipend + Tuition Waiver)',
      description: 'Conduct original research on qubit coherence, topological quantum memory, and cryogenic quantum processors.',
      curriculum: ['Quantum Field Theory', 'Superconducting Qubit Architecture', 'Advanced Quantum Information Theory', 'Doctoral Dissertation'],
      careerPaths: ['Quantum Hardware Scientist', 'University Tenure-Track Professor', 'Principal Research Lab Fellow']
    }
  ];

  const programsGrid = document.getElementById('programs-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('program-search-input');

  function renderPrograms(filter = 'all', searchQuery = '') {
    if (!programsGrid) return;
    programsGrid.innerHTML = '';

    const filtered = programsData.filter(p => {
      const matchesFilter = (filter === 'all') || (p.level === filter);
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      programsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #64748b;">
          <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; color: #94a3b8;"></i>
          <h3>No matching degree programs found</h3>
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'program-card';
      card.innerHTML = `
        <div>
          <div class="program-card-header">
            <span class="program-level-tag">${p.level.toUpperCase()}</span>
            <span class="tuition-badge">${p.tuition}</span>
          </div>
          <h3 class="program-title">${p.title}</h3>
          <p class="program-description">${p.description}</p>
          <div class="program-meta">
            <span><i class="fa-regular fa-clock"></i> ${p.duration}</span>
            <span><i class="fa-solid fa-award"></i> ${p.credits}</span>
          </div>
        </div>
        <div class="program-card-footer">
          <button class="btn btn-outline btn-sm view-detail-btn" data-id="${p.id}">
            Curriculum & Details <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      `;
      programsGrid.appendChild(card);
    });

    document.querySelectorAll('.view-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const progId = e.currentTarget.getAttribute('data-id');
        openProgramModal(progId);
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPrograms(btn.getAttribute('data-filter'), searchInput ? searchInput.value : '');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeBtn = document.querySelector('.filter-btn.active');
      renderPrograms(activeBtn ? activeBtn.getAttribute('data-filter') : 'all', e.target.value);
    });
  }

  renderPrograms();

  // 2. Program Details Modal
  const programModal = document.getElementById('program-modal');
  const programModalClose = document.getElementById('program-modal-close');
  const programModalCancel = document.getElementById('program-modal-cancel');

  function openProgramModal(progId) {
    const prog = programsData.find(p => p.id === progId);
    if (!prog || !programModal) return;

    document.getElementById('modal-prog-title').innerText = prog.title;
    document.getElementById('modal-prog-body').innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="badge badge-primary">${prog.level.toUpperCase()}</span>
        <span class="badge badge-amber">${prog.department}</span>
      </div>
      <p style="font-size: 1.05rem; color: #334155; margin-bottom: 1.5rem;">${prog.description}</p>
      <div style="display: flex; gap: 2rem; background: #f8fafc; padding: 1rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem;">
        <div><strong>Duration:</strong> ${prog.duration}</div>
        <div><strong>Credits:</strong> ${prog.credits}</div>
        <div><strong>Tuition:</strong> ${prog.tuition}</div>
      </div>
      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem;">Sample Curriculum:</h4>
      <ul style="list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem;">
        ${prog.curriculum.map(c => `<li>${c}</li>`).join('')}
      </ul>
    `;
    programModal.classList.add('active');
  }

  if (programModalClose) programModalClose.addEventListener('click', () => programModal.classList.remove('active'));
  if (programModalCancel) programModalCancel.addEventListener('click', () => programModal.classList.remove('active'));

  // 3. Stats Animated Counter
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;
  const heroStatsRow = document.querySelector('.hero-stats-row');

  if (heroStatsRow) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          let count = 0;
          const timer = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            if (target === 12) stat.innerText = '#' + count;
            else if (target === 98) stat.innerText = count + '%';
            else if (target === 480) stat.innerText = '$' + count + 'M+';
            else stat.innerText = count + '+';
          }, 35);
        });
        animated = true;
      }
    }, { threshold: 0.3 });
    observer.observe(heroStatsRow);
  }

  // 4. Interactive Tuition Estimator
  const calcLevel = document.getElementById('calc-level');
  const calcResidency = document.getElementById('calc-residency');
  const calcHousing = document.getElementById('calc-housing');

  function calculateTuition() {
    if (!calcLevel || !calcResidency || !calcHousing) return;
    let baseTuition = 18500, housingCost = 11200, aid = 6000;

    if (calcLevel.value === 'postgrad') { baseTuition = 24000; aid = 7500; }
    else if (calcLevel.value === 'doctoral') { baseTuition = 28000; aid = 28000; }

    if (calcResidency.value === 'out-state') baseTuition *= 1.4;
    else if (calcResidency.value === 'international') baseTuition *= 1.6;

    if (calcHousing.value === 'off-campus') housingCost = 9000;
    else if (calcHousing.value === 'commuter') housingCost = 0;

    const total = Math.max(0, (baseTuition + housingCost) - aid);

    if (document.getElementById('res-tuition')) document.getElementById('res-tuition').innerText = '$' + Math.round(baseTuition).toLocaleString();
    if (document.getElementById('res-housing')) document.getElementById('res-housing').innerText = '$' + Math.round(housingCost).toLocaleString();
    if (document.getElementById('res-aid')) document.getElementById('res-aid').innerText = '-$' + Math.round(aid).toLocaleString();
    if (document.getElementById('res-total')) document.getElementById('res-total').innerText = '$' + Math.round(total).toLocaleString();
  }

  [calcLevel, calcResidency, calcHousing].forEach(s => s && s.addEventListener('change', calculateTuition));
  calculateTuition();

  // 5. Campus Life Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(`tab-${btn.getAttribute('data-tab')}`);
      if (pane) pane.classList.add('active');
    });
  });

  // 6. Mobile Nav & Dropdown Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const dropdownToggle = document.getElementById('faculties-dropdown-toggle');
  const dropdownItem = document.querySelector('.nav-item.dropdown');

  if (dropdownToggle && dropdownItem) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      dropdownItem.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!dropdownItem.contains(e.target)) dropdownItem.classList.remove('open');
    });
  }

  document.querySelectorAll('.faculty-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const facultyName = e.currentTarget.innerText.trim();
      if (dropdownItem) dropdownItem.classList.remove('open');
      if (navMenu) navMenu.classList.remove('active');
      showToast(`Exploring Faculty: ${facultyName}`);
    });
  });

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
  }

  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

});