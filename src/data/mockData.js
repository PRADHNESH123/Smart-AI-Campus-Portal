// Mock data for Kalasalingam University - Smart Campus Student Portal

export const initialStudentData = {
  name: "Arun Kumar M",
  registerNumber: "99240040191",
  studentId: "99240040191",
  department: "Computer Science and Engineering",
  deptShort: "CSE",
  program: "B.Tech Computer Science and Engineering",
  year: "3rd Year",
  semester: "Semester 5",
  section: "B",
  batch: "2024 - 2028",
  email: "99240040191@klu.ac.in",
  phone: "+91 98765 43210",
  bloodGroup: "O+ve",
  advisor: "Dr. K. Senthil Nathan (Associate Professor, CSE)",
  avatar: "",
  cgpa: "8.64",
  attendance: "91.5%",
  enrolledCredits: 22,
  address: "Room 304, Bharathi Men's Hostel, Kalasalingam University Campus"
};

export const demoCredentials = {
  student: {
    registerNumber: "99240040191",
    regNo: "99240040191",
    password: "student123",
    name: "Arun Kumar M"
  },
  faculty: {
    facultyId: "FAC-CSE-1042",
    password: "faculty123",
    name: "Dr. K. Senthil Nathan",
    department: "Computer Science & Engineering",
    designation: "Associate Professor"
  },
  hod: {
    hodId: "HOD-CSE-001",
    password: "hod123",
    name: "Dr. P. Deepalakshmi",
    department: "Computer Science & Engineering",
    designation: "Professor & Head of Department"
  }
};

