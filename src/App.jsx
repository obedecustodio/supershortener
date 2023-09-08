import { useState, useEffect } from "react"
import { faClone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {

  useEffect(() => {
    getUrls()
  }, [])

  const [longurl, setLongurl] = useState();
  const [shorturl, setShorturl] = useState();
  const [inputValue, setInputValue] = useState("");
  let warn = '1';
  const link = `http://localhost:5000/${shorturl}`
  // const link = `https://supershortneerbackend.vercel.app/url/${shorturl}`

  const getUrls = async () => {
    const req = await fetch('http://localhost:5000/urls')
    const data = await req.json()
    setLongurl(data[data.length - 1].longurl)
    setShorturl(data[data.length - 1].shorturl)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // const warn = document.querySelector('#warn');
    // warn.innerHtml = ''
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
    })

    setInputValue('')
    getUrls()
  }

  // https://supershortneerbackend.vercel.app/urls
  // http://localhost:5000/urls
  // http://localhost:5000/url
  // http://localhost:5000/url/

  return (
    <>
      <div className="container">

        <h1 className="text-secondary text-center">Super Shortneer</h1>

        <form className="row">
          
          <div className="col-lg-10 col-md-10 col-sm-10">
            <input type="url" placeholder="Your Long Url" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="form-control col-5 mr-2 mb-3" required />
          </div>

          <div className="col-lg-2 col-md-2 col-sm-2">
            <button type="submit" onClick={handleFormSubmit} class="btn btn-primary mb-3">Shrink</button>
          </div>

        </form>
        <div className="alert alert-secondary">

          <p className="text-info" id="warn">Your shorturl will appear here</p>
          <p id="on">shortening...</p>

          <span className="d-flex justify-content-between">
            <p>Your short url: <a href={link} className="text-white" target="_blank" >{shorturl} </a></p>
            <button className="btn btn-primary"><font-awesome-icon icon="fa-solid fa-clone" /><FontAwesomeIcon icon={faClone} fade /></button>
          </span>

        </div>

      </div>
    </>
  )
}

export default App
