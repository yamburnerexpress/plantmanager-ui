import React, {useState, useEffect, useRef} from 'react';
import { useAuth } from '../hooks/AuthProvider';
import authFetch from '../helpers/axios';
import { AddUserPlantForm } from '../components/AddUserPlantForm';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import {ReactComponent as WateringCan} from "../icons/watering-can.svg"
import { MdDragIndicator } from "react-icons/md";

export const MyPlants = () => {
  const form = useRef(null);
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const {logOut} = useAuth();

  useEffect(() => {
    authFetch("userplants/")
      .then((response) => {setResults(response.data)})
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

  const getUserPlants = async () => {
    await authFetch("userplants/")
      .then((response) => {setResults(response.data)})
      .catch((err) => {
        console.log(err.message);
      });
  }

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
    getUserPlants();
  }


  const handleSubmit = async e => {
    e.preventDefault()
    console.log(form.current)
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
    await getUserPlants();
    setModalOpen(false);
  }

  const UTCToLocalDate = (utc) => {
    var date = new Date(utc + "Z").toLocaleDateString();
    return date
  }

  let groups = [];
  if (results) {
    var group_sort = results.sort(function(a, b) {
      if (a.is_default) {
        return 1
      } else if (b.is_default) {
        return -1
      } else {
        return a.name.localeCompare(b.name)
      }
    });
    groups = group_sort.map(group => {
      var plant_sort = group.plants.sort(function(a, b) {
        return a.plant_data.name.localeCompare(b.plant_data.name)
      })
      const group_plants = plant_sort.map(result => {
        return (
          // plant card
          <li key={result.plant_data.id} className='fle gap-x-2 card-body bg-white rounded-md p-3 card-container h-auto shadow-md'>
            <div className='flex flex-col justify-between w-full sm:w-96 '>
            <div className='h-fit flex items-center content-start gap-x-2'>
              <MdDragIndicator size={'1.5em'} className='cursor-pointer'/>
              <h2 className='font-bold text-xl'>{result.plant_data.name}</h2>
              {result.nickname && <h3 className="mb-2 text-slate-600 font-medium">{`"${result.nickname}"`}</h3>}
            </div>
            <span className='card-footer flex justify-end'>
              {result.last_watered && <span className='mr-3 text-sm self-center font-light italic'>
                Last watered on {UTCToLocalDate(result.last_watered)}
              </span>}
              <Button className='aspect-square' label={`water ${result.plant_data.name}`} onClick={waterPlant} params={result.id}><WateringCan /></Button>
            </span>
            </div>
          </li>
        )
      })
      return (
        // group area
        <React.Fragment key={group.id}>
          <div className='w-full sm:w-full mx-auto min-h-24 bg-slate-300 bg-opacity-70 border-slate-200 border-2 rounded-md'>
            <h2 className='w-full bg-slate-200 rounded-t font-bold text-xl px-3 py-2'>{group.name ? group.name : "Unsorted"}</h2>
            {/* <ul className="flex flex-wrap gap-3 justify-items-center"> */}
            <ul className="gap-3 p-3 grid lg:grid-cols-2 xl:grid-cols-3">
              {group_plants}
            </ul>
          </div>
        </React.Fragment>
      )
    })
  } 

  return (
    <div className='bg-gradient-to-b from-green-300 to-cyan-500 bg-fixed min-h-screen'>
      {modalOpen && <Modal>
        <AddUserPlantForm ref={form} onSubmit={handleSubmit} />  
      </Modal>}
      <nav className='flex shadow-md p-2 pb-4 bg-white fixed top-0 w-full z-10'>
        <h1 className='text-2xl font-bold'>My Plants</h1>
        <button className='ms-auto' onClick={() => logOut()}>Logout</button>
      </nav>
      <main className='pt-20 relative'>
        <div className="mx-3 sm:mx-auto flex flex-col sm:w-max space-y-5 pb-20" id="plants">
          {groups}
        </div>
        <div className='fixed bottom-0 pb-3 pt-5 ps-3 w-full bg-gradient-to-t from-cyan-500'>
          <Button onClick={() => setModalOpen(true)} className="">+ Add Plant</Button>
        </div>
      </main>
      
    </div>
  )
}