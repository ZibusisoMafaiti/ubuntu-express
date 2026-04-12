# The Ubuntu Express — Episode 1
## "Help Save the Pangolins"
### Full Script — Panel by Panel

---

> **How to read this document**
>
> Every panel has two versions:
>
> **SCREEN TEXT** — what appears on screen in large letters. One sentence max.
> A 5-year-old sees this while a parent reads aloud.
>
> **NARRATION** — what plays as audio in the creator's voice (via ElevenLabs).
> Richer and warmer. This is what gets recorded.
>
> Screen text → `text` field in data files.
> Narration → `narration` field.
> Audio path → `audioUrl` field (empty string `""` until files are recorded).
> Component must handle empty `audioUrl` silently — no errors.

---

## TRANSITION ANIMATION
### Triggered when child taps Zimbabwe on the landing page Africa map.
### NOT the story yet. Pure visual. 10–15 seconds. No dialogue.

```
SEQUENCE:
1. Calgary at night — Ubuntu Express lifts from the ground
   City lights below. Snow on rooftops. Stars above. Clock: 11:58 PM.

2. The ship rises — arcing up and away across the screen
   Stars streak past.

3. Ocean below — the Atlantic, dark and vast

4. Sunrise on the horizon — burnt orange, then gold
   Africa appears below, warm and alive.

5. The ship descends toward Zimbabwe
   Clock now reads 7:14 AM.

DURATION: 10–15 seconds
AUDIO: Zimbabwean mbira music begins here and plays under cold open
LEADS INTO: Cold open panels — Siya's house, Calgary (same night)
```

> The child just saw the Ubuntu Express fly to Africa.
> The story then opens inside Siya's house in Calgary — still at night.
> This apparent contradiction is the magic. Do not explain it.
> Let the child feel it. The resolution comes at the end of the episode.

---

## PART 1 — THE COLD OPEN
### Calgary. Siya's house. Night.

---

**PANEL 1**

SCREEN TEXT: Siya could hear voices downstairs.

NARRATION: It was late at night in Calgary, and Siya could hear voices coming
from downstairs — quiet, serious voices that definitely did not belong to
the television.

BACKGROUND: `#1A2744`
AUDIO: `public/audio/episode-1/cold-open-01.mp3`

---

**PANEL 2**

SCREEN TEXT: She tiptoed down — but the stairs were an obstacle course.

NARRATION: She tiptoed down the steps as carefully as she could — which was
quite the obstacle course, because she had to step over the toys, the paint,
and the paper she hadn't cleaned up after yesterday.

BACKGROUND: `#162A1F`
AUDIO: `public/audio/episode-1/cold-open-02.mp3`

---

**PANEL 3**

SCREEN TEXT: She crept behind the door to listen.

NARRATION: She hopped over her final obstacle — a very flat tube of purple
paint — and crept up behind the door. Since it was partly open, she could
just make out the words.

BACKGROUND: `#1C1A2E`
AUDIO: `public/audio/episode-1/cold-open-03.mp3`

---

**PANEL 4 — THE PANGOLIN CRISIS** ← This panel is the fix.
> The child learns the problem here — the same moment Siya does.
> Before this panel, no one knows what a pangolin is or why it matters.
> This panel establishes both. Everything that follows has stakes.

SCREEN TEXT: "The pangolins are in danger," said a deep, warm voice. "Poachers are hunting them."

NARRATION: "The pangolins are in danger," a deep, warm voice said through
the door. "Poachers are hunting them for their scales. They are the most
hunted animal in the whole world, Sibusiso. There are very few of them left.
They need a safe place to hide — and they need it now."

SPEAKER: Mama Ndlovu
BACKGROUND: `#2A1A06`
AUDIO: `public/audio/episode-1/cold-open-04.mp3`

---

**PANEL 5**

SCREEN TEXT: "I can't help without my team," her dad said.

NARRATION: "Ngiyaxolisa Mama Ndlovu," she heard her dad say, "but I can't
help without my team. uBheki is in Prague, uRumbi is in Tokyo, and Kgomotso
is in New York. I can't do it by myself — I need my team."

