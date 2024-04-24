import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddNewPlayer() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({
    ign: '',
    profileID: 0,
    role: '',
    mainHero: '',
    highestRank: '',
  });

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setPlayerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        !playerInfo.ign ||
        !playerInfo.profileID ||
        !playerInfo.role ||
        !playerInfo.mainHero ||
        !playerInfo.highestRank
      ) {
        return alert('All fields are required.');
      }
      setIsLoading(true);
      await axios.post(
        'http://localhost:3001/players/add-new-player',
        playerInfo
      );
      setIsLoading(false);
      navigate('/players');
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
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
          onChange={handleOnchange}
          className="w-full py-2 px-4 border border-black outline-none"
        />
        <input
          type="number"
          placeholder="Profile ID"
          name="profileID"
          value={playerInfo.profileID}
          onChange={handleOnchange}
          className="w-full py-2 px-4 border border-black outline-none"
        />
        <input
          type="text"
          placeholder="Role"
          name="role"
          value={playerInfo.role}
          onChange={handleOnchange}
          className="w-full py-2 px-4 border border-black outline-none"
        />
        <input
          type="text"
          placeholder="Main Hero"
          name="mainHero"
          value={playerInfo.mainHero}
          onChange={handleOnchange}
          className="w-full py-2 px-4 border border-black outline-none"
        />
        <input
          type="text"
          placeholder="Highest Rank"
          name="highestRank"
          value={playerInfo.highestRank}
          onChange={handleOnchange}
          className="w-full py-2 px-4 border border-black outline-none"
        />
        <button type="submit" className="w-full py-2 px-4 bg-black text-white">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
