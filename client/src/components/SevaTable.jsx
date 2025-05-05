import React, { useState } from 'react';
import '../styles/Sevas.css'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const SevaTable = () => {
  
  const navigate = useNavigate();

  const tbody = document.getElementById('tbody')
  const sevaNameField = document.getElementById('seva-name')

  const sevaNames = [
    'Archana',
    'Abhishekam',
    'Deepa Alankara Seva',
    'Tulasi Archana',
    'Kumkuma Archana',
    'Panchamrita Abhishekam',
    'Sahasranama Archana',
    'Nitya Pooja Seva',
    'Udayasthamana Seva',
    'Kalyanotsava',
    'Vahana Seva',
    'Rathotsava',
    'Annadana Seva',
    'Pushpalankara Seva',
    'Navagraha Shanti',
    'Homa / Havan Seva',
    'Chandana Alankara',
    'Ekadasa Rudrabhisheka',
    'Laksha Deepotsava',
    'Special Darshan Seva',
    'Vaikunta Ekadasi Seva',
    'Swarna Tulasi Archana',
    'Sahasra Deepa Alankara',
    'Vastra Seva',
    'Go Seva'
  ];
  

  const [search,setSearch] = useState("")
  const sevaList = [
    { id: 1, name: 'Archana', amount: 50 },
    { id: 2, name: 'Abhishekam', amount: 100 },
    { id: 3, name: 'Deepa Alankara Seva', amount: 150 },
    { id: 4, name: 'Tulasi Archana', amount: 60 },
    { id: 5, name: 'Kumkuma Archana', amount: 70 },
    { id: 6, name: 'Panchamrita Abhishekam', amount: 200 },
    { id: 7, name: 'Sahasranama Archana', amount: 120 },
    { id: 8, name: 'Nitya Pooja Seva', amount: 300 },
    { id: 9, name: 'Udayasthamana Seva', amount: 1000 },
    { id: 10, name: 'Kalyanotsava', amount: 1500 },
    { id: 11, name: 'Vahana Seva', amount: 800 },
    { id: 12, name: 'Rathotsava', amount: 2000 },
    { id: 13, name: 'Annadana Seva', amount: 500 },
    { id: 14, name: 'Pushpalankara Seva', amount: 250 },
    { id: 15, name: 'Navagraha Shanti', amount: 750 },
    { id: 16, name: 'Homa / Havan Seva', amount: 900 },
    { id: 17, name: 'Chandana Alankara', amount: 350 },
    { id: 18, name: 'Ekadasa Rudrabhisheka', amount: 1100 },
    { id: 19, name: 'Laksha Deepotsava', amount: 5000 },
    { id: 20, name: 'Special Darshan Seva', amount: 100 },
    { id: 21, name: 'Vaikunta Ekadasi Seva', amount: 400 },
    { id: 22, name: 'Swarna Tulasi Archana', amount: 600 },
    { id: 23, name: 'Sahasra Deepa Alankara', amount: 700 },
    { id: 24, name: 'Vastra Seva', amount: 450 },
    { id: 25, name: 'Go Seva', amount: 300 }
  ];
  

  const sevaSearch = (search)=>{
    console.log(`SEARCH STRING : ${search}`)
    sevaNames.forEach((seva,index)=>{
      
      // if(seva.toLowerCase().startsWith(search.toLowerCase())){
      //   console.log(`${index} : ${seva}`)
      // }
    })

    
  }

  const handleBook = (seva) => {

   const seva_name = seva.name;
   const seva_amount = seva.amount;
    console.log('Handle Book is executing...')
    localStorage.setItem('seva_name',seva_name);
    localStorage.setItem('seva_amount',seva_amount);

    navigate('/sevas/checkout')
   
  };
  // p-4 max-w-xl mx-auto bg-white shadow-md rounded
  return (
    <div className="" id='seva-container'>
      <h2 className="text-xl font-semibold mb-4">Seva List</h2>

      <div className='search-div'>

      <label>Search the seva here : </label>
       <input className='seva-search'  onChange={(e)=>{
        setSearch(e.target.value)
        sevaSearch(e.target.value)
      }} value={search}/>
      </div>
      <table className="min-w-full border border-gray-300" id='table'>
        <thead className="bg-gray-100">
          <tr id='parameters'>
            <th className="border px-4 py-2 text-left">Sl. No.</th>
            <th className="border px-4 py-2 text-left">Seva</th>
            <th className="border px-4 py-2 text-left">Amount (₹)</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        
        <tbody className='' id='tbody'>
          {sevaList.filter(seva=>
            seva.name.toLowerCase().includes(search.toLowerCase())
          ).map((seva, index) => (
            <tr key={seva.id} className="hover:bg-gray-50" id='each-seva' >
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2" id='seva-name'>{seva.name}</td>
              <td className="border px-4 py-2">₹{seva.amount}</td>
              <td className="border px-4 py-2">
                <button
                  className="book-btn"
                  onClick={() => handleBook(seva)} id='book-btn'
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Navbar/> */}
    </div>
  );
};

export default SevaTable;











































// import '../styles/Sevas.css'

// function Sevas(){

// 	return(
// 	<>

// 	<h1>Sevas page</h1>
// 		<div className='seva-parameter'>
// 			<table className='table'>
			
// 			<tr className='parameter-tr'>
// 				<th id='sl-no'>Sl.No</th>
// 				<th id='seva-col'>Sevas</th>
// 				<th>Amount</th>
// 				<th>Book</th>
// 			</tr>
			
// 			</table>
// 		</div>
// 	<div className="seva-container">
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 		<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 		<div className='each-seva'>
// 			<tr className='each-seva-tr'>
// 				<th>1</th>
// 				<th>Seva 1</th>
// 				<th>100$</th>
// 				<button type='submit' className='confirm-btn'>Book</button>
// 			</tr>
// 		</div>
// 	</div>
	
// 	</>
// 	)
// }

// export default Sevas