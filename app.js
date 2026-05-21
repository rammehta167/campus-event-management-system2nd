// =========================================================================
// URJOTSAV 2026 - EVENT MANAGEMENT SYSTEM CLIENT SCRIPT
// =========================================================================

// -------------------------------------------------------------------------
// 1. Mock Database (Events, Schedules, Sponsors)
// -------------------------------------------------------------------------
const EVENTS_DATABASE = [
    // Technical Events
    {
        id: "tech-hackathon",
        title: "HackOverflow 4.0",
        category: "technical",
        subCategory: "Hackathons",
        date: "April 16, 2026",
        time: "09:00 AM - 09:00 PM",
        venue: "Advanced Computing Lab (Block A)",
        teamSize: 4,
        fee: 300,
        prize: "₹50,000",
        description: "A grueling 12-hour hackathon where teams prototype digital solutions to real-world campus and social problems. Bring your laptops, coffee is on us!",
        rules: [
            "Teams must consist of 2 to 4 members.",
            "All development must occur during the hackathon hours.",
            "Use of pre-existing templates or plagiarism will lead to immediate disqualification.",
            "Final evaluation will be based on innovation, design, usability, and presentation."
        ],
        contact: "Kiran Sen (78901 23456)"
    },
    {
        id: "tech-coding",
        title: "ByteCraft (Coding Competition)",
        category: "technical",
        subCategory: "Coding",
        date: "April 15, 2026",
        time: "11:00 AM - 01:00 PM",
        venue: "Computer Center 2 (Block A)",
        teamSize: 1,
        fee: 100,
        prize: "₹15,000",
        description: "An intensive time-constrained coding battle testing your grasp on data structures, algorithms, and logical problem-solving accuracy.",
        rules: [
            "Individual participation only.",
            "Languages supported: C++, Java, Python.",
            "The platform will auto-evaluate submissions based on time complexity and test cases.",
            "Use of internet or mobile devices is strictly prohibited."
        ],
        contact: "Rohit Roy (89012 34567)"
    },
    {
        id: "tech-robotics",
        title: "RoboWars 2026",
        category: "technical",
        subCategory: "Robotics",
        date: "April 16, 2026",
        time: "01:00 PM - 05:00 PM",
        venue: "Central Courtyard Arena",
        teamSize: 4,
        fee: 400,
        prize: "₹40,000",
        description: "Design, build, and battle! Enter the metal cage and fight for survival in a high-octane robotics combat event.",
        rules: [
            "Teams must consist of up to 4 members.",
            "Bot weight limit: Max 15 kg (excluding controller weight).",
            "Pneumatic, hydraulic, and electrical weapons are permitted (no fire/flammables).",
            "Matches run for 3 minutes under double elimination rules."
        ],
        contact: "Manish Verma (90123 45678)"
    },
    {
        id: "tech-workshop",
        title: "AI & IoT Fusion Workshop",
        category: "technical",
        subCategory: "Workshops",
        date: "April 16, 2026",
        time: "10:00 AM - 01:00 PM",
        venue: "IoT & Embedded Systems Lab (Block B)",
        teamSize: 1,
        fee: 150,
        prize: "Certificates & Kits",
        description: "Hands-on guided workshop on integrating Generative AI models with physical IoT microcontroller nodes for smart automation.",
        rules: [
            "Individual registration.",
            "Participants should ideally bring a laptop with USB ports.",
            "IoT hardware kits will be provided for use during the session.",
            "Certificate of completion will be issued to all participants."
        ],
        contact: "Dr. Alok Shukla (91234 56789)"
    },
    {
        id: "tech-talk",
        title: "TechTalk: GenAI & Future Tech",
        category: "technical",
        subCategory: "Expert Talks",
        date: "April 15, 2026",
        time: "10:30 AM - 12:30 PM",
        venue: "PIEMR Seminar Hall",
        teamSize: 1,
        fee: 0,
        prize: "Invaluable Knowledge",
        description: "Keynote sessions by industry veterans on the evolution of LLMs, agentic architectures, and what the future of engineering looks like.",
        rules: [
            "Free entry, but pre-registration is mandatory due to limited seating.",
            "Attendees must be seated 15 minutes before the talk starts.",
            "Interactive Q&A session will follow the keynotes."
        ],
        contact: "Prof. Priya Mehta (92345 67890)"
    },
    {
        id: "tech-startup",
        title: "Startup Catalyst (Pitch Deck)",
        category: "technical",
        subCategory: "Entrepreneurship",
        date: "April 16, 2026",
        time: "03:00 PM - 06:00 PM",
        venue: "PIEMR Seminar Hall",
        teamSize: 3,
        fee: 200,
        prize: "₹30,000",
        description: "Pitch your disruptive startup ideas, business models, or prototypes to a panel of venture capitalists and angel investors.",
        rules: [
            "Teams of 1 to 3 members.",
            "Pitch presentation must not exceed 7 minutes, followed by 5 minutes Q&A.",
            "Deck must be submitted in PDF format at least 3 hours before the event.",
            "Judging based on market viability, innovation, financial projections, and presentation quality."
        ],
        contact: "Nisha Rao (93456 78901)"
    },
 
    // Cultural Events
    {
        id: "cult-dance",
        title: "Beat Drop (Fusion Dance)",
        category: "cultural",
        subCategory: "Dance",
        date: "April 17, 2026",
        time: "05:00 PM - 08:30 PM",
        venue: "Central Lawn Main Stage",
        teamSize: 12,
        fee: 500,
        prize: "₹30,000",
        description: "Let your body speak the language of rhythm. Capture the stage with high-tempo classical-contemporary fusion routines.",
        rules: [
            "Team sizes: 4 to 12 participants.",
            "Maximum performance time limit: 8 minutes.",
            "Audio tracks must be submitted in MP3 format 2 hours before the event.",
            "No vulgarity in costumes or song selections will be tolerated."
        ],
        contact: "Manasi Sen (87654 32109)"
    },
    {
        id: "cult-singing",
        title: "Voice of Urjotsav (Singing Battle)",
        category: "cultural",
        subCategory: "Singing",
        date: "April 17, 2026",
        time: "01:30 PM - 04:30 PM",
        venue: "Central Lawn Main Stage",
        teamSize: 1,
        fee: 100,
        prize: "₹15,000",
        description: "The ultimate solo singing competition. Showcase your range and control in classical, semi-classical, or western acoustic categories.",
        rules: [
            "Individual participation only.",
            "Performance duration: Max 4 minutes.",
            "One backing track (MP3) or single acoustic instrument accompaniment is permitted.",
            "Lyrics must be clean and free of offensive themes."
        ],
        contact: "Amit Joshi (98987 65432)"
    },
    {
        id: "cult-music",
        title: "Symphony Band Battle",
        category: "cultural",
        subCategory: "Music",
        date: "April 16, 2026",
        time: "06:00 PM - 09:30 PM",
        venue: "Central Lawn Main Stage",
        teamSize: 8,
        fee: 400,
        prize: "₹35,000",
        description: "Unleash the guitar riffs and drum rolls. Bands from all over the country compete for the ultimate title of the Campus Rock Legends.",
        rules: [
            "Minimum 3, maximum 8 members per band.",
            "Total stage time: 15 minutes (including set up).",
            "Drum set will be provided; bands must bring their own guitars, keys, and special cables."
        ],
        contact: "Joy Sen (91234 56789)"
    },
    {
        id: "cult-drama",
        title: "Nukkad Natak (Street Play)",
        category: "cultural",
        subCategory: "Drama",
        date: "April 15, 2026",
        time: "03:30 PM - 06:00 PM",
        venue: "Central Lawn Plaza",
        teamSize: 15,
        fee: 350,
        prize: "₹20,000",
        description: "Act out the truth. A raw street play competition focusing on social issues, combining strong vocal projections and dynamic storytelling.",
        rules: [
            "Team sizes: 8 to 15 members.",
            "Time limit: 12 minutes maximum.",
            "No electronic sound amplification is allowed. Traditional instruments (Dhol, Flutes) are permitted.",
            "Use of offensive language targeting specific groups is prohibited."
        ],
        contact: "Vikram Dey (92345 67890)"
    },
    {
        id: "cult-fashion",
        title: "GlamWalk (Fashion Show)",
        category: "cultural",
        subCategory: "Fashion",
        date: "April 17, 2026",
        time: "08:30 PM - 10:30 PM",
        venue: "Central Lawn Main Stage",
        teamSize: 12,
        fee: 600,
        prize: "₹45,000",
        description: "Walk the ramp themed around Cyberpunk & Sustainable Future. Design outfits that merge tech-aesthetics with eco-friendly concepts.",
        rules: [
            "Teams must comprise of 8 to 12 models and designers.",
            "Maximum stage time: 7 minutes.",
            "A copy of the theme explanation must be provided to judges beforehand."
        ],
        contact: "Nisha Rao (93456 78901)"
    },
 
    // Sports Events
    {
        id: "sports-chess",
        title: "Checkmate Clash (Chess)",
        category: "sports",
        subCategory: "Indoor",
        date: "April 15, 2026",
        time: "02:00 PM - 05:30 PM",
        venue: "PIEMR Sports Complex",
        teamSize: 1,
        fee: 50,
        prize: "₹5,000",
        description: "Outwit your opponent in classic rapid chess formats. Compete under official FIDE rules and tight clock constraints.",
        rules: [
            "Individual tournament.",
            "Swiss league format with 5 rounds.",
            "Time control: 15 mins + 5 seconds increment.",
            "Arbitrators' decision will be final and binding."
        ],
        contact: "Rohan Panda (94567 89012)"
    },
    {
        id: "sports-tt",
        title: "Smash Hit (Table Tennis)",
        category: "sports",
        subCategory: "Indoor",
        date: "April 16, 2026",
        time: "10:00 AM - 05:00 PM",
        venue: "PIEMR Sports Complex Table 1 & 2",
        teamSize: 2,
        fee: 100,
        prize: "₹8,000",
        description: "A high-speed singles and doubles table tennis knockout cup testing your reflexes and ball control.",
        rules: [
            "Supports Solo (Singles) or Duo (Doubles) participation.",
            "Matches will be best of 3 sets, 11 points each.",
            "Players must bring their own rackets. Balls will be provided."
        ],
        contact: "Aman Sen (95678 90123)"
    },
    {
        id: "sports-cricket",
        title: "PPL (PIEMR Premiere League)",
        category: "sports",
        subCategory: "Outdoor",
        date: "April 15, 2026",
        time: "08:00 AM - 05:00 PM",
        venue: "PIEMR Main Ground",
        teamSize: 11,
        fee: 1000,
        prize: "₹50,000",
        description: "Heavy hits and tight overs! A fast-paced 8-over leather ball cricket tournament designed for pure excitement.",
        rules: [
            "Team of 11 players with up to 3 substitutes listed.",
            "8 overs per innings.",
            "Standard ICC rules apply with tournament modifiers.",
            "All players must wear proper sports gear."
        ],
        contact: "Debasis Patra (96789 01234)"
    },
    {
        id: "sports-football",
        title: "Penalty Shootout (7v7 Football)",
        category: "sports",
        subCategory: "Outdoor",
        date: "April 16, 2026",
        time: "08:00 AM - 04:00 PM",
        venue: "PIEMR Main Ground B",
        teamSize: 7,
        fee: 500,
        prize: "₹25,000",
        description: "Quick pass, drill, shoot! A 7-a-side football tournament playing 20-minute halves under knockout format.",
        rules: [
            "7 active players and 2 substitutes.",
            "Duration: 15 mins half with 5 min break.",
            "Yellow and Red cards apply. Suspension follows immediate double caution."
        ],
        contact: "Sumit Saha (97890 12345)"
    }
];

