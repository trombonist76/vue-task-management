export function getBoards() {

  const boards = [
    {
      id: 1,
      title: "Platform Launch",
      fields: {
        doing: {
          id: 1,
          status: "Doing",
          color: "bg-rose-500",
          tasks: [
            {
              id: 1,
              title: "trade some btc",
              order: 1,
            },
            {
              id: 2,
              title: "complete last project",
              order: 2,
            },
            {
              id: 3,
              title: "learn vue",
              order: 3,
            },
          ],
        },

        todo: {
          id: 2,
          status: "Todo",
          color: "bg-blue-300",
          tasks: [
            {
              id: 1,
              title: "Markete Git",
              order: 4,
            },
            {
              id: 2,
              title: "Ekmek Al",
              order: 5,
            },
            {
              id: 3,
              title: "3456",
              order: 6,
            },
          ],
        },

        completed: {
          id: 2,
          status: "Todo",
          color: "bg-blue-300",
          tasks: [
            {
              id: 1,
              title: "A görevi",
              order: 7,
            },
            {
              id: 2,
              title: "B görevi",
              order: 8,
            },
            {
              id: 3,
              title: "C görevi",
              order: 9,
            },
            {
              id: 4,
              title: "D görevi",
              order: 9,
            },
            {
              id: 5,
              title: "E görevi",
              order: 9,
            },
          ],
        },
      },
    },
    {
      id: 2,
      title: "Platform Launch 2",
      fields: {
        doing: {
          id: 1,
          status: "Doing",
          color: "bg-rose-500",
          tasks: [
            {
              id: 1,
              title: "trade some btc",
              order: 1,
            },
            {
              id: 2,
              title: "complete last project",
              order: 2,
            },
            {
              id: 3,
              title: "learn vue",
              order: 3,
            },
          ],
        },

        todo: {
          id: 2,
          status: "Todo",
          color: "bg-blue-300",
          tasks: [
            {
              id: 1,
              title: "Markete Git",
              order: 4,
            },
            {
              id: 2,
              title: "Ekmek Al",
              order: 5,
            },
            {
              id: 3,
              title: "3456",
              order: 6,
            },
          ],
        },

        completed: {
          id: 2,
          status: "completed",
          color: "bg-blue-300",
          tasks: [
            {
              id: 1,
              title: "A görevi",
              order: 7,
            },
            {
              id: 2,
              title: "B görevi",
              order: 8,
            },
            {
              id: 3,
              title: "C görevi",
              order: 9,
            },
            {
              id: 4,
              title: "D görevi",
              order: 9,
            },
            {
              id: 5,
              title: "E görevi",
              order: 9,
            },
          ],
        },
      },
    },
  ];

  return boards;
}

export function formToData(form){
  const data = Object.entries(form).reduce((dataObj, [formField, formValue]) => {

    if (formValue.hasOwnProperty("value")){
      dataObj[formField] = formValue.value
      return dataObj
    }

    const itemsInArray = formValue.map((item) => {
      delete item.isValid
      return subtask
    })

    dataObj[formField] = itemsInArray

    return dataObj
  }, {})

  return data
}

export function validateForm(form){
  const data = Object.entries(form).reduce((dataObj, [formField, formValue]) => {

    if (formValue.hasOwnProperty("value")){
      dataObj[formField] = formValue.isValid
      return dataObj
    }

    const checkAllValid = formValue.every((item) => item.isValid)

    dataObj[formField] = checkAllValid

    return dataObj
  }, {})

  return data
}

export function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
