import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Modals() {
    const [show, setShow] = useState(false);
    const [cartoonName, setCartoonName] = useState('');
    const [cartoonImage, setCartoonImage] = useState('');

    const handleClose = () => {
        setShow(false);
        setCartoonName('');
        setCartoonImage('');
    };

    const handleShow = () => setShow(true);

    const handleCartoonNameChange = (e) => {
        setCartoonName(e.target.value);
    };

    const convertToBase64 = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
    
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800; // You can adjust this value as needed
                    const scale = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scale;
    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                    const resizedImage = canvas.toDataURL('image/jpeg'); // You can change 'image/jpeg' to 'image/png' if needed
                    setCartoonImage(resizedImage);
                };
            };
            reader.readAsDataURL(file);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/addCartoon', {
                cartoonName,
                cartoonImage
            });
            console.log('Server Response:', response.data);
        } catch (error) {
            console.error('Error uploading cartoon:', error);
        }
        handleClose();
    };

    return (
        <div className='mb-4'>
            <button className='text-blue-800 bg-slate-400 rounded-full p-1' onClick={handleShow}>
                NEW CARTOON
            </button>

            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit} className="p-4">
                    <label className="block mb-2">Cartoon Name</label>
                    <input
                        type="text"
                        value={cartoonName}
                        onChange={handleCartoonNameChange}
                        className="w-full border p-2 mb-4"
                        required
                    />

                    <label className="block mb-2">Cartoon Image</label>
                    <input
                        type="file"
                        onChange={convertToBase64}
                        className="w-full border p-2 mb-4"
                        required
                    />

                    {cartoonImage && (
                        <img
                            src={cartoonImage}
                            alt="Cartoon Preview"
                            className="w-full mb-4"
                        />
                    )}
                    <div className='text-right' >
                        <button type='submit' className='text-blue-800 bg-slate-400 rounded-full p-1 ' onClick={handleShow}>
                            ADD NEW CARTOON
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Modals;