import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faSubway,
  faTrain,
  faTaxi,
  faBicycle,
  faWalking,
} from "@fortawesome/free-solid-svg-icons";

const VehicleInput = ({updateVehicles}) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [vehicleName, setVehicleName] = useState("");

  const transportIcons = [
    { value: "รถบัส", icon: faBus },
    { value: "รถไฟใต้ดิน", icon: faSubway },
    { value: "รถไฟ", icon: faTrain },
    { value: "แท็กซี่", icon: faTaxi },
    { value: "จักรยาน", icon: faBicycle },
    { value: "เดิน", icon: faWalking },
  ];

  const handleIconChange = (e) => {
    setSelectedIcon(e.target.value);
  };

  const handleNameChange = (e) => {
    setVehicleName(e.target.value);
  };

  const addVehicle = () => {
    if (selectedIcon && vehicleName) {
      const newVehicles = [...vehicles, { icon: selectedIcon, name: vehicleName }];
      setVehicles(newVehicles);
      updateVehicles(newVehicles);
      setSelectedIcon("");
      setVehicleName("");
    }
  };

  const removeVehicle = (index) => {
    const newVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(newVehicles);
    updateVehicles(newVehicles);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center space-x-2">
        <select
          value={selectedIcon}
          onChange={handleIconChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">เลือกพาหนะ</option>
          {transportIcons.map((transport) => (
            <option key={transport.value} value={transport.value}>
              {transport.value}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={vehicleName}
          onChange={handleNameChange}
          placeholder="สายรถ เบอร์ อื่นๆ"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addVehicle}
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          เพิ่ม
        </button>
      </div>

      <div className="mt-4">
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 mb-2"
          >
            <FontAwesomeIcon
              icon={
                transportIcons.find((t) => t.value === vehicle.icon).icon
              }
              className="text-xl"
            />
            <span>{vehicle.name}</span>
            <button
              onClick={() => removeVehicle(index)}
              type="button"
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleInput;
