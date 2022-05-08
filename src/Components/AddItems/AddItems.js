import React, { useEffect } from 'react';
import './AddItems.css'
import toast from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
const AddItems = () => {
    const [user] = useAuthState(auth);
    const handleSubmitButton = event => {
        event.preventDefault()
        const email = event.target.email.value;
        const name = event.target.itemName.value;
        const description = event.target.description.value;
        const quantity = Number(event.target.quantity.value);
        const price = event.target.price.value;
        const supplier = event.target.supplierName.value;
        const img = event.target.img.value;
        console.log(name, description, quantity, price, supplier, img);
        const inventory = { email, name, img, description, price, quantity, supplier }

        fetch('https://arcane-island-70615.herokuapp.com/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(inventory)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        event.target.reset()
        toast.success("Items Added Successfully")
    }

    return (
        <div className='addItem-container my-5'>
            <h2 className='text-center text-2xl font-bold text-zinc-700'>Add Items</h2>

            <form onSubmit={handleSubmitButton} className='addItems-input-container'>
                <div className='flex justify-center'>
                    <div>
                        <p className='email-password-text'>Your Email</p>
                        <div>
                            <input className='add-input-style cursor-not-allowed' type="email" name="email" placeholder='Type your email' value={user?.email} readOnly />
                        </div>
                        <div className='bottom-line'></div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <p className='email-password-text'>Item Name</p>
                        <div>
                            <input className='add-input-style' type="text" name="itemName" placeholder='Type your item name' required />
                        </div>
                        <div className='bottom-line'></div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <p className='email-password-text'>Item Description</p>
                        <div>
                            <textarea className='add-input-style' type="text" name="description" placeholder='Type your item description' required />
                        </div>
                        <div className='bottom-line'></div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <p className='email-password-text'>Quantity</p>
                        <div>
                            <input className='add-input-style' type="number" name="quantity" placeholder='Type your item quantity' required min={0} />
                        </div>
                        <div className='bottom-line'></div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <p className='email-password-text'>Supplier Name</p>
                        <div>
                            <input className='add-input-style' type="text" name="supplierName" placeholder='Type your supplier name' required />
                        </div>
                        <div className='bottom-line'></div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <p className='email-password-text'>Price</p>
                        <div>
                            <input className='add-input-style' type="number" name="price" placeholder='Type your item price' required min={0} />
                        </div>
                        <div className='bottom-line'></div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <p className='email-password-text'>Image Link</p>
                        <div>
                            <input className='add-input-style' type="text" name="img" placeholder='Type your Image URL' required />
                        </div>
                        <div className='bottom-line'></div>
                    </div>
                </div>
                <div className='text-center my-7'>
                    <input className='addItem-submit-btn' type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default AddItems;