const SCHEDULE_DATABASE = [
    {
        day: "day1",
        time: "09:00 AM",
        title: "Grand Inaugural Ceremony",
        category: "cultural",
        venue: "Central Lawn Main Stage",
        desc: "Opening addresses, traditional lighting of the lamp, and student welcoming performances."
    },
    {
        day: "day1",
        time: "10:30 AM",
        title: "TechTalk: GenAI & Future Tech",
        category: "technical",
        venue: "PIEMR Seminar Hall",
        desc: "Expert talks on deep learning agents and the next generation of software engineering."
    },
    {
        day: "day1",
        time: "11:30 AM",
        title: "ByteCraft (Coding Competition)",
        category: "technical",
        venue: "Computer Center 2 (Block A)",
        desc: "High-paced algorithmic coding challenge opens."
    },
    {
        day: "day1",
        time: "02:00 PM",
        title: "Checkmate Clash (Chess) - Round 1",
        category: "sports",
        venue: "PIEMR Sports Complex",
        desc: "First rounds of rapid board match ups."
    },
    {
        day: "day1",
        time: "03:30 PM",
        title: "Nukkad Natak (Street Play)",
        category: "cultural",
        venue: "Central Lawn Plaza",
        desc: "Raw street plays on socio-political contexts."
    },
    {
        day: "day2",
        time: "08:00 AM",
        title: "Penalty Shootout (7v7 Football)",
        category: "sports",
        venue: "PIEMR Main Ground B",
        desc: "Knockout football matchups kick-off."
    },
    {
        day: "day2",
        time: "09:00 AM",
        title: "HackOverflow 4.0 Hackathon",
        category: "technical",
        venue: "Advanced Computing Lab (Block A)",
        desc: "Pitch and 12-hour continuous prototyping cycle starts."
    },
    {
        day: "day2",
        time: "10:00 AM",
        title: "AI & IoT Fusion Workshop",
        category: "technical",
        venue: "IoT & Embedded Lab (Block B)",
        desc: "Practical hands-on workshop on microcontroller AI logic."
    },
    {
        day: "day2",
        time: "01:00 PM",
        title: "RoboWars 2026",
        category: "technical",
        venue: "Central Courtyard Arena",
        desc: "Combat robotics challenge. Heavy gears, active armor, and sparks."
    },
    {
        day: "day2",
        time: "03:00 PM",
        title: "Startup Catalyst (Pitch Deck)",
        category: "technical",
        venue: "PIEMR Seminar Hall",
        desc: "Pitching of college startup ideas to investors and VC panels."
    },
    {
        day: "day2",
        time: "06:00 PM",
        title: "Symphony Band Battle",
        category: "cultural",
        venue: "Central Lawn Main Stage",
        desc: "Electrifying live bands showcase and judging."
    },
    {
        day: "day3",
        time: "09:30 AM",
        title: "PPL (PIEMR Premiere League) Cricket Finals",
        category: "sports",
        venue: "PIEMR Main Ground",
        desc: "High-stakes 8-over cricket finals match."
    },
    {
        day: "day3",
        time: "01:30 PM",
        title: "Voice of Urjotsav (Singing Battle)",
        category: "cultural",
        venue: "Central Lawn Main Stage",
        desc: "Solo acoustic and vocal performances."
    },
    {
        day: "day3",
        time: "05:00 PM",
        title: "Beat Drop (Fusion Dance)",
        category: "cultural",
        venue: "Central Lawn Main Stage",
        desc: "Spectacular visual routines from top university dance squads."
    },
    {
        day: "day3",
        time: "08:30 PM",
        title: "GlamWalk & Closing Concert",
        category: "cultural",
        venue: "Central Lawn Main Stage",
        desc: "Cyberpunk fashion showcase followed by our celebrity DJ night!"
    }
];