SPEAKER: Sbu
BACKGROUND: `#2D1810`
AUDIO: `public/audio/episode-1/cold-open-05.mp3`

---

**PANEL 6**

SCREEN TEXT: "But who will help the pangolins?" said Mama Ndlovu.

NARRATION: The deep voice answered — slow and serious. "Aye manje. Who is
going to help the pangolins?" There was a long pause. Siya leaned in a
little closer to hear what came next.

SPEAKER: Mama Ndlovu
BACKGROUND: `#2A1A06`
AUDIO: `public/audio/episode-1/cold-open-06.mp3`

---

**PANEL 7**

SCREEN TEXT: Siya leaned in too close — and fell right through the door!

NARRATION: She leaned in just a little too close — and the door swung wide
open. She fell face-first onto the floor right in front of her dad's feet.

BACKGROUND: `#3D1A0A`
AUDIO: `public/audio/episode-1/cold-open-07.mp3`

---

**PANEL 8**

SCREEN TEXT: "Siya! I thought you were sleeping!"

NARRATION: Her dad looked down at her. "Siya — I thought you were still
sleeping. What are you doing awake?" Siya slowly stood up, dusting off her
pyjamas, with a very shy look on her face.

SPEAKER: Sbu
BACKGROUND: `#1B3A2E`
AUDIO: `public/audio/episode-1/cold-open-08.mp3`

---

**PANEL 9**

SCREEN TEXT: "I might as well introduce you to my friends," he smiled.

NARRATION: Her dad smiled and put his arm around her. "I might as well
introduce you to my friends," he said. And Siya looked up — and saw them
for the first time.

SPEAKER: Sbu
BACKGROUND: `#1B3A2E`
AUDIO: `public/audio/episode-1/cold-open-09.mp3`

---

**PANEL 10 — THE CREW REVEAL**

SCREEN TEXT: "Sawubona, maDlamini!" they all said together.

NARRATION: "This is Mama Ndlovu — she is the captain. Kesi. Jabari. Zuri.
Baba Kobe. And Lulu." They all turned to look at Siya. And then, all at
once, they said — "Sawubona, maDlamini!"

SPEAKER: The crew
BACKGROUND: `#0F1E2A`
AUDIO: `public/audio/episode-1/cold-open-10.mp3`

---

**PANEL 11**

SCREEN TEXT: Siya froze. How did they know her name?

NARRATION: Siya froze. She had seen the extraordinary ship from her window.
But she hadn't known there were talking animals inside it. And how did they
know to call her maDlamini? Only her dad called her that.

BACKGROUND: `#0F1E2A`
AUDIO: `public/audio/episode-1/cold-open-11.mp3`

---

**PANEL 12**

SCREEN TEXT: "You have questions. I know. You always do."

NARRATION: Her dad squeezed her shoulder gently. "You have questions," he
said. "I know you do — you always do. And I am here to answer them when I
can." He looked at Mama Ndlovu. And then he smiled his biggest smile.

SPEAKER: Sbu
BACKGROUND: `#1B3A2E`
AUDIO: `public/audio/episode-1/cold-open-12.mp3`

---

**PANEL 13 — THE INVITATION**

SCREEN TEXT: "Let's go save the pangolins. We have a new team — Siya and Dlamini."

NARRATION: "You know what, Mama Ndlovu — let's go save the pangolins. We
have a new team." He looked down at Siya. "Siya and Dlamini."

SPEAKER: Sbu
BACKGROUND: `#2A1A06`
AUDIO: `public/audio/episode-1/cold-open-13.mp3`

---

## PART 2 — BOARDING

---

**PANEL 1**

SCREEN TEXT: The Ubuntu Express was unlike anything Siya had ever seen.

NARRATION: Walking up the ramp, Siya saw that the Ubuntu Express was unlike
anything she had ever seen — the body of a rocket, wings like an aeroplane,
wheels like the biggest truck in the world. And on the outside, in big bold
letters: UBUNTU EXPRESS.

BACKGROUND: `#C1692F`
AUDIO: `public/audio/episode-1/boarding-01.mp3`

