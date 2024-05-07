import React from 'react';
import { Button } from '../components/Button';
import {ReactComponent as WateringCan} from "../icons/watering-can.svg"
import { MdDragIndicator } from "react-icons/md";
import { useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export const PlantCard = (props) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.data.id,
    data: props.data
  });

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform)
  };

  const UTCToLocalDate = (utc) => {
    var date = new Date(utc + "Z").toLocaleDateString();
    return date
  }

  return (
    <li key={`li_${props.data.id}`} style={style} ref={setNodeRef} id={props.data.id} className={(props.dragged ? '!opacity-100 z-50' : '') + ' flex gap-x-2 card-body bg-white rounded-md p-3 card-container h-auto shadow-md'}>
      <div className='flex w-full sm:w-96 items-start gap-2'>
          <button {...listeners} {...attributes} className='select-none touch-manipulation'>
            <MdDragIndicator size={'1.5em'} className='mt-px cursor-pointer h-fit'/>
          </button>
        <div className='flex flex-col justify-between w-full h-full'>
          <h2 className={' align-top font-bold text-xl' + (!props.data.plant_data.scientific_name ? ' mb-6' : '')}>{props.data.plant_data.name}</h2>
          {props.data.plant_data.scientific_name && <h3 className="text-slate-600 font-medium text-sm">{props.data.plant_data.scientific_name}</h3>}
          <span className='card-footer flex justify-end self-end'>
            {props.data.last_watered && <span className='mr-3 text-sm self-center font-light italic'>
              Last watered on {UTCToLocalDate(props.data.last_watered)}
            </span>}
            <Button className='aspect-square' label={`water ${props.data.plant_data.name}`} onClick={props.onWaterClick} params={props.data.id}><WateringCan /></Button>
          </span>
        </div>
      </div>
    </li>
  );
}