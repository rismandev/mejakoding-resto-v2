export const setIntervalTime = (time) => {

  return {
    type: 'SET_INTERVAL_TIME',
    payload: time
  }

}

export const setCounter = (counter) => {

  return {
    type: 'SET_COUNTER_TIME',
    payload: counter + 1
  }

}

export const resetInterval = () => {

  return {
    type: 'RESET_INTERVAL_TIME'
  }

}