export const initialEvents = [
  {
    id: "evt-01",
    name: "TEKCLUSTER '26 - National Technical Symposium",
    category: "Technical Symposium",
    status: "Upcoming",
    date: "Oct 24, 2026",
    time: "09:30 AM - 04:30 PM",
    venue: "K.S. Krishnan Auditorium & CSE Seminar Complex",
    organizer: "Department of Computer Science & Engineering",
    deadline: "Oct 20, 2026",
    shortDescription: "Annual premier technical symposium featuring paper presentations, technical quiz, web design, and project expo with cash prizes worth Rs. 50,000.",
    description: "TEKCLUSTER '26 is the national-level flagship technical symposium organized by the School of Computing at Kalasalingam University. Bringing together top collegiate talent from across India, the event features tracks in Machine Learning, Cyber Security, Full-Stack Web Development, and Embedded IoT Systems. Cash prizes, certificates of excellence, and networking opportunities with tech leaders are provided.",
    rules: [
      "Valid Kalasalingam University / College Student ID is mandatory.",
      "Maximum of 3 students per team for the Project Expo track.",
      "Participants may register for a maximum of 2 individual technical events.",
      "Laptops must be brought with required software pre-installed.",
      "Judging decisions by the university technical evaluation committee are final."
    ],
    posterGradient: "from-blue-600 via-indigo-700 to-blue-900",
    posterEmoji: "💻",
    registered: true,
    registeredAt: "2026-10-02 14:30"
  },
  {
    id: "evt-02",
    name: "Smart India Hackathon – Campus Internal Edition",
    category: "Hackathon",
    status: "Upcoming",
    date: "Nov 02 - Nov 03, 2026",
    time: "36-Hour Hackathon (Starts 08:00 AM)",
    venue: "IoT & Advanced Computing Innovation Lab, Tech Park Block 3",
    organizer: "Centre for Innovation & Entrepreneurship (CIE)",
    deadline: "Oct 28, 2026",
    shortDescription: "36-hour sprint tackling problem statements in Smart Healthcare, Clean Energy, Disaster Management, and Smart Campus Solutions.",
    description: "The SIH Campus Internal Edition is designed to evaluate, mentor, and shortlist the top university teams representing Kalasalingam University at the national level. Teams will receive 24/7 access to labs, high-speed connectivity, hardware testbeds, and direct technical mentorship from industry veterans.",
    rules: [
      "Teams must comprise exactly 6 student members.",
      "At least one female student per team is mandatory as per SIH guidelines.",
      "All code and solution artifacts must be developed during the 36-hour hackathon window.",
      "Plagiarized codebases will lead to immediate disqualification.",
      "Milestone reviews are compulsory at 12 hours and 24 hours."
    ],
    posterGradient: "from-emerald-600 via-teal-700 to-cyan-900",
    posterEmoji: "⚡",
    registered: false,
    registeredAt: null
  },
  {
    id: "evt-03",
    name: "THULIR '26 – Grand Cultural Extravaganza",
    category: "Cultural Fest",
    status: "Upcoming",
    date: "Nov 14 - Nov 15, 2026",
    time: "05:00 PM - 10:00 PM",
    venue: "Open Air Amphitheatre, Main Campus Ground",
    organizer: "Kalasalingam Student Cultural Committee",
    deadline: "Nov 08, 2026",
    shortDescription: "The biggest university cultural carnival of the year featuring music bands, western dance battles, fashion parade, drama, and celebrity guest concerts.",
    description: "THULIR '26 brings vibrant music, dance, theatre, and arts to the Kalasalingam campus. Over two thrilling evenings, top collegiate teams compete in choreography, fusion bands, stand-up comedy, and literary events, concluding with a grand celebrity musical concert.",
    rules: [
      "Entry permitted strictly with valid Student Portal QR ticket / University ID.",
      "Decorum and disciplinary guidelines must be upheld at all times.",
      "Backstage check-in for performance teams is 2 hours prior to scheduled slot.",
      "Dangerous props, fire, and liquid chemicals are strictly banned.",
      "Audience seating is on a first-come, first-served basis."
    ],
    posterGradient: "from-rose-600 via-pink-700 to-purple-900",
    posterEmoji: "🎭",
    registered: false,
    registeredAt: null
  },
  {
    id: "evt-04",
    name: "KARE Trophy – Inter-Departmental Sports Meet",
    category: "Sports Meet",
    status: "Upcoming",
    date: "Nov 20 - Nov 23, 2026",
    time: "06:30 AM - 06:00 PM",
    venue: "University Sports Pavilion & Athletics Complex",
    organizer: "Department of Physical Education & Sports Board",
    deadline: "Nov 12, 2026",
    shortDescription: "Annual university sports tournament featuring Cricket, Football, Basketball, Badminton, Volleyball, and Track & Field athletics.",
    description: "The prestigious KARE Trophy tournament crowns the best departmental sports squad of Kalasalingam University. Events range from track & field 100m/400m relays to basketball, badminton, kabaddi, and cricket tournaments played on floodlit university grounds.",
    rules: [
      "Department sports attire or standard uniform mandatory.",
      "Players must be certified medically fit by the University Health Centre.",
      "Official federation tournament rules apply across all match events.",
      "Unsportsmanlike conduct results in team points deduction.",
      "Trophies and medals will be awarded during the Annual Sports Day valedictory."
    ],
    posterGradient: "from-amber-600 via-orange-600 to-red-800",
    posterEmoji: "🏆",
    registered: true,
    registeredAt: "2026-10-04 09:15"
  },
  {
    id: "evt-05",
    name: "Hands-on Workshop: Deep Learning with PyTorch & Generative Models",
    category: "Workshop",
    status: "Ongoing",
    date: "Today · Oct 05, 2026",
    time: "02:00 PM - 05:30 PM",
    venue: "Advanced Computing Lab 4, APJ Abdul Kalam Block",
    organizer: "AI Research Group & ACM Student Chapter",
    deadline: "Oct 04, 2026",
    shortDescription: "Practical hands-on workshop building transformer models, fine-tuning vision and language architectures, and deploying models to cloud endpoints.",
    description: "An intensive workshop tailored for 3rd and 4th year undergraduate researchers. Participants build custom Neural Network layers in PyTorch, implement self-attention mechanisms, and train a lightweight model using university GPU compute clusters.",
    rules: [
      "Bring personal laptop with Google Chrome and Python 3.10+ installed.",
      "High-speed campus lab Wi-Fi credentials will be supplied on check-in.",
      "Completion of practical exercises is required to receive the verified e-certificate."
    ],
    posterGradient: "from-violet-600 via-indigo-800 to-slate-900",
    posterEmoji: "🤖",
    registered: true,
    registeredAt: "2026-10-03 16:45"
  },
  {
    id: "evt-06",
    name: "IEEE Distinguished Lecture: The Frontier of Quantum Computing",
    category: "Seminar",
    status: "Ongoing",
    date: "Oct 06, 2026",
    time: "10:30 AM - 12:30 PM",
    venue: "Sir C.V. Raman Seminar Hall",
    organizer: "IEEE Student Branch - Kalasalingam University",
    deadline: "Oct 05, 2026",
    shortDescription: "Guest lecture by IEEE Fellow on quantum supremacy, superconducting qubits, and quantum algorithm applications in cryptography.",
    description: "Explore the fascinating theoretical and engineering challenges behind physical qubits, quantum error correction, and quantum supremacy. Features an interactive 30-minute Q&A session with world-renowned quantum computing researchers.",
    rules: [
      "Attendees must be seated by 10:20 AM. Doors close promptly at 10:25 AM.",
      "Mobile devices must be switched to silent mode throughout the keynote.",
      "IEEE members receive prioritized front-row seating and hardcopy lecture notes."
    ],
    posterGradient: "from-cyan-600 via-blue-700 to-indigo-950",
    posterEmoji: "🔬",
    registered: false,
    registeredAt: null
  },
  {
    id: "evt-07",
    name: "CodeCraft 2026: Speed Programming Battle",
    category: "Coding Competition",
    status: "Past Events",
    date: "Sep 22, 2026",
    time: "04:00 PM - 07:00 PM",
    venue: "Online Platform (HackerEarth) & CSE Lab 2",
    organizer: "CodeChef Campus Chapter & ACM",
    deadline: "Sep 20, 2026",
    shortDescription: "Fast-paced algorithmic programming contest with 6 challenging algorithmic problems in dynamic programming, graph theory, and mathematics.",
    description: "Over 350 collegiate programmers battled in a timed 3-hour competitive programming sprint. Problems ranged from combinatorial optimization to shortest path network flows.",
    rules: [
      "Permitted languages: C, C++, Java, Python 3.",
      "Automated anti-plagiarism system actively monitors code submissions.",
      "Time and memory limits strictly enforced."
    ],
    posterGradient: "from-slate-700 via-slate-800 to-slate-950",
    posterEmoji: "💻",
    registered: true,
    registeredAt: "2026-09-18 11:20"
  },
  {
    id: "evt-08",
    name: "Industry Connect: Microservices & Cloud Native Architectures",
    category: "Seminar",
    status: "Past Events",
    date: "Sep 10, 2026",
    time: "02:00 PM - 04:30 PM",
    venue: "MBA Conference Hall, Block 1",
    organizer: "Centre for Corporate Relations & Placement Division",
    deadline: "Sep 08, 2026",
    shortDescription: "Industry architect talk on Kubernetes orchestration, Docker containerization, and distributed tracing in production enterprise systems.",
    description: "Senior Engineering Architects from top multinational firms discussed real-world enterprise architectures, continuous delivery pipelines, and production site reliability engineering.",
    rules: [
      "Targeted at 3rd and final year engineering students preparing for placements.",
      "Resume submission open for Q&A recruitment pool."
    ],
    posterGradient: "from-blue-700 via-slate-800 to-indigo-900",
    posterEmoji: "☁️",
    registered: true,
    registeredAt: "2026-09-07 10:00",
    approved: true,
    approvalStatus: "Approved"
  },
  {
    id: "evt-pending-01",
    name: "National AI & Generative Computing Hackathon 2026",
    category: "Hackathon",
    status: "Upcoming",
    date: "Nov 15 - Nov 16, 2026",
    time: "24-Hour Hackathon",
    venue: "AI & Supercomputing Centre, Tech Park",
    organizer: "ACM Student Chapter & CSE Department",
    deadline: "Nov 10, 2026",
    shortDescription: "Proposed national-level hackathon on GenAI, LLMs, and Multimodal Agents with industry sponsorship.",
    description: "A 24-hour sprint bringing together top coding talent across institutions to develop autonomous AI applications. Awaiting HOD sanction and approval.",
    rules: [
      "Open to all B.Tech / M.Tech students.",
      "Teams of 3 to 4 members.",
      "Hardware and cloud computing credits provided."
    ],
    posterGradient: "from-purple-600 via-indigo-700 to-blue-900",
    posterEmoji: "🤖",
    registered: false,
    registeredAt: null,
    approved: false,
    approvalStatus: "Pending Approval",
    submittedBy: "Dr. B. S. Anupama & ACM Chapter",
    submittedDate: "Oct 06, 2026"
  },
  {
    id: "evt-pending-02",
    name: "Quantum Machine Learning & Cyber Defence Workshop",
    category: "Workshop",
    status: "Upcoming",
    date: "Nov 22, 2026",
    time: "09:30 AM - 04:30 PM",
    venue: "CSE Seminar Complex, Hall 2",
    organizer: "IEEE Computer Society Chapter",
    deadline: "Nov 18, 2026",
    shortDescription: "One-day hands-on workshop on Qiskit, quantum algorithms, and post-quantum cryptography.",
    description: "Hands-on laboratory sessions and keynote presentations exploring post-quantum cryptography and quantum algorithms. Awaiting HOD sanction and approval.",
    rules: [
      "Bring personal laptop with Python 3.10+ installed.",
      "Prior knowledge of Linear Algebra recommended."
    ],
    posterGradient: "from-cyan-600 via-blue-700 to-indigo-900",
    posterEmoji: "⚛️",
    registered: false,
    registeredAt: null,
    approved: false,
    approvalStatus: "Pending Approval",
    submittedBy: "Dr. M. R. Arun (Assistant Professor, CSE)",
    submittedDate: "Oct 05, 2026"
  }
];

