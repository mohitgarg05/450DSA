import React from 'react'
import {useEffect,useState} from 'react'
import {db , insertData} from '../storingData'
import Card from './Card'


const MainPage = () => {
    
    const [Array, setArray] = useState([])
   

  useEffect(() => {

  
    db.collection('450dsaArchive').get().then(users => {
        if(users.length!==0){
          setArray([...users])
        }
        else{
          insertData();
          setTimeout(()=>{
            window.location.reload(true);
          })
          
        }
      
    })
    

  }, [])
  return (
    <div className='container'>
        <div className='row text-center'>
          <h1 className='text-center text-6xl'>450 DSA CRACKER</h1>
          <p className='text-2xl'>Your Gateway to crack DSA 🔥</p>
        </div>
        <div className='adjust-height row pt-12 m-auto'>
        {Array.map((item , key)=>{
          return(
            <Card 
              questionData = {Array} 
              topicName = {item.topicName} 
              totalQuestion = {item.questions.length} 
              status = {item.started} 
              totalDoneQues = {item.doneQuestions}
              />
            
           
          )
         
        })}
            
        </div>
      </div>
  )
}

export default MainPage