const SPONSORS_LIST = [
    { name: "Intel", level: "Title Partner" },
    { name: "Red Bull", level: "Beverage Partner" },
    { name: "GitHub", level: "Developer Partner" },
    { name: "Airtel", level: "Telecom Sponsor" },
    { name: "State Bank of India", level: "Banking Partner" },
    { name: "Decathlon", level: "Sports Partner" },
    { name: "HCL Tech", level: "Tech Sponsor" }
];

// -------------------------------------------------------------------------
// 2. Initializers & DOM Handles
// -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    setupNavbar();
    setupCountdown();
    setupScrollReveals();
    setupEventsTabAndSearch();
    setupScheduleTimeline();
    setupSponsorsMarquee();
    setupRegistrationModalFlow();
    setupDashboard();
    setupNewsletter();
}

// -------------------------------------------------------------------------
// 3. Navbar scroll and burger actions
// -------------------------------------------------------------------------
function setupNavbar() {
    const navbar = document.getElementById("navbar");
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinksWrapper = document.getElementById("nav-links-wrapper");
    const navLinks = document.querySelectorAll(".nav-link");

    // Scroll listener for sticky transparent-to-opaque blur transition
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Hamburger Toggle
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("active");
        navLinksWrapper.classList.toggle("open");
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            // Remove active style from other links
            navLinks.forEach(l => l.classList.remove("active"));
            
            // Add active styles if not dashboard link
            if (e.target.id !== "nav-dashboard-link") {
                link.classList.add("active");
            }
            
            hamburgerBtn.classList.remove("active");
            navLinksWrapper.classList.remove("open");
        });
    });
}

