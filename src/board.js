import BoardRow from './Board-row'
const Board = ({challengeWord, Chances,wordHandleChange}) => {
    let arr = [];
    for (let i=0; i < Chances; i++){
        arr.push(i)
    }
    return (
        <div >
            {arr.map((itm)=>{
                return (
                     < BoardRow 
                        challengeWord = {challengeWord} 
                        key={itm}
                        wordHandleChange={wordHandleChange}
                     />
                    )
            })}     
        </div>
    )
}
export default Board