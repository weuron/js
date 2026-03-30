(function() {
console.log("overriders OK");
/*
---------------------------------------------
Blok: blok_0000
Název: reload_config
Cesta: — (konfigurační blok, žádný zdrojový soubor)
Řádky: —
Použití v buildu: ANO (globální konfigurace reloadingu a cleanup)
Závislosti: NE
Komentář agenta:
Konfigurační blok obsahuje POUZE proměnné (žádné funkce).
Všechny funkce jsou v blok_0000b (reload_manager).

Zásadní změny:
Mobilní branding pouštět pouze do pozice "mobilerectangle-1", resp. tuto pozici používat pouze pro mobilní branding.

PROMĚNNÉ:
- RELOAD_INTERVAL_MS [POVINNÉ]: interval mezi reload cykly v milisekundách (default 30000)
  Nesmí být menší než 20000 (20s) — nižší hodnota se automaticky přepíše na 20000.
- RELOAD_POSITIONS [POVINNÉ]: mapa adUnit (= DIV data-d-area / data-m-area) → max reloadů
  (0 = pozice se nereloaduje, >0 = max reloady pro danou pozici)
  Prázdná mapa {} = reloading na webu VYPNUT (automaticky se doplní
  výchozí 'mobilerectangle-1': 0, aby cyklus okamžitě skončil).
- RELOAD_CAPPING [VOLITELNÉ]: mapa adUnit → cooldown v sekundách po interakci uživatele
  (0 = po zavření se pozice na dané stránce už nikdy nereloaduje,
   >0 = po zavření se pozice nereloaduje po dobu N sekund)
  Prázdná mapa {} = žádný capping, pozice se reloadují bez omezení.
  POVINNÉ v mapě: Všechny pozice, které mohou obsahovat formát s tlačítkem
  "Zavřít" (slideup, strip, popup), zde MUSÍ být definovány.
- RELOAD_BEFORE_FNS [VOLITELNÉ]: pole kontrolních funkcí spouštěných PŘED každým
  reload cyklem. Prázdné [] = žádné kontrolní funkce.
- LAZYLOAD_POSITIONS [VOLITELNÉ]: mapa adUnit → objekt { threshold, mode }
  Odložené vykreslení kreativy — HB aukce + SAS rozhodnutí proběhnou OKAMŽITĚ,
  ale samotný render se spustí až po splnění podmínky.
  Tři režimy (mode):
    'viewport' = IntersectionObserver — render když je X % plochy POZICE viditelné
    'scroll'   = scroll listener — render když uživatel odscrolloval X % CELÉ STRÁNKY
    'pixel'    = IntersectionObserver s rootMargin — render když je POZICE N pixelů
                 od vstupu do viewportu (threshold = počet pixelů, např. 300)
  Pozice NEUVEDENÁ v mapě = renderuje se okamžitě (žádný lazyload).
  Prázdná mapa {} = lazyloading na webu VYPNUT (vše se renderuje okamžitě).
- RELOAD_PRIVILEGED_DETECTORS [VOLITELNÉ]: mapa adUnit → detekční funkce(el)
  Detekuje obsah s VLASTNÍM autorefreshem (R2B2, Performax ap.).
  Pokud detektor vrátí string (název zdroje) → pozice se TRVALE vyloučí
  z reload cyklu (RELOAD_POSITIONS[area] = 0). Kontrola probíhá:
  1. Po prvním renderování (v startReloadCycle → observer registrace)
  2. Před každým reloadem (v reloadCycleTick → sběr pozic)
  Prázdná mapa {} = žádné detektory, vše se reloaduje dle RELOAD_POSITIONS.

  ┌──────────────────────────────────────────────────────────────────┐
  │ KONVENCE PRO RELOAD KONTROLNÍ FUNKCE                           │
  │                                                                │
  │ Kdokoli z jakéhokoli bloku může zaregistrovat svou kontrolní   │
  │ funkci do RELOAD_BEFORE_FNS. Stačí ji přidat do pole níže.     │
  │ Reload manager je VŠECHNY zavolá před každým reload cyklem.    │
  │                                                                │
  │ Funkce musí:                                                   │
  │ - být bezstavová (nepředpokládat pořadí volání)                │
  │ - být bezpečná (try/catch uvnitř, nesmí shodit reload)         │
  │ - nemanipulovat s DOM kontejnery pozic (sas_mone)              │
  │   (obsah mění SAS sám, NE cleanup funkce)                     │
  │                                                                │
  │ Typické použití:                                               │
  │ - kontrola sticky/fixed elementů mimo sas_mone (3rd party)     │
  │ - logování/měření reloadu                                      │
  │ - resetování stavových proměnných před novým cyklem            │
  │                                                                │
  │ Příklad registrace z jiného bloku:                             │
  │   RELOAD_BEFORE_FNS.push(function myCheck() {                  │
  │       // ... moje kontrola ...                                 │
  │   });                                                          │
  └──────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────┐
  │ FORMÁTY S TLAČÍTKEM „ZAVŘÍT" — ANALÝZA ZDROJŮ                 │
  │                                                                │
  │ Interaktivní formáty (Slideup, Branding, Interscroller)        │
  │ mohou vzniknout z OBOU zdrojů:                                 │
  │                                                                │
  │  • HB aukce → cpexPackage.headerbidding.reRender()             │
  │    → formats.match() → Slideup/Vignette/Skin                  │
  │  • S2S odpověď → cpexPackage.render()                          │
  │    → formats.match() → Slideup/Branding/Interscroller          │
  │                                                                │
  │ CPEX potvrdil testovací kampaní (parametry cpexhb, cpxdebug,   │
  │ stagePackage, sas-debugssp-test=1): S2S simuluje formáty       │
  │ branding, interscroller, mobile slide up, 480×480.             │
  │                                                                │
  │ Důsledek: RELOAD_CAPPING musí pokrývat OBOJE — HB i S2S.      │
  │ Obě cesty jsou již ošetřeny:                                   │
  │  • CPEX cesta: cpexSlideupClosed → reloadSetCapping(adUnit)   │
  │  • Fallback cesta: creative_popup close → reloadSetCapping     │
  │                                                                │
  │ Speciální případ — Vignette:                                   │
  │ Vignette je interstitial formát, který se zobrazuje POUZE      │
  │ při kliknutí uživatele na odkaz nebo po delší neaktivitě.      │
  │ NENÍ navázán na žádnou reklamní pozici v RELOAD_POSITIONS       │
  │ a NENÍ součástí reload cyklu. Proto jeho tlačítko „Zavřít"     │
  │ NEMUSÍ volat reloadSetCapping() a NEMUSÍ být v RELOAD_CAPPING. │
  │ Event cpex:vignette:close můžeme bezpečně ignorovat.           │
  │                                                                │
  │ Autorefresh v cpexPackage:                                     │
  │ cpexPackage má vlastní autorefresh mechanismus (settings.       │
  │ autorefresh.enabled), ale na echo24 je DEFAULTNĚ VYPNUTÝ       │
  │ (cpexPackageConfig neobsahuje autorefresh → default false).    │
  │ Slideup.close() tedy NESPOUŠTÍ vlastní refresh — pouze         │
  │ dispatchuje cpexSlideupClosed event, který my zpracováváme.    │
  └──────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────┐
  │ JAK FUNGUJE RELOADING (pro kontext)                            │
  │                                                                │
  │ 1. Po prvním renderování reklam se spustí periodický cyklus    │
  │    s intervalem RELOAD_INTERVAL_MS (default 30s).              │
  │                                                                │
  │ 2. V každém cyklu reload manager projde RELOAD_POSITIONS       │
  │    a pro každou pozici zkontroluje:                            │
  │    a) Je pozice viditelná? (IntersectionObserver, 25% plochy)  │
  │       → NE: přeskočit (throttling — neplýtvat impressions)    │
  │    b) Existuje DOM element? (.sas_mone s daným data-*-area)   │
  │       → NE: přeskočit (stránka nemá tuto pozici)              │
  │    c) Má pozice limit 0? (wallpaper, privilegované)           │
  │       → ANO: přeskočit (nikdy nereloadovat)                   │
  │    d) Dosáhla pozice svého limitu? (positionCounts >= limit)  │
  │       → ANO: přeskočit                                        │
  │    e) Je pozice v cappingu? (uživatel ji zavřel)              │
  │       → Dle RELOAD_CAPPING: 0 = navždy stop, >0 = čekat      │
  │       → Efektivní přeskočení cyklů:                           │
  │         Math.ceil(RELOAD_CAPPING[x] / (RELOAD_INTERVAL_MS     │
  │         / 1000)) cyklů od interakce                           │
  │                                                                │
  │ 3. Viditelné pozice se předají CPEX refresh:                  │
  │    cpexPackage.headerbidding.refresh(refreshUnits)             │
  │    kde refreshUnits = [                                        │
  │      { adUnit: 'mobilerectangle-1', elementId: 'sas_12345' }, │
  │      { adUnit: 'leaderboard-1', elementId: 'sas_67890' },    │
  │      ...                                                      │
  │    ]                                                           │
  │    Pokud CPEX není dostupný → fallback na SAS loadmone.       │
  │                                                                │
  │ 4. Uživatelská interakce (zavření Mobilního brandingu,        │
  │    Stripu ap.):                                                │
  │    - CPEX vyvolá event cpexSlideupClosed                      │
  │    - Reload manager nastaví capping pro danou pozici           │
  │    - Pozice se znovu zobrazí až po uplynutí RELOAD_CAPPING[x] │
  │      sekund (nebo nikdy, pokud = 0)                            │
  │                                                                │
  │ 5. Změna rozlišení / orientace zařízení:                      │
  │    - IntersectionObserver automaticky přepočítá viditelnost   │
  │    - Pozice, které zmizí z viewportu se přestanou reloadovat  │
  │    - Pozice, které se nově objeví se začnou reloadovat        │
  │                                                                │
  │ 6. Neaktivní tab:                                              │
  │    - Cyklus se pozastaví (document.hidden) a obnoví se        │
  │      po návratu na tab.                                        │
  │                                                                │
  │ TODO pro CPEX (instrukce pro cpexPackage):                    │
  │    - cpexPackage by měl po zavření slideup/strip formátu      │
  │      dispatchovat event s identifikací pozice (adUnit),       │
  │      aby reload manager věděl KTEROU pozici cappovat.         │
  │    - Aktuálně cpexSlideupClosed nese detail: this (Slideup    │
  │      instance s this.adUnit), což využíváme.                  │
  └──────────────────────────────────────────────────────────────────┘
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU reload_config (POUZE PROMĚNNÉ) ---

/**
 * [POVINNÉ] Interval mezi reload cykly v milisekundách.
 * NESMÍ být menší než 20000 (20 sekund) — při nižší hodnotě bude
 * automaticky přepsán na 20000 (ochrana proti příliš agresivnímu reloadingu).
 */
var RELOAD_INTERVAL_MS = 30000;
if (RELOAD_INTERVAL_MS < 20000) { RELOAD_INTERVAL_MS = 20000; }

/**
 * [POVINNÉ] Mapa adUnit → max počet reloadů dané pozice.
 * 0 = pozice se NIKDY nereloaduje (wallpaper, privilegované pozice).
 * >0 = maximální počet reloadů dané pozice.
 * Prázdná mapa {} = reloading na webu VYPNUT — automaticky se doplní
 * výchozí 'mobilerectangle-1': 0, aby cyklus okamžitě skončil.
 */
var RELOAD_POSITIONS = {
    'leaderboard-1':      0,
    'halfpagead-1':       0,
    'halfpagead-2':       0,
    'halfpagead-3':       0,
    'wallpaper-1':        0,
    'wallpaper-2':        0,
    'wallpaper-3':        0,
    'wallpaper-4':        0,
    'boardbottom-1':      0,
    'mobilerectangle-1':  0,
    'mobilerectangle-2':  0,
    'mobilerectangle-3':  0,
    'mobilerectangle-4':  0,
};
if (Object.keys(RELOAD_POSITIONS).length === 0) {
    RELOAD_POSITIONS['mobilerectangle-1'] = 0;
}

/**
 * RELOAD_CAPPING — cooldown (v sekundách) po interakci uživatele s reklamou.
 *
 * POVINNÉ: Všechny pozice, které mohou obsahovat formát s tlačítkem "Zavřít"
 * (Mobilní branding = slideup, Strip = desktop_strip, popup),
 * zde MUSÍ být definovány. Tím je zaručeno, že CPEX refresh na ně
 * nebude volán během cooldown periody.
 *
 * Hodnoty:
 *   0  = po zavření se pozice na této stránce UŽ NIKDY nereloaduje
 *  >0  = po zavření se pozice nereloaduje N sekund (pak opět normálně dle cyklu)
 *
 * Efektivní počet přeskočených cyklů = Math.ceil(hodnota / (RELOAD_INTERVAL_MS / 1000)).
 * Příklad: RELOAD_CAPPING['mobilerectangle-1'] = 60, RELOAD_INTERVAL_MS = 30000
 *          → ceil(60 / 30) = 2 cykly budou přeskočeny po interakci.
 *
 * Pozice NEUVEDENÉ v této mapě nemají interaktivní formát → capping se neaplikuje.
 *
 * DŮLEŽITÉ: Reloading je řízen VÝHRADNĚ jedním intervalem (RELOAD_INTERVAL_MS).
 * Žádný jiný timeout ani kód nesmí volat cpexPackage.headerbidding.refresh().
 */
const RELOAD_CAPPING = {
    'mobilerectangle-1':  60,
    'boardbottom-1':       0,
};

/**
 * [VOLITELNÉ] RENDERING_AND_RELOADING_ALWAYS — pozice, které se VŽDY renderují
 * okamžitě a obchází IO kontrolu viditelnosti při reloadingu.
 *
 * Typicky branding / wallpaper formáty — kreativa je position: fixed pod obsahem,
 * viditelná po stranách (a v horní části), ale .sas_mone element může být
 * po renderování zmenšen na 0×0 nebo přesunut, takže IntersectionObserver
 * ho nedetekuje jako viditelný.
 *
 * EFEKT NA RENDERING (první load):
 * Pozice uvedená zde se NIKDY nelazyloaduje (i když je v LAZYLOAD_POSITIONS).
 * lazyloadExcludeFromLoad() tyto pozice automaticky přeskakuje → SAS je
 * vykreslí okamžitě při prvním loadmone().
 *
 * EFEKT NA RELOADING (další cykly):
 * Tyto pozice se reloadují v KAŽDÉM cyklu bez ohledu na IO viditelnost
 * (pokud splní ostatní podmínky: limit, capping, DOM existence).
 *
 * Prázdný Set = všechny pozice podléhají IO kontrole a lazyloadu.
 */
const RENDERING_AND_RELOADING_ALWAYS = new Set([
    'leaderboard-1',
    'wallpaper-1',
]);

/**
 * [VOLITELNÉ] RELOAD_BEFORE_FNS — registr kontrolních funkcí pro reload cyklus.
 * Každá funkce v tomto poli se spustí PŘED každým reloadem.
 * Přidávejte z libovolného bloku: RELOAD_BEFORE_FNS.push(mojeFunkce);
 * Prázdné [] = žádné kontrolní funkce.
 *
 * Příklad vložení dvou funkcí:
 *   const RELOAD_BEFORE_FNS = [
 *       function resetStickyBanner() {
 *           var el = document.querySelector('.sticky-banner');
 *           if (el) el.style.display = 'none';
 *       },
 *       function logReloadEvent() {
 *           console.log('Reload cyklus spuštěn:', new Date().toISOString());
 *       }
 *   ];
 */
const RELOAD_BEFORE_FNS = [];

/**
 * [VOLITELNÉ] RELOAD_PRIVILEGED_DETECTORS — detektory obsahu s vlastním reloadem.
 * Mapa adUnit → detekční funkce(el). Funkce dostane .sas_mone element
 * a vrací string (název zdroje) pokud pozice obsahuje privilegovaný obsah
 * (= obsah, který má VLASTNÍ autorefresh a nesmí být přepsán naším reloadem),
 * nebo falsy pokud ne.
 *
 * Pokud detektor vrátí string:
 *   - Pozice se TRVALE vyloučí z reload cyklu (jako RELOAD_POSITIONS[x] = 0)
 *   - Zaloguje se co bylo detekováno
 *   - Existující wrapper 3rd party zůstane nedotčen
 *
 * Typické zdroje: R2B2 (delivery.r2b2.cz), Performax (PX_out_of_page),
 * nebo jiný 3rd party s vlastním autorefresh mechanismem.
 *
 * Prázdná mapa {} = žádné detektory, vše se reloaduje dle RELOAD_POSITIONS.
 * Detekci R2B2 a Performax řeší blok_privileg_0001 a blok_privileg_0002
 * (MutationObserver) — ty nastaví RELOAD_POSITIONS[area]=0 dříve než tick.
 */
const RELOAD_PRIVILEGED_DETECTORS = {};
// Původní detektory (R2B2, Performax) odstraněny — nahrazeny blok_privileg_0001/0002.

/**
 * [VOLITELNÉ] LAZYLOAD_POSITIONS — odložené vykreslení kreativy.
 *
 * DŮLEŽITÉ — CO SE ODKLÁDÁ A CO NE:
 * ──────────────────────────────────
 * Lazyloading NEODKLÁDÁ HB aukci ani SAS rozhodnutí — ty proběhnou VŽDY
 * okamžitě pro VŠECHNY pozice najednou. Odkládá se POUZE samotné vykreslení
 * kreativy do DOM (= lazy RENDERING, ne lazy AUCTION).
 *
 * Proč: Pozice hluboko pod foldem (např. mobilerectangle-4) — uživatel tam
 * možná nikdy nedoscrolluje. Nemá smysl renderovat kreativu, která nebude
 * vidět (plýtvání impressions, horší viewability metriky pro inzerenta).
 *
 * TŘI REŽIMY SPUŠTĚNÍ (mode):
 * ───────────────────────────
 * 'viewport' — IntersectionObserver na .sas_mone elementu dané pozice.
 *   Render se spustí, když je alespoň `threshold` (0–1) plochy POZICE
 *   viditelné ve viewportu prohlížeče.
 *   Příklad: threshold: 0.25 = render když je 25% plochy pozice viditelné.
 *   Typické použití: pozice, která může být částečně viditelná při scrollu
 *   (mobilerectangle-2, halfpagead-1...).
 *
 * 'scroll' — scroll event listener na dokumentu.
 *   Render se spustí, když uživatel odscrolloval alespoň `threshold` (0–1)
 *   z CELKOVÉ výšky stránky (document.documentElement.scrollHeight).
 *   Příklad: threshold: 0.50 = render po odscrollování 50% celé stránky.
 *   Typické použití: pozice hodně hluboko ve stránce, kde nechceme čekat
 *   na IO ale chceme obecnější podmínku (článková stránka s nekonečným
 *   scrollem, galerie).
 *
 * 'pixel' — IntersectionObserver s rozšířeným rootMargin.
 *   Render se spustí, když je POZICE vzdálena maximálně `threshold` PIXELŮ
 *   od vstupu do viewportu (= virtuálně rozšíří viewport o N pixelů dolů).
 *   Příklad: threshold: 300 = render když je pozice 300px pod spodní hranou viewportu.
 *   Typické použití: chceme, aby kreativa byla HOTOVÁ vykreslená ještě DŘÍVE než
 *   k ní uživatel doscrolluje — plynulý zážitek bez probliknutí.
 *   Interně: IntersectionObserver({ rootMargin: '0px 0px 300px 0px', threshold: 0 }).
 *
 * FORMÁT:
 *   'adUnit': { threshold: 0.25, mode: 'viewport' }
 *   'adUnit': { threshold: 0.50, mode: 'scroll' }
 *   'adUnit': { threshold: 300,  mode: 'pixel' }
 *
 * Pozice NEUVEDENÁ v mapě = renderuje se OKAMŽITĚ (současné chování beze změny).
 * Prázdná mapa {} = lazyloading na webu VYPNUT.
 *
 * POZNÁMKA: Lazyload se aplikuje POUZE na PRVNÍ vykreslení pozice.
 * Reload cyklus (RELOAD_POSITIONS) probíhá nezávisle — reloadované pozice
 * jsou již viditelné (ověřeno IntersectionObserverem v reload_manager),
 * takže lazyload se na ně znovu neaplikuje.
 *
 * PŘÍKLADY KONFIGURACE:
 *   var LAZYLOAD_POSITIONS = {
 *       'mobilerectangle-2': { threshold: 0.25, mode: 'viewport' },
 *       'mobilerectangle-3': { threshold: 0.50, mode: 'scroll' },
 *       'halfpagead-1':      { threshold: 0.10, mode: 'viewport' },
 *       'mobilerectangle-4': { threshold: 300,  mode: 'pixel' },
 *   };
 */
var LAZYLOAD_POSITIONS = {
    // Výchozí: prázdná mapa = lazyloading VYPNUT (všechny pozice se renderují okamžitě).
    // Příklady (odkomentovat a upravit dle potřeby):
    //'mobilerectangle-2': { threshold: 0.25, mode: 'viewport' },  // render při 25% viditelnosti pozice
    //'mobilerectangle-3': { threshold: 0.50, mode: 'scroll' },    // render po odscrollování 50% stránky
    //'mobilerectangle-4': { threshold: 300,  mode: 'pixel' },     // render když je pozice 300px od viewportu
    //'wallpaper-2':       { threshold: 0.5, mode: 'scroll' },
    //'wallpaper-3':       { threshold: 300, mode: 'pixel' },
};

/**
 * [VOLITELNÉ] RESPONSIVE_BREAKPOINTS — filtr šířky okna per pozice.
 *
 * Určuje, na jakém zařízení (šířce okna) se daná pozice zpracovává.
 * Aktuálně se používá v lazyload manageru: pozice, která nesplní podmínku,
 * se přeskočí — lazyload se na ni neaplikuje a SAS ji zpracuje normálně.
 *
 * VLASTNOSTI:
 *   minWidth: N  — pozice se zpracovává POUZE když window.innerWidth >= N
 *   maxWidth: N  — pozice se zpracovává POUZE když window.innerWidth <= N
 *   Lze kombinovat: { minWidth: 768, maxWidth: 1200 } = pouze tablety.
 *
 * Pozice NEUVEDENÁ v mapě = žádné omezení šířky (zpracovává se vždy).
 * Pozice uvedená v RESPONSIVE_BREAKPOINTS ale NE v LAZYLOAD_POSITIONS = ignoruje se.
 *
 * PŘÍKLADY:
 *   var RESPONSIVE_BREAKPOINTS = {
 *       'leaderboard-1':     { minWidth: 768 },   // desktop only (>= 768px)
 *       'mobilerectangle-2': { maxWidth: 767 },   // mobile only (<= 767px)
 *       'halfpagead-1':      { minWidth: 768 },   // desktop only
 *   };
 * 
 * NOVINKA:
 * Breakpointy jsou volitelné a nezávislé per pozice — můžete mít jednu pozici přepínající 
 * na 768, jinou na 1000, nebo obojí (tablet range přes { minWidth: 768, maxWidth: 1200 }).
 * 
 */
var RESPONSIVE_BREAKPOINTS = {
    'leaderboard-1':     { minWidth: 768 },   // desktop only
    'halfpagead-1':      { minWidth: 768 },   // desktop only
    'halfpagead-2':      { minWidth: 768 },   // desktop only
    'halfpagead-3':      { minWidth: 768 },   // desktop only
    'wallpaper-1':       { minWidth: 768 },   // desktop only
    'wallpaper-2':       { minWidth: 768 },   // desktop only
    'wallpaper-3':       { minWidth: 768 },   // desktop only
    'wallpaper-4':       { minWidth: 768 },   // desktop only
    'boardbottom-1':     { minWidth: 768 },   // desktop only
    'mobilerectangle-1': { maxWidth: 767 },   // mobile only
    'mobilerectangle-2': { maxWidth: 767 },   // mobile only
    'mobilerectangle-3': { maxWidth: 767 },   // mobile only
    'mobilerectangle-4': { maxWidth: 767 },   // mobile only
};

// --- KONEC BLOKU reload_config ---





/*
---------------------------------------------
Blok: blok_0000b
Název: reload_manager
Cesta: — (nový blok, vytvořen při integraci CPEX)
Řádky: —
Použití v buildu: ANO (obecný reload cyklus reklamních pozic)
Závislosti: ANO (blok_0000 reload_config, sas, pbjs, cpexPackage, DOM API, IntersectionObserver)
Komentář agenta:
Obecný reload manager dle flowchartu:
1. Po prvním renderování reklam spustí periodický cyklus (RELOAD_INTERVAL_MS).
2. Sleduje viditelnost pozic pomocí IntersectionObserver — pozice se přidá
   do setu „seenSinceLastTick" při vstupu do viewportu a ZŮSTÁVÁ v něm
   až do dalšího ticku (i když uživatel odscrolluje pryč).
3. Přeskakuje privilegované pozice (RELOAD_POSITIONS === 0).
4. Aplikuje capping (RELOAD_CAPPING) — po interakci uživatele (zavření)
   pozastaví reload dané pozice na N sekund nebo navždy (hodnota 0).
5. Detekuje privilegovaný obsah (RELOAD_PRIVILEGED_DETECTORS) — obsah
   s vlastním autorefreshem (R2B2, Performax) se trvale vyloučí z reloadingu.
6. Před reloadem spouští RELOAD_BEFORE_FNS (registrované kontrolní funkce).
7. Volá CPEX headerbidding.refresh(adUnitCodes) nebo SAS sas.loadmone().
8. Po ticku set seenSinceLastTick vyprázdní — nový cyklus sbírá od nuly.
9. Respektuje tab visibility (document.hidden) — pozastaví cyklus.

Funkce exportované pro jiné bloky:
- getEffectiveReloadLimit(positionId) — vrací efektivní limit reloadů
- reloadSetCapping(area) — nastaví capping po interakci uživatele
- startReloadCycle() / stopReloadCycle() — řízení cyklu
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU reload_manager ---

/**
 * Vrátí maximální počet reloadů pro danou pozici.
 * 0 = pozice vyloučena z reloadingu.
 */
function getEffectiveReloadLimit(positionId) {
    var perPosition = RELOAD_POSITIONS[positionId];
    if (perPosition === undefined || perPosition === 0) return 0;
    return perPosition;
}

/**
 * Stav reload manageru — počítadla per pozice, viditelnost, globální čítač
 * a capping po interakci uživatele.
 */
const reloadState = {
    globalCount: 0,
    positionCounts: {},
    /** Pozice viděné od posledního ticku — IO přidává, tick vyprázdní po použití */
    seenSinceLastTick: new Set(),
    timerId: null,
    active: false,
    /** Timestamp (Date.now()) kdy byl capping aktivován per pozice — pro interakci */
    cappedAt: {},
    /** Pozice, kde celý passback chain skončil prázdnem (no-fill).
     *  Tyto pozice obchází IO kontrolu viditelnosti v reload cyklu —
     *  reloadují se preventivně, aby měly šanci dostat kreativu dříve,
     *  než k nim uživatel scrolluje a uvidí prázdné místo.
     *  Po úspěšném reloadu se pozice z tohoto setu odebere. */
    emptyPositions: new Set(),
};

/** Prefix pro průběžné logování důvodů změn v reload cyklu */
var _RELOAD_CHECK_PREFIX = '[check emptyPositions, capping, lazyloading, ap. >> RELOADING - pozice budoucího cyklus]';

/** Loguje důvody vyřazení/zařazení do reload cyklu (only on change) */
function _reloadCheckLog(suffix, arr) {
    var key = _RELOAD_CHECK_PREFIX + suffix;
    if (arr.length) { logSetChange(key, arr); }
    else { delete _lastLoggedSets[key]; }
}

/**
 * Nastaví capping pro danou pozici po interakci uživatele (zavření reklamy).
 * Volat z jiných bloků: reloadSetCapping('mobilerectangle-1');
 * Chování závisí na hodnotě v RELOAD_CAPPING:
 *   0  → pozice se na této stránce UŽ NIKDY nereloaduje
 *  >0  → pozice se nereloaduje po dobu N sekund
 * Pozice neuvedená v RELOAD_CAPPING → capping se neaplikuje.
 */
function reloadSetCapping(area) {
    if (!(area in RELOAD_CAPPING)) return;
    reloadState.cappedAt[area] = Date.now();
    logSetChange(_RELOAD_CHECK_PREFIX + '[capping nastaven]', Object.keys(reloadState.cappedAt));
}

/**
 * Zkontroluje, zda je pozice právě v cappingu.
 * Vrací true = pozice je zablokovaná, přeskočit.
 */
function reloadIsCapped(area) {
    if (!(area in RELOAD_CAPPING)) return false;
    var cappedAt = reloadState.cappedAt[area];
    if (!cappedAt) return false;
    var cooldownSec = RELOAD_CAPPING[area];
    if (cooldownSec === 0) return true; // navždy zablokovaná
    var elapsedMs = Date.now() - cappedAt;
    return elapsedMs < (cooldownSec * 1000);
}

/**
 * IntersectionObserver — sleduje viditelnost reklamních pozic.
 * Při vstupu do viewportu přidá pozici do seenSinceLastTick.
 * Při odchodu z viewportu NEODEBÍRÁ — pozice zůstává v setu
 * až do dalšího ticku, kdy se set vyprázdní.
 */
const reloadObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        const area = entry.target.getAttribute('data-m-area') || entry.target.getAttribute('data-d-area');
        if (!area) return;
        if (entry.isIntersecting) {
            var wasNew = !reloadState.seenSinceLastTick.has(area);
            reloadState.seenSinceLastTick.add(area);
            if (wasNew) {
                logSetChange('[RELOADING - viditelné pozice]', Array.from(reloadState.seenSinceLastTick));
            }
        }
    });
}, { threshold: 0 });

