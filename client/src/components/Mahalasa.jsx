import '../styles/Mahalasa.css'
import Navbar from './Navbar'

function Mahalasa(){
	return(
		<div className='mahalasa-page'>
			<div className='overlay'></div>
			<div className="mahalasa-container">
				<h1 id='mahalasa-heading'>|| MAHALASA SAUNSTHAN KUMTA ||</h1>	
				
			</div>
			<Navbar/>
			{/* <div className='mahalasa-main'>
			<p>This is content below the hero section. Scroll to see sticky navbar.</p>
			</div> */}
		</div>
	)
}

export default Mahalasa