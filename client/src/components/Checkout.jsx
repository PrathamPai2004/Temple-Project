import { useEffect, useState } from "react";
import axios from 'axios'
import '../styles/checkout.css'
import { useNavigate } from "react-router-dom";
import Confirm from '../components/Confirm'; // <- Correct import

function Checkout() {
	const navigate = useNavigate();
	const [seva_name, setSevaName] = useState("");
	const [confirmPop, setConfirmPop] = useState(false);
	const [count, setCount] = useState(0);
	const [seva_amount, setSevaAmount] = useState(0);
	const [phoneNum, setPhoneNum] = useState('');
	const [userName, setUserName] = useState('');
	const totalAmount = seva_amount * count;
	localStorage.setItem('totalAmount',totalAmount)
	localStorage.setItem('confirmed_seva_name',seva_name)
	localStorage.setItem('userName',userName)
	

	useEffect(() => {
		const savedSevaName = localStorage.getItem('seva_name')
		const savedSevaAmount = localStorage.getItem('seva_amount')

		setSevaName(savedSevaName || "No selection")
		setSevaAmount(savedSevaAmount || 0)
	}, [])

	const checkPhone = () => {
		if (!/^\d{10}$/.test(phoneNum)) {
			alert("Please enter a valid 10-digit phone number");
			return false;
		}
		return true;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (checkPhone()) {
			if (totalAmount > 0) {
				axios.post('http://localhost:3001/confirm-seva', { seva_name, totalAmount, userName, phoneNum })
					.then((result) => {
						if (result.data.status === 'success') {
							console.log('Seva booked: ', result);
							setTimeout(() => {
								navigate('/sevas/download-receipt')
								// navigate('/sevas');
							}, 3000);
						}
					}).catch((err) => {
						console.log('Error occurred in database: ' + err.message);
					})
			} else {
				alert("Please select quantity for booking.");
			}
		} else {
			alert("Phone number is invalid.");
		}
	}

	const handleGoBack = () => {
		setConfirmPop(false); // Hide confirm, show Book button
	}

	return (
		<div className="body">
			{confirmPop && 
				<Confirm 
					handleSubmit={handleSubmit} 
					goBack={handleGoBack} 
					phoneNum={phoneNum} 
					setPhoneNum={setPhoneNum}
					userName={userName}
					setUserName={setUserName}
				/>
			}

			<h1>YOU HAVE SELECTED</h1>

			<div className="checkout-container" id="checkout-container">
				<h2>Seva name: {seva_name}</h2>
				<h2>Seva amount: {totalAmount}</h2>

				<div className="qty">
					<button type="button" onClick={() => setCount(Math.max(0, count - 1))} className="qty-btn">-</button>
					<p>{count}</p>
					<button type="button" onClick={() => setCount(Math.min(10, count + 1))} className="qty-btn">+</button>
				</div>

				<p className="select-text">Select Quantity [max-10]</p>

				{/* Show BOOK button ONLY when Confirm popup is not shown */}
				{(totalAmount >0 && !confirmPop) && (
					<button type="button" onClick={() => setConfirmPop(true)} id="book-btn">BOOK</button>
				)}
			</div>
		</div>
	)
}

export default Checkout;