export const initialNotifications = [
  {
    id: "notif-01",
    title: "End Semester Examination Schedule Released",
    category: "Examination",
    message: "The Odd Semester 2026 Final Examination timetable for B.Tech Semester 5 (Theory & Practical) has been officially published by the Controller of Examinations. Students can review exam dates, course codes, and hall seating plans.",
    date: "Oct 04, 2026",
    time: "10:30 AM",
    read: false,
    priority: "high"
  },
  {
    id: "notif-02",
    title: "Department Technical Event Registration Open",
    category: "Department",
    message: "Registrations for TEKCLUSTER '26 are now open for Computer Science and allied engineering departments. Early bird registration without late fee closes on Oct 20. Secure your project expo and symposium slots early.",
    date: "Oct 03, 2026",
    time: "02:15 PM",
    read: false,
    priority: "medium"
  },
  {
    id: "notif-03",
    title: "Important Academic Circular – Continuous Assessment Test (CAT-2)",
    category: "Academic",
    message: "The Continuous Assessment Test - 2 (CAT-2) will be conducted from Oct 28 to Nov 04, 2026. Respective faculty advisors have uploaded the revised module portion guidelines to the course portals.",
    date: "Oct 01, 2026",
    time: "11:00 AM",
    read: false,
    priority: "high"
  },
  {
    id: "notif-04",
    title: "Campus Hackathon 2026 – Team Registration Call",
    category: "Events",
    message: "Internal selections for Smart India Hackathon 2026 commence next week. Teams of 6 members with project proposals in healthcare, sustainability, or campus tech are invited to submit abstracts.",
    date: "Sep 28, 2026",
    time: "04:45 PM",
    read: true,
    priority: "medium"
  },
  {
    id: "notif-05",
    title: "National Innovation & Research Fellowship Applications",
    category: "General",
    message: "Applications are invited for undergraduate student research fellowships under the KARE Research & Development Innovation Fund. Selected projects will receive seed funding up to Rs. 25,000.",
    date: "Sep 25, 2026",
    time: "09:15 AM",
    read: true,
    priority: "low"
  },
  {
    id: "notif-06",
    title: "Examination Fee Payment Deadline Notice",
    category: "Academic",
    message: "The deadline for paying the Odd Semester 2026 university examination fees without late charges has been extended up to Oct 15, 2026. Please complete the online payment via the student finance counter.",
    date: "Sep 20, 2026",
    time: "03:30 PM",
    read: true,
    priority: "medium"
  }
];

