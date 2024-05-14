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
      return <FaTree />;
    case "LEAFY_PLANT":
      return <PiPlantFill />;
    case "SUCCULENT":
      return <PiCactusFill />;
    case "HERB":
      return <PiLeafFill />;
    case "VEGETABLE":
      return <PiCarrotFill />;
    case "FLOWER":
      return <PiFlowerTulipBold />;
    default:
      return false;
  }
}