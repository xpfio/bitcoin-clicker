export function getNewRandomHash() {
    let prob = ['0','0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']; // Double 0 proba... hardcoded
    return [...Array(64)].map(d=>prob[Math.floor(Math.random()*prob.length)]).join('')
} 

export function getHashAnswer(difficulty) {
    let prob = ['0','0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']; // Double 0 proba... hardcoded
    return '0'.repeat(difficulty) + [...Array(64-difficulty)].map(d=>prob[Math.floor(Math.random()*prob.length)]).join('')
}