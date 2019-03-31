var simplyTrello = require('simply-trello');

  simplyTrello.send (
      {key: '93929b937bb884baa10b2e83efe2f077', token: '5afea89c54fee7b0c722374570c8521ddb3842e8811219a02a386156035d7615'},
      {
          path: {
              board: 'Board123',
              list: 'Modules list',
              card: 'TaskName',
              description: 'aala re aala',
          },
          content: {
              cardComment: 'A good friend helps you when you fall. A best friend laughs in your face and trips you again!',
          }
      }
  )