/**
 * Zaregistruje všechny .sas_mone elementy do IntersectionObserveru.
 * Volat po prvním renderování reklam.
 */
function reloadObserveAllPositions() {
    document.querySelectorAll('.sas_mone').forEach(function(el) {
        reloadObserver.observe(el);
    });
}

/**
 * Set pozic, které byly reálně vykresleny SASem (detekce přes MutationObserver).
 * Zahrnuje VŠECHNY pozice — jak naše lazyload, tak SAS built-in lazy.
 */
var _renderedPositions = {};

/**
 * Nasadí MutationObserver na všechny .sas_mone elementy.
 * Detekuje moment, kdy SAS vloží obsah (iframe, div) do pozice = reálné vykreslení.
 * Volat po sas.loadmone() v call_sas_adserver.
 */
function observeRealRenders() {
    document.querySelectorAll('.sas_mone').forEach(function(el) {
        var area = el.getAttribute('data-d-area') || el.getAttribute('data-m-area') || el.getAttribute('data-lazyload-area');
        if (!area || _renderedPositions[area]) return;

        var mo = new MutationObserver(function(mutations) {
            // Kontrola: byl přidán reálný obsah? (iframe, div s reklamou)
            var hasContent = false;
            for (var i = 0; i < mutations.length; i++) {
                for (var j = 0; j < mutations[i].addedNodes.length; j++) {
                    var node = mutations[i].addedNodes[j];
                    if (node.nodeType === 1) { hasContent = true; break; }
                }
                if (hasContent) break;
            }
            if (!hasContent) return;

            _renderedPositions[area] = true;
            mo.disconnect();
            logSetChange('[LAZY rendering - právě vykreslená pozice]', Object.keys(_renderedPositions));
        });

        mo.observe(el, { childList: true, subtree: false });
    });
}

