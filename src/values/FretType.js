// jshint module:true

let FretType = {
  FRET0: 'fret0',
  FRET1: 'fret1',
  FRET2: 'fret2',
  FRET3: 'fret3',
  FRET4: 'fret4',
  FRET5: 'fret5',
  FRET6: 'fret6',
  FRET7: 'fret7',
  FRET8: 'fret8',
  FRET9: 'fret9'
};

FretType.values = [
  FretType.FRET0,
  FretType.FRET1,
  FretType.FRET2,
  FretType.FRET3,
  FretType.FRET4,
  FretType.FRET5,
  FretType.FRET6,
  FretType.FRET7,
  FretType.FRET8,
  FretType.FRET9
];

FretType.isValid = function (value) {
  return FretType.values.includes(value);
};

export default FretType;