---

**PANEL 2**

SCREEN TEXT: Inside, the seats were covered in the most beautiful fabrics.

NARRATION: Inside, the seats were covered in the most beautiful fabrics Siya
had ever seen — rich patterns in gold and red and indigo and green. Siya ran
her hand along the nearest seat. The cloth was smooth and warm.

BACKGROUND: `#1B3A2E`
AUDIO: `public/audio/episode-1/boarding-02.mp3`

---

**PANEL 3 — FABRIC INTERACTIVE**
> DEVELOPER NOTE: Child taps each of 4 seats to reveal the fabric name and country.
> After all 4 are tapped, narration plays and "Buckle up" button appears.

SCREEN TEXT: Tap each seat to find out where its cloth comes from.

NARRATION (plays after all tapped): "Kuba cloth from Congo. Shweshwe from
South Africa. Kente from Ghana. Adire from Nigeria. Every seat on this ship
comes from somewhere on the continent." Siya got the window seat — right in
the middle.

AUDIO: `public/audio/episode-1/boarding-03.mp3`

---

**PANEL 4**

SCREEN TEXT: "Seatbelts on for takeoff," said Mama Ndlovu on the speaker.

NARRATION: The seatbelt clicked on by itself. Then Mama Ndlovu's voice came
over the speaker — deep and calm and certain. She said one word in Ndebele.
Then in English: "Hold on. We are going home."

SPEAKER: Mama Ndlovu
BACKGROUND: `#0A0E1A`
AUDIO: `public/audio/episode-1/boarding-04.mp3`

---

## PART 3 — THE STORY FLIGHT
### Separate from the transition animation. This tells the story of the journey.

---

**PANEL 1**

SCREEN TEXT: Below them, Calgary disappeared into the dark.

NARRATION: Below the ship, the lights of Calgary grew smaller and smaller,
until they looked like stars on the ground. Siya pressed her face against
the window.

BACKGROUND: `#0A0E1A`
AUDIO: `public/audio/episode-1/flight-01.mp3`

---

**PANEL 2 — TIME ZONES**

SCREEN TEXT: "It is almost midnight here. But Zimbabwe is already waking up."

NARRATION: "It is almost midnight here in Calgary," Mama Ndlovu said. "But
in Zimbabwe, the sun is already rising. We are flying toward it." Siya
watched the clock on the panel change — 11:58 PM, then 1:00, then 4:00 —
as if time itself was moving faster than she was.

SPEAKER: Mama Ndlovu
BACKGROUND: `#0A0E1A`
AUDIO: `public/audio/episode-1/flight-02.mp3`

---

**PANEL 3 — BULAWAYO DESCENT**

SCREEN TEXT: The ship began to descend — and a smile spread across Sbu's face.

NARRATION: Then the Ubuntu Express began to descend — not toward Zimbabwe
in general, but toward a specific place. And Siya looked at her father and
saw something she had never quite seen before. A smile that was also
something else. Something closer to home.

BACKGROUND: `#C1692F`
AUDIO: `public/audio/episode-1/flight-03.mp3`

---

**PANEL 4**

SCREEN TEXT: "Do you remember this?" Mama Ndlovu asked.

NARRATION: The ship landed gently on a dusty soccer field in Entumbane, in
the city of Bulawayo. Mama Ndlovu's voice came over the speaker: "Do you
remember this place, Sibusiso?"

SPEAKER: Mama Ndlovu
BACKGROUND: `#D4A017`
AUDIO: `public/audio/episode-1/flight-04.mp3`

---

**PANEL 5**

SCREEN TEXT: "How could I forget? This is where it all began."

NARRATION: Sbu laughed — a real, full, surprised laugh. "How could I forget?
This is where it all began." He looked at Siya. "Sit down. I am going to
tell you a story."

SPEAKER: Sbu
BACKGROUND: `#D4A017`
AUDIO: `public/audio/episode-1/flight-05.mp3`

---

**PANEL 6**

SCREEN TEXT: "We were playing soccer — Bheki, Rumbi, Kgomotso, and me."