export const initialActivityLog = [
  {
    id: "act-01",
    action: "Event Registration",
    details: "Registered for TEKCLUSTER '26 - National Technical Symposium",
    timestamp: "Today, 11:45 AM",
    category: "Events",
    icon: "CalendarCheck"
  },
  {
    id: "act-02",
    action: "Event Registration",
    details: "Registered for Deep Learning with PyTorch Workshop",
    timestamp: "Yesterday, 04:20 PM",
    category: "Events",
    icon: "CalendarCheck"
  },
  {
    id: "act-03",
    action: "Notification Read",
    details: "Viewed End Semester Examination Schedule announcement",
    timestamp: "Oct 04, 2026 · 10:45 AM",
    category: "Notifications",
    icon: "BellRing"
  },
  {
    id: "act-04",
    action: "Profile Update",
    details: "Verified Semester 5 contact phone and advisor details",
    timestamp: "Oct 02, 2026 · 02:10 PM",
    category: "Profile",
    icon: "UserCheck"
  },
  {
    id: "act-05",
    action: "Event Completed",
    details: "Participated in CodeCraft 2026 Algorithmic Speed Programming",
    timestamp: "Sep 22, 2026 · 07:30 PM",
    category: "Events",
    icon: "Award"
  },
  {
    id: "act-06",
    action: "Security Check",
    details: "Successful student portal session authenticated",
    timestamp: "Sep 20, 2026 · 09:00 AM",
    category: "Security",
    icon: "ShieldCheck"
  }
];

export const faqsList = [
  {
    id: "faq-1",
    category: "Events",
    question: "How do I register for campus technical and cultural events?",
    answer: "Navigate to the 'Events' section from the sidebar. Browse through Upcoming or Ongoing events, select any event to view comprehensive details, schedule, venue, and rules, and click the 'Register / RSVP' button. Your registration will instantly sync to 'My Activity' and 'My Events'."
  },
  {
    id: "faq-2",
    category: "Events",
    question: "Where can I view my registered events and event status?",
    answer: "You can view your registered events either inside the 'My Activity' page under the 'My Registered Events' section, or on the Events page where cards display a verified 'Registered' status badge."
  },
  {
    id: "faq-3",
    category: "Examinations",
    question: "How do I access and verify my official Examination schedule?",
    answer: "The Controller of Examinations releases examination circulars under the 'Notifications' section with the 'Examination' category tag. Important dates, hall ticket download alerts, and room seating allotments are published there."
  },
  {
    id: "faq-4",
    category: "Profile",
    question: "Can I edit my contact details or email address in the portal?",
    answer: "Yes, open 'My Profile' from the sidebar or header dropdown. Click the 'Edit Profile' button to update your telephone number, secondary email, or personal notes, then click 'Save Changes' to update your student record."
  },
  {
    id: "faq-5",
    category: "Account",
    question: "What should I do if I forget my Student Portal password?",
    answer: "On the Student Login screen, click 'Forgot Password'. You can enter your Register Number to receive a password reset link at your registered official university email (e.g., student@klu.ac.in), or visit the Student Help Desk at Anand Nagar campus."
  },
  {
    id: "faq-6",
    category: "General",
    question: "How does the Global Search feature work?",
    answer: "The Search bar in the top header and the dedicated 'Search' page allow you to query keywords across all campus events, official academic circulars, department notices, and university directories simultaneously."
  }
];

export const campusFaqs = faqsList;

