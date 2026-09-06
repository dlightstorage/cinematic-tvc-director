# 02: COLORIST

### Digital Intermediate / Final Grade
**Film Craft Bible series. Reusable across any project, any client, any format.**

---

## HOW TO READ THIS DOCUMENT

Two halves, deliberately separated.

**Part A** is a craft reference. A human reads it to learn how the discipline actually thinks. It is grounded in the stated methods of working colorists at the top of the field, quoted or paraphrased with attribution inline.

**Part B** is an operating manual for an AI subagent playing the colorist seat inside a multi-department pipeline. It contains the questions the role asks, the order it must ask them in, the dependencies on other departments, the tensions it will hit, and the template it writes.

**Claim tagging.** Statements are tagged one of two ways:

| Tag | Meaning |
|---|---|
| **[SOURCED]** | Traceable to a named practitioner, institution, or published spec. Attribution is inline. |
| **[PRINCIPLE]** | Widely held craft convention, physics, or perceptual fact. True in practice, not attributed to one person. |

---
---

# PART A: CRAFT REFERENCE

---

## A1. WHAT THE ROLE ACTUALLY IS

The colorist is the last creative pass on the image before it becomes a deliverable. Everything upstream (lens choice, lighting ratio, set paint, wardrobe fabric, VFX plate) arrives at this seat as a single stream of pixels, and the colorist has to make it read as one coherent, intentional world.

The job is not "adding a look." That is the amateur framing. The professional framing is closer to what Tom Poole, Chief Creative Officer and Senior Colorist at Company 3, describes: he watches a piece alone a couple of times, makes notes, then builds what he calls a **colour bible**, a loose first pass where he sets a couple of shots per scene and moves on, then strings those selects together into a sizzle reel to see how the scenes play off each other and tweaks from there. His analogy is sculpture: you chip off big blocks first, get the shape, and only then move to detail. **[SOURCED: Tom Poole, Televisual, "The Art of the Grade," 2022]**

Poole is also explicit about hierarchy: *"for a good grade the number one thing is that it facilitates the DP's vision."* He says the only recognition he needs is for people to talk about the cinematography positively. **[SOURCED: same]**

Adam Inglis (freelance, credits include *Peterloo*, *The Nice Guys*, *Blue Planet II*) puts the same idea in a harder frame: *"I don't feel there is such a thing as 'my' vision of the grade; the film is the director's vision. The role of the colourist is to find the best way to get to our destination, much like being a taxi driver. There's no point taking your client to the museum if they want to go to the airport."* **[SOURCED: Adam Inglis, Televisual, 2018]**

And the technical/creative split is genuinely 50/50. Poole again: *"There's a lot of left brain / right brain stuff. You have to be very creative, but you also have to be incredibly technical."* He also notes the trait that ends careers: people with an amazing eye who cannot handle the client dynamic and the pressure of people sitting behind them. **[SOURCED: same]**

Jill Bogdanowicz, Co-Head of Features Color at Company 3, goes further on that last point: *"I always say that 70% of my job is psychology. It's just being able to understand a filmmaker's intention."* **[SOURCED: Bogdanowicz in conversation with Steven Bernstein ASC, Sony Cine, Dec 2021]**

---

## A2. WHERE THE AUTHORITY STARTS AND WHERE IT ENDS

### The colorist owns:

- The **show LUT / display rendering** and its behaviour across every deliverable
- **Shot-to-shot and scene-to-scene continuity** of exposure, balance, and density
- The **tonal architecture**: black point, white point, contrast curve shape, where detail is retained and where it is crushed or clipped
- **Saturation strategy** and its variance by luminance range and by hue family
- **Skin tone integrity** across every subject in the frame
- **Local shaping**: windows, grads, qualifiers, tracked shapes, relighting inside the frame
- **Texture**: grain, halation, bloom, softening, sharpening, patina
- **Deliverable conformance**: legal levels, color space, HDR metadata, per-platform trims
- **Flagging upstream problems early enough for them to be fixed upstream**

### The colorist does not own:

- The lighting plan. That is the DP.
- The palette of the built world. That is Production Design.
- What the actors are wearing. That is Wardrobe.
- The cut. That is Editorial.
- Geometry, cleanup, comps, set extensions, and anything requiring rebuilt pixels. That is VFX.
- Final creative signoff. That is the Director, and on advertising, the Director plus agency plus client.

The boundary is worth stating precisely because it is the source of most friction: **the colorist has enormous authority over how the captured image reads, and almost none over what was captured.**

---

## A3. WHAT A COLORIST CAN AND CANNOT FIX

This is the single most useful section for anyone planning a shoot.

### CAN fix, reliably

| Problem | Why it is fixable |
|---|---|
| Overall exposure drift within latitude | Log-encoded capture holds real headroom; an offset in a log working space is mathematically an exposure change **[SOURCED: Walter Volpatto has described using ACEScc/ACEScct precisely because an offset there is equivalent to an exposure change, Lowepost]** |
| Mixed color temperature between takes | Balance is a primary operation, cheap and stable |
| Continuity mismatch across a scene shot over hours or days | This is core craft; Asa Shoul describes his first pass as balancing shots together before any look work **[SOURCED: Asa Shoul, Televisual, 2018]** |
| A scene reading too warm, too cool, too flat, too contrasty | Primaries and curves |
| Distracting bright object in frame edge | Power window, tracked, pulled down |
| A face slightly too dark against a bright background | Tracked shape plus qualifier |
| Uneven sky density across a montage | Grads plus hue-restricted secondaries |
| Digital footage that needs to feel photochemical | Film emulation LUTs plus halation plus grain. Yvan Lucas built a bespoke film-emulation LUT plus a three-strip Technicolor emulation, engineered with Rodrigo Prieto and Philippe Panzani into a proprietary Baselight plug-in, to bring digital capture into the visual space of film **[SOURCED: Company 3, "Working Digitally, Thinking Filmically," 2023]** |
| Lens character that was deliberately not shot in-camera | Peter Doyle rebuilt Slawomir Idziak's custom filter looks digitally so the film could be shot clean for a VFX-heavy show and the looks applied after comps **[SOURCED: Peter Doyle, FilmLight Meet The Colourist]** |
| Small object color changes | Possible but expensive. Asa Shoul was asked to change a dog's nose from brown to pink for an entire feature and it took *"many hours of frame-by-frame work"* **[SOURCED: Shoul, Variety, 2021]** |

### CANNOT fix, or cannot fix without it becoming a VFX line item

Asa Shoul is the most quotable authority here because he explicitly cautions against treating "we'll fix it in post" as a universal solution. **[SOURCED: Shoul, Variety, 2021]**

| Problem | Why it does not fix |
|---|---|
| **Clipped highlights.** Blown windows, blown sky, blown practicals | The data is gone. There is nothing to recover. Shoul names overexposed detail in highlights, through a window or in the sky, as *"another hazard best fixed on location."* He can composite a new sky or curtain detail from another take or a stock image, but that is a comp, not a grade. **[SOURCED: same]** |
| **Under-exposure that then fails to match** | Shoul: even a master colorist may not be able to correct under-exposing after daylight has diminished, because the footage will not match shots filmed earlier. **[SOURCED: same]** |
| **Noise floor** | Lifting crushed shadows lifts the noise with it. You can denoise, but denoise costs texture and can plasticise skin. |
| **Wrong lighting direction or contrast ratio** | You cannot re-key a face that was lit flat. Windows can fake a gradient but not a new light source with correct falloff, shadow shape, and specular behaviour. |
| **Focus** | Sharpening is not focus. |
| **A palette that fights itself** | If wardrobe, set, and props are all mid-value and similar hue, no grade creates separation that was never photographed. |
| **HDR-specific mistakes made on set** | Shoul's advice: do not place actors in front of windows, because the extra brightness available in the sky in HDR can make the actor read as less visible. **[SOURCED: same]** |
| **A bad cut** | Not the department. |

### The doctrine that follows from this

The reason top colorists push to be involved in pre-production is not vanity. It is because the cheapest fix is always the one made before the camera rolls. Shoul on *The Crown*: they ran tests **just looking at lipstick**, specifically to avoid having to adjust it in the grade across hundreds of shots. He tries to get the whole production team into camera and costume tests so art, costume, and makeup can see how the lighting and intended grade will affect their work. His line: *"It's far quicker for them to change a lipstick colour before filming than me for a 10-part TV series or film."* **[SOURCED: Shoul, Variety, 2021 and Televisual, 2018]**

Bogdanowicz frames the economics: bringing the colorist in early *seems* to cost more, but any issue a producer, director, or DP can fix gets surfaced earlier, everyone stays on the same page, and the whole film goes faster and smoother. **[SOURCED: Bogdanowicz, Sony Cine]**

---

## A4. THE FULL DECISION SET

### 4.1 Show LUT / look design

The show LUT is the single most consequential early decision. It is the modern equivalent of choosing a film stock.

Bogdanowicz is unambiguous about her preferred structure: *"I make one LUT per show in general. It's like choosing a film stock for your movie. You do one LUT, and then you have CDLs, which are smaller color corrections that happen shot per shot and will follow throughout the whole process."* Her reason is workflow, not aesthetics: **LUTs do not travel with the EDL.** If a DP hands her a scene-by-scene list of different LUTs, she has no automated way to know which LUT went on which scene. She will use two if she must, or a separate LUT for something extreme like a black-and-white sequence, but one is the target. **[SOURCED: Bogdanowicz, Sony Cine]**

