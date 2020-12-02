let memoID = 0
export const createMemo = (text) =>  ({
    type:'CREATE_MEMO',
    id: memoID++,
    text
})

export const deleteMemo = (text) => ({
    type:'DELETE_MEMO',
    text
})