NARRATION: "We were playing soccer right here — uBheki, uRumbi, uKgomotso,
and me. I kicked the ball too hard. It went into the bushes. So I ran to
get it. And that is when I found her."

SPEAKER: Sbu
BACKGROUND: `#2D4A22`
AUDIO: `public/audio/episode-1/flight-06.mp3`

---

**PANEL 7**

SCREEN TEXT: A bird. Hurt. Lying very still in the long grass.

NARRATION: A bird — lying very still in the long grass. A crowned crane with
a broken wing. She was hurt and she couldn't fly and she was alone. I
shouted to the others and they all came running.

SPEAKER: Sbu
BACKGROUND: `#2D4A22`
AUDIO: `public/audio/episode-1/flight-07.mp3`

---

**PANEL 8**

SCREEN TEXT: They bandaged her wing. They brought her their lunch. They came back every day.

NARRATION: We found a stick to keep her wing in place and wrapped it the
best we could. Every day after school we came back with whatever food we
had from our lunch boxes. Bread, mostly. She got stronger. And stronger.
And one day, she flew away.

SPEAKER: Sbu
BACKGROUND: `#1B3A2E`
AUDIO: `public/audio/episode-1/flight-08.mp3`

---

**PANEL 9**

SCREEN TEXT: They didn't know it then — but that bird was Kesi.

NARRATION: What we didn't know — not then — was that this bird was Kesi.
And Kesi was not just any bird. She had been sent to Bulawayo by the Ubuntu
Express, looking for children with the right qualities. She got hurt in an
accident along the way.

BACKGROUND: `#1B3A2E`
AUDIO: `public/audio/episode-1/flight-09.mp3`

---

**PANEL 10**

SCREEN TEXT: A few days later, there was an elephant in the living room.

NARRATION: A few days later, I came home to our house in Makokoba and found
my mother and father sitting very still in the living room, speaking with an
elephant. Mama Ndlovu had come to ask my parents if I could join the Ubuntu
Express.

SPEAKER: Sbu
BACKGROUND: `#2A1A06`
AUDIO: `public/audio/episode-1/flight-10.mp3`

---

**PANEL 11 — THE REASON**

SCREEN TEXT: "The reason they chose us was kindness."

NARRATION: "The reason they chose us," Sbu said quietly, "was not because
we were the smartest or the bravest. It was because we had been kind to a
bird in its time of need. That is all. Umuntu ngumuntu ngabantu — a person
is a person because of other people. That is the Ubuntu way."

SPEAKER: Sbu
BACKGROUND: `#0F1E2A`
AUDIO: `public/audio/episode-1/flight-11.mp3`

---

**PANEL 12**

SCREEN TEXT: At the same time, Baba Kobe and Zuri were visiting the other boys.

NARRATION: At the same time I was meeting Mama Ndlovu, Baba Kobe was at
Kgomotso's house. And Zuri was at Rumbi's. All of our parents were scared
at first — but Mama Ndlovu has a way of calming anxious people. And they
all said yes.

BACKGROUND: `#1B3A2E`
AUDIO: `public/audio/episode-1/flight-12.mp3`

---

**PANEL 13**

SCREEN TEXT: The Ubuntu Express lifted off and continued toward Zimbabwe.

NARRATION: The Ubuntu Express rose up from the soccer field in Entumbane.
Siya was quiet. She had a lot to think about. Her dad had always just been
her dad. She hadn't known he was also this.

BACKGROUND: `#0A0E1A`
AUDIO: `public/audio/episode-1/flight-13.mp3`

---

## PART 4 — ZIMBABWE EPISODE MAP
### This is the episode map — different from the landing page Africa map.
### Shows Zimbabwe specifically with 4 language stop pins.

MAP ORIENTATION NARRATION:
> "Welcome to Zimbabwe — your father's home. Before we find the pangolins,
> we are going to meet the people who live here. At each place you visit,
> you will learn how they say hello. You must use their greeting to be
> welcomed in. Choose where you want to go first."

AUDIO: `public/audio/episode-1/map-intro.mp3`

---

