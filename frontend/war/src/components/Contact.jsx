import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import Sidebar from './Sidebar';

const Contact = () => {

    const nav = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [massage, setMassage] = useState('');
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user.connectedUser);

    const sendEmail = (e) => {
        e.preventDefault();

        if (!name || !email || !massage) {
            setError('Please fill out all fields.');
            return;
        }

        const templateParams = {
            name: name,
            email: email,
            massage: massage
        };

        emailjs.send('service_9rnvzfp', 'template_j3x5far', templateParams, "6no79izXNNDe1YECd")
            .then(response => {
                console.log('SUCCESS!', response.status, response.text);
                setName('');
                setEmail('');
                setMassage('');
                setError('');
                alert("ההודעה נשלחה")
            }, err => {
                console.error('FAILED...', err);
                setError('Failed to send the message, please try again.');
            });
    };
    return (
        <div className="bg-gray-200">
            <Sidebar />
            <div className="flex justify-center h-screen">
                <div className="border border-black p-8 rounded-md  w-60 h-80  text-center mt-5">
                    <h1 className="text-black text-4xl font-bold font-['Alef']  text-center">צור קשר</h1>
                    <div className="bg-gray-200" style={{ direction: 'rtl' }}>
                        <form onSubmit={sendEmail}>
                            <input placeholder='שם' type="text" name="name" value={name} onChange={e => setName(e.target.value)} /><br />
                            <input placeholder='מייל' type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                            <label>הודעה</label>
                            <textarea placeholder='דברו אלינו' name="massage" value={massage} onChange={e => setMassage(e.target.value)} />
                            <button type="submit" className="rounded-md text-right pr-6 pl-6 text-indigo-50 text-2xl font-bold font-['Alef']  bg-gray-600  hover:bg-white  hover:text-gray-600 hover:border border-gray-600" style={{ transitionProperty: 'background-color, color' }}>שלח</button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
