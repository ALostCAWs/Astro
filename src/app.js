/* <-- ESLint Disablers --> */
/* eslint-disable no-unused-vars */

/* <-- Imports --> */
import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import {
  createInstances,
  // findStellia,
  // horoscope
} from './astro.js';
import './main.css';

/* <-- Navigation UI --> */
function Nav() {
  // Return UI
  return (
    <nav>
      <a href="https://keighly.ca">
        <h1>Keighly.ca</h1>
      </a>
      <ul>
        <li><a href="https://github.com/ALostCAWs"
          target="_blank"
          rel="noopener noreferrer">GitHub</a></li>
        <li><a href="https://keighly.ca">Gallery</a></li>
      </ul>
    </nav>
  );
}

// const AstroDisplay = ({ year }) => {
//   console.log(year);

// const planets = horoscope._celestialBodies.all;

// console.log('forEach testing . . .');

// const signArr = [];
// const houseArr = [];
// const signSet = new Set();
// const houseSet = new Set();
// planets.forEach(planet => {
//   const name = planet.key;
//   const sign = planet.Sign.key;
//   const house = planet.House.id;

//   console.log(`${name}      |   ${sign}   |   ${house}`);
//   if (name !== 'sirius' && name !== 'chiron') {
//     signArr.push(sign);
//     houseArr.push(house);
//     signSet.add(sign);
//     houseSet.add(house);
//   }
// });

// signSet.forEach(sign => {
//   console.log(sign);
//   const numOfSign = findStellia(signArr, sign);
//   console.log(`${numOfSign} placements in ${sign}`);
// });

// houseSet.forEach(house => {
//   console.log(house);
//   const numOfHouse = findStellia(houseArr, house);
//   console.log(`${numOfHouse} placements in house # ${house}`);
// });

//   // render() {
//   return (
//     <>
//       <p>`Horoscope`</p>
//     </>
//   );
//   // }
// }

const AstroDisplay = ({ horoscope }) => {
  /* <-- Initial Logs --> */
  console.log(`. . .`);
  console.log(`Birth Chart:`);
  console.log(horoscope);
  console.log(`. . .`);

  /* <-- Date Logs --> */
  const origin = horoscope.origin;
  console.log(`${origin.year}-${origin.month}-${origin.date} ${origin.hour}:${origin.minute}`);

  /* <-- Planet, Sign, House Logs --> */
  const planets = horoscope._celestialBodies.all;
  planets.forEach(planet => {
    const signArr = [];
    const houseArr = [];
    const signSet = new Set();
    const houseSet = new Set();
    const name = planet.key;
    const sign = planet.Sign.key;
    const house = planet.House.id;
    const degrees = planet.ChartPosition.Ecliptic.ArcDegreesFormatted30;
    const output = planet.isRetrograde ? `${degrees}r` : `${degrees}`;

    if (name !== 'sirius' && name !== 'chiron') {
      signArr.push(sign);
      houseArr.push(house);
      signSet.add(sign);
      houseSet.add(house);
    }

    console.log(`${name}  |  ${sign}  | ${house}`);
    console.log(output);
    console.log(planet.ChartPosition);
  });

  return (
    <>
      <p>{horoscope._houseSystem}</p>
    </>
  );
}

const CreateHoroscope = ({ chartData }) => {
  /* <-- Horoscope --> */
  const horoscope = createInstances(
    chartData.year,
    chartData.month,
    chartData.day,
    chartData.hour,
    chartData.minute,
    chartData.latitude,
    chartData.longitude
  );

  /* <-- Return UI --> */
  return (
    <>
      {chartData.type === 'moment' ? (
        <ChartOfTheMoment horoscope={horoscope} />
      ) : (
        <AstroDisplay horoscope={horoscope} />
      )}
    </>
  );
}

