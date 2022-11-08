export function getBoards() {
  // const boards =  [
  //   {
  //     id:1,
  //     title:"Platform Launch",
  //     fields: [
  //       {
  //         id: 1,
  //         status: "Doing",
  //         color: "bg-rose-500",
  //       },
  //       {
  //         id: 2,
  //         status: "Todo",
  //         color: "bg-blue-300",
  //       }
  //     ],

  //     tasks: [
  //       {
  //         id:1,
  //         title:"trade some btc",
  //         order: 1,
  //         fieldId: 1
  //       },
  //       {
  //         id:2,
  //         title:"complete last project",
  //         order: 2,
  //         fieldId: 1
  //       },
  //       {
  //         id:3,
  //         title:"learn vue",
  //         order: 3,
  //         fieldId: 1
  //       },
  //       {
  //         id:4,
  //         title:"Markete Git",
  //         order: 4,
  //         fieldId: 2
  //       },
  //       {
  //         id:5,
  //         title:"Ekmek Al",
  //         order: 5,
  //         fieldId: 2
  //       },
  //       {
  //         id:6,
  //         title:"3456",
  //         order: 6,
  //         fieldId: 2
  //       },
  //     ]
  //   },

  //   {
  //     id:2,
  //     title:"Marketing Plan",
  //     fields: [
  //       {
  //         id: 1,
  //         status: "Doing",
  //         color: "bg-rose-500",
  //       },
  //       {
  //         id: 2,
  //         status: "Todo",
  //         color: "bg-blue-300",
  //       },
  //       {
  //         id: 3,
  //         status: "Done",
  //         color: "bg-green-300",
  //       }
  //     ],

  //     tasks: [
  //         {
  //           id: 1,
  //           title: "Markete Git",
  //           fieldId: 1
  //         },
  //         {
  //           id: 2,
  //           title: "Ekmek Al",
  //           fieldId: 1
  //         },
  //         {
  //           id: 3,
  //           title: "Domates Al",
  //           fieldId: 1
  //         },

  //         {
  //           id: 4,
  //           title: "Biber Al",
  //           fieldId: 2
  //         },

  //         {
  //           id: 5,
  //           title: "Karpuz Al",
  //           fieldId: 3
  //         }
  //     ]
  //   }
  // ]

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
  ];

  return boards;
}

export function getUniqueStatus(tasks, filterBy = (task) => task.status) {
  const taskStatus = tasks.map((task) => filterBy(task));
  const uniqueStatus = [...new Set(taskStatus)];
  return uniqueStatus;
}

export function bindColorsToStatus(colors, tasks) {
  const uniqueStatus = getUniqueStatus(tasks);
  const colorBindedStatusArr = uniqueStatus.map((status, index) => ({
    id: index + 1,
    name: status,
    color: colors.pop(),
  }));
  return colorBindedStatusArr;
}

export function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
