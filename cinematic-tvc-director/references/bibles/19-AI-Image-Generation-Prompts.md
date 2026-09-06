# Film Craft Bible 19: AI Cinematic Image Generation (Text-to-Image Prompt Engineering)

*Part of the Film Craft Bibles series. This volume covers still-image generation only: prompt engineering for text-to-image and image-to-image tools aimed at cinematic, editorial, and commercial stills. Motion, video generation, and audio are covered in sibling volumes.*

**Document status:** Compiled 2026-07-26. Tool capabilities, model names, and especially prices in this field change on a timescale of weeks, not years. Treat every dollar figure in this document as a snapshot, not a fact you can rely on next quarter.

## How to read the tags in this document

Every non-obvious claim below is tagged so you know how much weight to put on it:

- **[SOURCED]**: backed by a live web search or official documentation fetched during compilation (2026-07-26). A source is named inline.
- **[PRINCIPLE]**: settled craft knowledge or widely-documented technical behavior that doesn't need a single citation because it is consistent across dozens of independent sources (e.g. "negative prompts remove unwanted elements").
- **[UNVERIFIED]**: could not be confirmed against a primary source during compilation. Treated as directional, not reliable. Verify before quoting a number from an [UNVERIFIED] tag to a client or in a budget.

---

## PART A: CRAFT REFERENCE

### A1. What "cinematic still" prompt engineering actually is

Casual image generation is a conversation: type a loose idea, look at four results, pick the least-bad one, maybe type a follow-up. It optimizes for *speed to a usable image*.

Cinematic prompt engineering is a different discipline aimed at a different outcome: a specific, reproducible, art-directed image that could plausibly be a frame pulled from a real production, a still that would survive being blown up on a billboard or scrutinized in a pitch deck next to real photography. It borrows its vocabulary and its discipline from three older crafts simultaneously:

1. **Cinematography**: lens choice, framing, lighting setups, camera height and angle are treated as *decisions*, not flavor text. [PRINCIPLE]
2. **Art direction**: a defined palette, a defined mood board, a defined reference language (this scene "in the style of," this era, this film stock) rather than whatever the model defaults to. [PRINCIPLE]
3. **Production planning**: the final deliverable (a 9:16 Reel, a 21:9 title card, a 4K print ad) is decided *before* the first prompt is written, because resolution and aspect ratio change composition, not just crop. [PRINCIPLE]

The practical difference shows up in three habits that separate a professional prompt from a hobbyist one:

- **Specificity over adjectives.** "Beautiful lighting" tells the model nothing actionable. "Single hard key light from camera left, deep shadow falls across the right side of the face, no fill" tells it exactly what to render. [PRINCIPLE]
- **Negative space as a design tool.** Deciding what is *absent* from frame (no text, no logos, no extra limbs, no background clutter) is as much a creative decision as what's present. [PRINCIPLE]
- **Reproducibility.** A professional prompt can be handed to a second person, run again next week, or run 40 times with only the pose changing, and it will still produce images that belong to the same visual world. A casual prompt usually can't. [PRINCIPLE]

None of this requires exotic tools. It requires treating the text box the way a director treats a call sheet: a complete, unambiguous instruction set.

### A2. The anatomy of a strong cinematic image prompt

A cinematic still prompt is built from layered clauses. Not every clause is needed in every prompt, but a professional should be able to name which ones they deliberately left out and why. The canonical layers, roughly in the order they tend to be written (though word order inside the prompt itself matters less than people assume for most modern models [PRINCIPLE]):

