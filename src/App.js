import { useEffect, useState } from "react";
import "./App.css"



function App() {
  const [gameName, setGameName] = useState("")
  const [gameAuthor, setGameAuthor] = useState("")
  const [gameTags, setGameTags] = useState("")
  const [gamePrice, setGamePrice] = useState(0)
  const [forKids, setForKids] = useState(false)
  const [gameDesc, setgameDesc] = useState("")
  const [gameRating, setGameRating] = useState()
  const [game, setGame] = useState([])

  const formData = {
    gamename: gameName,
    gameauthor: gameAuthor,
    gameprice: gamePrice,
    gametags: gameTags,
    forkids: forKids,
    gamedesc: gameDesc,
    gamerating: gameRating

  }

  useEffect(() => {

    getData()

  }, [1])


  const getData = () => {
    fetch(`http://localhost:3001/games`).then((d) => d.json()).then((res) => { setGame(res) })
  }






  return <div>
    <form id="addgame" action="">
      <input onChange={(e) => {
        setGameName(e.target.value)
      }} type="text" required name="gamename" />
      <input onChange={(e) => {
        setGameAuthor(e.target.value)
      }} type="text" required name="gameauthor" />
      <input onChange={(e) => {
        setGameTags(e.target.value)
      }} type="text" required name="gametags" />
      <input onChange={(e) => {
        setGamePrice(e.target.value)
      }} type="number" required name="gameprice" />
      <input onClick={(e) => {
        setForKids((e) => "on" ? true : false)
      }} type="checkbox" name="forkids" />
      <textarea onChange={(e) => {
        setgameDesc(e.target.value)
      }} type="text" required name="gamedesc" />
      <select onClick={(e) => {

        setGameRating(e.target.value)
      }} name="gamerating" required id="">
        <option value="0">select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>


      <input onClick={() => {
        // console.log("working");
        if (gameName!=="" && gameRating!==0 && gameDesc!=="" && gamePrice!==0 && gameTags!=="") {
          
          
          fetch("http://localhost:3001/games", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json"
          }
        })
        
        setGameName("")
        setGameRating()
        setgameDesc("")
        setForKids(false)
        setGamePrice(0)
        setGameAuthor("")
        setGameTags("")
        
        
      }


      }} type="submit" />

    </form>




    <table>
      <thead>
        <tr>
          <th>game name</th>
          <th>game author</th>
          <th>game tags</th>
          <th>game price</th>
          <th>is for kids</th>
          <th>rating</th>
        </tr>
      </thead>
      <tbody>
        {game.map((e) => (<tr key={e.id}>
          <td>{e.gamename}</td>
          <td>{e.gameauthor}</td>
          <td>{e.gametags}</td>
          <td>{e.gameprice}</td>
          <td>{e.forkids? "yes":"no" }</td>
          <td>{e.gamerating}</td>
        </tr>))}

      </tbody>
    </table>






  </div>;
}

export default App;
