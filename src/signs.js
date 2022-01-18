/* ---- ESLint Disablers ---- */
/* eslint-disable array-bracket-newline */

/* ---- Sign Class ---- */
/* id, name, affirmation, element, polarity, modality, season, traditionalRuler, modernRuler, bodyRulers, attributes, decans */
const Sign = class {
  /* <- Constructor -> */
  constructor(id, name, affirmation, element, polarity, modality, season, traditionalRuler, modernRuler, bodyRulers, attributes, decans) {
    this.id = id;
    this.name = name;
    this.affirmation = affirmation;
    this.element = element;
    this.polarity = polarity;
    this.modality = modality;
    this.season = season;
    this.traditionalRuler = traditionalRuler;
    this.modernRuler = modernRuler;
    this.bodyRulers = bodyRulers;
    this.attributes = attributes;
    this.decans = decans;
  }

  /* <- Getters -> *
  get id() {
    return this.id;
  }
  get name() {
    return this.name;
  }
  get affirmation() {
    return this.affirmation;
  }
  get element() {
    return this.element;
  }
  get polarity() {
    return this.polarity;
  }
  get modality() {
    return this.modality;
  }
  get season() {
    return this.season;
  }
  get traditionalRuler() {
    return this.traditionalRuler;
  }
  get modernRuler() {
    return this.modernRuler;
  }
  get bodyRulers() {
    return this.bodyRulers;
  }
  get attributes() {
    return this.attributes;
  }
  get decans() {
    return this.decans;
  } */
}

/* ---- Sign Array ---- */
const Signs = [];

/* ---- Sign Objects ---- */
/* <- Aries -> */
let bodyRulers = ['Head', 'Eyes'];
let attributes = ['Enthusiastic', 'Quick-Tempered'];
let decans = [
  { traditionalRuler: 'Mars', sign: 'Aries', degStart: 0 },
  { traditionalRuler: 'Sun', sign: 'Leo', degStart: 10 },
  { traditionalRuler: 'Jupiter', sign: 'Sagittarius', degStart: 20 },
];
const Aries = new Sign(1, 'Aries', 'I am', 'Fire', 'Masculine', 'Cardinal', 'Spring', 'Mars', '', bodyRulers, attributes, decans);
Signs.push(Aries);

/* <- Taurus -> */
bodyRulers = ['Neck', 'Vocal cords', 'Ears'];
attributes = ['Patient', 'Stubborn'];
decans = [
  { traditionalRuler: 'Venus', sign: 'Taurus', degStart: 0 },
  { traditionalRuler: 'Mercury', sign: 'Virgo', degStart: 10 },
  { traditionalRuler: 'Saturn', sign: 'Capricorn', degStart: 20 },
];
const Taurus = new Sign(2, 'Taurus', 'I have', 'Earth', 'Feminine', 'Fixed', 'Spring', 'Venus', '', bodyRulers, attributes, decans);
Signs.push(Taurus);

/* <- Gemini -> */
bodyRulers = ['Hands', 'Lungs', 'Nerves'];
attributes = ['Witty', 'Inconsistent'];
decans = [
  { traditionalRuler: 'Mercury', sign: 'Gemini', degStart: 0 },
  { traditionalRuler: 'Venus', sign: 'Libra', degStart: 10 },
  { traditionalRuler: 'Saturn', modernRuler: 'Uranus', sign: 'Aquarius', degStart: 20 },
];
const Gemini = new Sign(3, 'Gemini', 'I think', 'Air', 'Masculine', 'Mutable', 'Spring', 'Mercury', '', bodyRulers, attributes, decans);
Signs.push(Gemini);

/* <- Cancer -> */
bodyRulers = ['Stomach', 'Chest', 'Breasts'];
attributes = ['Loving', 'Pessimistic'];
decans = [
  { traditionalRuler: 'Moon', sign: 'Cancer', degStart: 0 },
  { traditionalRuler: 'Mars', modernRuler: 'Pluto', sign: 'Scorpio', degStart: 10 },
  { traditionalRuler: 'Jupiter', modernRuler: 'Neptune', sign: 'Pisces', degStart: 20 },
];
const Cancer = new Sign(4, 'Cancer', 'I feel', 'Water', 'Feminine', 'Cardinal', 'Summer', 'Moon', '', bodyRulers, attributes, decans);
Signs.push(Cancer);

/* <- Leo -> */
bodyRulers = ['Heart', 'Spine'];
attributes = ['Optimistic', 'Egoistic'];
decans = [
  { traditionalRuler: 'Sun', sign: 'Leo', degStart: 0 },
  { traditionalRuler: 'Jupiter', sign: 'Sagittarius', degStart: 10 },
  { traditionalRuler: 'Mars', sign: 'Aries', degStart: 20 },
];
const Leo = new Sign(5, 'Leo', 'I will', 'Fire', 'Masculine', 'Fixed', 'Summer', 'Sun', '', bodyRulers, attributes, decans);
Signs.push(Leo);

