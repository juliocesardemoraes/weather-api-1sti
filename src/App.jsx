import { useState } from "react";
import "./App.scss";
import Capitals from "./components/Capitals";
import Card from "./components/Card";

function App() {
  const [cityName, setCityName] = useState(null);
  const [renderCard, setRenderCard] = useState(null);
  const [renderCardContent, setRenderCardContent] = useState(null);

  return (
    <main>
      <h1>Previsão do tempo</h1>
      <Card
        cityName={cityName}
        isRendered={renderCard}
        setRenderCard={setRenderCard}
        renderCardContent={renderCardContent}
        setRenderCardContent={setRenderCardContent}
      ></Card>
      <div className="search__button">
        <input
          type="search"
          id="site-search"
          name="q"
          onChange={(event) => setCityName(event.target.value)}
        ></input>
        <div
          className="button__holder"
          onClick={() => {
            setRenderCard(true);
            setRenderCardContent(true);
          }}
        >
          <img src="/search.svg"></img>
        </div>
      </div>

      <hr></hr>
      <Capitals></Capitals>
    </main>
  );
}

export default App;
