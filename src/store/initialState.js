import { persons } from "./persons";

// для development всегда авторизован
let login = process.env.NODE_ENV === "development" ? "dgrigorev" : false;

export const initialState = {
  login: login,// авторизованный пользователь | "dgrigorev", false - по умолчанию
  role: '',
  sideMenu: {   // меню слева с кнопочками "оператор" , "рекрутер" и т.д.
    active: false
  },
  appShadow: false, // затемнение экрана
  persons: persons, // все резюме из базы (подгружаются во время прокрутки)
  coldCalling: [],  // массив номеров для холодного обзвона
  history:{         // история звонков по id записи
    id:0,
    records:[]
  },
  sideInfo:{        // на странице Оператор меню справа с историей звонков
    active: false,
    id:0,
    loading:false,
    timer:0,        // при наведении ждет 1 сек , делает запрос если наведение осталось
    history:[],
    side:'',
  },
  env:process.env.NODE_ENV,  // "development","production"
  modalTime: false,     // модальное окно выбора времени собеседования
  modalTimeID: 0,
  modalTimePhone: 0,
  modalStatus: 0,
  modalOldStatus:0,

  candidates:[],
  modalChangeHR:{
    show: false,
  },
  //resumeFile:"",
};
