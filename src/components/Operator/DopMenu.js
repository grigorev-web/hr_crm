
import {useContext} from 'react';
import {ContextApp} from '../../store/ContextApp';
import axios from 'axios';


export default function(){

  const {state, dispatch} = useContext(ContextApp);

  let count = state.persons.filter((p)=>p.selected);
  //console.log("count",count)




////////////////////////////////////////////////////////////////////////////////
  // Загрузить для обзвона
  function uploadToCall(){
    console.log("date0", new Date());

    let ids = []; // Айдишники выделеных строк

    state.persons.map( (person)=>{
      if(person.selected) ids.push(person.id);
    });
      if(!ids.length) { alert("Контакты не выбраны"); return;}
      //console.log("ids",ids)
      ids = ids.join(',');

      console.log("date before axios", new Date());
      axios(`http://10.105.0.8/dg/hh/api/?action=upload_to_call&ids=${ids}&login=${state.login}&env=${state.env}`)
        .then(function (response) {

          // Logout
        if(!response.data.login) {
          dispatch({type:"LOGOUT"});
          return;
        }


          dispatch({type:"CLEAR_SELECTED_PERSONS"})
          //console.log("ONLOAD_TABLE");
          if(response.data.success) alert("Контакты успешно загружены!")
        })
        .catch(function (error) {
          console.log(error);
        });

  }// END Загрузить для обзвона /////////////////////////////////////////////////


  function removeSelectedResume(){
    let ids = []; // Айдишники выделеных строк

    state.persons.map( (person)=>{
      if(person.selected) ids.push(person.id);
    });

    if(!ids.length) { alert("Контакты не выбраны"); return;}
      //console.log("ids",ids)
      ids = ids.join(',');



      axios(`http://10.105.0.8/dg/hh/api/?action=delete_resume&ids=${ids}&login=${state.login}&env=${state.env}`)
        .then(function (response) {


          // Logout
        if(!response.data.login) {
          alert('Вы не авторизованы')
          dispatch({type:"LOGOUT"});
          return;
        }



          dispatch({type:"CLEAR_SELECTED_PERSONS"})
          //console.log("ONLOAD_TABLE");
          if(response.data.success) alert("Контакты успешно удалены!")

          dispatch({type:"ONLOAD_TABLE",persons:state.persons.filter( (person)=>{
            return !ids.includes(person.id)
          })});
        })
        .catch(function (error) {
          console.log(error);
        });

  }

  function sendToRecruter(){
    dispatch({ type:"SHOW_CHANGE_HR" });
  }
  function sendToOperator(){
    let ids = []; // Айдишники выделеных строк

    state.persons.map( (person)=>{
      if(person.selected) ids.push(person.id);
    });

    if(!ids.length) { alert("Контакты не выбраны"); return;}
      //console.log("ids",ids)
      ids = ids.join(',');




      axios(`http://10.105.0.8/dg/hh/api/?action=change_hr&ids=${ids}&login=${state.login}&env=${state.env}&hr=operator`)
        .then(function (response) {
            console.log('change_hr result', response);

          // Logout
        if(!response.data.login) {
          alert('Вы не авторизованы')
          dispatch({type:"LOGOUT"});
          return;
        }



          dispatch({type:"CLEAR_SELECTED_PERSONS"})
          //console.log("ONLOAD_TABLE");
          if(response.data.success) alert("Контакты переданы оператору!")

          // получаем снова список persons и обновляем state

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






        })
        .catch(function (error) {
          console.log(error);
        });










  }



  return <div id="dop-menu">
    {( state.role === "admin" || state.role === "operator") ? <div className={`btn btn-success m-2 ${count.length ? "active" : ""}`}
         onClick={()=>uploadToCall()}
    >Загрузить в обзвон</div> : ''}
    <a href="#"
       className={`m-2 text-danger ${count.length ? "active" : ""}`}
       onClick={ ()=>removeSelectedResume() }>Удалить выбранные</a>

    { ( state.role === "admin" || state.role === "operator") ? <a href="#"
    className={`m-2 text-primary ${count.length ? "active" : ""}`}
    onClick={ ()=>sendToRecruter() }>Передать HR</a> :
    <a href="#"
        className={`m-2 text-primary ${count.length ? "active" : ""}`}
        onClick={ ()=>sendToOperator() }>Передать оператору</a>}

    <a href="http://10.105.0.8/dg/hh/download.php" className="m-2">Скачать результаты</a>
    <a href={`http://10.105.0.8/dg/hh/upload.php?hr=${state.login}`} target="_blank"><div className="btn btn-info btn-sm text-white m-2">Загрузить контакты</div></a>
    <a href="http://10.105.0.8/dg/hh/add_contact.php" target="_blank"><div className="btn btn-info btn-sm text-white m-2">Добавить контакт</div></a>
    </div>
}
