// components/Profile.js

'use client';

import Image from 'next/image';


export default function Profile() {

  return (
    <div className="xl:col-span-10 md:col-span-9 col-span-12 lg:pl-12 md:pl-8">
      <main className="py-4">
        <div className="transition-opacity duration-300 opacity-100">
          <div className="max-w-[700px] mx-auto">
            {/* Thông Tin Tài Khoản */}
            <div className="relative mb-8">
              <div className="flex justify-between items-center capitalize mb-4">
                <div className="flex items-center">
                  <span className="icon-[bxs--circle] w-4 h-4 text-primary-500 dark:text-primary-400 md:mr-4 mr-2"></span>
                  <p className="md:text-2xl text-xl font-bold text-gray-700 dark:text-gray-300">Profile</p>
                </div>
                <p className="break-words text-gray-500 dark:text-gray-400 md:text-lg text-sm md:mt-1">Thông Tin Tài Khoản</p>
              </div>

              <div className="relative overflow-visible rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900">
                <div className="p-4 flex items-center">
                  <div className="flex items-center">
                    <span className="relative inline-flex items-center justify-center flex-shrink-0 rounded-full h-10 w-10 text-base cursor-pointer">
                      <Image
                        alt="Avatar"
                        width={100}
                        height={100}
                        className="rounded-full h-10 w-10 text-base"
                        src="/images/avatar.png" // Đường dẫn ảnh
                      />
                    </span>
                  </div>
                  <div className="flex flex-col items-start mx-4 grow">
                    <p className="break-words font-semibold cursor-pointer mb-1">nsoplus123123</p>
                    <div className="flex items-center">
                      <span className="inline-flex items-center font-medium rounded-md text-xs px-2 py-1 dark:bg-primary-400 dark:bg-opacity-10 text-primary-500 dark:text-primary-400 bg-primary-500 bg-opacity-10 mr-1">Thành viên</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-800 border-t border-gray-100 dark:border-gray-800">
                  {["Số dư", "Tích lũy", "Lượt Quay"].map((label, idx) => (
                    <div key={idx} className="flex flex-col items-center p-2 w-4/12">
                      <p className="break-words text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                      <p className="break-words font-bold cursor-pointer">0</p> {/* Thay thế bằng giá trị thực */}
                    </div>
                  ))}
                </div>

                <div className="py-2 px-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 py-2">
                    <div className="flex items-center mr-6">
                      <span className="icon-[bx--barcode] w-5 h-5 mr-2"></span>
                      <p className="break-words text-sm font-semibold">Bảo mật</p>
                    </div>
                    <p className="break-words text-sm text-primary-500 dark:text-primary-400 font-bold cursor-pointer">Đổi mật khẩu</p>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 py-2">
                    <div className="flex items-center mr-6">
                      <span className="icon-[bx--phone] w-5 h-5 mr-2"></span>
                      <p className="break-words text-sm font-semibold">Điện thoại</p>
                    </div>
                    <p className="break-words text-sm font-bold cursor-pointer text-red-500 dark:text-red-400 hover:text-red-600">Thêm số điện thoại</p>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 py-2">
                    <div className="flex items-center mr-6">
                      <span className="icon-[bx--envelope] w-5 h-5 mr-2"></span>
                      <p className="break-words text-sm font-semibold">Email</p>
                    </div>
                    <p className="break-words text-sm font-bold cursor-pointer text-red-500 dark:text-red-400 hover:text-red-600">Thêm địa chỉ email</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lịch sử giao dịch */}
            <div className="relative mb-7">
              <div className="flex justify-between items-center capitalize mb-4">
                <div className="flex items-center">
                  <span className="icon-[bxs--circle] w-4 h-4 text-primary-500 dark:text-primary-400 md:mr-4 mr-2"></span>
                  <p className="md:text-2xl text-xl font-bold text-gray-700 dark:text-gray-300">Lịch sử giao dịch</p>
                </div>
              </div>

              <div className="relative overflow-visible rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900">
                <div className="px-3 py-2">
                  <table className="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-700">
                    <thead>
                      <tr>
                        {["Mã GD", "Số tiền", "Số dư", "Nội dung", "Thời gian"].map((header, idx) => (
                          <th key={idx} className="text-left whitespace-nowrap px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      
                        <tr>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm text-center">
                            Không có dữ liệu nào được tìm thấy
                          </td>
                        </tr>
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
