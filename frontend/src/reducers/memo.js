

export default function reducers(state = [], action) {
    if (action.type === 'CREATE_MEMO') {
        console.log("CREATE_MEMO")
        return [
            ...state,
            {
                id: action.id,
                title: action.title,
                text: action.text
            }
        ]
    } else if (action.type === 'DELETE_MEMO') {
        console.log("DELETE_MEMO")
        return state.filter((item) => item.text !== action.text)

    }
    return state
}