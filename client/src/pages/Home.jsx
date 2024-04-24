import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const response = await axios.get('http://localhost:3001/players');
    setPlayers(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/players/${id}`);
    fetchPlayers();
  };

  return (
    <div className="max-w-6xl mx-auto py-20 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black">List of Players</h1>
        <Link
          to="/players/add-new-player"
          className="py-2 px-4 bg-black text-white"
        >
          Add New Player
        </Link>
      </div>
      <table className="w-full border-separate">
        <thead>
          <tr className="bg-black text-white">
            <th className="py-2">ID</th>
            <th className="py-2">IGN</th>
            <th className="py-2">Profile ID</th>
            <th className="py-2">Role</th>
            <th className="py-2">Main Hero</th>
            <th className="py-2">Highest Rank</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, idx) => (
            <tr
              key={idx}
              className={`text-center ${idx % 2 !== 0 && 'bg-gray-200'}`}
            >
              <td className="py-2">{player.id}</td>
              <td className="py-2">{player.ign}</td>
              <td className="py-2">{player.profileID}</td>
              <td className="py-2">{player.role}</td>
              <td className="py-2">{player.mainHero}</td>
              <td className="py-2">{player.highestRank}</td>
              <td className="py-2 flex gap-x-2 justify-center">
                <Link
                  to={`/players/update-player/${player.id}`}
                  className="p-1 bg-green-500 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1l1-4Z"></path>
                    </g>
                  </svg>
                </Link>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="p-1 bg-red-500 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