Tom Poole also builds a LUT per show rather than carrying a go-to LUT, and his stated reason is different and equally valid: there are too many variables in lens quality, filtration, and lighting, so he wants a base that is *"a good base of how the project was shot and that works for the package."* **[SOURCED: Poole, Televisual]**

A critical, frequently-missed obligation: **the show LUT must be VFX-safe.** Bogdanowicz: it is possible to build something into a LUT that is destructive to visual effects, for instance making keying harder. Company 3 runs a color science team that checks every LUT she makes for exactly this. If a production is not using her facility, someone still has to do that check, and early. **[SOURCED: Bogdanowicz, Sony Cine]**

Tim Masick's advice to emerging colorists cuts the other way and is the correct training discipline: he sees young colorists take heavy tasks and try to do everything with one LUT. His counter-exercise is to attempt those tasks **without any LUT**, using every tool and as many nodes or layers as needed to recreate the look manually, in order to actually understand where the tools can go. That builds the ability to use them unorthodoxly. **[SOURCED: Tim Masick, LBB / FilmLight Colour Awards jury interview, 2024]**

### 4.2 Color space and ACES workflow

The modern spine of a professional pipeline.

**The architecture.** ACES is a standardised color-managed workflow in three steps: an **Input Transform (IDT)** converts each camera's native encoding (log C, S-Log3, etc.) into the ACES working space; grading happens in the working space; an **Output Transform (ODT)** converts to each target display. **[SOURCED: Academy ACES documentation, widely summarised by Frame.io and others]**

**The spaces you need to know:**

| Space | Primaries | Encoding | Used for |
|---|---|---|---|
| ACES2065-1 | AP0 | Scene linear | Interchange and archive |
| ACEScg | AP1 | Scene linear | CG rendering and compositing |
| ACEScc | AP1 | Log | Grading (pure log) |
| **ACEScct** | AP1 | Log with a toe | **Grading. What most DI facilities actually use**, because the toe makes lift operations behave like traditional log film scans |

