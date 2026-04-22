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


        socketRef.current.on("messageReceived", ({ firstName, lastName, text }) => {
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
        <div className='w-175 mx-auto mt-10 h-[80vh] flex flex-col bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden'>
            <h1 className='text-white text-lg font-semibold text-center py-4 border-b border-white/10 tracking-wide'>Chat</h1>
            <div className='flex-1 px-4 py-5 overflow-y-auto space-y-3'>
                {messages.map((msg, index) => {
                    const date = new Date(msg.time).toLocaleDateString();
                    const day = new Date(msg.time).toString().substring(0, 3);
                    const isSameSender = index > 0 && messages[index - 1].firstName === msg.firstName && messages[index - 1].lastName === msg.lastName;
                    const isSameDate = () => {
                        if (index <= 0) return false;
                        const preDate = new Date(messages[index - 1].time).toLocaleDateString();
                        const currDate = new Date(msg.time).toLocaleDateString();
                        if (preDate === currDate) return true;
                        return false;
                    }
                    return (
                        <div key={index}>
                            {/* {!isSameDate() && <div className='flex justify-center items-center bg-base-300 text-xs p-1 w-25'>{date + "," + day}</div>} */}
                            {!isSameDate() && <div className='flex justify-center'>
                                <div className='text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 mb-2'>
                                    {date + "," + day}
                                </div>
                            </div>}
                            <div className={"chat " + (msg.firstName === user?.firstName ? "chat-end" : "chat-start")} >
                                {/* {!isSameSender && <div className="chat-header">
                                    {msg.firstName + " " + msg.lastName}
                                </div>} */}
                                <div className="px-4 py-2 rounded-2xl bg-slate-800 text-white shadow-md max-w-xs">
                                    <div className='wrap-break-word text-sm leading-relaxed'>{msg.text}</div>
                                    <div className="text-[10px] text-gray-400 mt-1 text-right">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                </div>
                                {/* {console.log(msg) } */}
                            </div>
                        </div>
                    )
                })}
                <div ref={bottomRef} />
            </div>
            <div className='p-4 border-t border-white/10 flex items-center gap-3 bg-slate-900'>
                <input
                    type="text"
                    className='flex-1 px-4 py-2 rounded-xl bg-slate-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 transition'
                    placeholder='type message'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }}
                />
                <button className='px-5 py-2 rounded-xl text-white font-semibold bg-linear-to-r from-fuchsia-500 via-violet-500 to-cyan-500 hover:brightness-110 active:scale-95 transition-all shadow-md'>
                    send
                </button>
            </div>
        </div>
    )
}

export default Chat
