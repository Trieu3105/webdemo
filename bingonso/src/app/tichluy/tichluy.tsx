'use client'
import { useState, useEffect } from "react";
import axios from "axios";

// Định nghĩa interface cho dữ liệu người chơi
interface Player {
  id: string; // id người chơi
  name: string; // Tên người chơi
  tongnap: number; // Tổng số tiền nạp
  level: number; // Mức level của người chơi
  levelUpTime: string; // Thời gian lên cấp
}

export default function Tichluy() {
  const [players, setPlayers] = useState<Player[]>([]); // State lưu danh sách người chơi
  const [loading, setLoading] = useState<boolean>(true); // State kiểm tra trạng thái tải

  // Gọi API để lấy dữ liệu người chơi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/players"); // Endpoint API
        const data: Player[] = response.data; // Sử dụng 'const' thay vì 'let' vì giá trị không thay đổi

        // Sắp xếp dữ liệu theo tổng nạp và thời gian lên cấp
        data.sort((a, b) => {
          // So sánh tổng nạp trước
          if (b.tongnap !== a.tongnap) {
            return b.tongnap - a.tongnap;
          }
          // Nếu tổng nạp bằng nhau, so sánh theo thời gian lên cấp
          return new Date(b.levelUpTime).getTime() - new Date(a.levelUpTime).getTime();
        });

        // Cập nhật dữ liệu đã sắp xếp vào state
        setPlayers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi dữ liệu đang được tải
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
              TOP Tích lũy tháng
            </p>
          </div>
          <p className="break-words text-gray-500 dark:text-gray-400 md:text-lg text-sm md:mt-1">
            Xếp Hạng Xếp hạng tích lũy tháng
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
                    <span>Tích lũy</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {players.map((player, index) => (
                  <tr key={player.id}>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-primary-500 dark:text-primary-400 text-sm font-medium">
                      {player.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">
                     {player.tongnap} VND
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
