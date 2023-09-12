import { useState } from "react"
import { faClone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PhoneNumberInput from "./components/Phone"

function App() {

  const [longurl, setLongurl] = useState();
  const [shorturl, setShorturl] = useState();
  const [inputValue, setInputValue] = useState("");
  var [warn, setWarn] = useState(1);
  const link = `http://localhost:5000/${shorturl}`
  // const link = `https://supershortneerbackend.vercel.app/url/${shorturl}`

  const getUrls = async () => {
    const req = await fetch('http://localhost:5000/urls')
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

    const req = await fetch('http://localhost:5000/url', {
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
  function copy(){
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

    <div className="container">

      <h1 className="text-secondary text-center">Super Shortneer</h1>

      <form className="row">

        <div className="col-lg-10 col-md-10 col-sm-10">
          <input type="url" placeholder="Your Long Url" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="form-control col-5 mr-2 mb-3" required />
        </div>

        <div className="col-lg-2 col-md-2 col-sm-2">
          <button type="submit" onClick={handleFormSubmit} className="btn btn-primary mb-3">Shrink</button>
        </div>

      </form>
      <div className="alert alert-secondary">
        {condicao(warn)}
        {/* {inputValue == '' ? <p className="text-danger">Invalid url</p> : condicao(warn) } */}
      </div>

      <PhoneNumberInput />

    </div>

  )
}

export default App