// -------------------------------------------------------------------------
// 4. Countdown Timer (Dynamic Target to prevent "ended" state)
// -------------------------------------------------------------------------
function setupCountdown() {
    // Dynamically set target to 15 days in the future relative to current execution time
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);
    targetDate.setHours(9, 0, 0, 0); // Start at 9:00 AM

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate.getTime() - now;

        if (difference <= 0) {
            // Default to all zeros if somehow passed
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, "0");
        hoursEl.innerText = String(hours).padStart(2, "0");
        minutesEl.innerText = String(minutes).padStart(2, "0");
        secondsEl.innerText = String(seconds).padStart(2, "0");
    }

    // Run immediately and then set interval
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// -------------------------------------------------------------------------
// 5. Scroll Reveals
// -------------------------------------------------------------------------
function setupScrollReveals() {
    // Add scroll reveal styles to necessary containers
    const revealElements = [
        document.querySelector(".about-card"),
        ...document.querySelectorAll(".stat-card"),
        document.querySelector(".filters-container"),
        document.querySelector(".timeline-container")
    ];

    revealElements.forEach(el => {
        if (el) el.classList.add("scroll-reveal");
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        if (el) revealObserver.observe(el);
    });
}

// -------------------------------------------------------------------------
// 6. Event Filters & Search Logic
// -------------------------------------------------------------------------
let currentMainCategory = "technical";
let currentSubCategory = "All";
let searchQuery = "";

function setupEventsTabAndSearch() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const searchInput = document.getElementById("event-search");

    // Primary Category Tab Clicking
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            currentMainCategory = btn.getAttribute("data-tab");
            currentSubCategory = "All"; // Reset sub filter
            
            renderSubFilters();
            filterAndRenderEvents();
        });
    });

    // Search Query keyup listener
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterAndRenderEvents();
    });

    // Initial render
    renderSubFilters();
    filterAndRenderEvents();
}

