import { useEffect, useContext, useState } from "react";
import { ContextApp } from '../../store/ContextApp';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import DopMenu from "./DopMenu";
import PersonRow from "./PersonRow";



export default function(props) {

  const {state, dispatch} = useContext(ContextApp);
  const [modal, setModal] = useState(false);

  // Загрузка при первой отрисовке
  useEffect(()=>{
    axios(`http://10.105.0.8/dg/hh/api/index.php?action=get_persons&login=${state.login}&env=${state.env}`)
      .then(function (response) {
          console.log(response);

          // Logout
        if(!response.data.login) {
          dispatch({type:"LOGOUT"});
          return;
        }

        dispatch({type:"ONLOAD_TABLE", persons: response.data.persons})
        console.log("ONLOAD_TABLE");
      })
      .catch(function (error) {
        console.log(error);
      });


    },[]) ////////////////////////////////////////////////


    // InfiniteScroll подгрузка
    function asyncFetchMorePersons(){

      if(!state.persons[state.persons.length -1]) return;

      let last_id = state.persons[state.persons.length -1].id;
      axios(`http://10.105.0.8/dg/hh/api/?action=get_more_persons&last_id=${last_id}&login=${state.login}&env=${state.env}`)
        .then(function (response) {

          // Logout
        if(!response.data.login) {
          dispatch({type:"LOGOUT"});
          return;
        }

          dispatch({type:"FETCH_MORE_PERSONS",persons: response.data.persons})
        })
    } //////////////////////////////////////////////////////

  return (
    <div className="app-page">
    <h2>Оператор</h2>
    <hr/>
    <InfiniteScroll
      dataLength={state.persons}
      next={asyncFetchMorePersons}
      hasMore={true}
      loader={<h4></h4>}
    >

      <table className="table table-hover table-persons">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Телефон</th>
            {/*<th scope="col">Дата</th>*/}
            <th scope="col">Город</th>
            <th scope="col">Комментарий</th>
            <th scope="col">Резюме</th>
            <th scope="col">Статус</th>
            <th scope="col">HR</th>
          </tr>
        </thead>
        <tbody>

          {state.persons.length ? state.persons.map((person,index) => <PersonRow person={person} index={index}/>)  : <p>Нет записей</p>}

        </tbody>
      </table>
      </InfiniteScroll>


      <DopMenu />


    </div>
  );
}