/**
 * Spustí jeden reload cyklus — projde pozice, ověří limity, viditelnost,
 * capping, spustí before-fns, zavolá CPEX refresh nebo SAS reload.
 */
function reloadCycleTick() {
    if (document.hidden) { return; }

    // Spustit registrované kontrolní funkce před reloadem
    RELOAD_BEFORE_FNS.forEach(function(fn) {
        try { fn(); } catch (e) { /* reload before-fn error */ }
    });

    // Sesbírat pozice k reloadu + trackovat důvody vyřazení/zařazení
    var now = Date.now();
    var positionsToReload = [];
    var _skipLimit = [], _skipVisibility = [], _skipCapping = [], _skipNoDOM = [];
    var _inclAlwaysVisible = [], _inclEmptyPos = [], _inclVisible = [];
    for (var area in RELOAD_POSITIONS) {
        var limit = getEffectiveReloadLimit(area);
        if (limit === 0) continue; // privilegovaná pozice — přeskočit

        var count = reloadState.positionCounts[area] || 0;
        if (count >= limit) { _skipLimit.push(area); continue; }

        if (!RENDERING_AND_RELOADING_ALWAYS.has(area) && !reloadState.seenSinceLastTick.has(area) && !reloadState.emptyPositions.has(area)) { _skipVisibility.push(area); continue; }

        if (reloadIsCapped(area)) { _skipCapping.push(area); continue; }

        // Ověřit, že DOM element existuje
        var el = document.querySelector('.sas_mone[data-m-area="' + area + '"], .sas_mone[data-d-area="' + area + '"]');
        if (!el) { _skipNoDOM.push(area); continue; }

        // Privilegovaný obsah — 3rd party s vlastním reloadem (R2B2, Performax...)
        if (RELOAD_PRIVILEGED_DETECTORS[area]) {
            try {
                var privilegedSource = RELOAD_PRIVILEGED_DETECTORS[area](el);
                if (privilegedSource) {
                    RELOAD_POSITIONS[area] = 0; // trvale vyloučit
                    continue;
                }
            } catch (e) { /* detector error — pokračovat normálně */ }
        }

        // Důvod zařazení do reload cyklu
        if (RENDERING_AND_RELOADING_ALWAYS.has(area)) { _inclAlwaysVisible.push(area); }
        else if (reloadState.emptyPositions.has(area)) { _inclEmptyPos.push(area); }
        else { _inclVisible.push(area); }

        positionsToReload.push({ area: area, elementId: el.id });
        reloadState.positionCounts[area] = count + 1;
    }

    // Log důvodů vyřazení/zařazení — pouze při změně oproti minulému ticku
    _reloadCheckLog('[skip: dosažen limit]', _skipLimit);
    _reloadCheckLog('[skip: neviditelná]', _skipVisibility);
    _reloadCheckLog('[skip: capping]', _skipCapping);
    _reloadCheckLog('[skip: chybí DOM]', _skipNoDOM);
    _reloadCheckLog('[zařazeno: ALWAYS_VISIBLE]', _inclAlwaysVisible);
    _reloadCheckLog('[zařazeno: emptyPositions]', _inclEmptyPos);
    _reloadCheckLog('[zařazeno: viditelná (IO)]', _inclVisible);

    // Vyprázdnit set — nový cyklus sbírá od nuly
    reloadState.seenSinceLastTick.clear();
    delete _lastLoggedSets['[RELOADING - viditelné pozice]'];

    var _tickAreas = positionsToReload.map(function(p) { return p.area; });
    logSetChange('[RELOADING - pozice budoucího cyklus]', _tickAreas);


    if (positionsToReload.length === 0) {
        // Ověřit, zda existuje JAKÁKOLI pozice, která ještě může být reloadována
        var anyRemaining = false;
        for (var checkArea in RELOAD_POSITIONS) {
            var checkLimit = getEffectiveReloadLimit(checkArea);
            if (checkLimit === 0) continue;
            var checkCount = reloadState.positionCounts[checkArea] || 0;
            if (checkCount < checkLimit && !reloadIsCapped(checkArea)) { anyRemaining = true; break; }
        }
        if (!anyRemaining) {

            stopReloadCycle();
        }
        return;
    }

    reloadState.globalCount++;

    // Vymazat stará HB data před reloadem
    if (typeof pbjs !== 'undefined' && pbjs.winningBidsSas) {
        pbjs.winningBidsSas = {};
    }

    // CPEX HB reload (pokud je aktivní)
    // Dle flowchartu: A1 (HB auction) → A2 (Send HB result to SAS) → A3 (SAS decision)
    // refresh() spustí HB aukci, ale NEVOLÁ adserver — musíme SAS zavolat sami.
    if (typeof window.cpexHbRender !== 'undefined' && typeof window.cpexPackage !== 'undefined' && window.cpexPackage.headerbidding) {
        var refreshCodes = positionsToReload.map(function(p) {
            return p.area;
        });
        console.log('[RELOADING - odesláno do CPEXu]', refreshCodes.join(', '));

        var refreshPromise;
        try {
            refreshPromise = window.cpexPackage.headerbidding.refresh(refreshCodes);
        } catch (e) {

            refreshPromise = Promise.resolve(null);
        }
        // Po HB aukci (i bez bidů) → aktualizovat winningBidsSas → zavolat SAS
        refreshPromise.then(function() {
            // Přenést nové HB bidy do pbjs.winningBidsSas (pro render callbacky)
            if (typeof pbjs !== 'undefined' && typeof pbjs.getHighestCpmBids === 'function') {
                refreshCodes.forEach(function(area) {
                    try {
                        var bidResponse = pbjs.getHighestCpmBids(area)[0];
                        if (bidResponse) {
                            pbjs.winningBidsSas[area] = {
                                bid: bidResponse.cpm.toFixed(2),
                                bidTier: bidResponse.adserverTargeting.hb_pb,
                                video: void 0 !== bidResponse.vastUrl,
                                bidderCode: (window.cpexPackage.settings.adserver.bidderTable || {})[bidResponse.bidderCode] || "",
                                bidDealId: bidResponse.dealId || "",
                                height: bidResponse.height || 0,
                                width: bidResponse.width || 0,
                                bidderPrice: bidResponse.cpm.toFixed(2)
                            };
                        }
                    } catch (e) { /* bid mapping error */ }
                });
            }

            reloadViaSas(positionsToReload);
        }).catch(function(e) {

            reloadViaSas(positionsToReload);
        });
    } else {
        // Přímý SAS reload
        reloadViaSas(positionsToReload);
    }
}

/**
 * SAS fallback reload — zavolá sas.loadmone s reload: true.
 */
function reloadViaSas(positions) {
    if (typeof sas === 'undefined' || typeof sas.loadmone !== 'function') return;
    var mones = positions.map(function(p) {
        return { id: p.elementId, area: p.area };
    });
    sas.loadmone({ mones: mones, reload: 'true' });

    // Reloadované pozice odebrat z emptyPositions — dostávají novou šanci.
    // Pokud reload opět skončí no-fill, infoCallback je znovu přidá.
    var _emptyBefore = reloadState.emptyPositions.size;
    positions.forEach(function(p) { reloadState.emptyPositions.delete(p.area); });
    if (reloadState.emptyPositions.size !== _emptyBefore) {
        logSetChange(_RELOAD_CHECK_PREFIX + '[emptyPositions po reloadu]', Array.from(reloadState.emptyPositions));
    }

    // Reset IO PO SAS renderování — sas.loadmone může nahradit .sas_mone elementy
    // v DOM novými, čímž se ztratí reference ze starého observe(). Krátký delay
    // dá SAS čas na dokončení synchronní části DOM manipulace.
    setTimeout(function() {
        reloadObserver.disconnect();
        reloadObserveAllPositions();
        // Znovu nasadit render detekci pro reloadované pozice
        positions.forEach(function(p) { delete _renderedPositions[p.area]; });
        observeRealRenders();
    }, 500);
}

/**
 * Spustí reload cyklus. Volat po prvním call_adserver.
 */
function startReloadCycle() {
    if (reloadState.active) { return; }
    reloadState.active = true;

    // Počkat chvíli po prvním renderování než začneme sledovat
    setTimeout(function() {
        reloadObserveAllPositions();

        reloadState.timerId = setInterval(function() {
            reloadCycleTick();
        }, RELOAD_INTERVAL_MS);

        // Pozastavit/obnovit na neaktivním tabu
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                if (reloadState.timerId) {
                    clearInterval(reloadState.timerId);
                    reloadState.timerId = null;
                }
            } else {
                if (!reloadState.timerId && reloadState.active) {
                    reloadState.timerId = setInterval(function() {
                        reloadCycleTick();
                    }, RELOAD_INTERVAL_MS);
                }
            }
        });
    }, RELOAD_INTERVAL_MS); // první reload až po uplynutí intervalu
}

/**
 * Zastaví reload cyklus (po dosažení globálního limitu).
 */
function stopReloadCycle() {
    reloadState.active = false;
    if (reloadState.timerId) {
        clearInterval(reloadState.timerId);
        reloadState.timerId = null;
    }
}

// --- KONEC BLOKU reload_manager ---

/*
---------------------------------------------
Blok: blok_0000c
Název: lazyload_manager
Cesta: — (nový blok, vytvořen při implementaci lazyloadingu)
Řádky: —
Použití v buildu: ANO (obecný lazyload manager pro odložené vykreslení pozic)
Závislosti: ANO (blok_0000 reload_config — LAZYLOAD_POSITIONS, blok_0000b — reloadObserver,
            DOM API, IntersectionObserver, cpexPackage, sas, pbjs)
Komentář agenta:
Lazyload manager odloží CELÝ ad request (HB aukci + SAS load) pro pozice
uvedené v LAZYLOAD_POSITIONS. Pozice se vyloučí z počátečního sas.loadmone()
a teprve po splnění podmínky (viewport / scroll / pixel) se pro ně spustí
CPEX HB refresh + SAS load.

Důvody:
- Žádné zbytečné impressions pro neviděné pozice (úspora pro inzerenta)
- Čerstvé HB bidy v okamžiku vykreslení (ne expirované z počáteční aukce)
- Lepší viewability metriky (vykreslená = viděná)
- Plná kompatibilita s reload cyklem (po prvním vykreslení se pozice
  zaregistruje do reload observeru a reloaduje normálně)

Integrace:
- lazyloadExcludeFromLoad() — volat PŘED sas.loadmone() v call_sas_adserver
- lazyloadInit()             — volat PO sas.loadmone() v call_sas_adserver
- lazyloadIsPending(area)    — dotaz zda pozice čeká na lazy render

Mechanismus:
1. lazyloadExcludeFromLoad() odstraní data-d-area / data-m-area atributy
   z .sas_mone elementů lazyload pozic → SAS je při loadmone nenajde.
2. lazyloadInit() nastaví IO observer (viewport/pixel) nebo scroll listener
   (scroll) pro každou vyloučenou pozici.
3. Po splnění podmínky lazyloadTriggerRender():
   a) Obnoví data-area atribut
   b) Spustí CPEX HB refresh → pbjs bid mapping → sas.loadmone (1 pozice)
   c) Zaregistruje pozici do reload observeru (pro budoucí reload cykly)
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU lazyload_manager ---

/**
 * Pomocná funkce pro logování množin DIV IDs s daným prefixem.
 * Loguje pouze pokud se obsah změnil oproti poslednímu volání se stejným klíčem.
 */
var _lastLoggedSets = {};
function logSetChange(prefix, currentSet) {
    var key = JSON.stringify(currentSet.sort());
    if (_lastLoggedSets[prefix] === key) return;
    _lastLoggedSets[prefix] = key;
    console.log(prefix, currentSet.length === 0 ? '(prázdná množina)' : currentSet.join(', '));
}

/**
 * Stav lazyload manageru.
 */
var lazyloadState = {
    /** Čekající pozice: area → { elementId, el, attrName, attrValue } */
    pending: {},
    /** IntersectionObserver instance per area (pro viewport a pixel režim) */
    observers: {},
    /** Oblasti čekající na scroll podmínku */
    scrollAreas: [],
    /** Je scroll listener aktivní? */
    scrollBound: false,
    /** Již vykreslené pozice: area → true */
    rendered: {}
};

/**
 * Vyloučí lazyload pozice z počátečního sas.loadmone().
 * Volat PŘED sas.loadmone() v call_sas_adserver.
 *
 * Mechanismus: dočasně odstraní data-d-area / data-m-area atributy
 * z .sas_mone elementů. SAS je při loadmone nenajde a nepošle pro ně request.
 *
 * Filtruje dle šířky okna: pokud je pozice uvedena v RESPONSIVE_BREAKPOINTS,
 * ověří minWidth / maxWidth oproti window.innerWidth. Pozice, která nesplní
 * podmínku, se přeskočí (SAS ji zpracuje normálně).
 */
function lazyloadExcludeFromLoad() {
    if (Object.keys(LAZYLOAD_POSITIONS).length === 0) return;

    var w = window.innerWidth;

    for (var area in LAZYLOAD_POSITIONS) {
        // Pozice v RENDERING_AND_RELOADING_ALWAYS se NIKDY nelazyloadují —
        // renderují se okamžitě a reloadují v každém cyklu bez IO kontroly.
        if (RENDERING_AND_RELOADING_ALWAYS.has(area)) {
            continue;
        }

        // Kontrola breakpointu — pozice mimo aktuální šířku se přeskočí
        var bp = RESPONSIVE_BREAKPOINTS[area];
        if (bp) {
            if (bp.minWidth !== undefined && w < bp.minWidth) {
                continue;
            }
            if (bp.maxWidth !== undefined && w > bp.maxWidth) {
                continue;
            }
        }

        var el = document.querySelector('.sas_mone[data-d-area="' + area + '"], .sas_mone[data-m-area="' + area + '"]');
        if (!el) {
            continue;
        }

        var attrName = el.hasAttribute('data-m-area') ? 'data-m-area' : 'data-d-area';
        var attrValue = el.getAttribute(attrName);

        // Uložit původní atribut a dočasně odebrat
        el.setAttribute('data-lazyload-area', attrValue);
        el.setAttribute('data-lazyload-attr', attrName);
        el.removeAttribute(attrName);

        lazyloadState.pending[area] = {
            elementId: el.id,
            el: el,
            attrName: attrName,
            attrValue: attrValue
        };

    }

    logSetChange('[LAZY rendering - čekající pozice]', Object.keys(lazyloadState.pending));
}

/**
 * Inicializuje observery a listenery pro lazyload pozice.
 * Volat PO sas.loadmone() v call_sas_adserver.
 */
