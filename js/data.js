// MAIMATASA 4 BKD - Master Data Store
// Official Platform for Hon. Zaharadeen Idris Mato (State House of Assembly, Birnin-Kudu Constituency)

export const CANDIDATE_INFO = {
  name: "Hon. Zaharadeen Idris Mato",
  alias: "Mai Matasa",
  position: "State House of Assembly Contestant",
  constituency: "Birnin-Kudu Constituency",
  state: "Jigawa State, Nigeria",
  website: "www.maimatasa4bkd.org",
  email: "info@maimatasa4bkd.org",
  phone: "+234 803 000 4BKD",
  tagline: "Community • Youth • Women • Sports • Culture • Economic Development",
  bio: "Hon. Zaharadeen Idris Mato, popularly known as Mai Matasa, is an accomplished banking professional, grassroots organizer, and dedicated community development advocate from Birnin-Kudu Constituency. His extensive career in the banking and financial services sector has equipped him with deep expertise in financial management, grassroots economic empowerment, enterprise scaling, and sustainable public service. His legislative blueprint is dedicated to transforming Birnin-Kudu through strategic youth empowerment, women advancement, modern agricultural value chains, sports revitalization, and cultural heritage conservation."
};

export const PILLARS = [
  {
    id: "youth",
    number: "01",
    title: "Youth Development",
    icon: "school",
    tagline: "Equipping the Next Generation for Global and Local Opportunities",
    summary: "Future-ready skills, digital literacy bootcamps, vocational training hubs, and startup innovation grants.",
    focusAreas: [
      "Digital Skills & Coding Bootcamps",
      "Vocational & Technical Training Hubs",
      "Youth Entrepreneurship & Seed Grants",
      "Career Development & Mentorship",
      "Innovation & Technology Incubators",
      "Leadership & Civic Participation Academies"
    ],
    stats: "65%+ Youth Population in Birnin-Kudu Target Reach"
  },
  {
    id: "women",
    number: "02",
    title: "Women Development",
    icon: "diversity_2",
    tagline: "Unlocking Economic Freedom and Social Empowerment for Women",
    summary: "Targeted financial literacy workshops, small business grants, maternity health support, and cooperative financing.",
    focusAreas: [
      "Women Entrepreneurship & Micro-Grants",
      "Financial Literacy & Cooperative Banking",
      "Skills Acquisition Centers across all 11 Wards",
      "Maternal Health & Nutrition Advocacy",
      "Small & Medium Enterprise (SME) Scaling",
      "Women Civic Leadership Networks"
    ],
    stats: "11 Ward Women Skills Centers Planned"
  },
  {
    id: "sports",
    number: "03",
    title: "Sports Development",
    icon: "sports_soccer",
    tagline: "Fostering Unity, Physical Well-being, and Talent Discovery",
    summary: "Grassroots leagues, modern sporting facility upgrades, talent scouting academies, and athlete sponsorships.",
    focusAreas: [
      "Birnin-Kudu Grassroots Football League",
      "Community Pitch & Stadium Infrastructure Upgrades",
      "Youth Athletics & Traditional Wrestling Tournaments",
      "Talent Scouting & Academy Placements",
      "Inter-Ward Peace & Unity Championships",
      "Equipment & Kit Grants for Local Clubs"
    ],
    stats: "24+ Local Clubs Supported Across Birnin-Kudu"
  },
  {
    id: "culture",
    number: "04",
    title: "Culture & Heritage",
    icon: "museum",
    tagline: "Preserving Rich Traditions while Inspiring Modern Creative Arts",
    summary: "Support for traditional festivals, artisan guilds, ancient rock art heritage conservation, and cultural tourism.",
    focusAreas: [
      "Birnin-Kudu Historic Rock Art & Heritage Conservation",
      "Support for Traditional Durbar & Cultural Festivals",
      "Artisan & Craftsmen Guild Development",
      "Youth Cultural Exchange Programs",
      "Promotion of Jigawa Arts & Creative Economy",
      "Documentation of Local Oral Histories & Folklore"
    ],
    stats: "Preserving Over Centuries of Birnin-Kudu Heritage"
  },
  {
    id: "economy",
    number: "05",
    title: "Economic Development",
    icon: "trending_up",
    tagline: "Revitalizing Markets, Boosting Agriculture, and Expanding Wealth",
    summary: "Modern agro-processing, market infrastructure revamp, cooperative credit access, and youth enterprise incubation.",
    focusAreas: [
      "Agricultural Value Chain & Agro-Processing Support",
      "Revitalization of Local Markets in Birnin-Kudu & Environs",
      "Accessible Micro-Credit & Cooperative Financing",
      "Farmer Fertilizer & Modern Equipment Subsidies",
      "Logistics & Storage Infrastructure for Grains & Produce",
      "Trade Facilitation for Cottage Industries"
    ],
    stats: "Targeting 5,000+ Farmers and Traders Supported"
  }
];