/* <- Virgo -> */
bodyRulers = ['Abdomen', 'Belly'];
attributes = ['Reliable', 'Judgemental'];
decans = [
  { traditionalRuler: 'Mercury', sign: 'Virgo', degStart: 0 },
  { traditionalRuler: 'Saturn', sign: 'Capricorn', degStart: 10 },
  { traditionalRuler: 'Venus', sign: 'Taurus', degStart: 20 },
];
const Virgo = new Sign(6, 'Virgo', 'I analyze', 'Earth', 'Feminine', 'Mutable', 'Summer', 'Mercury', '', bodyRulers, attributes, decans);
Signs.push(Virgo);

/* <- Libra -> */
bodyRulers = ['Skin', 'Lower back'];
attributes = ['Just', 'Indecisive'];
decans = [
  { traditionalRuler: 'Venus', sign: 'Libra', degStart: 0 },
  { traditionalRuler: 'Saturn', modernRuler: 'Uranus', sign: 'Aquarius', degStart: 10 },
  { traditionalRuler: 'Mercury', sign: 'Gemini', degStart: 20 },
];
const Libra = new Sign(7, 'Libra', 'I balance', 'Air', 'Masculine', 'Cardinal', 'Fall', 'Venus', '', bodyRulers, attributes, decans);
Signs.push(Libra);

/* <- Scorpio -> */
bodyRulers = ['Pelvic region', 'Reproductive organs'];
attributes = ['Ambitious', 'Jealous'];
decans = [
  { traditionalRuler: 'Mars', modernRuler: 'Pluto', sign: 'Scorpio', degStart: 0 },
  { traditionalRuler: 'Jupiter', modernRuler: 'Neptune', sign: 'Pisces', degStart: 10 },
  { traditionalRuler: 'Moon', sign: 'Cancer', degStart: 20 },
];
const Scorpio = new Sign(8, 'Scorpio', 'I desire', 'Water', 'Feminine', 'Fixed', 'Fall', 'Mars', 'Pluto', bodyRulers, attributes, decans);
Signs.push(Scorpio);

/* <- Sagittarius -> */
bodyRulers = ['Pelvic region', 'Reproductive organs'];
attributes = ['Straightforward', 'Careless'];
decans = [
  { traditionalRuler: 'Jupiter', sign: 'Sagittarius', degStart: 0 },
  { traditionalRuler: 'Mars', sign: 'Aries', degStart: 10 },
  { traditionalRuler: 'Sun', sign: 'Leo', degStart: 20 },
];
const Sagittarius = new Sign(9, 'Sagittarius', 'I understand', 'Fire', 'Masculine', 'Mutable', 'Fall', 'Jupiter', '', bodyRulers, attributes, decans);
Signs.push(Sagittarius);

/* <- Capricorn -> */
bodyRulers = ['Joints', 'Hair', 'Teeth'];
attributes = ['Disciplined', 'Shy'];
decans = [
  { traditionalRuler: 'Saturn', sign: 'Capricorn', degStart: 0 },
  { traditionalRuler: 'Venus', sign: 'Taurus', degStart: 10 },
  { traditionalRuler: 'Mercury', sign: 'Virgo', degStart: 20 },
];
const Capricorn = new Sign(10, 'Capricorn', 'I use', 'Earth', 'Feminine', 'Cardinal', 'Winter', 'Saturn', '', bodyRulers, attributes, decans);
Signs.push(Capricorn);

/* <- Aquarius -> */
bodyRulers = ['Calves', 'Ankles'];
attributes = ['Independent', 'Unpredictable'];
decans = [
  { traditionalRuler: 'Saturn', modernRuler: 'Uranus', sign: 'Aquarius', degStart: 0 },
  { traditionalRuler: 'Mercury', sign: 'Gemini', degStart: 10 },
  { traditionalRuler: 'Venus', sign: 'Libra', degStart: 20 },
];
const Aquarius = new Sign(11, 'Aquarius', 'I know', 'Air', 'Masculine', 'Fixed', 'Winter', 'Saturn', 'Uranus', bodyRulers, attributes, decans);
Signs.push(Aquarius);

/* <- Pisces -> */
bodyRulers = ['Calves', 'Ankles'];
attributes = ['Creative', 'Escapist'];
decans = [
  { traditionalRuler: 'Jupiter', modernRuler: 'Neptune', sign: 'Pisces', degStart: 0 },
  { traditionalRuler: 'Moon', sign: 'Cancer', degStart: 10 },
  { traditionalRuler: 'Mars', modernRuler: 'Pluto', sign: 'Scorpio', degStart: 20 },
];
const Pisces = new Sign(12, 'Pisces', 'I believe', 'Water', 'Feminine', 'Mutable', 'Winter', 'Jupiter', 'Neptune', bodyRulers, attributes, decans);
Signs.push(Pisces);

/* ---- Exports Section */
export {
  Signs,
}