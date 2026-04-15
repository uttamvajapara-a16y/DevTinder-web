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
            const chatMessages = messages.map((msg) => {
                return {
                    firstName: msg.senderId.firstName,
                    lastName: msg.senderId.lastName,
                    text: msg.text
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


        socketRef.current.on("messageReceived", ({ firstName, lastName, text }) => {
            setMessages((messages) => [...messages, { firstName, lastName, text }]);
        })

        return () => {
            socketRef.current.disconnect();
        }
    }, [userId, targetUserId])

    const sendMessage = () => {
        const socket = createSocketConnection();
        socketRef.current.emit("sendMessage", { firstName: user?.firstName, lastName: user?.lastName, userId, targetUserId, text: newMessage });
        setNewMessage("");
    }

    return (
        <div className='w-1/2 mx-auto border border-gray-600 h-[83vh] flex flex-col'>
            <h1 className='text-white text-xl border-b border-gray-600 text-center p-2'>Chat</h1>
            <div className='flex-1 p-4 overflow-x-hidden overflow-y-scroll'>
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className={"chat " + (msg.firstName === user?.firstName ? "chat-end" : "chat-start")}>
                            <div className="chat-header">
                                {msg.firstName + " " + msg.lastName}
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            {/* <div className="chat-footer opacity-50">Delivered</div> */}
                        </div>
                    )
                })}
                <div ref={bottomRef} />
            </div>
            <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
                <input
                    type="text"
                    className='input w-full'
                    placeholder='type message'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className='btn btn-primary' onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}

export default Chat