## PART 5A — VICTORIA FALLS (Tonga)

KESI COACHING HELLO:
SCREEN TEXT: At Victoria Falls, they speak Tonga. Hello is: MWASWENI.
NARRATION: At Victoria Falls — called Mosi-oa-Tunya, "the smoke that
thunders" — the people speak Tonga. To say hello: Mwasweni. Say it with me:
mwah-SWAY-nee. Mwasweni!
AUDIO: `public/audio/episode-1/vicfalls-coach-hello.mp3`

KESI COACHING THANKS:
SCREEN TEXT: To say thank you: NDALUMBA.
NARRATION: And when you leave, always say thank you. In Tonga, thank you is
Ndalumba — n-dah-LOOM-bah. Remember both.
AUDIO: `public/audio/episode-1/vicfalls-coach-thanks.mp3`

HELLO UNLOCK:
SCREEN TEXT: Sitwala is waiting. Say hello in Tonga.
NARRATION: Sitwala lives near Victoria Falls. She knows this place better
than anyone. Say hello the right way and she will share what she knows.
AUDIO: `public/audio/episode-1/vicfalls-unlock.mp3`

SITWALA'S IDEA:
SCREEN TEXT: "Weave thorny acacia branches around the entrance," said Sitwala.
NARRATION: "Weave thorny acacia branches around the entrance," Sitwala said.
"Poachers cannot reach through without getting hurt — and from the outside,
it looks exactly like natural bush."
AUDIO: `public/audio/episode-1/vicfalls-sitwala.mp3`

MAMA NDLOVU WISDOM:
SCREEN TEXT: "The Tonga people have lived along the Zambezi for centuries."
NARRATION: "The Tonga people have lived along the Zambezi River for
centuries," Mama Ndlovu said. "When Kariba Dam was built in 1958, over fifty
thousand Tonga were moved from their homes. They remember everything the
river carried away."
AUDIO: `public/audio/episode-1/vicfalls-wisdom.mp3`

STOP COMPLETE:
SCREEN TEXT: Victoria Falls — done! You learned Mwasweni and Ndalumba.
AUDIO: `public/audio/episode-1/vicfalls-complete.mp3`

---

## PART 5B — KHAMI RUINS (Kalanga)

KESI COACHING:
SCREEN TEXT: At Khami Ruins, they speak Kalanga. Hello is: DUMILANI.
NARRATION: The Khami Ruins were built six hundred years ago. The people here
speak Kalanga. Hello is Dumilani — doo-mee-LAH-nee. Thank you is Ndatenda —
n-dah-TEN-dah.
AUDIO: `public/audio/episode-1/khami-coach.mp3`

THANDIWE'S IDEA:
SCREEN TEXT: "Stack flat stones without any cement," said Thandiwe.
NARRATION: "Use dry-stone technique," said Thandiwe. "Stack flat stones
carefully — no cement, just good fitting. The walls become part of the
landscape. And they last for hundreds of years — just look around you."
AUDIO: `public/audio/episode-1/khami-thandiwe.mp3`

JABARI WISDOM:
SCREEN TEXT: "Six hundred years. No cement. Just skill," said Jabari.
NARRATION: Jabari ran his paw along the ancient wall. "Six hundred years,"
he muttered. "No mortar. No modern tools. Just people who understood how
stone fits against stone. Impressive."
AUDIO: `public/audio/episode-1/khami-wisdom.mp3`

STOP COMPLETE:
SCREEN TEXT: Khami Ruins — done! You learned Dumilani and Ndatenda.
AUDIO: `public/audio/episode-1/khami-complete.mp3`

---

## PART 5C — MATOBO HILLS (Ndebele)

KESI COACHING:
SCREEN TEXT: At Matobo Hills, they speak Ndebele. Hello is: SAWUBONA.
NARRATION: The Matobo Hills are ancient — giant balancing rocks. The people
here speak Ndebele. Sawubona means "I see you." Not just hello. I see your
whole self. sah-woo-BOH-nah. Sawubona.
AUDIO: `public/audio/episode-1/matobo-coach.mp3`