function lazyloadInit() {
    if (Object.keys(lazyloadState.pending).length === 0) return;

    for (var area in lazyloadState.pending) {
        var config = LAZYLOAD_POSITIONS[area];
        if (!config) continue;

        var pending = lazyloadState.pending[area];

        if (config.mode === 'viewport') {
            // IO s threshold = poměr viditelné plochy pozice
            lazyloadSetupIO(area, pending.el, config.threshold, '0px');

        } else if (config.mode === 'pixel') {
            // IO s rootMargin = rozšířený viewport o N pixelů dolů
            lazyloadSetupIO(area, pending.el, 0, '0px 0px ' + Math.round(config.threshold) + 'px 0px');

        } else if (config.mode === 'scroll') {
            lazyloadState.scrollAreas.push(area);
        }
    }

    // Scroll listener pro 'scroll' režim
    if (lazyloadState.scrollAreas.length > 0 && !lazyloadState.scrollBound) {
        lazyloadState.scrollBound = true;
        window.addEventListener('scroll', lazyloadOnScroll, { passive: true });
        // Okamžitá kontrola — uživatel mohl odscrollovat než se reklamy načetly
        lazyloadOnScroll();
    }

}

/**
 * Vytvoří IntersectionObserver pro jednu lazyload pozici.
 */
function lazyloadSetupIO(area, el, threshold, rootMargin) {
    var obs = new IntersectionObserver(
        (function(a) {
            return function(entries) {
                for (var i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting && !lazyloadState.rendered[a]) {
                        lazyloadTriggerRender(a);
                    }
                }
            };
        })(area),
        { threshold: threshold, rootMargin: rootMargin }
    );

    obs.observe(el);
    lazyloadState.observers[area] = obs;
}

/**
 * Scroll handler pro 'scroll' režim.
 * Kontroluje poměr odscrollování vůči maximálnímu scrollu stránky.
 */
function lazyloadOnScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    var maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;

    var scrollRatio = scrollTop / maxScroll;

    var remaining = [];
    for (var i = 0; i < lazyloadState.scrollAreas.length; i++) {
        var area = lazyloadState.scrollAreas[i];
        if (lazyloadState.rendered[area]) continue;

        var config = LAZYLOAD_POSITIONS[area];
        if (scrollRatio >= config.threshold) {
            lazyloadTriggerRender(area);
        } else {
            remaining.push(area);
        }
    }

    lazyloadState.scrollAreas = remaining;

    // Odpojit listener pokud už žádná pozice nečeká na scroll
    if (remaining.length === 0 && lazyloadState.scrollBound) {
        window.removeEventListener('scroll', lazyloadOnScroll);
        lazyloadState.scrollBound = false;
    }
}

/**
 * Spustí vykreslení lazyload pozice.
 * Obnoví data-area atribut, spustí CPEX HB refresh + SAS load.
 */
function lazyloadTriggerRender(area) {
    if (lazyloadState.rendered[area]) return;
    lazyloadState.rendered[area] = true;

    var pending = lazyloadState.pending[area];
    if (!pending) return;

    var el = pending.el;

    // Obnovit data-area atribut (SAS ho potřebuje pro rendermone)
    el.setAttribute(pending.attrName, pending.attrValue);
    el.removeAttribute('data-lazyload-area');
    el.removeAttribute('data-lazyload-attr');

    // Odpojit IO observer (už není potřeba)
    if (lazyloadState.observers[area]) {
        lazyloadState.observers[area].disconnect();
        delete lazyloadState.observers[area];
    }

    // Logovat změnu množin
    var pendingAreas = Object.keys(lazyloadState.pending).filter(function(a) { return !lazyloadState.rendered[a]; });
    logSetChange('[LAZY rendering - čekající pozice]', pendingAreas);

    // CPEX HB refresh + SAS load (stejný mechanismus jako reload cyklus)
    if (typeof window.cpexPackage !== 'undefined'
        && window.cpexPackage.headerbidding
        && typeof window.cpexPackage.headerbidding.refresh === 'function') {

        var refreshPromise;
        try {
            refreshPromise = window.cpexPackage.headerbidding.refresh([area]);
        } catch (e) {
            refreshPromise = Promise.resolve(null);
        }

        refreshPromise.then(function() {
            // Přenést HB bidy do pbjs.winningBidsSas (pro SAS render callbacky)
            // DŮLEŽITÉ: Bid mapping + sas.loadmone musí být v jednom synchronním bloku,
            // aby reload cyklus (který maže pbjs.winningBidsSas = {}) nestihl
            // smazat čerstvě namapovaný bid mezi zápisem a SAS voláním.
            if (typeof pbjs !== 'undefined' && typeof pbjs.getHighestCpmBids === 'function') {
                if (!pbjs.winningBidsSas) { pbjs.winningBidsSas = {}; }
                try {
                    var bidResponse = pbjs.getHighestCpmBids(area)[0];
                    if (bidResponse) {
                        pbjs.winningBidsSas[area] = {
                            bid: bidResponse.cpm.toFixed(2),
                            bidTier: bidResponse.adserverTargeting.hb_pb,
                            video: void 0 !== bidResponse.vastUrl,
                            bidderCode: (window.cpexPackage.settings.adserver.bidderTable || {})[bidResponse.bidderCode] || '',
                            bidDealId: bidResponse.dealId || '',
                            height: bidResponse.height || 0,
                            width: bidResponse.width || 0,
                            bidderPrice: bidResponse.cpm.toFixed(2)
                        };
                    }
                } catch (e) { /* bid mapping error */ }
            }
            // SAS load OKAMŽITĚ po bid mappingu (synchronní sekvence v jednom microtasku)
            lazyloadCallSas(area, pending.elementId);
        }).catch(function(e) {
            lazyloadCallSas(area, pending.elementId);
        });

    } else {
        // Bez CPEX — přímý SAS load
        lazyloadCallSas(area, pending.elementId);
    }
}

/**
 * Zavolá SAS pro jednu lazyload pozici a zaregistruje ji do reload observeru.
 */
function lazyloadCallSas(area, elementId) {
    if (typeof sas !== 'undefined' && typeof sas.loadmone === 'function') {
        sas.loadmone({ mones: [{ id: elementId, area: area }] });
    }

    // Zaregistrovat pozici do reload observeru
    // (unobserve + observe vynutí nový intersection check s obnoveným atributem)
    var el = document.getElementById(elementId);
    if (el) {
        reloadObserver.unobserve(el);
        reloadObserver.observe(el);
    }
}

/**
 * Vrací true pokud pozice je v LAZYLOAD_POSITIONS a ještě nebyla vykreslena.
 * Používá reload_manager pro přeskočení lazyload pozic v reload cyklu.
 */
function lazyloadIsPending(area) {
    return !!(LAZYLOAD_POSITIONS[area] && !lazyloadState.rendered[area]);
}

// --- KONEC BLOKU lazyload_manager ---

/*
---------------------------------------------
Blok: blok_privileg_0001
Název: r2b2_source_detector
Cesta: — (volitelný blok, vkládat dle potřeby per web)
Řádky: —
Použití v buildu: VOLITELNÉ (pouze pokud web má R2B2 zdroj)
Závislosti: ANO (blok_0000 reload_config — RELOAD_POSITIONS)
Komentář agenta:
Detekce R2B2 reklamního zdroje v pozici mobilerectangle-1.

PROBLÉM:
R2B2 (delivery.r2b2.cz) doručuje do pozice mobilerectangle-1 obsah
s VLASTNÍM wrapperem a VLASTNÍM autorefreshem.
Wrapper se vyexportuje MIMO .sas_mone DIV (sticky/fixed overlay)
a běží nezávisle na našem kódu. Pokud náš reload manager přepíše
obsah .sas_mone, starý R2B2 wrapper zůstane na stránce
→ vzniknou DVA překrývající se mobilní brandingy současně.

ŘEŠENÍ:
Blok sleduje pozici mobilerectangle-1 pomocí MutationObserveru
nasazeného IHNED po vytvoření elementu (polling každých 200ms).
Jakmile SAS doručí obsah, blok ho zanalyzuje a zaloguje.
Pokud detekuje R2B2, TRVALE vyloučí pozici z reload cyklu.

DETEKČNÍ VZORY:
- HTML komentář <!-- R2B2|area|id --> (nodeType=8, regex /R2B2/i)
- <script src="*r2b2.cz*">

POUŽITÍ:
Vkládat do skriptu POUZE pokud na daném webu existuje riziko,
že pozice mobilerectangle-1 dostane obsah od R2B2.
Blok je bezpečný i pokud takový obsah nepřijde — prostě nic neudělá.
NA WEBU BEZ R2B2 BLOK NEVKLÁDAT (zbytečný overhead).
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU r2b2_source_detector ---

(function initR2B2Detection() {
    var PRIV_AREA = 'mobilerectangle-1';
    var MAX_POLL = 150;  // 150 × 200ms = 30s max čekání na element
    var pollCount = 0;
    var detected = false;

    /**
     * Zkontroluje obsah elementu na přítomnost R2B2 zdroje.
     * Vrací popis (string) nebo null.
     */
    function scanForR2B2(el) {
        // R2B2: HTML komentář <!-- R2B2|...|... --> (SAS vkládá jako první child)
        for (var i = 0; i < el.childNodes.length; i++) {
            if (el.childNodes[i].nodeType === 8 && /R2B2/i.test(el.childNodes[i].data)) {
                return 'R2B2 (comment: ' + el.childNodes[i].data.trim().substring(0, 60) + ')';
            }
        }
        // R2B2: script src obsahující r2b2.cz
        var r2b2Script = el.querySelector('script[src*="r2b2.cz"]');
        if (r2b2Script) {
            return 'R2B2 (script: ' + r2b2Script.src + ')';
        }
        return null;
    }

    /**
     * Zaloguje přidaný uzel (pro interní detekci, bez výpisu do konzole).
     */
    function logAddedNode(node) {
        // interní — výpisy odstraněny
    }

    /**
     * Polling: čeká na vytvoření .sas_mone elementu, pak nasadí observer.
     */
    function tryAttach() {
        var el = document.querySelector('.sas_mone[data-m-area="' + PRIV_AREA + '"]');
        if (!el) {
            pollCount++;
            if (pollCount < MAX_POLL) {
                setTimeout(tryAttach, 200);
            }
            return;
        }

        // 1. Okamžitý scan existujícího obsahu
        var existing = scanForR2B2(el);
        if (existing) {
            RELOAD_POSITIONS[PRIV_AREA] = 0;
            detected = true;
            return;
        }

        // 2. MutationObserver — zachytí obsah když SAS odpověď dorazí
        var observer = new MutationObserver(function(mutations) {
            if (detected) return;
            mutations.forEach(function(mut) {
                mut.addedNodes.forEach(logAddedNode);
            });
            var source = scanForR2B2(el);
            if (source) {
                RELOAD_POSITIONS[PRIV_AREA] = 0;
                detected = true;
                observer.disconnect();
            }
        });
        observer.observe(el, { childList: true, subtree: true });
    }

    tryAttach();
})();

// --- KONEC BLOKU r2b2_source_detector ---

/*
---------------------------------------------
Blok: blok_privileg_0002
Název: performax_source_detector
Cesta: — (volitelný blok, vkládat dle potřeby per web)
Řádky: —
Použití v buildu: VOLITELNÉ (pouze pokud web má Performax zdroj)
Závislosti: ANO (blok_0000 reload_config — RELOAD_POSITIONS)
Komentář agenta:
Detekce Performax reklamního zdroje v pozici mobilerectangle-1.

PROBLÉM:
Performax (cdn.performax.cz) doručuje do pozice mobilerectangle-1
obsah s VLASTNÍM wrapperem a VLASTNÍM autorefreshem.
Wrapper se vyexportuje MIMO .sas_mone DIV (sticky/fixed overlay,
element #PX_out_of_page) a běží nezávisle na našem kódu.
Pokud náš reload manager přepíše obsah .sas_mone, starý Performax
wrapper zůstane na stránce → DVA překrývající se brandingy současně.

ŘEŠENÍ:
Blok sleduje pozici mobilerectangle-1 pomocí MutationObserveru
nasazeného IHNED po vytvoření elementu (polling každých 200ms).
Jakmile SAS doručí obsah, blok ho zanalyzuje a zaloguje.
Pokud detekuje Performax, TRVALE vyloučí pozici z reload cyklu.

DETEKČNÍ VZORY (ze zachyceného logu www.echo24.cz-1774653551695):
- HTML komentář <!-- pfx / ... --> (nodeType=8, regex /^\s*pfx\s/i)
- <script src="*performax.cz*"> (cdn.performax.cz/yi/adsbypx/...)
- <span id="ps-script"> (Performax wrapper span)
- <div id="PX_out_of_page"> kdekoli v dokumentu (exportovaný wrapper)

POUŽITÍ:
Vkládat do skriptu POUZE pokud na daném webu existuje riziko,
že pozice mobilerectangle-1 dostane obsah od Performax.
Blok je bezpečný i pokud takový obsah nepřijde — prostě nic neudělá.
NA WEBU BEZ PERFORMAX BLOK NEVKLÁDAT (zbytečný overhead).
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU performax_source_detector ---

(function initPerformaxDetection() {
    var PRIV_AREA = 'mobilerectangle-1';
    var MAX_POLL = 150;  // 150 × 200ms = 30s max čekání na element
    var pollCount = 0;
    var detected = false;

    /**
     * Zkontroluje obsah elementu na přítomnost Performax zdroje.
     * Vrací popis (string) nebo null.
     */
    function scanForPerformax(el) {
        // Performax: HTML komentář <!-- pfx / ... --> (SAS vkládá jako první child)
        for (var i = 0; i < el.childNodes.length; i++) {
            if (el.childNodes[i].nodeType === 8 && /^\s*pfx\s/i.test(el.childNodes[i].data)) {
                return 'Performax (comment: ' + el.childNodes[i].data.trim().substring(0, 60) + ')';
            }
        }
        // Performax: script src obsahující performax.cz
        var pxScript = el.querySelector('script[src*="performax.cz"]');
        if (pxScript) {
            return 'Performax (script: ' + pxScript.src + ')';
        }
        // Performax: span id="ps-script" (wrapper)
        var psSpan = el.querySelector('span#ps-script');
        if (psSpan) {
            return 'Performax (span#ps-script)';
        }
        // Performax: wrapper #PX_out_of_page kdekoli v dokumentu
        if (document.getElementById('PX_out_of_page')) {
            return 'Performax (#PX_out_of_page)';
        }
        return null;
    }

    /**
     * Zaloguje přidaný uzel (pro interní detekci, bez výpisu do konzole).
     */
    function logAddedNode(node) {
        // interní — výpisy odstraněny
    }

    /**
     * Polling: čeká na vytvoření .sas_mone elementu, pak nasadí observer.
     */
    function tryAttach() {
        var el = document.querySelector('.sas_mone[data-m-area="' + PRIV_AREA + '"]');
        if (!el) {
            pollCount++;
            if (pollCount < MAX_POLL) {
                setTimeout(tryAttach, 200);
            }
            return;
        }

        // 1. Okamžitý scan existujícího obsahu
        var existing = scanForPerformax(el);
        if (existing) {
            RELOAD_POSITIONS[PRIV_AREA] = 0;
            detected = true;
            return;
        }

        // 2. MutationObserver — zachytí obsah když SAS odpověď dorazí
        var observer = new MutationObserver(function(mutations) {
            if (detected) return;
            mutations.forEach(function(mut) {
                mut.addedNodes.forEach(logAddedNode);
            });
            var source = scanForPerformax(el);
            if (source) {
                RELOAD_POSITIONS[PRIV_AREA] = 0;
                detected = true;
                observer.disconnect();
            }
        });
        observer.observe(el, { childList: true, subtree: true });
    }

    tryAttach();
})();

// --- KONEC BLOKU performax_source_detector ---

