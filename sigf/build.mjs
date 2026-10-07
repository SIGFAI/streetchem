// Street Chem (zrock, MIT): Schedule I's growing and dealing played inside Cyberpunk 2077's Night City. Both games run
// on the player's PC: a MelonLoader mod in Schedule I (IL2CPP) owns the plants, the product stock and the money, and
// serves a named pipe; a RED4ext plugin + redscript in Cyberpunk drives it, with a ReShade add-on that draws the grow
// tents into Cyberpunk's picture from shared memory.
//
// Rehosted on SIGFAI/streetchem (licensed upstream, standard mirror): upstream's two game-root zips of release v0.2.0
// unchanged, plus every loader upstream names as tested, each the official release file unchanged (RED4ext 1.30.0,
// redscript 0.5.31, TweakXL 1.11.4, Codeware 1.20.5, MelonLoader 0.7.3 x64; MIT/MIT/MIT/MIT/Apache-2.0), and our
// ReShade 6.8.0 add-on setup for Cyberpunk: ReShade64.dll (BSD-3-Clause, the same unchanged file SIGF ships for GTA V
// in SIGFAI/um-gta5-passthrough, taken from that release asset) as bin/x64/dxgi.dll, the CC0 ReShade.fxh next to
// StreetChemLab.fx, and a ReShade.ini + preset that turn StreetChemLab on (what upstream's Install.ps1 edits).
//   node library/streetchem/build.mjs       (outputs: library/lib.mjs)
import { unzip } from '../../orchestrator/src/recipe.js';
import { asset, card, dl, emit, pinned, player, zipAsset } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/dr4lera/CyberpunkStreetChem', tag: 'v0.2.0', commit: '791e7061f18a008b0326d4c125a089b57b416ec0',
  license: 'MIT', authors: ['zrock'],
  cyberpunk: { file: 'StreetChem-Cyberpunk2077-v0.2.0.zip', sha256: 'bc9661de70a3385d5eb9b9b22833d7c0fe0d4c363e60f5bb1b993ddbc7818ed7' }, // = GitHub digest
  schedule1: { file: 'StreetChem-ScheduleI-v0.2.0.zip', sha256: 'ed7e6cd3840c00c421bcfadda42fec36a8316fd0b94b214c5ca73403e6447978' }, // = GitHub digest
};
const ID = 'streetchem', VERSION = '0.2.0', NAME = 'Street Chem';
const TAGLINE = 'Grow and sell Schedule I\'s product in Night City: grow tents, street sales and runners in Cyberpunk 2077, with Schedule I keeping the books.';

// Official release files, unchanged (sha256 = GitHub release digests, 2026-10-07).
const DEPS = {
  red4ext: { name: 'RED4ext', version: '1.30.0', file: 'red4ext-1.30.0.zip', repo: 'https://github.com/wopss/RED4ext', tag: 'v1.30.0', license: 'MIT',
    sha256: '3a72225c9d2c46c99f4a4159d952b9d24366357c2423eb7ea255c84e9e11c0b0' },
  redscript: { name: 'redscript', version: '0.5.31', file: 'redscript-v0.5.31-windows.zip', repo: 'https://github.com/jac3km4/redscript', tag: 'v0.5.31', commit: 'e41938253f21a6221883532edff387a2baa26dd8', license: 'MIT',
    sha256: '799bbd88863f6728616f8d723c941ea15dff71ed5bbfd50c525f0d39ea0bf46b' },
  tweakxl: { name: 'TweakXL', version: '1.11.4', file: 'TweakXL-1.11.4.zip', repo: 'https://github.com/psiberx/cp2077-tweak-xl', tag: 'v1.11.4', commit: 'f8da6be4fb7b8340d5744d822a85de1400f2cafb', license: 'MIT',
    sha256: '13033a1f10cb1dbfa534964b22e3405aa33e8f29145f17164d318b021402883f' },
  codeware: { name: 'Codeware', version: '1.20.5', file: 'Codeware-1.20.5.zip', repo: 'https://github.com/psiberx/cp2077-codeware', tag: 'v1.20.5', commit: '613a1cb830ecf33508ffca839d3ea631073504ef', license: 'MIT',
    sha256: '102989e199bad650fe6e53395c22bac53fdd7abecc6eeec3b0046886631591f0' },
  melonloader: { name: 'MelonLoader', version: '0.7.3', file: 'MelonLoader.x64.zip', repo: 'https://github.com/LavaGang/MelonLoader', tag: 'v0.7.3', commit: '982ed9981ac5b0619648a2e79bcc02fd8861db33', license: 'Apache-2.0',
    sha256: '5b2b2f3d1cd42b59ec886c5bdc2663edae87a0097a4f4a8f58c0965a99dda416' },
};
// ReShade 6.8.0 add-on build as SIGF already ships it (library/um-gta5-passthrough/sigf-build.mjs RESHADE): its release
// asset holds ReShade64.dll unchanged (renamed .asi there), the CC0 shader headers and ReShade's license.
const RESHADE = { version: '6.8.0', file: 'reshade-6.8.0-addon.zip', url: 'https://github.com/SIGFAI/um-gta5-passthrough/releases/download/v0.1.0/reshade-6.8.0-addon.zip',
  sha256: 'd4167356162b209be93b6a35cf7e1253cffb2ac00746cf007a7201d362b00d07', dll: '0cee63f9c9f13f3ac909c5b4903f4dbb4b719a7ab3b4f13b0deaf83c814b94f7',
  repo: 'https://github.com/crosire/reshade', commit: '18deaa52de0c425a78b329e9cb3c497281cd00ec', license: 'BSD-3-Clause' };

