import React, {useEffect, useState} from 'react';
import { Button } from '../components/Button';
import {ReactComponent as WateringCan} from "../icons/watering-can.svg"
import { MdDragIndicator } from "react-icons/md";
import { useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export const PlantCard = (props) => {
  const [data, setData] = useState(props.data);

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: data.id,
    data: data
  });

  useEffect(() => {
    setData(props.data)
  }, [props])

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    zIndex: props.dragged && props.dragged.id === data.id ? 10 : 0
  };

  const handleWaterClick = () => {
    const now = new Date();
    setData({...data, last_watered: now.toLocaleDateString()})
    props.onWaterClick([data.id])
  }

  const utcToLocale = (utc) => {
    return new Date(utc).toLocaleDateString();
  }

  return (
    <li key={`li_${data.id}`} style={style} ref={setNodeRef} id={data.id} className={(props.dragged && props.dragged.id !== data.id ? 'opacity-30' : '') + ' flex gap-x-2 card-body bg-white rounded-md p-3 card-container h-auto shadow-md'}>
      <div className='flex w-full sm:w-96 items-start gap-2'>
          <button {...listeners} {...attributes} className='select-none touch-manipulation'>
            <MdDragIndicator size={'1.5em'} className='mt-px cursor-pointer h-fit'/>
          </button>
        <div className='flex flex-col justify-between w-full h-full'>
          <h3 className={'align-top font-bold text-xl' + (!data.plant_data.scientific_name ? ' mb-6' : '')}>{data.plant_data.name}</h3>
          {data.plant_data.scientific_name && <h4 className="text-slate-600 font-medium text-sm">{data.plant_data.scientific_name}</h4>}
          <span className='card-footer flex justify-end self-end'>
            {data.last_watered && <span className='mr-3 text-sm self-center font-light italic'>
              Last watered on {utcToLocale(data.last_watered)}
            </span>}
            <Button key='waterBtn' className='aspect-square' label={`water ${data.plant_data.name}`} onClick={handleWaterClick} params={data.id}><WateringCan /></Button>
          </span>
        </div>
      </div>
    </li>
  );
}