/*
---------------------------------------------
Blok: blok_0001
Název: load_script
Cesta: src/asset/load_script.js
Řádky: 1-38
Použití v buildu: ANO (importováno jako první v echo24_config.js)
Závislosti: NE (pouze DOM API, žádné další importy)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří funkci do výsledného bundle.
Komentář agenta:
Funkce je jednoduchý wrapper pro dynamické načítání JS skriptů s podporou cache-bustingu. V buildu je logika zachována beze změn, pouze minifikována. Není potřeba žádná úprava.
Import pouze konkrétního bloku:
import load_script from '../../asset/load_script';
---------------------------------------------
*/

const load_script = function (source, beforeEl, cache = false, refresh = 1800000){
      var async = true;
      var defer = false;
      return new Promise(function (resolve, reject){
         let script = document.createElement('script');
         const prior = beforeEl || document.getElementsByTagName('script')[0];
         script.async = async;
         script.defer = defer;
         function onloadHander(_, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
               script.onload = null;
               script.onreadystatechange = null;
               script = undefined;
               if (isAbort) { reject(); } else { resolve(); }
            }
         }
         script.onload = onloadHander;
         script.onreadystatechange = onloadHander;
         if (cache === true) {
            var version = parseInt((new Date()).getTime() / refresh);
            if (source.indexOf('?') === -1) {
               source += '?v=' + version;
            } else {
               source += '&v=' + version;
            }
         }
         script.src = source;
         prior.parentNode.insertBefore(script, prior);
      });
}

// blok_0002 (prebid_lib) ODSTRANĚN.
// Prebid knihovnu nyní loaduje cpexPackage interně.
// Archivován v Nepotrebne_bloky_v_echo24.js jako spare_0011.

/*
---------------------------------------------
Blok: blok_0003
Název: sas_lib
Cesta: src/asset/sas_verze.js
Řádky: 1-6
Použití v buildu: ANO (importováno v echo24_config.js)
Závislosti: ANO (importuje base_url ze src/asset/base_url.js)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
Komentář agenta:
Jednoduchá konstanta s cestou k SAS knihovně. V buildu je logika zachována, pouze minifikována. Není potřeba žádná úprava.
Import pouze konkrétního bloku:
import sas_lib from '../../asset/sas_verze';
---------------------------------------------
*/

const base_url = 'https://static.primacdn.cz/sas';
const sas_lib = `${base_url}/sas/sas.js?v=260`;

// blok_0004 (adUnits) ODSTRANĚN.
// Prebid HB adUnits nyní řeší cpexPackage (stahuje z CSV tabulky na cdn.cpex.cz/settings/).
// Archivován v Nepotrebne_bloky_v_echo24.js jako spare_0008.

/*
---------------------------------------------
Blok: blok_source_0002
Název: R2B2 HB adapter (konfigurace zdroje)
Účel: URL skriptu R2B2 Header Bidding adaptéru.
      Tento blok je VOLITELNÝ — pokud není přítomen, CPEX aukce proběhne bez R2B2 bidderu.
      Na webech bez R2B2 stačí tento blok odebrat/zakomentovat.
Závislosti: NE (statická proměnná)
Použití: init_cpex_header_bidding podmíněně načte tento skript do Prebid aukce.
---------------------------------------------
*/
// --- ZAČÁTEK BLOKU R2B2 HB adapter ---
var R2B2_HB_SCRIPT = '//delivery.r2b2.cz/hb/im/im.echo24.cz';
// --- KONEC BLOKU R2B2 HB adapter ---

/*
---------------------------------------------
Blok: blok_source_0001 (dříve blok_0005)
Název: Seznam SSP konfigurace (adUnitsSZN)
Cesta: src/header_bidding/szn_configs/echo24_cz_hb_settings_module.js
Řádky: 1-560
Použití v buildu: ANO (importováno v echo24_config.js)
Závislosti: NE (statické pole s objekty)
Účel: Konfigurace reklamních jednotek pro Seznam SSP bidding.
      Tento blok je VOLITELNÝ — na webech bez Seznam SSP stačí odebrat/zakomentovat.
      CPEX package tento blok NENAHRAZUJE (Seznam SSP je nezávislý na CPEX aukci).
      Aktuálně se s CPEX nevyužívá (seznam_traffic=false), ale blok je připraven
      pro budoucí integraci Seznam SSP do CPEX flow.
Komentář agenta:
Statická konfigurace reklamních jednotek pro Seznam SSP. V buildu je logika zachována, pouze minifikována.
Import pouze konkrétního bloku:
import adUnitsSZN from '../../header_bidding/szn_configs/echo24_cz_hb_settings_module';
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU Seznam SSP konfigurace ---
var adUnitsSZN = [
    {
        "code": "mobilerectangle-1",
        "labelAny": ["mobile"],
        "mediaTypes": {"banner": {"sizes": [[300,300],[300,250],[500,200],[320,100]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179727}}]
    },
    {
        "code": "mobilerectangle-2",
        "labelAny": ["mobile"],
        "mediaTypes": {"banner": {"sizes": [[300,300],[300,250],[250,250],[768,1230],[300,600],[480,820],[600,1080],[720,1080],[720,1280],[480,480],[336,280],[1,1]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179728}}]
    },
    {
        "code": "mobilerectangle-3",
        "labelAny": ["mobile"],
        "mediaTypes": {"banner": {"sizes": [[300,300],[300,250]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179729}}]
    },
    {
        "code": "mobilerectangle-4",
        "labelAny": ["mobile"],
        "mediaTypes": {"banner": {"sizes": [[300,300],[300,250]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179730}}]
    },
    {
        "code": "halfpagead-1",
        "labelAny": ["desktop"],
        "mediaTypes": {"banner": {"sizes": [[300,600],[300,300],[300,250],[160,600],[120,600]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179719}}]
    },
    {
        "code": "halfpagead-2",
        "labelAny": ["desktop"],
        "mediaTypes": {"banner": {"sizes": [[300,600],[300,300],[300,250],[160,600],[120,600]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179720}}]
    },
    {
        "code": "halfpagead-3",
        "labelAny": ["desktop"],
        "mediaTypes": {"banner": {"sizes": [[300,600],[300,300],[300,250],[160,600],[120,600]]}},
        "bids": []
    },
    {
        "code": "leaderboard-1",
        "labelAny": ["desktop"],
        "mediaTypes": {"banner": {"sizes": [[728,90],[970,210],[998,200],[970,90],[970,100],[2000,1400]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179718}}]
    },
    {
        "code": "wallpaper-1",
        "labelAny": ["desktop"],
        "mediaTypes": {"banner": {"sizes": [[480,300],[300,300],[300,250],[250,250],[336,280],[1,1]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179722}}]
    },
    {
        "code": "wallpaper-2",
        "labelAny": ["desktop"],
        "mediaTypes": {"banner": {"sizes": [[480,300],[300,300],[300,250],[250,250],[336,280],[1,1]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179723}}]
    },
    {
        "code": "wallpaper-3",
        "labelAny": ["desktop"],
        "mediaTypes": {"banner": {"sizes": [[480,300],[300,300],[300,250],[250,250],[336,280],[1,1]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179724}}]
    },
    {
        "code": "boardbottom-1",
        "labelAny": ["desktop"],
        "mediaTypes": {"banner": {"sizes": [[728,90],[970,210],[970,100],[970,90],[970,310]]}},
        "bids": [{"bidder": "primadformszn", "params": {"mid": 2179726}}]
    }
];
// --- KONEC BLOKU Seznam SSP konfigurace ---

    /*
    ---------------------------------------------
    Blok: blok_0006
    Název: gam_standard_tag_pure_echo
    Cesta: src/creatives/sas_creative_templates.js
    Řádky: 171-320
    Použití v buildu: ANO (sas_render_gam_pure_echo)
    Závislosti: NE (všechny závislosti jsou globální – window, document, nebo jsou předávány parametrem)
     Zcela logická shoda source vs build verze: ANO
     Rozdíly v logice:
     - Žádné, logika odpovídá build verzi.

    Komentář agenta:
    Funkce je v buildu přítomna a po úpravě odpovídá logice build verze. Rozdíly jsou pouze technické (minifikace a pojmenování proměnných), bez dopadu na chování.

    Import pouze konkrétního bloku:
    import { gam_standard_tag_pure_echo } from '../../creatives/sas_creative_templates';
    ---------------------------------------------
    */

    function gam_standard_tag_pure_echo(params) {
        const { area, posId, reload, adunit, sizes, zone_id, zone_width, zone_height } = params;
        function initGAM() {
            const gamid = `gpt-passback-${posId}-${Math.round(Math.random() * 10000000000)}`;
            const sznid = `szn-passback-${posId}-${Math.round(Math.random() * 10000000000)}`;
            const gamdiv = document.createElement('div');
            const adunit_final = adunit;
            const position = top.document.getElementById(posId);

            if (!position){
                return;
            } 
            position.innerHTML = '';

            if (/mobilerectangle/.test(area)) {
                const div1 = document.createElement('div');
                div1.className = 'interscroller-level1';
                const div2 = document.createElement('div');
                div2.className = 'interscroller-level2';
                const div3 = document.createElement('div');
                div3.className = 'interscroller-level3';
                const div4 = document.createElement('div');
                div4.style.setProperty('display', 'inline-block');
                div4.className = 'interscroller-level4';
                gamdiv.id = gamid;
                gamdiv.style.width = 'fit-content';
                gamdiv.style.lineHeight = '0';
                position.append(div1);
                div1.append(div2);
                div2.append(div3);
                div3.append(div4);
                div4.append(gamdiv);
                if (typeof window.immInterscrollerObserve == 'function') {
                    window.immInterscrollerObserve(posId);
                }
            } else {
                gamdiv.id = gamid;
                position.append(gamdiv);
            }

            const szndiv = document.createElement('div');
            szndiv.id = sznid;
            position.append(szndiv);
            let sznrender = false;
            window.googletag = window.googletag || { cmd: [] };
            googletag.cmd.push(function () {
                googletag.defineSlot(adunit_final, JSON.parse(sizes), gamid).addService(googletag.pubads());
                googletag.pubads().enableLazyLoad({
                    fetchMarginPercent: 2,
                    renderMarginPercent: 1,
                    mobileScaling: 1
                });
                googletag.pubads().addEventListener('slotRenderEnded', function (event) {
                    if (event.slot.getSlotElementId() !== gamid) {
                        return;
                    }
                    if (!event.isEmpty) {

                    } else {
                        gamdiv.style.display = 'none';
                        function callSeznamAd(zone, width, height) {
                            if (sznrender === true) return;
                            sznrender = true;
                            let pos = position;
                            if (zone !== '' && width !== '' && height !== '') {
                                sssp.config({ fallbackToGAM: true });
                                let task = [];
                                task[0] = { "zoneId": zone, "id": sznid, "width": Math.round(width), "height": Math.round(height) };
                                task[0]["options"] = {};
                                task[0]["options"]["infoCallback"] = function (advert, data) {
                                    if (advert?.type === 'empty') {
                                        if (/mone_box/.test(position.parentElement.className)) {
                                            position.parentElement.style.display = 'none';
                                        }
                                        // GAM i Seznam empty → pozice je no-fill → označit pro preventivní reload
                                        if (area && typeof reloadState !== 'undefined' && RELOAD_POSITIONS[area] !== undefined && !reloadState.emptyPositions.has(area)) {
                                            reloadState.emptyPositions.add(area);
                                            logSetChange(_RELOAD_CHECK_PREFIX + '[emptyPositions]', Array.from(reloadState.emptyPositions));
                                        }
                                    }
                                    if (advert?.width && advert.width > window.innerWidth) {
                                        const scale = window.innerWidth / advert.width;
                                        position.style.transform = `scale(${scale})`;
                                    }
                                };
                                sssp.getAds(task);
                            };
                        };
                        if (typeof window.sssp === 'undefined') {
                            const s = document.createElement('script');
                            s.src = 'https://ssp.seznam.cz/static/js/ssp.js';
                            document.head.appendChild(s);
                            s.onload = function () { if (typeof window.sssp !== 'undefined') { callSeznamAd(zone_id, zone_width, zone_height); } };
                        } else {
                            callSeznamAd(zone_id, zone_width, zone_height);
                        }
                    }
                });
                googletag.enableServices();
                googletag.display(gamid);
            });
        }

        if (!window.googletag?.apiReady && !document.querySelector('script[src*="securepubads.g.doubleclick.net"]')) {
            const script = document.createElement('script');
            script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
            script.async = true;
            document.head.append(script);
        }
        initGAM();

        if (Math.round(reload) < 5000) return;
        let first = true;
        let timeout = false;
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            const elementHeight = rect.height;
            const elementWidth = rect.width;
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
            const visibleArea = (visibleHeight > 0 && visibleWidth > 0) ? (visibleHeight * visibleWidth) : 0;
            const totalArea = elementHeight * elementWidth;
            return (visibleArea / totalArea) >= 0.25;
        }
        const element = document.getElementById(posId);
        if (element) {
            window.addEventListener('scroll', function () {
                if (isInViewport(element)) {
                    if (timeout === false) {
                        timeout = true;
                        if (first === false) {
                            window.renderAdMone(area, posId);
                        }
                        setTimeout(function () {
                            timeout = false;
                            first = false;
                        }, 10000);
                    }
                }
            });
        }
    }



    /*
    ---------------------------------------------

        Blok: blok_0007
        Název: cookie
        Cesta: src/asset/cookie.js
        Řádky: 1-32
        Použití v buildu: ANO (importováno v echo24_config.js, používáno v gdpr a dalších blocích)
        Závislosti: NE (čistě DOM API, žádné další importy)
        Zcela logická shoda source vs build verze: ANO
        Rozdíly v logice:
        - Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
        Komentář agenta:
        Tento blok poskytuje základní utilitu pro práci s cookies (nastavení, čtení, mazání). V buildu je logika zachována, pouze minifikována. Blok je nezávislý, používán napříč dalšími bloky (např. gdpr). Doporučuji neměnit, pokud není potřeba rozšířit funkcionalitu.
        Import pouze konkrétního bloku:
        import cookie from '../../asset/cookie';
        ---------------------------------------------
        */

    var cookie = {
        set: function (name, value, min) {
            var domain, domainParts, date, expires, host;
            if (min){
                date = new Date();
                date.setTime(date.getTime()+(min*60*1000));
                expires = "; expires="+date.toGMTString();
            } else {
                expires = "";
            }
            host = location.host;
            if (host.split('.').length === 1) {
                document.cookie = name+"="+value+expires+"; path=/";
            } else {
                domainParts = host.split('.');
                domainParts.shift();
                domain = '.'+domainParts.join('.');
                document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
                if(cookie.get(name) == null || cookie.get(name) != value){
                    domain = '.'+host;
                    document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
                }
            }
        },
        get: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++){
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1,c.length);
                }
                if(c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
        return null;
        },
        erase: function(name){
            cookie.set(name, '', -1);
        }
    };

/*
---------------------------------------------
Blok: blok_0008
Název: gdpr
Cesta: src/asset/gdpr_echo.js
Řádky: 1-124
Použití v buildu: ANO (importováno v echo24_config.js)
Závislosti: ANO (vyžaduje Didomi CMP, window.didomiOnReady, window.didomiEventListeners; závisí na cookie – blok_0007)
Zcela logická shoda source vs build verze: ANO (logika je zachována, build pouze minifikuje a vnoří funkci)
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
Komentář agenta:
Funkce řeší získání GDPR consentu přes Didomi CMP, fallback na defaultní tcString a správu callbacků při změně consentu. Všechny závislosti jsou globální nebo importované. Nově závisí na cookie (blok_0007). V buildu je logika zachována, pouze minifikována.
Import pouze konkrétního bloku:
import gdpr from '../../asset/gdpr_echo';
---------------------------------------------
*/

