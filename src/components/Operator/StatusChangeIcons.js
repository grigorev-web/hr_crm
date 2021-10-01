import {FaPhoneSquare,
        FaUserPlus,
        FaUserTimes,
        FaPhone,
        FaTty,
        FaWheelchair,
        FaTimes} from 'react-icons/fa';
import axios from "axios";
import { ContextApp } from '../../store/ContextApp';
import {useContext, useState} from 'react';



export default function StatusChangeIcons(props){

  const {state, dispatch} = useContext(ContextApp);


  function changeStatus(status){

    if(status == 2){
      dispatch({type:"SHOW_MODAL_TIME", id:props.id, phone: props.phone, status: '2'});
      return;
    }
    axios(`http://10.105.0.8/dg/hh/api/index.php?action=change_status&login=${state.login}&env=${state.env}&id=${props.id}&status=${status}&phone=${props.phone}&comment=оператор`)
      .then(function (response) {
          console.log(response);

          // Logout
        if(!response.data.login) {
          dispatch({type:"LOGOUT"});
          return;
        }
        dispatch({type:"ONLOAD_TABLE", persons: state.persons.map( person=>{
          if(person.id == props.id) person.status = status.toString();
          return person;
        })})
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  return <div className="status-change-icons">
  <FaPhoneSquare onClick={()=>changeStatus(1)} title="Перезвонить"  style={{color: 'darkblue'}}/>
  <FaUserPlus onClick={()=>changeStatus(2)} title="Приглашен"  style={{color: 'green'}}/>
  <FaUserTimes onClick={()=>changeStatus(3)} title="Отказался"  style={{color: '#a73c5f'}}/>
  <FaPhone onClick={()=>changeStatus(4)} title="Нет ответа"  />
  <FaTty onClick={()=>changeStatus(5)} title="Связь прервалась"  />
  <FaWheelchair onClick={()=>changeStatus(6)} title="Бросил трубку"  />
  <FaTimes onClick={()=>changeStatus(7)} title="Отказ оператора"  />

  </div>

}
