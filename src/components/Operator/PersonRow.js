import axios from "axios";
import {useContext} from "react";
import { ContextApp } from '../../store/ContextApp';
import {FaCheck, FaArrowCircleRight} from 'react-icons/fa';
import {statusNames} from '../statusNames';
import StatusChangeIcons from './StatusChangeIcons';



export default function(props){

  const {state,dispatch} = useContext(ContextApp);


  //console.log("person",person);
  let person = props.person;
  let index = props.index;
  if(!person) return;



  function mouseEnterHandler(id,phone){/////////////////////////////////////////

    dispatch({type:"SET_SIDE_INFO_ACTIVE",id:id, side:'right'})

    clearTimeout(state.sideInfo.timer);


    dispatch({type:"SET_SIDE_INFO_LOADING",loading:true})


    let timer = setTimeout(function(){
        console.log("timeout")

        dispatch({type:"SET_SIDE_INFO_LOADING",loading:false})
        axios(`http://10.105.0.8/dg/hh/api/?action=get_history&phone=${phone}&login=${state.login}&env=${state.env}`)
          .then(function (response) {


            // Logout
          if(!response.data.login) {
            alert('Вы не авторизованы')
            dispatch({type:"LOGOUT"});
            return;
          }

            //console.log("response","type of history", Array.isArray(response.data.history), response);
            dispatch({type:"SIDE_INFO_SET_HISTORY", history: response.data.history })
          })
      },1000)

        dispatch({type:"SET_SIDE_INFO_TIMER",timer:timer})
    }// END mouseEnterHandler////////////////////////////////////////////////////


  function onClickSelect(selected,id){////////////////////////////////////////////////
      //console.log("onClickSelect", id);
      dispatch({type:"SET_SELECTED_PERSON",selected:selected,id:id})
  } // END onClickSelect ////////////////////////////////////////////////////




  function mouseLeaveHandler(){///////////////

    dispatch({type:"SET_SIDE_INFO_INACTIVE"})
  }// END mouseLeaveHandler///////////////////





  function handleFile(e,id){
    //dispatch({ type:"SET_RESUME_FILE" , file: e.target.files[0] });

    console.log("resume file", e.target.files[0]);


    if( e.target.files[0].type !== "application/pdf"){
      alert("Ошибка: Загризите PDF");
      return;
    }

    const data = new FormData();
    data.append('file1', e.target.files[0]);

    let url = `http://10.105.0.8/dg/hh/api/index.php?action=set_resume_file&login=${state.login}&env=${state.env}&id=${id}`;

    axios.post(url, data, { // receive two parameter endpoint url ,form data
    })
        .then(res => { // then print response status
            console.warn(res);
            console.log(res.data);
            alert("Файл загружен");
        })


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





  }






  // раскрасим таблицу
  let personStatusClass;
  //console.log("person.status123", person.status);
  switch (person.status) {
    case "": personStatusClass = ""; break;             // Новый , нет звонков
    case "0": personStatusClass = ""; break;              // нет звонков
    case "1": personStatusClass = "table-primary"; break; // Перезвонить
    case "2": personStatusClass = "table-success"; break; // приглашен на собеседование
    case "3": personStatusClass = "table-danger"; break;  // отказался
    //case 3: personStatusClass = "table-danger"; break;  // отказался
    case "4": personStatusClass = ""; break;
    default: personStatusClass = "table-secondary";

  }

  personStatusClass += " " + person.status;

  if(person.selected) personStatusClass += " selected";



  return (
  <tr style={{letterSpacing:'-0.6px'}}
    className={personStatusClass}
    key={index}

    onClick={ ()=>onClickSelect(person.selected,person.id) }
    >
    <td
    onMouseEnter={ ()=>mouseEnterHandler(person.id,person.phone)}
    onMouseLeave={ ()=>mouseLeaveHandler()}
    >{person.selected ? <FaCheck style={{color:'#54e6a2',width:20,height:20}} /> : ''} {person.id}</td>
    <td title={person.date}
    onMouseEnter={ ()=>mouseEnterHandler(person.id,person.phone)}
    onMouseLeave={ ()=>mouseLeaveHandler()}
    ><a href={person.resume} target="_blank">{person.name}</a></td>
    <td>{person.phone}</td>
    {/*<td style={{fontSize:'14px',color:'darkgray'}}>{person.date}</td> */}
    <td style={{fontSize:'14px'}}>{person.city}</td>
    <td style={{fontSize:'14px'}}>{person.comment}</td>
    <td style={{fontSize:'14px'}}>{person.file ? <a href={`http://10.105.0.8/dg/hh/api/resume/${person.file}`} target="_blank">резюме</a> : <input type="file" className="form-control" name="upload_file1" onChange={(e) => handleFile(e,person.id)} />}</td>
    <td>{person.selected ? <StatusChangeIcons id={person.id} phone={person.phone}/> :statusNames[person.status]}</td>
    <td>{person.hr}</td>
  </tr>
)
}
