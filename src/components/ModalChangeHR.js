import{useEffect, useState,useContext} from 'react';
import { ContextApp } from '../store/ContextApp';

import axios from 'axios';



export default function ModalChangeHR(){

  const {state, dispatch} = useContext(ContextApp);
  const [HR, setHR] = useState('dgrigorev');
  const [users, setUsers] = useState();

  useEffect(()=>{
    axios(`http://10.105.0.8/dg/hh/api/index.php?action=get_users&login=${state.login}&env=${state.env}`)
      .then(function (response) {
          console.log(response);

          // Logout
        if(!response.data.login) {
          dispatch({type:"LOGOUT"});
          return;
        }
        // Меняем местный state
        //dispatch({type: "SET_CANDIDATES", candidates: tempItems});
        setUsers(response.data.users);

      })
      .catch(function (error) {
        console.log(error);
      });

  },[]);

  //console.log("users", users);


  let ids = []; // Айдишники выделеных строк

  state.persons.map( (person)=>{
    if(person.selected) ids.push(person.id);
  });
    if(!ids.length) {
      alert("Контакты не выбраны");
      dispatch({type:"CLOSE_CHANGE_HR"});
      return '';
    }
    //console.log("ids",ids)
    ids = ids.join(',');






      function cancelChangeHR(){
        dispatch({type:"CLOSE_CHANGE_HR"});
      }




      function saveChangeHR(){

          axios(`http://10.105.0.8/dg/hh/api/index.php?action=change_hr&login=${state.login}&env=${state.env}&ids=${ids}&hr=${HR}`)
            .then(function (response) {
                console.log(response);

                // Logout
              if(!response.data.login) {
                dispatch({type:"LOGOUT"});
                return;
              }
              // Меняем местный state
              alert("Успешно переданы");

              //dispatch({type: "SET_CANDIDATES", candidates: tempItems});

            })
            .catch(function (error) {
              console.log(error);
            });

            // обновление таблицы
            axios(`http://10.105.0.8/dg/hh/api/index.php?action=get_persons&login=${state.login}&env=${state.env}`)
              .then(function (response) {
                  console.log(response);

                  // Logout
                if(!response.data.login) {
                  dispatch({type:"LOGOUT"});
                  return;
                }
                dispatch({type:"CLOSE_CHANGE_HR"});
                dispatch({type:"ONLOAD_TABLE", persons: response.data.persons})
                console.log("ONLOAD_TABLE");

              })
              .catch(function (error) {
                console.log(error);
              });


      }


      function handleChange(e){
        setHR(e.target.value)
      }


      const selectHR = users ? <select value={HR} onChange={e=>setHR(e.target.value)}>
                          {users.map( (user, index) =>{
                            return <option index={index} value={user.login}>{user.login}({user.role}) {user.comment}</option>
                          })}

                        </select> : 'Загрузка';


  return <div className='dg-modal'>
    <h3>Передать рекрутеру</h3>

    <div className="dg-modal-body">

      {selectHR}

    </div>

    <div className="dg-modal-btns">
      <div onClick={saveChangeHR} className="btn btn-success">Записать</div>
      <div onClick={cancelChangeHR} className="btn btn-danger">Отменить</div>
    </div>
  </div>
}
