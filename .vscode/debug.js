(async function(){

    const { handler } = require("../client/amplify/backend/function/studentassignmentscl86355c74/src")
    const event = require("../client/amplify/backend/function/studentassignmentscl86355c74/src/event.json")
        // invoke
        const response = await handler(event)

        console.log(response)
    })()