function renderSubFilters() {
    const subFiltersBox = document.getElementById("sub-filters");
    subFiltersBox.innerHTML = "";

    // Extract unique subCategories for the active category
    const matchingEvents = EVENTS_DATABASE.filter(ev => ev.category === currentMainCategory);
    const subCategories = ["All", ...new Set(matchingEvents.map(ev => ev.subCategory))];

    subCategories.forEach(sub => {
        const pill = document.createElement("button");
        pill.className = `sub-filter-pill ${sub === currentSubCategory ? 'active' : ''}`;
        pill.innerText = sub;
        
        pill.addEventListener("click", () => {
            document.querySelectorAll(".sub-filter-pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            currentSubCategory = sub;
            filterAndRenderEvents();
        });

        subFiltersBox.appendChild(pill);
    });
}

function filterAndRenderEvents() {
    const grid = document.getElementById("events-grid");
    grid.innerHTML = "";

    // Filter logic
    const filtered = EVENTS_DATABASE.filter(ev => {
        const matchesCategory = ev.category === currentMainCategory;
        const matchesSubCategory = currentSubCategory === "All" || ev.subCategory === currentSubCategory;
        const matchesSearch = ev.title.toLowerCase().includes(searchQuery) || 
                              ev.description.toLowerCase().includes(searchQuery) ||
                              ev.subCategory.toLowerCase().includes(searchQuery) ||
                              ev.venue.toLowerCase().includes(searchQuery);

        return matchesCategory && matchesSubCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="dashboard-empty-state" style="grid-column: 1 / -1;">
                <p>No events match your criteria. Try searching another term!</p>
            </div>
        `;
        return;
    }

    filtered.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
            <div class="event-card-banner">
                <!-- Visual mesh representation -->
                <span class="event-badge">${ev.subCategory}</span>
            </div>
            <div class="event-card-content">
                <h3 class="event-card-title">${ev.title}</h3>
                <div class="event-card-meta">
                    <div class="meta-item">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span>${ev.date} | ${ev.time}</span>
                    </div>
                    <div class="meta-item">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        <span>${ev.venue}</span>
                    </div>
                    <div class="meta-item">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        <span>Max Team Size: ${ev.teamSize === 1 ? 'Solo' : ev.teamSize + ' Members'}</span>
                    </div>
                </div>
                <div class="event-card-footer">
                    <div class="entry-fee-box">
                        <span class="lbl">Entry Fee</span>
                        <span class="val">₹${ev.fee}</span>
                    </div>
                    <button class="btn btn-teal btn-mini view-details-btn" data-id="${ev.id}">View Details</button>
                </div>
            </div>
        `;

        // Card button listener for details modal
        card.querySelector(".view-details-btn").addEventListener("click", () => {
            openDetailsModal(ev);
        });

        grid.appendChild(card);
    });
}

// -------------------------------------------------------------------------
// 7. Event Details Modal Overlay
// -------------------------------------------------------------------------
function openDetailsModal(ev) {
    const modal = document.getElementById("event-detail-modal");
    const body = document.getElementById("detail-modal-body");

    let rulesHtml = "";
    ev.rules.forEach(rule => {
        rulesHtml += `<li>${rule}</li>`;
    });

    body.innerHTML = `
        <div class="detail-image-wrapper">
            <!-- Glass/Mesh Visual Graphic -->
        </div>
        <div class="detail-content">
            <span class="detail-cat-badge">${ev.category} - ${ev.subCategory}</span>
            <h3 class="detail-title text-gradient">${ev.title}</h3>
            
            <div class="detail-meta-list">
                <div class="detail-meta-item"><strong>Date:</strong> ${ev.date}</div>
                <div class="detail-meta-item"><strong>Time:</strong> ${ev.time}</div>
                <div class="detail-meta-item"><strong>Venue:</strong> ${ev.venue}</div>
                <div class="detail-meta-item"><strong>Team Limit:</strong> ${ev.teamSize === 1 ? 'Solo' : ev.teamSize + ' Max'}</div>
                <div class="detail-meta-item"><strong>Prizes:</strong> ${ev.prize}</div>
                <div class="detail-meta-item"><strong>Entry Fee:</strong> ₹${ev.fee}</div>
            </div>

            <div class="detail-desc-box">
                <h4>Description</h4>
                <p>${ev.description}</p>
                
                <h4>Rules & Guidelines</h4>
                <ul class="detail-rules-list">
                    ${rulesHtml}
                </ul>
            </div>

            <div class="detail-contact-box">
                <h4>Event Coordinator</h4>
                <p>${ev.contact}</p>
            </div>

            <div class="detail-actions" style="margin-top:auto;">
                <button class="btn btn-amber" id="detail-register-btn">Register for Event</button>
            </div>
        </div>
    `;

    // Modal action bindings
    document.getElementById("detail-register-btn").addEventListener("click", () => {
        modal.classList.remove("open");
        openRegistrationModal(ev.category, ev.id);
    });

    modal.classList.add("open");

    // Close buttons binding
    const closeBtn = document.getElementById("close-detail-modal-btn");
    const backdrop = modal.querySelector(".modal-backdrop");
    
    const closeModal = () => modal.classList.remove("open");
    closeBtn.onclick = closeModal;
    backdrop.onclick = closeModal;
}

// -------------------------------------------------------------------------
// 8. Multi-Step Registration Form Flow
// -------------------------------------------------------------------------
let currentStep = 1;
let selectedEventId = "";

function setupRegistrationModalFlow() {
    const modal = document.getElementById("registration-modal");
    const closeBtn = document.getElementById("close-reg-modal-btn");
    const backdrop = modal.querySelector(".modal-backdrop");
    const form = document.getElementById("registration-form");
    
    // Navbar Register & Hero Tickets action triggers
    document.getElementById("nav-register-btn").addEventListener("click", () => openRegistrationModal());
    document.getElementById("hero-tickets-btn").addEventListener("click", () => openRegistrationModal());

    const closeModal = () => modal.classList.remove("open");
    closeBtn.onclick = closeModal;
    backdrop.onclick = closeModal;

    // Next/Prev Step Click Handlers
    document.querySelectorAll(".next-step-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateStepUI();
            }
        });
    });

    document.querySelectorAll(".prev-step-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep--;
            updateStepUI();
        });
    });

    // Step Category Select Trigger
    const categorySelect = document.getElementById("reg-category");
    const eventSelect = document.getElementById("reg-event");

    categorySelect.addEventListener("change", () => {
        const cat = categorySelect.value;
        eventSelect.disabled = false;
        eventSelect.innerHTML = `<option value="" disabled selected>Select event</option>`;

        EVENTS_DATABASE.filter(ev => ev.category === cat).forEach(ev => {
            const opt = document.createElement("option");
            opt.value = ev.id;
            opt.innerText = ev.title;
            eventSelect.appendChild(opt);
        });
        
        // Hide preview card
        document.getElementById("reg-event-brief-card").style.display = "none";
    });

    // Step Event Select Trigger
    eventSelect.addEventListener("change", () => {
        selectedEventId = eventSelect.value;
        const ev = EVENTS_DATABASE.find(e => e.id === selectedEventId);
        
        if (ev) {
            // Show brief card details
            const briefCard = document.getElementById("reg-event-brief-card");
            document.getElementById("brief-title").innerText = ev.title;
            document.getElementById("brief-info").innerText = `${ev.date} | ${ev.venue} | Registration Fee: ₹${ev.fee}`;
            document.getElementById("brief-desc").innerText = ev.description;
            briefCard.style.display = "block";
            
            // Build Teammate Inputs dynamically
            buildTeamInputs(ev);
        }
    });

    // Form Submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("reg-name").value.trim();
        const college = document.getElementById("reg-college").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const phone = document.getElementById("reg-phone").value.trim();
        const eventId = document.getElementById("reg-event").value;
        const evObj = EVENTS_DATABASE.find(e => e.id === eventId);
        
        // Collect teammate names
        const teammateInputs = document.querySelectorAll(".teammate-input-field");
        const teammates = [];
        teammateInputs.forEach(inp => {
            if (inp.value.trim() !== "") {
                teammates.push(inp.value.trim());
            }
        });

        // Save User Profile for consistency
        localStorage.setItem("urjotsav_profile", JSON.stringify({ name, college, email, phone }));

        // Save Registration Card Pass
        const registrationId = "URJ-" + Math.floor(10000 + Math.random() * 90000);
        const newReg = {
            id: registrationId,
            eventId: eventId,
            eventTitle: evObj.title,
            eventDate: evObj.date,
            eventVenue: evObj.venue,
            teammates: teammates,
            maxTeamSize: evObj.teamSize
        };

        const existingRegs = JSON.parse(localStorage.getItem("urjotsav_registrations") || "[]");
        
        // Prevent duplicate registration for the exact same event
        if (existingRegs.some(r => r.eventId === eventId)) {
            alert(`You are already registered for ${evObj.title}! Please check your Student Dashboard.`);
            closeModal();
            return;
        }

        existingRegs.push(newReg);
        localStorage.setItem("urjotsav_registrations", JSON.stringify(existingRegs));

        // Feedback & Toggle view to dashboard
        alert(`Congratulations! You have successfully registered for ${evObj.title}.`);
        closeModal();
        
        // Open Student Dashboard
        openDashboardModal(registrationId);
    });
}