export const campusDirectory = [
  {
    id: "dir-1",
    title: "Student Help Desk & Academic Affairs",
    category: "Academic",
    details: "Administrative Block, Ground Floor · Anand Nagar Campus",
    contact: "+91 4563 280 100",
    email: "helpdesk@kalasalingam.ac.in",
    timing: "Monday – Friday: 09:00 AM – 05:00 PM"
  },
  {
    id: "dir-2",
    title: "Office of the Controller of Examinations (COE)",
    category: "Examination",
    details: "COE Building, West Wing · Hall Ticket & Degree Inquiries",
    contact: "+91 4563 280 120",
    email: "coe@kalasalingam.ac.in",
    timing: "Monday – Friday: 09:30 AM – 04:30 PM"
  },
  {
    id: "dir-3",
    title: "Department of Computer Science & Engineering",
    category: "Department",
    details: "Turing Block, 3rd Floor · HOD & Faculty Advisory Rooms",
    contact: "+91 4563 280 135",
    email: "hodcse@kalasalingam.ac.in",
    timing: "Monday – Friday: 08:30 AM – 04:30 PM"
  },
  {
    id: "dir-4",
    title: "Centre for Corporate Relations & Placements",
    category: "Placement",
    details: "Block 1, 2nd Floor · Campus Recruitment & Internships",
    contact: "+91 4563 280 154",
    email: "placements@kalasalingam.ac.in",
    timing: "Monday – Friday: 09:00 AM – 05:00 PM"
  },
  {
    id: "dir-5",
    title: "Campus IT & Portal Technical Support (CIT)",
    category: "Technical",
    details: "APJ Abdul Kalam Block, Data Centre · 24/7 Monitoring",
    contact: "+91 4563 280 180",
    email: "itsupport@kalasalingam.ac.in",
    timing: "24/7 Portal System Monitoring"
  }
];

export const campusContacts = campusDirectory;

export const emergencyContacts = [
  {
    role: "University Campus Security",
    details: "24/7 Campus Gates & Patrol Desk",
    number: "+91 4563 280 911"
  },
  {
    role: "KARE Health Centre / Ambulance",
    details: "24/7 Emergency Medical Response",
    number: "+91 4563 280 912"
  },
  {
    role: "National Anti-Ragging Helpline",
    details: "Toll-Free 24 Hours Verification",
    number: "1800 180 5522"
  },
  {
    role: "Women's Empowerment & Safety Cell",
    details: "KARE Administrative Block",
    number: "+91 4563 280 915"
  }
];

// ============================================================
// SUBJECTS DATA
// ============================================================
export const subjectsData = [
  {
    id: "sub-dl",
    code: "3-CSE-DL",
    name: "Deep Learning",
    shortName: "DL",
    credits: 4,
    type: "Theory + Lab",
    faculty: "Dr. B. S. Anupama",
    facultyShort: "BSA",
    room: "8406",
    labRoom: "Lab8301A",
    color: "#7c3aed",
    lightColor: "#f5f3ff",
    borderColor: "#ddd6fe",
    topics: [
      "Introduction to Neural Networks & Deep Learning",
      "Convolutional Neural Networks (CNN) Architecture",
      "Recurrent Neural Networks & LSTM",
      "Transfer Learning & Fine-Tuning",
      "Generative Adversarial Networks (GANs)",
      "Attention Mechanisms & Transformers",
      "Deep Learning Frameworks: TensorFlow & PyTorch",
      "Model Deployment & Optimization Techniques"
    ],
    syllabus: "Unit 1: Foundations of Deep Learning | Unit 2: CNN & Object Recognition | Unit 3: Sequence Models | Unit 4: Generative Models | Unit 5: Real-World Applications",
    attendance: "88%",
    internalMark: "42/50",
    upcomingTest: "Unit Test III – Nov 12, 2026"
  },
  {
    id: "sub-cn",
    code: "3-CSE-CN",
    name: "Computer Networks",
    shortName: "CN",
    credits: 4,
    type: "Theory + Lab",
    faculty: "Dr. M. R. Arun",
    facultyShort: "MRA",
    room: "8406",
    labRoom: "Lab8401",
    color: "#059669",
    lightColor: "#ecfdf5",
    borderColor: "#a7f3d0",
    topics: [
      "OSI & TCP/IP Reference Models",
      "Data Link Layer – Error Detection & MAC Protocols",
      "Network Layer – IP Addressing, Subnetting & Routing",
      "Transport Layer – TCP & UDP",
      "Application Layer Protocols (HTTP, DNS, FTP, SMTP)",
      "Wireless & Mobile Networks",
      "Network Security – Cryptography & Firewalls",
      "Software Defined Networking (SDN)"
    ],
    syllabus: "Unit 1: Introduction & Physical Layer | Unit 2: Data Link Layer | Unit 3: Network Layer | Unit 4: Transport Layer | Unit 5: Application Layer & Security",
    attendance: "92%",
    internalMark: "44/50",
    upcomingTest: "Unit Test III – Nov 08, 2026"
  },
  {
    id: "sub-os",
    code: "3-CSE-OS",
    name: "Operating Systems",
    shortName: "OS",
    credits: 4,
    type: "Theory + Lab",
    faculty: "Dr. K. K. Thirumal",
    facultyShort: "KKT",
    room: "8406",
    labRoom: "Lab8601",
    color: "#d97706",
    lightColor: "#fffbeb",
    borderColor: "#fde68a",
    topics: [
      "OS Overview – Kernel, System Calls & Structures",
      "Process Management & Process Synchronization",
      "CPU Scheduling Algorithms",
      "Deadlock – Detection, Prevention & Recovery",
      "Memory Management – Paging & Segmentation",
      "Virtual Memory & Page Replacement Algorithms",
      "File System Management",
      "I/O Systems & Mass Storage"
    ],
    syllabus: "Unit 1: Processes & Threads | Unit 2: CPU Scheduling & Synchronization | Unit 3: Deadlock & Memory | Unit 4: Virtual Memory | Unit 5: File Systems & I/O",
    attendance: "91%",
    internalMark: "46/50",
    upcomingTest: "Unit Test III – Nov 05, 2026"
  },
  {
    id: "sub-daa",
    code: "3-CSE-DAA",
    name: "Design Analysis of Algorithms",
    shortName: "DAA",
    credits: 4,
    type: "Theory + Lab",
    faculty: "Dr. R. M. Ganapathy",
    facultyShort: "RMG",
    room: "8406",
    labRoom: "Lab8301B",
    color: "#2563eb",
    lightColor: "#eff6ff",
    borderColor: "#bfdbfe",
    topics: [
      "Algorithm Design Paradigms Overview",
      "Divide and Conquer – Merge Sort, Quick Sort, Binary Search",
      "Greedy Algorithms – Huffman, Kruskal, Prim",
      "Dynamic Programming – LCS, Knapsack, Matrix Chain",
      "Backtracking – N-Queens, Graph Coloring",
      "Branch and Bound",
      "NP-Completeness & Complexity Classes",
      "Approximation Algorithms"
    ],
    syllabus: "Unit 1: Introduction & Analysis | Unit 2: Divide & Conquer | Unit 3: Greedy Methods | Unit 4: Dynamic Programming | Unit 5: NP Theory & Approximation",
    attendance: "90%",
    internalMark: "43/50",
    upcomingTest: "Unit Test III – Nov 10, 2026"
  }
];

