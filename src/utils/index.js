export function getBoards(){
  const boards =  [
    {
      id:1,
      title:"Platform Launch",
      tasks:[
        {
          id:1,
          title:"Markete Git",
          status:"Todo"
        },
        {
          id:2,
          title:"Ekmek Al",
          status:"Todo"
        },
        {
          id:3,
          title:"Domates Al",
          status:"Done"
        },           
        {
          id:4,
          title:"Biber Al",
          status:"Done"
        },
        {
          id:5,
          title:"123",
          status:"Done"
        },
        {
          id:6,
          title:"3456",
          status:"Todo"
        },
        {
          id:7,
          title:"trade some btc",
          status:"Doing"
        },
        {
          id:8,
          title:"complete last project",
          status:"Doing"
        },
        {
          id:9,
          title:"learn vue",
          status:"Doing"
        }
      ]
    },
    {
      id:2,
      title:"Marketing Plan",
      tasks:[
        {
          id:1,
          title:"Markete Git",
          status:"Doing"
        },
        {
          id:2,
          title:"Ekmek Al",
          status:"Doing"
        },
        {
          id:3,
          title:"Domates Al",
          status:"Doing"
        },           
        {
          id:4,
          title:"Biber Al",
          status:"Todo"
        },
        {
          id:4,
          title:"Karpuz Al",
          status:"Done"
        }
      ]
    }
  ]

  return boards
}

export function getUniqueStatus(tasks, filterBy = ( task ) => task.status){
  const taskStatus = tasks.map((task) => filterBy(task))
  const uniqueStatus = [...new Set(taskStatus)]
  return uniqueStatus

  // tasks.reduce((uniqueTasks, task) => {
  //   if(taskList.includes(task.status)) return
  //   taskList.push(task.status)
  //   const newStatus = {
  //     name: task.status,
  //     color: colors.pop()
  //   }
  //   uniqueTasks.push(newStatus)
  //   return uniqueTasks
  // }, [])
}

export function bindColorsToStatus(colors, tasks){
  console.log('tasks', tasks)
  const uniqueStatus = getUniqueStatus(tasks)
  const colorBindedStatusArr = uniqueStatus.map(status => ({
    name: status,
    color: colors.pop()
  }))
  return colorBindedStatusArr
}