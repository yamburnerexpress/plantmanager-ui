import React, {useState, forwardRef} from "react";
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";

export const AddUserPlantForm = forwardRef((props, ref) => {
  const [plantName, setPlantName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [nickname, setNickname] = useState("");
  const [type, setType] = useState();
  const [wateringFreq, setWateringFreq] = useState(0);
  const [wateringPeriod, setWateringPeriod] = useState();
  const [wateringTime, setWateringTime] = useState();
  const [sunRequirements, setSunRequirements] = useState();
  const [count, setCount] = useState(1);

  return (
    <form id="addUserPlant" className={"max-h-full flex flex-col space-between-3"} ref={ref} onSubmit={props.onSubmit}>
      <TextInput label="Plant Name" type="text" id="plantName" name="name" required value={plantName} onChange={e => setPlantName(e.target.value)}/>
      <TextInput label="Scientific Name" type="text" id="scientificName" name="scientific_name" value={scientificName} onChange={e => setScientificName(e.target.value)}/>
      <TextInput label="Nickname" type="text" id="nickname" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)}/>
      <SelectInput label="Plant Type" id="plantTypeMenu" name="type" value={type} onChange={e => setType(e.target.value)}>
        <option value="flower">Flower</option>
        <option value="herb">Herb</option>
        <option value="leafy plant">Leafy Plant</option>
        <option value="succulent">Succulent</option>
        <option value="tree">Tree</option>
        <option value="vegetable">Vegetable</option>
      </SelectInput>
      <TextInput label="Watering Frequency" type="number" min="0" id="wateringFreq" name="watering_freq" value={wateringFreq} onChange={e => setWateringFreq(e.target.value)}/>
      <SelectInput label="Watering Period" id="wateringPeriodMenu" name="watering_period" value={wateringPeriod} onChange={e => setWateringPeriod(e.target.value)}>
        <option value="HOUR">Hour</option>
        <option value="DAY">Day</option>
        <option value="WEEK">Week</option>
        <option value="MONTH">Month</option>
      </SelectInput>
      <SelectInput label="Watering Time" id="wateringTime" name="watering_time" value={wateringTime} onChange={e => setWateringTime(e.target.value)} >
        <option value="MORNING">Morning</option>
        <option value="AFTERNOON">Afternoon</option>
        <option value="NIGHT">Night</option>
      </SelectInput>
      <SelectInput label="Sun Requirements" id="sunRequirements" name="sun_requirement" value={sunRequirements} onChange={e => setSunRequirements(e.target.value)} >
        <option value="FULL_SUN">Full Sun</option>
        <option value="PART_SHADE">Partial Shade</option>
        <option value="SHADE">Shade</option>
      </SelectInput>
      <TextInput label="Count" type="number" min="0" value={count} id="count" name="count" onChange={e => setCount(e.target.value)}/>
      {/* <Button type="submit" variant="square" className="mt-6">Add Plant</Button> */}
    </form>
  )
})