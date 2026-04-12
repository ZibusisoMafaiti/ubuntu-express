import type { LanguageStop } from '../types'

// Four language stops for the Zimbabwe episode map.
// All text, pronunciation, and story content from EPISODE1_SCRIPT.md.
// Pin colours and IDs match PROGRESS.md Task 10 exactly.

export const languageStops: LanguageStop[] = [
  // ── Victoria Falls — Tonga ──────────────────────────────────────────────────
  {
    id: 'victoria-falls',
    name: 'Victoria Falls',
    region: 'Matabeleland North',
    language: 'Tonga',
    hello: 'Mwasweni',
    helloMeaning: 'Hello / Welcome',
    helloPronunciation: 'mwah-SWAY-nee',
    thanks: 'Ndalumba',
    thanksMeaning: 'Thank you',
    thanksPronunciation: 'n-dah-LOOM-bah',
    backgroundColour: '#1A2A4A',
    pinColour: '#D85A30',
    localChild: {
      name: 'Sitwala',
      initials: 'Si',
      idea: 'Weave thorny acacia branches around the entrance. Poachers cannot reach through without getting hurt — and from the outside, it looks exactly like natural bush.',
      avatarColour: '#E1F5EE',
    },
    animalWisdom: {
      animal: 'Mama Ndlovu',
      text: 'The Tonga people have lived along the Zambezi River for centuries. When Kariba Dam was built in 1958, over fifty thousand Tonga were moved from their homes. They remember everything the river carried away.',
    },
    addressesCamouflage: true,
    addressesAnchoring: false,
  },

  // ── Khami Ruins — Kalanga ──────────────────────────────────────────────────
  {
    id: 'khami-ruins',
    name: 'Khami Ruins',
    region: 'Matabeleland South',
    language: 'Kalanga',
    hello: 'Dumilani',
    helloMeaning: 'Greetings',
    helloPronunciation: 'doo-mee-LAH-nee',
    thanks: 'Ndatenda',
    thanksMeaning: 'Thank you',
    thanksPronunciation: 'n-dah-TEN-dah',
    backgroundColour: '#3A2010',
    pinColour: '#BA7517',
    localChild: {
      name: 'Thandiwe',
      initials: 'Th',
      idea: 'Use dry-stone technique. Stack flat stones carefully — no cement, just good fitting. The walls become part of the landscape. And they last for hundreds of years — just look around you.',
      avatarColour: '#FAEEDA',
    },
    animalWisdom: {
      animal: 'Jabari',
      text: 'Six hundred years. No mortar. No modern tools. Just people who understood how stone fits against stone. Impressive.',
    },
    addressesCamouflage: false,
    addressesAnchoring: true,
  },

  // ── Matobo Hills — Ndebele ─────────────────────────────────────────────────
  {
    id: 'matobo-hills',
    name: 'Matobo Hills',
    region: 'Matabeleland South',
    language: 'Ndebele',
    hello: 'Sawubona',
    helloMeaning: 'I see you',
    helloPronunciation: 'sah-woo-BOH-nah',
    thanks: 'Ngiyabonga',
    thanksMeaning: 'I am grateful',
    thanksPronunciation: 'n-gee-yah-BON-gah',
    backgroundColour: '#1E1A30',
    pinColour: '#534AB7',
    localChild: {
      name: 'Nokukhanya',
      initials: 'No',
      idea: 'Use the shadow underneath a balancing rock. Pangolins are small — the crevices are perfect. And no human being can move a boulder. No poacher can reach inside. This rock has not moved in a million years.',
      avatarColour: '#EEEDFE',
    },
    animalWisdom: {
      animal: 'Baba Kobe',
      text: 'These hills are sacred. The San painted these rocks two thousand years ago. The Ndebele king Mzilikazi called them Amatobo — the bald heads. Every surface here is memory.',
    },
    addressesCamouflage: true,
    addressesAnchoring: true,
    specialMoment:
      '"Dlamini," Nokukhanya said. "Your clan\'s totem is the elephant — indlovu." She glanced at Mama Ndlovu. Mama Ndlovu said nothing. But her eyes were very warm.',
  },

  // ── Great Zimbabwe — Shona (Karanga) ───────────────────────────────────────
  {
    id: 'great-zimbabwe',
    name: 'Great Zimbabwe',
    region: 'Masvingo',
    language: 'Shona (Karanga)',
    hello: 'Mhoro',
    helloMeaning: 'Hello',
    helloPronunciation: 'm-HOH-roh',
    thanks: 'Ndatenda',
    thanksMeaning: 'Thank you',
    thanksPronunciation: 'n-dah-TEN-dah',
    backgroundColour: '#1A2A1A',
    pinColour: '#1D9E75',
    localChild: {
      name: 'Chiedza',
      initials: 'Ch',
      idea: 'Dig it into the shape of a termite mound. Pangolins smell like the earth anyway. And the ochre colour matches the soil perfectly. From the outside, it will be invisible.',
      avatarColour: '#E1F5EE',
    },
    animalWisdom: {
      animal: 'Zuri',
      text: 'Great Zimbabwe was the capital of a kingdom from 1100 to 1450 CE. No mortar — just perfectly fitted granite. Engineers study this site to this day and still cannot fully explain how it was done.',
    },
    addressesCamouflage: true,
    addressesAnchoring: false,
    specialMoment:
      'Siya listened and repeated the word. Mhoro. It sounded different from Sawubona — softer in a different place. Her family\'s language was Ndebele. And this was not Ndebele. She understood for the first time that Zimbabwe had more than one language inside it.',
  },
]
