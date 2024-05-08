import React, {useRef, useState, useEffect} from 'react';
import { useDroppable } from '@dnd-kit/core';
import authFetch from '../helpers/axios';
import { Button } from './Button';
import { ClipLoader } from 'react-spinners';

const InlineEditWrapper = (props) => {
  const {value, setValue, isEditing, setIsEditing, className, request, children} = props;
  const inputRef = useRef(null);
  const onChange = (event) => setValue(event.target.value);

  const handleFinish = (event) => {
    event.target.blur();
    setIsEditing(false);
    request(value);
  }

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      handleFinish(event)
    }
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing, inputRef])

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        className={`${className} px-2 py-px`}
        aria-label='Edit group name'
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={handleFinish}
      />
    )
  } else {
    return children
  }
  
}

export const Group = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.data.name ? props.data.name : null);
  const [isLoading, setIsLoading] = useState(false);

  const {isOver, setNodeRef} = useDroppable({
    id: props.data.id,
    data: props.data
  });

  const style = {
    opacity: isOver || !props.isDragging ? 1 : 0.3
  }

  const editGroupRequest = async (groupName) => {
    await authFetch.post(
      `usergroups/${props.data.id}/update/`, 
      JSON.stringify({
        "name": groupName
      })
    )
    .catch((err) => {
      console.log(err.message)
    });
  }

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleWaterAllClick = async () => {
    setIsLoading(true);
    await props.onWaterClick(props.data.plants.map(plant => plant.id))
    setIsLoading(false)
  }

  return (
    <React.Fragment key={props.data.id}>
      <div ref={setNodeRef} className={`w-full sm:w-full mx-auto min-h-24 bg-slate-300 ${isOver || !props.isDragging ? 'bg-opacity-70' : 'bg-opacity-35 border-opacity-30'} border-slate-200 border-2 rounded-md`}>
        <div style={style} className='flex items-center justify-between gap-2 w-full bg-slate-200 rounded-t px-3 py-2'>
          <InlineEditWrapper 
            value={value}
            setValue={setValue} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing}
            request={editGroupRequest}
            className='text-xl rounded'
          >
              <h2 className='font-bold text-xl'>
                <button onClick={handleClick} className='w-fit h-fit rounded-full px-3 py-px hover:bg-slate-100 focus:bg-slate-100 hover:cursor-pointer' title="Click to edit">
                  {value ? value : "Unsorted"}
                </button>
              </h2>
          </InlineEditWrapper>
          <ClipLoader loading={isLoading} size='1.2em' className='ml-auto' color='#2563eb'/>
          {props.data.plants.length > 0 && <Button variant='square' onClick={handleWaterAllClick}>Water All</Button>}
        </div>
        <ul className="gap-3 p-3 grid lg:grid-cols-2 xl:grid-cols-3">
          {props.children}
        </ul>
      </div>
    </React.Fragment>
  )
}