NOKUKHANYA'S IDEA:
SCREEN TEXT: "Hide the pangolin beneath a balancing rock," said Nokukhanya.
NARRATION: "Use the shadow underneath a balancing rock," Nokukhanya said.
"Pangolins are small — the crevices are perfect. And no human being can move
a boulder. No poacher can reach inside. This rock has not moved in a million
years."
AUDIO: `public/audio/episode-1/matobo-nokukhanya.mp3`

TOTEM BEAT (plays before thank you button — no fanfare):
SCREEN TEXT: "Dlamini," said Nokukhanya. "Your totem is the elephant — indlovu."
NARRATION: Nokukhanya looked at Siya for a moment. "Dlamini," she said.
"Your clan's totem is the elephant — indlovu." She glanced at Mama Ndlovu.
Mama Ndlovu said nothing. But her eyes were very warm.
AUDIO: `public/audio/episode-1/matobo-totem.mp3`

BABA KOBE WISDOM:
SCREEN TEXT: "Every surface in these hills is memory," said Baba Kobe.
NARRATION: Baba Kobe closed his eyes briefly before he spoke. "These hills
are sacred. The San painted these rocks two thousand years ago. The Ndebele
king Mzilikazi called them Amatobo — the bald heads. Every surface here is
memory."
AUDIO: `public/audio/episode-1/matobo-wisdom.mp3`

STOP COMPLETE:
SCREEN TEXT: Matobo Hills — done! You learned Sawubona and Ngiyabonga.
AUDIO: `public/audio/episode-1/matobo-complete.mp3`

---

## PART 5D — GREAT ZIMBABWE (Shona/Karanga)

KESI COACHING:
SCREEN TEXT: At Great Zimbabwe, they speak Shona. Hello is: MHORO.
NARRATION: Great Zimbabwe is where the country gets its name — dzimba-dza-mabwe
means houses of stone in Shona. Hello is Mhoro — m-HOH-roh. Thank you is
Ndatenda — the same word as Kalanga! Languages are cousins too.
AUDIO: `public/audio/episode-1/greatzim-coach.mp3`

QUIET BEAT (before hello unlock):
SCREEN TEXT: Siya repeated the word. This language felt different from home.
NARRATION: Siya listened and repeated the word. Mhoro. It sounded different
from Sawubona — softer in a different place. Her family's language was
Ndebele. And this was not Ndebele. She understood for the first time that
Zimbabwe had more than one language inside it.
AUDIO: `public/audio/episode-1/greatzim-moment.mp3`

CHIEDZA'S IDEA:
SCREEN TEXT: "Shape the hideout like a termite mound," said Chiedza.
NARRATION: "Dig it into the shape of a termite mound," said Chiedza.
"Pangolins smell like the earth anyway. And the ochre colour matches the
soil perfectly. From the outside, it will be invisible."
AUDIO: `public/audio/episode-1/greatzim-chiedza.mp3`

ZURI WISDOM:
SCREEN TEXT: "No mortar. Just perfectly fitted granite," said Zuri. "Engineers still study this."
NARRATION: Zuri stood upright. "Great Zimbabwe was the capital of a kingdom
from 1100 to 1450 CE. No mortar — just perfectly fitted granite. Engineers
study this site to this day and still cannot fully explain how it was done."
AUDIO: `public/audio/episode-1/greatzim-wisdom.mp3`

STOP COMPLETE:
SCREEN TEXT: Great Zimbabwe — done! You learned Mhoro and Ndatenda.
AUDIO: `public/audio/episode-1/greatzim-complete.mp3`

---

## PART 6 — STEM CHALLENGE

TONDE INTRODUCTION:
SCREEN TEXT: Meet Tonde. He curls into a ball when frightened — but poachers just pick him up.
NARRATION: This is Tonde. He lives in Gonarezhou National Park. Tonde is shy
and gentle. When frightened, he curls into a tight ball — his scales protect
him from almost anything. Almost. A poacher can just pick up the whole ball
and carry him away. That is what your hideout must stop.
AUDIO: `public/audio/episode-1/stem-tonde-intro.mp3`

