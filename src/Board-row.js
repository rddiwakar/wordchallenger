
import React from 'react';
import OtpInput from "react-otp-input";

import PopUp from './components/Modal/modal'


import { ReactComponent as Icon } from './Assets/svgviewer-output.svg'

const BoardRow = ({ challengeWord, wordHandleChange }) => {
    const [color, setColor] = React.useState([])
    const [otp, setOtp] = React.useState('');
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChange = (otp) => {
        setOtp(otp)
    }

    const handleSubmit = () => {
        
        wordHandleChange(otp)
        ColorGetter()
        if (challengeWord.toUpperCase() === otp.toUpperCase()) {
            setIsModalVisible(true)
        } else {
            alert(`try Again ${color.join(', ')}`)
        }
    }
    function ColorGetter() {
        let arr = []
        for (let x = 0; x < otp.length; x++) {
            if (challengeWord.includes(otp[x])) {
                if (otp[x] === challengeWord[x]) {
                    arr.push('green')
                } else {
                    arr.push('orange')
                }
            } else {
                arr.push('grey')
            }
        }
        setColor(arr)
    }

    return (
        <div>
            <div className='board-row'>
                <OtpInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={challengeWord.length}
                    containerStyle={{ margin: '.5rem' }}
                    inputStyle={{
                        height: '6rem',
                        width: '6rem',
                        margin: '.5rem',
                        fontSize: "3rem",
                        textTransform: 'uppercase',
                        border: '.5px solid black',
                        boxShadow:'1px 2px 2px gray'
                    }}
                />
                <button className='btn' onClick={handleSubmit}> <Icon /> </button>
                <PopUp
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    isModalVisible={isModalVisible}
                />
            </div>

        </div>
    )
}
export default BoardRow