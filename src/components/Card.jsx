import { useEffect, useState } from "react";
import "./styles/card.scss";
import Loading from "./Loading";

function traduzirDiaSemana(numero) {
  switch (numero) {
    case 0:
      return "Domingo";
    case 1:
      return "Segunda";
    case 2:
      return "Terça";
    case 3:
      return "Quarta";
    case 4:
      return "Quinta";
    case 5:
      return "Sexta";
    case 6:
      return "Sábado";
    default:
      return "Número inválido";
  }
}

export default function Card({
  cityName,
  isRendered = false,
  setRenderCard,
  renderCardContent,
  setRenderCardContent,
}) {
  const [city, setCity] = useState(null);

  const diaAtual = new Date().getDay();

  useEffect(() => {
    if (renderCardContent === true) {
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${
        import.meta.env.VITE_API_KEY
      }&lang=pt`;
      const fetchCity = async () => {
        const response = await fetch(`${url}&q=${cityName}`);
        const jsonData = await response?.json();
        setRenderCardContent(false);
        setCity(jsonData);
      };
      fetchCity();
    }
  }, [renderCardContent]);

  useEffect(() => {
    console.log("CITY", city);
  }, [city]);

  return (
    <>
      {isRendered === true &&
        (city === null ? (
          <Loading></Loading>
        ) : (
          <div className="card">
            <img
              className="close__icon"
              src="/close.svg"
              onClick={() => setRenderCard(false)}
            ></img>
            <h3>{city?.location?.name}</h3>
            <h1>
              {city?.current?.temp_c}º {city?.current?.condition?.text}
            </h1>
            <div className="card__info">
              <div className="max__min">
                <img src="./arrow-down.svg"></img>
                <h3>{city?.forecast.forecastday[0].day.mintemp_c}</h3>
                <img src="./arrow-up.svg"></img>
                <h3>{city?.forecast.forecastday[0].day.maxtemp_c}</h3>
              </div>
              <h3>Sensação: {city?.current?.feelslike_c}ºC</h3>
              <h3>Vento: {city?.current?.wind_kph}</h3>
              <h3>Umidade: {city?.current?.humidity}%</h3>
            </div>
            <div className="next__days">
              {city.forecast.forecastday.map((item) => {
                return (
                  <div key={item}>
                    <h6>{traduzirDiaSemana(diaAtual + 1)}</h6>
                    <div className="max__min">
                      <img src="./arrow-down.svg"></img>
                      <h6>{item.day.mintemp_c}</h6>
                      <img src="./arrow-up.svg"></img>
                      <h6>{item.day.maxtemp_c}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </>
  );
}