// ============================================================
// TIMETABLE DATA (from 24S02 timetable)
// ============================================================
export const timetableData = {
  batchCode: "24S02",
  periods: [
    { slot: 1, time: "09:00 – 10:00" },
    { slot: 2, time: "10:00 – 11:00" },
    { slot: 3, time: "11:00 – 12:00" },
    { slot: 4, time: "12:00 – 01:00" },
    { slot: 5, time: "01:00 – 02:00" },
    { slot: 6, time: "02:00 – 03:00" },
    { slot: 7, time: "03:00 – 04:00" },
    { slot: 8, time: "04:00 – 05:00" }
  ],
  schedule: {
    Monday: [
      { slot: 1, code: "3-CSE-DL", subject: "Deep Learning", room: "8406", faculty: "BSA", color: "#7c3aed" },
      { slot: 2, code: null },
      { slot: 3, code: "3-CSE-OS", subject: "Operating Systems", room: "Lab8601", faculty: "KKT", color: "#d97706", span: 2 },
      { slot: 4, code: "3-CSE-OS", subject: "Operating Systems", room: "Lab8601", faculty: "KKT", color: "#d97706", spanContinue: true },
      { slot: 5, code: null },
      { slot: 6, code: null },
      { slot: 7, code: "3-CSE-CN", subject: "Computer Networks", room: "8406", faculty: "MRA", color: "#059669" },
      { slot: 8, code: "3-CSE-DAA", subject: "Design Analysis of Algorithms", room: "8406", faculty: "RMG", color: "#2563eb" }
    ],
    Tuesday: [
      { slot: 1, code: "3-CSE-DAA", subject: "Design Analysis of Algorithms", room: "8406", faculty: "RMG", color: "#2563eb" },
      { slot: 2, code: "3-CSE-OS", subject: "Operating Systems", room: "8406", faculty: "KKT", color: "#d97706" },
      { slot: 3, code: null },
      { slot: 4, code: null },
      { slot: 5, code: "3-CSE-CN", subject: "Computer Networks", room: "8406", faculty: "MRA", color: "#059669" },
      { slot: 6, code: null },
      { slot: 7, code: "3-CSE-DL", subject: "Deep Learning", room: "8406", faculty: "BSA", color: "#7c3aed" },
      { slot: 8, code: null }
    ],
    Wednesday: [
      { slot: 1, code: "3-CSE-DAA", subject: "Design Analysis of Algorithms", room: "8406", faculty: "RMG", color: "#2563eb" },
      { slot: 2, code: "3-CSE-OS", subject: "Operating Systems", room: "8406", faculty: "KKT", color: "#d97706" },
      { slot: 3, code: null },
      { slot: 4, code: null },
      { slot: 5, code: null },
      { slot: 6, code: null },
      { slot: 7, code: "3-CSE-CN", subject: "Computer Networks", room: "8406", faculty: "MRA", color: "#059669" },
      { slot: 8, code: null }
    ],
    Thursday: [
      { slot: 1, code: "3-CSE-OS", subject: "Operating Systems", room: "8406", faculty: "KKT", color: "#d97706" },
      { slot: 2, code: null },
      { slot: 3, code: "3-CSE-DL", subject: "Deep Learning", room: "Lab8301A", faculty: "BSA", color: "#7c3aed", span: 2 },
      { slot: 4, code: "3-CSE-DL", subject: "Deep Learning", room: "Lab8301A", faculty: "BSA", color: "#7c3aed", spanContinue: true },
      { slot: 5, code: null },
      { slot: 6, code: null },
      { slot: 7, code: null },
      { slot: 8, code: null }
    ],
    Friday: [
      { slot: 1, code: "3-CSE-CN", subject: "Computer Networks", room: "Lab8401", faculty: "MRA", color: "#059669", span: 2 },
      { slot: 2, code: "3-CSE-CN", subject: "Computer Networks", room: "Lab8401", faculty: "MRA", color: "#059669", spanContinue: true },
      { slot: 3, code: "3-CSE-DAA", subject: "Design Analysis of Algorithms", room: "Lab8301B", faculty: "RMG", color: "#2563eb", span: 2 },
      { slot: 4, code: "3-CSE-DAA", subject: "Design Analysis of Algorithms", room: "Lab8301B", faculty: "RMG", color: "#2563eb", spanContinue: true },
      { slot: 5, code: null },
      { slot: 6, code: null },
      { slot: 7, code: "3-CSE-DL", subject: "Deep Learning", room: "8406", faculty: "BSA", color: "#7c3aed" },
      { slot: 8, code: null }
    ]
  }
};

