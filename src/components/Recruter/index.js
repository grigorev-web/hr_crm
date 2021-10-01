import { useState, useEffect, useContext } from "react";
import { ContextApp } from '../../store/ContextApp';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {FaComments} from 'react-icons/fa';


import {is_date} from '../functions/is_date.js';




export default function(){

  const {state,dispatch} = useContext(ContextApp);

  const [items, setItems] = useState(state.persons);
  const [loading, setLoading] = useState('');

  let columns = [
            { id:2,  html_id:"droppable2",  name:"Приглашен"},
            { id:10, html_id:"droppable10", name:"Приглашен подтвердил"},
            { id:11, html_id:"droppable11", name:"Приглашен не подтвердил"},
            { id:12, html_id:"droppable12", name:"Приглашен нет ответа"},
            { id:13, html_id:"droppable13", name:"Приглашен перенесено"},
            { id:14, html_id:"droppable14", name:"Не пришел"},
            { id:15, html_id:"droppable15", name:"Отказ кандидата"},
            { id:16, html_id:"droppable16", name:"Отказ рекрутера"},
            { id:20, html_id:"droppable20", name:"Записан на обучение"},
            { id:23, html_id:"droppable23", name:"Собеседование думает"},
            { id:24, html_id:"droppable24", name:"Обучение не пришел"},
            { id:25, html_id:"droppable25", name:"Обучение не закончил"},
            { id:21, html_id:"dropable_delete", name:"Отказ"},
            { id:30, html_id:"dropable_accept", name:"Принят"},
  ];


  if(state.role === 'operator') return <p>У вас нет доступа</p>;
  // Загрузка при первой отрисовке
  useEffect(()=> loadCandidates('all'), [])





  // Когда перетащили и отпуситили
  function onDragEnd(result){/////////////////////////////////////
    //console.log("result",result);


    // dropped outside the list
    if (!result.destination) {
      return;
    }
    // если перемещение в тот же столбец
    if(result.source.droppableId == result.destination.droppableId) return;











    let resumeID; // ID резюме , который перемещаем
    let newStatus; // статус на который меняем
    let oldStatus ; // старый статус
    let phone;
    // ищем нужный элемент и в нём меняем столбец
    // перебираем все элементы
    const tempItems = state.candidates.map( (item)=>{
      // находим нужный
      if( item.index == result.source.index){

        resumeID = item.id;
        phone = item.phone;


        columns.map((column) =>{ // наоходим newStatus
          if(column.html_id == result.destination.droppableId){
            newStatus = column.id;
          }
          if(column.html_id == result.source.droppableId){ // oldStatus
            oldStatus = column.id;
          }
        });


        // меняем столбец в местном state
        let tempItem = {...item};
        tempItem.column = result.destination.droppableId;
        return tempItem;
      } else return item;
    });






    if(newStatus == 13){

      dispatch({type:"SHOW_MODAL_TIME", id:resumeID, phone: phone, status: '13',oldStatus: oldStatus});
      return ;
    }

    //alert(newStatus);

    let comment = prompt("Введите комментарий (обязательно)");
    if(!comment) {
      alert("Действие отменено");
      return;
    }



    // Смена статуса резюме ajax
      axios(`http://10.105.0.8/dg/hh/api/index.php?action=change_status&login=${state.login}&env=${state.env}&id=${resumeID}&status=${newStatus}&phone=${phone}&comment=${comment}`)
        .then(function (response) {
            console.log(response);

            // Logout
          if(!response.data.login) {
            dispatch({type:"LOGOUT"});
            return;
          }
          // Меняем местный state
          dispatch({type: "SET_CANDIDATES", candidates: tempItems});
        })
        .catch(function (error) {
          console.log(error);
        });

  }// END onDragEnd ///////////////////////////////////////////////






// копипаста из beautiful-drag-n-drop устанавливает css на отпускание
      function getStyle(style, snapshot) {



        if (!snapshot.isDropAnimating) {
          return style;
        }
        const { moveTo, curve, duration } = snapshot.dropAnimation;
        // move to the right spot
        const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
        // add a bit of turn for fun
        const rotate = 'rotate(0.5turn)';

        // patching the existing style
        return {
          ...style,
          transform: `${translate} `,
          // slowing down the drop because we can
          transition: `all ${curve} ${duration + 0.03}s`,
        };
      } // END копипаста /////////////////////////////////////////////////




      // Загружаем кандидатов с сервера
      function loadCandidates(period){
        setLoading('loading');
        axios(`http://10.105.0.8/dg/hh/api/index.php?action=get_candidates&login=${state.login}&env=${state.env}`)
          .then(function (response) {
              console.log(response);
              setLoading('')
              // Logout
            if(!response.data.login) {
              dispatch({type:"LOGOUT"});
              return;
            }

            // Добавляем index равный id , index - это положение в таблице, будет менятся при перемещении
            let candidates = response.data.persons;

            if( period == 'today'){
              candidates = candidates.filter( (person)=>{
                if( person.sobes && is_date(person.sobes, 'today')) return person;
                else return false;
              })
            }


            if( period == 'tomorrow'){
              candidates = candidates.filter( (person)=>{
                if( person.sobes && is_date(person.sobes, 'tomorrow')) return person;
                else return false;
              })
            }
            // elseif period 'all'

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







      function mouseEnterHandler(e,id,phone){/////////////////////////////////////////

        let side = (e.pageX < 1000) ? 'right':'left';
        dispatch({type:"SET_SIDE_INFO_ACTIVE", id:id, side: side})

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




      function mouseLeaveHandler(){///////////////

        dispatch({type:"SET_SIDE_INFO_INACTIVE"})
      }// END mouseLeaveHandler///////////////////










///////////////////////////////////////////////////////////////////////////////////
// загрузка резюме
function handleFile(e,id){




  //dispatch({ type:"SET_RESUME_FILE" , file: e.target.files[0] });

  console.log("resume file", e.target.files[0]);


  // Грузим только PDF
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


      loadCandidates('all');

}// END загрузка резюме //////////////////////////////////////////////////////////////////






  return <div className="app-page">




  <h2>Рекрутер</h2>

  <div className="recruter-links">
    <a className='btn btn-primary' href='#' onClick={() => loadCandidates('all')}>Все</a>
    <a className='btn btn-primary' href='#' onClick={() => loadCandidates('today')}>Сегодня</a>
    <a className='btn btn-primary' href='#' onClick={() => loadCandidates('tomorrow')}>Завтра</a>
  </div>


  <hr/>
  <div className={`drag-table ` + loading}>
  <DragDropContext onDragEnd={onDragEnd}>






      { columns.map((column,index)=>{

        if(column.id == 21
          || column.id == 30
          || column.id == 11
          || column.id == 16) return; // "Отказ" и "Принят"

        return(<div key={index}>
          <p style={{ minHeight:'50px'}}>{column.name}</p>
        <Droppable droppableId={column.html_id}>
      {(provided, snapshot) => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={{ backgroundColor: snapshot.isDraggingOver ? '#e7ffca' : '#f1ffe0',
                 minWidth:'150px',
                 height:'100vh',
                 //border:'1px solid #e2efd3',
                 borderRadius: '10px',
                 margin:'1px',
       }}
      >
        {state.candidates.map((item, index) => {
          if(item.column == column.html_id){

            // если собес сегодня подсветить зеленым
            let sobesColor = ()=>{
                if(item.sobes){

                  if( is_date(item.sobes, 'today')) return 'green';
                  if( is_date(item.sobes, 'tomorrow')) return 'blue';

                  else return 'darkgray';
                  //console.log(item.name, 'sobesDate', sobesDate.toDateString())
                }

              return 'red';
            }


            return <Draggable key={item.index}
                              draggableId={item.index.toString()}
                              index={item.index}
                              >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getStyle(provided.draggableProps.style, snapshot)}
                        >
                          <p><a href={item.resume} target="_blank" style={{color:'black', textDecoration:'none'}}>{item.name}</a></p>
                          <p>{item.phone}</p>
                          <p style={{color: sobesColor()}}>{item.sobes}</p>
                          <p style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{item.file ? <a href={`http://10.105.0.8/dg/hh/api/resume/${item.file}`} target="_blank">резюме</a> : <input type="file" className="form-control" name="upload_file1" onChange={(e) => handleFile(e,item.id)} />}
                            <FaComments style={{width:'20px', height:'20px', color:'darkgray', margin:'0 10px'}}
                              onMouseEnter={ (e)=>mouseEnterHandler(e,item.id,item.phone)}
                              onMouseLeave={ ()=>mouseLeaveHandler()}
                            />
                          </p>
                          <p className='hr-badge'>{state.role === 'admin' ? item.hr: ''}</p>


                        </div>
                      )}
                    </Draggable>
          }

        })}
        {provided.placeholder}
      </div>
      )}
      </Droppable>

      {(column.id === 10) ?
      <Droppable droppableId="droppable11">
      {(provided, snapshot) => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={{ //backgroundColor: snapshot.isDraggingOver ? '#e1fcff' : 'pink',
                 /* backgroundColor: 'pink', */
                 margin: '1px',
                 borderRadius: '10px',
                 //padding: '10px',

                 opacity: snapshot.isDraggingOver ? '1' : '0.5',
                 minWidth:'150px',
                 height:'50vh',
       }}
      >
        <p>Приглашен не подтвердил</p>
        {provided.placeholder}
      </div>
      )}
      </Droppable> : ''}

      {(column.id === 15) ?
      <Droppable droppableId="droppable16">
      {(provided, snapshot) => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={{ //backgroundColor: snapshot.isDraggingOver ? '#e1fcff' : 'pink',
                 /* backgroundColor: 'pink', */
                 margin: '1px',
                 borderRadius: '10px',
                 //padding: '10px',

                 opacity: snapshot.isDraggingOver ? '1' : '0.5',
                 minWidth:'150px',
                 height:'50vh',
       }}
      >
        <p>Отказ рекрутера</p>
        {provided.placeholder}
      </div>
      )}
      </Droppable> : ''}




      </div>








    )
      })}

      <div>
      <p style={{ minHeight:'50px'}}></p>
      <Droppable droppableId="dropable_delete">
      {(provided, snapshot) => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={{ //backgroundColor: snapshot.isDraggingOver ? '#e1fcff' : 'pink',
                 backgroundColor: 'pink',
                 margin: '1px',
                 borderRadius: '10px',
                 //padding: '10px',

                 opacity: snapshot.isDraggingOver ? '1' : '0.5',
                 minWidth:'150px',
                 height:'50vh',
       }}
      >
        <p>Отказ</p>
        {provided.placeholder}
      </div>
      )}
      </Droppable>


      <Droppable droppableId="dropable_accept">
      {(provided, snapshot) => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={{ backgroundColor: '#90ff90',
                 opacity: snapshot.isDraggingOver ? '1' : '0.5',
                 margin: '1px',
                 borderRadius: '10px',
                 //padding: '10px',
                 minWidth:'150px',
                 height:'50vh',
       }}
      >
        <p>Принят</p>
        {provided.placeholder}
      </div>
      )}
      </Droppable>


      </div>

  </DragDropContext>
  </div>
  </div>
}
