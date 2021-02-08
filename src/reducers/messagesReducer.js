const initState = {
    'room1':[
        {username:'',
        text:'Welcome to this room!',
        room:'room1',
        timestamp:''}
    ]
}
  
export default function messagesReducer(state = initState, action) {
    if (action.type ==="MESSAGE_RECEIVED") {
        const newState = {...state}
        if(!newState[action.payload.room]){
            newState[action.payload.room]=[];
        }
        
        if(!newState[action.payload.room].find(x=>x.timestamp === action.payload.timestamp)) {
            return {
                ...newState,
                [action.payload.room]: [...newState[action.payload.room], action.payload]
            }
        }

        return state;
            
    };
    return state;

}
