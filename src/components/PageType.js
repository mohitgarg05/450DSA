import React from 'react'
import {useParams , NavLink} from "react-router-dom";
import { db, updateData} from '../storingData'
import { useEffect ,useState , useRef} from "react";
import {useFirstRender} from './FirstRender'


const PageType = () => {
    const firstRender = useFirstRender();
    const pageType = useParams().pagetype;

    const [TypeAllQuestion, setTypeAllQuestion] = useState([])
    const [Doneques, setDoneques] = useState(0);
    const [Started, setStarted] = useState()
    
    useEffect(() => {
        db.collection('450dsaArchive').doc({ topicName : pageType }).get()
        .then(document => {
           setTypeAllQuestion(document.questions)
           setDoneques(document.doneQuestions );
           setStarted(document.started)
           
          
          })
    }, [])

    useEffect(() => {
      if(!firstRender){
      console.log(Doneques);
      const updatedData = {
        doneQuestions :  Doneques,
        started : Started,
        questions : TypeAllQuestion

      }
      updateData(pageType , updatedData);
    }

    }, [Doneques])
    
    
 
    const handlecheck = async (key)=>{
   
      let Allquestions = [];
      TypeAllQuestion.map((item , key2) =>{
        if(key2 === key){
          item.Done = !item.Done;
          if(item.Done){
            
            setDoneques(prev => prev + 1);
          } 
          else{
    
            setDoneques(prev => prev - 1);
          } 
        }
        Allquestions.push(item);
      })

      
      const updatedData = {
        doneQuestions :  0,
        started : Started,
        questions : Allquestions

      }
      updateData(pageType , updatedData);
    }

  return (
    <div>
    <div className=' text-center py-10  '>
      <h1 className='text-5xl' style={{letterSpacing:"5px"}}  >450 DSA Cracker </h1>
      <h3 className='text-3xl mt-2'> <NavLink to='/'><a className=' text-blue-500 '>Topics</a></NavLink>/{pageType}</h3>
    </div>
    <div className='row text-center text-4xl'>
      <h1>Total Questions Done : {Doneques} / {TypeAllQuestion.length}</h1>
    </div>
   
    <div className='table-content'>
      <table >
        <tr className='header' >
          <th style={{width:"30px"}}> </th>
          <th style={{width:"90px" , fontSize:"25px"}} >Q-Id</th>
          <th style={{fontSize:"25px"}} >Questions</th>

        </tr>

        

        {TypeAllQuestion.map((item , key)=>{
          if(!item.Done){
            return(
                <tr className='quesNotDone'>
                    <td ><input type="checkbox"  defaultChecked={false}  onChange={()=>handlecheck(key)}  /></td>
                    <td >{key+1}</td>
                    <td >
                        <a href={item.URL}>{item.Problem}</a>
                    </td>
                </tr>
                
            );
          }
         
    })}
    {TypeAllQuestion.map((item , key)=>{
         
          if(item.Done){
            return(
                <tr className='quesDone'>
                    <td ><input type="checkbox"  defaultChecked={true}  onChange={()=>handlecheck(key)}  /></td>
                    <td >{key+1}</td>
                    <td >
                      <a href={item.URL}>{item.Problem}</a>
                    </td>
                </tr>
                
            );
          }
        
    })}



      </table>
    </div>
    
  </div>
  )
}

export default PageType