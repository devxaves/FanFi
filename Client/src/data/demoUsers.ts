export type User = {
  userId: string;
  name: string;
  topInterests: string[];
  topLanguages: string[];
  recentBookings: string[];
  region: string;
};

export const demoUsers: User[] = [
  {
    userId: "U001",
    name: "Arjun Mehra",
    topInterests: ["Bollywood Music", "Hindi Movies", "Cricket"],
    topLanguages: ["Hindi", "Punjabi"],
    recentBookings: [
      "Diljit Dosanjh Live - BookMyShow",
      "India vs Pakistan T20 - Paytm Insider",
      "Animal Movie Premiere - BookMyShow"
    ],
    region: "North India"
  },
  {
    userId: "U002",
    name: "Sneha Nair",
    topInterests: ["Carnatic Music", "Tamil Movies", "Classical Dance"],
    topLanguages: ["Tamil", "Malayalam"],
    recentBookings: [
      "AR Rahman Concert - BookMyShow",
      "Ponniyin Selvan 2 - BookMyShow",
      "Bharatanatyam Workshop - Townscript"
    ],
    region: "South India"
  },
  {
    userId: "U003",
    name: "Ravi Singh",
    topInterests: ["Hip-Hop", "English Pop", "Football"],
    topLanguages: ["English", "Hindi"],
    recentBookings: [
      "Divine - Gully Tour - BookMyShow",
      "UEFA Watch Party - Paytm Events",
      "Ed Sheeran Album Drop Party - Spotify"
    ],
    region: "West India"
  },
  {
    userId: "U004",
    name: "Tanisha Roy",
    topInterests: ["Kolkata Theatre", "Indie Films", "Poetry Slams"],
    topLanguages: ["Bengali", "English"],
    recentBookings: [
      "Jatra Festival - BookMyShow",
      "India Short Film Screening - Paytm",
      "The Bong Poets Circle - Townscript"
    ],
    region: "East India"
  },
  {
    userId: "U005",
    name: "Mohammed Rafiq",
    topInterests: ["Qawwali", "Documentaries", "Shayari Nights"],
    topLanguages: ["Urdu", "Hindi"],
    recentBookings: [
      "Nizami Bandhu Qawwali Night - Paytm Insider",
      "Netflix True Crime Meetup - FanFi",
      "Open Mic Shayari - FanFi"
    ],
    region: "Delhi NCR"
  },
  {
    userId: "U006",
    name: "Ayesha Khan",
    topInterests: ["Indie Pop", "Sufi Rock", "Spoken Word"],
    topLanguages: ["Hindi", "English"],
    recentBookings: [
      "The Local Train Unplugged - BookMyShow",
      "Spotify Sufi Sessions - Spotify",
      "Kommune Storytelling - FanFi"
    ],
    region: "Maharashtra"
  },
  {
    userId: "U007",
    name: "Karthik Iyer",
    topInterests: ["Rock Music", "Action Movies", "F1 Racing"],
    topLanguages: ["English", "Tamil"],
    recentBookings: [
      "Imagine Dragons Virtual Concert - FanFi",
      "Formula 1 Simulator Experience - Paytm Insider",
      "Salaar Movie - BookMyShow"
    ],
    region: "South India"
  },
  {
    userId: "U008",
    name: "Nikita Sharma",
    topInterests: ["Bollywood Dance", "Reality Shows", "Drama"],
    topLanguages: ["Hindi", "English"],
    recentBookings: [
      "Nach Baliye Finale Live - BookMyShow",
      "Drama Queen - Theater Act - FanFi",
      "Spotify Dance Hits Party - Spotify"
    ],
    region: "Delhi NCR"
  },
  {
    userId: "U009",
    name: "Manoj Das",
    topInterests: ["Odia Folk", "Bhojpuri Songs", "Devotional Music"],
    topLanguages: ["Odia", "Bhojpuri"],
    recentBookings: [
      "Folk Fest Bhubaneswar - BookMyShow",
      "Sankirtan Night - Local Event",
      "Bhojpuri Beat Fest - Paytm Insider"
    ],
    region: "East India"
  },
  {
    userId: "U010",
    name: "Meera Joshi",
    topInterests: ["Yoga Retreats", "Motivational Talks", "Sufi"],
    topLanguages: ["Hindi", "Gujarati"],
    recentBookings: [
      "Sadhguru Isha Meetup - FanFi",
      "Sufi Healing Night - BookMyShow",
      "Namaste Yoga Festival - Townscript"
    ],
    region: "Gujarat"
  }
];
