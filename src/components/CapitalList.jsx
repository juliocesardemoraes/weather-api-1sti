import "./styles/capitalList.scss";

export default function CapitalList({ capitals }) {
  return (
    <div className="capitals">
      <ul className="capitals__list">
        <div className="empty"></div>
        <li className="max">max</li>
        <li className="min">min</li>
      </ul>
      <ul className="capitals__list">
        <div className="empty"></div>
        <li className="max">max</li>
        <li className="min">min</li>
      </ul>
      {capitals?.map((item, index) => {
        return (
          <div key={index}>
            <ul className="capitals__list">
              <li className="name">{item?.location.name}</li>
              <li className="max">
                {item?.forecast.forecastday[0].day.mintemp_c}
              </li>
              <li className="min">
                {item?.forecast.forecastday[0].day.maxtemp_c}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