const AstroForm = ({ birthData }) => {
  /* <- Hooks -> */
  // State
  const [formValues, setValues] = useState({
    year: 1998,
    month: 2,
    day: 29,
    hour: 9,
    minute: 10,
    latitude: 43.14,
    longitude: -80.25,
  });
  const [submit, setSubmit] = useState(false);

  // Effect
  useEffect(() => {
    // console.log(formValues);
    // for (const [key, value] of Object.entries(birthData)) {
    //   console.log(`${key}: ${value}`);
    // }
  }, [formValues])

  /* <- Handle Input Changes & Form Submission -> */
  const handleChange = async (e) => {
    setValues({ ...formValues, [e.target.name]: e.target.value });
    birthData[e.target.name] = e.target.value;
  }

  /* <-- Return UI --> */
  return (
    <>
      <article>
        {!submit ? (
          <form action='' id='birth-data'>
            <label htmlFor='year'>Year:</label>
            <input type='text' id='year' name='year' value={formValues.year} onChange={handleChange} />
            <label htmlFor='month'>Month:</label>
            <input type='text' id='month' name='month' value={formValues.month} onChange={handleChange} />
            <label htmlFor='day'>Day:</label>
            <input type='text' id='day' name='day' value={formValues.day} onChange={handleChange} />
            <label htmlFor='hour'>Hour:</label>
            <input type='text' id='hour' name='hour' value={formValues.hour} onChange={handleChange} />
            <label htmlFor='minute'>Minute:</label>
            <input type='text' id='minute' name='minute' value={formValues.minute} onChange={handleChange} />
            <label htmlFor='latitude'>Latitude:</label>
            <input type='text' id='latitude' name='latitude' value={formValues.latitude} onChange={handleChange} />
            <label htmlFor='longitude'>Longitude:</label>
            <input type='text' id='longitude' name='longitude' value={formValues.longitude} onChange={handleChange} />
            <button type='button' id='submit' name='submit' onClick={() => setSubmit(true)}>Calculate Chart</button>
          </form>
        ) : (
          <CreateHoroscope chartData={birthData} />
        )}
      </article>
    </>
  );
}

const ChartOfTheMoment = ({ horoscope }) => {

  /* <-- Initial Logs --> */
  console.log(`Chart of the Moment:`);
  console.log(horoscope);
  console.log(`. . .`);

  /* <-- Date Logs --> */
  const origin = horoscope.origin;
  console.log(`${origin.year}-${origin.month}-${origin.date} ${origin.hour}:${origin.minute}`);

  /* <-- Planet, Sign, House Logs --> */
  const planets = horoscope._celestialBodies.all;
  planets.forEach(planet => {
    const name = planet.key;
    const sign = planet.Sign.key;
    const house = planet.House.id;
    const degrees = planet.ChartPosition.Ecliptic.ArcDegreesFormatted30;
    const output = planet.isRetrograde ? `${degrees}r` : `${degrees}`;

    console.log(`${name}  |  ${sign}  | ${house}`);
    console.log(output);
    console.log(planet.ChartPosition);
  });

  // console.log('forEach testing . . .');

  // const signArr = [];
  // const houseArr = [];
  // const signSet = new Set();
  // const houseSet = new Set();
  // planets.forEach(planet => {
  //   const name = planet.key;
  //   const sign = planet.Sign.key;
  //   const house = planet.House.id;

  //   console.log(`${name}      |   ${sign}   |   ${house}`);
  //   if (name !== 'sirius' && name !== 'chiron') {
  //     signArr.push(sign);
  //     houseArr.push(house);
  //     signSet.add(sign);
  //     houseSet.add(house);
  //   }
  // });

  // signSet.forEach(sign => {
  //   console.log(sign);
  //   const numOfSign = findStellia(signArr, sign);
  //   console.log(`${numOfSign} placements in ${sign}`);
  // });

  // houseSet.forEach(house => {
  //   console.log(house);
  //   const numOfHouse = findStellia(houseArr, house);
  //   console.log(`${numOfHouse} placements in house # ${house}`);
  // });

  /* <-- Return UI --> */
  return (
    <>
      <article>
        <h2>Chart of The Moment</h2>
      </article>
    </>
  );
}

/* <- PropTypes -> */
ChartOfTheMoment.propTypes = {
  horoscope: object
}
AstroForm.propTypes = {
  birthData: object
}
CreateHoroscope.propTypes = {
  chartData: object
}
AstroDisplay.propTypes = {
  horoscope: object
}

/* <- Defaults -> */
const moment = new Date();
const MOMENTDATA = {
  type: 'moment',
  year: moment.getFullYear(),
  month: moment.getMonth(),
  day: moment.getDate(),
  hour: moment.getHours(),
  minute: moment.getMinutes(),
  latitude: 43.14,
  longitude: -80.25,
}
const BIRTHDATA = {
  type: 'birth',
  year: 1998,
  month: 2,
  day: 29,
  hour: 9,
  minute: 10,
  latitude: 43.14,
  longitude: -80.25
};

/* <- App() -> */
function App() {
  return (
    <>
      <Nav />
      <CreateHoroscope chartData={MOMENTDATA} />
      <AstroForm birthData={BIRTHDATA} />
    </>
  );
}
export default App;