function openRegistrationModal(preSelectedCat = "", preSelectedEventId = "") {
    currentStep = 1;
    selectedEventId = preSelectedEventId;
    
    // Autofill Profile Info if exists in localStorage
    const profile = JSON.parse(localStorage.getItem("urjotsav_profile"));
    if (profile) {
        document.getElementById("reg-name").value = profile.name;
        document.getElementById("reg-college").value = profile.college;
        document.getElementById("reg-email").value = profile.email;
        document.getElementById("reg-phone").value = profile.phone;
    } else {
        document.getElementById("registration-form").reset();
    }

    // Pre-populate category/event selection if triggered from details
    if (preSelectedCat) {
        const categorySelect = document.getElementById("reg-category");
        categorySelect.value = preSelectedCat;
        
        // Fire event listener change explicitly
        categorySelect.dispatchEvent(new Event("change"));

        if (preSelectedEventId) {
            const eventSelect = document.getElementById("reg-event");
            eventSelect.value = preSelectedEventId;
            eventSelect.dispatchEvent(new Event("change"));
        }
    } else {
        document.getElementById("reg-category").value = "";
        document.getElementById("reg-event").disabled = true;
        document.getElementById("reg-event").innerHTML = `<option value="" disabled selected>First select a category</option>`;
        document.getElementById("reg-event-brief-card").style.display = "none";
    }

    updateStepUI();
    document.getElementById("registration-modal").classList.add("open");
}

function validateStep(step) {
    if (step === 1) {
        const name = document.getElementById("reg-name").value.trim();
        const college = document.getElementById("reg-college").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const phone = document.getElementById("reg-phone").value.trim();
        
        if (!name || !college || !email || !phone) {
            alert("Please fill out all personal details.");
            return false;
        }
        
        // Basic phone test
        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return false;
        }
        return true;
    }
    
    if (step === 2) {
        const cat = document.getElementById("reg-category").value;
        const ev = document.getElementById("reg-event").value;
        if (!cat || !ev) {
            alert("Please select an event to register.");
            return false;
        }
        return true;
    }
    return true;
}

function updateStepUI() {
    // Hide all steps
    document.querySelectorAll(".form-step").forEach(step => step.classList.remove("active"));
    
    // Show active step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add("active");

    // Progress Bar percentage calculation
    const progressFill = document.getElementById("progress-fill");
    progressFill.style.width = `${(currentStep - 1) * 50 + 33.3}%`;

    // Step indicators highlight
    document.querySelectorAll(".step-indicator").forEach(ind => {
        const stepNum = parseInt(ind.getAttribute("data-step"));
        ind.className = "step-indicator";
        
        if (stepNum === currentStep) {
            ind.classList.add("active");
        } else if (stepNum < currentStep) {
            ind.classList.add("complete");
        }
    });
}

