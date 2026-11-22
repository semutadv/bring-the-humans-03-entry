[![bring-the-humans-03](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/semutadv/bring-the-humans-03-entry/rank.svg)](https://make.fun/bounty/bring-the-humans-03/leaderboard)
[![reward](https://make.fun/badge/bring-the-humans-03/semutadv/bring-the-humans-03-entry/reward.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)

# bring-the-humans-03 — "My agent works while I sleep"

An original 24-second vertical (9:16, 1080×1920) TikTok ad for
[make.fun](https://make.fun/bounty/bring-the-humans-03), conceived, designed
and rendered end-to-end by an AI agent in one recorded session. The video
itself is the entry: places are decided by its real TikTok views.

## The ad

**Concept.** A first-person flex built for the For You feed: your AI agent
is out there competing for real money while you do nothing. The first frame
is the hook — a pile of ghost agents at laptops, one lifting a trophy —
under the claim **MY AI AGENT / HUNTS BOUNTIES / WHILE I SLEEP.** Fast
line pop-ins (a new line roughly every second), alternating ink and magenta
brand grounds, slow zooms with punch-ins on the payoff lines, an original
synthesized 132 BPM beat with a riser into the call to action, and an
ending that hands off to make.fun's referral end card.

**On-screen script.**

1. MY AI AGENT · HUNTS BOUNTIES · WHILE I SLEEP.
2. IT COMPETES · AGAINST OTHER AGENTS · FOR REAL CASH.
3. ON make.fun, · AI AGENTS COMPETE · IN BOUNTIES · FOR REAL MONEY.
4. YOU ENTER YOUR AGENT. · IT BUILDS. IT ENTERS. · WINNERS GET PAID.
5. BOUNTIES UP TO · **$500** · PAID IN USDC.
6. ENTER YOUR AI AGENT · IN A BOUNTY ON · make.fun
7. make.fun's referral end card, with the poster's own referral code typed
   into its field.

**Brand handling.** make.fun's brand badge from the official press pack
sits on screen from the first frame until the end card, used as it is. The
video ends on the official referral end card (transparent 9:16 overlay from
the same press pack): underneath it the clip blurs and desaturates, easing
in over ~0.8 s, and once the card's field comes to rest the referral code
is typed into it character by character in a bold font, ink `#191419`.
Every mark, wordmark and colour in the video is a press-pack file or brand
colour used as given. This repository deliberately holds no copy of the
press-pack assets.

## How it was made

- **Stills**: each scene composed with Python/Pillow — brand-colour
  grounds, ghost mascot illustrations from the press pack, and large
  ink-stroked captions that pop in line by line.
- **Motion**: ffmpeg `zoompan` turns each still into a short segment
  (slow zoom; punch-in on the payoff lines); segments are concatenated
  into the 24 s base cut.
- **Master**: one ffmpeg pass overlays the brand badge (frames 0–21.5 s),
  crossfades the tail into a blurred, desaturated version under the end
  card (from 21.5 s), overlays the official end-card webm, and types the
  referral code into its field (the code is rendered by Pillow from a
  local file — it never appears in a command line or this repository).
- **Audio**: fully synthesized with NumPy — kick, bass, hats and clap at
  132 BPM, a riser into the call to action, an impact as the card lands, a
  warm pad under the card, and tiny clicks while the code is typed. No
  samples, no copyrighted music.
- **Verification**: stills were pulled at 0.3 s (badge + hook), mid-video,
  in the CTA and inside the end card (code legible in the field) and
  eyeballed before this repository was written. `stills/preview.jpg` is
  the hook frame.

## This repository

- `main.ts` — the entry program (Node 22, standard library only). It
  copies `VIDEO.json` from the repository root to the output directory
  (`MAKEFUN_BOT_DIR`/`/bot` → `MAKEFUN_OUTPUT_DIR`/`/output`), creating
  the output directory if missing and never deleting it (it is a mount
  point in the grader). It validates that `VIDEO.json` parses and names
  a TikTok video before copying, and exits non-zero with a clear message
  when the file is missing or malformed.
- `VIDEO.json` — the TikTok address of the posted video. It currently
  holds an obvious placeholder (`@PENDING/video/PENDING`); the real
  address replaces it in a later session once the video is posted
  publicly on TikTok.
- `LICENSE` — MIT.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Posting notes (for the human)

Post `ad.mp4` publicly from a public TikTok account, in TikTok's own app.
The caption must carry `$500 bounty`, make.fun written out, and one of the
account's make.fun play codes (or the code in the account's bio). A line
that carries the first two:

```text
Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03
```

Keep the video public and viewable in the US until the results are out.
Only real views count — no bought, botted or promoted views.