const rel = (d) => `${d.repo}/releases/download/${d.tag}/${d.file}`;
const deps = {};
for (const [id, d] of Object.entries(DEPS)) deps[id] = asset(d.file, await pinned(rel(d), d.sha256), { zipped: true });
const cp = asset(UP.cyberpunk.file, await pinned(`${UP.repo}/releases/download/${UP.tag}/${UP.cyberpunk.file}`, UP.cyberpunk.sha256), { zipped: true });
const s1 = asset(UP.schedule1.file, await pinned(`${UP.repo}/releases/download/${UP.tag}/${UP.schedule1.file}`, UP.schedule1.sha256), { zipped: true });
for (const f of ['red4ext/plugins/StreetChem/StreetChemHost.dll', 'bin/x64/StreetChemRender.addon64', 'bin/x64/streetchem/shaders/StreetChemLab.fx'])
  if (!cp.contents.some(c => c.path === f)) throw new Error(`${cp.name} has no ${f}`);
if (!s1.contents.some(c => c.path === 'Mods/StreetChem.Guest.dll')) throw new Error(`${s1.name} has no Mods/StreetChem.Guest.dll`);

const rs = new Map(unzip(await pinned(RESHADE.url, RESHADE.sha256, RESHADE.file)).map(e => [e.name, e.data]));
// What upstream's Install.ps1 sets in ReShade.ini and the preset (EffectSearchPaths gets .\streetchem\shaders, the
// preset gets StreetChemLab@StreetChemLab.fx), written fresh: the app's snapshot puts a player's own files back on Restore.
const INI = ['[GENERAL]', 'EffectSearchPaths=.\\streetchem\\shaders\\', 'TextureSearchPaths=.\\streetchem\\shaders\\', 'PresetPath=.\\streetchem\\StreetChemPreset.ini', '',
  '[OVERLAY]', 'TutorialProgress=4', 'ShowClock=0', 'ShowFPS=0', ''].join('\r\n');
const PRESET = 'Techniques=StreetChemLab@StreetChemLab.fx\r\nTechniqueSorting=StreetChemLab@StreetChemLab.fx\r\n';
const reshade = zipAsset(`${ID}-reshade-6.8.0.zip`, [
  { name: 'bin/x64/dxgi.dll', data: rs.get('ReShade64.asi') },
  { name: 'bin/x64/ReShade.ini', data: Buffer.from(INI) },
  { name: 'bin/x64/streetchem/StreetChemPreset.ini', data: Buffer.from(PRESET) },
  { name: 'bin/x64/streetchem/shaders/ReShade.fxh', data: rs.get('reshade-shaders/Shaders/ReShade.fxh') },
  { name: 'bin/x64/streetchem/LICENSE-ReShade.md', data: rs.get('reshade-shaders/LICENSE-ReShade.md') },
]);
if (!reshade.contents.some(c => c.path === 'bin/x64/dxgi.dll' && c.sha256 === RESHADE.dll)) throw new Error('ReShade64.dll differs from the SIGF-shipped file');

