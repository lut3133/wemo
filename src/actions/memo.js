let memoID = 0
export const createMemo = (title,text) =>  ({
    type:'CREATE_MEMO',
    id: memoID++,
    title: title,
    text
})

export const deleteMemo = (title,text) => ({
    type:'DELETE_MEMO',
    title: title,
    text
})