export const WARDS_DATA = [
  { id: "birnin_kudu", name: "Birnin Kudu", pollingUnits: 28, communities: ["Cikin Gari", "Fada", "Kwangwara Road", "Gidan Sarki", "Bakin Kasuwa"], coordinator: "Mal. Ibrahim Haruna" },
  { id: "kangire", name: "Kangire", pollingUnits: 22, communities: ["Kangire Central", "Kafin Hausa", "Garin Bako", "Dantse"], coordinator: "Alh. Umar Faruk" },
  { id: "kantoga", name: "Kantoga", pollingUnits: 19, communities: ["Kantoga Yamma", "Kantoga Gabas", "Zango", "Unguwar Madaki"], coordinator: "Comr. Aminu Danladi" },
  { id: "kiyako", name: "Kiyako", pollingUnits: 24, communities: ["Kiyako Central", "Garin Malam", "Gidan Dogo", "Jeke"], coordinator: "Hajiya Maryam Saleh" },
  { id: "kwangwara", name: "Kwangwara", pollingUnits: 20, communities: ["Kwangwara Fada", "Diga", "Bakin Kogi", "Kafin Gana"], coordinator: "Sanusi Abdullahi" },
  { id: "lafiya", name: "Lafiya", pollingUnits: 21, communities: ["Lafiya Kudu", "Lafiya Arewa", "Sabon Gari", "Unguwar Galadima"], coordinator: "Bello Murtala" },
  { id: "maiaduwa", name: "Maiaduwa", pollingUnits: 25, communities: ["Maiaduwa Kasuwa", "Doka", "Katsinawa", "Garin Bature"], coordinator: "Mustapha Garba" },
  { id: "surko", name: "Surko", pollingUnits: 18, communities: ["Surko Central", "Tsamiyar Dila", "Garin Ali", "Chirawa"], coordinator: "Kabiru Sani" },
  { id: "unguwar_ya", name: "Unguwar 'Ya", pollingUnits: 23, communities: ["Unguwar 'Ya Fada", "Kafin Madaki", "Bakin Rijiya", "Garin Shehu"], coordinator: "Hajiya Aisha Mohammed" },
  { id: "wurno", name: "Wurno", pollingUnits: 26, communities: ["Wurno Fada", "Garin Tsakiya", "Kargo", "Dandi"], coordinator: "Comr. Zakari Lawan" },
  { id: "yalwan_damai", name: "Yalwan Damai", pollingUnits: 22, communities: ["Yalwa Central", "Damai", "Bakin Dutse", "Zandam"], coordinator: "Usman Dan-Gambo" }
];

export const INITIAL_NEWS = [
  {
    id: "news-1",
    title: "Hon. Zaharadeen Idris Mato Unveils Transformative 5-Pillar Blueprint for Birnin-Kudu",
    category: "Candidate Blueprint",
    date: "August 28, 2026",
    readTime: "4 min read",
    image: "/IMG-20260829-WA0046.jpg",
    summary: "At a historic consultative gathering in Birnin-Kudu, Hon. Zaharadeen Idris Mato (Mai Matasa) officially presented his comprehensive strategic agenda focusing on youth empowerment, women advancement, and economic transformation.",
    content: "During a widely attended consultative assembly in Birnin-Kudu town, Hon. Zaharadeen Idris Mato (Mai Matasa) outlined his bold legislative priorities for the State House of Assembly. Drawing upon his robust experience in the Nigerian banking and finance sector, he emphasized that sustainable democracy must translate into measurable community development, modern digital skills for youth, dedicated financial support for women traders, and revitalized agricultural value chains."
  },
  {
    id: "news-2",
    title: "Mai Matasa Digital Portal Launches Official Polling Unit & Volunteer Registration",
    category: "Community & Youth",
    date: "August 24, 2026",
    readTime: "3 min read",
    image: "/src/assets/images/community_youth_rally_1788043172926.jpg",
    summary: "The MAIMATASA 4 BKD digital platform opens official registration for volunteers, ward representatives, and polling unit coordinators across all 11 wards of Birnin-Kudu.",
    content: "In line with modern participatory democracy, the campaign organisation has unveiled its high-tech interactive portal (www.maimatasa4bkd.org). The platform enables qualified citizens to register as campaign ambassadors, verify polling unit assignments, track application statuses, and contribute directly to grassroots initiatives."
  },
  {
    id: "news-3",
    title: "Empowering Jigawa Women: Micro-Credit and Skills Framework Announced",
    category: "Women & Enterprise",
    date: "August 19, 2026",
    readTime: "5 min read",
    image: "/src/assets/images/women_enterprise_jigawa_1788043186529.jpg",
    summary: "A specialized framework dedicated to supporting 2,000+ women entrepreneurs across Birnin-Kudu with financial literacy workshops and cooperative funding mechanisms.",
    content: "Recognizing women as the bedrock of domestic stability and community commerce, Hon. Zaharadeen Idris Mato announced a targeted capacity building roadmap. Working with established women cooperative societies, the initiative will facilitate structured access to micro-grants, vocational toolkits, and market linkage programs."
  }
];

