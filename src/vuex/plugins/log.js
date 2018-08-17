const myLog = store => {
  store.subscribe((mutation,state) => {
    console.log(mutation , state)
  })
}

export default myLog