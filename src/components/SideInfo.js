import {useContext} from 'react';
import {ContextApp} from '../store/ContextApp'

export default function SideInfo(props){

  const {state,dispatch} = useContext(ContextApp);


  let statuses = {
    0 : "новый (нет звонков)",
    1 : "перезвонить",
    2 : "приглашен",
    3 : "отказался при первом звонке",
    4 : "Нет ответа",
    5 : "связь прервалась",
    6 : "бросил трубку",
    7 : "отказ оператора",
    10 : "приглашен подтвердил",
    11 : "приглашен отказался",
    12 : "приглашен нет ответа",
    13 : "приглашен перенесено",
    15 : "собеседование пройдено",
    16 : "собеседование не пройдено",
    20 : "собес записан на обучение",
    21 : "собес отказ кандидата",
    22 : "собес отказ рекрутера",
    23 : "собес думает",
    24 : "обучение не пришел",
    25 : "обучение не закончил",
    26 : "обучение отказ после",
    30 : "принят на работу",
    31 : "уволен",
    40 : "черный список",
  }

  let formFields = {
    38 : "Оператор",
    13 : "В какой части города",
    2  : "Вы еще в поиске?",
    23 : "Интересно?",
    30 : "Результат",
    28 : "Дозвон",
    21 : "Нет - по какой причине",
    15 : "Куда",
    62 : "Комментарий",
    51 : "Собеседование",
    201: "Новый статус",
  }

  //console.log("state.sideInfoHistory", state.sideInfo.history);

  let htmlHistory = state.sideInfo.history.map( (entry,index) =>{

    if(entry[0].form_id == 112 || entry[0].form_id == 113){ // форма заполненная опреатором
    let callDate = entry[0].date;
    let titleRecord = entry[0].form_id == 112 ? "Звонок": "Смена статуса";

      return <div key={index}>
              <p style={{lineHeight:'0.5'}} className="text-danger">{titleRecord} {callDate  }</p>
              <table style={{lineHeight:'0.5'}} className="sideinfo-history table table-striped table-bordered w-100 mt-2">
                      <tbody>
                        {entry.map(
                          (ent,i)=>{
                            if(ent.field_id == 39) return; // пропускаем номер телефона
                            if(ent.field_id == 40) return; // пропускаем Имя
                            //if(ent.field_id == 51) return; // пропускаем Дату
                            if(ent.field_id == 7) return; // удобно ли разговаривать
                            if(ent.field_id == 4) return; // расскажу предложение

                            // field "Новый статус"
                            if(ent.field_id == 201) return(<tr key={i} >
                                      <td className="w-25">{formFields[ent.field_id]}</td>
                                      <td>{statuses[ent.value]}</td>
                            </tr>)

                            return (<tr key={i} >
                                      <td className="w-25">{formFields[ent.field_id]}</td>
                                      <td>{ent.value}</td>
                            </tr>)
                          })
                        }
                      </tbody>
                </table>
            </div>
    }
    // if entry[0].form_id == 100000 // моя кастом запись
  })

  //console.log("history",state.sideInfo.history)

  htmlHistory = state.sideInfo.loading ? "Загрузка..." : htmlHistory;
  return <div
            className={state.sideInfo.side}
            id="side-info"
            >{htmlHistory}


         </div>
}
