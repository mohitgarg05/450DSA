import React,{useState , useEffect} from 'react'
import { NavLink } from "react-router-dom";
import { db, updateData} from '../storingData'
import Progress from '../progressBar/progress'
const Card = (props) => {


const [donePercentage, setdonePercentage] = useState()

useEffect(() => {

  const per = (props.totalDoneQues / props.totalQuestion)*100;
  setdonePercentage(per);

  console.log(donePercentage);
 
}, [])

const handleStarted = (pageType)=>{


  const updatedData = props.questionData.filter(item => item.topicName == pageType)[0];

  if(!updatedData.started){
    updatedData.started = true;
  }
  console.log(updatedData);
  updateData(pageType , updatedData);

  window.location.href = '/'+props.topicName;
}

  return (
      <div  className={`${props.status} commoncss my-6 card col-md-3  mx-14  p-6`} >
      
      <div className='row ' >
        <div className='col-md-7' >
          <h2 >{props.topicName} </h2>
        </div>
        <div className='col-md-5'>
            <button className={props.status?'green-button' : 'blue-button'} onClick={()=>handleStarted(props.topicName)}>{props.status?"Solve Now 🙇🏻‍♂️" : "Start Now"}</button>
        </div>
          
    

      </div>
      
        
          
          <p>Total Questions : {props.totalQuestion}</p>

          {props.status? 
          <>
          <p>{props.totalQuestion - props.totalDoneQues} More to go</p>
          <p className='mt-4'>{donePercentage?.toFixed(0)}% Done </p>
          <Progress done={donePercentage}  />
          </>
          : <>
            <p className='my-10 italic'>Not yet started</p>
          </>
            
            
          }
          
      </div>
  
  )
}

export default Card