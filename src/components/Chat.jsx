import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import createSocketConnection from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { X, Paperclip, Smile, Send } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const navigate = useNavigate();
    
    const connections = useSelector(state => state.connections);
    const connection = connections?.find(conn => conn?.data?._id === targetUserId);

    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const socketRef = useRef(null);

    const onClose = () => {
        navigate("/connections");
    }

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
                const messages = res?.data?.messages || [];
                const chatMessages = messages.map((msg) => ({
                    firstName: msg.senderId.firstName,
                    lastName: msg.senderId.lastName,
                    text: msg.text,
                    time: msg.createdAt,
                }));
                setMessages(chatMessages);
            } catch (err) {
                console.log("Error in api call to get chats :: " + err.message);
            }
        };

        fetchChats();
    }, [targetUserId])

    useEffect(() => {
        if (!userId) return;
        socketRef.current = createSocketConnection();

        socketRef.current.emit("joinChat", { firstName: user?.firstName, lastName: user?.lastName, userId, targetUserId });

        socketRef.current.on("messageReceived", ({ firstName, lastName, text }) => {
            setMessages((messages) => [...messages, { firstName, lastName, text, time: new Date() }]);
        })

        return () => {
            socketRef.current?.disconnect();
        }
    }, [userId, targetUserId])

    const sendMessage = () => {
        socketRef.current.emit("sendMessage", { firstName: user?.firstName, lastName: user?.lastName, userId, targetUserId, text: newMessage });
        setNewMessage("");
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl h-150 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-indigo-500 text-white rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src={connection?.data?.photoUrl}
                                alt={connection?.data?.firstName}
                                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold flex items-center gap-2">
                                {connection?.data?.firstName + " " + connection?.data?.lastName}
                            </h3>
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
                    {messages.map((message, index) => {

                        const date = new Date(message.time).toLocaleDateString();
                        const day = new Date(message.time).toString().substring(0, 3);
                        const isSameDate = () => {
                            if (index <= 0) return false;
                            const preDate = new Date(messages[index - 1].time).toLocaleDateString();
                            const currDate = new Date(message.time).toLocaleDateString();
                            if (preDate === currDate) return true;
                            return false;
                        }

                        return (
                            <div key={index}>
                                {!isSameDate() && <div className='flex justify-center'>
                                    <div className='text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 mb-2'>
                                        {date + "," + day}
                                    </div>
                                </div>}
                                <div
                                    className={`flex ${message.firstName === user?.firstName ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.firstName === user?.firstName
                                            ? "bg-indigo-500 text-white rounded-br-none shadow-lg shadow-purple-500/20"
                                            : "bg-gray-800 border border-gray-700 text-gray-200 rounded-bl-none"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed wrap-break-word">{message.text}</p>
                                        <p className={`text-xs mt-1 ${message.firstName === user?.firstName ? "text-white/70" : "text-gray-500"}`}>
                                            {new Date(message?.time).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>)
                    })}
                    <div ref={bottomRef} />
                </div>

                <div className="p-4 border-t border-gray-800 bg-gray-900 rounded-b-2xl">
                    <div className="flex items-end gap-2">
                        {/* <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                            <Paperclip className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
                        </button> */}
                        <div className="relative">
                            <button
                                onClick={() => setShowEmojiPicker(prev => !prev)}
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <Smile className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
                            </button>
                            {showEmojiPicker && (
                                <div className="absolute bottom-12 left-0 z-50">
                                    <EmojiPicker
                                        theme="dark"
                                        onEmojiClick={(emojiData) => {
                                            setNewMessage(prev => prev + emojiData.emoji);
                                            setShowEmojiPicker(false);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            placeholder="Type a message..."
                            className="flex-1 resize-none bg-black border border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none max-h-32 text-white placeholder-gray-500"
                            rows={1}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!newMessage.trim()}
                            className="bg-indigo-500 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
