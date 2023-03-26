import React from 'react'
import { NavLink } from 'react-router-dom'
export default () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  <div className="flex flex-col items-center w-full max-w-lg p-8 mx-auto bg-white shadow-md">
    <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
      ขอต้อนรับสู่ Egma Board
    </h1>
    <p className="mb-8 text-xl text-center text-gray-800">
      เริ่มต้นใช้งานในทันที
    </p>
    <NavLink
      to="/forum"
      className="px-4 py-2 text-lg font-medium text-white bg-green-500 rounded hover:bg-green-600 focus:bg-green-600 focus:outline-none"
    >
      กดที่นี่
    </NavLink>
  </div>
</div>
)
