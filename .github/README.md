# Street Chem

Grow and sell Schedule I's product in Night City: grow tents, street sales and runners in Cyberpunk, with Schedule I keeping the books.

**Street Chem is made by [zrock](https://github.com/zrock).** All credit for the mod goes to them.

- Original project: https://github.com/dr4lera/CyberpunkStreetChem
- Report bugs and ask questions there: https://github.com/dr4lera/CyberpunkStreetChem/issues
- Upstream release packaged here: [v0.2.0](https://github.com/dr4lera/CyberpunkStreetChem/releases/tag/v0.2.0) (commit [`791e706`](https://github.com/dr4lera/CyberpunkStreetChem/tree/791e7061f18a008b0326d4c125a089b57b416ec0))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Cyberpunk 2077** ([Steam](https://store.steampowered.com/app/1091500/)): patch 2.31 (checked by the author).
- **Schedule I** ([Steam](https://store.steampowered.com/app/3164500/)): 0.4.6f13, IL2CPP default branch (checked by the author).
- Windows and the [SIGF app](https://sigf.ai). The app installs red4ext 1.30.0, redscript 0.5.31, tweakxl 1.11.4, codeware 1.20.5, reshade 6.8.0, melonloader 0.7.3 for you.

## Install

In the SIGF app, open **Street Chem** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v0.2.0`](../../releases/tag/v0.2.0).

### How to play

- Both games run at once: you play in Cyberpunk 2077, while Schedule I in the background owns the plants, the product stock and the dealers.
- Load a single-player business save in Schedule I and leave it unpaused, then load a save in Cyberpunk. Ctrl+H shows the help pages.
- Aim at a flat floor and press Ctrl+B to buy a grow tent (1200 eddies). Ctrl+E on its pot plants, waters and harvests; Ctrl+G inspects it.
- Ctrl+N picks a product, Ctrl+S sells one unit to the civilian you aim at. Ctrl+J and Ctrl+K turn your Schedule I dealers into Night City runners.
- Your product shows up as Cyberpunk consumables, and a dealer waits outside V's H10 apartment. Make a manual Cyberpunk save after each session.

### Good to know

- You need Cyberpunk 2077 (patch 2.31) and Schedule I (0.4.6f13, the default IL2CPP branch) on Windows. Run Schedule I once before the first Play so MelonLoader can prepare it; a game update can break the mod.
- The app installs RED4ext 1.30.0, redscript 0.5.31, TweakXL 1.11.4, Codeware 1.20.5 and ReShade 6.8.0 (add-on build, as dxgi.dll in bin/x64) into Cyberpunk, and MelonLoader 0.7.3 into Schedule I. Restore removes them and puts back any ReShade setup you had.
- Experimental solo release (v0.2.0): no multiplayer. The grow tents are a picture layer, so Night City walls do not hide them and they have no collision. Keep your latest paired saves of both games together.
- Product icons in Cyberpunk's inventory stay blank unless you run the author's optional local icon converter (WolvenKit needed). Restore leaves the StreetChem folder in %LOCALAPPDATA% (the mod's journal).
- Beta: report bugs to the author on the upstream issue tracker.

## What this repository holds

1. The upstream source tree at tag `v0.2.0`, commit [`791e7061f18a008b0326d4c125a089b57b416ec0`](https://github.com/dr4lera/CyberpunkStreetChem/tree/791e7061f18a008b0326d4c125a089b57b416ec0), every file unchanged (same git blobs). Upstream's own `README.md` is there, unchanged; GitHub shows this file (`.github/README.md`) first.
2. Added by SIGF in the same commit: this file, `THIRD-PARTY.md` (licenses and sources of the third-party files in the release), and `sigf/` (the scripts that built the release assets, for reference: they run inside the SIGF repository).
3. `mashup.json`, the SIGF app recipe (the next commit).
4. The release `v0.2.0` (its tag is the first commit):

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `red4ext-1.30.0.zip` | 575834 B | `3a72225c9d2c46c99f4a4159d952b9d24366357c2423eb7ea255c84e9e11c0b0` | RED4ext 1.30.0, the official release file, unchanged (MIT, see THIRD-PARTY.md); unpacked into the Cyberpunk 2077 folder. |
| `redscript-v0.5.31-windows.zip` | 948910 B | `799bbd88863f6728616f8d723c941ea15dff71ed5bbfd50c525f0d39ea0bf46b` | redscript 0.5.31, the official Windows release file, unchanged (MIT, see THIRD-PARTY.md); unpacked into the Cyberpunk 2077 folder. |
| `TweakXL-1.11.4.zip` | 1046349 B | `13033a1f10cb1dbfa534964b22e3405aa33e8f29145f17164d318b021402883f` | TweakXL 1.11.4, the official release file, unchanged (MIT, see THIRD-PARTY.md); unpacked into the Cyberpunk 2077 folder. |
| `Codeware-1.20.5.zip` | 1962550 B | `102989e199bad650fe6e53395c22bac53fdd7abecc6eeec3b0046886631591f0` | Codeware 1.20.5, the official release file, unchanged (MIT, see THIRD-PARTY.md); unpacked into the Cyberpunk 2077 folder. |
| `streetchem-reshade-6.8.0.zip` | 2459209 B | `c26641439de58333227f2f46ec335433ebb65dbbdda365b822a85f14c2e79775` | ours: ReShade 6.8.0 (add-on build) `ReShade64.dll` unchanged as `bin/x64/dxgi.dll`, a `ReShade.ini` and `streetchem/StreetChemPreset.ini` that turn StreetChemLab on (what upstream's Install.ps1 sets), the CC0 `ReShade.fxh` and ReShade's license; into the Cyberpunk 2077 folder. |
| `StreetChem-Cyberpunk2077-v0.2.0.zip` | 384124 B | `bc9661de70a3385d5eb9b9b22833d7c0fe0d4c363e60f5bb1b993ddbc7818ed7` | upstream's Cyberpunk release file of `v0.2.0`, unchanged (sha256 `bc9661de...8ed7`); into the Cyberpunk 2077 folder. |
| `MelonLoader.x64.zip` | 20155622 B | `5b2b2f3d1cd42b59ec886c5bdc2663edae87a0097a4f4a8f58c0965a99dda416` | MelonLoader 0.7.3 x64, the official release file, unchanged (Apache-2.0, see THIRD-PARTY.md); unpacked into the Schedule I folder. |
| `StreetChem-ScheduleI-v0.2.0.zip` | 52049 B | `ed7e6cd3840c00c421bcfadda42fec36a8316fd0b94b214c5ca73403e6447978` | upstream's Schedule I release file of `v0.2.0`, unchanged (sha256 `ed7e6cd3...7978`, `Mods/StreetChem.Guest.dll`); into the Schedule I folder. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| Street Chem (all of the upstream tree) | MIT, Copyright 2026 zrock | `LICENSE`, `THIRD_PARTY_NOTICES.md` |
| RED4ext 1.30.0, redscript 0.5.31, TweakXL 1.11.4, Codeware 1.20.5 (release assets) | MIT | `THIRD-PARTY.md` |
| MelonLoader 0.7.3 (release asset) | Apache-2.0 | `THIRD-PARTY.md` |
| ReShade 6.8.0 `ReShade64.dll` and `ReShade.fxh` (in `streetchem-reshade-6.8.0.zip`) | BSD-3-Clause; CC0-1.0 | `THIRD-PARTY.md` |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes Street Chem installable in one click, credited to zrock. If you are the author and want anything changed or taken down, open an issue here.
