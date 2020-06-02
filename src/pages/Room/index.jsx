import React, { useState, useRef } from 'react'
import './index.scss'
import classnames from 'classnames'
import socket from '../../socket'

const Room = () => {

    const [activeUser, setActiveUser] = useState('所有人')

    const [userList, setUserList] = useState([])

    const [msgList, setMsgList] = useState([])

    const inputRef = useRef()

    const handleClick = () => {
        const value = inputRef.current.value
        if (value.trim()) {
            socket.emit('msg', {
                to: activeUser,
                content: value
            })
            inputRef.current.value = ''
        } else {
            alert('发送内容不得为空')
        }
    }

    if (userList.length === 0) {
        socket.emit('userList')
    }
    socket.on('userList', data => {
        setUserList(data)
    })

    socket.on('msg', data => {
        setMsgList([...msgList, {
            ...data,
            flag: 'msg'
        }])
    })
    socket.on('userIn', userName => {
        setMsgList([...msgList, {
            from: userName,
            flag: 'userIn'
        }])
        socket.emit('userList')
    })
    socket.on('userOut', userName => {
        setMsgList([...msgList, {
            from: userName,
            flag: 'userOut'
        }])
        socket.emit('userList')
    })

    return (
        <div className="room-container">
            <div className="user-list">
                <div className="user-list-title">
                    用户列表
                </div>
                <div className={
                    classnames('user-item',
                        { active: activeUser === '所有人' })
                }
                    onClick={() => setActiveUser('所有人')}
                >所有人</div>
                {
                    userList.map(item => (
                        <div
                            className={
                                classnames('user-item',
                                    { active: activeUser === item })
                            } key={item}
                            onClick={() => setActiveUser(item)}
                        >
                            {item}
                        </div>
                    ))
                }
            </div>
            <div className="room-content">
                <div className="chat-content">
                    {
                        msgList.map((item, index) => {
                            if (item.flag === 'msg') {
                                return (
                                    <div className='chat-item msg'
                                        key={index}>
                                        <span className="from">{item.from}</span>
                                        对<span className="to">{item.to}</span>说:
                                        <span className="words">{item.content}</span>
                                    </div>)
                            } else if (item.flag === 'userIn') {
                                return (
                                    <div className="chat-item userIn" key={index}>
                                        <span className="name">{item.from}</span>进入了聊天室
                                    </div>
                                )
                            } else if (item.flag === "userOut") {
                                return (
                                    <div className="chat-item userOut" key={index}>
                                        <span className="name">{item.from}</span>退出了聊天室
                                    </div>
                                )
                            }
                            return null
                        })
                    }
                </div>
                <div className="edit-content">
                    <div className="edit-top">
                        <div className="msg">对
                        <span className="spec">{activeUser}</span>
                        发送</div>
                        <div className="btn" onClick={handleClick}>发送</div>
                    </div>
                    <div className="edit-input">
                        <textarea ref={inputRef}></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room
