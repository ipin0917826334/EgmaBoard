import React from 'react'
import imageContent from '../../assets/1.png';
export default () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">สมาชิก</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
          <img src={imageContent} className="rounded-full w-40 h-40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">ณัชพล นันทสันติ 63070049</h2>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus, ipsum quis facilisis tristique, ipsum est
            venenatis mi, eu eleifend nibh massa nec arcu. Sed semper viverra mi, sed euismod eros pellentesque id. Fusce
            et augue sed elit interdum porttitor.
          </p>
        </div>
      <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
        <img src={imageContent} className="rounded-full w-40 h-40 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">ณัชพล นันทสันติ 63070049</h2>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus, ipsum quis facilisis tristique, ipsum est
          venenatis mi, eu eleifend nibh massa nec arcu. Sed semper viverra mi, sed euismod eros pellentesque id. Fusce
          et augue sed elit interdum porttitor.
        </p>
      </div>
      <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
        <img src={imageContent} className="rounded-full w-40 h-40 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">ณัชพล นันทสันติ 63070049</h2>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus, ipsum quis facilisis tristique, ipsum est
          venenatis mi, eu eleifend nibh massa nec arcu. Sed semper viverra mi, sed euismod eros pellentesque id. Fusce
          et augue sed elit interdum porttitor.
        </p>
      </div>
    </div>
    </div>
  );
};
