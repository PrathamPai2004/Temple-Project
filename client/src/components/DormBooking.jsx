import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/DormBooking.css'
function DormBooking() {
	const navigate = useNavigate()

	const handleDormSelect = (dorm) => {
		console.log(`Dorm ${dorm} from client side..`)
		navigate(`/dorm-booking/dorm-view/${dorm}`)
	}

	return (
		<div className="dorm-main-container">
		<div className="dorm-booking-container">
			<h1 className="">Temple Dormitory Booking</h1>
			<div>
				<h2>Select a Dormitory</h2>
				{['Simhapurush', 'Graampurush', 'Mhaalpurush'].map(d => (
					<button
						key={d}
						className="m-2 p-2 border rounded"
						onClick={() => handleDormSelect(d)}
					>
						{d}
					</button>
				))}
			</div>
		</div>
		</div>
	)
}

export default DormBooking
