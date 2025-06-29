const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import models
const User = require("./models/user");
const Event = require("./models/event");
const Registration = require("./models/registration");

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

// Sample users data
const usersData = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    password: "Password123!",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@email.com",
    password: "SecurePass456@",
  },
  {
    name: "Carol Davis",
    email: "carol.davis@email.com",
    password: "StrongPwd789#",
  },
  {
    name: "David Wilson",
    email: "david.wilson@email.com",
    password: "MyPassword101$",
  },
  {
    name: "Eva Brown",
    email: "eva.brown@email.com",
    password: "SafePassword202%",
  },
  {
    name: "Frank Miller",
    email: "frank.miller@email.com",
    password: "ComplexPwd303^",
  },
  {
    name: "Grace Lee",
    email: "grace.lee@email.com",
    password: "SecretPass404&",
  },
  {
    name: "Henry Taylor",
    email: "henry.taylor@email.com",
    password: "PrivateKey505*",
  },
];

// Sample events data (will be populated with actual user IDs)
const eventsData = [
  {
    title: "Tech Conference 2025",
    description:
      "Join us for the biggest technology conference of the year! Featuring keynote speakers from top tech companies, hands-on workshops, and networking opportunities. Learn about the latest trends in AI, machine learning, cloud computing, and web development. This event is perfect for developers, tech enthusiasts, and business professionals looking to stay ahead in the rapidly evolving tech landscape.",
    location: "San Francisco Convention Center",
    date: new Date("2025-08-15T09:00:00.000Z"),
  },
  {
    title: "Digital Marketing Summit",
    description:
      "Discover the latest strategies and tools in digital marketing. This comprehensive summit covers social media marketing, content creation, SEO optimization, email marketing campaigns, and data analytics. Perfect for marketing professionals, business owners, and entrepreneurs who want to boost their online presence and drive more conversions through effective digital marketing techniques.",
    location: "New York Marriott Hotel",
    date: new Date("2025-09-20T10:00:00.000Z"),
  },
  {
    title: "Startup Pitch Competition",
    description:
      "Watch innovative startups present their groundbreaking ideas to a panel of experienced investors and industry experts. This exciting competition showcases the next generation of entrepreneurs and their solutions to real-world problems. Attendees will witness live pitches, participate in Q&A sessions, and network with founders, investors, and fellow entrepreneurs in a dynamic environment.",
    location: "Austin Tech Hub",
    date: new Date("2025-07-10T14:00:00.000Z"),
  },
  {
    title: "AI & Machine Learning Workshop",
    description:
      "Hands-on workshop covering the fundamentals of artificial intelligence and machine learning. Participants will learn about neural networks, deep learning algorithms, natural language processing, and computer vision. The workshop includes practical coding exercises using popular frameworks like TensorFlow and PyTorch. Ideal for developers, data scientists, and anyone interested in AI technologies.",
    location: "Boston Innovation Center",
    date: new Date("2025-10-05T09:30:00.000Z"),
  },
  {
    title: "Web Development Bootcamp",
    description:
      "Intensive bootcamp covering modern web development technologies including HTML5, CSS3, JavaScript ES6+, React, Node.js, and MongoDB. Participants will build real-world projects and learn best practices for creating responsive, scalable web applications. The bootcamp includes career guidance, portfolio development, and networking opportunities with industry professionals.",
    location: "Seattle Code Academy",
    date: new Date("2025-11-12T08:00:00.000Z"),
  },
  {
    title: "Cybersecurity Conference",
    description:
      "Comprehensive conference addressing the latest cybersecurity threats, defense strategies, and industry best practices. Topics include network security, ethical hacking, data protection, compliance frameworks, and incident response. Features presentations from security experts, live demonstrations of security tools, and workshops on threat detection and mitigation strategies.",
    location: "Washington DC Security Center",
    date: new Date("2025-12-08T09:00:00.000Z"),
  },
  {
    title: "Cloud Computing Symposium",
    description:
      "Explore the future of cloud computing with sessions on AWS, Azure, Google Cloud Platform, serverless architectures, containerization, and DevOps practices. The symposium covers migration strategies, cost optimization, security considerations, and emerging trends in cloud technology. Perfect for IT professionals, architects, and decision-makers planning cloud adoption.",
    location: "Chicago Convention Hall",
    date: new Date("2025-08-28T10:30:00.000Z"),
  },
  {
    title: "Mobile App Development Meetup",
    description:
      "Monthly meetup for mobile app developers focusing on iOS and Android development. Discussions include native app development, cross-platform frameworks like React Native and Flutter, app store optimization, user experience design, and monetization strategies. Features guest speakers, code reviews, and collaborative problem-solving sessions.",
    location: "Los Angeles Tech Space",
    date: new Date("2025-07-25T18:00:00.000Z"),
  },
];

// Function to create users
const createUsers = async () => {
  console.log("Creating users...");
  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    users.push(user);
  }

  const savedUsers = await User.insertMany(users);
  console.log(`✅ Created ${savedUsers.length} users`);
  return savedUsers;
};

// Function to create events
const createEvents = async (users) => {
  console.log("Creating events...");
  const events = [];

  eventsData.forEach((eventData, index) => {
    // Assign events to different users (cycling through available users)
    const creatorIndex = index % users.length;
    const event = new Event({
      ...eventData,
      createdBy: users[creatorIndex]._id,
    });
    events.push(event);
  });

  const savedEvents = await Event.insertMany(events);
  console.log(`✅ Created ${savedEvents.length} events`);
  return savedEvents;
};

// Function to create registrations
const createRegistrations = async (users, events) => {
  console.log("Creating registrations...");
  const registrations = [];

  // Create random registrations ensuring users don't register for their own events
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    // Each user registers for 2-4 random events (not their own)
    const numRegistrations = Math.floor(Math.random() * 3) + 2; // 2-4 registrations
    const availableEvents = events.filter(
      (event) => event.createdBy.toString() !== user._id.toString()
    );

    // Shuffle and pick random events
    const shuffledEvents = availableEvents.sort(() => 0.5 - Math.random());
    const selectedEvents = shuffledEvents.slice(
      0,
      Math.min(numRegistrations, availableEvents.length)
    );

    selectedEvents.forEach((event) => {
      const registration = new Registration({
        userRegistered: user._id,
        eventRegisteredFor: event._id,
      });
      registrations.push(registration);
    });
  }

  const savedRegistrations = await Registration.insertMany(registrations);
  console.log(`✅ Created ${savedRegistrations.length} registrations`);
  return savedRegistrations;
};

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await User.deleteMany({});
    await Event.deleteMany({});
    await Registration.deleteMany({});
    console.log("✅ Cleared existing data");

    // Create sample data
    const users = await createUsers();
    const events = await createEvents(users);
    const registrations = await createRegistrations(users, events);

    console.log("\n📊 Seeding Summary:");
    console.log(`👥 Users: ${users.length}`);
    console.log(`📅 Events: ${events.length}`);
    console.log(`📝 Registrations: ${registrations.length}`);

    console.log("\n🎉 Database seeding completed successfully!");

    // Display some sample data for verification
    console.log("\n📋 Sample Users:");
    users.slice(0, 3).forEach((user) => {
      console.log(`  • ${user.name} (${user.email})`);
    });

    console.log("\n📋 Sample Events:");
    events.slice(0, 3).forEach((event) => {
      const creator = users.find(
        (u) => u._id.toString() === event.createdBy.toString()
      );
      console.log(
        `  • ${event.title} by ${creator.name} on ${event.date.toDateString()}`
      );
    });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  }
};

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
