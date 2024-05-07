import React, {useState, useEffect, useRef} from 'react';
import { useAuth } from '../hooks/AuthProvider';
import authFetch from '../helpers/axios';
import { AddUserPlantForm } from '../components/AddUserPlantForm';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { PlantCard } from '../components/PlantCard';
import { Group } from '../components/Group';
import {DndContext} from '@dnd-kit/core'
import { useSensor, useSensors, TouchSensor, KeyboardSensor, MouseSensor } from '@dnd-kit/core';

export const MyPlants = () => {
  const form = useRef(null);
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(null);
  const {logOut} = useAuth();
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const keyboardSensor = useSensor(KeyboardSensor)

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

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

  const updatePlantGroup = async (plantId, groupId) => {
    await authFetch.post(
      `userplants/${plantId}/update`, 
      JSON.stringify({
        "user_group_id": groupId
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
        const beingDragged = isDragging ? isDragging.id === result.id : false
        return (
          <PlantCard key={`plant_${result.id}`} id={result.id} data={result} dragged={beingDragged} onWaterClick={waterPlant}/>
        )
      })
      return (
        // group area
        <React.Fragment key={`group_${group.id}`}>
          <Group data={group} isDragging={isDragging}>
            {group_plants}
          </Group>
        </React.Fragment>
      )
    })
  } 

  const handleDragStart = (e) => {
    setIsDragging(e.active.data.current)
  }

  const handleDragEnd = (e) => {
    setIsDragging(null)
    if (e.over) {
      const newResults = [...results]
      const newGroup = newResults.find((object) => object.id === e.over.id)
      const fromGroup = newResults.find(object => 
        object.plants.find(plant => 
          plant.id === e.active.data.current.id
        )
      )
      fromGroup.plants.splice(fromGroup.plants.indexOf(e.active.data.current), 1)
      newGroup.plants.push(e.active.data.current)
      setResults(newResults)
      updatePlantGroup(e.active.data.current.id, e.over.data.current.id)
    }
  }

  return (
    <div className='bg-gradient-to-b from-green-300 to-cyan-500 bg-fixed min-h-screen overflow-y-contain'>
      {modalOpen && <Modal title='Add Plant' onClose={() => {setModalOpen(false)}}>
        <AddUserPlantForm ref={form} onSubmit={handleSubmit} />  
      </Modal>}
      <nav className='flex shadow-md p-2 pb-2 bg-white fixed top-0 w-full z-10'>
        <h1 className='text-2xl font-bold'>My Plants</h1>
        <Button variant='square' className='ms-auto h-fit' onClick={() => logOut()}>Logout</Button>
      </nav>
      <main className='pt-20 relative'>
        <DndContext 
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="overscroll-none mx-3 sm:mx-auto flex flex-col sm:w-max space-y-5 pb-20" id="plants">
            {groups}
          </div>
          <div className='fixed bottom-0 pb-3 pt-5 ps-3 w-full bg-gradient-to-t from-cyan-500'>
            <Button onClick={() => setModalOpen(true)} className="">+ Add Plant</Button>
          </div>
        </DndContext>
      </main>
      
    </div>
  )
}