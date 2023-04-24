import { useEffect, useState } from "react";
import Loading from "./Loading";
import CapitalList from "./CapitalList";

export default function Capitals() {
  const [capitalsWeather, setCapitalsWeather] = useState(null);

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${
    import.meta.env.VITE_API_KEY
  }`;

  useEffect(() => {
    const fetchCapitals = async () => {
      const capitals = [
        "Rio Branco",
        "Maceió",
        "Macapá",
        "Manaus",
        "Salvador",
        "Fortaleza",
        "Brasília",
        "Vitória",
        "Goiânia",
        "São Luís",
        "Cuiabá",
        "Campo Grande",
        "Belo Horizonte",
        "Belém",
        "João Pessoa",
        "Curitiba",
        "Recife",
        "Teresina",
        "Rio de Janeiro",
        "Natal",
        "Porto Alegre",
        "Porto Velho",
        "Boa Vista",
        "Florianópolis",
        "São Paulo",
        "Aracaju",
        "Palmas",
      ];
      const promises = [];

      for (let i = 0; i < capitals.length; i++) {
        const promise = new Promise((resolve, reject) => {
          fetch(`${url}&q=${capitals[i]}`)
            .then((response) => {
              if (response.ok) {
                resolve(response.json());
              } else {
                reject(`HTTP error! status: ${response.status}`);
              }
            })
            .catch((error) => reject(error));
        });
        promises.push(promise);
      }

      Promise.all(promises).then((values) => {
        setCapitalsWeather(values);
      });
    };
    fetchCapitals();
  }, []);

  return (
    <>
      {capitalsWeather === null ? (
        <Loading></Loading>
      ) : (
        <>
          <h3>Capitais</h3>
          <CapitalList capitals={capitalsWeather}></CapitalList>
        </>
      )}
    </>
  );
}
