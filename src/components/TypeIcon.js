import React from "react";
import { FaTree } from "react-icons/fa";
import { PiPlantFill } from "react-icons/pi";
import { PiCactusFill } from "react-icons/pi";
import { PiLeafFill } from "react-icons/pi";
import { PiCarrotFill } from "react-icons/pi";
import { PiFlowerTulipBold } from "react-icons/pi";



export const TypeIcon = ({type}) => {

  switch (type) {
    case "TREE":
      return <FaTree aria-label="tree"/>;
    case "LEAFY_PLANT":
      return <PiPlantFill aria-label="leafy plant"/>;
    case "SUCCULENT":
      return <PiCactusFill aria-label="succulent"/>;
    case "HERB":
      return <PiLeafFill aria-label="herb"/>;
    case "VEGETABLE":
      return <PiCarrotFill aria-label="vegetable"/>;
    case "FLOWER":
      return <PiFlowerTulipBold aria-label="flower"/>;
    default:
      return false;
  }
}