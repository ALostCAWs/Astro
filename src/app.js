/* ---- Imports Section */
import React, { useState, useEffect } from 'react';
import { object, array, bool } from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { Signs } from './signs.js';
import { createInstances } from './astro.js';
import { Nav } from './nav.js';
import {
  MOMENTDATA,
  BIRTHDATA,
  MONTHS,
  DAYS,
  HOURS,
  MINUTES,
  ZODIACS,
  HOUSESYSTEMS,
} from './defaultData.js';
import {
  GetDateTimeLocationMethods,
  GetSignHouseSets,
} from './getData.js';
import {
  DisplayPlanetData,
  DisplayHouseData,
} from './displayData';
import './main.css';
/* End ---- */

/* ---- Birth Chart Display ---- */
const BirthChart = ({ horoscope, unknown }) => {
  /* <-- Initial Logs --> */
  console.log(`%cBirth Chart`, 'border: 1px solid white; padding: 10px ;');
  console.log(horoscope);

  /* <-- Date Logs --> */
  const origin = horoscope.origin;

  /* <-- Planet, Sign, House Logs --> */
  const planets = horoscope._celestialBodies.all;
  const houses = horoscope._houses;
  console.log(`%cHouses`, 'border: 1px solid white; padding: 10px ;');
  console.log(houses);

  return (
    <>
      <article className='birth'>
        <h2>Birth Chart</h2>
        <div>
          <GetDateTimeLocationMethods
            origin={origin}
            zodiac={horoscope._zodiac}
            houseSystem={horoscope._houseSystem}
            unknown={unknown}
          />
        </div>
        <div className='chart'>
          {planets.map((planet) => (
            <>
              <DisplayPlanetData
                planet={planet}
                unknown={unknown}
              />
            </>
          ))}
        </div>
        <h3>House Placements</h3>
        <div className='houses'>
          {!unknown ? (
            <>
              {houses.map((house) => (
                <>
                  <DisplayHouseData house={house} />
                </>
              ))
              }
            </>
          ) : (null)}
        </div>
        <h3>Stellia</h3>
        <div className='stellia'>
          <GetSignHouseSets planets={planets} unknown={unknown} />
        </div>
      </article>
    </>
  );
}

/* ---- Moment Chart Display ---- */
const ChartOfTheMoment = ({ horoscope }) => {
  /* <-- Initial Logs --> */
  console.log(`%cMoment Chart`, 'border: 1px solid white; padding: 10px ;');
  console.log(horoscope);

  /* <-- Variable Declarations --> */
  const origin = horoscope.origin;
  const planets = horoscope._celestialBodies.all;
  const houses = horoscope._houses;
  console.log(`%cHouses`, 'border: 1px solid white; padding: 10px ;');
  console.log(houses);

  /* <-- Return UI --> */
  return (
    <>
      <article className='moment'>
        <h2>Chart of The Moment</h2>
        <div>
          <GetDateTimeLocationMethods
            origin={origin}
            zodiac={horoscope._zodiac}
            houseSystem={horoscope._houseSystem}
          />
        </div>
        <div className='chart'>
          {planets.map((planet) => (
            <>
              <DisplayPlanetData planet={planet} />
            </>
          ))}
        </div>
        <h3>Current Houses</h3>
        <div className='houses'>
          {houses.map((house) => (
            <>
              <DisplayHouseData house={house} />
            </>
          ))}
        </div>
        <h3>Current Stellia</h3>
        <div className='stellia'>
          <GetSignHouseSets planets={planets} />
        </div>
      </article>
    </>
  );
}

/* ---- Chart Creation ---- */
const CreateHoroscope = ({ chartData }) => {
  /* <-- Horoscope --> */
  const horoscope = createInstances(
    chartData.year,
    chartData.month,
    chartData.day,
    chartData.hour,
    chartData.minute,
    chartData.latitude,
    chartData.longitude,
    chartData.zodiac,
    chartData.houseSystem
  );

  /* <-- Return UI --> */
  return (
    <>
      {chartData.type === 'moment' ? (
        <ChartOfTheMoment horoscope={horoscope} />
      ) : (
        <BirthChart
          horoscope={horoscope}
          unknown={chartData.unknown}
        />
      )}
    </>
  );
}

