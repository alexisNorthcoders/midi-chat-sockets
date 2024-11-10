const maryHadALittleLamb = [
  { note: 'E', duration: 'quarter' }, // Ma
  { note: 'D', duration: 'quarter' }, // ry
  { note: 'C', duration: 'quarter' }, // Had
  { note: 'D', duration: 'quarter' }, // a
  { note: 'E', duration: 'quarter' }, // Lit
  { note: 'E', duration: 'quarter' }, // tle
  { note: 'E', duration: 'quarter' }, // Lamb
  { note: 'D', duration: 'quarter' }, // Lit
  { note: 'D', duration: 'quarter' }, // tle
  { note: 'D', duration: 'quarter' }, // Lamb
  { note: 'E', duration: 'quarter' }, // Lit
  { note: 'G', duration: 'quarter' }, // tle
  { note: 'G', duration: 'quarter' }, // Lamb
  { note: 'E', duration: 'quarter' }, // Ma
  { note: 'D', duration: 'quarter' }, // ry
  { note: 'C', duration: 'quarter' }, // Had
  { note: 'D', duration: 'quarter' }, // a
  { note: 'E', duration: 'quarter' }, // Lit
  { note: 'E', duration: 'quarter' }, // tle
  { note: 'E', duration: 'quarter' }, // Lamb
  { note: 'E', duration: 'quarter' }, // His
  { note: 'D', duration: 'quarter' }, // Fleece
  { note: 'D', duration: 'quarter' }, // was
  { note: 'E', duration: 'quarter' }, // White
  { note: 'D', duration: 'quarter' }, // as
  { note: 'C', duration: 'quarter' }  // Snow
];
const cradleSong = [
  // Line 1: "Lullaby and goodnight" - G G A G F E D
  { note: 'G', duration: 'quarter' }, // Lul
  { note: 'G', duration: 'quarter' }, // la
  { note: 'A', duration: 'quarter' }, // by
  { note: 'G', duration: 'quarter' }, // and
  { note: 'F', duration: 'quarter' }, // good
  { note: 'E', duration: 'quarter' }, // night
  { note: 'D', duration: 'half' },    // (pause)

  // Line 2: "With roses bedight" - G G A G F E D
  { note: 'G', duration: 'quarter' }, // With
  { note: 'G', duration: 'quarter' }, // ro
  { note: 'A', duration: 'quarter' }, // ses
  { note: 'G', duration: 'quarter' }, // be
  { note: 'F', duration: 'quarter' }, // dight
  { note: 'E', duration: 'quarter' }, // (pause)
  { note: 'D', duration: 'half' },    // (pause)

  // Line 3: "With lilies o'er spread" - D D E F E F G
  { note: 'D', duration: 'quarter' }, // With
  { note: 'D', duration: 'quarter' }, // li
  { note: 'E', duration: 'quarter' }, // lies
  { note: 'F', duration: 'quarter' }, // o'er
  { note: 'E', duration: 'quarter' }, // spread
  { note: 'F', duration: 'quarter' }, // (pause)
  { note: 'G', duration: 'half' },    // (pause)

  // Line 4: "Is baby's wee bed" - F F G A G A B
  { note: 'F', duration: 'quarter' }, // Is
  { note: 'F', duration: 'quarter' }, // ba
  { note: 'G', duration: 'quarter' }, // by's
  { note: 'A', duration: 'quarter' }, // wee
  { note: 'G', duration: 'quarter' }, // bed
  { note: 'A', duration: 'quarter' }, // (pause)
  { note: 'B', duration: 'half' }     // (pause)
];
const ringAroundTheRoses = [
 { note: 'G', duration: 'quarter' },
 { note: 'G', duration: 'quarter' },
 { note: 'E', duration: 'quarter' },
 { note: 'A', duration: 'quarter' },
 { note: 'G', duration: 'quarter' },
 { note: 'E', duration: 'quarter' },
 { note: 'F', duration: 'quarter' },
 { note: 'G', duration: 'quarter' },
 { note: 'G', duration: 'quarter' },
 { note: 'E', duration: 'quarter' },
 { note: 'A', duration: 'quarter' },
 { note: 'G', duration: 'quarter' },
 { note: 'E', duration: 'quarter' },
 { note: 'G', duration: 'quarter' },
 { note: 'E', duration: 'quarter' },
 { note: 'G', duration: 'quarter' },
 { note: 'E', duration: 'quarter' },
 { note: 'F', duration: 'quarter' },
 { note: 'G', duration: 'quarter' },
 { note: 'G', duration: 'quarter' },
 { note: 'C', duration: 'quarter' }
]
const chopsticks = [
  // First section: F and G keys for a count of 6
  { note: 'F#', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },
  { note: 'F#', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },
  { note: 'F#', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },

  // Second section: E and G keys for a count of 6
  { note: 'E', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },
  { note: 'E', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },
  { note: 'E', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },

  // Third section: D and B keys for a count of 6
  { note: 'D', duration: 'quarter' },
  { note: 'B', duration: 'quarter' },
  { note: 'D', duration: 'quarter' },
  { note: 'B', duration: 'quarter' },
  { note: 'D', duration: 'quarter' },
  { note: 'B', duration: 'quarter' },

  // Fourth section: C and C keys for a count of 4
  { note: 'C', duration: 'quarter' },
  { note: 'C+', duration: 'quarter' },
  { note: 'C', duration: 'quarter' },
  { note: 'C+', duration: 'quarter' },

  // Repeat: F and G keys for a count of 6
  { note: 'F#', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },
  { note: 'F#', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },
  { note: 'F#', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },

  // Repeat: E and G keys for a count of 6
  { note: 'E', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },
  { note: 'E', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },
  { note: 'E', duration: 'quarter' },
  { note: 'G#', duration: 'quarter' },

  // Repeat: D and B keys for a count of 6
  { note: 'D', duration: 'quarter' },
  { note: 'B', duration: 'quarter' },
  { note: 'D', duration: 'quarter' },
  { note: 'B', duration: 'quarter' },
  { note: 'D', duration: 'quarter' },
  { note: 'B', duration: 'quarter' },

  // End: C and C keys for a count of 4
  { note: 'C', duration: 'quarter' },
  { note: 'C+', duration: 'quarter' },
  { note: 'C', duration: 'quarter' },
  { note: 'C+', duration: 'quarter' }
];
const itsyBitsySpider = [
  // First line: "The Itsy Bitsy Spider" - G C-C C-D E-E
  { note: 'G', duration: 'quarter' }, // The
  { note: 'C', duration: 'eighth' },  // It
  { note: 'C', duration: 'eighth' },  // sy
  { note: 'C', duration: 'eighth' },  // Bit
  { note: 'D', duration: 'eighth' },  // sy
  { note: 'E', duration: 'quarter' }, // Spi
  { note: 'E', duration: 'quarter' }, // der

  // Second line: "Went up the water spout" - E-D C-D E C
  { note: 'E', duration: 'eighth' },  // Went
  { note: 'D', duration: 'eighth' },  // up
  { note: 'C', duration: 'eighth' },  // the
  { note: 'D', duration: 'eighth' },  // wat
  { note: 'E', duration: 'quarter' }, // er
  { note: 'C', duration: 'quarter' }, // spout

  // Third line: "Down came the rain and washed the spider out" - E E F G G F E F G E
  { note: 'E', duration: 'eighth' },  // Down
  { note: 'E', duration: 'eighth' },  // came
  { note: 'F', duration: 'eighth' },  // the
  { note: 'G', duration: 'eighth' },  // rain
  { note: 'G', duration: 'eighth' },  // And
  { note: 'F', duration: 'eighth' },  // washed
  { note: 'E', duration: 'eighth' },  // the
  { note: 'F', duration: 'eighth' },  // spi
  { note: 'G', duration: 'eighth' },  // der
  { note: 'E', duration: 'quarter' }, // out

  // Fourth line: "Out came the sun and dried up all the rain" - C C D E E D C D E C
  { note: 'C', duration: 'eighth' },  // Out
  { note: 'C', duration: 'eighth' },  // came
  { note: 'D', duration: 'eighth' },  // the
  { note: 'E', duration: 'eighth' },  // sun
  { note: 'E', duration: 'eighth' },  // and
  { note: 'D', duration: 'eighth' },  // dried
  { note: 'C', duration: 'eighth' },  // up
  { note: 'D', duration: 'eighth' },  // all
  { note: 'E', duration: 'eighth' },  // the
  { note: 'C', duration: 'quarter' }, // rain

  // Fifth line: "And the Itsy Bitsy Spider climbed up the spout again" - G C-C C-D E-E E-D C-D E C
  { note: 'C', duration: 'eighth' },  // and
  { note: 'G', duration: 'quarter' }, // The
  { note: 'C', duration: 'eighth' },  // It
  { note: 'C', duration: 'eighth' },  // sy
  { note: 'C', duration: 'eighth' },  // Bit
  { note: 'D', duration: 'eighth' },  // sy
  { note: 'E', duration: 'quarter' }, // Spi
  { note: 'E', duration: 'quarter' }, // der
  { note: 'E', duration: 'eighth' },  // Climbed
  { note: 'D', duration: 'eighth' },  // up
  { note: 'C', duration: 'eighth' },  // the
  { note: 'D', duration: 'eighth' },  // spout
  { note: 'E', duration: 'quarter' }, // a
  { note: 'C', duration: 'quarter' }  // gain
];

