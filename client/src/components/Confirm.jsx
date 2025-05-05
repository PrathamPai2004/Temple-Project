export function Confirm({ handleSubmit, goBack, phoneNum, setPhoneNum, userName, setUserName }) {
	return (
		<div className="confirm-container">
			<label>Enter your name:</label>
			<input 
				type="text" 
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
			/>
			<label>Enter your phone number:</label>
			<input 
				type="text" 
				value={phoneNum}
				onChange={(e) => setPhoneNum(e.target.value)}
			/>
			<p>Confirm the checkout?</p>

			<button onClick={handleSubmit}>Yes</button>
			<button onClick={goBack}>No</button>
		</div>
	)
}
export default Confirm