TASK CARD:
SCREEN TEXT: You have four ideas. Now design Tonde's hideout.
NARRATION: You have collected four ideas from four children across Zimbabwe.
Your hideout must do three things: hide in its surroundings, stay in one
place, and be built from what nature provides. Choose the ideas that solve
all three. Then go build it.
AUDIO: `public/audio/episode-1/stem-task.mp3`

HINT 1: What does Tonde eat? Ants and termites — seventy million a year.
The hideout must be near their home. A termite mound shape is not just
camouflage. It is also near his food.
AUDIO: `public/audio/episode-1/stem-hint-1.mp3`

HINT 2: How does Tonde move? Low to the ground. The entrance must be low
and narrow — wide enough for Tonde, too small for a human hand.
AUDIO: `public/audio/episode-1/stem-hint-2.mp3`

HINT 3: What do poachers look for? Movement. Smell. Anything out of place.
Use materials that smell like the bush — already part of nature.
AUDIO: `public/audio/episode-1/stem-hint-3.mp3`

---

## PART 7 — MAKER ACTIVITY

BUILD INTRODUCTION:
SCREEN TEXT: Time to build! Grab a grown-up and let's go.
NARRATION: Time to build Tonde's hideout with your hands. This is something
you do together — you and a grown-up. Find stones, sticks, clay, cardboard —
anything that looks like it belongs in nature. Build something Tonde could
crawl into. Something that stays in place. Something that disappears into
what's around it. When you are done, take a photo. We are going to deliver
your design to Tonde and Nothando.
AUDIO: `public/audio/episode-1/maker-intro.mp3`

---

## PART 8 — DELIVERY

NOTIFICATION:
SCREEN TEXT: Muntu, you have a message... tap to open.
NARRATION: Something arrived while you were building. Tap to open it.
AUDIO: `public/audio/episode-1/notification.mp3`

TONDE DELIVERY:
SCREEN TEXT: The Ubuntu Express delivered your design to Gonarezhou.
NARRATION: The Ubuntu Express flew to Gonarezhou National Park. Lulu carried
your design — just like this. Tonde came to investigate. He sniffed the
entrance. Crawled inside. Curled into his tight ball. And he was safe.
The entrance was too narrow for any hand to reach through.
AUDIO: `public/audio/episode-1/delivery-tonde.mp3`

NOTHANDO DELIVERY:
SCREEN TEXT: Then they flew to Hwange — to Nothando and her young one.
NARRATION: Then the Ubuntu Express flew to Hwange National Park. Nothando
was waiting. She was not alone — she had a young one with her. They both
went inside. Both safe. One design. Two pangolins protected.
AUDIO: `public/audio/episode-1/delivery-nothando.mp3`

QUIET MOMENT:
SCREEN TEXT: Sbu and Siya watched from the window. No words needed.
NARRATION: Sbu put his hand on Siya's shoulder. They watched from the
window of the Ubuntu Express. Sometimes a thing that is very good does not
need words right away.
AUDIO: `public/audio/episode-1/delivery-quiet.mp3`

---

## PART 9 — RETURN FLIGHT

PANEL 1:
SCREEN TEXT: On the way home, Siya was quiet. She had a lot to think about.
NARRATION: On the flight back to Calgary, Siya was mostly quiet. The biggest
thing she kept thinking about was the simplest: her dad and his friends had
just been kind to a bird. That was all. And look what had come from it.
AUDIO: `public/audio/episode-1/return-01.mp3`

PANEL 2:
SCREEN TEXT: "Baba — does Mama know about all of this?"
NARRATION: "Baba," Siya said quietly. "Does Mama know?" Her dad's face broke
into the biggest smile. "There are no secrets between your mum and me. She
knows everything. She has met the whole team. She loves the stories."
SPEAKER: Siya
AUDIO: `public/audio/episode-1/return-02.mp3`

