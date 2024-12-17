'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Clan {
  id: number;
  server_id: number;
  name: string;
  main_name: string;
  assist_name: string;
  alert: string;
  coin: number;
  level: number;
  exp: number;
}

export default function Giatoc() {
  const [clans, setClans] = useState<Clan[]>([]);
  
  // Fetch data from the API
  useEffect(() => {
    const fetchClans = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/rankgiatoc');
        const sortedClans = response.data.sort((a: Clan, b: Clan) => {
          // Sắp xếp theo 'level' trước
          if (b.level === a.level) {
            // Nếu 'level' bằng nhau, so sánh 'exp'
            return b.exp - a.exp; // Sắp xếp theo 'exp' giảm dần
          }
          return b.level - a.level; // Sắp xếp theo 'level' giảm dần
        });
        setClans(sortedClans); // Lưu dữ liệu đã sắp xếp vào state
      } catch (error) {
        console.error('Error fetching clan data:', error);
      }
    };

    fetchClans();
  }, []);

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
              TOP Gia Tộc
            </p>
          </div>
          <p className="break-words text-gray-500 dark:text-gray-400 md:text-lg text-sm md:mt-1">
            Xếp Hạng Gia Tộc
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
                    <span>Gia Tộc</span>
                  </th>
                  <th
                    scope="col"
                    className="text-left rtl:text-right whitespace-nowrap px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
                  >
                    <span>Tộc Trưởng</span>
                  </th>
                  <th
                    scope="col"
                    className="text-left rtl:text-right whitespace-nowrap px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
                  >
                    <span>Cấp độ</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {clans.map((clan, index) => (
                  <tr key={clan.id}>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-primary-500 dark:text-primary-400 text-sm font-medium">
                      {clan.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">
                      {clan.main_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">
                      Level {clan.level}
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
