require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');
const Registration = require('../models/Registration');
const Contact = require('../models/Contact');

const events = [
  {
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
  {
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
  {
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

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear old data
    await Event.deleteMany({});
    await User.deleteMany({});
    await Registration.deleteMany({});
    await Contact.deleteMany({});
    console.log('Cleared existing collections...');

    // Insert events
    const createdEvents = await Event.insertMany(events);
    console.log(`Successfully seeded ${createdEvents.length} events.`);

    // Seed default student account
    const studentUser = new User({
      name: "Rahul Sharma",
      email: "student@piemr.edu.in",
      password: "studentpassword123",
      college: "PIEMR Indore",
      phone: "9876543210",
      role: "student"
    });
    await studentUser.save();
    console.log('Seeded default student: student@piemr.edu.in / studentpassword123');

    // Seed default admin account
    const adminUser = new User({
      name: "Urjotsav Admin",
      email: "admin@piemr.edu.in",
      password: "adminpassword123",
      college: "PIEMR Indore",
      phone: "9999999999",
      role: "admin"
    });
    await adminUser.save();
    console.log('Seeded default admin: admin@piemr.edu.in / adminpassword123');

    console.log('Database seeding completed successfully!');
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