function gdpr(callback, antiadblock = null, params = null) {
    let eu_cookie = cookie.get('euconsent-v2');
    const default_tcstring = 'CQNYlAAQNYlAAAHABBENBeFgAP_gAEPgAAAAJsoBJC5kBSFCAGJgYNkAIAAGxxAAIAAAABAAAAAAABoAIAgAAAAwAAQABgAAABAAIEAAAABACABAAAAAQAAAAQAAAAAQAAAAAQAAAAAAAiBACAAAAABAAQAAAABAQAAAgAAAAAIAQAAAAAAAgAAAAAAAAAAAAAAAAQgAAAAAAAAAAAQAAAAAAAAAAAAAABBAAAAAAAAAAAAAAAAAwgmpAiAAqABcADgAIAAVAAyABoAEQAJgAVQAuABiAD8AISARABEgCOAGWAM2AdwB3gD9AIOARYAkoBtADqAJtAVIArIBagC3AF5gMkAamBNQAAAA.f_wACHwAAAAA';
    // Pokud není consent cookie, nastavíme defaultní hodnotu
    if(eu_cookie === null){
        eu_cookie = 'CQNYlAAQNYlAAAHABBENBeFgAP_gAEPgAAAAJsoBJC5kBSFCAGJgYNkAIAAGxxAAIAAAABAAAAAAABoAIAgAAAAwAAQABgAAABAAIEAAAABACABAAAAAQAAAAQAAAAAQAAAAAQAAAAAAAiBACAAAAABAAQAAAABAQAAAgAAAAAIAQAAAAAAAgAAAAAAAAAAAAAAAAQgAAAAAAAAAAAQAAAAAAAAAAAAAABBAAAAAAAAAAAAAAAAAwgmpAiAAqABcADgAIAAVAAyABoAEQAJgAVQAuABiAD8AISARABEgCOAGWAM2AdwB3gD9AIOARYAkoBtADqAJtAVIArIBagC3AF5gMkAamBNQAAAA.f_wACHwAAAAA';
    }
    if (eu_cookie !== null && antiadblock === null) {
        call_with_gdpr_consent_didomi(function (_consent) {            
            callback(_consent, params);
        });
    }
    if (eu_cookie === null && antiadblock === null) {
        waiting_ad_on_consent(function (_consent) {            
            callback(_consent, params);
        });
    }
    if (antiadblock !== null) {
        let _consent = {};
        _consent.enableCookies = false;
        _consent.tcString = default_tcstring;        
        callback(_consent, params);
    }
    function waiting_ad_on_consent(callback, params = null) {
        window.didomiEventListeners = window.didomiEventListeners || [];
        window.didomiEventListeners.push({
            event: 'consent.changed',
            listener: function () {
                let _consent = dimomi_consent();                
                callback(_consent, params);
            }
        });
    };
    function dimomi_consent() {
        let gdpr_consent = {
            enableCookies: false,
            tcString: default_tcstring,
            purpose: []
        };
        try {
            let status = Didomi.getUserStatus();
            gdpr_consent.enableCookies = Didomi.getUserConsentStatusForPurpose('cookies');
            gdpr_consent.tcString = status.consent_string;
            gdpr_consent.purpose = status.purposes.consent.enabled;
        } catch (e) {
            // Didomi CMP error — tiché selhání
        }
        return gdpr_consent;
    };
    function call_with_gdpr_consent_didomi(callback, params = null) {
        window.didomiOnReady = window.didomiOnReady || [];
        window.didomiOnReady.push(function () {
            const _consent = dimomi_consent();            
            callback(_consent, params);
        });
    };
}

// blok_0009 (main_header_bidding) ODSTRANĚN.
// Fallback HB logika pro non-CPEX cestu — s enableCpexBridge=true se nikdy nespustí.
// Bid→SAS handoff s CPEX řeší cpexAuctionDone handler v blok_0011.
// Archivován v Nepotrebne_bloky_v_echo24.js jako spare_0009.

    // blok_0010 (initReloadBranding / auto_reload_ads) ODSTRANĚN.
    // Kompletně nahrazen reload_manager (blok_0000b).
    // Archivován v Nepotrebne_bloky_v_echo24.js jako spare_0007.

/*
---------------------------------------------
Blok: blok_0011
Název: init_cpex_header_bidding (CPEX bridge loader + event orchestrace)
Cesta: src/header_bidding/cpex_header_bidding.js
Řádky: 4-200
Použití v buildu: ANO (importováno v echo24_config.js, voláno v init_iprima_ads)
Závislosti: ANO (vyžaduje load_script, sas_lib, window, pbjs, cpexPackage, call_adserver, DOM API, R2B2_HB_SCRIPT [volitelný — blok_source_0002])
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
Komentář agenta:
Tento blok je CPEX bridge vrstva pro Echo24. Zajišťuje načtení CPEX package, připojení event handlerů (cpexSlideupClosed, cpexAuctionDone), mapování winning bids do SAS struktury a následné volání adserveru. Blok je vhodný jako samostatně skládatelná jednotka pro administraci.
Import pouze konkrétního bloku:
import { init_cpex_header_bidding } from '../../header_bidding/cpex_header_bidding';
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU init_cpex_header_bidding ---

async function init_cpex_header_bidding(_consent, seznam_traffic = false, call_adserver, r2b2_script = '', cpex_publisher = '', cpex_site = '', cpex_package = '') {
    window.pbjs = window.pbjs || {};
    pbjs.winningBidsSas = pbjs.winningBidsSas || {};
    try {
        // SAS se načítá vždy; R2B2 HB adapter jen pokud je URL neprázdné
        // (pokud blok_source_0002 není přítomen, r2b2_script bude prázdný → přeskočí se)
        var scriptsToLoad = [load_script(sas_lib)];
        if (r2b2_script) {
            scriptsToLoad.push(load_script(r2b2_script));
        }
        await Promise.all(scriptsToLoad);
    } catch (e) {
        // fallback: zavolat adserver bez HB dat
        call_adserver(_consent, seznam_traffic);
        return;
    }
    window.cpexHbRender = true;

    // Příznak: cpexAuctionDone ještě nefiroval
    let cpexAuctionFired = false;

    window.cpexPackageConfig = {
        publisherSettingsPath: cpex_publisher,
        websiteSettingsPath: cpex_site,
        errorPath: ''
    };
    // Původní produkční metoda: fire-and-forget script append
    document.head.appendChild(Object.assign(document.createElement('script'), { src: cpex_package, fetchPriority: 'high' }));

    // FALLBACK TIMEOUT: pokud cpexAuctionDone nepřijde do 10s, zavoláme adserver přímo
    setTimeout(function() {
        if (!cpexAuctionFired) {
            cpexAuctionFired = true;
            call_adserver(_consent, seznam_traffic);
        }
    }, 10000);

    // akce na mobilni slide-up, pop-up — po zavření nastaví capping
    // Samotný reload řeší reload_manager (blok_0000b) v dalším cyklu.
    window.addEventListener('cpexSlideupClosed', function (e) {
        // Zjistit adUnit z CPEX Slideup instance (e.detail.adUnit)
        var closedArea = (e && e.detail && e.detail.adUnit) ? e.detail.adUnit : 'mobilerectangle-1';
        reloadSetCapping(closedArea);
    });

    window.addEventListener('cpexAuctionDone', function (e) {
        if (cpexAuctionFired) {
            return;
        }
        cpexAuctionFired = true;
        if (typeof pbjs.getBidResponses === 'function') {
            pbjs.SAS_codesWithResponse = Object.keys(pbjs.getBidResponses());
            try {
                if (pbjs.SAS_codesWithResponse.length > 0) {
                    for (var s = 0; s < pbjs.SAS_codesWithResponse.length; s++) {
                        const area = pbjs.SAS_codesWithResponse[s];
                        const bidResponse = pbjs.getHighestCpmBids(pbjs.SAS_codesWithResponse[s])[0];
                        pbjs.winningBidsSas[area] = {
                            bid: bidResponse.cpm.toFixed(2),
                            bidTier: bidResponse.adserverTargeting.hb_pb,
                            video: void 0 !== bidResponse.vastUrl,
                            bidderCode: window.cpexPackage.settings.adserver.bidderTable[bidResponse.bidderCode] || "",
                            bidDealId: bidResponse.dealId || "",
                            height: bidResponse.height || 0,
                            width: bidResponse.width || 0,
                            bidderPrice: bidResponse.cpm.toFixed(2)
                        };
                    }
                }
            } catch (e) {
                // cpexAuctionDone processing error
            }
        }

        if (typeof window.popupReloadId !== 'undefined') {
            // POZNÁMKA: popupReloadId již není nastavován (logika přesunuta do reload_manager).
            // Tato větev se nyní nikdy nespustí. Ponechána dočasně pro bezpečnost.
            const id = document.querySelector('.sas_mone[data-m-area="mobilerectangle-1"]')?.id;
            if (id) window.renderAdMone('mobilerectangle-1', id);
        } else {
            call_adserver(_consent, seznam_traffic);
            // Reload mobilní pozice řeší reload_manager (blok_0000b) centrálně.
        }
    }, false);
}
// --- KONEC BLOKU init_cpex_header_bidding ---



/*
---------------------------------------------
Blok: blok_0012
Název: overwrite_sas_mone
Cesta: src/echo24/prod/assets/overwrite_sas_mone.js
Řádky: 1-28
Použití v buildu: ANO (importováno v echo24_config.js, voláno v call_adserver)
Závislosti: ANO (vyžaduje DOM API, třídy a atributy reklamních kontejnerů)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
Komentář agenta:
Tento blok přepisuje atributy reklamních kontejnerů (mone-ads) na správné hodnoty pro SAS. Provádí úpravy podle typu pozice (mobilní, nativní) a přidává třídu sas_mone. Všechny závislosti jsou pouze na DOM API. V buildu je logika zachována, pouze minifikována.
Import pouze konkrétního bloku:
import { overwrite_sas_mone } from '../../prod/assets/overwrite_sas_mone';
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU overwrite_sas_mone ---
function overwrite_sas_mone() {
    try {
        (function () {
            const sas_mones = document.querySelectorAll('.mone-ads');
            if (sas_mones) {
                for (const mone of sas_mones) {
                    if (mone) {
                        let area = mone?.getAttribute('data-adunit');
                        if (area) {
                            if (/mobile/.test(area)) {
                                area = (area === 'mobilerectangle-2_interscroller') ? 'mobilerectangle-2' : area;
                                mone.setAttribute('data-m-area', area);
                            } else {
                                area = (area === 'native-1_A') ? 'native-1' : area;
                                area = (area === 'native-2_B') ? 'native-2' : area;
                                area = (area === 'native-3_C') ? 'native-3' : area;
                                mone.setAttribute('data-d-area', area);
                            }
                            mone.classList.value += ' sas_mone';
                        }
                    }
                }
            }
        })();
    } catch (e) {
        // overwrite_sas_mone error — tiché selhání
    }
}
// --- KONEC BLOKU overwrite_sas_mone ---




/*
---------------------------------------------
Blok: blok_0013
Název: add_sas_mones
Cesta: src/asset/add_sas_mones.js
Řádky: 1-44
Použití v buildu: ANO (importováno v add_nonstandard_mone)
Závislosti: NE (čistě DOM API)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
Komentář agenta:
Tento blok poskytuje utilitu pro dynamické vkládání reklamních kontejnerů (sas_mone) do stránky. Vše je řešeno čistě přes DOM API, bez závislostí. V buildu je logika zachována, pouze minifikována.
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU add_sas_mones ---
/**
 * 
 * @param {Array} mones
 */
function add_sas_mones(mones){
    function create_mone(css, desktop, mobile, lazy){
        const d = document;
        const mone_level_mone_box = d.createElement('div');
        mone_level_mone_box.className = 'mone_box';
        mone_level_mone_box.style.cssText = css;
        const mone_level_header = d.createElement('div');
        mone_level_header.className = 'mone_header hide';
        const mone_level_sas_mone = d.createElement('div');
        mone_level_sas_mone.className = 'sas_mone';
        if(desktop !== null){
            mone_level_sas_mone.setAttribute('data-d-area', desktop);
        }
        if(mobile !== null){
            mone_level_sas_mone.setAttribute('data-m-area', mobile);
        }
        mone_level_sas_mone.id = `sas_${Math.round(Math.random() * 1000000000)}`;
        if( lazy !== null){
            mone_level_sas_mone.setAttribute('data-lazyload', 'true');
        }
        mone_level_mone_box.append(mone_level_header);
        mone_level_mone_box.append(mone_level_sas_mone);
        return mone_level_mone_box;
    }
    try{
        for(let i = 0; i < mones.length; i++){
            const {selector, desktop, mobile, lazy, position, style} = mones[i];
            const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
            if(element){
                const mone = create_mone(style, desktop, mobile, lazy);
                element.insertAdjacentElement(position, mone);
            }
        }
    }catch(e){
        // add_sas_mones error — tiché selhání
    }
}
// --- KONEC BLOKU add_sas_mones ---





