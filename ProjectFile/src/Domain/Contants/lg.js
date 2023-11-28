export const lgs = [
    'Peace LG',
    'Amazing LG',
    'Confort LG',
    'Grace LG',
    'Joy LG',
    'Hapiness LG',
    'Gift LG',
    'Success LG'
]

// params lg typeof numner
// returns string
export function lgName(lg) {
    return states[lg]
}

// params lgName typeof string
// returns number
export function lg(lgName) {
    return lgs.indexOf(lgName)
}