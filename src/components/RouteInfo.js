import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faSubway,
  faTrain,
  faTaxi,
  faBicycle,
  faWalking,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function RouteInfo({ start, destination, vehicles }) {
  const transportIcons = {
    รถบัส: faBus,
    รถไฟใต้ดิน: faSubway,
    รถไฟ: faTrain,
    แท็กซี่: faTaxi,
    จักรยาน: faBicycle,
    เดิน: faWalking,
  };

  const elements = [
    <div key="start" className="route-info__start">
      {start}
    </div>,
  ];

  vehicles &&
    vehicles.forEach((vehicle, index) => {
      elements.push(
        <div key={`arrow-${index}`} className="route-info__arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      );

      elements.push(
        <div key={`vehicle-${index}`} className="route-info__vehicle">
          <FontAwesomeIcon icon={transportIcons[vehicle.icon]} />
          <span>{vehicle.name}</span>
        </div>
      );
    });

  elements.push(
    <div key="arrow-end" className="route-info__arrow">
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  );

  elements.push(
    <div key="destination" className="route-info__end">
      {destination}
    </div>
  );

  return <div className="route-info">{elements}</div>;
}

export default RouteInfo;
