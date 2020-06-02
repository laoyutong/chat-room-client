import React, { useRef } from 'react'
import './index.scss'
import socket from '../../socket'

const Home = props => {

    const { history } = props

    const inputRef = useRef()

    const handleClick = () => {
        const value = inputRef.current.value
        if (value) {
            socket.emit('enter', value);
            socket.on('login', data => {
                if (data) {
                    history.push('/room')
                } else {
                    alert('用户名已存在')
                }
            })
        } else {
            alert('用户名不得为空')
        }
    }

    return (
        <div className="home-container">
            <div className="home-title">
                欢迎来到無唁聊天室~
            </div>
            <div className="home-input">
                <input type="text" placeholder="请输入你的昵称" ref={inputRef} />
            </div>
            <div className="home-btn" onClick={handleClick}>
                进入
            </div>
        </div>
    )
}

export default Home
