import {useState,useContext} from 'react';
import { ContextApp } from '../../store/ContextApp';
import VerticalBar from "./VerticalBar";
import axios from 'axios';



export default function(props) {

  const [mainReport, setMainReport] = useState([]);
  const [loading, setLoading] = useState('');
  const [dateTitle, setDateTitle] = useState('Выберите дату');
  const {state, dispatch} = useContext(ContextApp);


  function doReport(period){
    //alert("do report");
    setLoading('loading');

    axios(`http://10.105.0.8/dg/hh/api/index.php?action=get_report&report=main&login=${state.login}&env=${state.env}&period=${period}`)
      .then(function (response) {
          setLoading('');
          console.log(response);

          // Logout
        if(!response.data.login) {
          dispatch({type:"LOGOUT"});
          return;
        }

        setDateTitle(response.data.report.total.date1+"---"+response.data.report.total.date2);
        if(response.data.report.total.news == 0){
          alert('Нет данных за этот период');
          return;
        }
        setMainReport(response.data.report);

      })
      .catch(function (error) {
        console.log(error);
      });


  }

  return <div className={`container mt-5 ${loading}`}>
  <h4>{dateTitle}</h4>
  <div className='report-btns'>

    <div onClick={()=>doReport('week')} className="btn btn-primary">Эта неделя</div>
    <div onClick={()=>doReport('last-week')} className="btn btn-primary">За неделю</div>
    <div onClick={()=>doReport('month')} className="btn btn-primary">Этот месяц</div>
    <div onClick={()=>doReport('last-month')} className="btn btn-primary">За месяц</div>
    <div onClick={()=>doReport('yesterday')} className="btn btn-secondary">Вчера</div>
    <div onClick={()=>doReport('today')} className="btn btn-success">Сегодня</div>
    <div onClick={()=>doReport('year')} className="btn btn-primary">За год</div>
  </div>
  <VerticalBar report={mainReport} />
  </div>
}
