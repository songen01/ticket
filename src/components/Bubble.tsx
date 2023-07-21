import React from 'react';

export function Bubble() {
    return (
        <div className="container">
            <div className="bubble w-200 h-200 rounded-full shadow-inner animate-bubble">
                <span className="absolute inset-10 border-15 border-blue-500 blur-8"></span>
                <span className="absolute inset-10 border-15 border-red-500 blur-8"></span>
                <span className="absolute inset-10 border-15 border-yellow-500 blur-8"></span>
                <span className="absolute inset-30 border-15 border-red-500 blur-12"></span>
                <span className="absolute inset-10 border-10 border-white blur-8 transform rotate-330"></span>
            </div>
            <div
                className="bubble bubble-2 relative zoom-45 left-negative-10 top-negative-100 animate-bubble animation-delay-negative-4s">
                <span className="absolute inset-10 border-15 border-blue-500 blur-8"></span>
                <span className="absolute inset-10 border-15 border-red-500 blur-8"></span>
                <span className="absolute inset-10 border-15 border-yellow-500 blur-8"></span>
                <span className="absolute inset-30 border-15 border-red-500 blur-12"></span>
                <span className="absolute inset-10 border-10 border-white blur-8 transform rotate-330"></span>
            </div>
            <div
                className="bubble bubble-3 relative zoom-45 right-negative-80 top-negative-300 animate-bubble animation-delay-negative-6s">
                <span className="absolute inset-10 border-15 border-blue-500 blur-8"></span>
                <span className="absolute inset-10 border-15 border-red-500 blur-8"></span>
                <span className="absolute inset-10 border-15 border-yellow-500 blur-8"></span>
                <span className="absolute inset-30 border-15 border-red-500 blur-12"></span>
                <span className="absolute inset-10 border-10 border-white blur-8 transform rotate-330"></span>
            </div>
            <div
                className="bubble bubble-4 relative zoom-35 left-negative-120 bottom-negative-200 animate-bubble animation-delay-negative-3s">
                <span className="absolute inset-10 border-15 border-blue-500 blur-8"></span>
                <span className="absolute inset-10 border-15 border-red-500 blur-8"></span>
                <span className="absolute inset-10 border-15 border-yellow-500 blur-8"></span>
                <span className="absolute inset-30 border-15 border-red-500 blur-12"></span>
                <span className="absolute inset-10 border-10 border-white blur-8 transform rotate-330"></span>
            </div>
            <div className="bubble bubble-5 relative zoom-50 top-200 animate-bubble animation-delay-negative-5s">
                <span className="absolute inset-10 border-15 border-blue-500 blur-8"></span>
                <span className="absolute inset-10 border-15 border-red-500 blur-8"></span>
                <span className="absolute inset-10 border-15 border-yellow-500 blur-8"></span>
                <span className="absolute inset-30 border-15 border-red-500 blur-12"></span>
                <span className="absolute inset-10 border-10 border-white blur-8 transform rotate-330"></span>
            </div>
        </div>
    )
}
