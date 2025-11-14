import React, { useState } from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './AiOutputDialog';
function RoomDesignCard({room}) {
    const [openDialog,setOpenDialog]=useState(false);
    const onClickHandler=()=>{
        setOpenDialog(true);
    }
  return (
    <div className='shadow-md rounded-md cursor-pointer' onClick={()=>onClickHandler()}>
        <ReactBeforeSliderComponent
          firstImage={{
            imageUrl:room?.aiImage
          }}
          secondImage={{
            imageUrl:room?.orgImage
          }}
        />
        <div className='p-4'>
            <h2>RoomType: {room.RoomType}</h2>
            <h2>DesignType: {room.DesignType}</h2>
        </div>

        <AiOutputDialog open={openDialog} setOpen={setOpenDialog} room={room}/>
    </div>
  )
}

export default RoomDesignCard