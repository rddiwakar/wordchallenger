import React from 'react';
import './App.css';
import Board from './board';
import CryptoJS from 'crypto-js'
import {Link} from 'react-router-dom'
import {ReactComponent as CopyIcon} from './Assets/copy.svg'

function App({chances, challengeWord, setLink, link, userhelp}) {
  const [copied,setCopied] = React.useState(false)
  const [word, setWord] = React.useState([])
  const [challenge, setChallenge] = React.useState({
    word: '',
    chances: '',
    hint: ''
  });

  const wordHandleChange = (letter) => {
    setWord([...word, letter])
  }

  const handleChallengeChange = (e) => {
    const name = e.target.name
    setChallenge({
      ...challenge,
      [name]: e.target.value,
    })
  }
  const challengeSubmit = (e) => {
    e.preventDefault();
    var ciphertext = CryptoJS.AES.encrypt(challenge.word, 'secret key 123').toString();
    let gameLink = `(${ciphertext})${challenge.chances}&${challenge.hint}`
    setLink(gameLink)
  }
  const copyToClipboard =(link)=>{
    let text = `http://localhost:3000/?q=(${link})`
    navigator.clipboard.writeText(text)
    setCopied(true)
  }
  
  return (
    <div className="App">
      <h1 className="Header">Word Challenger</h1>
      <hr />
      {userhelp && <h1> Hint: {userhelp}</h1>}
      <div className="game-board">
        <Board
          challengeWord={challengeWord}
          Chances={chances}
          wordHandleChange={wordHandleChange}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem' }}> Give challenge to your friends.</div>
        <br />
        <form 
          onSubmit={(e) => challengeSubmit(e)} 
          style={{display: "flex",justifyContent:'center', alignItems:'center',paddingBottom:"6rem"}}
        >
          <input
            name='word'
            className='input'
            placeholder='Word'
            value={challenge.word}
            onChange={(e) => handleChallengeChange(e)}
            required
          />
          <input
            name='hint'
            className='input'
            placeholder='Hint'
            type='text'
            value={challenge.hint}
            onChange={(e) => handleChallengeChange(e)}
            required
          />
          <input
            name='chances'
            className='input'
            placeholder='Chances'
            type='number'
            value={challenge.chances}
            onChange={(e) => handleChallengeChange(e)}
            required
          />
          
          <button className='btn' type='submit'>Set</button>
        </form>
        <div style={{paddingBottom:"3rem"}}>
          {
            link ? 
              <div style={{ margin:'1rem .5rem'}}>
                <div> 
                  <Link to={`/?q=(${link})`} target='_blank' >{`http://localhost:3000/?q=(${link})`}</Link>
                </div>
                <br />
                  <CopyIcon style={{heigth:'2rem',width:'2rem', padding:'.5rem'}} onClick={()=>copyToClipboard(link)}/> 
                <br />
                <h4 > {copied ? 'Link Copied Successfully':'Click icon for copy link on above'} </h4>
              </div>
              :''
          }
        </div>
      </div>
    </div>
  );
}

export default App;
