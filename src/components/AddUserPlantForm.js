import React, {useRef, useState} from "react";
import authFetch from "../helpers/axios";

export const AddUserPlantForm = () => {
  const form = useRef(null);
  const [plantName, setPlantName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [nickname, setNickname] = useState("");
  const [type, setType] = useState();
  const [wateringFreq, setWateringFreq] = useState(0);
  const [wateringPeriod, setWateringPeriod] = useState();
  const [wateringTime, setWateringTime] = useState();
  const [sunRequirements, setSunRequirements] = useState();
  const [count, setCount] = useState(1);


  const handleSubmit = async e => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(form.current))
    const postPlant = await authFetch.post(
        "plants/create/",
        JSON.stringify({
          name: formData.name,
          scientific_name: formData.scientific_name,
          type: formData.type,
          watering_freq: formData.watering_freq,
          watering_period: formData.watering_period,
          watering_time: formData.watering_time,
          sun_requirement: formData.sun_requirement
        })
      )
      .catch((err) => {
        console.log(err.message)
      }
    );
    await authFetch.post(
        "userplants/create/",
        JSON.stringify({
          plant_id: postPlant.data.id,
          nickname: formData.nickname,
          image_path: null,
          count: formData.count
        })
      )
      .catch((err) => {
        console.log(err.message)
      });
  }

  return (
    <form id="addUserPlant" ref={form} onSubmit={handleSubmit}>
      <label htmlFor="plantName">Plant Name: </label>
      <input type="text" id="plantName" name="name" required value={plantName} onChange={e => setPlantName(e.target.value)}/>
      <label htmlFor="scientificName">Scientific Name: </label>
      <input type="text" id="scientificName" name="scientific_name" value={scientificName} onChange={e => setScientificName(e.target.value)}/>
      <label htmlFor="nickame">Nickname: </label>
      <input type="text" id="nickname" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)}/>
      <label htmlFor="plantTypeMenu">Plant Type: </label>
      <select id="plantTypeMenu" name="type" value={type} onChange={e => setType(e.target.value)}>
        <option value="flower">Flower</option>
        <option value="herb">Herb</option>
        <option value="leafy plant">Leafy Plant</option>
        <option value="succulent">Succulent</option>
        <option value="tree">Tree</option>
        <option value="vegetable">Vegetable</option>
      </select>
      <label htmlFor="wateringFreq">Watering Frequency: </label>
      <input type="number" min="0" id="wateringFreq" name="watering_freq" value={wateringFreq} onChange={e => setWateringFreq(e.target.value)}/>
      <label htmlFor="wateringPeriodMenu">Watering Period: </label>
      <select id="wateringPeriodMenu" name="watering_period" value={wateringPeriod} onChange={e => setWateringPeriod(e.target.value)}>
        <option value="HOUR">Hour</option>
        <option value="DAY">Day</option>
        <option value="WEEK">Week</option>
      </select>
      <label htmlFor="wateringTime">Watering Time: </label>
      <select id="wateringTime" name="watering_time" value={wateringTime} onChange={e => setWateringTime(e.target.value)} >
        <option value="MORNING">Morning</option>
        <option value="AFTERNOON">Afternoon</option>
        <option value="NIGHT">Night</option>
      </select>
      <label htmlFor="sunRequirements">Sun Requirements: </label>
      <select id="sunRequirements" name="sun_requirement" value={sunRequirements} onChange={e => setSunRequirements(e.target.value)} >
        <option value="FULL_SUN">Full Sun</option>
        <option value="PART_SHADE">Partial Shade</option>
        <option value="SHADE">Shade</option>
      </select>
      <label htmlFor="count">Count: </label>
      <input type="number" min="0" value={count} id="count" name="count" onChange={e => setCount(e.target.value)}/>
      <button type="submit">Add Plant</button>
    </form>
  )
}