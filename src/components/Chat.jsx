import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import createSocketConnection from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { X, Paperclip, Smile, Send } from 'lucide-react'

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const navigate = useNavigate() ;

    const connections = useSelector(state => state.connections);
    const connection = connections?.find(conn => conn._id === targetUserId);
    // console.log(connections) ;

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

    const onClose = () => {
        navigate("/connections");
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl h-150 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-t-2xl">
                    {/* bg-linear-to-r from-purple-600 to-pink-600 */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src={connection?.photoUrl}
                                alt={connection?.name}
                                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                            />
                            {/* <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div> */}
                        </div>
                        <div>
                            <h3 className="font-semibold flex items-center gap-2">
                                {connection?.firstName + " " + connection?.lastName}
                            </h3>
                            {/* <p className="text-sm text-white/80">{connection.lastSeen}</p> */}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 p-2 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.firstName === user?.firstName ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.firstName === user?.firstName
                                    ? "bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-br-none shadow-lg shadow-purple-500/20"
                                    : "bg-gray-800 border border-gray-700 text-gray-200 rounded-bl-none"
                                    }`}
                            >
                                <p className="text-sm leading-relaxed wrap-break-word">{message.text}</p>
                                <p
                                    className={`text-xs mt-1 ${message.firstName === user?.firstName ? "text-white/70" : "text-gray-500"
                                        }`}
                                >
                                    {new Date(message?.time).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                <div className="p-4 border-t border-gray-800 bg-gray-900 rounded-b-2xl">
                    <div className="flex items-end gap-2">
                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                            <Paperclip className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
                        </button>
                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                            <Smile className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
                        </button>
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") sendMessage();
                            }}
                            placeholder="Type a message..."
                            className="flex-1 resize-none bg-black border border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none max-h-32 text-white placeholder-gray-500"
                            rows={1}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!newMessage.trim()}
                            className="bg-linear-to-r from-indigo-500 to-violet-500 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat
