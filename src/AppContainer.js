import { BrowserRouter as Router } from 'react-router-dom';
import CryptoJS from 'crypto-js'
import React from 'react';
import App from './App';


const AppContainer = () => {
    const [link, setLink] = React.useState('')
    const [data, setData] = React.useState({
        challengeWord: '',
        chances: 0,
        userhelp: ''
    })

    const path = window.location.search;

    React.useEffect(() => {
        DcryptData()
    }, [])

    function DcryptData() {
        const patharr = path.includes('&') && path.split('&');
        const chancesAndText = path.includes('&') && patharr[0]
        const helpword = path.includes('&') && patharr[1].slice(0, patharr[1].length - 1)
        const newChances = path.includes('&') && chancesAndText[chancesAndText.length - 1]
        const ciphertext = path.includes('&') && chancesAndText.slice(5, chancesAndText.length - 2)
        let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        setData({
            challengeWord: originalText,
            chances: newChances,
            userhelp: helpword,
        })
    }
    return (
        <Router>
            <App
                challengeWord={data.challengeWord}
                chances={data.chances}
                link={link}
                setLink={setLink}
                userhelp={data.userhelp}
            />

        </Router>
    )
}
export default AppContainer