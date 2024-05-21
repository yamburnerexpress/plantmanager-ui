import React, {useState, useEffect, useRef, useCallback} from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { useModalContext } from '../../hooks/ModalProvider';
import { AddUserPlantForm } from './components/AddUserPlantForm';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '../../components/Modal';
import { Nav } from '../../components/Nav';
import { Button } from '../../components/Button';
import { PlantCard } from './components/PlantCard';
import { Group } from '../../components/Group';
import { DotLoader } from 'react-spinners';
import { LuExternalLink } from "react-icons/lu";
import { DndContext } from '@dnd-kit/core'
import { useSensor, useSensors, TouchSensor, KeyboardSensor, MouseSensor } from '@dnd-kit/core';
import { PlantInfo } from './components/PlantInfo';
import { TextInput } from '../../components/TextInput';
import { onClickUrl } from '../../helpers/onClickUrl';
import { ToastContainer, toast } from 'react-toastify';
import { EmptyState } from './components/EmptyState';
import 'react-toastify/dist/ReactToastify.css';

export const MyPlants = () => {
  const form = useRef(null);
  const groupForm = useRef(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {modalOpen, setModalOpen, closeModal} = useModalContext();
  const [isDragging, setIsDragging] = useState(null);
  const {authFetch} = useAuth();
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  const notify = (msg) => toast(msg);

  const getUserPlants = useCallback(async () => {
    return await authFetch("userplants/")
      .then((response) => {
        setResults(response.data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [authFetch])

  const loadDashboard = useCallback(async () => {
    await getUserPlants()
    setIsLoading(false)
  }, [getUserPlants, setIsLoading])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  const waterPlants = async (plantIds) => {
    await authFetch.post(
      "userplants/water/", 
      JSON.stringify({
        "plant_ids": plantIds
      })
    )
    .catch((err) => {
      console.log(err.message)
    });
    await getUserPlants();
  }

  const updatePlantGroup = async (plantId, groupId) => {
    await authFetch.post(
      `userplants/${plantId}/update/`, 
      JSON.stringify({
        "user_group_id": groupId
      })
    )
    .catch((err) => {
      console.log(err.message)
    });
    await getUserPlants();
  }

  const createUserGroup = async (name) => {
    await authFetch.post(
      'usergroups/create/',
      JSON.stringify({
        name: name,
        is_default: false
      })
    )
    .then(notify('Group created successfully'))
    .catch((err) => {
      console.log(err.message)
    });
    await getUserPlants();
  }

  const deletePlant = async (plantId) => {
    await authFetch.delete(
      `userplants/${plantId}/delete/`
    )
    .then(() => {
      closeModal();
      getUserPlants();
      notify('Plant deleted successfully')
    })
    .catch((err) => {
      console.log(err.message)
    });
  }


  const handleSubmit = async e => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(form.current))
    await authFetch.post(
      "plants/create/",
      JSON.stringify({
        name: formData.name,
        scientific_name: formData.scientific_name,
        type: formData.type,
        watering_freq: formData.watering_freq,
        watering_period: formData.watering_period,
        watering_time: formData.watering_time,
        sun_requirement: formData.sun_requirement,
        external_link: formData.external_link
      })
    )
    .then(async (response) => {
      await authFetch.post(
        "userplants/create/",
        JSON.stringify({
          plant_id: response.data.id,
          nickname: formData.nickname,
          image_path: null,
          count: formData.count
        })
      )
      .then(async () => {
        notify('Plant created successfully')
        await getUserPlants();
        closeModal();
      })
      .catch((err) => {
        console.log(err.message)
      });
    })
    .catch((err) => {
      console.log(err.message)
    });
  }

  const handleGroupSubmit = async e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(groupForm.current));
    await createUserGroup(formData.name);
    closeModal();
  }
  
  const groups = results.map(group => {
    var plant_sort = group.plants.sort(function(a, b) {
      return a.plant_data.name.localeCompare(b.plant_data.name)
    })
    const group_plants = plant_sort.map(result => {
      return (
        <PlantCard 
          key={`plant_${result.id}`} 
          onClick={() => setModalOpen({name: 'PLANT_INFO', data: result})} 
          id={result.id} 
          data={result} 
          dragged={isDragging} 
          onWaterClick={waterPlants}
        />
      )
    })
    return (
      // group area
      <React.Fragment key={`group_${group.id}`}>
        <Group data={group} isDragging={isDragging} onWaterClick={waterPlants}>
          {group_plants}
        </Group>
      </React.Fragment>
    )
  })

  const handleDragStart = (e) => {
    setIsDragging(e.active.data.current)
  }

  const handleDragEnd = async (e) => {
    setIsDragging(null)
    if (e.over) {
      const newResults = [...results]
      const newGroup = newResults.find((object) => object.id === e.over.id)
      const fromGroup = newResults.find(object => 
        object.plants.find(plant => 
          plant.id === e.active.data.current.id
        )
      )

      fromGroup.plants.splice(
        fromGroup.plants.indexOf(
          fromGroup.plants.find(
            plant => plant.id === e.active.data.current.id
          )), 1)
      newGroup.plants.push(e.active.data.current)
      setResults(newResults)
      updatePlantGroup(e.active.data.current.id, e.over.data.current.id)
    }
  }

  return (
    <div className='bg-gradient-to-b from-green-300 to-cyan-500 bg-fixed min-h-screen overflow-y-contain'>
      {(modalOpen && modalOpen.name === 'ADD_PLANT') && 
        <Modal>
          <ModalHeader>
            <h2 className='text-xl font-bold'>Add Plant</h2>
          </ModalHeader>
          <ModalContent>
            <AddUserPlantForm ref={form} onSubmit={handleSubmit} />  
          </ModalContent>
          <ModalFooter>
            <Button variant='square' type='submit' form='addUserPlant'>Save</Button>
          </ModalFooter>
        </Modal>
      }
      {(modalOpen && modalOpen.name === 'PLANT_INFO') && 
        <Modal>
          <ModalHeader>
            <h2 className='text-xl font-bold'>{modalOpen.data.plant_data.name}</h2>
            {modalOpen.data.plant_data.external_link && 
              <button role='link' title='Open external link' onClick={() => onClickUrl(modalOpen.data.plant_data.external_link)}>
                <LuExternalLink size='1.5em' />
              </button>
            }
          </ModalHeader>
          <ModalContent>
            <PlantInfo data={modalOpen.data} /> 
          </ModalContent>
          <ModalFooter>
            <button className='text-red-500 hover:text-red-700 font-bold px-3 py-2' onClick={() => deletePlant(modalOpen.data.id)}>Delete</button>
            <Button variant='square' onClick={closeModal}>Close</Button>
          </ModalFooter>
        </Modal>
      }
      {(modalOpen && modalOpen.name === 'ADD_GROUP') && 
        <Modal>
          <ModalHeader>
            <h2 className='text-xl font-bold'>Add Plant Group</h2>
          </ModalHeader>
          <ModalContent>
            <form id='addUserGroup' ref={groupForm} onSubmit={handleGroupSubmit} className="max-h-full flex flex-col space-between-3">
              <TextInput label='Name' type='text' id='groupName' name='name' required />
            </form>
          </ModalContent>
          <ModalFooter>
            <Button variant='square' type='submit' form='addUserGroup'>Save</Button>
          </ModalFooter>
        </Modal>
      }
      <Nav title='My Plants' />
      <main className='pt-20 relative'>
        {isLoading 
          ? <div className='w-full my-auto flex justify-center'>
            <DotLoader className='mt-10' color='#15353e'/>
          </div>
          : (results && results.flatMap(group => group.plants).length > 0)
            ? <DndContext 
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="overscroll-none mx-3 sm:mx-auto flex flex-col sm:w-max space-y-5 pb-20" id="plants">
                
                {groups}
                <button 
                  onClick={() => setModalOpen({name: 'ADD_GROUP'})}
                  className='w-full rounded-md bg-slate-200 font-bold text-xl px-3 py-2'
                >
                  + Add Group
                </button>
              </div>
              <div className='fixed bottom-0 pb-3 pt-5 ps-3 w-full bg-gradient-to-t from-cyan-500 z-10'>
                <Button onClick={() => setModalOpen({name: 'ADD_PLANT'})} className="">+ Add Plant</Button>
              </div>
            </DndContext>
            : <EmptyState 
              onClick={() => setModalOpen({name: 'ADD_PLANT'})}
            />
        }
        <ToastContainer 
          position="bottom-right"
          bodyClassName="font-bold font-sans"
        />
      </main>
      
    </div>
  )
}