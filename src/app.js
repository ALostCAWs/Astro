/* eslint-disable no-unused-vars */
/*
  ---- Imports ----
*/
import React, { Component, useState, useEffect } from 'react';
import { object } from 'prop-types';
import {
  createInstances,
  findStellia,
  // horoscope
} from './astro.js';
import './main.css';

/*
  ---- Navigation UI ----
*/
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

//   //const planets = horoscope._celestialBodies.all;

//   // console.log('forEach testing . . .');

//   // const signArr = [];
//   // const houseArr = [];
//   // const signSet = new Set();
//   // const houseSet = new Set();
//   // planets.forEach(planet => {
//   //   const name = planet.key;
//   //   const sign = planet.Sign.key;
//   //   const house = planet.House.id;

//   //   console.log(`${name}      |   ${sign}   |   ${house}`);
//   //   if (name !== 'sirius' && name !== 'chiron') {
//   //     signArr.push(sign);
//   //     houseArr.push(house);
//   //     signSet.add(sign);
//   //     houseSet.add(house);
//   //   }
//   // });

//   // signSet.forEach(sign => {
//   //   console.log(sign);
//   //   const numOfSign = findStellia(signArr, sign);
//   //   console.log(`${numOfSign} placements in ${sign}`);
//   // });

//   // houseSet.forEach(house => {
//   //   console.log(house);
//   //   const numOfHouse = findStellia(houseArr, house);
//   //   console.log(`${numOfHouse} placements in house # ${house}`);
//   //});

//   // render() {
//   return (
//     <>
//       <p>`Horoscope`</p>
//     </>
//   );
//   // }
// }
const AstroForm = (props) => {
  /* <- Constructor -> REMOVE*/
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     year: 1998,
  //     month: 2,
  //     day: 29,
  //     hour: 9,
  //     minute: 10,
  //     latitude: 43.14,
  //     longitude: -80.25,
  //     submit: false
  //   }
  // }

  // useState Hook
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

  // useEffect hooks
  useEffect(() => {
    console.log(formValues);
  }, [formValues])

  // useEffect(() => { setSubmit(true) });

  const handleChange = async (e) => {
    setValues({ ...formValues, [e.target.name]: e.target.value });
    // console.log(allValues);
  }

  // /* <- Handle Input Changes & Form Submission -> */
  // const handleChanges = async (e) => {
  //   //let birthData = this.props.birthData;
  //   const name = e.target.name;
  //   let value;

  //   if (name === 'submit') {
  //     // Handle form submission

  //     // Update submit state
  //     e.preventDefault();
  //     value = true;

  //     // const horoscope = await createInstances(
  //     //   birthData.year,
  //     //   birthData.month,
  //     //   birthData.day,
  //     //   birthData.hour,
  //     //   birthData.minute,
  //     //   birthData.latitude,
  //     //   birthData.longitude
  //     // );
  //     // console.log(birthData);
  //     // console.log(horoscope);
  //   } else {
  //     // Handle input change
  //     value = e.target.value;
  //     //birthData[name] = value;
  //     //console.log(birthData[name]);
  //   }

  //   // Update state
  //   // await this.setState({
  //   //   [name]: value
  //   // });
  // }

  /*
    ---- Return UI ----
  */
  // render() {
  // const birthData = this.props.birthData;
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
          <p>submitted</p>
        )}
      </article>
    </>
  );
  // }
}

// class Test extends Component {
//   render() {
//     const birthData = this.props.birthData;
//     birthData.year = 2000;
//     return (
//       <>
//         <article>
//           <p>birthData: {birthData.year}</p>
//         </article>
//       </>
//     );
//   }
// }

AstroForm.defaultProps = {
  birthData: [
    {
      year: 1998,
      month: 2,
      day: 29,
      hour: 9,
      minute: 10,
      latitude: 43.14,
      longitude: -80.25
    }
  ]
}

AstroForm.propTypes = {
  birthData: object
}

const BIRTHDATA = {
  year: 1998,
  month: 2,
  day: 29,
  hour: 9,
  minute: 10,
  latitude: 43.14,
  longitude: -80.25
};

function App() {
  return (
    <>
      <Nav />
      <AstroForm birthData={BIRTHDATA} />
      {/* <AstroDisplay /> */}
    </>
  );
}

export default App;