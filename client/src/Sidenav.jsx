import React, { useState, useEffect } from 'react';
import Modals from './Modal';
import axios from 'axios';
import Content from './Content'; 

function Sidenav() {
    const [cartoonDetail, setCartoonDetail] = useState([]);
    const [selectedCartoon, setSelectedCartoon] = useState(null);

    useEffect(() => {
        getCartoonNames();
    }, []);

    const getCartoonNames = async () => {
        try {
            const response = await axios.get('https://cartoon-server.vercel.app/getCartoonNames');
            setCartoonDetail(response.data);
        } catch (error) {
            console.error('Error fetching cartoon names:', error);
        }
    };

    const handleCartoonClick = async (cartoonName) => {
        try {
            const response = await axios.get(`https://cartoon-server.vercel.app/getCartoonDetails/${cartoonName}`);
            setSelectedCartoon(response.data);
        } catch (error) {
            console.error('Error fetching cartoon details:', error);
        }
    };

    return (
        <>
            <div className="m-0 p-4 w-screen sm:w-40  h-40 sm:h-screen fixed overflow-auto text-left text-sm">
                <div  ><Modals /></div>
                <div className=" pb-4 ">
                    {cartoonDetail.map((cartoonName) => (
                        <a
                            key={cartoonName._id}
                            className="block text-white p-2 no-underline text-xs "
                            onClick={() => handleCartoonClick(cartoonName.cartoonName)}
                            href={`#${cartoonName.cartoonName}`}
                        >
                            {cartoonName.cartoonName}
                        </a>
                        
                    ))}
                    
                    

                </div>
            </div>
            <Content selectedCartoon={selectedCartoon} /> {/* Pass selectedCartoon as a prop to Content */}
        </>
    );
}

export default Sidenav;