function buildTeamInputs(ev) {
    const container = document.getElementById("members-list-inputs");
    const label = document.getElementById("team-info-msg");
    const formBox = document.getElementById("team-members-inputs");

    container.innerHTML = "";

    if (ev.teamSize === 1) {
        label.innerText = `This is a SOLO event (${ev.title}). No team members needed.`;
        formBox.style.display = "none";
    } else {
        label.innerText = `This is a TEAM event (${ev.title}). Add up to ${ev.teamSize - 1} teammate names below:`;
        formBox.style.display = "block";

        // Generate inputs based on max team size - 1 (since current registering user is member 1)
        for (let i = 1; i < ev.teamSize; i++) {
            const div = document.createElement("div");
            div.className = "member-input-row";
            div.innerHTML = `
                <input type="text" class="teammate-input-field" placeholder="Teammate #${i} Full Name">
            `;
            container.appendChild(div);
        }
    }
}

// -------------------------------------------------------------------------
// 9. Student Dashboard Modal Logic & LocalStorage Persistence
// -------------------------------------------------------------------------
let selectedTicketId = null;

function setupDashboard() {
    const modal = document.getElementById("dashboard-modal");
    const closeBtn = document.getElementById("close-dash-modal-btn");
    const backdrop = modal.querySelector(".modal-backdrop");
    
    // Bind click link in Nav to open dashboard
    document.getElementById("nav-dashboard-link").addEventListener("click", (e) => {
        e.preventDefault();
        openDashboardModal();
    });

    const closeModal = () => modal.classList.remove("open");
    closeBtn.onclick = closeModal;
    backdrop.onclick = closeModal;
}

function openDashboardModal(targetTicketId = null) {
    const modal = document.getElementById("dashboard-modal");
    
    // Read local data
    const profile = JSON.parse(localStorage.getItem("urjotsav_profile"));
    const registrations = JSON.parse(localStorage.getItem("urjotsav_registrations") || "[]");

    const profileBox = document.getElementById("dash-profile");
    if (profile) {
        profileBox.innerHTML = `
            <span class="profile-name">${profile.name}</span><br>
            <span class="profile-college">${profile.college}</span>
        `;
    } else {
        profileBox.innerHTML = `
            <span class="profile-name">Guest Student</span><br>
            <span class="profile-college">Not Registered</span>
        `;
    }

    renderDashboardTickets(registrations, targetTicketId);
    modal.classList.add("open");
}

function renderDashboardTickets(registrations, targetTicketId = null) {
    const container = document.getElementById("dash-tickets-container");
    container.innerHTML = "";

    const profile = JSON.parse(localStorage.getItem("urjotsav_profile"));

    if (registrations.length === 0) {
        container.innerHTML = `
            <div class="dashboard-empty-state">
                <p>You have not registered for any events yet!</p>
                <button class="btn btn-amber btn-mini" onclick="document.getElementById('close-dash-modal-btn').click(); window.location.hash = '#events';">Browse Events</button>
            </div>
        `;
        resetHologramVisual();
        return;
    }

    registrations.forEach(reg => {
        const row = document.createElement("div");
        row.className = `dashboard-ticket-item-row ${reg.id === selectedTicketId || reg.id === targetTicketId ? 'selected' : ''}`;
        row.setAttribute("data-id", reg.id);
        row.innerHTML = `
            <div class="ticket-item-details">
                <h4>${reg.eventTitle}</h4>
                <p>${reg.id} | ${reg.eventDate}</p>
            </div>
            <span class="arrow-indicator">&rarr;</span>
        `;

        row.addEventListener("click", () => {
            document.querySelectorAll(".dashboard-ticket-item-row").forEach(r => r.classList.remove("selected"));
            row.classList.add("selected");
            selectedTicketId = reg.id;
            loadTicketInVisualizer(reg, profile);
        });

        container.appendChild(row);
    });

    // Select ticket
    let activeTicket = null;
    if (targetTicketId) {
        activeTicket = registrations.find(r => r.id === targetTicketId);
        selectedTicketId = targetTicketId;
    } else if (registrations.length > 0) {
        activeTicket = registrations[0];
        selectedTicketId = registrations[0].id;
        // Make sure row is selected visually
        setTimeout(() => {
            const firstRow = container.querySelector(".dashboard-ticket-item-row");
            if (firstRow) firstRow.classList.add("selected");
        }, 10);
    }

    if (activeTicket) {
        loadTicketInVisualizer(activeTicket, profile);
    }
}

function resetHologramVisual() {
    document.getElementById("ticket-visual-id").innerText = "#URJ-00000";
    document.getElementById("ticket-visual-event").innerText = "Select a Ticket";
    document.getElementById("ticket-visual-holder").innerText = "-";
    document.getElementById("ticket-visual-college").innerText = "-";
    document.getElementById("ticket-visual-date").innerText = "-";
    document.getElementById("ticket-visual-venue").innerText = "-";
    document.getElementById("ticket-visual-qr").src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23121212'/><rect x='10' y='10' width='30' height='30' fill='%23FFB000'/><rect x='60' y='10' width='30' height='30' fill='%23FFB000'/><rect x='10' y='60' width='30' height='30' fill='%23FFB000'/><rect x='60' y='60' width='30' height='30' fill='%23FFB000'/></svg>";
    document.getElementById("ticket-team-editor-box").style.display = "none";
}

