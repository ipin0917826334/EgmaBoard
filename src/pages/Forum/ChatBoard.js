import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function ChatBoard() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center mb-5">
        <button
          className={`px-4 py-2 mr-1 rounded-t-lg focus:outline-none ${activeTab === "tab1"
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-800"
            }`}
          onClick={() => handleTabChange("tab1")}
        >
          ห้องสาธารณะ
        </button>
        <button
          className={`px-4 py-2 ml-1 rounded-t-lg focus:outline-none ${activeTab === "tab2"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
            }`}
          onClick={() => handleTabChange("tab2")}
        >
          ห้องส่วนตัว
        </button>
      </div>
      <div className="bg-white rounded-b-lg shadow-lg p-5">
        {activeTab === "tab1" && <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="bg-gray-50 px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">ห้องสาธารณะ</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non faucibus velit, ac euismod sapien. Nam auctor enim eu magna sodales bibendum.</p>
              <div className="flex justify-center gap-4">
                  <button className="bg-[#3b82f6] rounded-full text-[#27272a] font-medium p-2"><NavLink to="/createpublic">สร้างห้อง</NavLink></button>
                  <button className="bg-[#fbbf24] rounded-full text-[#27272a] font-medium p-2"><NavLink to="/createpublic">แก้ไขห้อง</NavLink></button>
                  <button className="bg-[#ef4444] rounded-full text-[#27272a] font-medium p-2"><NavLink to="/createpublic">ลบห้อง</NavLink></button>
                  </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-black-500">ชื่อห้อง</dt>
              <dd className="mt-1 text-lg text-black-500 sm:mt-0 sm:col-span-2">รายละเอียด</dd>
              </div>
              <hr></hr>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <NavLink to="/board1" className="text-sm font-medium text-gray-500">นุ๊กรักป่าน 1</NavLink>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">นุ๊กรักป่านแต่เค้าไม่รัก.</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <NavLink to="#" className="text-sm font-medium text-gray-500">นุ๊กรักป่าน 2</NavLink>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">ทรงพระติ๋ม </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <NavLink to="#" className="text-sm font-medium text-gray-500">นุ๊กรักป่าน 3</NavLink>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">นัดดีลลาดกระบัง</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>}
        {activeTab === "tab2" && <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="bg-gray-50 px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">ห้องส่วนตัว</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non faucibus velit, ac euismod sapien. Nam auctor enim eu magna sodales bibendum.</p>
              <div className="flex justify-center gap-4">
                  <button className="bg-[#3b82f6] rounded-full text-[#27272a] font-medium p-2"><NavLink to="/createpublic">สร้างห้อง</NavLink></button>
                  <button className="bg-[#fbbf24] rounded-full text-[#27272a] font-medium p-2"><NavLink to="/createpublic">แก้ไขห้อง</NavLink></button>
                  <button className="bg-[#ef4444] rounded-full text-[#27272a] font-medium p-2"><NavLink to="/createpublic">ลบห้อง</NavLink></button>
                  </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-black-500">ชื่อห้อง</dt>
              <dd className="mt-1 text-lg text-black-500 sm:mt-0 sm:col-span-2">รายละเอียด</dd>
              </div>
              <hr></hr>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <NavLink to="#" className="text-sm font-medium text-gray-500">นุ๊กรักป่าน 4</NavLink>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">ป่านนนนนนนนนนน</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <NavLink to="#" className="text-sm font-medium text-gray-500">นุ๊กรักป่าน 5</NavLink>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">เขียนโค้ดเก่งป่านก็ไม่รัก</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <NavLink to="#" className="text-sm font-medium text-gray-500">นุ๊กรักป่าน 6</NavLink>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">ผู้ชายเสื้อลายคนนั้นที่เยดะ</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default ChatBoard;