// ============================================================
// ASSIGNMENTS DATA
// ============================================================
export const assignmentsData = [
  {
    id: "asgn-1",
    title: "CNN Architecture Implementation",
    subject: "Deep Learning",
    subjectCode: "3-CSE-DL",
    faculty: "Dr. K. Senthil Nathan",
    batch: "24S02",
    type: "Coding Assignment",
    description: "Implement a Convolutional Neural Network from scratch using PyTorch to classify the CIFAR-10 dataset. Achieve at least 85% test accuracy. Submit a Jupyter notebook with code, plots, and a 1-page analysis report.",
    dueDate: "Nov 10, 2026",
    postedDate: "Oct 25, 2026",
    maxMarks: 25,
    status: "Pending",
    priority: "high",
    attachments: ["Assignment_DL_Unit3.pdf"],
    submissionsCount: 12,
    totalStudents: 30,
    instructions: "Submit zipped .ipynb and PDF report."
  },
  {
    id: "asgn-2",
    title: "Routing Protocol Simulation",
    subject: "Computer Networks",
    subjectCode: "3-CSE-CN",
    faculty: "Dr. M. R. Arun",
    batch: "24S02",
    type: "Lab Report",
    description: "Using Cisco Packet Tracer, simulate a network of 10 routers with OSPF routing protocol. Demonstrate route convergence and failover. Submit .pkt file and a lab report (minimum 5 pages).",
    dueDate: "Nov 08, 2026",
    postedDate: "Oct 22, 2026",
    maxMarks: 20,
    status: "Submitted",
    submittedDate: "Oct 30, 2026",
    submittedFile: "ArunKumar_99240040191_OSPF_Report.pdf",
    priority: "medium",
    attachments: ["CN_Lab_Assignment_3.pdf"],
    submissionsCount: 22,
    totalStudents: 30,
    instructions: "Submit Packet Tracer file and PDF documentation."
  },
  {
    id: "asgn-3",
    title: "CPU Scheduling Simulator",
    subject: "Operating Systems",
    subjectCode: "3-CSE-OS",
    faculty: "Dr. K. K. Thirumal",
    batch: "24S02",
    type: "Programming",
    description: "Develop a CPU Scheduling Simulator in C or Python that demonstrates FCFS, SJF (Preemptive & Non-Preemptive), and Round Robin scheduling algorithms. Display Gantt charts, average waiting time, and turnaround time.",
    dueDate: "Nov 15, 2026",
    postedDate: "Oct 28, 2026",
    maxMarks: 30,
    status: "Pending",
    priority: "high",
    attachments: ["OS_Assignment_Unit2.pdf"],
    submissionsCount: 8,
    totalStudents: 30,
    instructions: "Submit source code repository link or zipped archive."
  },
  {
    id: "asgn-4",
    title: "Dynamic Programming Problems",
    subject: "Design Analysis of Algorithms",
    subjectCode: "3-CSE-DAA",
    faculty: "Dr. R. M. Ganapathy",
    batch: "24S02",
    type: "Theory + Coding",
    description: "Solve and analyze the following DP problems: (1) 0/1 Knapsack, (2) Longest Common Subsequence, (3) Matrix Chain Multiplication, (4) Bellman-Ford Shortest Path. Submit handwritten derivations + Python/Java code.",
    dueDate: "Nov 05, 2026",
    postedDate: "Oct 20, 2026",
    maxMarks: 25,
    status: "Submitted",
    submittedDate: "Nov 02, 2026",
    submittedFile: "99240040191_DAA_Assignment4.pdf",
    priority: "medium",
    attachments: ["DAA_Assignment_DP.pdf"],
    submissionsCount: 26,
    totalStudents: 30,
    instructions: "Submit neat scanned handwritten derivation and source code."
  },
  {
    id: "asgn-5",
    title: "GAN Image Generation Project",
    subject: "Deep Learning",
    subjectCode: "3-CSE-DL",
    faculty: "Dr. K. Senthil Nathan",
    batch: "24S02",
    type: "Mini Project",
    description: "Implement a Generative Adversarial Network (DCGAN) to generate synthetic images of hand-written digits using the MNIST dataset. Document the training process, loss curves, and generated sample quality.",
    dueDate: "Nov 25, 2026",
    postedDate: "Oct 30, 2026",
    maxMarks: 50,
    status: "Pending",
    priority: "high",
    attachments: ["DL_Project_GAN_Guidelines.pdf"],
    submissionsCount: 5,
    totalStudents: 30,
    instructions: "Submit code and presentation deck."
  }
];

