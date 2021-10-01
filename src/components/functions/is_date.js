

// Функция вычисляет date это сегодня или завтра ,возвращает true или false



export function is_date(date, needDate){


  if (date == 'NULL') return false;
  
  let sobes = date;
  let year = sobes.split('/')[2].split(' ').[0];
  let month = sobes.split('/').[1] -1;
  let day = sobes.split('/').[0];
  let hours = sobes.split('/').[2].split(' ').[1].split(':')[0];

  let sobesDate = new Date(year, month, day, hours);

  switch (needDate) {
    case 'today':
      let now = new Date();
      //let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      if(now.toDateString() === sobesDate.toDateString()) return true;
      //if(tomorrow.toDateString() == sobesDate.toDateString()) return 'blue';
      else return false;
      break;
    case 'tomorrow':

      let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      if(tomorrow.toDateString() == sobesDate.toDateString()) return true;
      else return false;
      break;
    default: return false;

  }
}
