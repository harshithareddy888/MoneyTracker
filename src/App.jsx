import { useState, useEffect } from 'react'
import './App.css'
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL


function App() {
  const [name, setName] = useState("")
  const [datetime, setdatetime] = useState("")
  const [description, setdescription] = useState("")
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    getTransactions().then(setTransactions)
  })
  async function getTransactions() {
    const url = import.meta.env.VITE_REACT_APP_API_URL + '/transactions'
    // const url = process.env.VITE_REACT_APP_API_URL + "/transactions"
    const response = await fetch(url)
    return await response.json()
  }
  function addNewTransaction(ev) {
    ev.preventDefault()
    const url = import.meta.env.VITE_REACT_APP_API_URL + '/transactions'
    // const url = "http://localhost:3000/api/transactions";
    const price = name.split(' ')[0]
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        datetime,
        description
      })
    }).then(res => res.json()).then(data => {
      setName("")
      setdatetime("")
      setdescription("")
    })
  }
  let balance=0
  for (const transaction of transactions) {
    balance+=transaction.price
  }

  return (
    <main>
      <h1>${balance}</h1>
      <div className='form-container'>
        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} placeholder="0.00" />
            <input value={datetime} onChange={(ev) => setdatetime(ev.target.value)} type="datetime-local" />
          </div>
          <div className="description">
            <input type="text" value={description} onChange={ev => setdescription(ev.target.value)} placeholder="Description" />
          </div>
          <button type="submit">Add new expense</button>
        </form>
        <div className="transactions">
          {transactions.length>0 && transactions.map(transaction => (
            <div className="transaction" key={transaction._id || transaction.datetime} >
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price "+ (transaction.price < 0 ? "red" : "green")}>
                {transaction.price}</div>
              <div className="datetime">{transaction.datetime}</div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default App
