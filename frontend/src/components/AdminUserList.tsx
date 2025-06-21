import React, { useState } from "react";
import { demoUsers, User } from "../data/demoUsers";
import GenerateFanScoreModal from "./GenerateFanScoreModal";
import LeaderboardModal from "./LeaderboardModal";

const AdminUserList = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-[#1a1333] rounded-2xl shadow-2xl p-8 border border-[#c26cf5] relative">
      <button
        className="absolute top-6 right-8 bg-[#c26cf5] hover:bg-[#a259f7] text-white font-bold px-6 py-2 rounded-lg shadow transition-colors z-10"
        onClick={() => setShowLeaderboard(true)}
      >
        Leaderboard
      </button>
      <h2 className="text-2xl font-bold mb-6 text-[#c26cf5]">User List</h2>
      <ul className="space-y-4">
        {demoUsers.map((user) => (
          <li
            key={user.userId}
            className="flex items-center justify-between p-4 bg-[#25194a] rounded-xl shadow border border-[#a259f7]"
          >
            <span className="text-white font-medium">{user.name}</span>
            <button
              className="ml-4 bg-[#c26cf5] hover:bg-[#a259f7] transition-colors text-white px-5 py-2 rounded-lg font-semibold shadow"
              onClick={() => setSelectedUser(user)}
            >
              View & Generate Score
            </button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <GenerateFanScoreModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {showLeaderboard && (
        <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
      )}
    </div>
  );
};

export default AdminUserList;
