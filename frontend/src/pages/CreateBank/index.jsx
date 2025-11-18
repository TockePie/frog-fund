// src/pages/CreateBank/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateBank() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [minDonation, setMinDonation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBank = {
      title,
      description,
      goal: Number(goal),
      minDonation: Number(minDonation)
    };

    console.log('Створена банка:', newBank);

    navigate('/campaigns'); // перенаправлення після створення
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl p-10 shadow-xl text-center">

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-white flex items-center gap-2 hover:opacity-80 transition"
        >
          <span className="text-2xl">←</span> Назад
        </button>

        <h2 className="text-3xl font-bold mb-8">Нова банка</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
          <div>
            <label className="block text-gray-700 mb-1">На що збираємо?</label>
            <input
              type="text"
              placeholder="На психолога"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Опис (необов'язково)</label>
            <textarea
              placeholder="Опис..."
              className="w-full p-3 rounded-lg bg-gray-100 outline-none resize-none h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Сума накопичення</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3">
              <input
                type="number"
                className="w-full p-3 bg-transparent outline-none"
                placeholder="60"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              />
              <span className="text-gray-700">₴</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Мінімальний внесок (необов'язково)</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3">
              <input
                type="number"
                className="w-full p-3 bg-transparent outline-none"
                placeholder="5"
                value={minDonation}
                onChange={(e) => setMinDonation(e.target.value)}
              />
              <span className="text-gray-700">₴</span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-full font-bold text-lg hover:opacity-80 transition mt-4"
          >
            Створити
          </button>
        </form>
      </div>
    </div>
  );
}