// ============================================================
// LEAVE TYPES
// ============================================================
export const leaveTypes = [
  { value: "medical", label: "Medical / Health Leave" },
  { value: "personal", label: "Personal / Family Emergency" },
  { value: "academic", label: "Academic Event / Workshop" },
  { value: "sports", label: "Sports / Inter-Collegiate Event" },
  { value: "other", label: "Other" }
];

// ============================================================
// INITIAL LEAVES (Shared between Student and Faculty)
// ============================================================
export const initialLeavesData = [
  {
    id: 'lv-101',
    student: 'Arun Kumar M',
    reg: '99240040191',
    batch: '24S02',
    dept: 'CSE',
    type: 'Academic Event / Workshop',
    from: '2026-10-12',
    to: '2026-10-13',
    days: 2,
    reason: 'Inter-college tech fest participation – invitation letter attached.',
    parentPhone: '9876543210',
    status: 'Pending',
    applied: '2026-10-05',
    remark: '',
    approvedBy: null
  },
  {
    id: 'lv-102',
    student: 'Priya S',
    reg: '99240040192',
    batch: '24S02',
    dept: 'CSE',
    type: 'Personal / Family Emergency',
    from: '2026-10-10',
    to: '2026-10-10',
    days: 1,
    reason: 'Family function – prior permission sought.',
    parentPhone: '9876543211',
    status: 'Pending',
    applied: '2026-10-05',
    remark: '',
    approvedBy: null
  },
  {
    id: 'lv-103',
    student: 'Rahul Verma',
    reg: '99240040193',
    batch: '24S04',
    dept: 'CSE',
    type: 'Academic Event / Workshop',
    from: '2026-10-12',
    to: '2026-10-13',
    days: 2,
    reason: 'Inter-college tech fest participation – invitation letter attached.',
    parentPhone: '9876543212',
    status: 'Pending',
    applied: '2026-10-04',
    remark: '',
    approvedBy: null
  },
  {
    id: 'lv-104',
    student: 'Divya R',
    reg: '99240040194',
    batch: '24S04',
    dept: 'CSE',
    type: 'Sports / Inter-Collegiate Event',
    from: '2026-10-07',
    to: '2026-10-08',
    days: 2,
    reason: 'State level chess tournament – selection letter attached.',
    parentPhone: '9876543213',
    status: 'Pending',
    applied: '2026-10-03',
    remark: '',
    approvedBy: null
  },
  {
    id: 'lv-105',
    student: 'Arun Kumar M',
    reg: '99240040191',
    batch: '24S02',
    dept: 'CSE',
    type: 'Medical / Health Leave',
    from: '2026-09-15',
    to: '2026-09-16',
    days: 2,
    reason: 'High fever and viral infection – Doctor certificate attached.',
    parentPhone: '9876543210',
    status: 'Approved',
    applied: '2026-09-14',
    remark: 'Approved. Take care of your health.',
    approvedBy: 'Dr. K. Senthil Nathan'
  },
  {
    id: 'lv-106',
    student: 'Arun Kumar M',
    reg: '99240040191',
    batch: '24S02',
    dept: 'CSE',
    type: 'Personal / Family Emergency',
    from: '2026-08-22',
    to: '2026-08-22',
    days: 1,
    reason: 'Family function – prior permission sought.',
    parentPhone: '9876543210',
    status: 'Approved',
    applied: '2026-08-20',
    remark: 'Approved.',
    approvedBy: 'Dr. K. Senthil Nathan'
  },
  {
    id: 'lv-107',
    student: 'Sneha Lakshmi',
    reg: '99240040196',
    batch: '24S05',
    dept: 'CSE',
    type: 'Personal / Family Emergency',
    from: '2026-09-25',
    to: '2026-09-25',
    days: 1,
    reason: 'Sibling wedding ceremony.',
    parentPhone: '9876543215',
    status: 'Rejected',
    applied: '2026-09-23',
    remark: 'Attendance is below 75% threshold.',
    approvedBy: 'Dr. K. Senthil Nathan'
  }
];


