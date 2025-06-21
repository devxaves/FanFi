import React, { useEffect, useState } from "react";

const LeaderboardModal = ({ onClose }: { onClose: () => void }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fanfi.onrender.com/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.leaderboard || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#1a1333] p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-[#c26cf5] relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-[#c26cf5] hover:text-pink-400 text-xl font-bold transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-[#c26cf5] tracking-wide">
          🏆 FanFi Leaderboard
        </h2>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-300">No scores yet.</div>
        ) : (
          <ol className="space-y-3">
            {users.map((user, idx) => (
              <li
                key={user.name}
                className={`flex items-center justify-between px-5 py-3 rounded-xl shadow border border-[#a259f7] bg-[#25194a] ${
                  idx === 0 ? "scale-105 border-2 border-yellow-400" : ""
                }`}
              >
                <span className="flex items-center gap-2 text-white font-semibold text-lg">
                  {idx < 3 && (
                    <span
                      className={
                        idx === 0
                          ? "text-yellow-400 text-2xl"
                          : idx === 1
                          ? "text-gray-300 text-xl"
                          : "text-orange-400 text-xl"
                      }
                    >
                      {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                    </span>
                  )}
                  {user.name || user.userId}
                </span>
                <span className="text-[#c26cf5] font-bold text-xl">
                  {user.fanScore}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default LeaderboardModal;