**[SOURCED: ACES spec summaries; the ACEScct preference in DI is documented across Frame.io's ACES guide and FilmLight/Blackmagic workflow material]**

**ACES 2.0** shipped from the Academy with improvements to color rendering, transform invertibility, and support for custom output devices. **[SOURCED: Academy announcement, reported by Variety, 2025]**

**Why practitioners favour it.** Peter Doyle: ACES gives more room for experimentation because *"we know how the camera reads the light. We know how the displays will show the light, so the DP and colourist can take control and create their own aesthetics, with the knowledge of how it will translate to theatre or home."* **[SOURCED: Doyle, British Cinematographer DI special report]**

Adam Inglis: *"I am an ACES advocate. It's not unusual for films to be shot on multiple cameras and have multiple delivery formats, so the more order we can apply to that chaos, the better."* **[SOURCED: Inglis, Televisual, 2018]**

**The trap.** Working color space is not the same as monitoring color space. Bogdanowicz flags that a production working in Rec.709 on set, versus P3, versus HDR, will not be looking at exactly what she sees later, and it takes color science work to reconcile. **[SOURCED: Bogdanowicz, Sony Cine]**

### 4.3 Contrast curves

**[PRINCIPLE]** Contrast is the primary emotional lever, ahead of hue. Where you place the black point, how steep the shadow-to-midtone ramp is, and how the shoulder rolls into highlight determine whether an image reads as documentary, glossy, oppressive, or dreamy.

Practical structure most colorists use:

1. **Neutral base / one light.** Jean-Clément Soret describes emulating the old photochemical starting point, a print from camera negative at 25 points RGB, which was a true representation of the DP's work with no creative intention, before grading begins. A flat raw image on its own *"doesn't mean anything other than the range of exposure you have."* **[SOURCED: Soret, Televisual, 2018]**
2. **Set black.** Deciding whether shadows sit at true black, lifted/milky, or tinted is the single most identifiable stylistic choice in a grade.
3. **Set white and the shoulder.** How fast highlights roll off is what separates "video" from "photographic." Poole: he wants an image that looks like it could be printed on photographic paper, *"where there's a texture to the highlights, texture to the black, and it doesn't feel like a video image, it feels like a moving photographic print."* **[SOURCED: Poole, Televisual]**
4. **Shape the midtones.** This is where faces live. Small moves, large consequences.

### 4.4 Saturation strategy

**[PRINCIPLE]** Global saturation is the bluntest tool in the room and rarely the right one. Sophisticated saturation work is conditional:

- **Luminance-dependent saturation.** Desaturating shadows and highlights while holding midtone saturation is the most common "filmic" move, because film stocks behave roughly this way.
- **Hue-dependent saturation.** Pulling saturation out of one hue family (commonly greens or yellows) while holding or boosting another. This is how a world gets a dominant color identity without looking tinted.
- **Saturation as emotional register.** Desaturation reads as memory, grief, illness, clinical detachment, austerity, the past. Heightened saturation reads as vitality, fantasy, childhood, artifice, appetite, heightened present. Both are conventions and both can be inverted deliberately for effect.

The *Barbie* case is the cleanest published example of split saturation strategy: director Greta Gerwig wanted skin tones **pastel and not very saturated**, while pinks, turquoises, and other colors **really stood out**. Lucas and Prieto built that with a film emulation LUT plus a three-strip Technicolor emulation plus Barbieland-specific refinements, which Gerwig named the "TechnoBarbie" LUT. **[SOURCED: Company 3, 2023]**

### 4.5 Skin tone protection

**[PRINCIPLE + widely documented practice]** The non-negotiable of the craft. Rules that hold:

- **Qualify skin before you push the world.** A hue/saturation/luminance qualifier or a tracked shape isolates faces so global moves do not drag them.
- **Do not let a teal-shadow look drain warmth from darker complexions.** Melanin-rich skin loses depth fast under cooling and under naive contrast increases. Keep warmth present in darker skin areas even while the rest of the frame cools.
- **Do not boost saturation globally to make dark skin richer.** It over-saturates lighter skin in the same frame. Mask, and monitor the vectorscope skin-tone line.
- **Mixed skin tones in one frame are the hard case.** They require per-subject balance passes, not one global compromise.
- **Treat a LUT as a starting point and always run secondary correction per subject.**

Asa Shoul's framing of when heightened skin is legitimate: a "pushed" grade where environments and skin tones look unnatural or heightened can work for fantasy or comic-book material, but *"it might jar the viewer if it was applied to a documentary or more natural feeling film."* **[SOURCED: Shoul, Televisual, 2018]**

Also note his ordering discipline: he balances scenes together **before** diving in to adjust face color or skies. **[SOURCED: same]** Correcting faces on top of an unbalanced base is how grades collapse.

### 4.6 Secondaries and power windows

**[PRINCIPLE]** The local toolkit, in rough order of aggression:

| Tool | What it does | Risk |
|---|---|---|
| **Grads** | Linear/radial density ramps. Skies, floors, ceiling falloff | Visible edge if the frame has strong horizontal features |
| **Vignettes** | Draw the eye to centre or to a subject | Reads cheap if too fast or too circular |
| **Tracked power windows** | Follow a face, a product, a moving object | Tracking failure on occlusion; softness mismatch |
| **HSL qualifiers** | Isolate by hue, saturation, and luminance | Chatter and buzzing edges on noisy or compressed footage |
| **Hue-vs-hue / hue-vs-sat curves** | Surgical hue rotation without a hard mask | Banding if pushed hard on 8-bit sources |
| **Relighting / shaping passes** | Simulating a key or a bounce that was not there | Only convincing when it matches the physical light logic of the scene |

Asa Shoul's pass structure is the standard: balance shots together, then a pass for the look of the film, then further passes to shape the images, **applying grads and shapes to highlight areas of the frame or push them back into shadow.** **[SOURCED: Shoul, Televisual, 2018]**

Paul Ensby (Company 3) works the same shape: a basic matching pass first to gauge the flow, then secondaries, then a third pass, *"rather than getting bogged down in smaller details too early."* **[SOURCED: Ensby, Televisual, 2018]**

### 4.7 Sky replacement and screen replacement in the grade

**[PRINCIPLE]** Both sit on the border between color and VFX, and the border is defined by whether pixels are being *shaped* or *manufactured*.

**Sky.** A sky that still has data can be graded: density via a grad, hue via a qualifier, and cloud contrast via a luminance-restricted contrast move. A sky that is clipped to white cannot be graded; it must be replaced, which is a comp. Shoul confirms he will composite a new sky from another take or stock **if possible**, which is the honest framing: it is a favour, it is billable time, and it depends on the plate. **[SOURCED: Shoul, Variety, 2021]**

**Screens.** Practical device screens and monitors are almost always a separate problem from the rest of the frame because they are emissive, they are usually a different color temperature from the ambient light, and in a commercial context they usually carry brand-critical UI. Standard handling:

- If the screen content is correct in-camera, isolate it and grade it separately so the show look does not shift the UI's brand colors.
- If the screen is to be replaced, the colorist grades the **plate** to final, VFX comps the screen insert, and the colorist then does a final pass to seat the insert into the frame with matching grain, halation, black level, and slight softness. Grain and noise mismatch is the number-one tell of a bad screen comp.

### 4.8 Film emulation

The dominant aesthetic pressure of the last decade. Soret, back in 2018: *"One current trend in grading is that everyone wants their digital to look like film."* **[SOURCED: Soret, Televisual]** Ensby, in the same piece, states the counter-position: *"I have pulled back a little from everything having to look like 35mm film."* **[SOURCED: Ensby, Televisual]** Both remain valid positions.

What "film emulation" actually decomposes into:

| Component | What it is |
|---|---|
| **Stock response curve** | The characteristic S-curve, its toe and shoulder |
| **Cross-channel behaviour** | Film's channels are not independent; density in one affects the others |
| **Halation** | Red-biased bloom around bright sources, from light scattering back off the film base |
| **Grain** | Structured, luminance-dependent, not uniform noise |
| **Gate weave / softness** | Rarely wanted, occasionally decisive |
| **Print emulation** | The second stage. Grading to the target print stock, historically via printer lights |

Yvan Lucas is the strongest living link between the two eras. He was one of the busiest photochemical color timers in France before grading *Amélie*, France's first digitally-graded feature. He says he learned in a photochemical lab, where *"when making color on the print, you don't see what you are doing directly,"* which is how he acquired his color memory. **[SOURCED: Lucas, FilmLight / Digital Media World]** With Rodrigo Prieto he maintains film-style protocols, grading dailies using only LUTs and digital printer lights. **[SOURCED: postPerspective / Digital Media World coverage]** Lucas: *"I started out as a film timer. Rodrigo and I both love the way different film stocks, each with different characteristics, would affect the look of photography in different eras. Even when we are working on something that was shot digitally, we both love to do the kind of preparation we did here to design the 'film stock' so to speak as a basis for the final look."* **[SOURCED: Company 3, 2023]**

Company 3's own claim on this, from Stefan Sonnenfeld: *"At Company 3, we can replicate things mathematically, like the Technicolor look from years ago that was only able to be achieved through lab work."* **[SOURCED: Sonnenfeld, British Cinematographer]**

And the counter-warning, from Goldcrest's Jet Omoshebi, on what HDR and higher resolution strip away: *"the lovely imperfections, the lovely lens flares and bends and distortions, the slight mist of film stock, that granular feeling as if you were looking at something that was living and breathing. That slightly gets stripped away. You have to be sure that you don't lose the things you love about making pictures."* **[SOURCED: Omoshebi, British Cinematographer]**

### 4.9 Grain and texture

**[PRINCIPLE]** Grain is not decoration. It does three jobs:

1. **Dither.** It breaks up banding in gradients, especially skies and soft falloff on walls.
2. **Unification.** It seats VFX comps, stock footage, archive, and mixed-camera material into one texture.
3. **Perceptual sharpening.** A finely grained image reads as more detailed than a clean one at the same resolution.

Peter Doyle's expanded definition of the job is the right frame: *"I don't consider colour grading to be just about changing colour. It's also about changing the sharpness of the image, the density, the texture, the film's patina. It's doing something to the image to evoke a certain mood, to try and give the image physicality."* On one feature he used blurs, flares and more to keep focus on the lead actor's eyes, sharpening eyes and dropping down backgrounds, because from halfway through the film the performance lived entirely in the eyes. **[SOURCED: Doyle, FilmLight Meet The Colourist]**

---

## A5. COLOR THEORY AS IT IS ACTUALLY APPLIED

Textbook color theory and set color theory are different disciplines. What survives contact with production:

### Complementary schemes

**[PRINCIPLE]** Orange/teal became a cliché because it is genuinely efficient: human skin sits in the orange family, so pushing everything non-skin toward the complementary blue-cyan maximises subject separation with one move. The cliché is not the scheme, it is applying it without motivation. The professional version motivates the complement physically: a sodium streetlamp against a moonlit street, a tungsten interior seen from a blue exterior, a fire against dusk.

Other working pairs:
- **Red/green.** Aggressive, festive, or sickly depending on value and saturation.
- **Yellow/violet.** Rarely used, high impact, reads as heightened or theatrical.
- **Analogous (single-family) schemes.** All-amber, all-cyan, all-green. Reads as immersion, oppression, or a controlled institutional world. Loses subject separation, so it needs contrast or value to do the separating instead.

### Temperature contrast, and why warm practicals against cool screens is the default device

**[PRINCIPLE]** This is the most common device in contemporary interior photography and it works for compounding reasons:

1. **It is physically true.** Domestic practicals run warm (roughly 2700–3000K). Device screens, LED panels, and daylight through a window run cool (6500K and up). The eye reads the combination as real before it reads it as designed.
2. **It creates depth for free.** Warm advances, cool recedes. A warm foreground practical against cool ambient produces perceived depth with no additional lighting unit.
3. **It gives the colorist two independent handles.** Warm and cool ranges can be graded separately without either becoming a global tint, because they are separable in the hue and luminance domain.
4. **It carries meaning cheaply.** Warm equals human, domestic, safe, past, alive. Cool equals institutional, technological, isolated, future, surveilled. A face lit by a phone in a cold room is an entire emotional premise with no dialogue.

The device fails in exactly one predictable way: when the DP does not give the colorist **separation**. If the practical and the ambient are within a few hundred kelvin of each other, or if the practical is not actually in frame or not actually motivating anything, the colorist can only fake the split with masks, and masks on a moving subject in an interior are expensive and fragile.

### Desaturation versus saturation as emotional tools

**[PRINCIPLE]**

| Move | Reads as | Fails when |
|---|---|---|
| Global desaturation | Memory, grief, austerity, documentary truth, moral seriousness | Applied to material that has no other source of interest; the image just goes dead |
| Selective desaturation (world down, one element held) | Focus, obsession, symbolic weight | Too obvious; the held color becomes a gimmick |
| Global saturation lift | Vitality, appetite, childhood, artifice, celebration | Skin goes ruddy, product goes wrong, reds clip first |
| Selective saturation (one hue family lifted) | Brand presence, world identity, fantasy | Reads as a filter if the hue is not physically present in the world |

The correct professional instinct is Soret's: *"I don't like too much forced looks unless there is a good reason."* Paired with his other rule, which is the opposite and equally true: *"Always go too far, you can always back down later but at least you will not regret missing an opportunity."* **[SOURCED: Soret, Televisual, 2018]**

---

## A6. HOW THE GRADE RELATES TO WHAT THE DP SHOT

### Exposure latitude is the budget the grade spends

**[PRINCIPLE]** Every stop of correctly-placed exposure latitude is a stop of grading freedom. Every clipped highlight and every shadow buried in the noise floor is freedom that was spent before the colorist arrived.

Bogdanowicz uses the photochemical term for this deliberately. She aims to produce something that holds up across all formats and variables, almost making a **"thick negative"** as they used to say in the all-film days, meaning a well-exposed negative that could be manipulated later without an increase in grain. **[SOURCED: Bogdanowicz, Sony Cine]**

The practical implication for a DP: **protect the highlights, expose to keep faces off the noise floor, and accept that a slightly-bright-but-unclipped image is worth more in the grade than a "perfectly" exposed one that clips a window.**

### You cannot grade your way out of a bad lighting plan

**[PRINCIPLE, corroborated]** The reason is structural, not technical. Grading operates on *values already present in the frame*. Lighting operates on *which values exist at all*.

- Lighting creates **direction**. Grading can only darken or brighten an existing region.
- Lighting creates **shadow shape and falloff**. A power window's falloff is a mathematical gradient, not a physically-plausible one, and the eye knows the difference on a moving subject.
- Lighting creates **separation between subject and background**. If the subject and background are the same value and the same hue, the colorist has to build separation with masks, and every mask is a tracking liability.
- Lighting creates **specularity**. There is no grading operation that puts a highlight in an eye that was never lit.

This is exactly why Shoul wants to read the script before testing begins and discuss the shooting schedule with the DP, so they can find solutions for scenes that might prove difficult: day-for-night, locations where the crew cannot add atmosphere, colors the filmmakers want changed for story, complex VFX sequences. **[SOURCED: Shoul, Variety, 2021]**

Peter Doyle's advice to aspiring colorists is the same lesson from the other side: spend as much time on set as possible and learn everything you can about lighting, so you can have an informed discussion with the DP and director. **[SOURCED: Doyle, FilmLight]**

### Deep focus versus shallow depth of field changes the available toolkit

**[PRINCIPLE]** This is under-discussed and materially affects what the colorist can do.

**Shallow depth of field:**
- The background is already separated optically. The colorist does not need to build separation and should be careful not to double it.
- Power windows on the subject are easier, because the soft background hides mask edges.
- Grain and texture need care: heavy grain over a defocused background looks like noise, not film.
- Sky and background replacement is easier (soft plates comp well) but background color grading is less impactful, because there is less detail to modulate.
- Halation and bloom on defocused practicals is where most of the visible "look" ends up living.

**Deep focus:**
- Every plane is legible, so **every plane must be graded**. Continuity errors in the background become visible.
- Power windows are dangerous, because a soft-edged mask crossing a sharp background edge is immediately visible.
- Separation must come from value and hue, which means the colorist depends far more heavily on Production Design and Wardrobe having built real contrast into the world.
- Secondaries by hue (rather than by shape) become the primary local tool, because they respect edges automatically.
- Sky replacement is much harder; a sharp horizon line with foreground detail crossing it is a roto job.

**The practical rule:** shallow DOF buys the colorist shape-based tools. Deep focus forces the colorist into hue-based tools and makes the grade dependent on upstream palette discipline.

---

## A7. NAMED PRACTITIONERS AND SIGNATURE APPROACHES

| Practitioner | Base | Signature work | Stated method |
|---|---|---|---|
| **Stefan Sonnenfeld** | Company 3 (co-founder, CEO) | *Man on Fire*, *300*, and three decades of features and ads with Ridley Scott, Spielberg, Bay, Verbinski, Abrams, Michael Mann, Zack Snyder | Treats DI as an emotional instrument, not enhancement. On *Man on Fire* with DP Paul Cameron ASC and Tony Scott, they manipulated the image to evoke different emotions for the lead's different states of mind. On *300* with DP Larry Fong ASC, essentially the entire look was created in transfer and DI. Calls color grading *"a team sport"* where the job is interpreting what the director says and getting it onto the screen. **[SOURCED: British Cinematographer; Company 3 / LBB]** |
| **Tim Masick** | Company 3 New York (co-founder, 2002) | *Tár* (with dir. Todd Field, DP Florian Hoffmeister); Dior SS21 (DP Benoit Delhomme); Zara Man SS23 (dir. Fabien Baron); golden-age hip-hop music videos | Reference-driven from painting and photography. Dior SS21 used chiaroscuro, strong skin against moody settings, explicitly in the style of Caravaggio and Renaissance painting. Zara Man SS23 built a fantasy/dream world referencing *Red Desert*, *Paris, Texas*, and photographer Todd Hido. His jury criterion: *"Colour should correlate, support, and build the idea and concept of the project. It shouldn't be, 'Hey, look at my colour correction!'"* **[SOURCED: LBB / FilmLight Colour Awards, 2024]** |
| **Tom Poole** | Company 3 (CCO, Senior Colorist) | *12 Years a Slave*, *Moonlight*, *Spotlight*, *Small Axe*, *Euphoria*, *Cruella*, *Drive*, *Widows* | Builds a LUT per show. Colour-bible pass then sizzle-reel review, sculpture method. References **photography, not other films**. Wants the frame to read like a moving photographic print. Names Jean-Clément Soret's work on *Amélie*, *City of Lost Children*, *Delicatessen* as formative. Values "positive conflict" with DPs. **[SOURCED: Televisual, 2022]** |
| **Jill Bogdanowicz** | Company 3 (Co-Head, Features Color) | *Joker* (HPA Award), *Black Widow*, *Spider-Man: No Way Home*, *John Wick 3* and *4*, *The Umbrella Academy*; HPA commercial award for an automotive Paralympian spot | Gets involved in pre-production, does hair and makeup tests with the DP, builds the show LUT from the outset. One LUT plus CDLs. Aligns DIT and dailies colorist to the same LUT. Sends the LUT to VFX. *"70% of my job is psychology."* Grades toward a "thick negative" that survives every delivery format. **[SOURCED: Sony Cine, 2021]** |
| **Peter Doyle** | Warner Bros. De Lane Lea / formerly Technicolor London | *The Lord of the Rings* trilogy, six *Harry Potter* films, *Charlie and the Chocolate Factory*, *Inside Llewyn Davis*, *The Theory of Everything*, *Big Eyes*, *The Tragedy of Macbeth* | Came from VFX and compositing. Digitally emulated bleach-bypass rather than physically bleaching a negative. Treats grading as design, not correction: sharpness, density, texture, patina. Builds custom tools (had a modified LAB space built to construct a colour arc). Says you have to **grade a film three times** before you find where it should be. Carries multiple grade versions of scenes to delivery. Influenced by the Düsseldorf School of Photography, Ernst Haas, Richard Misrach, Gordon Parks, Fan Ho. **[SOURCED: FilmLight Meet The Colourist; British Cinematographer]** |
| **Yvan Lucas** | Company 3 | *Amélie* (France's first digitally-graded feature), *Barbie*, *The Irishman*, *Killers of the Flower Moon*, *Delicatessen*, *The City of Lost Children* | Trained as a photochemical timer. Builds bespoke film-emulation and three-strip Technicolor LUTs with DP Rodrigo Prieto and colour scientist Philippe Panzani, engineered into a proprietary Baselight plug-in. Grades dailies with LUTs and digital printer lights, film-style. **[SOURCED: Company 3, 2023; FilmLight; Digital Media World]** |
| **Walter Volpatto** | Company 3 / Picture Shop | *Dunkirk*, *Star Wars: The Last Jedi*, *Green Book*, *Megalopolis* | ACES pioneer, Academy member, ASC associate, consultant to the Academy Science and Technology Council. Applies film-emulation LUTs at full opacity and transforms color space to Cineon log / 709 primaries. Works in ACEScc/ACEScct specifically because an offset there is mathematically equivalent to an exposure change. **[SOURCED: Lowepost; Wikipedia; icolorist]** |
| **Siggy Ferstl** | Company 3 Los Angeles | *Lost in Space* (Lumiere Award, Best Use of HDR in a Series), *Togo*, multiple HPA color awards | Australia/SE Asia/London background before LA. His stated first rule for Dolby Vision HDR: *"Understand the look the filmmakers are wanting and establish early on the brightness levels, how far you want to push the highlights. That's the number one thing to establish before you even start doing the creative color."* **[SOURCED: postPerspective]** |
| **Asa Shoul** | Warner Bros. De Lane Lea, London (formerly Framestore) | *The Crown* (BAFTA Craft), *Last Night in Soho*, *Ex Machina*, *Baby Driver*, *Annihilation*, *Isle of Dogs*, *The Constant Gardener*, *United 93* | The clearest public voice on the limits of post. Wants the script at script stage, tests with the whole production team present including art, costume, and makeup. Pass structure: balance, then look, then shape. Shows DPs what can be emulated later (diffusion, lens halation) so they can shoot clean for VFX. **[SOURCED: Variety, 2021; Televisual, 2018]** |
| **Adam Glasman** | Goldcrest Post | *The Danish Girl*, *Three Billboards Outside Ebbing, Missouri*, *Skyfall*, *Cold Mountain*, *The Death of Stalin* | Pre-production camera/lens and hair/makeup tests; builds look LUTs from test material. **Grades previews before the main DI**, even at low resolution, because it lets filmmakers see grade concepts in context for the first time. Watching an up-to-date cut before the DI is the single most important step. Works from named photographers and painters as references. **[SOURCED: Televisual, 2018]** |
| **Jean-Clément Soret** | Technicolor London | *Slumdog Millionaire*, *28 Days Later*, *Steve Jobs*, *You Were Never Really Here*, *127 Hours* | Emulates the neutral photochemical 25-point print as a starting point before any creative work. Presents options as he goes rather than waiting for a brief. *"Always go too far, you can always back down later."* **[SOURCED: Televisual, 2018]** |
| **Dave Hussey** | Company 3 Los Angeles | Four decades across film, TV, music video and advertising; commercial credits across automotive, beverage, gaming and tech | *"A good colorist will look at the story and think to himself, what can I do to enhance this world."* **[SOURCED: Company 3 / Blackmagic Design interview]** |

---

## A8. THE EVOLUTION

### Photochemical timing (to roughly 1998)

The color timer worked in a lab. The instrument was **printer lights**: 50 discrete points per channel (red, green, blue), adjusted per shot, applied when the negative was printed. The DP chose a negative stock and a print stock, and those two choices largely defined the look of the film. **[SOURCED: Toby Tomkins of Cheat, British Cinematographer: *"Back in the film days, they'd choose a negative stock, and the print stock, and that pretty much defined look of the film."*]**

Two consequences that still shape the craft:
- **Timing was global per shot.** No secondaries, no windows, no local work.
- **You could not see what you were doing directly.** Lucas says this is precisely how he built his color memory. **[SOURCED: Lucas, FilmLight]**

### The DI era (roughly 1998 to 2012)

The turning point was scanning film at high resolution, grading digitally, and recording back to film.

Milestones with published attribution:
- **1998, *Dark City*.** Doyle graded an end sequence for a hyper-real sunrise as colour-intensive VFX work. **[SOURCED: Doyle, FilmLight]**
- **1999, *The Matrix*.** The Wachowskis wanted a bleach-bypass on the camera negative. Doyle proposed digitally emulating it instead, ran a proof of concept against the lab process, and graded an entire reel. **[SOURCED: same]**
- **2000, *O Brother, Where Art Thou?* (DP Roger Deakins).** Widely cited as the first feature where every single frame was graded digitally. **[SOURCED: Toby Tomkins, British Cinematographer]**
- **2001, *The Lord of the Rings: The Fellowship of the Ring*.** Doyle used SACC (Stand-Alone Colour Corrector), developed by Colorfront, which later evolved into Autodesk Lustre. The creative problem was making New Zealand's southern-hemisphere light match soft northern European light. The film was so colour-intense it took a team of three colorists. **[SOURCED: Doyle, British Cinematographer and FilmLight]**
- **2004, *Man on Fire*.** Sonnenfeld and Tony Scott used DI to shift the image with the protagonist's mental states. Sonnenfeld calls it one of the first times that was done effectively with the process. **[SOURCED: British Cinematographer]**
- **2006, *300*.** Essentially the entire look created in transfer and DI. Sonnenfeld: *"a perfect example of the extreme."* **[SOURCED: same]**

Doyle's summary of the significance: *"There is a skillset or process that did not exist before DI. The scale of this can be seen everywhere in the fact that all films, with a few exceptions, have adopted DI as a process."* **[SOURCED: British Cinematographer]**

Sonnenfeld's summary of the shift in kind: the lab process was *"more of an enhancement... rather than what the DI process is today... you can change things quite significantly. That's the whole point of the process, the flexibility of creativity and artistry."* Adoption was not smooth: Tony Scott, Michael Mann and Ridley Scott were early supporters, but *"a lot of people were hesitant, there were some very big naysayers. And then it turned."* **[SOURCED: same]**

### The HDR / Dolby Vision era (roughly 2014 onward)

The technical shape of a Dolby Vision deliverable:

1. Grade the HDR master in PQ (commonly to a 1000-nit or 4000-nit target).
2. The timeline is **analysed**, generating shot-by-shot metadata about image content.
3. The colorist performs a **trim pass**, viewing each shot while monitoring a derived 100-nit SDR version, and adjusting how the Dolby algorithm maps the PQ image down.
4. The **100-nit Rec.709 trim is required.** Additional target trims (600-nit, 1000-nit) may be added; Dolby Vision supports up to four target trims per deliverable. Each additional trim needs only minimal adjustment because of the surrounding trims.
5. Consumer displays reconstruct the right version in real time through the integrated Content Mapping Unit.

**[SOURCED: Dolby Vision Color Grading Best Practices Guide v4.x; Mixing Light's Dolby Vision workflow series]**

What practitioners actually say about it:

- **Establish highlight ceiling first.** Ferstl: brightness levels and how far you push highlights is *"the number one thing to establish before you even start doing the creative color."* **[SOURCED: postPerspective]**
- **HDR pushes toward a single master.** Doyle: *"HDR with its larger colour space and dynamic range is slowly moving the industry towards the idea of one master version of the film, from which we generate the various delivery formats."* **[SOURCED: British Cinematographer]**
- **HDR gives per-channel range, not just brightness.** Toby Tomkins: in HDR you can use the range of one channel to keep color in the highlights without sacrificing overall scene brightness, which is why practicals look substantially better in the HDR version than the SDR version of the same show. **[SOURCED: same]**
- **HDR is a second grade, or it is not.** Soret: some clients embrace HDR and *"it almost becomes a second grade,"* others do not and the HDR looks almost the same as the SDR. **[SOURCED: Televisual]**
- **HDR needs containment as often as expansion.** Ensby: some scenes explode with contrast and detail, others require a lot of containment because the image needs a subtler, softer approach. **[SOURCED: same]**
- **HDR imposes new set rules.** Shoul: do not put actors in front of windows, because the extra sky brightness available in HDR can make the actor read as less visible. **[SOURCED: Variety]**

### Today

Three simultaneous states:

1. **Colour management is standardised and the colorist is upstream.** The DI stage may not even be the same essential process in a fully-digital workflow, but the colorist is now routinely treated as part of the camera team, not a post-production step. **[SOURCED: British Cinematographer, framing of the special report]**
2. **Capture is understood as intermediate, not final.** Tomkins: *"The general trend is slowly edging its way towards optimising the capture to the end result and not seeing the capture as the final result. That's a seismic shift... The future of grading is about making the tools intuitive, very natural and scene-referred, as opposed to subjectively taste-referred."* **[SOURCED: same]**
3. **Deliverable count has exploded.** Bogdanowicz names the underlying problem directly: material does not end up in a single color space, and even if the colorist owns the LUT from the beginning, there is still a lot to consider and change later. Her deeper point is perceptual, not technical: *"Everybody's perception is based on whatever display they're looking at. The perception is arguably more important than the objectively technical because it is what the viewer will experience. Figuring out how someone experiences a small screen differently requires creative imagination; it is a creative process."* **[SOURCED: Sony Cine]**

**Systems in professional use:** Blackmagic DaVinci Resolve and FilmLight Baselight are the two stalwarts; also Autodesk Lustre (descended from Colorfront's SACC), Assimilate Scratch, Digital Vision Nucoda, SGO Mistika. **[SOURCED: British Cinematographer]** Adam Inglis's note on this is practical: *"You can't really restrict yourself to just one system as a freelancer."* **[SOURCED: Televisual]**

---

## A9. VOCABULARY GLOSSARY

| Term | Definition |
|---|---|
| **ACES** | Academy Color Encoding System. A standardised colour-managed pipeline: IDT into a common working space, grade, ODT out to each display. |
| **ACEScct** | The log working space with a toe, used by most DI facilities because lift behaves like a traditional log film scan. |
| **AP0 / AP1** | The two ACES primary sets. AP0 is the wide archival gamut (ACES2065-1); AP1 is the smaller working gamut (ACEScg, ACEScc, ACEScct). |
| **Balance / one light** | A neutral, non-creative correction that represents what was actually exposed. The honest starting point. |
| **BLG** | Baselight Linked Grade. FilmLight's portable grade container that carries a look between departments. |
| **CDL / ASC CDL** | Color Decision List. A minimal, portable correction (slope, offset, power per channel, plus saturation) that travels with the shot from set through dailies to VFX to the DI. |
| **Conform** | Rebuilding the editor's cut at full resolution from original camera files, ready to grade. |
| **Crush** | Deliberately clipping shadow detail to black. |
| **DaVinci Resolve / Baselight / Lustre / Nucoda / Mistika / Scratch** | The professional grading systems. |
| **Delta E (ΔE)** | A numerical measure of perceptible difference between two colours. The vocabulary brands use to specify how close a reproduced colour must be to the reference. |
| **DI** | Digital Intermediate. Historically, scan-grade-record-back-to-film. Now, colloquially, the final grade stage. |
| **DIT** | Digital Imaging Technician. On-set custodian of exposure, look application, and CDL generation. |
| **EDL / AAF / XML** | The edit list formats that carry the cut into the grading system. Critically, **LUTs do not travel with the EDL.** CDLs do. |
| **Halation** | Red-biased bloom around bright sources caused by light scattering off the back of the film base. Now emulated. |
| **HDR / PQ / HLG** | High Dynamic Range. PQ (SMPTE ST 2084) is the absolute-brightness transfer function used by Dolby Vision and HDR10. HLG is the broadcast-friendly relative alternative. |
| **IDT / ODT** | Input and Output Device Transforms in ACES. |
| **LUT (1D / 3D)** | Lookup Table. A 1D LUT remaps tone per channel; a 3D LUT remaps the full colour cube and can therefore change hue relationships. |
| **Node / layer / strip** | The unit of a grade operation, chained into a tree or stack. |
| **Nit (cd/m²)** | Unit of display luminance. SDR reference is 100 nits; HDR masters are typically 1000 or 4000. |
| **P3 / Rec.709 / Rec.2020** | Display gamuts. P3 for cinema, Rec.709 for SDR broadcast and web, Rec.2020 the container for HDR. |
| **Power window** | A drawn, usually tracked, shape isolating a region for local correction. |
| **Printer lights** | Photochemical timing units, 50 points per channel. Still used as a mental model and emulated digitally. |
| **Qualifier** | An HSL-based selection isolating pixels by hue, saturation, and luminance rather than by shape. |
| **Scene-referred vs display-referred** | Scene-referred data describes light in the scene; display-referred describes code values for a specific display. Modern pipelines grade scene-referred. |
| **Show LUT** | The single creative look table established in prep and carried through dailies, VFX, and the DI. |
| **Trim pass** | The Dolby Vision stage where each shot is adjusted while monitoring a derived lower-brightness target. |
| **Vectorscope skin line** | The diagnostic line on the vectorscope where healthy skin tone falls regardless of complexion. |

---

## A10. HOW COMMERCIAL AND ADVERTISING GRADING DIFFERS FROM FEATURE WORK

The tools are identical. The job is not.

| Dimension | Feature / long-form | Commercial / advertising |
|---|---|---|
| **Time** | Glasman: typically two to three weeks for a feature; over six weeks for VFX-heavy tentpoles with many delivery formats. Broadcast drama gets far less. Ensby: five days to four weeks for movies, two to three days *per episode* for broadcast drama. **[SOURCED: Televisual]** | Soret's inversion is telling: *"Drama is a race against the clock, commercials are a luxury, movies are in between."* **[SOURCED: Televisual]** Per-second, a commercial gets vastly more attention than any feature. |
| **Who is in the room** | Director and DP, sometimes producers | Director, DP, agency creative director, agency producer, and frequently the client. The colorist is managing a committee in real time. |
| **What "correct" means** | Whatever serves the narrative | Whatever serves the narrative **and** does not violate a brand colour rule **and** does not misrepresent the product |
| **Iteration model** | Passes over a whole film | Options presented live. The colorist is expected to produce alternatives on demand and revert instantly |
| **Deliverables** | Theatrical DCP, HDR master, SDR master, territory versions | Broadcast masters per territory and per network spec, online masters, vertical and square social crops, cutdowns at multiple durations, cinema, in-store, and out-of-home. Every one of these has different levels, different compression, and different viewing conditions |

### The three commercial-specific disciplines

**1. Brand colour accuracy.** Brands specify identity colours as Pantone/PMS references and hex values, and increasingly specify tolerance in **Delta E**, a single number representing how different two colours appear to the human eye. The colorist's obligation is that the brand colour survives the show look. This almost always means the brand element (logo, pack, livery, uniform) is qualified and held out of, or partially held out of, the global grade. Reference brand guidelines and swatch values anchor otherwise subjective decisions.

Practically: **ask for the brand guideline document before the session, not during it.** Hex values are display-referred sRGB and do not translate directly to a P3 or Rec.2020 grade, so somebody has to make the conversion decision consciously.

**2. Product colour fidelity.** Distinct from brand colour and often more contentious. Food must look edible, not styled into an unsellable hue. Fabric colour must match what ships, because a colour mismatch between the ad and the product is a returns problem and in some jurisdictions a compliance problem. Metallics, automotive paint, and cosmetics are the hardest categories because they are angle-dependent and read differently on every display.

**3. Cross-platform consistency.** The core commercial problem. One grade has to hold up on a calibrated broadcast chain, on a phone in daylight, on an in-store LED wall, and on a 6-sheet print derived from a frame grab. This is exactly the "thick negative" logic Bogdanowicz described, applied commercially: build something that holds up across all known formats and variables rather than optimising for one. **[SOURCED: Sony Cine]**

### The one thing commercial work is actually better at

Because commercials get more time per second and because the reference culture is stronger, advertising grading is where a lot of technique gets invented. Sonnenfeld on *300*: *"We'd been doing that work in music videos all the time."* The extreme look that became a landmark feature technique was already routine in short-form. **[SOURCED: British Cinematographer]**

Masick's two award-winning commercials are the model for how to brief a commercial grade: not "make it moody," but **a named painter (Caravaggio), a named art movement (Renaissance chiaroscuro), and named films with named cinematographers (*Red Desert*, Carlo Di Palma; *Paris, Texas*, Robby Müller) plus a named photographer (Todd Hido).** That is a specification a colorist can execute. **[SOURCED: LBB, 2024]**

---
---

# PART B: AGENT OPERATING MANUAL

**For an AI subagent occupying the Colorist seat in a multi-department pipeline.**

---

## B1. THE INTAKE QUESTIONS

When handed a script, a shot list, and the DP's plan, ask these. In this order. Do not skip to look design.

### Tier 0: Story and intent (before any technical question)

1. What is the story, and what changes in it? Bogdanowicz: *"I also really like to know the story of the film; it all starts there."* **[SOURCED]**
2. Does the visual world change across the piece? Where, and is the change meant to be felt or noticed?
3. Are there discrete worlds, timeframes, or mental states requiring distinct looks? If so: **are they meant to flow together seamlessly or read as distinct, and where do they cross over?** This is exactly Shoul's opening question on a two-world film. **[SOURCED: Variety]**
4. Whose point of view governs the image? Is there a subjective character whose state the image should track?
5. What is the emotional register at the start, at the midpoint, and at the end? Is there a colour arc?

### Tier 1: References and language

6. What references exist? Paintings, photographers, films, prior campaigns. Insist on **named** references, not adjectives.
7. For every film reference: which cinematographer, which colorist, which era, and shot on what? A reference is only actionable when its production conditions are known.
8. What is explicitly **not** wanted? Doyle notes that on one project *"It was clear what we did NOT want it to look like."* Negative references are often more precise than positive ones. **[SOURCED: FilmLight]**
9. Whose vocabulary am I translating? A first-time director's "warmer" and a veteran DP's "warmer" are different requests. Shoul allows roughly a day with a new client to learn their preferred levels of contrast and saturation and the terminology they use. **[SOURCED: Televisual]**

### Tier 2: Capture

10. Camera bodies, all of them. Any mixed-camera or mixed-format material, including drone, action cam, phone, archive, and stock?
11. Codec, bit depth, chroma subsampling, and recording format. Is anything recorded in a compressed 8-bit or 4:2:0 format? That constrains qualifiers and heavy grading.
12. Lenses and filtration. Is diffusion being applied in-camera or intended to be applied in the grade? If VFX is involved, the answer should lean toward "in the grade," per Doyle's and Shoul's practice. **[SOURCED]**
13. Exposure philosophy. Rating, and whether they are exposing to protect highlights or to protect shadows.
14. Frame rates, shutter, and any high-speed material.
15. Is any of this being shot against LED volume or with in-camera VFX? That changes colour management fundamentally.

### Tier 3: Colour management

16. What working colour space? ACES, camera-native log, or a facility pipeline?
17. What is the monitoring space **on set**? Rec.709, P3, or HDR? Bogdanowicz flags this as a real reconciliation problem later. **[SOURCED]**
18. Who builds the show LUT, and when? If it already exists and I did not build it, **I must run it through its paces** before trusting it. **[SOURCED: Bogdanowicz]**
19. Has the LUT been checked for VFX-destructive behaviour, specifically anything that makes keying harder? **[SOURCED: Bogdanowicz]**
20. One LUT or more? If more, **who is tracking which LUT went on which scene**, given that LUTs do not follow the EDL? **[SOURCED: Bogdanowicz]**

### Tier 4: Palette dependencies

21. What is Production Design's palette? Named colours, values, and where each dominates.
22. What is Wardrobe's palette, per character or per scene block? Any fabric that is metallic, fluorescent, or highly saturated? Fluorescent dyes and some blues behave unpredictably under digital capture and can go out of gamut.
23. Any makeup or lipstick decisions with a strong hue commitment? Shoul ran dedicated lipstick tests specifically to avoid hundreds of shot-level fixes later. **[SOURCED]**
24. Are there scenes where subject and background will be similar in value and hue? If so, flag now.
25. **Brand rules (commercial only).** Which colours are locked? Pantone/hex values, tolerance, and whether the brand colour may be affected by the show look at all.

### Tier 5: Practical execution risk

26. Which scenes are the hard ones? Day-for-night, exteriors across a long shoot day, sequences without the ability to add atmosphere, colours the story requires to change, and VFX-heavy sequences. Shoul asks this explicitly, from the script and the schedule. **[SOURCED]**
27. Are there windows or bright practicals in frame with talent in front of them? Especially relevant if HDR is a deliverable. **[SOURCED: Shoul]**
28. Any screens or devices in frame carrying content? Practical, comped, or replaced?
29. Any skies that matter? Are they clipping?
30. How many distinct complexions appear in the same frame at once?

### Tier 6: Delivery

31. Full deliverable list: every format, every aspect ratio, every duration, every platform, every territory.
32. Is HDR required? Which flavour, what nit target, how many trim targets?
33. Is there a print or out-of-home derivative coming from a frame grab?
34. Who signs off, in what order, and who can overrule whom?
35. How much grading time exists, and is it attended or unattended?

---

## B2. DECISION CHECKLIST IN DEPENDENCY ORDER

Each step is blocked by the one above it. Do not reorder.

| # | Decision | Blocked by | Cannot be deferred past |
|---|---|---|---|
| 1 | Story intent and emotional arc | Script | Any look conversation |
| 2 | Number of distinct visual worlds and their relationship | 1 | LUT design |
| 3 | Reference set, positive and negative | 1, 2 | Camera test |
| 4 | Delivery matrix (all formats, all platforms) | Production/client | Colour space choice |
| 5 | Working colour space and pipeline (ACES vs native log) | 4 | Camera test |
| 6 | Camera, lens, and filtration package confirmed | DP | LUT design |
| 7 | Palette lock from Production Design and Wardrobe | Design departments | Camera test |
| 8 | Brand colour rules and tolerances (commercial) | Client | LUT design |
| 9 | **Camera / lens / wardrobe / hair / makeup test, with those departments present** | 5, 6, 7 | Principal photography |
| 10 | Show LUT built, tested, and locked | 9 | First day of dailies |
| 11 | LUT validated as VFX-safe | 10, VFX | LUT distribution |
| 12 | LUT distributed to DIT, dailies colorist, and every VFX vendor | 10, 11 | First day of dailies |
| 13 | CDL discipline agreed (who sets, who tracks, how it travels) | 12 | First day of dailies |
| 14 | Highlight ceiling and HDR brightness policy | 4, 10 | Any creative HDR grading **[SOURCED: Ferstl]** |
| 15 | Watch the current cut, end to end, before touching anything | Editorial | The DI **[SOURCED: Glasman: the most important step]** |
| 16 | Conform verified against the cut | Editorial, 15 | Grade start |
| 17 | Balance pass. Neutral, matched, no look | 16 | Look pass **[SOURCED: Shoul, Ensby]** |
| 18 | Look pass. Scene-level, big blocks only | 17 | Detail pass |
| 19 | Sizzle-reel review of scene selects in order | 18 | Detail pass **[SOURCED: Poole]** |
| 20 | Shape pass. Grads, windows, qualifiers, relighting | 19 | Skin pass |
| 21 | Skin pass. Per-subject, per-complexion | 20 | Texture pass |
| 22 | Brand and product colour verification pass (commercial) | 21, 8 | Client review |
| 23 | Texture pass. Grain, halation, softening, sharpening | 21 | VFX seating |
| 24 | VFX seating pass. Match comps into the graded plate | 23, VFX finals | Master render |
| 25 | Primary master render and QC | 24 | Trims |
| 26 | HDR trim passes, in order: required 100-nit Rec.709 first, then optional targets | 25 | Delivery **[SOURCED: Dolby]** |
| 27 | Per-platform and per-aspect versions, each QC'd for levels and reframe safety | 26 | Delivery |
| 28 | Archive: ACES2065-1 or camera-native plus grade data, plus every LUT and CDL used | 27 | Wrap |

---

## B3. WHAT THIS ROLE NEEDS FROM OTHER DEPARTMENTS

Nothing below is optional. Any missing item is a blocker and should be reported as one.

| From | Required input | Needed by | Consequence if missing |
|---|---|---|---|
| **Director** | Story intent, emotional arc, references (named), explicit negatives, approval authority chain | Before camera test | Look is guesswork; grade gets rebuilt late |
| **Cinematography** | Camera bodies, lenses, filtration, exposure rating and philosophy, lighting plan per scene block, colour temperature strategy per location, high-speed and mixed-format material list | Before camera test | LUT built on wrong assumptions; latitude unknown |
| **Cinematography** | Confirmation of which look elements are in-camera versus deferred to the grade | Before shoot | Double-application (diffusion in-camera **and** in grade) or a gap |
| **Production Design** | Palette per set with named values, dominant hue per location, paint and material samples, any fluorescent or metallic surfaces | Before camera test | Separation problems that cannot be fixed with masks |
| **Wardrobe** | Palette per character per scene block, fabric samples, any fluorescent dyes, saturated blues, metallics, high-contrast patterns | Before camera test | Out-of-gamut costumes; skin/costume conflicts |
| **Hair & Makeup** | Lipstick, foundation, and any strong-hue decisions; the complexion range of the cast | Before camera test | Hundreds of shot-level fixes later **[SOURCED: Shoul]** |
| **VFX** | Plate list, which shots are comps, delivery schedule for finals, confirmation the show LUT does not break their keys, and the colour space they will work and deliver in | Before LUT distribution | Comps that will not seat; keying failures **[SOURCED: Bogdanowicz]** |
| **Editorial** | Locked or near-locked cut, EDL/AAF/XML, media list, and the list of any speed changes, reframes, or stabilisation applied | Before conform | Conform errors; grading shots that get cut |
| **DIT / dailies** | CDLs per shot, confirmation the correct show LUT is loaded, on-set monitoring colour space | Daily | No trace of on-set intent; disconnect at the DI **[SOURCED: Bogdanowicz]** |
| **Production / Client** | Full delivery matrix, per-platform technical specs, review and approval chain | Before colour space lock | Wrong master; expensive re-grades |
| **Brand / Client (commercial)** | Brand guideline document with Pantone and hex values, tolerance in ΔE if specified, product colour references, and which elements are immutable | Before LUT design | Brand colour violation discovered at client review |

---

## B4. WHAT THIS ROLE OWES OTHER DEPARTMENTS

| To | Owed | When |
|---|---|---|
| **Cinematography** | An honest read on what their exposure and lighting plan will buy in the grade, including what will not be recoverable | At the test, before the shoot |
| **Cinematography** | The show LUT, plus a demonstration of what can be added later (diffusion, halation, film texture) so they can decide what to shoot clean **[SOURCED: Shoul, Doyle]** | At the test |
| **Cinematography** | Honesty when the image is being compromised or the look is working against the narrative. Shoul: *"if asked I feel it's important to be honest."* **[SOURCED]** | Continuously |
| **Director** | Options, shown as images rather than described. Bogdanowicz: because we are dealing with images, it is a matter of **showing** rather than describing. **[SOURCED]** | Every session |
| **Director** | An explanation of how the work will look on non-ideal displays, and why certain choices were made to survive them **[SOURCED: Bogdanowicz]** | Before final approval |
| **Production Design / Wardrobe / Makeup** | Test footage graded with the intended look, so they can see how the grade will affect their work **while there is still time to change it** **[SOURCED: Shoul]** | At the test, before build and fitting lock |
| **VFX** | The show LUT and CDLs, so they can preview their work under the intended look and match main-unit material **[SOURCED: Bogdanowicz, Doyle]** | Before they start |
| **VFX** | Confirmation the LUT will not break their keys, or a modified LUT that will not **[SOURCED: Bogdanowicz]** | Before they start |
| **VFX** | Precise notes on which fixes are being handed to them versus handled in colour | At handover |
| **Editorial** | Graded dailies that represent final intent, so producers and studio see the same image throughout **[SOURCED: Bogdanowicz, Doyle]** | Daily |
| **Editorial / Producers** | Graded previews, even from low-resolution editorial media, so filmmakers see the concept in context early **[SOURCED: Glasman]** | Before the main grade |
| **Production** | Early flags on problems that can only be fixed on set, while the unit is still there **[SOURCED: Bogdanowicz]** | Immediately, always |
| **Client (commercial)** | A named-reference-anchored look proposal before the session, plus documented brand-colour handling | Before the attended session |

---

## B5. STANDARD TENSIONS AND TYPICAL DIRECTOR RESOLUTIONS

| With | The tension | How it usually resolves |
|---|---|---|
| **Cinematography** | The DP shot for one intent; the director now wants a different one in the room | Director wins, but the professional move is Poole's "positive conflict": debate it openly, the way an editor debates a cut with a director. **[SOURCED]** The colorist should say what is being lost before executing. |
| **Cinematography** | DP wants heavy in-camera filtration; VFX needs clean plates | Shoot clean, rebuild the filtration in the grade. Doyle rebuilt over 600 custom filter looks digitally for exactly this reason. **[SOURCED]** Director signs off on the deferral. |
| **Cinematography** | DP wants scene-specific LUTs; colorist wants one | One LUT plus CDLs, because LUTs do not follow the EDL. **[SOURCED: Bogdanowicz]** If multiple LUTs are unavoidable, production must resource someone to track the mapping. |
| **Cinematography** | The lighting did not deliver separation; colorist is asked to build it | Colorist builds what masks allow and states the cost in time and fragility. If it is a recurring set, the honest resolution is a lighting note for the next day, not a permanent grading workaround. |
| **Production Design** | The set palette fights the intended look; the intended look kills the set's expensive colour | Resolve at the camera test, not the DI. Director chooses which one bends. If unresolved, the colorist protects the set colour with a qualifier and the look loses reach. |
| **Wardrobe** | A costume colour goes out of gamut or clashes with the show look | Test before fitting lock. If discovered late, the colorist qualifies the garment, which is expensive and fragile on movement. Director decides whether the look or the garment survives. |
| **Hair & Makeup** | A lipstick or foundation reads wrong under the look across hundreds of shots | Test in prep. Shoul's precedent is explicit. **[SOURCED]** Late discovery means a per-shot secondary pass, which is a schedule and budget event. |
| **VFX** | Comps do not seat: wrong black level, wrong grain, wrong halation | Colorist owns the seating pass, VFX owns the comp. If the comp is fundamentally colour-mismatched, it goes back. Director arbitrates on time. |
| **VFX** | VFX delivers late; the grade is already built | Colorist grades holdouts and re-applies. This is why grade data must be node-structured for reapplication, not baked. |
| **Editorial** | The cut changes after the grade starts | Standard, expected. Grade in a way that survives re-conform. Doyle's approach of re-issuing graded rushes so the editor can recut freely without needing shots graded is the mature version. **[SOURCED]** |
| **Client / Agency (commercial)** | Client wants the brand colour "more correct," which fights the look | Brand colour is held out via qualifier and graded to spec independently. The look applies to everything else. Non-negotiable in commercial work. |
| **Client / Agency** | Room-by-committee: every attendee has a note, notes conflict | Establish the approval chain **before** the session. Present options as images, not arguments. Poole's and Bogdanowicz's shared point: this is a psychology and politics job as much as a technical one. **[SOURCED]** |
| **Producer** | Not enough grading time booked | Bogdanowicz's counter-argument is the one to use: involving the colorist early *appears* to cost more but surfaces fixable problems earlier and makes the whole film faster and smoother. **[SOURCED]** |

---

## B6. FAILURE MODES AND UNDER-SPECIFICATION TELLS

### Under-specification tells (the brief is not yet actionable)

| Tell | What it actually means | The question that fixes it |
|---|---|---|
| "Make it cinematic" | No decision has been made | "Name three films and tell me what you like about each. Who shot them?" |
| "Warm and inviting" / "cold and clinical" | A mood, not a look | "Warm where? Practicals, skin, shadows, or globally? Warm relative to what?" |
| "Like [film title]" with no further detail | Reference without production context | "Shot on what, with what lenses, in what era, and graded by whom? Which scene specifically?" |
| "We'll fix it in post" | Somebody is deferring a decision they should make now | "Fix what, exactly? Show me the frame." **[SOURCED: Shoul's explicit caution]** |
| No delivery matrix | The most common and most expensive gap | "List every format, aspect ratio, duration, platform and territory before I choose a colour space." |
| No palette from Design or Wardrobe | The grade will be reactive, not designed | "Send paint and fabric samples, or book a test." |
| Brand mentioned but no guideline document | Brand colour violation is now scheduled | "Send the brand book with Pantone and hex values and any ΔE tolerance." |
| "The LUT is already made" with no provenance | Unknown risk | "Who made it, from what test, in what colour space, and has anyone checked it against VFX keying?" **[SOURCED: Bogdanowicz]** |
| HDR listed as a deliverable with no nit target | Nobody has decided the highlight ceiling | "What nit target, and how bright do highlights go?" **[SOURCED: Ferstl]** |
| Multiple cameras listed with no mention of matching | Match work is unbudgeted | "Which camera is the reference? How much mixed material, and in what scenes?" |
| "Just make it look good" | No creative owner has been identified | "Who has final approval, and who can overrule them?" |

### Failure modes of the role itself

| Failure | Description | Prevention |
|---|---|---|
| **Look before balance** | Applying the creative look on an unbalanced base. Every subsequent shot match fights the look | Enforce the balance pass. Shoul and Ensby both structure it this way. **[SOURCED]** |
| **Grading shot by shot** | Producing beautiful individual frames and an incoherent sequence | Poole's sizzle-reel review of scene selects in order. **[SOURCED]** |
| **Detail too early** | Burning the schedule on secondaries before the shape of the piece is known | Ensby: do not get bogged down in smaller details too early. **[SOURCED]** |
| **The colorist's look, not the film's** | Imposing a signature | Inglis's taxi-driver framing: the destination is the director's. **[SOURCED]** |
| **Ignoring perception on target displays** | Grading only on a calibrated reference display | Bogdanowicz's point that perception on the viewer's actual display is arguably more important than technical accuracy. Check on a consumer-grade display and a phone. **[SOURCED]** |
| **Skin sacrificed to the look** | Complexions drained, ruddy, or waxy because the global look ran over them | Qualify skin. Per-subject balance pass after the look. Watch the vectorscope skin line for every complexion in frame. |
| **Uniform treatment of mixed complexions** | One compromise grade for a group | Per-subject masks. This is a mandatory, not optional, step. |
| **Over-masking** | So many windows that any recut or re-conform destroys the grade | Prefer hue-based qualifiers over shape where the frame allows. Keep the node tree readable. |
| **Baking instead of layering** | Flattening the grade so late VFX cannot be re-seated | Keep the tree modular and reapplicable. |
| **Unmanaged colour space** | Mixing display-referred and scene-referred operations | ACES discipline. IDT in, grade in ACEScct, ODT out. |
| **HDR treated as a checkbox** | Trims done mechanically, SDR version left broken | Treat the SDR trim as a creative pass. It is the version most people will see. |
| **Losing the texture** | Chasing clean, sharp, high-dynamic-range images until the image stops feeling alive | Omoshebi's warning about losing the lovely imperfections. **[SOURCED]** Grain and halation are craft decisions, not defaults. |
| **Silence about the impossible** | Accepting a note that cannot be delivered and discovering it in the room | Say it early, offer the alternative, name the cost. |

---

## B7. WRITTEN OUTPUT TEMPLATE

The colorist's plan document. Written after intake, before the camera test. Circulated to Director, DP, Production Design, Wardrobe, Hair & Makeup, VFX, Editorial, and Production.

```markdown
# COLOUR PLAN: [PROJECT], v[N], [DATE]
Colorist: [name]   |   Status: DRAFT / TEST-VALIDATED / LOCKED

## 1. INTENT IN ONE PARAGRAPH
[What the image is doing for the story. No technical language. If this
paragraph is not true, nothing below matters.]

## 2. THE COLOUR ARC
| Act / Sequence / Block | Emotional register | Look direction | Felt or noticed? |
|---|---|---|---|
| | | | |

## 3. VISUAL WORLDS
| World | Where it appears | Distinct or continuous with others | Crossover points |
|---|---|---|---|

## 4. REFERENCES
### Positive
| Reference | Type (film / photo / painting) | Attribution (DP, photographer, era) | What we are taking |
|---|---|---|---|
### Negative (what this is NOT)
- 

## 5. TECHNICAL SPINE
- Working colour space:
- Camera(s) and IDT(s):
- On-set monitoring space:
- Show LUT: [one / more, and why]
- LUT provenance and validation status:
- VFX-safety check: [PASS / PENDING / N/A] by [who]
- CDL policy: [who sets, who tracks, how it travels]
- Grading system:

## 6. LOOK SPECIFICATION
- **Black point:** [true / lifted / tinted, and how far]
- **Highlight roll-off:** [hard / soft, and where detail is protected]
- **Contrast character:** 
- **Saturation strategy:** [global / luminance-dependent / hue-dependent, per range]
- **Dominant hue relationship:** [complementary / analogous / split, and what motivates it physically]
- **Temperature policy:** [what is warm, what is cool, and what motivates each]
- **Skin policy:** [protection method, complexion range in cast, per-subject pass required Y/N]
- **Texture:** [grain type and strength, halation Y/N, softening or sharpening, per-world variation]
- **Film emulation:** [none / stock emulated / print emulation, and source of the model]

## 7. DEPENDENCIES: WHAT I NEED AND BY WHEN
| From | Item | Needed by | Status | Blocking? |
|---|---|---|---|---|

## 8. WHAT I AM HANDING OTHER DEPARTMENTS
| To | Deliverable | By when |
|---|---|---|

## 9. SHOOT-SIDE REQUESTS (things only the shoot can fix)
| Request | Scene / condition | Why it cannot be fixed in the grade |
|---|---|---|
| [e.g. protect the window highlight] | | Clipped data is unrecoverable |
| [e.g. do not place talent against the window] | | HDR will make them read as less visible |

## 10. RISK REGISTER
| Risk | Scene / element | Likelihood | Mitigation | Owner |
|---|---|---|---|---|

## 11. BRAND & PRODUCT COLOUR (commercial only)
| Element | Pantone / Hex | Tolerance | Held out of the look? | Verified by |
|---|---|---|---|---|

## 12. DELIVERY MATRIX
| Deliverable | Colour space | Resolution / AR | Duration | Levels spec | Notes |
|---|---|---|---|---|---|
- HDR required: [Y/N] | Nit target: | Trim targets: | Highlight ceiling policy:

## 13. APPROVAL CHAIN
1. 
2. 
3. 
Final authority:

## 14. OPEN QUESTIONS
- [ ] 
```

---

## B8. TRIGGER LIST: WHAT FORCES A RE-OPEN

When an upstream change lands, this table decides whether the colour plan is **relabelled** (the document text changes, the derived decisions do not) or **re-derived** (the underlying work must be redone).

| Upstream change | Re-derive | Merely relabel | Notes |
|---|---|---|---|
| **Camera body swap (different manufacturer)** | IDT, show LUT, entire camera test, noise and latitude assumptions, VFX LUT re-issue, dailies pipeline | Reference list, emotional arc | **Full re-open.** Different sensor colour science means the LUT is invalid, not adjustable. |
| **Camera body swap (same family, e.g. one generation up)** | LUT validation, a confirmation test | IDT if the manufacturer states equivalence, look spec | Confirm, do not assume. |
| **Adding a second camera type mid-shoot** | Matching plan, second IDT, a match test between bodies, added grading time estimate | Look spec | Budget event. Flag to production immediately. |
| **Lens package change** | Texture spec (halation, flare, softness), any grade elements compensating for the previous glass, the test | Colour arc, palette | Lenses change contrast and flare behaviour more than most people expect. |
| **Filtration change (adding or removing in-camera diffusion)** | Texture spec, the deferred-vs-in-camera split with the DP, VFX plate cleanliness expectation | Colour arc | If diffusion moves from in-camera to grade, the grade budget grows. |
| **Palette pivot from Production Design** | Separation strategy, secondaries plan, saturation strategy per hue family, possibly the LUT if the dominant hue changed, the test | Emotional arc, delivery matrix | If the new dominant hue collides with skin, this is a full re-derive. |
| **Wardrobe rule change** | Skin/costume conflict analysis, qualifier plan, a fabric test | Colour arc | Fluorescents and highly saturated blues are the reliable emergencies. |
| **Hair & makeup change (lipstick, foundation)** | Skin pass plan, a makeup test | Everything else | Cheap to re-derive in prep, brutal to fix in the DI. **[SOURCED: Shoul]** |
| **Location swap** | Ambient colour temperature assumptions, practical strategy, the specific scene's look, any grad or window plan built for the old geography | Global look spec, LUT | A location swap is a scene-level re-derive, not a project-level one, unless it is a hero location. |
| **Interior to exterior (or reverse) for a hero scene** | Temperature contrast device, practicals plan, sky handling, the scene's place in the colour arc | LUT | The device that carried the scene may no longer exist. |
| **Brand colour rule change (commercial)** | Qualifier plan for the brand element, verification pass, possibly the show look if the new brand colour collides with it, all delivered versions if already mastered | Emotional arc | If already delivered, this is a re-master, not a note. |
| **Product colour or packaging change** | Product verification pass, any secondary built on the old colour, all masters containing the product | Everything else | |
| **New deliverable added (e.g. HDR added late, or a new platform)** | Colour space validation, highlight ceiling policy, trim passes, per-platform QC | Look spec | **[SOURCED: Ferstl's rule: establish highlight ceiling before creative HDR grading]** If HDR is added after the SDR grade is locked, the highlight policy was never set and the HDR grade is a new pass, not a conversion. |
| **Aspect ratio change** | Every window, grad, and vignette positioned relative to frame edges; reframe safety QC on all versions | Look spec, LUT | Windows do not survive reframing. |
| **VFX vendor change or new vendor added** | LUT and CDL re-issue, VFX-safety re-validation, colour space handshake with the new vendor | Look spec | |
| **Show LUT replaced or revised** | Every grade built on the old LUT, all dailies, all VFX reference, all previously approved versions | Reference list | **The most expensive change in the list.** Resist it after dailies begin. |
| **Cut change (re-edit)** | Conform, shot matching at new cut points, any scene-level flow decisions | LUT, look spec, palette | Routine. Design the node tree to survive it. |
| **Director or DP replaced** | Everything in Tier 0 and Tier 1 of intake. Start again at intent | Technical spine (colour space, IDT), if capture is unchanged | |
| **Approval chain change (new client-side approver)** | Nothing technical | Approval chain section | But expect notes on already-approved work. Re-present with the reasoning, not just the image. |

### The general rule for the agent

**Re-derive anything whose inputs changed. Relabel anything whose inputs did not.**

The failure mode to avoid is the middle path: quietly patching a grade built on invalidated assumptions because a re-derive looks expensive. It is always cheaper to re-derive in prep than to discover the invalidation at the client review. This is the same economics Bogdanowicz argues for bringing the colorist in early, applied to every subsequent change. **[SOURCED: Sony Cine]**

---

## CLOSING NOTE FOR THE AGENT

The three sentences to keep loaded at all times:

1. **The image is the director's, executed through the DP, protected by me.** Not mine. **[SOURCED: Inglis, Poole]**
2. **The cheapest fix is always upstream, and my most valuable output is often a flag, not a grade.** **[SOURCED: Shoul, Bogdanowicz]**
3. **Show, do not describe.** When there is disagreement in the room, the resolution is an image on the screen, not an argument. **[SOURCED: Bogdanowicz]**
