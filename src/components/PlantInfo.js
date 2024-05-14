import React, {useState, useEffect, useRef} from "react";
import { useAuth } from "../hooks/AuthProvider";
import { TypeIcon } from "./TypeIcon";
// import { VscBook } from "react-icons/vsc";
import { MdSunny } from "react-icons/md";
// import { MdCategory } from "react-icons/md";
import { IoWater } from "react-icons/io5";
import { Button } from "./Button";

const PlantNotes = ({data}) => {

  return (
    <ul className="w-full flex flex-col gap-y-5">
      {data.map(note => {
        return (
          <li key={note.id}>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              {new Date(note.created_at + "Z").toLocaleString()}
            </h3>
            <span className="ml-3">{note.note}</span>
          </li>
        )
      })}
    </ul>
  )
}


export const PlantInfo = ({data}) => {
  const {authFetch} = useAuth();
  const [noteData, setNoteData] = useState();
  const [noteVal, setNoteVal] = useState();
  const [sunRequirements, setSunRequirements] = useState();
  const [waterRequirements, setWaterRequirements] = useState();
  const form = useRef();

  const fetchNotes = async () => {
    await authFetch(`userplants/${data.id}/notes/`)
    .then((response) => {response.data.length > 0 && setNoteData(response.data)})
    .catch((err) => {
      console.log(err.message);
    });
  }

  useEffect(() => {
    fetchNotes();

    setSunRequirements(() => {
      switch(data.plant_data.sun_requirement) {
        case "FULL_SUN":
          return "Full Sun";
        case "PART_SHADE":
          return "Partial Sun"
        case "SHADE":
          return "Shade"
        default:
          return null
      }
    })
  
    if (data.plant_data.watering_freq && data.plant_data.watering_period) {
      var parsedRequirements;
      var wateringPeriod;
      
      // eslint-disable-next-line
      switch(data.plant_data.watering_period) {
        case "HOUR":
          wateringPeriod = "hour";
          break;
        case "DAY":
          wateringPeriod = "day";
          break;
        case "WEEK":
          wateringPeriod = "week";
          break;
        case "MONTH":
          wateringPeriod = "month";
          break;
      }
      parsedRequirements = `${data.plant_data.watering_freq} ${data.plant_data.watering_freq > 1 ? "times" : "time"} per ${wateringPeriod}`
      
      if (data.plant_data.watering_time) {
        var wateringTime;

        // eslint-disable-next-line
        switch(data.plant_data.watering_time) {
          case "MORNING":
            wateringTime = "in the morning";
            break;
          case "AFTERNOON":
            wateringTime = "in the afternoon";
            break;
          case "NIGHT":
            wateringTime = "at night";
            break;
        }
        parsedRequirements += ` ${wateringTime}`
      }
      setWaterRequirements(parsedRequirements);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const submitNote = async e => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(form.current))
    await authFetch.post(
        `userplants/${data.id}/notes/`,
        JSON.stringify({
          note: formData.note
        })
      )
      .catch((err) => {
        console.log(err.message)
      }
    );
    setNoteVal("");
    fetchNotes();
  }


  return (
    <>
      <ul className="flex flex-col gap-y-px">
        <li className="flex gap-x-2 items-center">
          <TypeIcon type={data.plant_data.type} />
          <span>{data.plant_data.scientific_name}</span>
        </li>
        {sunRequirements && 
          <li className="flex gap-x-2 items-center">
            <MdSunny />
            <span>{sunRequirements}</span>
          </li>}
        {waterRequirements && 
          <li className="flex gap-x-2 items-center">
            <IoWater />
            <span>{waterRequirements}</span>
          </li>}
      </ul>
      <div id="notes" className="border-t border-gray-400 pt-5">
        <form ref={form} className={"flex flex-col gap-y-3"} onSubmit={submitNote}>
          <label htmlFor="note">Note:</label>
          <textarea 
            id="note" 
            name="note" 
            required 
            value={noteVal} 
            onChange={e => setNoteVal(e.target.value)} 
            className="border border-gray-700 h-16 rounded px-2 py-px"
          />
          <Button type="submit" variant="square" className="w-full mb-5">Add Note</Button>
        </form>
        {noteData && <PlantNotes data={noteData} />}
      </div>
    </>
  )
}