const jingleBells = [
  // First part: "Jingle Bells" (repeated) - E-E E E-E E
  { note: 'E', duration: 'eighth' }, // Jin
  { note: 'E', duration: 'eighth' }, // gle
  { note: 'E', duration: 'quarter' }, // Bells
  { note: 'E', duration: 'eighth' }, // Jin
  { note: 'E', duration: 'eighth' }, // gle
  { note: 'E', duration: 'quarter' }, // Bells

  // Second part: "Jingle all the way" - E G C D E
  { note: 'E', duration: 'quarter' }, // Jin
  { note: 'G', duration: 'quarter' }, // gle
  { note: 'C', duration: 'quarter' }, // all
  { note: 'D', duration: 'quarter' }, // the
  { note: 'E', duration: 'half' },    // way

  // Third part: "Oh, what fun it is" - F F F F F
  { note: 'F', duration: 'eighth' },  // Oh
  { note: 'F', duration: 'eighth' },  // what
  { note: 'F', duration: 'eighth' },  // fun
  { note: 'F', duration: 'eighth' },  // it
  { note: 'F', duration: 'eighth' },  // is

  // Fourth part: "to ride" - E E
  { note: 'E', duration: 'quarter' }, // to
  { note: 'E', duration: 'quarter' }, // ride

  // Fifth part: "In a one-horse op-en sleigh hey" - E E E-D D-E D G
  { note: 'E', duration: 'eighth' },  // In
  { note: 'E', duration: 'eighth' },  // a
  { note: 'E', duration: 'eighth' },  // one
  { note: 'D', duration: 'eighth' },  // horse
  { note: 'D', duration: 'eighth' },  // op
  { note: 'E', duration: 'eighth' },  // en
  { note: 'D', duration: 'quarter' }, // sleigh
  { note: 'G', duration: 'quarter' }, // hey

  // Repeat: "Jingle Bells (x2), Jingle all the way, Oh what fun it is to ride"

  // Jingle Bells (x2) - E-E E E-E E
  { note: 'E', duration: 'eighth' },  // Jin
  { note: 'E', duration: 'eighth' },  // gle
  { note: 'E', duration: 'eighth' },  // Bells
  { note: 'E', duration: 'eighth' },  // Jin
  { note: 'E', duration: 'eighth' },  // gle
  { note: 'E', duration: 'eighth' },  // Bells

  // "Jingle all the way" - E G C D E
  { note: 'E', duration: 'quarter' }, // Jin
  { note: 'G', duration: 'quarter' }, // gle
  { note: 'C', duration: 'quarter' }, // all
  { note: 'D', duration: 'quarter' }, // the
  { note: 'E', duration: 'half' },    // way

  // "Oh what fun it is" - F F F F F
  { note: 'F', duration: 'eighth' },  // Oh
  { note: 'F', duration: 'eighth' },  // what
  { note: 'F', duration: 'eighth' },  // fun
  { note: 'F', duration: 'eighth' },  // it
  { note: 'F', duration: 'eighth' },  // is

  // "to ride" - E E
  { note: 'E', duration: 'quarter' }, // to
  { note: 'E', duration: 'quarter' }, // ride

  // Last part: "In a one-horse op-en sleigh" - E E G G F D C
  { note: 'E', duration: 'quarter' }, // In
  { note: 'E', duration: 'quarter' }, // a
  { note: 'G', duration: 'quarter' }, // one
  { note: 'G', duration: 'quarter' }, // horse
  { note: 'F', duration: 'quarter' }, // op
  { note: 'D', duration: 'quarter' }, // en
  { note: 'C', duration: 'half' }     // sleigh
];
const oldMacDonald = [
      { note: 'F', duration: 'quarter' },
      { note: 'F', duration: 'quarter' },
      { note: 'F', duration: 'quarter' },
      { note: 'C', duration: 'quarter' },
      { note: 'D', duration: 'quarter' },
      { note: 'D', duration: 'quarter' },
      { note: 'C', duration: 'half' },
      { note: 'A', duration: 'quarter' },
      { note: 'A', duration: 'quarter' },
      { note: 'G', duration: 'quarter' },
      { note: 'G', duration: 'quarter' },
      { note: 'F', duration: 'half' }
  ];