export const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "Birnin-Kudu Youth Empowerment & Digital Skills Symposium",
    category: "Youth",
    date: "September 12, 2026",
    time: "10:00 AM - 2:00 PM",
    venue: "Birnin-Kudu Town Hall, Central Ward",
    ward: "Birnin Kudu",
    description: "Hands-on masterclasses on digital marketing, coding fundamentals, freelance careers, and tech entrepreneurship for Birnin-Kudu youth.",
    attendees: 350,
    status: "Upcoming"
  },
  {
    id: "evt-2",
    title: "Wurno & Kangire Women Cooperative Financial Literacy Workshop",
    category: "Women",
    date: "September 18, 2026",
    time: "11:00 AM - 3:00 PM",
    venue: "Kangire Community Centre, Kangire Ward",
    ward: "Kangire",
    description: "Interactive bookkeeping, modern cooperative savings management, and business scaling session for women traders and artisans.",
    attendees: 220,
    status: "Upcoming"
  },
  {
    id: "evt-3",
    title: "Birnin-Kudu Constituency Polling Unit Representatives Briefing",
    category: "Organization",
    date: "September 26, 2026",
    time: "9:00 AM - 1:00 PM",
    venue: "MAIMATASA Campaign Secretariat, Birnin Kudu",
    ward: "Birnin Kudu",
    description: "Comprehensive electoral guidelines, voter education techniques, and digital reporting training for accredited polling unit ambassadors.",
    attendees: 500,
    status: "Upcoming"
  },
  {
    id: "evt-4",
    title: "Heritage Conservation & Cultural Art Exhibition",
    category: "Culture",
    date: "October 03, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Historic Rock Art Site & Cultural Pavilion, Birnin Kudu",
    ward: "Birnin Kudu",
    description: "Celebration of Birnin-Kudu's ancient archaeological heritage, traditional craft exhibitions, musical performances, and artisan showcases.",
    attendees: 600,
    status: "Upcoming"
  }
];

export const SEED_APPLICATIONS = [
  {
    refNumber: "MM-VOL-10492",
    type: "volunteer",
    fullName: "Ibrahim Sani Birnin Kudu",
    phone: "08034567890",
    email: "ibrahim.sani@example.com",
    gender: "Male",
    dob: "1997-04-12",
    lga: "Birnin Kudu",
    ward: "Birnin Kudu",
    community: "Bakin Kasuwa",
    pollingUnit: "PU 004 - Central Primary School",
    role: "Youth Programs & Digital Media",
    skills: "Graphic Design, Community Mobilization, Social Media",
    categories: ["Youth Programs", "Media and Communications", "Technology Support"],
    availability: "Weekends & Evenings",
    status: "Approved",
    appliedDate: "2026-08-25",
    notes: "Verified youth leader in Central Ward"
  },
  {
    refNumber: "MM-REP-20311",
    type: "representation",
    fullName: "Hajiya Amina Abdullahi",
    phone: "08023456789",
    email: "amina.abdullahi@example.com",
    gender: "Female",
    dob: "1988-09-20",
    lga: "Birnin Kudu",
    ward: "Wurno",
    community: "Wurno Fada",
    pollingUnit: "PU 002 - Wurno Dispensary",
    role: "Women Representative",
    skills: "Cooperative Leadership, Women Organizing, Public Speaking",
    categories: ["Women Programs", "Community Engagement"],
    availability: "Full-time",
    status: "Approved",
    appliedDate: "2026-08-26",
    notes: "President of Wurno Women Traders Association"
  },
  {
    refNumber: "MM-PU-30984",
    type: "polling_unit",
    fullName: "Usman Danladi Kangire",
    phone: "08145678901",
    email: "usman.kangire@example.com",
    gender: "Male",
    dob: "1994-11-05",
    lga: "Birnin Kudu",
    ward: "Kangire",
    community: "Kangire Central",
    pollingUnit: "PU 001 - Kangire Primary School",
    pollingUnitCode: "18/03/02/001",
    role: "Polling Unit Representative",
    skills: "Electoral Monitoring, Voter Mobilization",
    categories: ["Polling Unit Representation"],
    availability: "Election Day & Training",
    status: "Under Review",
    appliedDate: "2026-08-27",
    notes: "Documents uploaded, awaiting ID verification"
  }
];
