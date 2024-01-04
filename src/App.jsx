import './App.css'
import { useState } from "react"
import { faClone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from './components/Navbar';
import Header from './components/Header';
import { Body } from './components/Body';

function App() {

  const [longurl, setLongurl] = useState();
  const [shorturl, setShorturl] = useState();
  const [inputValue, setInputValue] = useState("");
  var [warn, setWarn] = useState(1);
  const link = `https://supershortneerbackend.vercel.app/${shorturl}`

  const getUrls = async () => {
    const req = await fetch('https://supershortneerbackend.vercel.app/urls')
    const data = await req.json()
    setLongurl(data[data.length - 1].longurl)
    setShorturl(data[data.length - 1].shorturl)
    setWarn(3)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (inputValue == '') {
      setWarn(4)
      return
    }
    setWarn(2)
    const url = {
      long: inputValue
    }

    console.log(inputValue)
    console.log(url)
    console.log(url.long)
    const dataJson = JSON.stringify(url)
    console.log(dataJson)

    const req = await fetch('https://supershortneerbackend.vercel.app/url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dataJson
    }).then(res => {
      if (res.status != 200) {
        setWarn(5)
        setInputValue('')
        return
      } else {
        setInputValue('')
        getUrls()
      }
    })

  }

  const condicao = (warn) => {
    switch (warn) {
      case 1:
        return <p className="text-info">Your shorturl will appear here</p>
        break;
      case 2:
        return <p>shortening...</p>
        break;
      case 3:
        return <span className="d-flex justify-content-between">
          <p>Your short url: <a href={link} className="text-white" target="_blank" >{shorturl} </a></p>
          <button className="btn btn-primary" onClick={copy}><font-awesome-icon icon="fa-solid fa-clone" /><FontAwesomeIcon icon={faClone} fade /></button>
        </span>
        break;
      case 4:
        return <p className="text-danger">Please fill the field with a url!</p>
        break;
      case 5:
        return <p className="text-danger">Please enter a valid url!</p>
        break;
      default:
        break;
    }
  }
  function copy() {
    let copyText = `https://supershortneerbackend.vercel.app/${shorturl}`

    const txta = document.createElement("textarea")
    txta.value = copyText
    document.body.appendChild(txta)
    txta.select()
    document.execCommand("copy")
    alert("Short url copied to clipboard")
    document.body.removeChild(txta)
  }


  return (

    <div>
      <Navbar/>
      <Header/>
      <Body/>
    </div>

  )
}

export default App
