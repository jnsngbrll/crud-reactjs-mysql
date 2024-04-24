import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdatePlayer() {
  const { id } = useParams();
  const [playerInfo, setPlayerInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getPlayerByID = async () => {
      const response = await axios.get(`http://localhost:3001/players/${id}`);
      setPlayerInfo(response.data);
    };
    getPlayerByID();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await axios.put(
      `http://localhost:3001/players/update-player/${id}`,
      playerInfo
    );
    setIsLoading(false);
    navigate('/players');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlayerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto py-20 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black">Add New Player</h1>
        <Link to="/players" className="py-2 px-4 bg-black text-white">
          Go Back
        </Link>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto space-y-2"
      >
        <input
          type="text"
          placeholder="IGN"
          name="ign"
          value={playerInfo.ign}
          onChange={handleChange}
          className="w-full py-2 px-4 border border-black outline-none"
        />
        <input
          type="number"
          placeholder="Profile ID"
          name="profileID"
          value={playerInfo.profileID}
          onChange={handleChange}
          className="w-full py-2 px-4 border border-black outline-none"
        />
        <input
          type="text"
          placeholder="Role"
          name="role"
          value={playerInfo.role}
          onChange={handleChange}
          className="w-full py-2 px-4 border border-black outline-none"
        />
        <input
          type="text"
          placeholder="Main Hero"
          name="mainHero"
          value={playerInfo.mainHero}
          onChange={handleChange}
          className="w-full py-2 px-4 border border-black outline-none"
        />
        <input
          type="text"
          placeholder="Highest Rank"
          name="highestRank"
          value={playerInfo.highestRank}
          onChange={handleChange}
          className="w-full py-2 px-4 border border-black outline-none"
        />
        <button type="submit" className="w-full py-2 px-4 bg-black text-white">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
