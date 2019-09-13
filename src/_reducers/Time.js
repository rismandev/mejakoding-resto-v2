const initialState = {
  time: null,
  timer : 0,
  data:'00:00:00'
}

converToTime = (prev_second) => {
  newDate = new Date(prev_second * 1000);
  hours = newDate.getUTCHours();
  minutes = newDate.getUTCMinutes();
  seconds = newDate.getSeconds();

  data = hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');
  return data
}

export default Time = (state = initialState, action) => {

  switch(action.type) {

    case 'SET_INTERVAL_TIME':
      return {...state, time: action.payload}
      break
    case 'SET_COUNTER_TIME':
      return {...state, timer: action.payload, data: converToTime(action.payload)}
      break
    case 'RESET_INTERVAL_TIME':
      return {...state, time: '', timer: 0}
      break
    default:
      return state
  }

}