/*
---------------------------------------------
Blok: blok_0014
Název: add_nonstandard_mone
Cesta: src/echo24/prod/assets/add_nonstandard_mone.js
Řádky: 1-42
Použití v buildu: ANO (importováno v echo24_config.js, voláno v call_adserver)
Závislosti: ANO (vyžaduje add_sas_mones, DOM API, window.SAS_KEYWORDS)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
Komentář agenta:
Tento blok přidává do stránky speciální reklamní pozice podle zařízení a stavu trafficu. Využívá pomocnou funkci add_sas_mones a kontroluje device a klíčová slova. Všechny závislosti jsou pouze na DOM API a importované funkci. V buildu je logika zachována, pouze minifikována.
Import pouze konkrétního bloku:
import { add_nonstandard_mone } from '../../prod/assets/add_nonstandard_mone';
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU add_nonstandard_mone ---
function add_nonstandard_mone(seznam_traffic = false) {
    const breakpoint = 768;
    const device = window.innerWidth < breakpoint ? "mobil" : "desktop";
    if (device === 'mobil' && (typeof window.SAS_KEYWORDS === 'undefined' || window.SAS_KEYWORDS !== 'noads')) {
        add_sas_mones([{
            selector: 'body',
            desktop: null,
            mobile: 'mobilerectangle-1',
            position: 'afterbegin',
            lazy: null
        }]);
    }

    if (device === 'mobil' && (typeof window.SAS_KEYWORDS === 'undefined' || window.SAS_KEYWORDS !== 'noads') && seznam_traffic == false) {
        add_sas_mones([{
            selector: 'body',
            desktop: null,
            mobile: 'mobileinterstitial',
            position: 'beforeend',
            lazy: null
        }]);
    }

    if (device === 'desktop' && (typeof window.SAS_KEYWORDS === 'undefined' || window.SAS_KEYWORDS !== 'noads') && seznam_traffic == false) {
        add_sas_mones([{
            selector: 'body',
            desktop: 'desktopstrip',
            mobile: null,
            position: 'beforeend',
            lazy: null
        }]);
        add_sas_mones([{
            selector: 'body',
            desktop: 'interstitial',
            mobile: null,
            position: 'beforeend',
            lazy: null
        }]);
    }
}
// --- KONEC BLOKU add_nonstandard_mone ---




/*
---------------------------------------------
Blok: blok_0015
Název: interscroller_observe
Cesta: src/echo24/prod/assets/interscroller_observe.js
Řádky: 1-34
Použití v buildu: ANO (importováno v echo24_config.js, voláno pro správu interscroller pozic)
Závislosti: NE (čistě DOM API, ResizeObserver)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
Komentář agenta:
Tento blok zajišťuje správu a pozorování interscroller reklamních pozic pomocí ResizeObserveru. Veškerá logika je čistě na úrovni DOM API, bez dalších závislostí. V buildu je logika zachována, pouze minifikována.
Import pouze konkrétního bloku:
import { interscroller_observe } from '../../prod/assets/interscroller_observe';
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU interscroller_observe ---
function interscroller_observe(elementId) {
    const posElement = document.getElementById(elementId);
    const div1 = posElement?.firstChild;
    const div2 = div1?.firstChild;
    const div3 = div2?.firstChild;
    const div4 = div3?.firstChild;
    if (!div1 && !div2 && !div3 && !div4) {
        return;
    }
    if (!/interscroller-level1/.test(div1?.className)) {
        return;
    }
    if (posElement) {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const screenWidth = Math.round(document.body.offsetWidth);
                const posOffsetLeft = posElement.getBoundingClientRect().left;
                if (div4.offsetHeight < 400) {
                    return;
                }
                const scaleFactor = screenWidth / Math.round(div4.offsetWidth);
                posElement.style.setProperty('margin-left', '-20px', 'important');
                div1.style.cssText = `position:relative; display:block; width:calc(100vw - 0px); height: 70vh; overflow:hidden`;
                div2.style.cssText = `position:absolute; width:calc(100vw - 0px); height: 70vh; clip:rect(0px auto auto 0px)`;
                div3.style.cssText = `position:fixed; top:55px; width:calc(100vw - 0px); height:70vh;`;
                div3.style.transform = `scale(${scaleFactor})`;
                div3.style.transformOrigin = '0 0';
                if (posOffsetLeft > 0) {
                }
            }
        });
        resizeObserver.observe(posElement);
    }
}
// --- KONEC BLOKU interscroller_observe ---




/*
---------------------------------------------
Blok: blok_0016
Název: fix_mobile_skyscrapper
Cesta: src/echo24/prod/assets/fix_mobile_skyscraper.js
Řádky: 1-16
Použití v buildu: ANO (importováno v echo24_config.js, voláno pro úpravu mobilního skyscraperu)
Závislosti: NE (čistě DOM API)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
Komentář agenta:
Tento blok řeší odstranění a úpravu stylů pro mobilní skyscraper reklamní pozice. Veškerá logika je čistě na úrovni DOM API, bez dalších závislostí. V buildu je logika zachována, pouze minifikována.
Import pouze konkrétního bloku:
import { fix_mobile_skyscrapper } from '../../prod/assets/fix_mobile_skyscraper';
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU fix_mobile_skyscrapper ---
function fix_mobile_skyscrapper() {
    const breakpoint = 768;
    const device = window.innerWidth < breakpoint ? "mobil" : "desktop";
    if (device === 'mobil') {
        try {
        } catch (e) {
            const els = document.querySelectorAll('.adcontainer-skyscraper');
            for (x of els) {
                x.remove();
            }
        }
        const css = document.createElement('style');
        css.innerHTML = `.adcontainer-m{overflow:visible !important;max-width:100% !important;}`;
        document.head.append(css);
    }
}
// --- KONEC BLOKU fix_mobile_skyscrapper ---


/*
---------------------------------------------
Blok: blok_0017
Název: cpex_header_bidding_render
Cesta: src/asset/cpex_header_bidding_render.js
Řádky: 1-15
Použití v buildu: ANO (importováno v global_header_bidding_render)
Závislosti: NE (využívá pouze top.cpexPackage.headerbidding.reRender a DOM API)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří funkci do výsledného bundle.
Komentář agenta:
Funkce slouží k opětovnému vykreslení reklamní pozice přes CPEX header bidding. Všechny závislosti jsou globální (top.cpexPackage). V buildu je logika zachována, pouze minifikována.
Import pouze konkrétního bloku:
import { cpex_header_bidding_render } from '../../asset/cpex_header_bidding_render';
---------------------------------------------
*/
function cpex_header_bidding_render(params) {
    const { area } = params;
    try {        
        const element = document.querySelector(`.sas_mone[data-d-area=${area}]`) || document.querySelector(`.sas_mone[data-m-area=${area}]`);
        if (element) {
            top.cpexPackage.headerbidding.reRender(element.id, area);
        }
    } catch (e) {
        // cpex header bidding reRender error — tiché selhání
    }
}


/*
---------------------------------------------
Blok: blok_0018
Název: cpex_s2s_render
Cesta: src/asset/cpex_s2s_redner.js
Řádky: 1-15
Použití v buildu: ANO (importováno v global_s2s_render)
Závislosti: NE (využívá pouze top.cpexPackage.render a DOM API)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří funkci do výsledného bundle.
Komentář agenta:
Funkce slouží k vykreslení S2S creative přes CPEX. Všechny závislosti jsou globální (top.cpexPackage). V buildu je logika zachována, pouze minifikována.
Import pouze konkrétního bloku:
import { cpex_s2s_render } from '../../asset/cpex_s2s_redner';
---------------------------------------------
*/
function cpex_s2s_render(params) {
    const { site, posId, response, width, height, advertiser } = params;
    const elementId = posId;
    const adUnit =  window.innerWidth > 768 ? document.querySelector(`#${posId}`).dataset.dArea : document.querySelector(`#${posId}`).dataset.mArea;
    const creative = response;
    try {
        top.cpexPackage.render(elementId, adUnit, creative, width, height);
    } catch (e) {
        // cpex s2s render error — tiché selhání
    }
}




/*
---------------------------------------------
Blok: blok_0019a
Název: Shared helpers a CSS pro S2S/HB renderer
Cesta: src/asset/s2s_header_bidding_creative_render.js
Řádky: 1-57
Použití v buildu: ANO (využíváno ve všech kreativních funkcích a dispatcheru)
Závislosti: NE (čistě DOM API, window.pbjs)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří funkce do výsledného bundle.
Komentář agenta:
Tento blok obsahuje sdílené pomocné funkce ($, setStyles, addComment, ensureStyleOnce, writeIframe, getMoneEl, getWinSize, renderIntoIframe) a vložení sdíleného CSS pro reklamní label. Všechny funkce jsou nezávislé, používány napříč celým rendererem. V buildu je logika zachována, pouze minifikována.
Import pouze konkrétního bloku:
import { ... } from '../../asset/s2s_header_bidding_creative_render';
---------------------------------------------
*/
// =========================
// UNIFIED S2S + HB RENDERER
// =========================

// ---------- Shared helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const setStyles = (el, styles) => Object.assign(el?.style || {}, styles || {});
const addComment = (parent, text) => { try { parent?.append(document.createComment(text)); } catch {} };
const ensureStyleOnce = (id, cssText) => {
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id; style.textContent = cssText;
    document.head.appendChild(style);
  }
};
const writeIframe = (iframe, html) => {
  const doc = iframe?.contentWindow?.document || iframe?.contentDocument;
  if (!doc) return;
  doc.open(); doc.write(html || ''); doc.close();
};
const getMoneEl = (param) => {
  const {area } = param;
  return $(`.sas_mone[data-d-area="${area}"]`) || $(`.sas_mone[data-m-area="${area}"]`);
}
const getWinSize = (param) => {
  const {area} = param
  const w = (window.pbjs?.winningBids?.[area]?.width) ?? 0;
  const h = (window.pbjs?.winningBids?.[area]?.height) ?? 0;
  return { w: Number(w) || 0, h: Number(h) || 0 };
};
const renderIntoIframe = (iframe, ctx) => {
  // HB → pbjs.renderAd; S2S → write HTML
  const { mode, area, response } = ctx;
  if (!iframe) return;
  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (!doc) return;

  if (mode === 's2s') {
    writeIframe(iframe, response);
    return;
  }
  // hb
  const adId = window.pbjs?.winningBids?.[area?.area]?.adId;
  if (adId && typeof window.pbjs?.renderAd === 'function') {
    window.pbjs.renderAd(doc, adId);
  }
};

// ---------- Shared CSS ----------
ensureStyleOnce('sas-s2s-shared-css', `
  .sas__label {
    font-size:10px;font-family:sans-serif;position:absolute;top:10px;right:55px;
    line-height:11px;padding:2px 4px;background:#e8e8e8;color:#000;z-index:1;
    border-radius:7px;border:1px solid #d6d6d6;box-shadow:0 0 4px rgba(0,0,0,.5);
  }
`);

// blok_0019b-0019h (fallback renderers) ODSTRANĚNY.
// Rendering HB+S2S kreativ nyní řeší cpexPackage (cpex_header_bidding_render, cpex_s2s_render).
// Archivovány v Nepotrebne_bloky_v_echo24.js jako spare_0012.
// Odstraněno: pickTargetEl, pickAdSize, creative_banner, creative_branding,
//   creative_popup, creative_interscroller, creative_desktop_strip,
//   render_s2s_and_header_bidding_creatives

/*
---------------------------------------------
Blok: blok_0020
Název: global_header_bidding_render, global_s2s_render
Cesta: src/asset/s2s_header_bidding_render_global_cpex_iprima.js
Řádky: 5-22
Použití v buildu: ANO (importováno v echo24_config.js, voláno v SAS renderech)
Závislosti: ANO (vyžaduje cpex_header_bidding_render, cpex_s2s_render)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
Komentář agenta:
Tento blok obsahuje dvě funkce pro globální renderování header biddingu a s2s integrace. Rozhoduje podle přítomnosti window.cpexHbRender, zda použít CPEX nebo fallback na SAS render. Všechny závislosti jsou globální nebo importované. V buildu je logika zachována, pouze minifikována.
Import pouze konkrétního bloku:
import { global_header_bidding_render, global_s2s_render } from '../../asset/s2s_header_bidding_render_global_cpex_iprima';
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU global_header_bidding_render, global_s2s_render ---
// Zjednodušeno: cpexHbRender je vždy definováno (enableCpexBridge=true permanent).
// Fallback větve (render_s2s_and_header_bidding_creatives) odstraněny — viz spare_0012.
function global_header_bidding_render(area) {
    cpex_header_bidding_render(area);
}

function global_s2s_render(params) {
    cpex_s2s_render(params);
}
// --- KONEC BLOKU global_header_bidding_render, global_s2s_render ---

/*
---------------------------------------------
Blok: blok_0021a
Název: render_mone_global
Cesta: src/asset/render_ad_mone_global.js
Použití v buildu: ANO (používáno v renderAdMone — galerie, halfpagead-2)
Závislosti: ANO (vyžaduje renderCore, window.pbjs)
Komentář agenta:
Zjednodušeno — HB refresh větve odstraněny (adUnits je vždy [],
cpexPackage řeší HB refresh interně). Zachováno: device detection,
filter gallerymobilerectangle-1, clear winningBidsSas, volání renderCore.
Parametry hbAdUnit/SEZNAM_FORMATS/adUnits odstraněny (nikdy se nepoužívaly).
---------------------------------------------
*/

function render_mone_global(area, elementId) {
    const BREAKPOINT = 768;
    const device = window.innerWidth < BREAKPOINT ? "mobile" : "desktop";

    if (area === "gallerymobilerectangle-1") return;

    // Clear winning bids before fresh SAS render
    if (window.pbjs && typeof window.pbjs === "object") {
        pbjs.winningBidsSas = {};
    }

    // antiadblock preferNew logika odstraněna — renderViaSeznamFormats
    // vždy vrací false (SEZNAM_FORMATS je vždy {}). renderCore zachován beze změny.
    renderCore(area, elementId, {}, device, /*preferNew*/ false);
}


/*
---------------------------------------------
Blok: blok_0021b
Název: galleryState
Cesta: src/asset/render_ad_mone_global.js
Řádky: 43-45
Použití v buildu: ANO (stav pro galerii, používán v renderViaSeznamFormats)
Závislosti: NE
Logická shoda: ANO
Komentář agenta: Uchovává počítadlo pro zobrazování reklam v galerii.
---------------------------------------------
*/
const galleryState = { count: 0, lastCount: 0 };

/*
---------------------------------------------
Blok: blok_0021c
Název: resolveArea
Cesta: src/asset/render_ad_mone_global.js
Řádky: 47-49
Použití v buildu: ANO (pomocná funkce pro výběr oblasti podle zařízení)
Závislosti: NE
Logická shoda: ANO
Komentář agenta: Vrací správnou oblast podle zařízení (desktop/mobil).
---------------------------------------------
*/
function resolveArea(area, device) {
  return Array.isArray(area) ? (device === "desktop" ? area[0] : area[1]) : area;
}

/*
---------------------------------------------
Blok: blok_0021d
Název: mountWrapper
Cesta: src/asset/render_ad_mone_global.js
Řádky: 51-61
Použití v buildu: ANO (vytváří wrapper pro reklamu, používán v renderCore)
Závislosti: NE
Logická shoda: ANO
Komentář agenta: Vloží HTML wrapper a vrací element a adId.
---------------------------------------------
*/
function mountWrapper(elementId, moneArea, device) {
  const element = document.getElementById(elementId);
  if (!element) return { element: null, adId: null };
  const adId = `sas_${elementId}`;
  const moneAttr = device === "desktop" ? "data-d-area" : "data-m-area";
  element.innerHTML =
    `<div class="mone_box">
       <div class="mone_header hide">reklama</div>
       <div class="sas_mone" ${moneAttr}="${moneArea}" id="${adId}"></div>
     </div>`;
  return { element, adId };
}

/*
---------------------------------------------
Blok: blok_0021e
Název: have
Cesta: src/asset/render_ad_mone_global.js
Řádky: 63-68
Použití v buildu: ANO (ověření existence cesty v objektu)
Závislosti: NE
Logická shoda: ANO
Komentář agenta: Bezpečně ověřuje existenci vnořené vlastnosti.
---------------------------------------------
*/
function have(obj, path) {
  try {
    return path.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : undefined), obj) !== undefined;
  } catch {
    return false;
  }
}

/*
---------------------------------------------
Blok: blok_0021f
Název: renderViaSas
Cesta: src/asset/render_ad_mone_global.js
Řádky: 70-77
Použití v buildu: ANO (volá SAS rendermone)
Závislosti: have
Logická shoda: ANO
Komentář agenta: Pokusí se vykreslit reklamu přes SAS, pokud je dostupné API.
---------------------------------------------
*/
function renderViaSas(area, adId) {
  if (have(window, "sas.rendermone")) {
    try {
      window.sas.rendermone({ mones: [{ id: adId, area }] });
      return true;
    } catch { }
  }
  return false;
}

/*
---------------------------------------------
Blok: blok_0021g
Název: renderViaSeznamFormats
Cesta: src/asset/render_ad_mone_global.js
Řádky: 79-116
Použití v buildu: ANO (vykresluje Seznam formáty, používáno v renderCore)
Závislosti: have, galleryState
Logická shoda: ANO
Komentář agenta: Vykresluje reklamy Seznam, včetně speciální logiky pro galerii.
---------------------------------------------
*/
function renderViaSeznamFormats(area, adId, formats, device) {
  if (!have(window, "sssp.getAds") || !have(window, "sssp.displaySeznamAds")) return false;
  if (!window.sssp.displaySeznamAds()) return false;

  const settingsBase = formats && (formats[area] || formats["halfpagead-1"]);
  if (!settingsBase) return false;

  if (area === "gallerymobilerectangle-2") {
    const mr = document.querySelector(`#${area}`);
    if (mr) {
      mr.style.width = "300px";
      mr.style.height = "300px";
    }
  }

  if (device === "desktop" && /gallery/.test(area)) {
    galleryState.count++;
    const shouldServe =
      (galleryState.count - galleryState.lastCount) === 3 ||
      galleryState.count === 1;

    if (shouldServe) {
      galleryState.lastCount = galleryState.count;
      try {
        window.sas.rendermone({ mones: [{ id: adId, area }] });
        return true;
      } catch { }
    } else {
      const slot = document.getElementById(adId);
      if (slot) slot.innerHTML = "";
      return true;
    }
  } else {
    try {
      window.sas.rendermone({ mones: [{ id: adId, area }] });
      return true;
    } catch { }
  }

  return false;
}

