
import { useState, useContext } from "react";
import { ContextApp } from '../store/ContextApp';
import axios from 'axios';

export default function Modal(){

  const {state,dispatch} = useContext(ContextApp);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comment, setComment] = useState('');




  function saveInterviewDateTime(){

    if(!date) {alert("Введите дату"); return;}  //2021-09-20
    if(!time) {alert("Введите время"); return;} // 11:43
    if(!comment) {alert("Введите комментарий"); return;}

    let year = date.split('-')[0];
    let month = date.split('-')[1];
    let day = date.split('-')[2];

    let dateTimeStr = `${day}/${month}/${year} ${time}`;

    //alert(dateTimeStr);
    //alert("запись");
    //return;
    // 23/09/2021 15:30

    axios(`http://10.105.0.8/dg/hh/api/index.php?action=change_status&login=${state.login}&env=${state.env}&id=${state.modalTimeID}&status=${state.modalStatus}&phone=${state.modalTimePhone}&comment=${comment}&date=${dateTimeStr}`)
      .then(function (response) {
          console.log(response);

          // Logout
        if(!response.data.login) {
          dispatch({type:"LOGOUT"});
          return;
        }

        if( state.modalStatus == 2)
        dispatch({type:"ONLOAD_TABLE", persons: state.persons.map( person=>{
          if(person.id == state.modalTimeID) person.status = "2";
          return person;
        })});

        if( state.modalStatus == 13){ // переключение на 13 статус возвможно только со страницы Рекрутер

          axios(`http://10.105.0.8/dg/hh/api/index.php?action=get_candidates&login=${state.login}&env=${state.env}`)
            .then(function (response) {
                console.log(response);

                // Logout
              if(!response.data.login) {
                dispatch({type:"LOGOUT"});
                return;
              }

              // Добавляем index равный id , index - это положение в таблице, будет менятся при перемещении
              let candidates = response.data.persons;



              dispatch({type:"SET_CANDIDATES", candidates: candidates.map( (person)=>{
                person.index = person.id;
                person.column = "droppable" + person.status; // столбец - статус
                return person;
              })
             });
            //  console.log("candidates", response.data.persons)
            })
            .catch(function (error) {
              console.log(error);
            });


        }


        dispatch({type:"HIDE_MODAL_TIME"});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function cancelInterview(){
    dispatch({type:"HIDE_MODAL_TIME"})
  }








  return <div className='dg-modal'>
    <h3>Введите дату собеседования</h3>

    <div className="dg-modal-body">
      <div>
        <p>Дата:</p>
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
      </div>
      <div>
        <p>Время:</p>
        <input type="time" value={time} onChange={(e)=>setTime(e.target.value)}/>
      </div>



    </div>
    <div className="dg-modal-textarea">
      <p>Введите комментарий</p>
      <input type="textarea" value={comment} onChange={(e) => setComment(e.target.value)}/>
    </div>
    <div className="dg-modal-btns">
      <div onClick={saveInterviewDateTime} className="btn btn-success">Записать</div>
      <div onClick={cancelInterview} className="btn btn-danger">Отменить</div>
    </div>
  </div>
}