/* ---- Form Display ---- */
const AstroForm = ({ birthData, months, days, hours, minutes, zodiacs, houseSystems }) => {
  /* ---- Hooks ---- */
  /* <- State -> */
  const [formValues, setValues] = useState({
    year: 1998,
    month: 2,
    day: 29,
    hour: 9,
    minute: 10,
    latitude: 43.14,
    longitude: -80.25,
    zodiac: 'tropical',
    houseSystem: 'placidus',
  });
  const [unknown, setUnknown] = useState(false);
  const [useLocation, setLocation] = useState(false);
  const [submit, setSubmit] = useState(false);

  /* <- Effect -> */
  // formValues
  useEffect(() => {
    // console.log(formValues);
    // for (const [key, value] of Object.entries(birthData)) {
    //   console.log(`${key}: ${value}`);
    // }
  }, [formValues])

  // unknown
  useEffect(() => {
    if (unknown) {
      // Update birthData
      birthData.unknown = true;
      birthData.hour = 0;
      birthData.minute = 0;
      // Update form
      setValues({
        ...formValues,
        hour: 0,
        minute: 0
      });
    } else {
      birthData.unknown = false;
    }
  }, [unknown]);

  // useLocation
  useEffect(() => {
    if (useLocation) {
      /* <- Use Location -> */
      // Success
      const successFunction = async (position) => {
        // Process Data
        const lat = Math.round((position.coords.latitude + Number.EPSILON) * 100) / 100
        const lon = Math.round((position.coords.longitude + Number.EPSILON) * 100) / 100
        // momentChart
        MOMENTDATA.latitude = lat;
        MOMENTDATA.longitude = lon;
        // birthChart
        setValues({
          ...formValues,
          latitude: lat,
          longitude: lon,
        });
      }
      // Error
      const errorFunction = () => {
        alert('Error in retrieving current location.');
      }
      // Get location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
      } else {
        alert('It seems like Geolocation, which is required for this function, is not enabled in your browser.');
      }
    } else {
      /* <- Undo Use Location -> */
      // momentChart
      MOMENTDATA.latitude = 0;
      MOMENTDATA.longitude = 0;
      // birthChart
      setValues({
        ...formValues,
        latitude: 0.00,
        longitude: 0.00
      });
    }
  }, [useLocation]);

  /* <- Handle Input Changes & Form Submission -> */
  const handleChange = (e) => {
    setValues({ ...formValues, [e.target.name]: e.target.value });
    birthData[e.target.name] = e.target.value;

    if (e.target.name === 'zodiac' || e.target.name === 'houseSystem') {
      MOMENTDATA[e.target.name] = e.target.value;
    }
  }

  /* <-- Return UI --> */
  return (
    <>
      {!submit ? (
        <>
          <article>
            <h2>Enter Birth Info</h2>
            <form action='' id='birth-data'>
              <div className="date">
                <label htmlFor='year' className='date'>Year:</label>
                <input type='number' id='year' className='date' name='year' value={formValues.year} onChange={handleChange} />
                <label htmlFor='month' className='date'>Month:</label>
                <select id='month' className='date' name='month' value={formValues.month} onChange={handleChange}>
                  {months.map((month) => <option key={month.value} value={month.value}>{month.label}</option>)}
                </select>
                <label htmlFor='day' className='date'>Day:</label>
                <select id='day' className='date' name='day' value={formValues.day} onChange={handleChange}>
                  {days.map((day) => <option key={day} value={day}>{day}</option>)}
                </select>
              </div>

              <div className="time">
                <label htmlFor='hour' className='time'>Hour:</label>
                <select id='hour' className='time' name='hour' value={formValues.hour} onChange={handleChange} disabled={unknown}>
                  {hours.map((hour) => <option key={hour.value} value={hour.value}>{hour.label}</option>)}
                </select>
                <label htmlFor='minute' className='time'>Minute:</label>
                <select id='minute' className='time' name='minute' value={formValues.minute} onChange={handleChange} disabled={unknown}>
                  {minutes.map((min) => <option key={min} value={min}>{min}</option>)}
                </select>
                <label htmlFor='unknown' className='unknown'>Unknown:</label>
                <input type='checkbox' id='unknown' className='unknown' name='unknown' value={unknown} onChange={() => setUnknown(unknown => !unknown)}></input>
              </div>


              <div className="location">
                <label htmlFor='latitude' className='location'>Latitude:</label>
                <input type='number' id='latitude' className='location' name='latitude' min='-90.00' max='90.00' value={formValues.latitude} onChange={handleChange} />
                <label htmlFor='longitude' className='location'>Longitude:</label>
                <input type='number' id='longitude' className='location' name='longitude' min='-90.00' max='90.00' value={formValues.longitude} onChange={handleChange} />
                <button type='button' id='useLocation' className='location' name='useLocation' onClick={() => setLocation(useLocation => !useLocation)}>Use my Location</button>
              </div>

              <div className="system">
                <label htmlFor='zodiac' className='system'>Zodiac:</label>
                <select id='zodiac' className='system' name='zodiac' value={formValues.zodiacType} onChange={handleChange}>
                  {zodiacs.map((zodiac) => <option key={zodiac.value} value={zodiac.value}>{zodiac.label}</option>)}
                </select>
                <label htmlFor='houseSystem' className='system'>System:</label>
                <select id='houseSystem' className='system' name='houseSystem' value={formValues.zodiacType} onChange={handleChange}>
                  {houseSystems.map((system) => <option key={system.value} value={system.value}>{system.label}</option>)}
                </select>
              </div>
              <button type='button' id='submit' name='submit' onClick={() => setSubmit(true)}>Calculate Chart</button>
            </form>
          </article>
        </>
      ) : (
        <CreateHoroscope chartData={birthData} />
      )}
      <CreateHoroscope chartData={MOMENTDATA} />
    </>
  );
}

/* <- App() -> */
function App() {
  return (
    <>
      <Nav />
      <AstroForm
        birthData={BIRTHDATA}
        months={MONTHS}
        days={DAYS}
        hours={HOURS}
        minutes={MINUTES}
        zodiacs={ZODIACS}
        houseSystems={HOUSESYSTEMS}
      />
    </>
  );
}
export default App;

/* <- PropTypes -> */
AstroForm.propTypes = {
  birthData: object,
  months: array,
  days: array,
  hours: array,
  minutes: array,
  zodiacs: array,
  houseSystems: array,
}
CreateHoroscope.propTypes = {
  chartData: object,
}
ChartOfTheMoment.propTypes = {
  horoscope: object
}
BirthChart.propTypes = {
  horoscope: object,
  unknown: bool,
}