function loadTicketInVisualizer(reg, profile) {
    // Fill text labels
    document.getElementById("ticket-visual-id").innerText = `#${reg.id}`;
    document.getElementById("ticket-visual-event").innerText = reg.eventTitle;
    document.getElementById("ticket-visual-holder").innerText = profile ? profile.name : "Student Guest";
    document.getElementById("ticket-visual-college").innerText = profile ? profile.college : "PIEMR";
    document.getElementById("ticket-visual-date").innerText = reg.eventDate;
    document.getElementById("ticket-visual-venue").innerText = reg.eventVenue;

    // Load QR code dynamically using api.qrserver.com
    const qrImage = document.getElementById("ticket-visual-qr");
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=121212&data=PASS-ID:${reg.id}-EVENT:${encodeURIComponent(reg.eventTitle)}-HOLDER:${encodeURIComponent(profile ? profile.name : 'Guest')}`;

    // Manage Team Members Editor UI
    const teamBox = document.getElementById("ticket-team-editor-box");
    const teamListContainer = document.getElementById("dash-team-list-container");
    
    teamListContainer.innerHTML = "";

    if (reg.maxTeamSize === 1) {
        teamBox.style.display = "none";
    } else {
        teamBox.style.display = "block";
        
        // Loop team size - 1 inputs
        for (let i = 0; i < reg.maxTeamSize - 1; i++) {
            const memberVal = reg.teammates[i] || "";
            const row = document.createElement("div");
            row.className = "dash-member-edit-row";
            row.innerHTML = `
                <input type="text" class="dash-teammate-input" data-index="${i}" value="${memberVal}" placeholder="Enter Teammate Name">
            `;
            teamListContainer.appendChild(row);
        }

        // Add save changes button
        const saveBtn = document.createElement("button");
        saveBtn.className = "btn btn-teal btn-mini dash-team-save-btn";
        saveBtn.innerText = "Save Team Details";
        
        saveBtn.addEventListener("click", () => {
            const inputs = teamListContainer.querySelectorAll(".dash-teammate-input");
            const newTeammates = [];
            
            inputs.forEach(inp => {
                const val = inp.value.trim();
                if (val) newTeammates.push(val);
            });

            // Update database
            const registrations = JSON.parse(localStorage.getItem("urjotsav_registrations") || "[]");
            const dbIndex = registrations.findIndex(r => r.id === reg.id);
            
            if (dbIndex !== -1) {
                registrations[dbIndex].teammates = newTeammates;
                localStorage.setItem("urjotsav_registrations", JSON.stringify(registrations));
                
                // Keep selected ticket ID active
                selectedTicketId = reg.id;
                
                alert("Team member details updated successfully!");
                renderDashboardTickets(registrations, reg.id);
            }
        });

        teamListContainer.appendChild(saveBtn);
    }
}

// -------------------------------------------------------------------------
// 10. Schedule Timeline
// -------------------------------------------------------------------------
let currentTimelineDay = "day1";

function setupScheduleTimeline() {
    const dayButtons = document.querySelectorAll(".day-btn");
    
    dayButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            dayButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentTimelineDay = btn.getAttribute("data-day");
            renderTimeline();
        });
    });

    renderTimeline();
}

function renderTimeline() {
    const track = document.getElementById("timeline-track");
    track.innerHTML = "";

    // Filter day events
    const dayEvents = SCHEDULE_DATABASE.filter(item => item.day === currentTimelineDay);

    dayEvents.forEach(item => {
        const div = document.createElement("div");
        div.className = "timeline-item";
        div.innerHTML = `
            <span class="timeline-time">${item.time}</span>
            <div class="timeline-card">
                <div class="timeline-card-header">
                    <h4 class="timeline-card-title">${item.title}</h4>
                    <span class="timeline-card-cat ${item.category}">${item.category}</span>
                </div>
                <p class="timeline-card-desc">${item.desc}</p>
                <div class="timeline-card-footer">
                    <span class="timeline-venue">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        ${item.venue}
                    </span>
                    <a href="#events" class="timeline-register-link">Register &rarr;</a>
                </div>
            </div>
        `;
        track.appendChild(div);
    });
}

// -------------------------------------------------------------------------
// 11. Sponsors Marquee (Infinite scroll duplicator)
// -------------------------------------------------------------------------
function setupSponsorsMarquee() {
    const track = document.getElementById("marquee-track");
    track.innerHTML = "";

    // Load initial sponsors list
    SPONSORS_LIST.forEach(sp => {
        const card = createSponsorCard(sp);
        track.appendChild(card);
    });

    // Duplicate content once to ensure seamless looping without gaps
    const originalChildren = Array.from(track.children);
    originalChildren.forEach(child => {
        const clone = child.cloneNode(true);
        track.appendChild(clone);
    });
}

function createSponsorCard(sp) {
    const div = document.createElement("div");
    div.className = "sponsor-card";
    div.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
            <span class="sponsor-logo">${sp.name}</span>
            <span style="font-size: 0.65rem; text-transform: uppercase; color: var(--accent-teal); letter-spacing: 0.05em; margin-top:4px;">${sp.level}</span>
        </div>
    `;
    return div;
}

// -------------------------------------------------------------------------
// 12. Newsletter Form
// -------------------------------------------------------------------------
function setupNewsletter() {
    const form = document.getElementById("newsletter-form");
    const emailInp = document.getElementById("newsletter-email");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInp.value.trim();
        if (email) {
            alert(`Thank you for subscribing! Updates will be sent to: ${email}`);
            form.reset();
        }
    });
}