/*
---------------------------------------------
Blok: blok_0021h
Název: renderCore
Cesta: src/asset/render_ad_mone_global.js
Řádky: 118-140
Použití v buildu: ANO (hlavní render logika pro wrapper)
Závislosti: resolveArea, mountWrapper, renderViaSas, renderViaSeznamFormats
Logická shoda: ANO
Komentář agenta: Hlavní dispatcher pro vykreslení wrapperu a volání renderů podle preferencí.
---------------------------------------------
*/
function renderCore(areaRaw, elementId, SEZNAM_FORMATS, device, preferNew) {
  const area = resolveArea(areaRaw, device);
  const { element, adId } = mountWrapper(elementId, area, device);
  if (!element || !adId) return;

  if (preferNew) {
    if (renderViaSeznamFormats(area, adId, SEZNAM_FORMATS, device)) return;
    if (renderViaSas(area, adId)) return;
  } else {
    if (renderViaSas(area, adId)) return;
    if (renderViaSeznamFormats(area, adId, SEZNAM_FORMATS, device)) return;
  }
}


/*
---------------------------------------------
Blok: blok_0022
Název: antiadblock detekce
Cesta: src/echo24/prod/echo24_config.js
Řádky: 18-22
Použití v buildu: ANO (používá se v render_mone_global a dalších funkcích)
Závislosti: ANO (cookie.get)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří hodnotu do výsledného bundle.
Komentář agenta:
Tento blok detekuje aktivní antiadblock podle přítomnosti cookie _adb.key. Výsledek je použit v dalších funkcích pro rozhodování o preferenci SAS/Seznam renderu. Logika odpovídá buildu.
Import pouze konkrétního bloku:
// není potřeba importovat, stačí globální proměnná antiadblock
---------------------------------------------
*/
const antiadblock = cookie.get("_adb.key") !== null ? true : false;


/*
---------------------------------------------
Blok: blok_0022b
Název: window.sas_creative_render (SAS HB renderer)
Cesta: src/echo24/prod/echo24_config.js
Řádky: 26-32
Použití v buildu: ANO (voláno v SAS Partner u Header bidding SSP)
Závislosti: ANO (global_header_bidding_render)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří funkci do výsledného bundle.
Komentář agenta:
Funkce nastavuje globální renderer pro serverový HB v SASu. Při zavolání předá area do global_header_bidding_render, který rozhoduje mezi CPEX a fallback rendererem.
Import pouze konkrétního bloku:
// není potřeba importovat, stačí globální přiřazení na window
---------------------------------------------
*/
window.sas_creative_render = function (area) {
    global_header_bidding_render(area);
};

/*
---------------------------------------------
Blok: blok_0023a
Název: window.sas_s2s_creative_render (SAS S2S renderer)
Cesta: src/echo24/prod/echo24_config.js
Řádky: 34-44
Použití v buildu: ANO (voláno v sas.js při detekci json odpovědi)
Závislosti: ANO (global_s2s_render)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří funkci do výsledného bundle.
Komentář agenta:
Funkce nastavuje globální renderer pro S2S SAS integraci (Magnite, Pubmatic). Při zavolání předá params do global_s2s_render, který rozhoduje o dalším postupu (CPEX/SAS fallback). Logika odpovídá buildu.
Import pouze konkrétního bloku:
// není potřeba importovat, stačí globální přiřazení na window
---------------------------------------------
*/
/**
 * Rendrovaci funkce pro s2s SAS integraci - Magnite, Pubmatic
 * Funkce jsou volane v sas.js pri detekci json odpovedi
 * sas.js - sas_core.js - fce renderResponseIframe - sas/assets/sas_s2s_creative_render.js
 * site, posId, response, width: W, height: H, advertiser: adv
 */
window.sas_s2s_creative_render = function (params) {
    global_s2s_render(params);
};

/*
---------------------------------------------
Blok: blok_0023b
Název: window.sas_render_gam_pure_echo (Google Ads renderer)
Cesta: src/echo24/prod/echo24_config.js
Řádky: 46-51
Použití v buildu: ANO (voláno v SAS pro Google Ads)
Závislosti: ANO (gam_standard_tag_pure_echo)
Zcela logická shoda source vs build verze: ANO (viz poznámka níže)
Rozdíly v logice:
- V buildu je robustnější podmínka pro načítání googletag (viz blok_0006 poznámka).
Komentář agenta:
Funkce nastavuje globální renderer pro Google Ads (GAM). Při zavolání předá params do gam_standard_tag_pure_echo, který řeší inicializaci a vykreslení reklamy. Logika odpovídá buildu, pouze doporučuji zvážit sjednocení podmínky pro načítání googletag dle buildu (viz blok_0006).
Import pouze konkrétního bloku:
// není potřeba importovat, stačí globální přiřazení na window
---------------------------------------------
*/
/**
 *  vykreslovaci sablona volana z sas pro google ads
 * @param {*} params 
 */
window.sas_render_gam_pure_echo = function (params) {
    gam_standard_tag_pure_echo(params);
};

/*
---------------------------------------------
Blok: blok_0023c
Název: window.immInterscrollerObserve (mobilní interscroller observer)
Cesta: src/echo24/prod/echo24_config.js
Řádky: 53-58
Použití v buildu: ANO (úprava vykreslení mobilního formátu interscroller)
Závislosti: ANO (interscroller_observe)
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné, build pouze minifikuje a vnoří funkci do výsledného bundle.
Komentář agenta:
Funkce nastavuje globální observer pro mobilní interscroller. Při zavolání předá elementId do interscroller_observe, který řeší pozorování a případné úpravy reklamy. Logika odpovídá buildu.
Import pouze konkrétního bloku:
// není potřeba importovat, stačí globální přiřazení na window
---------------------------------------------
*/
/**
 * uprava vykresleni mobilniho formatu interscroller
 * @param {String} elementId 
 */
window.immInterscrollerObserve = function (elementId) {
    interscroller_observe(elementId);
};

/*
---------------------------------------------
Blok: blok_0023d
Název: window.renderAdMone (volání v galerii, halfpagead-2)
Cesta: src/echo24/prod/echo24_config.js
Použití v buildu: ANO (voláno v galerii při listování mezi fotkami)
Závislosti: ANO (render_mone_global)
Komentář agenta:
Globální funkce pro dynamické vložení reklamní pozice v galerii.
Zjednodušeno — render_mone_global nyní přijímá jen (area, elementId).
hbAdUnit parametr zachován v signatuře pro zpětnou kompatibilitu
(galerie může volat s 3 argumenty), ale ignorován.
---------------------------------------------
*/
/**
 * volani v galerii pri listovani mezi fotkami, dodatecne vlozeni pozice - halfpagead-2
 */
window.renderAdMone = function (area, elementId, hbAdUnit = null) {
    render_mone_global(area, elementId);
};

/*
---------------------------------------------
Blok: blok_0023e
Název: init_iprima_ads (hlavní inicializace reklamního systému)
Cesta: src/echo24/prod/echo24_config.js
Řádky: 69-227
Použití v buildu: ANO (hlavní inicializační funkce pro reklamy)
Závislosti: ANO (gdpr, load_script, init_cpex_header_bidding, call_adserver, add_nonstandard_mone, render_mone_global, SAS_KEYWORDS, SAS_SECTION, sas_lib, R2B2_HB_SCRIPT [volitelný — blok_source_0002], adUnitsSZN [volitelný — blok_source_0001])
Zcela logická shoda source vs build verze: ANO
Rozdíly v logice:
- Žádné zásadní, build pouze minifikuje a vnoří funkce do výsledného bundle.
Komentář agenta:
Funkce init_iprima_ads je hlavní entrypoint pro inicializaci reklamního systému na stránce. Řeší detekci antiadblocku, načítání knihoven, přepínání mezi CPEX/SAS/Seznam, správu consentu a volání hlavních renderovacích funkcí. Všechny závislosti jsou globální nebo importované. Logika odpovídá buildu.
Import pouze konkrétního bloku:
// není potřeba importovat, stačí globální definice
---------------------------------------------
*/
/**
 * hlavni inicializacni funkce pro volani reklamniho systemu
 */
async function init_iprima_ads(_consent) {
    /*
     * runtimeConfig – konfigurace CPEX bridge a načítání balíčků.
     * Dříve se hodnoty četly z URL parametrů (cpexhb, cpxdebug, stagePackage, stageSetPub, stageSetWeb).
     * Nyní hardcodováno: CPEX bridge je vždy zapnutý, produkční CDN a .min.js.
     * Pro debug/stage stačí dočasně změnit hodnoty níže.
     */
    const runtimeConfig = {
        enableCpexBridge: true,
        cpexDebug: true,
        packageStage: true,
        publisherSettingsStage: false,
        websiteSettingsStage: false,
    };

    overwrite_sas_mone();
    /**
     * fix odstraneni containeru pro mobilni rozliseni
     */
    fix_mobile_skyscrapper();
    /**
     * test prechodu z naseho na cpex header bidding
     */
    if (runtimeConfig.enableCpexBridge) {
        init_cpex_header_bidding(
            _consent,
            false,
            call_adserver,
            (typeof R2B2_HB_SCRIPT !== 'undefined') ? R2B2_HB_SCRIPT : '',
            'https://cdn.cpex.cz/settings/' + (runtimeConfig.publisherSettingsStage ? 'stage' : 'production') + '/iprima.js',
            'https://cdn.cpex.cz/settings/' + (runtimeConfig.websiteSettingsStage ? 'stage' : 'production') + '/iprima/echo24.cz.js',
            'https://cdn.cpex.cz/' + (runtimeConfig.packageStage ? 'stage/' : '') + 'package/prima2/cpex-package' + (runtimeConfig.cpexDebug ? '.js' : '.min.js')
        );
        return; 
    }

    // Mrtvý kód po return; (antiadblock check, SSSP loading, Seznam detekce, init_header_bidding) ODSTRANĚN.
    // S enableCpexBridge=true se nikdy nespustil.
    // Archivován v Nepotrebne_bloky_v_echo24.js jako spare_0010.

    /*
    ---------------------------------------------
    Blok: blok_0023f
    Název: build_seznam_adserver_context
    Cesta: src/echo24/prod/echo24_config.js
    Řádky: odvozeno z call_adserver
    Použití v buildu: ANO (logika byla součástí call_adserver)
    Závislosti: ANO (window.innerWidth, sas)
    Zcela logická shoda source vs build verze: ANO
    Rozdíly v logice:
    - Žádné, logika pouze oddělena do samostatného bloku pro lepší skládání.
    Komentář agenta:
    Blok řeší pouze Seznam-specifickou část adserver kontextu: přepnutí section na seznam_* a omezení povolených sizes přes sas.setareas. Cílem je oddělit provider-specifické chování od obecného SAS volání.
    ---------------------------------------------
    */
    function build_seznam_adserver_context(seznam_traffic, breakpoint, baseSection) {
        let section = baseSection;
        if (seznam_traffic === true) {
            section = window.innerWidth < breakpoint ? "seznam_mobile" : "seznam_desktop";
            sas.setareas({
                "mobilerectangle-1": "320x100,500x200,native",
            });
        }
        return { section };
    }

    /*
    ---------------------------------------------
    Blok: blok_0023g
    Název: call_sas_adserver
    Cesta: src/echo24/prod/echo24_config.js
    Řádky: odvozeno z call_adserver
    Použití v buildu: ANO (logika byla součástí call_adserver)
    Závislosti: ANO (sas, add_nonstandard_mone, SAS_KEYWORDS, SAS_SECTION, DOM API)
    Zcela logická shoda source vs build verze: ANO
    Rozdíly v logice:
    - Žádné, logika pouze oddělena do samostatného bloku pro lepší skládání.
    Komentář agenta:
    Blok řeší obecné SAS volání: doplnění nonstandard pozic, volání sas.loadmone a emptyAds fallback. Neobsahuje Seznam-specifická rozhodnutí, ta jsou vyčleněna do build_seznam_adserver_context.
    ---------------------------------------------
    */
    function call_sas_adserver(_consent, adserverContext) {
        const site = "IMM_Echo24";
        const breakpoint = 768;
        const device = window.innerWidth < breakpoint ? "mobil" : "desktop";
        const keywords = (typeof SAS_KEYWORDS !== 'undefined') ? SAS_KEYWORDS : '';
        const branding = true;

        add_nonstandard_mone(adserverContext.seznam_traffic);

        // Vyloučit lazyload pozice z počátečního SAS loadmone
        lazyloadExcludeFromLoad();

        sas.loadmone({
            "site": site,
            "device": device,
            "section": adserverContext.section,
            "keyword": keywords,
            "branding": branding,
            "bgWidth": breakpoint,
            "cookie": _consent.enableCookies,
            "tcstring": _consent.tcString,
        });

        sas.emptyAds = function (id, area) {
            document.querySelector(`#${id}`).parentElement.style.display = 'none';
            // Pozice je prázdná (SAS neměl ani šablonu) → označit pro preventivní reload
            if (area && RELOAD_POSITIONS[area] !== undefined && !reloadState.emptyPositions.has(area)) {
                reloadState.emptyPositions.add(area);
                logSetChange(_RELOAD_CHECK_PREFIX + '[emptyPositions]', Array.from(reloadState.emptyPositions));
            }
        };

        // Inicializovat lazyload observery po SAS loadmone
        lazyloadInit();

        // Detekce reálného vykreslení — MutationObserver na všech .sas_mone
        observeRealRenders();

        var _initReloadAreas = [];
        var _w = window.innerWidth;
        for (var _a in RELOAD_POSITIONS) {
            if (getEffectiveReloadLimit(_a) <= 0) continue;
            // Kontrola breakpointu — mobile pozice na desktopu (a naopak) přeskočit
            var _bp = RESPONSIVE_BREAKPOINTS[_a];
            if (_bp) {
                if (_bp.minWidth !== undefined && _w < _bp.minWidth) continue;
                if (_bp.maxWidth !== undefined && _w > _bp.maxWidth) continue;
            }
            // Ověřit DOM existenci — pozice může mít normální atribut nebo dočasný lazyload atribut
            var _el = document.querySelector(
                '.sas_mone[data-d-area="' + _a + '"], ' +
                '.sas_mone[data-m-area="' + _a + '"], ' +
                '.sas_mone[data-lazyload-area="' + _a + '"]'
            );
            if (_el) _initReloadAreas.push(_a);
        }
        console.log('[START - odesláno do CPEXu]', _initReloadAreas.length === 0 ? '(prázdná množina)' : _initReloadAreas.join(', '));

        // Spustit reload cyklus po prvním renderování
        startReloadCycle();
    }

    function call_adserver(_consent, seznam_traffic = false) {
        const breakpoint = 768;
        let section = window.innerWidth < breakpoint ? "mobile" : "desktop";
        section = (typeof SAS_SECTION !== 'undefined') ? SAS_SECTION : section;

        const seznamContext = build_seznam_adserver_context(seznam_traffic, breakpoint, section);

        call_sas_adserver(_consent, {
            seznam_traffic,
            section: seznamContext.section
        });
    }
};
gdpr(init_iprima_ads);
})();
