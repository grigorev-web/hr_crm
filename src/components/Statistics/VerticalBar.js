import React from 'react';
import { Bar } from 'react-chartjs-2';


const VerticalBar = ({report}) => {

  // Добавлено
  const data1 = ()=>{
    let labels = [];
    let numbers = [];

    for( let key in report){
      labels.push(key);
      numbers.push(report[key].news);
    }


    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Добавлено',
          data: numbers,
          backgroundColor: ['azure'],
          borderColor: ['black'],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }// END Добавлено


  // Звонков
  const data2 = ()=>{
    let labels = [];
    let numbers = [];

    for( let key in report){
      labels.push(key);
      numbers.push(report[key].calls);
    }


    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Звонков',
          data: numbers,
          backgroundColor: ['#0000ff33'],
          borderColor: ['black'],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }// END Звонков


  // Приглашено
  const data3 = ()=>{
    let labels = [];
    let numbers = [];

    for( let key in report){
      labels.push(key);
      numbers.push(report[key].invite);
    }


    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Приглашены',
          data: numbers,
          backgroundColor: ['green'],
          borderColor: ['black'],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }// END Приглашено


  // Дошедшие на собеседование
  const data4 = ()=>{
    let labels = [];
    let numbers = [];

    for( let key in report){
      labels.push(key);
      numbers.push(report[key].interview);
    }


    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Дошедшие на собеседование',
          data: numbers,
          backgroundColor: ['darkgray'],
          borderColor: ['black'],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }// END Дошедшие на собеседование





  // Дошедшие на обучение
  const data5 = ()=>{
    let labels = [];
    let numbers = [];

    for( let key in report){
      labels.push(key);
      numbers.push(report[key].learning);
    }


    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Дошедшие на обучение',
          data: numbers,
          backgroundColor: ['pink'],
          borderColor: ['black'],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }// END Дошедшие на обучение




  // Принятые на работу
  const data6 = ()=>{
    let labels = [];
    let numbers = [];

    for( let key in report){
      labels.push(key);
      numbers.push(report[key].job);
    }


    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Принятые на работу',
          data: numbers,
          backgroundColor: ['darkgreen'],
          borderColor: ['black'],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }// END Принятые на работу





  // for example
  let labels = [];
  let numbers = [];
  for( let key in report){
    labels.push( key +' Добавлено')
    labels.push(key +' Звонков')
    labels.push(key +' Приглашено')
    labels.push(' ')

    numbers.push(report[key].news)
    numbers.push(report[key].calls)
    numbers.push(report[key].invite)
    numbers.push(0)
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Основной',
        data: numbers,
        backgroundColor: [
          'darkgray',
          'rgba(54, 162, 235, 0.2)',
          'rgba(209, 231, 221, 0.9)',
          'rgba(75, 192, 192, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(209, 231, 221,1)',
          'rgba(75, 192, 192, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis:'y',
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };









  return <>
  <h2>Кол-во отобранных резюме</h2>
  <Bar type='horizontalBar' data={data1} options={options} />
  <h2>Кол-во сделанных звонков</h2>
  <Bar type='horizontalBar' data={data2} options={options} />
  <h2>Кол-во назначенных собеседований</h2>
  <Bar type='horizontalBar' data={data3} options={options} />
  <h2>Дошедшие на собеседование</h2>
  <Bar type='horizontalBar' data={data4} options={options} />
  <h2>Дошедшие на обучение</h2>
  <Bar type='horizontalBar' data={data5} options={options} />
  <h2>Приняты на работу</h2>
  <Bar type='horizontalBar' data={data6} options={options} />
  </>
}



export default VerticalBar;