PANEL 3:
SCREEN TEXT: "Your mum has the greatest solutions," said Sbu. "Never forget that."
NARRATION: "Your mum has the greatest solutions," Sbu said. "If you ever get
stuck — if you ever run out of ideas — call your mum. Who knows the many
tight spots she has saved me from over the years." He shook his head, smiling.
SPEAKER: Sbu
AUDIO: `public/audio/episode-1/return-03.mp3`

PANEL 4 — FINAL LINE:
SCREEN TEXT: "The Ubuntu Express has been waiting for you your whole life, maDlamini."
NARRATION: Siya looked out the window. Calgary was appearing below — the
lights coming back, the snow on the rooftops. Her dad leaned close and said
quietly: "The Ubuntu Express has been waiting for you your whole life,
maDlamini."
SPEAKER: Sbu
AUDIO: `public/audio/episode-1/return-04.mp3`

---

## PART 10 — LANDING HOME

PANEL 1:
SCREEN TEXT: They watched the Ubuntu Express disappear into the sky.
NARRATION: They stood on the porch together and watched the Ubuntu Express
rise through the dark sky until it was gone. And the strange thing was: it
still looked like the same time they had left. The same stars. The same cold
Calgary air. As if the whole adventure had happened in the space between one
breath and the next.
AUDIO: `public/audio/episode-1/landing-01.mp3`

PANEL 2:
SCREEN TEXT: "That's a question for another day. Now — beauty sleep."
NARRATION: "How is that possible?" Siya asked, looking at the unchanged sky.
"That is a question," her dad said, "for another day." He opened the front
door. "Right now, maDlamini — you have some beauty sleep to catch up on."
Siya went inside. But she was smiling.
SPEAKER: Sbu
AUDIO: `public/audio/episode-1/landing-02.mp3`

---

## PART 11 — FACT CARD

FACT 1: Pangolins are the world's most trafficked mammal — more are taken
illegally each year than any other wild animal on earth.
FACT 2: There are eight species — four in Africa, four in Asia. Zimbabwe is
home to two African species.
FACT 3: Their scales are made of keratin — the same material as your
fingernails. When curled, even a lion cannot open them.
FACT 4: One pangolin eats up to seventy million ants and termites a year.
Without them, insect populations would grow out of control.
FACT 5: Pangolins are in danger because people hunt them illegally. But
conservationists across Africa are working hard to protect them — and now,
so are you.

EPISODE CLOSE NARRATION:
Today you learned Mwasweni and Ndalumba in Tonga. Dumilani and Ndatenda in
Kalanga. Sawubona and Ngiyabonga in Ndebele. And Mhoro and Ndatenda in Shona.
You visited Victoria Falls, the Khami Ruins, the Matobo Hills, and Great
Zimbabwe. And you designed a home that is keeping two pangolins safe right now.
That is the Ubuntu way.
AUDIO: `public/audio/episode-1/episode-close.mp3`

---

## FULL INTERACTION FLOW

```
Landing page Africa map
  └── Tap Zimbabwe
        ↓
Transition animation (10–15 sec, mbira, no dialogue)
Calgary → ocean → Africa sunrise → Zimbabwe
        ↓
Cold open (13 panels, tap to advance)
Siya hears voices → pangolin crisis explained →
falls through door → crew introductions → invitation
        ↓
Boarding (4 panels + fabric tap interaction)
        ↓
Story flight (13 panels)
Calgary below → time zones → Bulawayo → Kesi origin story → rising again
        ↓
Zimbabwe episode map (child chooses order)
4 language pins + 2 locked pangolin pins
        ↓
Language stops × 4
Victoria Falls → Khami → Matobo → Great Zimbabwe
Each stop: coach → hello unlock → local child + wisdom → thanks close
        ↓
STEM challenge (unlocked after all 4 stops)
Tonde intro → idea selection → constraints → build unlocks
        ↓
Maker activity (off-screen, with parent)
Checklist → photo → send
        ↓
Delivery scene
Notification → Tonde → Nothando + young one → quiet moment
        ↓
Return flight (4 panels)
Quiet reflection → Thandi question → Sbu's final line
        ↓
Landing home (2 panels)
The porch → the close
        ↓
Fact card + journal stamp
5 facts → episode summary → Zimbabwe stamp
```
