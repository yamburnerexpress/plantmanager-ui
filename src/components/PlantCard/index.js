import React, {useRef, useState} from "react";
import "./plantCard.css";
import authFetch from "../../helpers/axios";

export const PlantCard = ({data}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardHeader = data.plant_data.name;
  const nickname = data.nickname;
  const waterDate = data.last_watered;

  const waterPlant = async (plantId) => {
    await authFetch.post(
      "userplants/water/", 
      JSON.stringify({
        "plant_ids": [
          plantId
        ]
      })
    )
    .catch((err) => {
      console.log(err.message)
    });
  }

  const UTCToLocalDate = (utc) => {
    var date = new Date(utc + "Z").toLocaleDateString();
    return date
  }

  return (
    <div className={`card ${isExpanded ? 'active' : ''}`}>
      <div className='cardHeader' onClick={() => setIsExpanded(!isExpanded)}>
        <div className='cardHeaderInfo'>
          <h2>{data.plant_data.name}</h2>
          <p className='nickname'>{data.nickname}</p>
        </div>
        <div className='cardHeaderAction'>
          <button onClick={() => waterPlant(data.id)}>Water</button>
        </div>
        {data.last_watered && <p className='lastWatered'><i>last watered on {UTCToLocalDate(data.last_watered)}</i></p>}
          {/* <p className='lastWatered'>{data.last_watered}</p> */}
        
        
      </div>
    </div>
  )
}