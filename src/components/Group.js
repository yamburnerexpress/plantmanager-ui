import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const Group = (props) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.data.id,
    data: props.data
  });

  return (
    // group area
    <React.Fragment key={props.data.id}>
      <div ref={setNodeRef} className={(isOver || !props.isDragging ? 'opacity-100' : 'opacity-50') + ' w-full sm:w-full mx-auto min-h-24 bg-slate-300 bg-opacity-70 border-slate-200 border-2 rounded-md'}>
        <h2 className='w-full bg-slate-200 rounded-t font-bold text-xl px-3 py-2'>{props.data.name ? props.data.name : "Unsorted"}</h2>
        {/* <ul className="flex flex-wrap gap-3 justify-items-center"> */}
        <ul className="gap-3 p-3 grid lg:grid-cols-2 xl:grid-cols-3">
          {props.children}
        </ul>
      </div>
    </React.Fragment>
  )
}