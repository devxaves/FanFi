import React, { useState } from "react";

const GenerateFanScoreModal = ({ user, onClose }: any) => {
  const [loading, setLoading] = useState(false);
  const [fanScore, setFanScore] = useState<number | null>(null);

  const generateFanScore = async () => {
    setLoading(true);
    // First, try to fetch from DB
    try {
      const dbRes = await fetch(
        `http://localhost:5000/api/getScore?userId=${user.userId}`
      );
      const dbData = await dbRes.json();
      if (
        dbRes.ok &&
        dbData.fanScore !== null &&
        dbData.fanScore !== undefined
      ) {
        setFanScore(dbData.fanScore);
        setLoading(false);
        return;
      }
    } catch (err) {
      // If DB fetch fails, fallback to Gemini
      console.error("DB fetch error, will try Gemini", err);
    }

    // If not in DB, call Gemini
    const prompt = `
You're an AI assistant helping an event platform rate fans based on their interests and booking history. 
Given the user's region, top interests, preferred languages, and recent bookings, assign a Fan Score (out of 100). 
Score should consider how passionate and consistent the user is with certain genres or artists.

Return ONLY the score as a number.

User Profile:
- Region: ${user.region}
- Interests: ${user.topInterests.join(", ")}
- Languages: ${user.topLanguages.join(", ")}
- Bookings: ${user.recentBookings.join(" | ")}
`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAkdDQGXZN1hPb99vOPGplPPzUNz4QI64A`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const score = parseInt(data.candidates?.[0]?.content?.parts?.[0]?.text);

      if (!isNaN(score)) {
        setFanScore(score);
        await saveFanScoreToMongo(user.userId, score);
      } else {
        alert("Invalid score response from Gemini.");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating Fan Score");
    }

    setLoading(false);
  };

  const saveFanScoreToMongo = async (userId: string, fanScore: number) => {
    try {
      await fetch("http://localhost:5000/api/saveScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, fanScore, username: user.name }),
      });
      // No alert here, UX improvement
    } catch (error) {
      console.error("MongoDB save failed:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#1a1333] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[#c26cf5] relative">
        <button
          className="absolute top-4 right-4 text-[#c26cf5] hover:text-pink-400 text-xl font-bold transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-2xl font-bold mb-3 text-[#c26cf5]">
          {user.name}'s Profile
        </h3>
        <div className="mb-2 text-white">
          <p>
            <span className="font-semibold text-[#c26cf5]">Region:</span>{" "}
            {user.region}
          </p>
          <p>
            <span className="font-semibold text-[#c26cf5]">Interests:</span>{" "}
            {user.topInterests.join(", ")}
          </p>
          <p>
            <span className="font-semibold text-[#c26cf5]">Languages:</span>{" "}
            {user.topLanguages.join(", ")}
          </p>
          <p>
            <span className="font-semibold text-[#c26cf5]">Bookings:</span>{" "}
            {user.recentBookings.join(", ")}
          </p>
        </div>
        <div className="mt-6">
          {fanScore ? (
            <p className="text-green-400 font-bold text-lg flex items-center gap-2">
              <span role="img" aria-label="target">
                🎯
              </span>{" "}
              Fan Score: {fanScore}
            </p>
          ) : (
            <button
              onClick={generateFanScore}
              disabled={loading}
              className="w-full bg-[#c26cf5] hover:bg-[#a259f7] transition-colors text-white px-4 py-2 rounded-lg font-semibold shadow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Fan Score"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateFanScoreModal;
