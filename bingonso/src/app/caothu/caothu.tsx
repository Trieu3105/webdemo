"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Định nghĩa kiểu cho một player
interface Player {
  id: string;
  name: string;
  playerLevel: number;
  levelUpTime: string;
  daysBetween: number;
}

export default function Caothu() {
  const [players, setPlayers] = useState<Player[]>([]); // Chỉ định kiểu cho state players
  const [loading, setLoading] = useState(true);

  // Gọi API và lấy dữ liệu
  useEffect(() => {
    const fetchPlayersData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/players");
        setPlayers(response.data); // Dữ liệu trả về từ API sẽ có kiểu Player[]
      } catch (error) {
        console.error("Error fetching players data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayersData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="flex justify-between items-center capitalize mb-4">
        <div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-primary-500 dark:text-primary-400 md:mr-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              height="14"
              width="14"
              viewBox="0 0 512 512"
            >
              <path
                fill="#63E6BE"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
              ></path>
            </svg>
            <p className="md:text-2xl text-xl font-bold text-gray-700 dark:text-gray-300">
              TOP Cao Thủ
            </p>
          </div>
          <p className="break-words text-gray-500 dark:text-gray-400 md:text-lg text-sm md:mt-1">
            Xếp Hạng Cao Thủ
          </p>
        </div>
      </div>

      <div className="relative overflow-visible rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 mt-4">
        <div className="p-0 sm:p-0">
          <div className="relative overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="relative">
                <tr>
                  <th
                    scope="col"
                    className="text-left rtl:text-right whitespace-nowrap px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
                  >
                    <span>Xếp hạng</span>
                  </th>
                  <th
                    scope="col"
                    className="text-left rtl:text-right whitespace-nowrap px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
                  >
                    <span>Nhân vật</span>
                  </th>
                  <th
                    scope="col"
                    className="text-left rtl:text-right whitespace-nowrap px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
                  >
                    <span>Trình độ</span>
                  </th>
                  <th
                    scope="col"
                    className="text-left rtl:text-right whitespace-nowrap px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
                  >
                    <span>Thời gian</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {players
                  .sort((a, b) => {
                    // So sánh playerLevel
                    if (a.playerLevel < b.playerLevel) return 1; // a > b -> a đứng trước
                    if (a.playerLevel > b.playerLevel) return -1; // a < b -> b đứng trước

                    // Nếu playerLevel bằng nhau, so sánh levelUpTime
                    if (a.daysBetween > b.daysBetween) return -1; // a > b -> a đứng trước
                    if (a.daysBetween < b.daysBetween) return 1; // a < b -> b đứng trước

                    return 0; // Nếu cả hai đều bằng nhau, giữ nguyên vị trí
                  })
                  .map((player, index) => (
                    <tr key={player.id}>
                      <td className="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-primary-500 dark:text-primary-400 text-sm font-medium">
                        {player.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {player.playerLevel}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {player.daysBetween ? player.daysBetween : "Chưa có"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
