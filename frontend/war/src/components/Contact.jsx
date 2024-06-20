import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import Sidebar from './Sidebar';

const Contact = () => {
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const user = useSelector(state => state.user.connectedUser);

    const sendEmail = (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            setError('Please fill out all fields.');
            return;
        }

        const templateParams = {
            name: name,
            email: email,
            message: message
        };

        emailjs.send('service_9rnvzfp', 'template_j3x5far', templateParams, "6no79izXNNDe1YECd")
            .then(response => {
                console.log('SUCCESS!', response.status, response.text);
                setName('');
                setEmail('');
                setMessage('');
                setError('');
                alert("ההודעה נשלחה");
            }, err => {
                console.error('FAILED...', err);
                setError('Failed to send the message, please try again.');
            });
    };

    return (
        <div className="bg-gray-200 h-screen">
            <Sidebar />
            <div className="flex justify-center mt-9 h-screen text-gray-800">
                <div className="text-center mt-4 mr-5 ml-5">
                    <form onSubmit={sendEmail} className="bg-white space-y-4 p-6 text-center w-full max-w-md shadow-top shadow-gray-800 rounded-2xl hover:animate-button-push hover:shadow-xl hover:shadow-gray-700">
                        <h1 className="text-gray-800 text-4xl font-bold font-['Alef'] text-center">צור קשר</h1>
                        <input placeholder='שם' type="text" name="name" value={name} onChange={e => setName(e.target.value)} style={{ direction: 'rtl' }} className="mb-2 bg-gray-200 rounded-lg p-2 text-center" />
                        <input placeholder='מייל' type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} style={{ direction: 'rtl' }} className="mb-2 bg-gray-200 rounded-lg p-2 text-center" />
                        <textarea placeholder='דברו אלינו' name="message" value={message} onChange={e => setMessage(e.target.value)} style={{ direction: 'rtl' }} className="mb-2 bg-gray-200 rounded-lg p-2 text-center" /><br />
                        {error && <div className="text-red-500 mb-2">{error}</div>}
                        <button type="submit" className="btn bg-gray-800 text-white py-2 px-4 rounded-md hover:animate-button-push">שלח</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