const cpFiles = [deps.red4ext, deps.redscript, deps.tweakxl, deps.codeware, reshade, cp];
const s1Files = [deps.melonloader, s1];
const assets = [...cpFiles, ...s1Files];

const make = (urls, set) => {
  const by = (n) => set.find(a => a.name === n);
  const step = (a) => ({ src: a.name, dst: '{game}', unpack: true, contents: a.contents, ...dl(a, urls) });
  const req = (id, note) => {
    const d = DEPS[id];
    return { id, version: d.version, license: `${d.license}, shipped unchanged`, page: `${d.repo}/releases/tag/${d.tag}`, note, source: { url: urls[d.file], sha256: deps[id].sha256 } };
  };
  return {
    id: `sigf/${ID}`,
    version: VERSION,
    name: NAME,
    tagline: player(ID).tagline ?? TAGLINE,
    how_to_play: player(ID).howToPlay,
    kind: 'passthrough',
    games: [
      { game: 'cyberpunk', role: 'host', label: 'Cyberpunk 2077', engine: 'Cyberpunk 2077 (REDengine 4) + RED4ext plugin StreetChemHost (C++), redscript, ReShade add-on StreetChemRender', apps: { steam: '1091500', gog: '1423049311' }, runtime: 'patch 2.31 (checked by the author)' },
      { game: 'schedule1', role: 'guest', label: 'Schedule I', engine: 'Schedule I (Unity, IL2CPP) + MelonLoader mod StreetChem.Guest (C#)', apps: { steam: '3164500' }, runtime: '0.4.6f13, IL2CPP default branch (checked by the author)' },
    ],
    requires: [
      req('red4ext', 'the build for patch 2.31; installed into the Cyberpunk folder by the app'),
      req('redscript', 'installed into the Cyberpunk folder by the app'),
      req('tweakxl', 'installed into the Cyberpunk folder by the app (inventory items)'),
      req('codeware', 'installed into the Cyberpunk folder by the app (the apartment dealer)'),
      { id: 'reshade', version: RESHADE.version, license: `${RESHADE.license}, ReShade64.dll unchanged`, page: 'https://reshade.me/',
        note: 'the add-on build, installed by the app as bin/x64/dxgi.dll with StreetChemLab turned on; it draws the grow tents', source: { url: urls[reshade.name], sha256: reshade.sha256 } },
      req('melonloader', 'x64, installed into the Schedule I folder by the app'),
    ],
    install: [
      { game: 'cyberpunk', strategy: 'game-dir-snapshot', loader: 'red4ext', files: cpFiles.map(a => step(by(a.name))) },
      { game: 'schedule1', strategy: 'game-dir-snapshot', loader: 'melonloader', files: s1Files.map(a => step(by(a.name))) },
    ],
    // Schedule I first (its mod serves the pipe StreetChem.Control.v1 once a save is loaded), then Cyberpunk through
    // its store (RED4ext loads through bin/x64/winmm.dll, ReShade through bin/x64/dxgi.dll).
    launch: [{ game: 'schedule1', args: [] }, { game: 'cyberpunk', args: [] }],
    files: set.map(a => ({ name: a.name, ...dl(a, urls) })),
    source: {
      repo: UP.repo, license: 'MIT AND Apache-2.0 AND BSD-3-Clause', upstream_license: UP.license, tag: UP.tag, commit: UP.commit,
      hosted: `https://github.com/SIGFAI/${ID}`,
      bundled: [
        ...Object.values(DEPS).map(d => ({ name: d.name, version: d.version, repo: d.repo, ...(d.commit ? { commit: d.commit } : {}), license: d.license })),
        { name: 'ReShade', version: RESHADE.version, repo: RESHADE.repo, commit: RESHADE.commit, license: RESHADE.license },
      ],
    },
    media: {},
    built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
    idea_by: UP.authors[0],
    built_at: '2026-10-07T00:00:00.000Z',
    // Never installed together (the app refuses either order): CyberCraft: the same RED4ext files (bin/x64/winmm.dll, red4ext/RED4ext.dll) in the Cyberpunk folder.
    conflicts: ['sigf/cybercraft'],
    ...card(UP.repo),
    notes: player(ID).notes,
  };
};

// No app fixture: over 2 MB (MelonLoader alone is 20 MB).
emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });
