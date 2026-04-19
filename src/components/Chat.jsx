import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import createSocketConnection from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    // for down scroll automatically
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const socketRef = useRef(null); // for one time socket creation


    const fatchChats = async () => {
        try {
            const res = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
            // console.log(res?.data?.messages)
            const messages = res?.data?.messages;
            // console.log(messages)
            const chatMessages = messages.map((msg) => {
                return {
                    firstName: msg.senderId.firstName,
                    lastName: msg.senderId.lastName,
                    text: msg.text,
                    time: msg.createdAt
                }
            })
            setMessages(chatMessages);
        } catch (err) {
            console.log("Error in api call to get chats :: " + err.message);
        }
    }

    useEffect(() => {
        fatchChats()
    }, [])

    useEffect(() => {
        if (!userId) return;
        socketRef.current = createSocketConnection();
        socketRef.current.emit("joinChat", { firstName: user?.firstName, lastName: user?.lastName, userId, targetUserId });


        socketRef.current.on("messageReceived", ({ firstName, lastName, text}) => {
            setMessages((messages) => [...messages, { firstName, lastName, text, time: new Date() }]);
        })

        return () => {
            socketRef.current.disconnect();
        }
    }, [userId, targetUserId])

    const sendMessage = () => {
        // const socket = createSocketConnection();
        socketRef.current.emit("sendMessage", { firstName: user?.firstName, lastName: user?.lastName, userId, targetUserId, text: newMessage });
        setNewMessage("");
    }

    return (
        <div className='w-150 p-5 mx-auto bg-base-100 border border-gray-600 h-[80vh] flex flex-col mt-10'>
            <h1 className='text-white text-xl border-b border-gray-600 text-center p-2'>Chat</h1>
            <div className='flex-1 p-4 overflow-x-hidden overflow-y-scroll'>
                {messages.map((msg, index) => {
                    const date = new Date(msg.time).toLocaleDateString() ;
                    const day = new Date(msg.time).toString().substring(0 , 3) ;
                    const isSameSender = index > 0 && messages[index - 1].firstName === msg.firstName && messages[index - 1].lastName === msg.lastName;
                    const isSameDate = () => {
                        if(index <= 0) return false ;
                        const preDate = new Date(messages[index - 1].time).toLocaleDateString() ;
                        const currDate = new Date(msg.time).toLocaleDateString() ;
                        if(preDate === currDate) return true ;
                        return false ;
                    }
                    return (
                            <div key={index}>
                                {/* {!isSameDate() && <div className='flex justify-center items-center bg-base-300 text-xs p-1 w-25'>{date + "," + day}</div>} */}
                                {!isSameDate() && <div className='flex justify-center'><div className='inline-flex items-center justify-center bg-base-300 text-xs w-fit px-2 py-1 rounded-md'>{date + "," + day}</div></div>}
                                <div  className={"chat " + (msg.firstName === user?.firstName ? "chat-end" : "chat-start")} >
                                    {!isSameSender && <div className="chat-header">
                                        {msg.firstName + " " + msg.lastName}
                                    </div>}
                                    <div className="chat-bubble rounded-sm mx-1 flex flex-col">
                                        <div className='max-w-80 break-all'>{msg.text}</div>
                                        <div className="text-xs text-gray-500 min-w-20 h-2 mb-1 flex justify-end">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                    {/* {console.log(msg) } */}
                                </div>
                            </div>
                    )
                })}
                <div ref={bottomRef} />
            </div>
            <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
                <input
                    type="text"
                    className='input w-full bg-[#111827]'
                    placeholder='type message'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") sendMessage() ;
                    }}
                />
                <button className='btn btn-primary' onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}

export default Chat