1. **Subject**: who or what is the frame about. Be as concrete as the brief allows: age, build, expression, wardrobe, distinguishing detail. Vague subjects produce generic faces and generic products.
2. **Action / pose**: what is the subject doing, mid-motion or held. Stills still need a verb. "Standing" is a pose; "caught mid-turn, coat still swinging" is a moment.
3. **Environment**: the location, the set dressing, the time of day, the weather. This is where a lot of the "cinematic" feeling actually lives, because environment implies lighting and mood before you've even specified either.
4. **Lighting description**: direction (key, fill, rim, back), quality (hard/soft, diffused, harsh), color temperature (warm tungsten, cool daylight, mixed), and named lighting styles (chiaroscuro, Rembrandt, high-key, low-key, practical-only). [PRINCIPLE]
5. **Lens / camera language**: focal length (24mm wide vs 85mm portrait compression), aperture (f/1.4 shallow depth of field vs f/8 deep focus), camera angle and height (low angle, eye level, bird's eye, Dutch tilt), and shot size (close-up, medium, wide, establishing). Modern diffusion and transformer image models were trained on captioned photography and film stills that use this exact vocabulary, so it is not decorative, it is functional. [PRINCIPLE]
6. **Color palette**: named colors or a described grade (teal and orange, desaturated bleach-bypass, warm amber monochrome). Palette is one of the highest-leverage clauses for making an image feel directed rather than default.
7. **Mood / atmosphere**: the emotional register in one or two words plus supporting texture (tense, isolated, hopeful; fog, dust motes in the light, rain-streaked glass).
8. **Art direction references**: named film stocks, photographers, directors, or eras used as a compass, not a costume ("in the style of 1970s Kodachrome" or "lit like a Deakins night exterior"). Use sparingly and specifically; vague references ("cinematic style") do almost nothing because the model has no single thing to latch onto.
9. **Negative prompting**: an explicit list of what must not appear: extra fingers, text artifacts, logos, watermark, blown highlights, plastic skin, oversaturation. Some engines (Midjourney, most Stable Diffusion tooling) have a dedicated negative-prompt channel; others (Nano Banana, GPT Image, FLUX via simple interfaces) only take it as prose inside the main prompt ("without... avoid..."). Know which mode your tool uses. [PRINCIPLE]
10. **Aspect ratio and resolution**: not an afterthought set at export time, but a decision made before the first draft because it changes what the model composes into frame. A 21:9 prompt needs environment description to fill the sides; a 9:16 prompt needs a vertical composition idea (a tall subject, a staircase, a skyline) or the model will awkwardly crop a horizontal idea into a vertical box.

A useful way to sanity-check a prompt: read it back and ask "if I removed this clause, would the image change in a way I'd notice?" If the answer is no, the clause is filler and can be cut; if yes, it earned its place.

### A3. Six worked prompt templates with line-by-line breakdowns

Each template below is written to be usable as-is in most modern text-to-image tools (Midjourney, FLUX, Nano Banana family, Seedream, GPT Image). Model-specific parameter syntax (like Midjourney's `--ar`, `--cref`) is noted separately where relevant; the prose portion is portable across engines.

---

**Template 1: Moody character portrait**

> "Close-up cinematic portrait of a weathered fisherman in his sixties, deep creases around his eyes, salt-and-pepper stubble, wearing a faded yellow oilskin jacket beaded with sea spray. He looks slightly past camera, jaw set, not smiling. Shot on an 85mm lens at f/1.8, shallow depth of field, background a soft blur of a foggy harbor at dawn. Single hard rim light from behind separating him from the fog, dim cool blue fill from camera left, otherwise low-key lighting. Desaturated teal-and-grey palette with a single warm highlight on his face. Mood: solitary, weathered, quietly proud. In the style of a National Geographic environmental portrait. Negative prompt: no text, no logo, no extra fingers, no oversharpened skin texture, not smiling. Aspect ratio 4:5."

Line-by-line:
- *"Close-up cinematic portrait"*: sets shot size and genre register immediately; without it the model may default to a wider or more casual framing.
- *"weathered fisherman in his sixties... faded yellow oilskin jacket"*: concrete subject detail. Remove the age, wardrobe, and texture words and you get a generic young model in a blue jacket; specificity is what defeats the model's "default attractive person" bias.
- *"looks slightly past camera, jaw set, not smiling"*: controls expression and eyeline, the single biggest lever for whether a portrait reads as candid/cinematic vs. stock-photo/posed.
- *"85mm lens at f/1.8, shallow depth of field"*: this is the clause doing the most compositional work: it tells the model to compress the background and blur it, which is what makes the shot feel like real cinematography instead of a flat illustration. Remove it and most models default to a deeper, flatter focus plane.
- *"foggy harbor at dawn"*: environment implies a light source and color temperature before you've even stated one, reinforcing the lighting clause that follows.
- *"hard rim light from behind... cool blue fill... low-key"*: explicit lighting plan. Without this the model will likely give flat, even, "beauty light" illumination, which kills the mood.
- *"desaturated teal-and-grey... single warm highlight"*: the palette clause; removing it risks an oversaturated, commercially "clean" color result that fights the somber mood.
- *"National Geographic environmental portrait"*: a specific, well-documented reference genre the model has strong training signal for. A vaguer reference like "artistic photo" would add nothing.
- Negative prompt: removes the most common failure modes for character close-ups (extra fingers only matters if hands are in frame, but is cheap insurance; oversharpened skin and unwanted smiling are the two most common way this exact template goes wrong without it).
- *"Aspect ratio 4:5"*: chosen because this is a portrait meant for a vertical card or Instagram-style crop; a 16:9 would force a wider, less intimate frame.

---

**Template 2: Wide establishing / environment shot**

> "Extreme wide establishing shot of a rain-soaked megacity intersection at night, neon signage in Mandarin and English reflecting on wet asphalt, a lone figure with an umbrella crossing in the foreground, tiny against the scale of the buildings. Shot on a 24mm wide-angle lens, deep focus, everything sharp from foreground to the towering signage. Camera at street level, slight low angle looking up to emphasize the height of the buildings. Color palette: saturated magenta and cyan neon against a near-black wet street, Blade-Runner-adjacent but with recognizable East Asian signage rather than invented glyphs. Atmosphere: steam rising from a street vendor cart, light drizzle visible in the neon glow. Negative prompt: no readable brand logos, no gibberish text on signs unless illegible at this distance, no daytime lighting leaking in. Aspect ratio 21:9."

Line-by-line:
- *"Extreme wide establishing shot"*: locks shot size; without it a model tuned toward portraits may crop in tighter than intended.
- *"lone figure... tiny against the scale"*: gives the model a scale reference, which is what actually sells "epic wide shot" rather than just "wide empty street."
- *"24mm wide-angle... deep focus... everything sharp"*: the opposite lens choice from Template 1, deliberately, because an establishing shot needs environmental storytelling in every plane, not a blurred background.
- *"slight low angle"*: a camera-height decision that adds scale and drama; a straight eye-level angle would feel like a snapshot, not a cinematic establishing shot.
- *"magenta and cyan neon... near-black wet street"*: palette clause doing genre work (this is the visual grammar of a specific subgenre of night-city cinematography).
- *"Blade-Runner-adjacent but with recognizable East Asian signage rather than invented glyphs"*: this is a deliberately hedged reference: naming the film for mood while explicitly correcting the known failure mode (most models render fake, unreadable pseudo-Asian glyphs when just told "Asian city neon"). This is a working fix, not decoration; removing the correction clause reliably produces garbled sign text.
- Negative prompt: "no readable brand logos" avoids accidental trademark issues in a commercial deliverable; "no gibberish text... unless illegible at this distance" manages the same glyph problem from the other direction.
- *"Aspect ratio 21:9"*: chosen deliberately to match a cinema title-card or Scope-format deliverable; a establishing shot cropped from a 1:1 square would lose the horizontal scale that makes it read as "establishing" at all.

---

**Template 3: Product hero shot**

> "Studio product hero shot of a matte black wireless earbuds case, lid open, earbuds nestled inside, floating at a 45-degree angle against a deep charcoal gradient background. Softbox lighting from camera left with a large soft key, subtle rim light from behind to separate the product edge from the background, no harsh reflections on the glossy earbud surface beyond one controlled highlight streak. Shot as if on a 100mm macro lens, product tack-sharp, background falling into a smooth gradient blur. Color palette: charcoal, matte black, single accent of electric blue from the case's status LED. Clean commercial mood, no props, no hands, no environment, pure product isolation. Negative prompt: no dust, no fingerprints, no visible seams or manufacturing defects, no text or logo unless specified, no reflections showing studio equipment. Aspect ratio 1:1."

Line-by-line:
- *"floating at a 45-degree angle"*: gives explicit pose/orientation instructions for an inanimate object, which product shots need just as much as portraits need pose for a person.
- *"deep charcoal gradient background"*: commercial product photography convention; naming the exact background prevents the model from inventing a busy or inconsistent one.
- *"Softbox... key... rim light... one controlled highlight streak"*: this level of lighting precision exists specifically to fight glossy-surface artifacts (blown-out reflections, weird double-highlights) that are the single most common failure in AI product renders.
- *"100mm macro lens, tack-sharp... background falling into gradient blur"*: macro framing plus background falloff is what separates a "hero shot" from a flat catalog thumbnail.
- *"no props, no hands, no environment"*: explicitly closing off directions the model might otherwise wander toward (lifestyle staging) when the brief calls for pure isolation.
- Negative prompt: every item on this list is a documented, common AI product-render defect (dust/fingerprints reading as texture noise, phantom seams, unwanted reflections). This is the highest-value negative prompt of the six templates precisely because product work is judged at pixel-level scrutiny by a client.
- *"Aspect ratio 1:1"*: square is the safest universal default for a product hero destined for both e-commerce listings and social; if the actual deliverable were a website banner, this would change to 16:9 or wider and the composition would need re-thinking, not just cropping.

---

**Template 4: Diagram / text-rendering-heavy image**

> "Clean infographic-style diagram on a white background titled 'THE FOUR STAGES OF ONBOARDING' in bold sans-serif black text at the top. Below it, four vertical panels each containing a simple flat icon and a one-line caption in the same sans-serif font: Panel 1 icon of a handshake, caption 'WELCOME'. Panel 2 icon of a document with a checkmark, caption 'PAPERWORK'. Panel 3 icon of a laptop, caption 'SETUP'. Panel 4 icon of two people talking, caption 'FIRST WEEK'. Flat vector illustration style, minimal color palette of navy blue, white, and one orange accent. All text must be spelled exactly as written above, legible, no distorted or invented characters. Negative prompt: no photorealistic elements, no gradients, no extra decorative text, no misspelled words. Aspect ratio 16:9."

Line-by-line:
- *"titled... in bold sans-serif black text... exactly as written above"*: this explicit repetition and the closing instruction ("must be spelled exactly as written") is the single biggest lever for getting legible text out of a model; it is why text-heavy prompts read as more repetitive and rigid than photoreal prompts, deliberately.
- *"Panel 1... Panel 2..."* enumerated structure: breaking layout into an explicit numbered list rather than a paragraph description dramatically improves multi-element layout accuracy on the models built for this (GPT Image family, Nano Banana Pro, OpenAI Hazel). On models without strong text/layout training, this same structure will still fail more often, which is precisely why model choice matters more for this template than any of the other five (see A6 and A4).
- *"Flat vector illustration style"*: removes the temptation for the model to render photorealistic hands/faces/textures where a flat icon was wanted.
- *"minimal color palette"*: constrains the model to a brand-safe, low-noise result appropriate for a slide or deck rather than a busy illustration.
- Negative prompt: "no misspelled words" is worth including even though it cannot force correctness; on models with strong text rendering it measurably reduces the incidence of dropped or malformed letters as an additional guardrail, and on weaker models it's a signal to the user to expect to iterate or switch models.
- *"Aspect ratio 16:9"*: matches a slide or web-banner deliverable; a diagram meant for a printed one-pager would instead choose a portrait ratio matching the page.

---

**Template 5: Stylized / illustrative image**

> "Hand-painted gouache illustration of a small coastal town at golden hour, terracotta rooftops cascading down a hillside toward a turquoise bay, laundry lines strung between buildings, a single fishing boat on the water. Loose, visible brushstrokes, warm limited palette of terracotta, ochre, and turquoise with soft white highlights. Painterly light, no photographic detail, no hard edges, flattened perspective in the style of a mid-century travel poster illustrator. Negative prompt: no photorealism, no 3D rendering, no digital airbrush smoothness, no visible AI artifacts in the brushwork pattern. Aspect ratio 3:2."

Line-by-line:
- *"Hand-painted gouache illustration"*: the medium clause is the single most important word choice in a stylized prompt; naming an actual physical medium anchors the model to a specific texture and mark-making language far more reliably than a vague "artistic" or "stylized" instruction.
- *"Loose, visible brushstrokes"*: reinforces the medium clause with a texture instruction, which matters because many models default toward a smoothed, "digital painting" look even when told "gouache," unless texture is separately specified.
- *"warm limited palette... soft white highlights"*: a limited, named palette is what makes illustration read as art-directed rather than generic clip-art color.
- *"flattened perspective in the style of a mid-century travel poster illustrator"*: a genre reference doing real compositional work: it tells the model to simplify depth and perspective rather than pursue photographic realism, which a plain "illustration" instruction would not guarantee.
- Negative prompt: "no visible AI artifacts in the brushwork pattern" targets a known tell in AI-generated painterly images (repetitive, slightly mechanical brush texture); naming it doesn't guarantee removal but measurably steers away from the worst offenders on most engines.
- *"Aspect ratio 3:2"*: a classic print/poster ratio, chosen because the reference genre (travel poster) implies a printed deliverable; a 9:16 crop of the same scene would cut off the "cascading hillside" composition the prompt is built around.

---

**Template 6: Photorealistic UGC-style image**

> "Casual iPhone-style selfie of a young woman in her twenties, natural everyday makeup, wearing a plain white t-shirt, standing in a sunlit bathroom holding up a small skincare bottle at chest height so the label faces camera, genuine candid smile, slightly imperfect framing as if shot handheld, natural window light from the side with soft shadows, minor skin texture and pores visible, no studio retouching, no professional lighting rig, authentic phone-camera color rendering with a touch of natural warmth. Negative prompt: no studio lighting, no airbrushed skin, no professional makeup, no perfect symmetry, no visible camera or tripod, no overly staged pose. Aspect ratio 9:16."

Line-by-line:
- *"Casual iPhone-style selfie"*: the format clause is doing the entire job here; naming the capture device/format is the strongest lever for triggering a model's "amateur/authentic" mode instead of its default "professional photoshoot" mode, which most models lean toward unless told otherwise.
- *"slightly imperfect framing as if shot handheld"*: explicitly fighting the model's tendency toward perfectly centered, symmetrical composition, which is the fastest tell that an "authentic" image is actually AI-polished.
- *"natural window light... minor skin texture and pores visible, no studio retouching"*: this triad is the core of UGC realism: real light sources (not studio softboxes), real skin texture (not smoothed), and an explicit ban on retouching. Removing any one of the three tends to push the result back toward "clearly AI/stock" territory.
- *"holding up a small skincare bottle at chest height so the label faces camera"*: for commercial UGC (the dominant real-world use case for this template), the product placement and label visibility has to be scripted explicitly, or the model will pose the hand naturally but obscure or angle the label away from camera.
- Negative prompt: every item directly counters a specific, well-known "too polished to be UGC" tell. This negative list is arguably doing more work than the positive prompt for this particular template, because the entire goal is *subtracting* professional polish that the model adds by default.
- *"Aspect ratio 9:16"*: UGC content is overwhelmingly consumed as vertical social video/story format; choosing this ratio before generation (not cropping after) preserves the natural bathroom-mirror-selfie composition the prompt describes.

### A4. The tool and engine landscape

No single engine is best at everything. A working prompt engineer keeps a mental (or written) map of what each tool is actually for.

| Engine | Best at | Falls short at |
|---|---|---|
| **Midjourney** | Painterly, atmospheric, highly "art directed" images; strongest aesthetic default of any mainstream tool; mature `--cref`/`--sref` consistency system [SOURCED] | Precise text rendering; exact prompt-literal adherence (it interprets and beautifies more than it obeys); no first-party API, Discord/web-app based workflow |
| **DALL-E / GPT Image family (OpenAI)** | Instruction-following accuracy, in-context editing, and text/typography rendering; strong for diagrams, infographics, and logo-adjacent work [SOURCED] | Photographic "epic" cinematic look tends toward a cleaner, more illustrative default than Midjourney or FLUX; per-image cost adds up at high quality tiers [SOURCED] |
| **Stable Diffusion ecosystem (SDXL, SD3.5, and community forks)** | Total control: open weights, local or self-hosted generation, full ControlNet/LoRA/IP-Adapter ecosystem for exact pose, depth, and identity control [PRINCIPLE] | Out-of-the-box aesthetic quality varies wildly by checkpoint; requires real technical setup (ComfyUI/Automatic1111 or similar) to reach its ceiling; not a one-click experience |
| **Google Nano Banana / Nano Banana Pro / Imagen family** | Nano Banana Pro specifically leads on in-image text and diagram rendering and multi-image consistency; fast, versatile, strong image-to-image editing [PRINCIPLE, per Higgsfield tool tags and general 2026 reporting] | Nano Banana (base/lite) trades quality for speed and cost; less painterly/art-directed default look than Midjourney |
| **Black Forest Labs FLUX family (Pro/Flex/Max/Schnell/Dev)** | Prompt adherence and photorealism at competitive speed; Flex exposes fine-grained sampling controls; open-weight Dev variant plugs into the SD ecosystem [SOURCED] | Aesthetic "beauty" defaults are more neutral/photographic than Midjourney's stylization; Max/Pro pricing scales with megapixels, so large or iterative jobs add up [SOURCED] |
| **Ideogram** | Best-in-class typography and logo/text-in-image accuracy among consumer tools, alongside Recraft and the GPT Image family [SOURCED] | Photographic realism and cinematic lighting nuance lag behind FLUX/Midjourney |
| **Recraft** | Vector output, icon and logo generation, precise brand color-palette control; useful where the deliverable is a flat graphic asset, not a photographic still [SOURCED] | Not built for photoreal cinematic scenes; niche relative to general-purpose engines |
| **Leonardo.Ai** | Accessible all-in-one workflow (canvas, real-time generation, motion) with a large model library; good for teams that want one dashboard rather than juggling several engines [SOURCED] | No single standout ceiling feature; generally a strong generalist rather than a category leader in any one axis |
| **Adobe Firefly** | Deep Creative Cloud integration (Photoshop generative fill/expand, Illustrator vector), commercially "safe" training data claims that matter for enterprise legal review [SOURCED] | Raw aesthetic ceiling and prompt-adherence typically trail the frontier models above; strongest when the workflow is inside Adobe apps, weaker as a standalone generator |
| **Bytedance Seedream (v4/v4.5/v5)** | High resolution (4K-6K) with precise instruction-based editing and multi-image referencing; strong value per generation [SOURCED] | Newer to Western commercial workflows; documentation and community prompt libraries thinner than Midjourney/SD |
| **Higgsfield-hosted models (Soul/Soul Cinema/Soul Cast/Cinema Studio/etc.)** | Purpose-built for *recurring* characters, locations, and cinematic stills inside a single production pipeline via `soul_id`; batch-friendly brand-kit-aware product ad generation via Marketing Studio | A hosted layer on top of underlying models (Google, OpenAI, Bytedance, BFL), so its ceiling is bounded by whichever base model a given tool wraps; credit pricing is opaque per-model (see Part C) |

### A5. Reference-image techniques for consistency

This is the single most valuable operational skill in cinematic AI image work, because almost no real production needs *one* good image, it needs a *set* of images that all belong to the same character, product, or world. Four distinct technical approaches exist, and knowing which one your tool uses changes how you plan a shoot.

**1. Midjourney's `--cref` (character reference) and `--sref` (style reference).** [SOURCED, per Midjourney documentation and 2026 guides]
- `--cref [image URL]` locks facial features, hair, and (depending on weight) clothing from a reference image onto a new generation.
- `--cw [0-100]` (character weight) controls how much of the reference is enforced: `--cw 100` (default) locks face, hair, and clothes; `--cw 0` locks only the face, freeing the outfit to change per shot, which is the setting you want for a "same character, different wardrobe" shoot.
- `--sref [image URL]` with `--sw [0-1000]` (style weight, default 100) separately locks palette and rendering style, and can be combined with `--cref` in the same prompt to hold both character identity and visual style constant across a shoot.
- Practical use: generate one strong "anchor" image of your character first, then reuse its URL as `--cref` across every subsequent shot in the sequence, adjusting `--cw` down when you need outfit or setting variation.

**2. IP-Adapter and identity-lock in the Stable Diffusion ecosystem.** [PRINCIPLE]
- IP-Adapter is a lightweight adapter model that lets you feed a reference image (a face, a style, a product) alongside the text prompt, and it steers the diffusion process toward that reference's visual identity without needing to retrain anything.
- Dedicated face-identity tools (commonly used inside ComfyUI/Automatic1111 pipelines) go further, embedding a face's identity vector so it can be dropped into wildly different poses, lighting, and outfits while the face itself stays recognizable.
- LoRA (Low-Rank Adaptation) is the heavier-weight version of the same goal: a small trained add-on model, fine-tuned on a handful to a few dozen images of a specific character, product, or style, that then gets loaded alongside the base model for every generation. LoRA takes more setup (training time, curated image sets) but produces the tightest, most reliable identity lock of any SD-ecosystem technique.
- ControlNet is a related but distinct technique: instead of locking *identity*, it locks *structure*, feeding the model a pose skeleton, a depth map, or an edge map so that composition and pose are held constant while everything else (lighting, style, wardrobe) can change freely. It is frequently combined with IP-Adapter or a LoRA in the same generation: ControlNet fixes the pose, IP-Adapter/LoRA fixes the identity.

**3. Higgsfield's Soul / `soul_id` system.** Per the live-fetched Higgsfield tool grounding for this document: `soul_2`/`soul_v2` and `soul_cinematic` ("Soul Cinema") both expose a `soul_id` parameter that creates and reuses a personalized character identity across many separate generations, and `soul_cast` is explicitly built around "consistent cinematic character identity" as its core feature, with a tunable `budget` parameter (10-500). `soul_location` applies the same consistency logic to environments and backgrounds rather than characters, which matters for a shoot that needs the same set or location across many angles and times of day. This is functionally the productized, one-click equivalent of training a character LoRA: you invest once in establishing the identity, then draw on it repeatedly without re-uploading references every time.

**4. Native `image_references` inputs (Nano Banana family, Seedream, FLUX).** [Per Higgsfield tool grounding + general 2026 model documentation] Several current-generation models accept one or more reference images directly as an input alongside the text prompt, without a separate training step or special parameter syntax; the model reads the reference(s) for subject, style, or product identity and blends that with the text instruction. This is faster to set up than a LoRA and more flexible than a single locked `--cref` image, but generally weaker at holding an exact identity across a large batch than a purpose-built system like `soul_id` or a trained LoRA, because there's no persistent "identity object," only whatever reference images you resupply each time.

**Building and reusing a reference sheet.** Whichever technique you use, the discipline is the same one film and print production already uses for continuity: never rely on a single reference image. Before generating a full shoot, assemble a small reference sheet: a front-on face/product shot, a three-quarter angle, a profile or back view, and if relevant one full-body or full-product shot. Feed the *set*, not a single frame, into whichever consistency system you're using (multiple `--cref` passes, multiple images into an `image_references` array, multiple training images for a LoRA, multiple source shots when establishing a `soul_id`). A single reference image locks a model's guess about angles and details it never saw; a reference set gives it enough information to generalize correctly to new poses and angles without drifting.

**Seed locking for reproducibility.** Nearly every diffusion-based engine (and most transformer-based ones) exposes or implies a random seed value that determines the specific noise pattern a generation starts from. Locking the seed and holding the prompt constant reproduces the same image; locking the seed and changing only one clause of the prompt isolates the effect of that single change, which is the fastest way to debug why a prompt isn't doing what you expect. Locking the seed across a shoot with a *changing* prompt (new pose, same character/environment description) can also nudge compositional consistency, though it is a much weaker consistency tool than a dedicated identity system and should not be relied on as a substitute for one.

### A6. Diagrams and text-heavy images vs. photoreal scenes

Prompting for a diagram, infographic, or piece of in-image typography is a genuinely different task from prompting a photoreal scene, not just a stricter version of the same task. The reason is architectural: rendering legible, correctly-spelled text inside an image requires the model to reason about individual characters and their layout, a capability that historically lagged far behind general scene composition in image generation models. [PRINCIPLE] This is precisely why certain models exist as named specialists for this exact job: GPT Image 2 and OpenAI Hazel (per the Higgsfield tool grounding, explicitly tagged "best text rendering, logos/diagrams/infographics") and Nano Banana Pro (tagged "best text/diagram rendering" in the same grounding) are built and marketed around this capability, where a general photoreal specialist like FLUX or a stylization specialist like Midjourney will more often distort, misspell, or drop letters entirely.

Practical differences in how you prompt for this:
- **Repeat and isolate the exact text.** Put the literal string to be rendered in quotes, and repeat the instruction that it must be spelled exactly as given, as in Template 4 above. This is unnecessary and even counterproductive in a photoreal prompt (repetition there just wastes prompt budget) but measurably helps in a text-heavy one.
- **Describe layout explicitly and enumerate elements.** "Four panels, each with an icon and a caption" gives the model a structure to fill in; a flowing paragraph description of the same layout produces far less reliable placement.
- **Choose the model before writing the prompt, not after.** Because text rendering ability varies so much by model, deciding "this needs GPT Image / Nano Banana Pro / Hazel" is a decision made at the brief stage, the same way a photoreal cinematic portrait decision would route toward Midjourney or FLUX instead.
- **Expect more iteration, and plan for it.** Even the strongest current text-rendering models are not 100% reliable at spelling; budget for two or three regenerations of a text-critical asset rather than assuming one-shot success, and always proofread the rendered text at full resolution before delivery, the same way a designer proofs a print file.

### A7. Aspect ratio and resolution as production decisions

Aspect ratio and resolution are not export settings to be decided after a beautiful image already exists; they change what the model composes into the frame, and re-cropping after the fact is almost always visibly worse than generating natively in the target ratio. [PRINCIPLE]

| Deliverable | Typical ratio | Why it's chosen before generation |
|---|---|---|
| Instagram/TikTok Reel, Story | 9:16 | Needs a vertically-composed subject (a standing figure, a tall object, negative space at top/bottom for UI overlays); horizontal ideas cropped to 9:16 lose most of the frame |
| Instagram feed post, product hero | 1:1 or 4:5 | Centered, symmetrical compositions read best; 1:1 is the safest universal default for e-commerce and catalog use |
| Cinema title card, widescreen key art | 21:9 (or 2.39:1) | Needs environmental storytelling that fills the width; a wide wide-angle establishing composition, deliberately shot to feel like a Scope-format frame |
| Standard streaming/TV frame | 16:9 | The default "cinematic but not extreme" ratio; safest for a diagram, slide, or general landscape deliverable |
| Print poster, editorial spread | 3:2 or custom to the page trim size | Match the actual physical page or poster dimensions before generating, not after, since bleed and margin planning depends on it |

Resolution follows the same logic in reverse: decide the largest size the deliverable will ever be viewed at (a phone screen vs. a building-sized billboard) and generate (or upscale) to match, because upscaling a low-resolution generation to billboard size will expose soft detail and artifacting that a native high-resolution generation, or a proper AI upscale pass, would not. Several tools in the current landscape explicitly support this as a two-step workflow: generate at a fast, cheap draft resolution to iterate on composition, then regenerate or upscale the final selected composition at full resolution (Nano Banana family and Cinema Studio 2.5 both support explicit 1K/2K/4K tiers for exactly this reason, and dedicated upscaling tools like Topaz Image and the bytedance image upscaler exist specifically to bridge a good low-res draft up to delivery quality without a full re-generation).

### A8. Vocabulary glossary

- **Seed**: the numeric starting point for a generation's randomness; locking it reproduces the same result from the same prompt, and is the standard tool for isolating the effect of a single prompt change. [PRINCIPLE]
- **CFG / guidance scale**: a setting (mostly in Stable Diffusion-family tools) controlling how strictly the model follows the text prompt versus how much creative freedom it takes; higher values follow the prompt more literally but can look over-processed or artifacted, lower values look more natural but drift further from the prompt. [PRINCIPLE]
- **Negative prompt**: a separate instruction (or, in tools without a dedicated channel, a prose clause) listing what should not appear in the image. [PRINCIPLE]
- **Inpainting**: regenerating only a masked portion of an existing image (fixing a hand, swapping an object) while leaving the rest untouched. [PRINCIPLE]
- **Outpainting**: extending an existing image beyond its original borders, generating new content that plausibly continues the scene; used to change aspect ratio after the fact when a re-generation isn't practical (Higgsfield's `outpaint` tool is an example of a purpose-built version of this). [PRINCIPLE]
- **Upscaling**: increasing an image's resolution, ideally with an AI model trained to add plausible fine detail rather than simply stretching pixels (Topaz Image and similar tools). [PRINCIPLE]
- **LoRA (Low-Rank Adaptation)**: a small, efficiently-trained add-on model that teaches a base image model a specific character, product, or style from a curated set of reference images, without retraining the whole base model. [PRINCIPLE]
- **ControlNet**: a technique that conditions generation on a structural map (pose skeleton, depth map, edge map) extracted from a reference image, locking composition and pose while leaving style, lighting, and content free to vary. [PRINCIPLE]
- **IP-Adapter**: a lightweight technique for steering generation toward the visual identity of a reference image (face, product, style) without a full training step, faster to set up than a LoRA but generally less precise for exact identity lock across a large batch. [PRINCIPLE]
- **Latent space**: the compressed internal representation a diffusion model works in before decoding to a final pixel image; most day-to-day prompting doesn't require touching this directly, but it's the term underlying why techniques like ControlNet and IP-Adapter work (they steer the model within this space rather than editing pixels directly). [PRINCIPLE]

---

## PART B: AGENT OPERATING MANUAL

### B1. The questions to ask before writing a single word of prompt

A prompt written before these questions are answered is a guess. Ask, in order:

1. **What is this image actually for?** A pitch deck slide, a paid social ad, a website hero banner, a print piece, an internal mood board. The answer changes the required resolution, the acceptable level of imperfection, and how much text-rendering accuracy matters.
2. **What resolution and aspect ratio does the deliverable need?** Get the exact number if possible (e.g. "1080x1920 for a Reel," "300 DPI at A3 for print") rather than a vague "square-ish." Decide this before the first draft, per A7.
3. **Does a character, product, or setting need to recur across multiple images?** If yes, this is not a single-prompt job, it's a Consistency Protocol job (B3 below), and the planning has to start with a reference set and an identity-lock method, not with writing prompt number one.
4. **Is text or typography required in-frame?** If yes, route to a text-rendering specialist model (GPT Image family, Nano Banana Pro, OpenAI Hazel, Ideogram, Recraft) before writing the prompt, per A6, rather than discovering the chosen model can't spell after three failed attempts.
5. **What is the visual world this image belongs to?** Even a single standalone image benefits from being anchored to an existing brand palette, a referenced film or photographer, or a described mood, rather than left to the model's untethered default aesthetic.
6. **What's the acceptable iteration budget?** A quick internal draft can tolerate one shot at a cheap/fast model; a client-facing hero asset should be budgeted for multiple passes, a model comparison, and likely an upscale step.

### B2. Reusable prompt-construction template

Fill in each bracket; leave a bracket empty and delete its clause only if you've deliberately decided it doesn't matter for this shot (per the A2 "would the image change" test).

```
[SHOT SIZE / FRAMING] of [SUBJECT: concrete description, age/material/condition/distinguishing detail],
[ACTION OR POSE], in [ENVIRONMENT: location, time of day, weather/atmosphere].
Shot on [FOCAL LENGTH]mm lens at [APERTURE], [DEPTH OF FIELD DESCRIPTION].
Camera at [ANGLE/HEIGHT].
Lighting: [KEY LIGHT direction/quality], [FILL/RIM if any], [COLOR TEMPERATURE], [NAMED LIGHTING STYLE if applicable].
Color palette: [2-4 named colors or a described grade].
Mood/atmosphere: [1-3 words], [supporting texture detail].
Reference: [named film/photographer/era/style, used specifically, not vaguely].
Negative prompt: [explicit list of unwanted elements/artifacts].
Aspect ratio: [X:Y]. Resolution target: [1K/2K/4K or exact pixel dimensions].
```

**Worked fill (a mid-shoot cutaway for a fictional documentary-style piece, not tied to any real project):**

```
Medium close-up of a research scientist in her forties, silver-streaked hair pulled back,
wearing a plain lab coat over a grey sweater, hands resting on a lab bench covered in
handwritten notes, in a sunlit university laboratory, late afternoon, dust visible in
the light shafts through tall windows.
Shot on 50mm lens at f/2.2, moderate depth of field, bench sharp, background softly blurred.
Camera at eye level, slightly off-center composition.
Lighting: soft key light from the window camera-right, gentle warm fill bounced from the
bench surface, natural daylight color temperature, high-key documentary style.
Color palette: warm neutral tones, soft cream and grey, single muted green accent from a
plant on the windowsill.
Mood/atmosphere: quiet focus, unhurried, genuine; dust motes visible in the light.
Reference: in the style of an observational science documentary still, not staged.
Negative prompt: no lab coat wrinkling artifacts, no extra fingers, no text on papers
legible enough to misread, no overly dramatic lighting, no smiling at camera.
Aspect ratio: 3:2. Resolution target: 2K.
```

### B3. The Consistency Protocol: planning a multi-image shoot

Use this sequence whenever more than one image in a set must share a character, product, or world. Skipping steps is the single most common cause of a client-facing batch coming back with visibly "different person in every photo."

1. **Build the reference set first, before any shoot prompt is written.** Generate (or gather, if a real photo exists) three to five reference angles: front, three-quarter, profile/back, and if relevant a full-body or full-product view. Treat this step as its own deliverable with its own review, not a throwaway.
2. **Choose and lock the identity mechanism for the whole shoot.** Decide up front which consistency technique this shoot will use (Midjourney `--cref`/`--cw`, a Higgsfield `soul_id`, a trained LoRA, or a native `image_references` array) and commit to it for every image in the set; switching methods mid-shoot re-introduces drift.
3. **Lock a seed where the tool supports it**, in addition to the identity mechanism, when reproducibility of a specific frame (not just the character) matters, e.g. re-running the same shot at a different resolution or fixing a small defect.
4. **Generate a small test batch (3-5 images) across a range of the poses/angles the full shoot will need, before committing to the full batch.** This surfaces identity drift, lighting inconsistency, or palette drift cheaply, while it's still 3-5 images to fix rather than 30.
5. **Verify identity drift explicitly.** Lay the test batch side by side and check: same facial structure/proportions (not just "similar-looking"), same product geometry and color, same environment/world details. Don't rely on a first impression; check specific features (nose shape, product logo placement, wall color) against the reference sheet.
6. **Correct before scaling up, not after.** If drift is found, the fix is almost always to strengthen the reference set (add an angle that's clearly missing) or increase the identity weight/strength parameter, not to write a more detailed text prompt; text description rarely fixes an identity-lock problem because the model is already trying to follow the text, the reference channel is what's underperforming.
7. **Only then generate the full batch**, using the same locked identity mechanism, the same negative prompt discipline, and the same review pass (spot-check every image against the reference sheet, not just the first few).
8. **Archive the reference set and the identity ID/seed with the project files.** The whole point of building it once is to reuse it for every future image this character/product/world needs, including next month's follow-up shoot; losing track of the reference set means redoing step 1 from scratch.

### B4. Model selection logic

| Creative goal | Best-fit model(s) from the landscape | Why |
|---|---|---|
| Photoreal character portrait, moody/cinematic | Midjourney, FLUX Pro/Max, Higgsfield Soul Cinema | Strongest painterly-to-photoreal lighting control and aesthetic default |
| Diagram, infographic, or in-image typography | GPT Image family, OpenAI Hazel, Nano Banana Pro, Ideogram | Purpose-built or best-in-class text/layout rendering |
| Product ad / brand-kit-aware hero shot | Recraft (vector/logo work), Marketing Studio / ms_image (brand-kit folding), FLUX Pro (photoreal product) | Precise palette/logo control or brand-asset awareness baked into the tool |
| Stylized / illustrative image | Midjourney, z_image (fast/cheap stylized), Recraft (vector illustration) | Strongest non-photoreal aesthetic defaults |
| Fast iteration / cheap drafts before committing | Nano Banana (base), z_image, FLUX Schnell | Explicitly the budget/speed tier in their respective families |
| Final 4K client deliverable | Nano Banana Pro, Cinema Studio 2.5, Seedream (4K-6K), FLUX Max, plus a Topaz/bytedance upscale pass if source resolution falls short | Native high-resolution output tiers, or dedicated upscaling to bridge a strong low-res draft |
| Recurring character across many images | Higgsfield Soul/Soul Cast (`soul_id`), Midjourney `--cref`, a trained SD LoRA | Purpose-built identity persistence rather than a single reference image |
| Recurring location/environment across many images | Higgsfield `soul_location`, ControlNet + IP-Adapter (SD ecosystem) | Purpose-built or structural consistency for backgrounds/sets |

### B5. Failure modes and tells

- **Camera jargon the model quietly ignores.** Some engines respect focal length and aperture language closely (FLUX, most photoreal-trained models); others treat it as vague mood language and largely ignore the literal optics (this is more common in illustration-leaning or heavily stylized models). The tell: two different lens descriptions in the same tool produce visually identical depth-of-field results. When this happens, stop adding more lens jargon (it won't help) and instead use compositional language the model does respond to ("background heavily blurred," "only the subject in focus").
- **A reference image fighting the text prompt.** If a reference photo shows a subject in bright daylight and the text prompt asks for moody night lighting, most identity-lock systems will produce a compromise that satisfies neither well (odd lighting, or identity drift as the model prioritizes the text over the reference). The tell: the result looks like neither the reference nor the described scene. Fix by either choosing a reference shot in lighting closer to the target, or lowering the reference/identity weight and accepting looser identity match in exchange for correct lighting.
- **Aspect ratio decided after generation.** The tell is a composition that feels "cropped" rather than "composed": a subject uncomfortably close to one edge, empty dead space that clearly used to hold something before a crop. This is diagnosable by asking whether the framing decision was made before or after the first draft; if after, redo natively in the correct ratio rather than cropping.
- **Over-trusting a vague reference.** "Cinematic style," "epic," "high quality" are not references, they're filler the model has seen attached to every kind of image and therefore steers it toward almost nothing specific. The tell: removing the phrase changes nothing about the output. Replace with a named, specific reference (a photographer, a film, a decade, a lighting style) or cut it.
- **Text-heavy prompts on the wrong model.** The tell is obvious: garbled, misspelled, or dropped characters, no matter how many times the prompt repeats the correct spelling. This isn't a prompt problem, it's a model-selection problem; route to a text-rendering specialist (A6, B4) instead of continuing to iterate the prompt.
- **Skipping the test batch in a consistency shoot.** The tell shows up expensively: a full 20-image batch delivered to a client with visible identity drift across half of them, because the drift was never caught in a small test batch first (B3, step 4).

### B6. Trigger list: what forces a prompt or shoot rebuild

- **A brand palette change.** Every prompt template and reference sheet that encodes the old palette (in the color clause, in reference images, in any trained LoRA) needs to be revisited; a palette clause update alone is not enough if reference images still show the old colors.
- **A new character joining an existing set.** Requires building that character's own reference set and identity lock from scratch (B3, step 1) before generating them alongside existing characters; do not attempt to "blend them in" with a single description added to an existing prompt template, it will not hold identity reliably.
- **A resolution or deliverable change** (e.g. a set generated for social is suddenly needed for a billboard). Requires either regenerating natively at the new target resolution/ratio or running a dedicated upscale pass (A7); does not mean simply re-exporting the existing files larger.
- **A new required aspect ratio for an existing shot** (e.g. a 1:1 product shot now also needed as 9:16 for Stories). Requires a compositional rethink or an outpaint pass, not a crop, because the original composition was built for a different frame shape (A7).
- **Migration to a different model or engine.** Because prompt vocabulary, negative-prompt behavior, and reference-image mechanics differ across engines (A4, A5), a prompt tuned for one engine (say, Midjourney's `--cref`/`--sref` syntax) does not port directly to another (say, a native `image_references` array); rebuild the prompt using the new engine's actual mechanics rather than assuming portability.
- **A text/typography requirement added to a previously photoreal brief.** Forces a model-selection change (B4) and a prompt-structure change (A6, enumerated layout, exact-spelling repetition), not just an added clause on the existing prompt.

---

## PART C: DATED COST SNAPSHOT (as of 2026-07-26, refresh before relying on for budgeting)

**This entire section expires fast.** AI image pricing moves on a timescale of weeks: new model versions launch, older ones get discounted or deprecated, and third-party API resellers undercut official pricing constantly. Every figure below was pulled from a live web search or the Higgsfield MCP on 2026-07-26. Do not quote these numbers to a client, or build a cost model on them, without re-verifying first. Figures without a strong source are explicitly flagged [UNVERIFIED].

### C1. Subscription tools (monthly plans)

| Tool | Entry tier | Mid tier | Top tier | Notes |
|---|---|---|---|---|
| Midjourney | Basic $10/mo (~3.3 fast GPU hrs) | Standard $30/mo (~15 fast hrs + unlimited relax), Pro $60/mo (~30 fast hrs) | Mega $120/mo (~60 fast hrs) | Annual billing ~20% off; extra fast hours $4 each, don't expire [SOURCED] |
| Ideogram | Free (~10 slow credits/week); Basic $8/mo (400 priority credits) | Plus $20/mo or $15/mo annual (1,000 credits) | Pro $60/mo or $42/mo annual (3,500 credits) | Cost per image varies 1-6 credits depending on model version/quality tier [SOURCED] |
| Recraft | Basic $10/mo (1,000 credits) | Advanced $27/mo (4,000 credits) | Pro $48/mo (8,400 credits); Teams $55/seat/mo (9,000 credits/seat) | Free tier: 50 daily credits, public images only; annual billing ~20% off [SOURCED] |
| Leonardo.Ai | Free (150 tokens/day); Apprentice $12/mo (8,500 tokens) | Artisan $30/mo (25,000 tokens) | Maestro $60/mo (60,000 tokens) | Team Starter $72/mo, Team Growth $144/mo; annual billing up to 20% off [SOURCED] |
| Adobe Firefly | Free (25 credits/mo); Standard $9.99/mo | Pro $19.99/mo (4,000 premium credits, unlimited standard) | Pro Plus $49.99/mo (10,000 credits); Premium $199.99/mo (50,000 credits) | Creative Cloud All Apps ($59.99/mo) includes 1,000 credits; unlimited standard generation on paid Firefly/CC plans [SOURCED] |
| Higgsfield | Plus $49/mo ($39/mo annual) = 1,000 credits/mo | Ultra $129/mo ($99/mo annual) = 3,000 credits/mo | One-time top-ups: 500cr/$26, 1,000cr/$49, 2,000cr/$95, 4,000cr/$190 (expire 90 days) | Tooltip states ~4,800 images per 1,000 credits, but this is a blended average across cheap models, **not a per-model rate** (see C3 caveat below). Verified live via `show_plans_and_credits` on 2026-07-26. |

### C2. Pay-per-image / API pricing (representative, official rate where available)

| Model | Approx. cost per image | Source note |
|---|---|---|
| GPT Image 1 (OpenAI) | ~$0.02 (low quality) / ~$0.07 (medium) / ~$0.19 (high), square image | Token-based: $5/1M text input, $10/1M image input, $40/1M image output tokens. **GPT Image 1 deprecates 2026-10-23**, moving toward GPT Image 1.5/2 [SOURCED]. Newer GPT Image 2 / OpenAI Hazel per-image rates not independently confirmed this pass [UNVERIFIED] |
| Nano Banana Pro (Google) | ~$0.134 (1K/2K) / ~$0.24 (4K) via standard API; ~50% off via Batch API (~$0.12 at 4K) | [SOURCED] |
| Nano Banana 2 (Google) | From ~$0.045 (1K) | Described as ~3x cheaper than Nano Banana Pro at like-for-like resolution [SOURCED] |
| Nano Banana (base, Google) | From ~$0.039 | [SOURCED] |
| Imagen 4 (Google) | Fast ~$0.02, Ultra ~$0.06 | Range across Imagen 4 tiers [SOURCED] |
| FLUX.2 Pro (Black Forest Labs) | ~$0.03 per 1024x1024 image, official API | Priced by megapixel, not flat per-image, so cost scales with resolution [SOURCED] |
| FLUX.2 Max | ~$0.03/megapixel input; ~$0.07 first output megapixel, ~$0.03 each additional | [SOURCED] |
| FLUX.2 Schnell | ~$0.003 per image | Cheapest hosted FLUX tier, built for drafts/volume [SOURCED] |
| FLUX.2 Flex | ~$2.46 per 1024x1024 image on Replicate (with input image) | Third-party hosting price, not BFL's own API; exposes extra sampling/guidance controls [SOURCED, but platform-specific, verify against BFL's own API before quoting] |
| Seedream 4.0 (Bytedance) | ~$0.03/image official (Vercel AI Gateway); ~$0.018-$0.02/image via third-party resellers (EvoLink, Kie.ai, APIMart) | Up to 4K resolution [SOURCED] |
| Seedream 4.5 | ~$0.04 per output image (OpenRouter) | Newer version, priced above 4.0 on at least one aggregator [SOURCED] |
| Ideogram 3.0 Default | ~1 credit/image (~$0.017-$0.02 equivalent) | Turbo ~0.5 credit, Quality ~1.5 credits [SOURCED] |
| Ideogram 4.0 Default | ~4 credits/image (~$0.07-$0.08 equivalent) | Quality tier ~6 credits/image [SOURCED] |

### C3. The Higgsfield credit-cost limitation (read before budgeting any Higgsfield-based shoot)

Higgsfield's plan-level pricing is confirmed and clean: Plus at $49/month ($39/month billed annually) for 1,000 credits, Ultra at $129/month ($99/month billed annually) for 3,000 credits, plus one-time top-up packs (500 to 4,000 credits, $26 to $190, expiring after 90 days). This was verified live via `show_plans_and_credits` on 2026-07-26.

What is **not** exposed through this interface is a simple public per-model credit price list. The in-app tooltip states that 1,000 credits works out to roughly "4,800 images or 200 videos or 60 character generations," but this is explicitly a blended average across Higgsfield's full model roster, not a per-model rate. In practice this means:

- A generation on a cheap/fast model (e.g. `z_image`, `nano_banana` base, `nano_banana_2_lite`) very likely costs meaningfully fewer credits than a generation on a premium model (e.g. `nano_banana_pro` at 4K, `cinematic_studio_2_5`, `soul_cinematic`, or a `marketing_studio_image` batch run).
- The actual credit cost per generation is only shown in-app at generation time, varies by model, resolution tier (1K/2K/4K), and quality setting, and is not derivable from the blended "~4,800 images per 1,000 credits" figure with any precision.
- **Do not use the ~4.8 credits-per-image blended figure to estimate the cost of a specific shoot on a specific premium model.** For budgeting a real shoot (for example, a 20-image Soul Cast consistency batch at 4K, or a Marketing Studio batch of 20 product ad variants), the only reliable method as of this writing is a small paid test batch on the actual target model/resolution, then extrapolating from the credits actually deducted, or contacting Higgsfield directly for a per-model rate card.

This is flagged here as a genuine, current limitation of the platform's pricing transparency, not an oversight in this document.

### C4. How to refresh this section

Before using any figure in this Part C for a real budget or client quote:
1. Re-run the Higgsfield `show_plans_and_credits` tool live rather than trusting the numbers above.
2. Re-check official pricing pages directly for any model in active use: `openai.com/pricing`, `bfl.ai/pricing` (or `docs.bfl.ml/quick_start/pricing`), Google's Gemini/Imagen API pricing page, `ideogram.ai`, `recraft.ai`, `leonardo.ai`, Adobe's Firefly/Creative Cloud pricing page, and Bytedance/Seedream's official docs or a first-party aggregator like OpenRouter.
3. Treat any number sourced from a third-party blog or aggregator (as most figures in C2 are) as directionally correct but not contractually reliable; official vendor pages are the only citable source for a client-facing quote.
4. Re-date this entire section with the date of the refresh; a stale, undated cost table is worse than no cost table, because it reads as current when it may not be.