const twinkletwinkle=[
    { note:'C',duration:'quarter'},
    { note:'C',duration:'quarter'},
    { note:'G',duration:'quarter'},
    { note:'G',duration:'quarter'},
    { note:'A',duration:'quarter'},
    { note:'A',duration:'quarter'},
    { note:'G',duration:'half'},
    { note:'F',duration:'quarter'},
    { note:'F',duration:'quarter'},
    { note:'E',duration:'quarter'},
    { note:'E',duration:'quarter'},
    { note:'D',duration:'quarter'},
    { note:'D',duration:'quarter'},
    { note:'C',duration:'half'},
    { note:'G',duration:'quarter'},
    { note:'G',duration:'quarter'},
    { note:'F',duration:'quarter'},
    { note:'F',duration:'quarter'},
    { note:'E',duration:'quarter'},
    { note:'E',duration:'quarter'},
    { note:'D',duration:'half'},
    { note:'G',duration:'quarter'},
    { note:'G',duration:'quarter'},
    { note:'F',duration:'quarter'},
    { note:'F',duration:'quarter'},
    { note:'E',duration:'quarter'},
    { note:'E',duration:'quarter'},
    { note:'D',duration:'half'},
    { note:'C',duration:'quarter'},
    { note:'C',duration:'quarter'},
    { note:'G',duration:'quarter'},
    { note:'G',duration:'quarter'},
    { note:'A',duration:'quarter'},
    { note:'A',duration:'quarter'},
    { note:'G',duration:'half'},
    { note:'F',duration:'quarter'},
    { note:'F',duration:'quarter'},
    { note:'E',duration:'quarter'},
    { note:'E',duration:'quarter'},
    { note:'D',duration:'quarter'},
    { note:'D',duration:'quarter'},
    { note:'C',duration:'half'},

    
  ]
  const wheelsbus =[
    {note:"C",duration:"quarter"},
    {note:"F",duration:"quarter"},
    {note:"F",duration:"eighth"},
    {note:"F",duration:"eighth"},
    {note:"F",duration:"eighth"},
    {note:"A",duration:"quarter"},
    {note:"C+",duration:"half"},
    {note:"A",duration:"quarter"},
    {note:"F",duration:"quarter"},
    {note:"G",duration:"half"},
    {note:"E",duration:"quarter"},
    {note:"C",duration:"quarter"},
    {note:"C+",duration:"half"},
    {note:"A",duration:"quarter"},
    {note:"F",duration:"quarter"},
    {note:"C",duration:"quarter"},
    {note:"F",duration:"quarter"},
    {note:"F",duration:"eighth"},
    {note:"F",duration:"eighth"},
    {note:"F",duration:"eighth"},
    {note:"A",duration:"quarter"},
    {note:"C+",duration:"quarter"},
    {note:"A",duration:"quarter"},
    {note:"F",duration:"quarter"},
    {note:"G",duration:"quarter"},
    {note:"C",duration:"quarter"},
    {note:"C",duration:"quarter"},
    {note:"F",duration:"quarter"},
  ]