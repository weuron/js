/* Version: I_01 - 21.06. 2026 - 23:28:58 */
/*archiveName: IPIDsetup_echo24cz_Default_1_2026_06_21_2328*/

/* Default SETTINGS */
// --- ZAČÁTEK BLOKU weuron_config (POUZE PROMĚNNÉ) ---
var WEURON_DOMAIN = 'echo24.cz';
/**
 * WEB_MODE řídí, zda řešení očekává klasický web (každá stránka = nové načtení) nebo SPA (Single Page Application), kde se obsah mění bez reloadu prohlížeče.
 * 
 * - classic (výchozí): standardní chování, init proběhne jednou při načtení stránky.
 * - spa: řešení sleduje SPA navigaci a při změně "stránky" znovu inicializuje reklamní pozice (viz SPA_RELOAD_MODE).
 * 
 * Většina webů iPrima portfolia je classic. SPA volte jen pokud web skutečně nemění URL/obsah bez reloadu.
 */
var WEB_MODE = 'classic';
/**
 * SPA_RELOAD_MODE má smysl pouze při WEB_MODE = 'spa'. Určuje rozsah re-inicializace při SPA navigaci (změna obsahu bez reloadu stránky):
 * 
 * - sas (výchozí): při SPA přechodu se znovu zavolá pouze SAS adserver (přímé kampaně).
 * - sas+cpex: při SPA přechodu se re-inicializuje i CPEX header-bidding aukce.
 * 
 * Při WEB_MODE = 'classic' se tato hodnota ignoruje.
 */
var SPA_RELOAD_MODE = 'sas';
/**
 * RELOAD_INTERVAL_MS je globální interval automatického reloadingu reklamních pozic, v milisekundách.
 * 
 * - Výchozí: 30000 (30 s).
 * - Doporučené minimum: 20000 (20 s) — kratší interval zvyšuje riziko nedokoukání kreativ a může být v rozporu s pravidly inzerentů.
 * - Konkrétní pozice lze z reloadingu vyřadit (RELOAD_POSITIONS = 0) nebo jim dát vlastní interval (MULTIPLE_RELOAD_INTERVAL).
 */
var RELOAD_INTERVAL_MS = 30000;
/**
 * MULTIPLE_RELOAD_INTERVAL umožní nastavit ODLIŠNÝ reload interval (v ms) pro vybrané pozice. Přepisuje globální RELOAD_INTERVAL_MS jen pro uvedené pozice.
 * 
 * Formát výsledku: { 'area': intervalMs, ... }
 * Prázdné = všechny pozice používají RELOAD_INTERVAL_MS.
 * 
 * Příklad: mobilerectangle-2 = 45000 (tato pozice se reloaduje po 45 s, ostatní po globálním intervalu).
 */
var MULTIPLE_RELOAD_INTERVAL = {};
/**
 * RELOAD_POSITIONS řídí reloading per pozici. Hodnota:
 * - 1 = pozici reloaduj,
 * - 0 = pozici z reload cyklu trvale vyřaď (např. pozice s privilegovaným 3rd-party autorefreshem nebo formáty, které se nesmí překreslovat).
 * 
 * Formát výsledku: { 'area': 0|1, ... }
 * Pozice neuvedená v mapě = řídí se výchozím chováním řešení.
 */
var RELOAD_POSITIONS = {};
/**
 * RELOADING_MODE volí globální strategii reload cyklu:
 * 
 * - hard (výchozí): v každém cyklu se reloadují všechny způsobilé pozice.
 * - selective: reloadují se jen pozice splňující dodatečná pravidla.
 * - economical: úsporný režim — reloadují se typicky jen pozice ve viewportu (viewability), šetří imprese a výkon.
 * 
 * Volbu kombinujte s RELOAD_POSITIONS / RELOAD_CAPPING dle požadavků webu a inzerentů.
 */
var RELOADING_MODE = 'hard';
/**
 * RELOAD_MAX_CYCLES je výchozí strop počtu reloadů jedné pozice na dané stránce (frequency cap).
 * 
 * - Výchozí: 15.
 * - Po dosažení limitu se pozice přestane automaticky reloadovat.
 * - Tvrdý absolutní strop přes všechny mechanismy hlídá RELOAD_MAX_CYCLES_HARD_CAP.
 * - Per-pozice override lze nastavit v RELOAD_CAPPING.
 */
var RELOAD_MAX_CYCLES = 15;
/**
 * RELOAD_MAX_CYCLES_HARD_CAP je absolutní bezpečnostní strop počtu reloadů jedné pozice, který NELZE překročit žádným jiným nastavením (ani RELOAD_CAPPING, ani RELOAD_MAX_CYCLES).
 * 
 * - Výchozí: 100.
 * - Slouží jako pojistka proti nekonečnému reloadingu při chybné konfiguraci.
 */
var RELOAD_MAX_CYCLES_HARD_CAP = 100;
/**
 * RELOAD_CAPPING nastavuje maximální počet reloadů (frequency cap) pro KONKRÉTNÍ pozice — přepíše globální RELOAD_MAX_CYCLES jen pro uvedené pozice.
 * 
 * Formát výsledku: { 'area': maxCyklu, ... }
 * Vždy platí absolutní strop RELOAD_MAX_CYCLES_HARD_CAP.
 * Prázdné = všechny pozice používají RELOAD_MAX_CYCLES.
 */
var RELOAD_CAPPING = {};
/**
 * RENDERING_AND_RELOADING_ALWAYS je výčet pozic, které se mají renderovat a reloadovat VŽDY — nezávisle na viewability gate a úsporných režimech (economical).
 * 
 * Formát výsledku: Set pozic ([ 'area', ... ]).
 * Používejte střídmě — pozice zde uvedené generují imprese i mimo viewport.
 * Prázdné = žádná výjimka (doporučené).
 */
var RENDERING_AND_RELOADING_ALWAYS = new Set([]);
/**
 * RELOAD_SKIP_CLEAR_POSITIONS — pozice, u kterých se před reloadem NIKDY nezavolá cpexPackage.clearAds().
 * 
 * VÝCHOZÍ (prázdné) = AUTOMATICKÁ DETEKCE: řešení samo pozná, zda pozice obsahuje custom format (Skin/Slideup/Interscroller/Outstream/Vignette) a clearAds() zavolá jen tam, kde je potřeba.
 * 
 * KDY DOPLNIT (emergency override): pozice má custom format, ale potvrzeně víme, že nový render správně přepíše starý overlay; nebo pro diagnostiku.
 * 
 * RIZIKO: u pozice s aktivním overlay/custom formátem může nový render přijít VEDLE starého (dva formáty přes sebe). Prázdné = doporučené.
 */
var RELOAD_SKIP_CLEAR_POSITIONS = new Set([]);
/**
 * RELOAD_BEFORE_FNS je registr kontrolních funkcí, které se spustí PŘED každým reloadem. Každá funkce v poli se zavolá v každém reload cyklu.
 * 
 * Formát: JS pole funkcí, např.:
 * [
 *   function resetStickyBanner() {
 *     var el = document.querySelector('.sticky-banner');
 *     if (el) el.style.display = 'none';
 *   }
 * ]
 * 
 * Protože jde o spustitelný JS kód, zadává se jako textová oblast (textarea). Prázdné [] = žádné kontrolní funkce.
 */
var RELOAD_BEFORE_FNS = [];
/**
 * CUSTOM_RESOURCES umožňuje per-web vložit externí .css / .js zdroje nebo inline kód, aniž by se měnil sdílený cleaned.js.
 * 
 * Schéma jednoho záznamu (pole objektů):
 * {
 *   id:     'unique-tag',        // idempotenční klíč (duplicitní id se přeskočí)
 *   type:   'css' | 'js',
 *   source: 'url' | 'inline',
 *   value:  '<URL nebo kód>',
 *   where:  'head' | 'body-end' | { selector:'#foo', position:'before|after|append|prepend' },
 *   when:   'asap' | 'DOMContentLoaded' | 'after-cmp-consent' | 'after-cleaned-init' | 'after-first-render' | { delay_ms: 1500 },
 *   condition: function(){ return true; },   // volitelný gate
 *   attrs:  { 'data-x': '1' }                // volitelné atributy tagu
 * }
 * 
 * Prázdné [] = žádný injekt (chování webu beze změny).
 */
var CUSTOM_RESOURCES = [];
/**
 * PRIVILEGED_SOURCE_AREAS je výčet pozic, u kterých řešení při prvním renderu skenuje DOM na podpis privilegovaného 3rd-party zdroje (R2B2 nebo Performax s vlastní reloading logikou). Při detekci:
 * - uloží evidenci zdroje,
 * - nastaví RELOAD_POSITIONS[area] = 0 (vyřadí pozici z našeho reload cyklu),
 * - odstraní #cpex-slideup (prevence konfliktu dvou sticky prvků).
 * 
 * Detekce běží POUZE pro pozice uvedené zde. Echo24: jediná pozice mobilerectangle-1 (mobilní popup/branding). Prázdné [] = detekce vypnuta.
 */
var PRIVILEGED_SOURCE_AREAS = ["mobilerectangle-1"];
/**
 * TAG_CAMPAIGN_RELOAD_STOP plošně vyřazuje větev „Tag campaign" z reloadingu.
 * 
 * - Ano (true): z reloadingu se vyřadí KAŽDÁ pozice z větve „Tag campaign" (bezpečné odstavení, dokud nemáme kompletní výčet vzorů).
 * - Ne (false): tag-campaign větev se plošně NEvyřazuje; vyřadí se jen pozice, jejichž obsah matchne TAG_CAMPAIGN_EXCLUDE_PATTERNS.
 * 
 * Echo24: domluveno false — náš centrální reloading může být nadřazený reloading logice tagových kampaní.
 */
var TAG_CAMPAIGN_RELOAD_STOP = false;
/**
 * TAG_CAMPAIGN_EXCLUDE_PATTERNS — per-pozice regex testovaný na OBSAH kreativy (HTML string) z větve „Tag campaign".
 * 
 * Formát výsledku: { 'area': '<regex>', ... }
 * Když obsah kreativy na dané pozici matchne svůj vzor → pozice se vyřadí z reloadingu NEZÁVISLE na TAG_CAMPAIGN_RELOAD_STOP (funguje i když je STOP = Ne).
 * 
 * Vzor zadávejte jako tělo regulárního výrazu (např. adform.*reload|data-own-refresh nebo cdn\.agentura\.cz/autorefresh). Sem patří konkrétní rozpoznávací vzory (URL skriptu, ID elementu, data-atribut…).
 */
var TAG_CAMPAIGN_EXCLUDE_PATTERNS = {};
/**
 * LAZYLOAD_POSITIONS odkládá pouze samotné VYKRESLENÍ kreativy do DOM (lazy rendering) — NEODKLÁDÁ HB aukci ani SAS rozhodnutí (ty proběhnou vždy okamžitě pro všechny pozice).
 * 
 * Tři režimy (mode):
 * - viewport: IntersectionObserver; render při viditelnosti `threshold` (0–1) plochy pozice (0.25 = 25 %).
 * - scroll: scroll listener; render po odscrollování `threshold` (0–1) celkové výšky stránky (0.5 = 50 %).
 * - pixel: render když je pozice max `threshold` PIXELŮ od vstupu do viewportu (300 = 300 px předem).
 * 
 * Formát výsledku: { 'area': { threshold: N, mode: 'viewport|scroll|pixel' } }
 * Pozice neuvedená = renderuje se okamžitě. Lazyload se aplikuje jen na PRVNÍ vykreslení (reload cyklus běží nezávisle). Prázdné {} = lazyloading vypnut.
 */
var LAZYLOAD_POSITIONS = {"halfpagead-2":{"threshold":0.25,"mode":"viewport"},"halfpagead-3":{"threshold":300,"mode":"pixel"},"boardbottom-1":{"threshold":0.5,"mode":"scroll"}};
/**
 * RESPONSIVE_BREAKPOINTS je per-pozice filtr šířky okna POUZE pro naši CPEX HB aukci (matchesDevice()). Na přímé SAS kampaně nemá vliv.
 * 
 * ⚠️ ZÁMĚRNĚ ZPRAVIDLA PRÁZDNÉ ({}). Šířkový filtr aukce už dělá CPEX config (per-adUnit filter, spravuje Jana) — duplikace sem = riziko rozjetí dvou konfigurací. matchesDevice() má navíc fallback podle názvu pozice ("mobile" → mobilní).
 * 
 * Kdy výjimečně doplnit:
 * (A) provider-agnostic vrstva (napojení jiného HB řešení bez obdoby CPEX filtru),
 * (B) okamžitý lokální override / nouzový hotfix proti CPEX configu.
 * 
 * Formát výsledku: { 'area': { minWidth: N, maxWidth: M } } — pozice se aukcuje jen v daném rozsahu šířky.
 */
var RESPONSIVE_BREAKPOINTS = {};
/**
 * DEVICE_BREAKPOINT je globální breakpoint (px) pro rozlišení mobil vs desktop. Musí být > 0. Echo24: 768 (odpovídá CSS body min-width).
 * 
 * Používá se na 4 místech: výpočet SAS parametrů device/section, vkládání nonstandard pozic (interstitial/strip/slideup), CPEX HB filtr (matchesDevice), fallback v seznam adserver kontextu.
 * 
 * Odvozuje se z něj: isMobile = window.innerWidth < DEVICE_BREAKPOINT → device = 'mobil'|'desktop', section = 'mobile'|'desktop'. V cleaned.js jsou device i section vždy konzistentní (obě z DEVICE_BREAKPOINT).
 */
var DEVICE_BREAKPOINT = 768;
/**
 * CPEX_ENABLED zapíná CPEX Header Bidding bridge.
 * 
 * - Ano (true): používat CPEX Header Bidding — standardní provoz.
 * - Ne (false): CPEX se nenačte, reklamy se obslouží pouze přes SAS adserver (fallback).
 * 
 * Pozn.: matchesDevice() (RESPONSIVE_BREAKPOINTS) se dnes volá jen uvnitř CPEX handleru — při CPEX_ENABLED = Ne se HB aukce nekoná.
 */
var CPEX_ENABLED = true;
/**
 * CPEX_DEBUG přepíná mezi debug a produkční verzí CPEX package.
 * 
 * - Ano (true): cpex-package.js — neminifikovaný, s console logy (vývoj/ladění).
 * - Ne (false): cpex-package.min.js — produkční, tichý.
 * 
 * Produkce echo24: Ne.
 */
var CPEX_DEBUG = false;
/**
 * CPEX_PACKAGE_STAGE volí CDN prostředí pro CPEX package.
 * 
 * - Ano (true): stage CDN (testovací verze balíčku).
 * - Ne (false): produkční CDN.
 * 
 * Produkce echo24: Ne.
 */
var CPEX_PACKAGE_STAGE = false;
/**
 * CPEX_PUBLISHER_STAGE volí prostředí pro publisher settings na CDN.
 * 
 * - Ano (true): stage (testovací publisher settings).
 * - Ne (false): production.
 */
var CPEX_PUBLISHER_STAGE = false;
/**
 * CPEX_WEBSITE_STAGE volí prostředí pro website settings na CDN.
 * 
 * - Ano (true): stage (testovací website settings).
 * - Ne (false): production.
 */
var CPEX_WEBSITE_STAGE = false;
/**
 * CPEX_PUBLISHER_ID je identifikátor publishera na CDN CPEXu.
 * 
 * Odpovídá cestě: cdn.cpex.cz/settings/{env}/{CPEX_PUBLISHER_ID}.js
 * Výchozí: 'iprima' — společné pro všechny weby v portfoliu iPrima.
 */
var CPEX_PUBLISHER_ID = 'iprima';
/**
 * CPEX_SITE_ID je identifikátor webu na CDN CPEXu.
 * 
 * Odpovídá cestě: cdn.cpex.cz/settings/{env}/{CPEX_PUBLISHER_ID}/{CPEX_SITE_ID}.js
 * Příklady: 'echo24.cz', 'cool.cz', 'cnn.prima.cz'.
 * 
 * Na iPrima webech se CPEX site shoduje s doménou (WEURON_DOMAIN). Nech prázdné = odvodí se z domény. Vyplň literál jen pokud se na daném webu CPEX site liší od domény.
 */
var CPEX_SITE_ID = (typeof WEURON_DOMAIN !== 'undefined' && WEURON_DOMAIN) ? WEURON_DOMAIN : 'undefined';
/**
 * CPEX_PACKAGE_PATH je identifikátor (branch/stage segment) balíčku na CDN.
 * 
 * Odpovídá cestě: cdn.cpex.cz/{stage/}package/{CPEX_PACKAGE_PATH}/cpex-package{.js|.min.js}
 * 
 * - Prázdné ('') = segment se vynechá → produkční balíček v kořeni: cdn.cpex.cz/package/cpex-package.min.js.
 * - Neprázdné ('refactoring' apod.) = vloží branch/stage segment.
 * 
 * Produkce echo24 (od 11. 6. 2026): prázdné.
 */
var CPEX_PACKAGE_PATH = '';
/**
 * CPEX_TEST_CONFIG umožní použít alternativní CPEX website settings.
 * 
 * - URL = libovolná adresa JS souboru s window.cpexWebsiteSettings (testování jiné HB konfigurace).
 * - Prázdné = nepoužívat (standardní config z CDN).
 * 
 * Příklad: https://hb.impressionmedia.cz/administrace/cpex/echo24.cz_test.js
 */
var CPEX_TEST_CONFIG = '';
/**
 * CPEX_TEST_PACKAGE umožní použít alternativní URL pro cpex-package.js.
 * 
 * - URL = libovolná adresa cpex-package.js (lokální/testovací verze). Přepíše URL sestavenou z CPEX_PACKAGE_PATH + CPEX_PACKAGE_STAGE.
 * - Prázdné = nepoužívat (standardní package z CDN).
 * 
 * Příklad: https://hb.impressionmedia.cz/tmp/echo24/cpex-package_V_6_0_3.js
 */
var CPEX_TEST_PACKAGE = '';
/**
 * SEZNAM_TRAFFIC_CROS_WEB_PORTFOLIO_BEHAVIOR řídí chování při Seznam-trafficu, pokud web obsahuje odkazy na jinou doménu z našeho portfolia (viz SEZNAM_PORTFOLIO_HOSTNAMES).
 * 
 * - rewrite (doporučeno, výchozí): odkazům na portfolio domény přepíše href a doplní UTM (utm_source=www.seznam.cz, utm_medium=seznam_distribuce, utm_campaign, szn-session), aby Seznam uznal cross-portfolio proklik. Patička zůstává v DOM.
 * - remove: cross-portfolio odkazy neutralizuje (href='#') a hostitelský prvek skryje (imituje legacy hide_all_cross_footer, ale per-link).
 * - none (bezpečný no-op): žádný zásah — pro weby bez cross-portfolio odkazů (echo24) nebo při debugu.
 * 
 * Neplatná hodnota = fail-safe 'none'.
 */
var SEZNAM_TRAFFIC_CROS_WEB_PORTFOLIO_BEHAVIOR = 'rewrite';
/**
 * SEZNAM_PORTFOLIO_HOSTNAMES je výčet hostname (bez schématu) domén portfolia FTV Prima, mezi kterými uživatel při Seznam-trafficu přechází.
 * 
 * Formát výsledku: pole stringů ([ 'echo24.cz', 'hrot24.cz', ... ]).
 * Match je case-insensitive a funguje i přes subdoménu (cool.iprima.cz zachytí i www.cool.iprima.cz). Hostname AKTUÁLNÍ stránky se z výběru implicitně vylučuje.
 * 
 * NENÍ to detekční brána Seznam-trafficu (detekce je doménově nezávislá) — slouží jako seznam cílů pro UTM rewrite / remove dle SEZNAM_TRAFFIC_CROS_WEB_PORTFOLIO_BEHAVIOR. Doménu zařaďte, pokud na ni jiné Seznam-aware weby cross-linkují.
 */
var SEZNAM_PORTFOLIO_HOSTNAMES = ["echo24.cz","hrot24.cz"];
/**
 * HIDE_POSITIONS_BY_WIDTH odebere pozici z DOM PŘED voláním sas.loadmone (a před HB aukcí) podle šířky viewportu. SAS pozici nenajde → nevyplní; HB aukce pro ni neproběhne.
 * 
 * Formát výsledku: { 'area': { minWidth: N, maxWidth: M } }
 * - minWidth: N → odebrat když window.innerWidth < N (vyloučit na UŽŠÍCH zařízeních),
 * - maxWidth: N → odebrat když window.innerWidth > N (vyloučit na ŠIRŠÍCH zařízeních),
 * - kombinace { minWidth:768, maxWidth:1079 } → odebrat jen v rozsahu 768–1079 px (tablety).
 * 
 * Typické použití: skrýt 970px formáty (leaderboard-1, boardbottom-1) na tabletu. POZOR: odebrání je nevratné pro celou životnost stránky (není reload-aware). Prázdné {} = beze změny.
 */
var HIDE_POSITIONS_BY_WIDTH = {};
/**
 * REWRITE_POSITIONS_BY_WIDTH přepíše atribut pozice (data-d-area / data-m-area) na jinou hodnotu PŘED sas.loadmone — místo smazání elementu (HIDE). Slot zůstane v DOM a SAS ho obsadí náhradním formátem.
 * 
 * Formát výsledku: { 'from-area': { to: 'target-area', minWidth: N, maxWidth: M } }
 * Atribut se odvozuje z názvu: /mobile/ → data-m-area, jinak data-d-area (pro FROM i TO).
 * 
 * KLÍČOVÉ PRAVIDLO: směr přepisu musí odpovídat DEVICE_BREAKPOINT — data-d→data-m funguje jen kde device='mobil' (viewport < breakpoint), data-m→data-d jen kde device='desktop'. Porušení = tichý bug (prázdný slot).
 * 
 * TO area musí mít odpovídající záznam v RESPONSIVE_BREAKPOINTS pro CPEX. KONFLIKT: stejná FROM area nesmí být zároveň v HIDE_POSITIONS_BY_WIDTH pro překrývající se rozsah. Prázdné {} = beze změny.
 */
var REWRITE_POSITIONS_BY_WIDTH = {};
/**
 * BRANDING_MIN_WIDTH je minimální šířka viewportu (px) pro zapnutí PC brandingu v sas.loadmone (parametr branding:true).
 * 
 * - číslo > 0 → branding=true POUZE když window.innerWidth >= N (pod tím branding=false).
 * - 0 (nebo false) → branding vždy true (původní hardcoded chování).
 * 
 * Důvod: PC branding (Wallpaper/Skin 2000×1400) je position:fixed za obsahem; na užších zařízeních (~pod 1380 px) jsou krajové pásy oříznuté → inzerenti to neuznávají. Produkce echo24/CNN: 1380.
 */
var BRANDING_MIN_WIDTH = 768;
/**
 * SAS_SITE_BY_DOMAIN je mapa doména (WEURON_DOMAIN) → SAS „site", která se posílá do sas.loadmone({ site }).
 * 
 * Formát výsledku: { 'echo24.cz': 'IMM_Echo24', ... }
 * 
 * Dvojí role SAS „site":
 * 1) PRIMÁRNÍ — identifikuje web vůči SAS adserveru.
 * 2) SEKUNDÁRNÍ — klíčuje per-web sadu rozměrů v area_size_mapping (priorita: priority > area_size_mapping[site] > default). Vlastní sekci má jen 7 webů (NaKluky, Playzone, Prima_DOMACZ/DOMATV/RADY/NAPADY, Ceskykutil); ostatní → 'default'.
 * 
 * DŮLEŽITÉ: doména webu MUSÍ mít v mapě řádek — jinak SAS_SITE zůstane prázdný a řešení se NEROZBĚHNE (záměrný fail-safe). Hodnoty jsou převzaté 1:1 z prod konfigů jednotlivých webů.
 */
var SAS_SITE_BY_DOMAIN = {"echo24.cz":"IMM_Echo24","nakluky.cz":"NaKluky","ceskykutil.cz":"Ceskykutil","playzone.cz":"Playzone","primadoma.cz":"Prima_DOMACZ","primadoma.tv":"Prima_DOMATV","primarady.cz":"Prima_RADY","primanapady.cz":"Prima_NAPADY","autoweb.cz":"Autoweb","radiobeat.cz":"RadioBeat","cnn.iprima.cz":"Prima_CNN","cool.iprima.cz":"Prima_COOL","lajk.iprima.cz":"Prima_COOL","countryradio.cz":"CountryRadio","fachmani.cz":"Fachmani","fotrnatripu.tv":"Fotrnatripu","fresh.iprima.cz":"Prima_FRESH","hrot24.cz":"IMM_Hrot24","iprima.cz":"iPrima","kiss.cz":"Kiss","living.iprima.cz":"Prima_LIVING","mzone.cz":"Mzone","radio1.cz":"Radio1","signalradio.cz":"SignalRadio","spinradio.cz":"RadioSpin","zahradkarskaporadna.cz":"Zahradkarskaporadna","zeny.iprima.cz":"Prima_ZENY","zoom.iprima.cz":"Prima_ZOOM"};
/**
 * SAS_EMBEDDED přepíná mezi externím sas.js (CDN Primy) a embedded verzí (součást generovaného souboru).
 * 
 * - Ano (true, výchozí): sas.js je embedded — žádný HTTP request, synchronní inicializace, přímý přístup k area_size_mapping pro výpočet SIZE_RESTRICTIONS_BY_WIDTH (sas.setareas bez fallback tabulky).
 * - Ne (false): sas.js se loaduje asynchronně z CDN — standardní chování s HTTP requestem; SAS si pak bere VLASTNÍ tabulku rozměrů z CDN.
 * 
 * Při SAS_EMBEDDED = Ne má area_size_mapping vliv jen na applySizeRestrictionsByWidth.
 */
var SAS_EMBEDDED = true;
/**
 * SAS_URL_KEYWORD_PARAMS je whitelist URL parametrů propagovaných do SAS keywords. Každý parametr přítomný v URL stránky (location.search) se přidá jako standalone hodnota do keyword stringu SAS requestu.
 * 
 * Formát výsledku: pole stringů ([ 'debugssp', ... ]).
 * 
 * Proč whitelist a ne automatické přeposílání všech params: sas.js interně generuje keyword regexem, který spojí parametry dohromady (žádný není standalone); a přeposílání všech params je riskantní (pbjs_debug, UTM, session tokeny by mohly matchovat SAS pravidla nebo odhalit PII). Přidávej jen parametry s přímou SAS targeting sémantikou (např. debugssp aktivuje SAS flight pro šablonu 599).
 */
var SAS_URL_KEYWORD_PARAMS = ["debugssp","sas_template_direct_567","sas_template_direct_568","sas_template_direct_569","s2s_simulace"];
/**
 * SIZE_RESTRICTIONS_BY_WIDTH filtruje konkrétní formáty per pozici per rozsah šířky. Platí SOUČASNĚ pro:
 * A) HB aukci — removeSizes se odeberou z mediaTypes.banner.sizes PŘED runAuction() (biddeři na ně nenabídnou),
 * B) přímé SAS kampaně — sas.setareas(map) PŘED sas.loadmone() (ad server nevybere oversized kreativu).
 * 
 * Formát výsledku: { 'area': { removeSizes: [[w,h], ...], minWidth: N, maxWidth: M } }
 * - removeSizes: pole [šířka, výška] párů k odebrání,
 * - minWidth: viewport >= N → omezení aktivní (inclusive),
 * - maxWidth: viewport <= M → omezení aktivní (inclusive).
 * 
 * Echo24 (problém 970px / oversized formátů na tabletu 768–1061 px): wallpaper-1 odebírá 480×300 a 336×280. Pozici i odebírané formáty skládejte z nabídek (formáty viz area_size_mapping), aby nedošlo k překlepům. Prázdné {} = žádné omezení.
 */
var SIZE_RESTRICTIONS_BY_WIDTH = {"wallpaper-1":{"removeSizes":[[336,280],[480,300]],"minWidth":768,"maxWidth":1061}};
/**
 * area_size_mapping je tabulka povolených rozměrů per area (pozice) per web (SAS „site").
 * 
 * Zdroj pravdy: src/echo24/dev/SAS/sas_mone_area_sizes.js. Používá ji: embedded SAS (při SAS_EMBEDDED = Ano) jako živá tabulka rozměrů a applySizeRestrictionsByWidth pro výpočet SIZE_RESTRICTIONS_BY_WIDTH.
 * 
 * Struktura (priorita rozměrů: priority > per-web sekce > default):
 * - 'default' — výchozí rozměry (echo24 = SAS „site" 'IMM_Echo24' nemá vlastní sekci → 'default'),
 * - 'priority' — runtime override (sas.setareas), needitovat ručně,
 * - per-web ('NaKluky', 'Playzone', 'Prima_DOMACZ' …) — aktivní podle SAS_SITE.
 * 
 * Toto je jediná složitá proměnná, kterou lze zadat jako textový JSON (textarea). Při změně kontrolujte shodu vůči sas_mone_area_sizes.js.
 */
var area_size_mapping = {
    "default": {
        "boardbottom-1": "728x90,970x210,970x90,960x200,960x210,970x310,970x250",
        "brandingplayeru-1": "2000x393",
        "galleryhalfpagead-1": "300x600,300x300,300x250,120x600,160x600",
        "galleryhalfpagead-2": "300x600,300x300,300x250,120x600,160x600",
        "halfpagead-1": "300x600,300x300,300x250,120x600,160x600",
        "halfpagead-2": "300x600,300x300,300x250,120x600,160x600",
        "halfpagead-3": "300x600,300x300,300x250,120x600,160x600",
        "halfpagead-4": "300x600,300x300,300x250,120x600,160x600",
        "leaderboard-1": "728x90,970x210,960x200,960x210,970x90,998x200,970x100,branding,2000x1400",
        "leaderboard-2": "728x90,970x210,960x200,960x210,970x90,998x200,970x250",
        "leaderboard-3": "728x90,970x210,960x200,960x210,970x90,998x200,970x250",
        "leaderboard-4": "728x90,970x210,960x200,960x210,970x100",
        "leaderboardpremium-1": "1920x500",
        "mobileleaderboardpremium-1": "300x250",
        "mobilerectangle-1": "320x100,500x200,300x300,300x250,native",
        "gallerymobilerectangle-1": "320x100,500x200",
        "square-1": "300x300,300x250",
        "mobilesquare-1": "300x300,300x250",
        "mobilerectangle-2": "300x300,300x250,250x250,768x1230,720x1280,480x480,480x820,600x1080,336x280",
        "mobilerectangle-3": "300x300,300x250,250x250,480x480,336x280,768x1230,720x1280,480x820,600x1080",
        "mobilerectangle-4": "300x300,300x250,250x250,480x480,336x280,768x1230,720x1280,480x820,600x1080",
        "mobilerectangle-5": "300x300,300x250,250x250,480x480,336x280,768x1230,720x1280,480x820,600x1080",
        "gallerymobilerectangle-2": "300x300,300x250,250x250",
        "wallpaper-1": "300x300,300x250,480x300,250x250,336x280",
        "wallpaper-2": "300x300,300x250,480x300,250x250,336x280",
        "wallpaper-3": "300x300,300x250,480x300,250x250,336x280",
        "wallpaper-4": "300x300,300x250,480x300,250x250,336x280",
        "wallpaper-5": "300x300,300x250,480x300,250x250,336x280",
        "native-1": "native",
        "native-2": "native",
        "native-3": "native",
        "mobilenative-1": "native",
        "mobilenative-2": "native",
        "mobilenative-3": "native",
        "vignette": "vignette",
        "vignette-2": "vignette",
        "outstream": "outstream",
        "desktopstrip": "728x90,970x210,970x90,960x200,960x210,970x310,970x250,300x600,300x300,300x250",
        "interstitial": "interstitial",
        "mobileinterstitial": "interstitial"
    },
    "priority": {},
    "NaKluky": {
        "halfpagead-1": "300x250",
        "halfpagead-2": "120x600,160x600",
        "halfpagead-4": "300x600,300x300,300x250,120x600,160x600"
    },
    "Prima_DOMACZ": {
        "mobilerectangle-2": "768x1230,720x1280,300x300,300x250,480x480,480x820",
        "wallpaper-1": "768x1230,720x1280,480x300,300x300,300x250"
    },
    "Prima_DOMATV": {
        "mobilerectangle-2": "768x1230,720x1280,300x300,300x250,480x480,480x820",
        "wallpaper-1": "768x1230,720x1280,480x300,300x300,300x250"
    },
    "Prima_RADY": {
        "mobilerectangle-2": "768x1230,720x1280,300x300,300x250,480x480,480x820",
        "wallpaper-1": "768x1230,720x1280,480x300,300x300,300x250"
    },
    "Prima_NAPADY": {
        "mobilerectangle-2": "768x1230,720x1280,300x300,300x250,480x480,480x820",
        "wallpaper-1": "768x1230,720x1280,480x300,300x300,300x250"
    },
    "Ceskykutil": {
        "mobilerectangle-2": "768x1230,720x1280,300x300,300x250,480x480,480x820",
        "wallpaper-1": "768x1230,720x1280,480x300,300x300,300x250"
    },
    "Playzone": {
        "leaderboard-1": "branding",
        "leaderboard-2": "1170x135",
        "leaderboard-3": "840x230",
        "leaderboard-4": "840x230",
        "halfpagead-1": "300x600,300x300,300x250,120x600,160x600",
        "boardbottom-1": "970x310"
    }
};
/**
 * CUSTOM_CSS jsou CSS pravidla vložená přímo do <head> stránky při inicializaci.
 * 
 * Účel: rychlé opravy CSS stránky (layout bugy, třetí strany) bez nutnosti dohadovat se s webem nebo čekat na deploy bundle.min.css.
 * 
 * Pravidla se vkládají jako <style id="weuron-custom-css"> element, vkládání proběhne jen jednou (idempotentní).
 * 
 * Příklad: @media (max-width: 999px) and (orientation: portrait) { .foooterGrid { grid-template-columns: 1fr !important; } }
 * 
 * Prázdný string = žádné injektování.
 */
var CUSTOM_CSS = '.ad-300x300 div.ads{display: block}\n\n@media only screen and (max-width: 999px) and (orientation: portrait) {\n    .foooterGrid { grid-template-columns: 1fr !important; }\n}\n\n@media only screen and (max-width: 999px) {\n    .ad-1080x310 { width: unset !important; }\n}\n\n@media only screen and (min-width: 768px),\n       screen and (min-width: 568px) and (max-width: 1024px) and (orientation: portrait),\n       screen and (orientation: landscape),\n       print {\n    body {\n        min-width: 1060px;\n    }\n}';
// --- KONEC BLOKU weuron_config (POUZE PROMĚNNÉ) ---



/* Default CORE V_0_0_20 */

/* --- Core: Default CORE V_0_0_20 --- */
// Core 0.0.20 - I_01/core/V_0_0_20

//pojistky - výchozí proměnné

if (['sas', 'sas+cpex'].indexOf(SPA_RELOAD_MODE) === -1) { SPA_RELOAD_MODE = 'sas'; }

if (['hard', 'selective', 'economical'].indexOf(RELOADING_MODE) === -1) {
    RELOADING_MODE = 'hard';
}

if (Object.keys(RELOAD_POSITIONS).length === 0) {
    RELOAD_POSITIONS['mobilerectangle-1'] = 30;
}

if (typeof RELOAD_MAX_CYCLES !== 'number' || !isFinite(RELOAD_MAX_CYCLES) || RELOAD_MAX_CYCLES < 0) {
    RELOAD_MAX_CYCLES = 0;
} else {
    RELOAD_MAX_CYCLES = Math.floor(RELOAD_MAX_CYCLES);
}
if (RELOAD_MAX_CYCLES_HARD_CAP < 1 || !isFinite(RELOAD_MAX_CYCLES_HARD_CAP)) {
    RELOAD_MAX_CYCLES_HARD_CAP = 100;
} else {
    RELOAD_MAX_CYCLES_HARD_CAP = Math.floor(RELOAD_MAX_CYCLES_HARD_CAP);
}
if (RELOAD_MAX_CYCLES > RELOAD_MAX_CYCLES_HARD_CAP) {
    RELOAD_MAX_CYCLES = RELOAD_MAX_CYCLES_HARD_CAP;
}

if (['rewrite', 'remove', 'none'].indexOf(SEZNAM_TRAFFIC_CROS_WEB_PORTFOLIO_BEHAVIOR) === -1) {
    SEZNAM_TRAFFIC_CROS_WEB_PORTFOLIO_BEHAVIOR = 'none';
}

if (['classic', 'spa'].indexOf(WEB_MODE) === -1) { WEB_MODE = 'classic'; }


/* ────────────────────────────────────────────────────────────────────────
 * ODVOZENÉ PROMĚNNÉ (mimo block_0000 — NEEDITOVAT v administraci)
 * Tyto hodnoty se počítají z proměnných block_0000, nejsou samostatně editovatelné.
 * ──────────────────────────────────────────────────────────────────────── */

/**
 * SAS_SITE — odvozená hodnota: SAS „site" pro aktuální web podle WEURON_DOMAIN
 * přes SAS_SITE_BY_DOMAIN (obě v block_0000). NEEDITOVAT ručně.
 *
 * Když doména v mapě NENÍ, zůstane prázdný řetězec ('') — to je ZÁMĚRNĚ neplatný stav:
 * call_sas_adserver ho detekuje, vypíše velké varování a SAS volání NEspustí (viz tam).
 * Nepoužíváme žádnou „výchozí" hodnotu (např. 'IMM_Echo24'), protože tichý fallback na cizí
 * web by vybral špatnou per-web sadu rozměrů — to je nežádoucí stav, ne rozumná záloha.
 */
var SAS_SITE = (typeof WEURON_DOMAIN !== 'undefined' && SAS_SITE_BY_DOMAIN[WEURON_DOMAIN])
    ? SAS_SITE_BY_DOMAIN[WEURON_DOMAIN]
    : '';


// Core 0.0.20 - V_0_0_20

(function() {
var weuronLog = 1;
var _weuronDebug = (weuronLog === 1 && /[?&]weuron(&|$|=)/.test(window.location.search));
_weuronDebug && console.log('%c[Weuron]%c [blok_0000] overriders OK', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
_weuronDebug && console.log(
    '[Weuron] [blok_0000_diag_env] viewport=' + (document.documentElement.clientWidth || window.innerWidth) + 'px × ' + window.innerHeight + 'px' +
    ' | device(bp=' + DEVICE_BREAKPOINT + ')=' + ((document.documentElement.clientWidth || window.innerWidth) < DEVICE_BREAKPOINT ? 'mobil' : 'desktop') +
    ' | branding(bp=1025)=' + ((document.documentElement.clientWidth || window.innerWidth) >= 1025) +
    ' | UA: ' + navigator.userAgent.substring(0, 120)
);

/*
---------------------------------------------
Blok: blok_0000_diag_px
Název: diagnostika_performax_px_out_of_page
Cesta: — (diagnostický blok, po vyřešení problému SMAZAT)
Použití v buildu: (dočasná diagnostika)
Závislosti: NE
Komentář agenta:
MutationObserver na document.body, který zachytí okamžik vložení
#PX_out_of_page (Performax square-anchor) do DOM.
Cíl: zjistit zda Performax přichází přes SAS (uvnitř sas_xxx elementu),
přes R2B2 autorefresh, nebo jiným kanálem - zjištění příčiny překryvu slideUpů
Loguje: čas, parentElement, previousSibling, stack trace původce.
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU diagnostika_performax ---
(function diagPxOutOfPage() {
    if (!_weuronDebug) return;

    var _prefix = '%c[Weuron]%c %c[blok_0000_diag_px]%c ';
    var _css = ['background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', 'background:#ff6600;color:#fff;border-radius:3px;padding:1px 4px;', ''];

    // Pokud PX_out_of_page už na stránce existuje (před naším skriptem)
    var existing = document.getElementById('PX_out_of_page');
    if (existing) {
        console.warn.apply(console, [_prefix + '#PX_out_of_page ALREADY in DOM at script init. parent=' + (existing.parentElement && existing.parentElement.id || existing.parentElement && existing.parentElement.tagName || '?') + ', prevSibling=' + (existing.previousElementSibling && (existing.previousElementSibling.id || existing.previousElementSibling.tagName) || 'null')].concat(_css));
    }

    // Observer na nově přidané elementy
    var observer = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var added = mutations[i].addedNodes;
            for (var j = 0; j < added.length; j++) {
                var node = added[j];
                if (node.nodeType !== 1) continue;

                // Hledáme #PX_out_of_page nebo cokoliv od Performaxu (px-w-, px_anchor)
                var isPX = (node.id === 'PX_out_of_page') ||
                           (node.className && typeof node.className === 'string' && /px_anchor|px-w-|px_f_square/.test(node.className));

                if (isPX) {
                    var parent = node.parentElement;
                    var parentInfo = parent ? (parent.id || parent.tagName) : '?';
                    var prevSib = node.previousElementSibling;
                    var prevInfo = prevSib ? (prevSib.id || prevSib.tagName) : 'null';

                    // Zjistit, zda je uvnitř SAS elementu
                    var insideSas = false;
                    var sasAncestor = '';
                    var el = parent;
                    while (el && el !== document.body) {
                        if (el.className && typeof el.className === 'string' && el.className.indexOf('sas_mone') !== -1) {
                            insideSas = true;
                            sasAncestor = el.id || el.className;
                            break;
                        }
                        el = el.parentElement;
                    }

                    var stack = '';
                    try { stack = new Error().stack; } catch(e) {}

                    console.warn.apply(console, [
                        _prefix + '???? #PX_out_of_page / Performax DETECTED in DOM!\n' +
                        '  id=' + node.id + ', class=' + (node.className || '') + '\n' +
                        '  parent=' + parentInfo + '\n' +
                        '  prevSibling=' + prevInfo + '\n' +
                        '  insideSAS=' + insideSas + (insideSas ? ' (' + sasAncestor + ')' : '') + '\n' +
                        '  mutationTarget=' + (mutations[i].target.id || mutations[i].target.tagName) + '\n' +
                        '  stack=\n' + stack
                    ].concat(_css));
                }
            }
        }
    });

    // Pozoruj celý dokument (PX_out_of_page se může přidat kamkoliv)
    observer.observe(document.documentElement, { childList: true, subtree: true });

    console.log.apply(console, [_prefix + 'MutationObserver aktivní — čekám na #PX_out_of_page / Performax elementy'].concat(_css));
})();
// --- KONEC BLOKU diagnostika_performax ---




/*
---------------------------------------------
Blok: blok_0000a
Název: UX protection
Použití v buildu: NE - vazba na centrální reloading (NEW)
Komentář agenta:
────────────────────────────────────────────────────────────────────────
 *  M-PROT-1  —  Active-audible-video reload guard (DOM-based)
 *  M-PROT-2  —  Per-area pluggable reload guards (registry)
 *  Datum:   2026-05-06
 *  Vstup:   src/echo24/dev/SAS šablony/05_Video_15-18/
 *           UX_analýza_a_kompatibilita_s_centrálním_reloadingem.txt
 *
 *  PROČ TO VŮBEC ŘEŠÍME
 *  --------------------
 *  Reload tick níže (blok_0000b) používá viditelnost pozice (IO →
 *  reloadState.seenSinceLastTick) jako *POZITIVNÍ* trigger reloadu —
 *  tj. „byla pozice mezi tickem vidět? Pokud ano, reloaduj ji."
 *  NENÍ to ochrana před přerušením uživatele. Z definice je tedy
 *  právě přehrávané outstream/instream video uvnitř .sas_mone vždy
 *  viditelné → tick by ho zničil voláním cpexPreReloadCleanup() →
 *  cpexPackage.clearAds() smaže <video>/<iframe> přehrávač uprostřed
 *  shlédnutí. To je nepřípustné UX.
 *
 *  Dva nezávislé bezpečnostní pásy:
 *
 *  [M-PROT-1]  HASACTIVEAUDIBLEVIDEO()
 *      Detekce přímo v DOM uvnitř .sas_mone[data-*-area="<area>"]:
 *      hledáme <video>, který právě hraje (paused=false, ended=false,
 *      currentTime > 0), MÁ ZVUK (muted=false). Pokud existuje,
 *      pozice se v tomto ticku přeskočí.
 *      Pojistka „muted=false" je záměrná: tichý loop (interscroller
 *      s muted/loop videem) divák reálně NESLEDUJE jako video, je to
 *      jen dekorace — pokud uživatel odscrolloval, IO ho vyřadí přes
 *      _skipVisibility; pokud se na něj kouká, stále je to vizuálně
 *      jen banner a reload mu nevadí. Bez `!muted` bychom navíc
 *      navěky zablokovali reload offscreen muted-loop videí (offscreen
 *      paused je sice OK, ale prohlížeče v některých režimech nechávají
 *      muted/loop hrát i mimo viewport — viz UX dokument).
 *
 *      DOSAH: hledáme <video> tagy nejen přímo v .sas_mone, ale i
 *      uvnitř SAME-ORIGIN <iframe> elementů, které jsou potomky
 *      .sas_mone. Důvod: cpexPackage.Outstream class (cpex-package.js,
 *      ~ř. 1197) vytváří <iframe> bez `src` jako sandbox pro video.js
 *      přehrávač + VAST plugin a uvnitř dynamicky vkládá <video>.
 *      Bez iframe-traversalu by M-PROT-1 outstream přehrávač neviděl
 *      a reload by mu uprostřed shlédnutí poslal clearAds()/reset().
 *      Cross-origin iframy (jiná doména) jsou bezpečně ignorovány
 *      přes try/catch — propouštíme reload, lepší ztratit ochranu
 *      než nechat výjimku shodit celý tick. Pro tyto případy si
 *      cpexPackage musí registrovat M-PROT-2 guard sám.
 *
 *      ROZSAH PRO 16_*-18_* VAST/CPV ŠABLONY (analýza 2026-05-07):
 *      Šablony 16_* a 18_* (`src/echo24/dev/SAS šablony/05_Video_15-18/`)
 *      jsou ČISTĚ VAST 4.1 XML — žádný JS, žádný HTML, jen <Wrapper>
 *      / <InLine> + <MediaFile> tag. Samy NEPRODUKUJÍ žádný DOM. Je
 *      to pouze response payload, který spotřebuje **video player**
 *      (na cool/zoom/zeny/cnn_prima/living to je právě
 *      cpexPackage.Outstream → render uvnitř iframe v .sas_mone;
 *      na iprima.cz/primaplus.cz je to externí CMS player mimo náš
 *      reload manager). Šablona 17_ (Video Overlayer, 73.xml) je
 *      NonLinear ad — přehrává se uvnitř IMA player overlay nad
 *      content videem, opět mimo náš scope.
 *      → 16_*-18_* tedy nemohou samy vyrobit „sticky DIV mimo
 *         .sas_mone" → riziko překryvu reklam reloadingem neexistuje.
 *      → Riziko z 15_Vertikalni (161.js — Direct JS, NIKOLIV VAST)
 *         řeší M-PROT-1 (renderuje <video> uvnitř #sas-interscroller
 *         v .sas_mone — ale loop+muted, takže BĚŽNÝ reload tu pozici
 *         smí přerušit; audible-only guard tedy správně nezasáhne).
 *
 *
 *  [M-PROT-2]  weuronReloadGuards REGISTRY
 *      Šablona / třetí strana / cpexPackage.Outstream class si může
 *      registrovat vlastní predikát:
 *
 *          window.weuronReloadGuards = window.weuronReloadGuards || {};
 *          window.weuronReloadGuards['mobilerectangle-1'] = function (ctx) {
 *              // ctx = { area, el, now }
 *              // return true  = NESMÍ se reloadovat (uživatel interaguje)
 *              // return false = smí (interakce není aktivní)
 *              return !!myPlayer.isPlaying() || !!myPanel.isExpanded();
 *          };
 *
 *      Tím obejdeme nutnost upravovat každou kreativní šablonu
 *      (a tedy zasahovat do produkčních SAS šablon) — guard si
 *      registruje sama strana, která zná svůj interaktivní stav.
 *      Klíčový use-case: cpexPackage Outstream class na cool/zoom/
 *      zeny/cnn_prima_news/living. Bez něj by reload zabil hrající
 *      outstream banner uprostřed CPV billable view.
 *
 *  CO TYTO GUARDY ZÁMĚRNĚ NEŘEŠÍ
 *  ------------------------------
 *  - User-dismissed popup (R3 v UX dokumentu): řeší proměnná
 *    RELOAD_CAPPING (~ř. 353 výše) přes reloadIsCapped(area).
 *    Po zavření slide-upu šablona dispatchne 'sasPopupClosed' →
 *    capping zaznamená čas → reloadIsCapped vrací true po dobu
 *    RELOAD_CAPPING[area] sekund. Není potřeba samostatný guard.
 *  - Click-in-flight (R7) / scroll-jump (R5) / capping reset (R6):
 *    nejsou v rozsahu této iterace, viz plán
 *    src/echo24/dev/plan/2026_05_06.txt.
 *
 *  CO ZNAMENÁ „SKIP" V REPORTU TICKU
 *  ----------------------------------
 *  Skipnutá pozice NESPOTŘEBOVÁVÁ položku z reloadState.positionCounts
 *  (counter se inkrementuje až při zařazení do positionsToReload —
 *  viz blok_0000b níže). Tj. limit RELOAD_MAX_CYCLES nezatěžujeme
 *  ticky, ve kterých uživatel právě sleduje video — guard tedy
 *  POUZE oddálí reload, neztrácí cyklus.
 *
 *  PLATNOST GLOBÁLNÍCH HOOK Ů
 *  ---------------------------
 *  window.weuronReloadGuards je globální mapa area→fn. Pokud více
 *  stran chce přidat guard pro stejnou area, MUSÍ si je samy
 *  zkomponovat (např. obalit dříve registrovaný fn). cleaned.js
 *  provede pouze jedno volání per area — kdyby v budoucnu vznikla
 *  potřeba pole funkcí, lze migrovat (ale dnes by to byla zbytečná
 *  komplikace; všichni potenciální zapisovatelé jsou pod naší
 *  kontrolou: cpex-package.js, kreativní šablony Equativ).
 * ────────────────────────────────────────────────────────────────────────
 */
function _hasActiveAudibleVideo(el) {
    if (!el || typeof el.querySelectorAll !== 'function') return false;
    // 1) Přímé <video> tagy uvnitř .sas_mone (např. Equativ šablona 161 / 15_Vertikalni
    //    interscroller, který renderuje <video loop muted playsinline> — ten
    //    NEní `audible`, takže projde, viz odůvodnění výše).
    var vids = el.querySelectorAll('video');
    for (var i = 0; i < vids.length; i++) {
        if (_videoIsAudiblyPlaying(vids[i])) return true;
    }
    // 2) Vnořené same-origin iframy (cpexPackage.Outstream class renderuje
    //    video.js přehrávač UVNITŘ <iframe id="<elementId>-iframe">; viz
    //    cpex-package.js → class Outstream.render() — addIframe(containerEl,...)
    //    + následně `addElement('div', this.iframe.contentDocument.body,
    //    { id: 'cpex-outstream' })` a video tag tamtéž).
    //    Native <video> z parent dokumentu se do iframe nedohledá přes selektor,
    //    proto zde explicitně procházíme contentDocument každého iframe uvnitř
    //    .sas_mone. CPEX iframe je vytvořen bez `src` → je same-origin a
    //    contentDocument je čitelné. Cross-origin (různá doména) hodí výjimku
    //    při čtení contentDocument → chytneme try/catch a `false` (raději
    //    propouštíme reload, než aby chyba shodila celý tick).
    var ifrs = el.querySelectorAll('iframe');
    for (var j = 0; j < ifrs.length; j++) {
        var doc = null;
        try { doc = ifrs[j].contentDocument; } catch (e) { /* cross-origin → ignor */ }
        if (!doc) continue;
        var inner;
        try { inner = doc.querySelectorAll('video'); } catch (e) { continue; }
        for (var k = 0; k < inner.length; k++) {
            if (_videoIsAudiblyPlaying(inner[k])) return true;
        }
    }
    return false;
}

// Předikát: <video> právě hraje a divák ho slyší (audible = NEmuted, volume>0).
// Záměrně NEblokujeme muted-loop dekorativní video (interscroller šablony 161,
// 76, 121, 120, 262, 264 atd.) — bez `!muted` bychom navěky lockli reload pozic
// s offscreen muted-loop autoplayem (některé prohlížeče ho nechávají hrát i mimo
// viewport). Detail viz UX_analýza_a_kompatibilita_s_centrálním_reloadingem.txt
// sekce 4) M-PROT-1.
function _videoIsAudiblyPlaying(v) {
    if (!v) return false;
    var playing = !v.paused && !v.ended && v.currentTime > 0
        && (isNaN(v.duration) || v.currentTime < v.duration);
    return playing && !v.muted && v.volume > 0;
}

function _runReloadGuard(area, el) {
    var reg = window.weuronReloadGuards;
    if (!reg || typeof reg[area] !== 'function') return false;
    try {
        return !!reg[area]({ area: area, el: el, now: Date.now() });
    } catch (e) {
        // Guard nesmí shodit reload — chybu jen zalogovat a propustit.
        _weuronDebug && console.warn('%c[Weuron]%c [M-PROT-2] guard "' + area + '" hodil výjimku — propouštíme reload',
            'background:#7d1f00;color:#fff;border-radius:3px;padding:1px 4px;', '', e);
        return false;
    }
}



/*
---------------------------------------------
Blok: blok_0000b
Název: reload_manager
Cesta: — (nový blok, vytvořen při integraci CPEX)
Závislosti: ANO (blok_0000 weuron_config, sas, pbjs, cpexPackage, DOM API, IntersectionObserver)
Komentář agenta:
Obecný reload manager dle flowchartu:
1. Po prvním renderování reklam spustí periodický cyklus (RELOAD_INTERVAL_MS).
2. Sleduje viditelnost pozic pomocí IntersectionObserver — pozice se přidá
   do setu „seenSinceLastTick" při vstupu do viewportu a ZŮSTÁVÁ v něm
   až do dalšího ticku (i když uživatel odscrolluje pryč).
3. Přeskakuje privilegované pozice (RELOAD_POSITIONS === 0).
4. Aplikuje capping (RELOAD_CAPPING) — po interakci uživatele (zavření)
   pozastaví reload dané pozice na N sekund nebo navždy (hodnota 0).
5. Detekuje privilegovaný obsah (_privilegedSources, PRIVILEGED_SOURCE_AREAS) —
   obsah s vlastním autorefreshem (R2B2, Performax) se trvale vyloučí z reloadingu.
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
 * Vrátí násobek reload intervalu pro danou pozici.
 * 1 = každé kolo (výchozí), 2 = každé druhé, 3 = každé třetí...
 */
function getReloadIntervalMultiple(positionId) {
    var raw = MULTIPLE_RELOAD_INTERVAL[positionId];
    if (raw === undefined || raw === null) return 1;
    var n = Number(raw);
    if (!isFinite(n) || n < 1) return 1;
    return Math.floor(n);
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

/**
 * Runtime evidence detekovaných privilegovaných zdrojů (R2B2/Performax).
 * Klíč = area (adUnit), hodnota = string popis zdroje. Plní se v
 * identifyCreativeSource() při prvním renderu (jen pro pozice z
 * PRIVILEGED_SOURCE_AREAS); jednou nastaveno platí pro celé zobrazení stránky.
 * Čte se v reloadCycleTick pro okamžitý skip bez opakovaného skenování DOM.
 */
var _privilegedSources = {};

/**
 * Runtime evidence pozic vyřazených z reloadingu kvůli větvi "Tag campaign".
 * Klíč = area (adUnit), hodnota = string důvod. Plní se ve string/postscribe
 * větvi request() (plošně dle TAG_CAMPAIGN_RELOAD_STOP, nebo dle shody
 * TAG_CAMPAIGN_EXCLUDE_PATTERNS). Čte se v reloadCycleTick.
 */
var _tagCampaignExcluded = {};

/**
 * ── BRANDING HEIGHT RESERVATION (CLS prevence) ──────────────────────
 * Prevence Content Layout Shift při reloadu PC brandingových pozic.
 *
 * Problém: SAS branding šablony (197.html, 238.html, 64.html, 68.html)
 * vkládají wrapper (.firstClass / #iPrimaBrandingDouble) s výškou ~225px
 * IN FLOW dovnitř sas_mone elementu. Při reloadu sas.js volá
 * el.innerHTML = '' → wrapper zmizí → obsah webu poskočí nahoru.
 * Nová kreativa se vykreslí o sekundy později → obsah poskočí zpět.
 *
 * Řešení: Před reloadem nastavit min-height na sas_mone = aktuální výška.
 * Po vykreslení nové kreativy min-height odstraníme.
 *
 * Aktivní POUZE když getEffectiveReloadLimit('leaderboard-1') > 0.
 * ────────────────────────────────────────────────────────────────────
 */

/** Mapa area → true pro pozice s aktivní height reservation. */
var _heightReserved = {};

/**
 * Nastaví min-height na sas_mone element = jeho aktuální offsetHeight.
 * Volat PŘED cpexPreReloadCleanup a sas.loadmone.
 */
function reloadReserveHeight(positions) {
    if (getEffectiveReloadLimit('leaderboard-1') <= 0) return;
    // Uvolnit případné stale reservations z předchozího cyklu
    Object.keys(_heightReserved).forEach(function(area) {
        reloadReleaseHeight(area);
    });
    positions.forEach(function(p) {
        var el = document.querySelector(
            '.sas_mone[data-d-area="' + p.area + '"], .sas_mone[data-m-area="' + p.area + '"]'
        );
        if (!el) return;
        var h = el.offsetHeight;
        if (h > 0) {
            el.style.minHeight = h + 'px';
            _heightReserved[p.area] = true;
            _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOAD height reserve] ' + p.area + ' min-height=' + h + 'px',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
        }
    });
}

/**
 * Odstraní min-height z sas_mone elementu pro danou pozici.
 * Bezpečné volat opakovaně — no-op pokud nebyla reservation.
 */
function reloadReleaseHeight(area) {
    if (!_heightReserved[area]) return;
    var el = document.querySelector(
        '.sas_mone[data-d-area="' + area + '"], .sas_mone[data-m-area="' + area + '"]'
    );
    if (el) {
        el.style.minHeight = '';
        _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOAD height release] ' + area + ' min-height odstraněn',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
    }
    delete _heightReserved[area];
}

/**
 * Detekuje situaci kdy reload přinesl non-interscroller kreativu do kontejneru,
 * který si stále drží výšku z předchozího interscrolleru (height: Xvh nastavené
 * cpexPackage na sas_mone). Pokud taková situace nastane, aplikuje na kontejner
 * vertikální + horizontální centrování — malá kreativa (např. 300×250) pak
 * neplave v prázdném prostoru, ale sedí uprostřed alokované výšky.
 *
 * Detekce probíhá s 300ms zpožděním, aby cpexPackage/GAM stihly dokončit render
 * před tím, než rozhodnutí uděláme.
 *
 * Poznámky k detekci:
 *   • Primárně: area + width/height shodné se SAS interscroller rozměry → NE centrování
 *   • Fallback (bez rozměrů): DOM markery .cpex-interscroller-wrapper, .interscroller-level1,
 *     #sas-interscroller, #sas-ad-background, a.ads-interscroller → NE centrování
 *   • Žádná z výše uvedených podmínek → non-interscroller kreativa → centrování
 *
 * Reset centrování zajišťuje interscroller_observe (pro GAM cestu)
 * a reloadResetCentering (volat kdykoliv interscroller přebírá element).
 */
/**
 * Matcher interscrolleru sjednocený se SAS (viz sas_unminify.js, renderResponseIframe).
 * Pokud area+rozměr odpovídá této logice, považujeme kreativu za interscroller.
 */
function isSasInterscrollerBySize(area, width, height) {
    var W = Math.round(Number(width) || 0);
    var H = Math.round(Number(height) || 0);
    return (
        (W === 768 && H === 1230) ||
        (W === 480 && H === 820) ||
        (W === 720 && (H === 1080 || H === 1280)) ||
        (W === 600 && H === 1080) ||
        (/^mobilerectangle-(2|3|4|5)$/.test(area || '') && W === 300 && H === 600)
    );
}

function reloadCenterNonInterscroller(area, meta) {
    // Element a počáteční vh kontrola PŘED timeoutem — pokud podmínka nesplněna, neplánujeme nic.
    var el = document.querySelector(
        '.sas_mone[data-d-area="' + area + '"], .sas_mone[data-m-area="' + area + '"]'
    );
    if (!el) return;
    if (!/vh/.test(el.style.height)) return;

    // Snapshot inline stylů PŘED timeoutem. Po 300ms smažeme/nastavíme pouze
    // hodnoty, které kreativa sama nezměnila — ochrana před přepsáním stylu
    // nastaveného samotnou kreativou během vykreslování.
    var _snap = {
        height:         el.style.height,
        minHeight:      el.style.minHeight,
        display:        el.style.display,
        alignItems:     el.style.alignItems,
        justifyContent: el.style.justifyContent
    };

    var width  = meta && meta.width;
    var height = meta && meta.height;
    var source = (meta && meta.source) ? meta.source : 'unknown';

    setTimeout(function() {
        // Element mohl být odstraněn z DOM během 300ms (např. clearAds)
        if (!el.isConnected) return;

        // Pomocná funkce: smaž inline styl jen pokud ho kreativa sama nezměnila
        function clearIfUnchanged(prop) {
            if (el.style[prop] === _snap[prop]) el.style[prop] = '';
        }

        if (isSasInterscrollerBySize(area, width, height)) {
            clearIfUnchanged('display');
            clearIfUnchanged('alignItems');
            clearIfUnchanged('justifyContent');
            _weuronDebug && console.log('%c[Weuron]%c [reload centering skip] area=' + area +
                ' | source=' + source + ' | důvod=size matcher ' +
                Math.round(Number(width) || 0) + 'x' + Math.round(Number(height) || 0),
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
            return;
        }

        // Fallback když rozměry nejsou dostupné (SAS direct/GAM šablony)
        var hasCpexWrapper = !!el.querySelector('.cpex-interscroller-wrapper');
        var level1 = el.querySelector('.interscroller-level1');
        var level1HasVh = !!(level1 && /vh/.test(level1.style.height));
        var hasSasInterscroller = !!(
            el.querySelector('#sas-interscroller') ||
            el.querySelector('#sas-interscroller-cover') ||
            el.querySelector('#sas-ad-background') ||
            el.querySelector('a.ads-interscroller')
        );
        if (hasCpexWrapper || level1HasVh || hasSasInterscroller) {
            clearIfUnchanged('display');
            clearIfUnchanged('alignItems');
            clearIfUnchanged('justifyContent');
            _weuronDebug && console.log('%c[Weuron]%c [reload centering skip] area=' + area +
                ' | source=' + source + ' | důvod=DOM interscroller marker',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
            return;
        }

        // Neznámý zdroj (SAS direct/MutationObserver) a žádný DOM marker —
        // nevíme co přišlo. Odstraníme jen styly které kreativa sama nezměnila.
        // Případný CLS je přijatelnější než vizuální bug z flex centrování.
        if (!width && !height) {
            clearIfUnchanged('display');
            clearIfUnchanged('alignItems');
            clearIfUnchanged('justifyContent');
            clearIfUnchanged('height');
            clearIfUnchanged('minHeight');
            _weuronDebug && console.warn('%c[Weuron]%c [reload centering UNKNOWN] area=' + area +
                ' | source=' + source + ' | žádné rozměry ani DOM marker' +
                ' → odstraněny pouze nezměněné styly, kreativa renderuje vlastním layoutem' +
                ' >> vykopíruj celý HTML obsah uvnitř DIVu .sas_mone a pošli do Weuronu' +
                ' — zřejmě nová SAS šablona, je třeba přidat DOM marker.',
                'background:#c0392b;color:#fff;border-radius:3px;padding:1px 4px;', '');
            return;
        }

        // Rozměry máme (hb/s2s), size matcher interscroller nevytipoval → jde o
        // malou kreativu v kontejneru s vh rezervací → centrovat.
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        _weuronDebug && console.log('%c[Weuron]%c [reload centering] area=' + area +
            ' | source=' + source + ' | size=' +
            Math.round(Number(width) || 0) + 'x' + Math.round(Number(height) || 0) +
            ' | height=' + el.style.height + ' → display:flex center',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
    }, 300);
}

/**
 * Vrací true pro pozice, kde dává smysl čekat interscroller strukturu.
 * Na echo24 jde o stejné area jako v SAS matcheru pro interscroller:
 * mobilerectangle-2 až mobilerectangle-5.
 *
 * Pozn.: mobilerectangle-1 je v SAS vedený jako popup/slideup kandidát,
 * ne jako interscroller, proto ho sem úmyslně nezařazujeme.
 */
function canAreaUseInterscroller(area) {
    return /^mobilerectangle-(2|3|4|5)$/.test(area || '');
}

/**
 * Odstraní centrování nastavené reloadCenterNonInterscroller.
 * Volat před renderem skutečného interscrolleru, aby flex layout
 * neinterferoval s fixed-position strukturou interscrolleru.
 */
function reloadResetCentering(el) {
    if (!el) return;
    if (el.style.display === 'flex') {
        el.style.display = '';
        el.style.alignItems = '';
        el.style.justifyContent = '';
    }
}

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

// ── SOURCE IDENTIFICATION (diagnostika zdroje kreativy) ──────────────
// Pro mobilerectangle-1 loguje zdroj kreativy a predikci dalšího vývoje.
// Volá se z observeRealRenders() po detekci obsahu — tedy na KAŽDÉM
// renderování (initial i reload).

function _detectR2B2InElement(el) {
    for (var i = 0; i < el.childNodes.length; i++) {
        if (el.childNodes[i].nodeType === 8 && /R2B2/i.test(el.childNodes[i].data)) {
            return 'comment: ' + el.childNodes[i].data.trim().substring(0, 60);
        }
    }
    var r2b2Script = el.querySelector('script[src*="r2b2.cz"]');
    if (r2b2Script) return 'script: ' + r2b2Script.src;
    return null;
}

function _detectPerformaxInElement(el) {
    for (var i = 0; i < el.childNodes.length; i++) {
        if (el.childNodes[i].nodeType === 8 && /^\s*pfx\s/i.test(el.childNodes[i].data)) {
            return 'comment: ' + el.childNodes[i].data.trim().substring(0, 60);
        }
    }
    var pxScript = el.querySelector('script[src*="performax.cz"]');
    if (pxScript) return 'script: ' + pxScript.src;
    var psSpan = el.querySelector('span#ps-script');
    if (psSpan) return 'span#ps-script';
    if (document.getElementById('PX_out_of_page')) return '#PX_out_of_page';
    return null;
}

function identifyCreativeSource(area, el) {
    if (PRIVILEGED_SOURCE_AREAS.indexOf(area) === -1) return;
    // Zaznamenat config hodnotu PŘED delayem
    var configLimitSnapshot = RELOAD_POSITIONS[area];
    setTimeout(function() {
        var source, details, prediction;
        var limit = getEffectiveReloadLimit(area);
        var count = reloadState.positionCounts[area] || 0;
        var reloadInfo = 'limit=' + limit + ', proběhlo=' + count;
        var configLimit = RELOAD_POSITIONS[area];

        // PRIORITA DETEKCE: DOM obsah (R2B2/Performax) > HB bid
        // pbjs.winningBidsSas říká jen že HB měl NABÍDKU — NE že vyhrál.
        // SAS může dát přednost přímé kampani (R2B2, Performax) i když HB
        // nabídl vyšší CPM. Proto NEJDŘÍV skenujeme skutečný DOM obsah.

        // Přidáme také identifikaci wrapperu impression media/R2B2 který
        // se může vyskytnout MIMO .sas_mone (jako sticky overlay)
        var r2b2Wrapper = document.querySelector('#ad-mobile-branding[data-sp-content="impressionmedia"]');

        // 1. R2B2 v elementu?
        var r2b2Detail = _detectR2B2InElement(el);
        if (r2b2Detail || r2b2Wrapper) {
            source = 'R2B2 (privilegovaná)';
            details = r2b2Detail || 'R2B2 wrapper: #ad-mobile-branding[data-sp-content="impressionmedia"]';
            prediction = 'R2B2 má VLASTNÍ autorefresh → RELOAD_POSITIONS[' + area + ']=0, _privilegedSources uložen.';
            _privilegedSources[area] = source;
            RELOAD_POSITIONS[area] = 0;
            var _s1 = document.getElementById('cpex-slideup');
            if (_s1) { _s1.remove(); _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [SOURCE ' + area + '] #cpex-slideup odstraněn (R2B2 konflikt)', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', ''); }
        }
        // 2. Performax v elementu?
        else if (_detectPerformaxInElement(el)) {
            source = 'Performax (privilegovaná)';
            details = _detectPerformaxInElement(el);
            prediction = 'Performax má VLASTNÍ autorefresh → RELOAD_POSITIONS[' + area + ']=0, _privilegedSources uložen.';
            _privilegedSources[area] = source;
            RELOAD_POSITIONS[area] = 0;
            var _s2 = document.getElementById('cpex-slideup');
            if (_s2) { _s2.remove(); _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [SOURCE ' + area + '] #cpex-slideup odstraněn (Performax konflikt)', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', ''); }
        }
        // 3. HB winning bid? (pbjs.winningBidsSas existuje = HB měl nabídku)
        else {
            var hbBid = (typeof pbjs !== 'undefined' && pbjs.winningBidsSas) ? pbjs.winningBidsSas[area] : null;
            if (hbBid) {
                source = 'HB (Header Bidding) — nebo SAS direct (HB bid existoval ale SAS mohl vybrat jinak)';
                details = 'HB bid: bidder=' + hbBid.bidderCode + ', cpm=' + hbBid.bid + ', tier=' + hbBid.bidTier
                        + (hbBid.bidDealId ? ', deal=' + hbBid.bidDealId : '')
                        + ', ' + hbBid.width + 'x' + hbBid.height;
                prediction = 'Pokud SAS použil HB bid → kreativa z ' + hbBid.bidderCode + '. Pokud SAS dal přednost přímé kampani → kreativa z SASu. Reload: ' + reloadInfo + '.';
            }
            // 4. Empty?
            else if (el.children.length === 0) {
                source = 'PRÁZDNÁ (no-fill)';
                details = 'žádný obsah v elementu';
                prediction = 'emptyAds přidá do emptyPositions → preventivní reload v dalším ticku (' + reloadInfo + ').';
            }
            // 5. SAS direct / S2S
            else {
                source = 'SAS (přímá kampaň nebo S2S)';
                var iframe = el.querySelector('iframe');
                var scripts = el.querySelectorAll('script[src]');
                var scriptSrcs = [];
                scripts.forEach(function(s) { scriptSrcs.push(s.src.split('/').pop()); });
                details = iframe ? ('iframe src=' + (iframe.src || 'about:blank').substring(0, 80)) : (scriptSrcs.length ? 'scripts: ' + scriptSrcs.join(', ') : 'HTML obsah');
                prediction = 'SAS kreativa → reload poběží normálně (' + reloadInfo + ').';
            }
        }

        _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] %c[SOURCE ' + area + '] ' + source, 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', 'color: #ff6600; font-weight: bold');
        _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [SOURCE ' + area + '] Detail: ' + details, 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
        _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [SOURCE ' + area + '] Predikce: ' + prediction, 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
        _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [SOURCE ' + area + '] RELOAD_POSITIONS=' + configLimitSnapshot + ' → ' + RELOAD_POSITIONS[area] + ', _privilegedSources=' + JSON.stringify(_privilegedSources[area] || null) + ', reloadů proběhlo=' + count, 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
    }, 500);
}
// ── KONEC SOURCE IDENTIFICATION ──────────────────────────────────────

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

            // SAS vs HB srovnání — co bylo k dispozici a co vyhrál
            var _hbBid = (typeof pbjs !== 'undefined' && pbjs.winningBidsSas) ? pbjs.winningBidsSas[area] : null;
            var _source = 'SAS DIRECT (šablona)';
            // Detekce S2S renderu: cpexPackage vloží element s třídou cpex-
            var _cpexEl = el.querySelector('[class*="cpex-"]') || el.querySelector('iframe[id*="cpex"]');
            if (_cpexEl) _source = 'HB S2S (cpexPackage.render)';
            _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [SAS vs HB] area=' + area +
                ' | HB bid: ' + (_hbBid
                    ? _hbBid.bid + ' ' + _hbBid.bidderCode + ' ' + _hbBid.width + 'x' + _hbBid.height + ' tier=' + _hbBid.bidTier + (_hbBid.bidDealId ? ' deal=' + _hbBid.bidDealId : '')
                    : '(žádný)') +
                ' | Vykresleno: ' + _source,
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');

            identifyCreativeSource(area, el);
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

    // Globální strop ticků (nezávislý na per-pozice limitech/viditelnosti).
    if (RELOAD_MAX_CYCLES > 0 && reloadState.globalCount >= RELOAD_MAX_CYCLES) {
        _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOADING stop] dosažen RELOAD_MAX_CYCLES=' + RELOAD_MAX_CYCLES,
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
        stopReloadCycle();
        return;
    }else{
        _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] %c[RELOADING tick]%c reloading číslo: ' + reloadState.globalCount,
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
            'background:#4CAF50;color:#fff;border-radius:3px;padding:1px 4px;', '');
    }

    // DEV-only: monitoring atribut body[weuron-reloading] + ruční pauza.
    // Přítomno pouze pokud _weuronDebug (URL ?weuron) — nulový dopad na produkci.
    if (_weuronDebug) {
        if (document.body.getAttribute('weuron-reloading') === '0') {
            // Vývojář ručně nastavil atribut na '0' → přeskočit tento tick.
            // globalCount se NEinkrementuje, interval zůstává aktivní.
            // Pro pokračování: nastavte atribut na libovolnou jinou hodnotu.
            console.log('%c[Weuron]%c [blok_0000b] [DEV PAUSE] reloading pozastaven — body[weuron-reloading="0"]. Nastavte jinou hodnotu pro pokračování.',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
            return;
        }
        document.body.setAttribute('weuron-reloading',
            RELOAD_MAX_CYCLES > 0 ? String(RELOAD_MAX_CYCLES - reloadState.globalCount) : '\u221e');
    }

    reloadState.globalCount++;

    // Spustit registrované kontrolní funkce před reloadem
    RELOAD_BEFORE_FNS.forEach(function(fn) {
        try { fn(); } catch (e) { /* reload before-fn error */ }
    });

    // Sesbírat pozice k reloadu + trackovat důvody vyřazení/zařazení
    var now = Date.now();
    var positionsToReload = [];
    var _skipLimit = [], _skipInterval = [], _skipVisibility = [], _skipCapping = [], _skipNoDOM = [];
    // M-PROT-1 / M-PROT-2 buckety pro report (viz definice nahoře u _hasActiveAudibleVideo / _runReloadGuard)
    var _skipActiveVideo = [], _skipUserGuard = [];
    var _inclAlwaysVisible = [], _inclEmptyPos = [], _inclVisible = [];
    for (var area in RELOAD_POSITIONS) {
        // Privilegovaný zdroj (R2B2, Performax) — detekováno jednou, platí navždy
        if (_privilegedSources[area]) continue;

        // Větev "Tag campaign" — vyřazeno z reloadingu (plošně dle
        // TAG_CAMPAIGN_RELOAD_STOP, nebo dle shody TAG_CAMPAIGN_EXCLUDE_PATTERNS).
        // Evidence se plní ve string/postscribe větvi request().
        if (_tagCampaignExcluded[area]) continue;

        // RESPONSIVE_BREAKPOINTS guard — pozice se nereloaduje pokud nevyhovuje
        // aktuální šířce viewportu (shodná logika jako matchesDevice() v blok_0011).
        // Příklad: boardbottom-1 { minWidth: 768 } → skip při 412px.
        var _rbp = RESPONSIVE_BREAKPOINTS[area];
        if (_rbp) {
            var _w = document.documentElement.clientWidth || window.innerWidth;
            if (_rbp.minWidth !== undefined && _w < _rbp.minWidth) continue;
            if (_rbp.maxWidth !== undefined && _w > _rbp.maxWidth) continue;
        }

        var limit = getEffectiveReloadLimit(area);
        if (limit === 0) continue; // privilegovaná pozice — přeskočit

        var count = reloadState.positionCounts[area] || 0;
        if (count >= limit) { _skipLimit.push(area); continue; }

        // Per-pozice cadence: reload jen v každém N-tém ticku.
        var intervalMultiple = getReloadIntervalMultiple(area);
        if (reloadState.globalCount % intervalMultiple !== 0) {
            _skipInterval.push(area);
            continue;
        }

        if (!RENDERING_AND_RELOADING_ALWAYS.has(area) && !reloadState.seenSinceLastTick.has(area) && !reloadState.emptyPositions.has(area)) { _skipVisibility.push(area); continue; }

        if (reloadIsCapped(area)) { _skipCapping.push(area); continue; }

        // Ověřit, že DOM element existuje
        var el = document.querySelector('.sas_mone[data-m-area="' + area + '"], .sas_mone[data-d-area="' + area + '"]');
        if (!el) { _skipNoDOM.push(area); continue; }

        // M-PROT-1: pokud uvnitř pozice běží <video> se zvukem, NEreloadovat.
        //   - chrání outstream (cpexPackage Outstream class) i vlastní HTML5 player
        //     šablon 15_Vertikalni_Mobilni / 16-18_VAST jakmile by byly rendrovány
        //     uvnitř .sas_mone (echo24 dnes ne, ale cool/zoom/zeny/cnn_prima/living
        //     ano přes caroda_outstream).
        //   - NEblokuje muted-loop video (interscroller) — viz vysvětlení nahoře.
        if (_hasActiveAudibleVideo(el)) { _skipActiveVideo.push(area); continue; }

        // M-PROT-2: dotaz registru per-area guardů. Šablona / cpexPackage si
        //   tu sama drží predikát „aktuálně právě interaguje uživatel s mojí
        //   reklamou?". Veřejné API: window.weuronReloadGuards[area] = fn(ctx).
        if (_runReloadGuard(area, el)) { _skipUserGuard.push(area); continue; }

        // Důvod zařazení do reload cyklu
        if (RENDERING_AND_RELOADING_ALWAYS.has(area)) { _inclAlwaysVisible.push(area); }
        else if (reloadState.emptyPositions.has(area)) { _inclEmptyPos.push(area); }
        else { _inclVisible.push(area); }

        positionsToReload.push({ area: area, elementId: el.id });
        reloadState.positionCounts[area] = count + 1;
    }

    // Log důvodů vyřazení/zařazení — pouze při změně oproti minulému ticku
    _reloadCheckLog('[skip: dosažen limit]', _skipLimit);
    _reloadCheckLog('[skip: mimo interval násobku]', _skipInterval);
    _reloadCheckLog('[skip: neviditelná]', _skipVisibility);
    _reloadCheckLog('[skip: capping]', _skipCapping);
    _reloadCheckLog('[skip: chybí DOM]', _skipNoDOM);
    _reloadCheckLog('[skip: M-PROT-1 hraje video se zvukem]', _skipActiveVideo);
    _reloadCheckLog('[skip: M-PROT-2 user-guard]', _skipUserGuard);
    _reloadCheckLog('[zařazeno: ALWAYS_VISIBLE]', _inclAlwaysVisible);
    _reloadCheckLog('[zařazeno: emptyPositions]', _inclEmptyPos);
    _reloadCheckLog('[zařazeno: viditelná (IO)]', _inclVisible);

    // Vyprázdnit set — nový cyklus sbírá od nuly.
    // VÝJIMKA (fix 2026-06-20): pozice přeskočené POUZE kvůli cadence
    // (MULTIPLE_RELOAD_INTERVAL → _skipInterval) si MUSÍ uchovat příznak „viděno".
    reloadState.seenSinceLastTick.forEach(function(_a) {
        if (_skipInterval.indexOf(_a) === -1) {
            reloadState.seenSinceLastTick.delete(_a);
        }
    });
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
            // Dočasný capping (RELOAD_CAPPING[x] > 0) NENÍ důvod k zastavení cyklu —
            // pozice se odblokuje po uplynutí cooldownu a musí dostat šanci reloadovat.
            // Permanentní capping (RELOAD_CAPPING[x] === 0) = pozice se už nereloaduje.
            if (checkCount < checkLimit) {
                if (reloadIsCapped(checkArea) && RELOAD_CAPPING[checkArea] === 0) {
                    continue; // permanentně zablokovaná — nepočítat jako remaining
                }
                anyRemaining = true; break;
            }
        }
        if (!anyRemaining) {
            _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOADING stop] žádná zbývající pozice nedosáhne dalšího reloadu (limity/capping vyčerpány)',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
            stopReloadCycle();
        }
        return;
    }

    // ── HEIGHT RESERVATION: zamkni výšku sas_mone před čištěním a reloadem ──
    reloadReserveHeight(positionsToReload);

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
        _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOADING - odesláno do CPEXu]', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', refreshCodes.join(', '));

        // ── DEFENZIVNÍ ČIŠTĚNÍ CPEX CUSTOM FORMÁTŮ ──────────────────────
        // headerbidding.refresh() v V6.0.7 volá clearAdsAfterRefresh()
        // bezpodmínečně (Denis Chytil/David Spohr, potvrzeno 23.4.2026),
        // takže duplicitní clearAds pro VŠECHNY reloadované pozice by byl
        // redundantní. ZÁROVEŇ ale způsobuje viditelný „blank slot" po dobu
        // HB aukce (~3 s), protože clearAds smaže obsah okamžitě.
        //
        // Naše logika je proto chytřejší než plošný clearAds:
        //   (a) clearAds voláme JEN pro pozice s aktivním custom formátem
        //       (detekce přes cpexPackage.customAds[elementId]) — jinak
        //       by nový render překryl starý overlay.
        //   (b) In-page bannery (regulární iframe) clearAds přeskočíme —
        //       SAS přepíše innerHTML kontejneru atomicky, žádný překryv,
        //       a uživatel nevidí prázdný slot.
        //   (c) SAS direct overlay (#sas_popup, #sas_vignette, body.branding)
        //       čistíme VŽDY — CPEX o nich neví (jsou mimo .sas_mone).
        // ─────────────────────────────────────────────────────────────────
        (function cpexPreReloadCleanup() {
            // Zjistit elementIds pro reloadované pozice
            var elementIds = [];
            refreshCodes.forEach(function(area) {
                var el = document.querySelector(
                    '.sas_mone[data-d-area="' + area + '"], .sas_mone[data-m-area="' + area + '"]'
                );
                if (el) elementIds.push(el.id);
            });
            if (elementIds.length === 0) return;

            // ── VŽDY: SAS direct popup cleanup ──────────────────────────
            // #sas_popup vytváří SAS šablona 284/164 (fixed overlay na body).
            // clearAds() o něm NEVÍ → musíme ho odstraňovat VŽDY,
            // bez ohledu na to, zda clearAds uspěje.
            // Bez tohoto: SAS→Performax přechod = starý popup + nový overlay.
            var sasPopup = document.getElementById('sas_popup');
            if (sasPopup) {
                sasPopup.remove();
                _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOAD cleanup] #sas_popup odstraněn (SAS šablona 284/164)', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
            }

            // ── VŽDY: SAS direct vignette cleanup ───────────────────────
            // #sas_vignette / #ad_sas_vignette vytváří SAS šablony 360/316
            // (resp. nové weuron náhrady 571/572). Fixed overlay na body,
            // mimo .sas_mone → clearAds() o něm NEVÍ. Plus originál 360/316
            // závisí na window.vignetteClearId (setTimeout uklízí vignette
            // automaticky) — při reloadu naplánovaný timeout zrušíme,
            // aby nedošlo k pozdnímu odstranění právě vykreslené vignette.
            ['sas_vignette', 'ad_sas_vignette'].forEach(function(id) {
                var v = document.getElementById(id);
                if (v) {
                    v.remove();
                    _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOAD cleanup] #' + id + ' odstraněn (SAS šablona 317/316/571/572)', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
                }
            });
            if (typeof window.vignetteClearId !== 'undefined') {
                try { clearTimeout(window.vignetteClearId); } catch (e) { /* noop */ }
                window.vignetteClearId = undefined;
            }

            // ── SAS branding cleanup (body.branding class) ──────────────
            // SAS šablony (197.html aj.) přidávají body.classList.add('branding').
            // Tato třída ovlivňuje layout webu — po reloadu musí být odstraněna,
            // nový branding ji případně opět přidá.
            if (getEffectiveReloadLimit('leaderboard-1') > 0 && document.body.classList.contains('branding')) {
                document.body.classList.remove('branding');
                _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOAD cleanup] body.branding class odstraněna', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
            }

            // ── AUTOMATICKÁ DETEKCE OVERLAY VS. IN-PAGE ─────────────────
            // Cílem je minimalizovat „blank slot" mezi clearAds a renderem nové
            // kreativy (typicky 3 s — doba HB aukce).
            //
            // Logika:
            //   - Pozice s custom formátem (Skin/Slideup/Interscroller/Outstream/
            //     Vignette) MUSÍ projít clearAds — jinak by nová kreativa
            //     překryla starý overlay (např. dva slideupy přes sebe).
            //     CPEX vede registr custom formátů v cpexPackage.customAds[elId].
            //   - In-page bannery (regulární iframe v .sas_mone) clearAds
            //     NEPOTŘEBUJÍ — sas.loadmone přepíše innerHTML kontejneru
            //     atomicky, k překryvu nedojde. Stará kreativa zůstane
            //     viditelná do okamžiku renderu nové → bez prázdného slotu.
            //   - RELOAD_SKIP_CLEAR_POSITIONS působí jako emergency override —
            //     pozice tam uvedené se přeskočí i kdyby měly custom format
            //     (vědomé riziko, manuální konfigurace).
            var customAdsReg = (window.cpexPackage && window.cpexPackage.customAds) || {};
            var clearIds = elementIds.filter(function(eid) {
                var el = document.getElementById(eid);
                if (!el) return false; // prvek neexistuje → není co čistit
                var area = el.getAttribute('data-d-area') || el.getAttribute('data-m-area') || '';
                if (RELOAD_SKIP_CLEAR_POSITIONS.has(area)) return false; // emergency override
                return !!customAdsReg[eid]; // jen pozice s custom formátem
            });
            if (typeof window.cpexPackage.clearAds === 'function') {
                try {
                    if (clearIds.length > 0) {
                        window.cpexPackage.clearAds(clearIds);
                        _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOAD cleanup] cpexPackage.clearAds (custom format):', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', clearIds.join(', '));
                    }
                    var skipped = elementIds.filter(function(id) { return clearIds.indexOf(id) === -1; });
                    if (skipped.length > 0) {
                        _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOAD cleanup] clearAds přeskočeno (in-page banner, SAS přepíše):', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', skipped.join(', '));
                    }
                    return;
                } catch (e) {
                    _weuronDebug && console.warn('%c[Weuron]%c [blok_0000b] [RELOAD cleanup] clearAds selhalo, fallback na ruční cleanup:', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', e);
                }
            }

            // Fallback: ruční odstranění známých CPEX overlay elementů
            var removed = [];
            // Slideup: #cpex-slideup (fixed overlay na spodku stránky)
            var slideup = document.getElementById('cpex-slideup');
            if (slideup) { slideup.remove(); removed.push('#cpex-slideup'); }
            // Skin: #cpex-skin (fixed background wrapper)
            var skin = document.getElementById('cpex-skin');
            if (skin) { skin.remove(); removed.push('#cpex-skin'); }
            // Interscroller: .cpex-interscroller-wrapper je UVNITŘ .sas_mone
            // (SAS reload přepíše), ale výška elementu (75vh) zůstává nastavená
            elementIds.forEach(function(eid) {
                var el = document.getElementById(eid);
                if (el) {
                    var wrapper = el.querySelector('.cpex-interscroller-wrapper');
                    if (wrapper) {
                        el.style.height = '';
                        el.style.position = '';
                        wrapper.remove();
                        removed.push(eid + ' .cpex-interscroller-wrapper');
                    }
                }
            });
            if (removed.length > 0) {
                _weuronDebug && console.log('%c[Weuron]%c [blok_0000b] [RELOAD cleanup] Ruční DOM cleanup:', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', removed.join(', '));
            }
        })();

        // SIZE_RESTRICTIONS_BY_WIDTH: před refresh() aukcí restorovat a re-aplikovat
        // size filtry dle aktuální šířky viewportu (viewport může být jiný než při prvním loadu).
        var _reloadW = document.documentElement.clientWidth || window.innerWidth;
        applySizeRestrictionsByWidth('hb', _reloadW);

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
    // SIZE_RESTRICTIONS_BY_WIDTH: volat před každým SAS reload loadmone()
    // (sas.setareas() nastaví/vymaže priority override dle aktuálního viewportu)
    applySizeRestrictionsByWidth('sas', document.documentElement.clientWidth || window.innerWidth);
    sas.loadmone({ mones: mones, reload: 'true' });

    // ── HEIGHT RESERVATION: release pro SAS direct cestu ─────────────
    // HB a S2S cesty uvolňují min-height v cpex_header_bidding_render
    // resp. cpex_s2s_render. SAS direct HTML šablony (branding, 728x90)
    // nemají callback do našeho kódu → sledujeme MutationObserver
    // na childList: čekáme na první addedNodes (postscribe vloží obsah).
    // Fallback timeout 10s jako safety net pro případ no-fill.
    if (getEffectiveReloadLimit('leaderboard-1') > 0) {
        positions.forEach(function(p) {
            if (!_heightReserved[p.area]) return;
            var el = document.getElementById(p.elementId);
            if (!el) return;
            var releaseObs = new MutationObserver(function(mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    if (mutations[i].addedNodes.length > 0) {
                        requestAnimationFrame(function() {
                            reloadReleaseHeight(p.area);
                        });
                        releaseObs.disconnect();
                        return;
                    }
                }
            });
            releaseObs.observe(el, { childList: true });
        });
        setTimeout(function() {
            Object.keys(_heightReserved).forEach(function(area) {
                reloadReleaseHeight(area);
            });
        }, 10000);
    }

    // Centering řešíme jen pro area, kde může být interscroller wrapper.
    // Pro ostatní pozice by to byl jen zbytečný observer i noise.
    var hasInterscrollerCandidates = positions.some(function(p) {
        return canAreaUseInterscroller(p.area);
    });
    if (hasInterscrollerCandidates) {
        // MutationObserver čeká na vložení obsahu (SAS direct cesta);
        // interně reloadCenterNonInterscroller udělá vlastní detekci po 300ms.
        positions.forEach(function(p) {
            if (!canAreaUseInterscroller(p.area)) return;
            var elc = document.getElementById(p.elementId);
            if (!elc) return;
            var centerObs = new MutationObserver(function(mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    if (mutations[i].addedNodes.length > 0) {
                        reloadCenterNonInterscroller(p.area);
                        centerObs.disconnect();
                        return;
                    }
                }
            });
            centerObs.observe(elc, { childList: true });
        });
    }

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

    // DEV-only: nastavit iniciální hodnotu monitoring atributu
    if (_weuronDebug) {
        document.body.setAttribute('weuron-reloading',
            RELOAD_MAX_CYCLES > 0 ? String(RELOAD_MAX_CYCLES) : '\u221e');
    }

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
    // DEV-only: zaznamenat finální stav
    if (_weuronDebug) {
        document.body.setAttribute('weuron-reloading', 'stopped');
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
Závislosti: ANO (blok_0000 weuron_config — LAZYLOAD_POSITIONS, blok_0000b — reloadObserver,
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
    _weuronDebug && console.log('%c[Weuron]%c [blok_0000c] ' + prefix, 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', currentSet.length === 0 ? '(prázdná množina)' : currentSet.join(', '));
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

    var w = document.documentElement.clientWidth || window.innerWidth;

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
Blok: blok_0000d
Název: custom_resources_loader
Cesta: — (nový blok, vytvořen pro per-web injekt externích zdrojů)
Použití v buildu: ANO (vykonává proměnnou CUSTOM_RESOURCES z blok_0000)
Závislosti: ANO (CUSTOM_RESOURCES z blok_0000, DOM API)

Co blok dělá:
- Implementuje loader/scheduler/condition evaluator pro proměnnou
  `CUSTOM_RESOURCES` definovanou v `blok_0000`.
- Pro každý záznam vyhodnotí časování (`when`), případně podmínku
  (`condition()`) a pak provede injekt CSS/JS dle (`type`, `source`,
  `where`).
- Idempotenci řeší přes atribut `data-weuron-cr-id="<id>"`: před
  vytvořením nového tagu se kontroluje, jestli už element s tímto
  ID v DOMu není.

Časování (when):
- 'asap'              → ihned při zpracování CUSTOM_RESOURCES
                        (volá se z konce blok_0000d).
- 'DOMContentLoaded'  → addEventListener na DOMContentLoaded;
                        pokud už document.readyState === 'interactive'
                        nebo 'complete', spustí se ihned.
- 'after-cmp-consent' → naslouchá na window event 'weuron:consent-ready'.
                        Tento event je dispatchován v cleaned.js v okamžiku,
                        kdy gdpr() callback obdrží consent (řádek ~5927).
- 'after-cleaned-init'→ naslouchá na window event 'weuron:cleaned-init'.
                        Dispatchováno na konci IIFE cleaned.js (řádek ~6222).
- 'after-first-render'→ naslouchá na window event 'weuron:first-render'.
                        Dispatchováno po prvním úspěšném sas.loadmone()
                        v call_sas_adserver (řádek ~6140).
- { delay_ms: N }     → setTimeout N ms od startu (asap).

DOM SELHÁNÍ:
- Pokud `where` ukazuje na selektor, který v DOMu není, záznam se
  přeskočí s `console.warn` (jen v debug módu).
- Pokud `value` chybí, záznam se přeskočí.

PUBLIC API (window.weuronCustomResources):
- runScope(scope)     — manuálně spustí dávku pro daný scope name
                        (užitečné při SPA navigaci nebo z UI admina).
- list()              — vrátí seznam zaznamenaných injektů (idempotenční
                        log).
*/

/**
 * Vrátí pole CUSTOM_RESOURCES, nebo prázdné pole, pokud není definováno
 * korektně. Defenzivní wrapper.
 */
function _crGetList() {
    if (typeof CUSTOM_RESOURCES === 'undefined' || !Array.isArray(CUSTOM_RESOURCES)) {
        return [];
    }
    return CUSTOM_RESOURCES;
}

/**
 * Vrátí scope name pro daný záznam (string), nezávisle na tom, zda je
 * `when` string nebo objekt { delay_ms }.
 */
function _crResolveScope(when) {
    if (when && typeof when === 'object' && typeof when.delay_ms === 'number') {
        return 'delay';
    }
    return when || 'DOMContentLoaded';
}

/**
 * Aplikuje atributy z `attrs` objektu na DOM element.
 */
function _crApplyAttrs(el, attrs) {
    if (!attrs || typeof attrs !== 'object') return;
    for (var k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) {
            try {
                el.setAttribute(k, attrs[k]);
            } catch (e) { /* ignore */ }
        }
    }
}

/**
 * Najde insert target dle `where`. Vrátí objekt { parent, ref, position }
 * nebo null.
 *
 *   - 'head'     → { parent: document.head, position: 'append' }
 *   - 'body-end' → { parent: document.body, position: 'append' }
 *   - {selector,position} → { parent, ref, position }
 */
function _crResolveTarget(where) {
    if (!where || where === 'head') {
        return { parent: document.head, position: 'append' };
    }
    if (where === 'body-end') {
        return { parent: document.body, position: 'append' };
    }
    if (typeof where === 'object' && where.selector) {
        var ref = document.querySelector(where.selector);
        if (!ref) return null;
        return { ref: ref, position: where.position || 'append' };
    }
    return { parent: document.head, position: 'append' };
}

/**
 * Vloží `el` do DOMu na cílové místo (target z _crResolveTarget).
 */
function _crInsert(el, target) {
    if (target.parent) {
        target.parent.appendChild(el);
        return;
    }
    var ref = target.ref;
    switch (target.position) {
        case 'before':  ref.parentNode.insertBefore(el, ref); break;
        case 'after':   ref.parentNode.insertBefore(el, ref.nextSibling); break;
        case 'prepend': ref.insertBefore(el, ref.firstChild); break;
        case 'append':
        default:        ref.appendChild(el); break;
    }
}

/**
 * Vytvoří DOM element pro daný záznam (link/style/script).
 * Vrátí element nebo null.
 */
function _crCreateElement(rec) {
    var el = null;
    if (rec.type === 'css') {
        if (rec.source === 'url') {
            el = document.createElement('link');
            el.rel = 'stylesheet';
            el.href = rec.value;
        } else { // inline
            el = document.createElement('style');
            el.type = 'text/css';
            el.appendChild(document.createTextNode(rec.value));
        }
    } else if (rec.type === 'js') {
        el = document.createElement('script');
        if (rec.source === 'url') {
            el.src = rec.value;
        } else { // inline
            el.appendChild(document.createTextNode(rec.value));
        }
    } else {
        return null;
    }
    if (rec.id) el.setAttribute('data-weuron-cr-id', rec.id);
    _crApplyAttrs(el, rec.attrs);
    return el;
}

/**
 * Stav loaderu — co už bylo úspěšně injektováno (per id).
 */
var _crInjected = {};

/**
 * Provede injekt jednoho záznamu. Vrací true, pokud byl injektován
 * NYNÍ; false, pokud byl přeskočen (idempotence/condition/missing target).
 */
function _crInjectOne(rec) {
    if (!rec || !rec.id || !rec.type || !rec.source || typeof rec.value === 'undefined') {
        _weuronDebug && console.warn('%c[Weuron]%c [blok_0000d] CUSTOM_RESOURCES záznam má chybějící povinná pole, přeskakuji:',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', rec);
        return false;
    }
    // Idempotence — přeskočíme, pokud už injektováno (stav nebo DOM).
    if (_crInjected[rec.id]) return false;
    if (document.querySelector('[data-weuron-cr-id="' + rec.id.replace(/"/g, '\\"') + '"]')) {
        _crInjected[rec.id] = true;
        return false;
    }
    // Condition gate.
    if (typeof rec.condition === 'function') {
        var ok = false;
        try { ok = !!rec.condition(); } catch (e) {
            _weuronDebug && console.warn('%c[Weuron]%c [blok_0000d] condition() pro id="' + rec.id + '" hodila výjimku, přeskakuji:',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', e);
            return false;
        }
        if (!ok) return false;
    }
    var target = _crResolveTarget(rec.where);
    if (!target) {
        _weuronDebug && console.warn('%c[Weuron]%c [blok_0000d] cíl pro id="' + rec.id + '" nenalezen (selector neexistuje), přeskakuji.',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
        return false;
    }
    var el = _crCreateElement(rec);
    if (!el) {
        _weuronDebug && console.warn('%c[Weuron]%c [blok_0000d] nepodařilo se vytvořit element pro id="' + rec.id + '", přeskakuji.',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
        return false;
    }
    try {
        _crInsert(el, target);
        _crInjected[rec.id] = true;
        _weuronDebug && console.log('%c[Weuron]%c [blok_0000d] injektováno id="' + rec.id + '" type=' + rec.type + ' source=' + rec.source,
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
        return true;
    } catch (e) {
        _weuronDebug && console.warn('%c[Weuron]%c [blok_0000d] insert selhal pro id="' + rec.id + '":',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', e);
        return false;
    }
}

/**
 * Spustí všechny záznamy s daným scope name ('asap', 'DOMContentLoaded',
 * 'after-cmp-consent', 'after-cleaned-init', 'after-first-render', 'delay').
 *
 * Pro 'delay' scope se navíc honoruje per-record `when.delay_ms` přes
 * setTimeout (každý záznam dostane vlastní timer).
 */
function _crRunScope(scope) {
    var list = _crGetList();
    for (var i = 0; i < list.length; i++) {
        var rec = list[i];
        var recScope = _crResolveScope(rec.when);
        if (recScope !== scope) continue;
        if (scope === 'delay') {
            (function (r) {
                var ms = (r.when && r.when.delay_ms) || 0;
                setTimeout(function () { _crInjectOne(r); }, ms);
            })(rec);
        } else {
            _crInjectOne(rec);
        }
    }
}

// Public API — pro manuální spuštění z konzole / SPA navigace / UI admina.
window.weuronCustomResources = {
    runScope: _crRunScope,
    list: function () { return Object.keys(_crInjected); },
    _state: _crInjected,
};

// --- WIRE-UP časovacích bran ---

// 'asap' — ihned.
_crRunScope('asap');

// 'delay' — naplánovat per-record setTimeout (vyhodnotí se hned).
_crRunScope('delay');

// 'DOMContentLoaded' — pokud už nastalo, spustit ihned, jinak naslouchat.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { _crRunScope('DOMContentLoaded'); });
} else {
    _crRunScope('DOMContentLoaded');
}

// 'after-cmp-consent' / 'after-cleaned-init' / 'after-first-render' —
// odběry custom eventů. Dispatch se očekává v cleaned.js v příslušných
// místech (gdpr() callback / konec IIFE / po prvním sas.loadmone).
window.addEventListener('weuron:consent-ready',  function () { _crRunScope('after-cmp-consent');  });
window.addEventListener('weuron:cleaned-init',   function () { _crRunScope('after-cleaned-init'); });
window.addEventListener('weuron:first-render',   function () { _crRunScope('after-first-render'); });

// --- KONEC BLOKU custom_resources_loader ---



/*
---------------------------------------------
Blok: blok_0000e
Název: spa_adapter
Cesta: — (nový blok pro SPA režim, aktivuje se WEB_MODE === 'spa')
Zatížení: minimální - listenery se registrují pouze
                  pokud WEB_MODE === 'spa'; v classic režimu nulový overhead)
Závislosti: ANO (WEB_MODE z blok_0000, gdpr / init_iprima_ads, reloadState
            + stopReloadCycle z blok_0000b, _crInjected z blok_0000d,
            DOM API, CustomEvent)

Co blok dělá:
  Adaptér pro Single Page Application hostitele (iprima.cz, primaplus.cz).
  V classic režimu zůstává neaktivní (větev `if (WEB_MODE === 'spa')` na
  konci IIFE ho neaktivuje). V SPA režimu:

  1. Registruje listener na document event 'AdRequest':
       e.detail = { mones: [{area, element}], newpage: bool, site: '…' }
     - Při kterémkoliv eventu: uloží detail do window._weuronSpaParams
       (volitelné — pro budoucí use-case scoped sas.loadmone).
     - Pokud newpage===true: zavolá _spaResetState() — reset reload
       counterů, IO, pbjs.winningBids*, CUSTOM_RESOURCES injekt cache,
       first-render flag.
     - Spustí `gdpr(init_iprima_ads)` — kompletní init flow per route.

  2. Registruje listener na document event 'reloadAds':
       e.detail = [{area: 'leaderboard-1', id: 'sas_2'}, ...]
     Chování řídí proměnná SPA_RELOAD_MODE (blok_0000):
       - 'sas' (DEFAULT) — pouze sas.loadmone({reload:'true'}). Žádná
         HB aukce, žádný cleanup overlayů. Maximálně blízko původnímu
         řešení v iprima_sas_config.js (init_reaload_branding_player).
       - 'sas+cpex' — HB-aware pipeline shodná s reloadCycleTick:
         reloadReserveHeight → pbjs.winningBidsSas reset → cpexPackage.
         clearAds + cleanup overlayů → headerbidding.refresh(areas) →
         bid mapping → reloadViaSas. Fallback na čistý sas.loadmone
         pokud CPEX není dostupný.
     Granularitu a frekvenci řídí SPA hostitel; centrální tick
     (RELOAD_POSITIONS) jede HB-aware vždy nezávisle na této proměnné.

  3. NESPOUŠTÍ gdpr(init_iprima_ads) automaticky na konci IIFE — čeká na
     první 'AdRequest' event od SPA hostitele.

Migrační poznámky pro SPA hostitele (např. iprima_sas_config.js):
  - Bundle se načítá jednou per page-load (atribut async OK).
  - Po načtení každé SPA route hostitel dispatchne:
        document.dispatchEvent(new CustomEvent('AdRequest', { detail: {
            mones: [{area: 'leaderboard-1', element: domEl}, ...],
            newpage: true,   // true = nová route, reset state
            site: 'iPrima'
        }}));
  - Pro granulární refresh (např. po dotočení galerie):
        document.dispatchEvent(new CustomEvent('reloadAds', { detail: [
            {area: 'wallpaper-1', id: 'sas_2'}
        ]}));
  - Branding-player reload (dříve adRealodBrandingPlayeru / 7 min):
    Pozice „brandingplayer-1" jako SAS area NEEXISTUJE. „Branding"
    je SAS šablona (197.html / 238.html / 64.html / 68.html), která
    se vrací na area `leaderboard-1` při šířce ≥ 980 px. Legacy
    proměnná `window.adRealodBrandingPlayeru` v iprima_sas_config.js
    byla jen popisný název pro special-case reload area
    `leaderboard-1`.

    DOPORUČENÝ POSTUP — centrální reload manager:
        var RELOAD_POSITIONS  = { 'leaderboard-1': 4 };  // 4× per route
        var RELOAD_INTERVAL_MS = 420000;                 // 7 minut

    Reload manager poběží stejně jako v classic režimu — IO sleduje
    .sas_mone[data-d-area="leaderboard-1"], counter se inkrementuje
    při skutečném reloadu, po 4 reloadech se zastaví. Při SPA route
    change (newpage:true) se counter automaticky resetuje (viz
    _spaResetState() níže).

    PŘIDAT M-PROT-2 GUARD pro fullscreen content playeru iPrimy:
    Reload manager jinak nezohlední, že uživatel právě sleduje
    fullscreen video v `videojs.getPlayer('prima-player')` — to je
    MIMO .sas_mone, takže M-PROT-1 ho neuvidí. Hostitel si registruje
    M-PROT-2 guard, který reload pozastaví dokud je player ve
    fullscreenu nebo je tab v pozadí:

        window.weuronReloadGuards = window.weuronReloadGuards || {};
        window.weuronReloadGuards['leaderboard-1'] = function (ctx) {
            // ctx = { area, el, now }
            // return true  = NESMÍ se reloadovat (uživatel interaguje)
            // return false = smí (interakce není aktivní)
            try {
                if (document.hidden) return true;
                if (typeof videojs === 'undefined' ||
                    typeof videojs.getPlayer !== 'function') return false;
                var p = videojs.getPlayer('prima-player');
                if (p && p.isFullscreen_ === true) return true;
            } catch (_e) {  }
            return false;
        };

    Skipnutý tick neztrácí cyklus — counter `RELOAD_POSITIONS` se
    inkrementuje jen při skutečném reloadu (viz dokumentace M-PROT-2
    v blok_0000b výše).

    ALTERNATIVA — host-driven (pokud nechcete centrální tick):
    Hostitel si může reload řídit sám přes vlastní `setInterval` →
    `document.dispatchEvent(new CustomEvent('reloadAds', { detail:
    [{ area: 'leaderboard-1', id: 'sas_X' }] }))`. V tom případě
    nastavte `RELOAD_POSITIONS = { 'leaderboard-1': 0 }` (manager
    reload pozice neprovede), fullscreen guard si hostitel řeší
    uvnitř svého setInterval callbacku stejně jako v původním
    `reload_branding_player()`.

Komentář agenta:
  Zero-overhead pro classic režim: helper funkce jsou definované vždy
  (V8 lazy-kompiluje funkce, které se nezavolají), ale jediný runtime
  zásah je `if (WEB_MODE === 'spa') { _spaActivate(); } else { gdpr(...); }`
  na konci IIFE. Žádné listenery se v classic režimu neregistrují.
---------------------------------------------
*/

/**
 * Resetuje per-route state před opětovným spuštěním init flow při
 * SPA navigaci (newpage:true). Volá se z 'AdRequest' listeneru.
 */
function _spaResetState() {
    // 1) Zastavit centrální reload tick (pokud běžel).
    try { if (typeof stopReloadCycle === 'function') stopReloadCycle(); } catch (e) { /* ignore */ }

    // 2) Resetovat reloadState (mutace fieldů — reloadState je const, ale
    //    fields jsou přiřaditelné).
    try {
        reloadState.globalCount = 0;
        reloadState.positionCounts = {};
        reloadState.seenSinceLastTick = new Set();
        reloadState.cappedAt = {};
        reloadState.emptyPositions = new Set();
        reloadState.timerId = null;
        reloadState.active = false;
    } catch (e) { /* ignore */ }

    // 3) Vyčistit IO observer registrace na staré .sas_mone elementy
    //    (po SPA route change můžou být odrouterovány).
    try { if (typeof reloadObserver !== 'undefined' && reloadObserver) reloadObserver.disconnect(); } catch (e) { /* ignore */ }

    // 4) Vyčistit HB cache.
    try {
        if (window.pbjs) {
            window.pbjs.winningBids = {};
            window.pbjs.winningBidsSas = {};
        }
    } catch (e) { /* ignore */ }

    // 5) CUSTOM_RESOURCES — povolit opětovný re-injekt 'after-first-render'
    //    záznamů na nové route (idempotenční flag se obnoví).
    try { window._weuronFirstRenderDispatched = false; } catch (e) { /* ignore */ }

    _weuronDebug && console.log('%c[Weuron]%c [blok_0000e] SPA state reset (newpage:true)',
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
}

/**
 * Listener pro granulární refresh pozic ze strany SPA hostitele.
 * detail = [{area: 'leaderboard-1', id: 'sas_2'}, ...]
 *
 * Chování řídí proměnná SPA_RELOAD_MODE (blok_0000):
 *
 *   'sas' (DEFAULT) — čistý sas.loadmone({reload:'true'}). Žádná HB
 *      aukce, žádný cleanup overlayů. Maximálně blízko původnímu
 *      řešení v iprima_sas_config.js (init_reaload_branding_player).
 *      Bezpečná cesta s minimem bočních efektů.
 *
 *   'sas+cpex' — HB-aware pipeline shodná s reloadCycleTick (blok_0000b):
 *      reloadReserveHeight → pbjs.winningBidsSas reset → cpexPackage.
 *      clearAds + overlay cleanup → headerbidding.refresh(areas) →
 *      bid mapping → reloadViaSas. Pokud CPEX není dostupný, fallback
 *      na čistý sas.loadmone.
 *
 * Pozn.: Logika 'sas+cpex' větve musí být volně synchronizována
 * s reloadCycleTick. Při úpravě HB cleanup pravidel v blok_0000b
 * zopakovat zde.
 */
function _spaReloadAreas(detail) {
    if (!Array.isArray(detail) || detail.length === 0) return;
    var positions = [];
    for (var i = 0; i < detail.length; i++) {
        var it = detail[i];
        if (it && it.area && it.id) {
            positions.push({ area: it.area, elementId: it.id });
        }
    }
    if (positions.length === 0) return;

    // ── 'sas' režim (DEFAULT) — čistý sas.loadmone, žádný HB ────────
    if (SPA_RELOAD_MODE !== 'sas+cpex') {
        try {
            if (typeof sas !== 'undefined' && typeof sas.loadmone === 'function') {
                var mones = positions.map(function (p) {
                    return { id: p.elementId, area: p.area };
                });
                sas.loadmone({ mones: mones, reload: 'true' });
                _weuronDebug && console.log('%c[Weuron]%c [blok_0000e] SPA reloadAds → sas.loadmone (mode=sas)',
                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', mones);
            }
        } catch (e) {
            _weuronDebug && console.warn('%c[Weuron]%c [blok_0000e] SPA reloadAds selhal:',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', e);
        }
        return;
    }

    // ── 'sas+cpex' režim — HB-aware pipeline (jako reloadCycleTick) ──

    // 1) Height reservation — zabrání layout-shift při pomalé HB aukci.
    try { reloadReserveHeight(positions); } catch (_e) { /* ignore */ }

    // 2) Vymazat stará HB data před reloadem.
    if (typeof pbjs !== 'undefined' && pbjs.winningBidsSas) {
        pbjs.winningBidsSas = {};
    }

    var refreshCodes = positions.map(function (p) { return p.area; });
    var elementIds   = positions.map(function (p) { return p.elementId; });

    var hasCpex = (typeof window.cpexHbRender !== 'undefined' &&
                   typeof window.cpexPackage !== 'undefined' &&
                   window.cpexPackage.headerbidding &&
                   typeof window.cpexPackage.headerbidding.refresh === 'function');

    if (!hasCpex) {
        _weuronDebug && console.log('%c[Weuron]%c [blok_0000e] SPA reloadAds → SAS only (mode=sas+cpex, CPEX nedostupný)',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', refreshCodes);
        try { reloadViaSas(positions); } catch (_e) { /* ignore */ }
        return;
    }

    // 3) Defenzivní cleanup overlay elementů — totožné s reloadCycleTick.
    try {
        if (typeof window.cpexPackage.clearAds === 'function') {
            try { window.cpexPackage.clearAds(elementIds); }
            catch (_e) { /* clearAds selhalo, pokračujeme s manuálním cleanupem */ }
        }
        var sasPopup = document.getElementById('sas_popup');
        if (sasPopup) sasPopup.remove();
        ['sas_vignette', 'ad_sas_vignette'].forEach(function (id) {
            var v = document.getElementById(id);
            if (v) v.remove();
        });
        if (typeof window.vignetteClearId !== 'undefined') {
            try { clearTimeout(window.vignetteClearId); } catch (_e) { /* noop */ }
            window.vignetteClearId = undefined;
        }
        if (refreshCodes.indexOf('leaderboard-1') !== -1 &&
            document.body.classList.contains('branding')) {
            document.body.classList.remove('branding');
        }
    } catch (_e) { /* cleanup nesmí blokovat reload */ }

    // 4) HB aukce.
    var refreshPromise;
    try {
        refreshPromise = window.cpexPackage.headerbidding.refresh(refreshCodes);
    } catch (_e) {
        refreshPromise = Promise.resolve(null);
    }
    if (!refreshPromise || typeof refreshPromise.then !== 'function') {
        refreshPromise = Promise.resolve(null);
    }

    _weuronDebug && console.log('%c[Weuron]%c [blok_0000e] SPA reloadAds → CPEX HB refresh (mode=sas+cpex)',
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', refreshCodes.join(', '));

    // 5) Bid mapping + 6) SAS reload.
    var afterHb = function () {
        if (typeof pbjs !== 'undefined' && typeof pbjs.getHighestCpmBids === 'function') {
            refreshCodes.forEach(function (area) {
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
                } catch (_e) { /* bid mapping error */ }
            });
        }
        try { reloadViaSas(positions); } catch (_e) { /* ignore */ }
    };
    refreshPromise.then(afterHb).catch(afterHb);
}

/**
 * Aktivuje SPA režim — zaregistruje listenery a čeká na první AdRequest.
 * Volá se na konci IIFE pouze když WEB_MODE === 'spa'.
 */
function _spaActivate() {
    // 1) Listener na 'AdRequest' (per-route init flow).
    document.addEventListener('AdRequest', function (e) {
        var detail = (e && e.detail) || null;
        try { window._weuronSpaParams = detail; } catch (_e) { /* ignore */ }

        if (detail && detail.newpage === true) {
            _spaResetState();
        }

        try { gdpr(init_iprima_ads); } catch (err) {
            _weuronDebug && console.warn('%c[Weuron]%c [blok_0000e] gdpr(init_iprima_ads) selhal:',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', err);
        }
    }, false);

    // 2) Listener na 'reloadAds' (granulární refresh).
    document.addEventListener('reloadAds', function (e) {
        var detail = (e && e.detail) || [];
        _spaReloadAreas(detail);
    }, false);

    // 3) Signalizovat SPA hostiteli, že bundle je ready — ekvivalent
    //    `window.adsScriptIsReady = true; document.dispatchEvent(new Event('adsScriptIsReady'));`
    //    z originálního iprima_sas_config.js. Vue app iprima.cz čeká na tento
    //    event (nebo kontroluje window.adsScriptIsReady) před prvním AdRequest.
    if (typeof window.adsScriptIsReady === 'undefined') {
        window.adsScriptIsReady = true;
        try {
            document.dispatchEvent(new Event('adsScriptIsReady'));
            _weuronDebug && console.log('%c[Weuron]%c [blok_0000e] adsScriptIsReady dispatched',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
        } catch (_e) { /* ignore */ }
    }

    _weuronDebug && console.log('%c[Weuron]%c [blok_0000e] SPA režim aktivní — čekám na document event \'AdRequest\'',
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
}

// --- KONEC BLOKU spa_adapter ---



/*
---------------------------------------------
Blok: blok_0000f
Název: width_filter
Cesta: — (nový konfigurační blok, žádný zdrojový soubor)
Závislosti: ANO (HIDE_POSITIONS_BY_WIDTH z blok_0000,
                 BRANDING_MIN_WIDTH z blok_0000,
                 DOM API — document.querySelectorAll)

Co blok dělá:
  Implementuje width-podmíněné odebrání reklamních pozic z DOM a
  výpočet parametru "branding" pro sas.loadmone — obě operace
  musí proběhnout PŘED prvním voláním sas.loadmone (resp. před HB aukcí).

  Exportuje dvě funkce volané z call_sas_adserver (blok_0023g):
    • applyHidePositionsByWidth()   — DOM removal dle HIDE_POSITIONS_BY_WIDTH
    • resolvebranding()             — výpočet branding bool dle BRANDING_MIN_WIDTH

Vztah k ostatním mechanismům:
  RESPONSIVE_BREAKPOINTS (blok_0000) — filtr šířky pro lazyload manager.
    Odlišný účel: neodebírá z DOM, pouze říká lazyload manageru kdy
    se má spustit render. Pozice uvedená v RESPONSIVE_BREAKPOINTS ale
    NE v HIDE_POSITIONS_BY_WIDTH zůstane v DOM a SAS ji zpracuje.

  matchesDevice() (blok_0023e/0023g) — filtr desktop/mobile pro HB aukci.
    Odlišný účel: řídí, které adUnits vstoupí do Prebid aukce (CPEX).
    Pokud position chybí v DOM (odebráno applyHidePositionsByWidth),
    matchesDevice ji rovněž přeskočí — obě ochrany jsou komplementární.
---------------------------------------------
*/

// --- ZAČÁTEK BLOKU width_filter ---

/**
 * applyRewritePositionsByWidth
 * ─────────────────────────────────────────────────────────────────────────
 * Projde mapu REWRITE_POSITIONS_BY_WIDTH a pro každou pozici, která splňuje
 * width podmínku, přepíše atribut DOM elementu na cílovou area hodnotu.
 *
 * Oba směry přepisu (symetricky):
 *   data-d-area → data-m-area  (desktop→mobil, pro DEVICE_BREAKPOINT vysoko)
 *   data-m-area → data-d-area  (mobil→desktop, pro DEVICE_BREAKPOINT nízko)
 * Směr atributu se odvozuje z názvu area: /mobile/ → data-m-area, jinak data-d-area.
 *
 * DŮLEŽITÉ: DEVICE_BREAKPOINT musí odpovídat směru přepisu — viz komentář
 * u proměnné REWRITE_POSITIONS_BY_WIDTH v blok_0000.
 *
 * Volat PŘED applyHidePositionsByWidth() i PŘED sas.loadmone.
 *
 * @returns {Object} mapa { fromArea: toArea } přepsaných pozic (pro debug log)
 */
function applyRewritePositionsByWidth() {
    var rewrote = {};
    if (!REWRITE_POSITIONS_BY_WIDTH || typeof REWRITE_POSITIONS_BY_WIDTH !== 'object') return rewrote;

    var w = document.documentElement.clientWidth || window.innerWidth;
    for (var from in REWRITE_POSITIONS_BY_WIDTH) {
        if (!Object.prototype.hasOwnProperty.call(REWRITE_POSITIONS_BY_WIDTH, from)) continue;
        var rule = REWRITE_POSITIONS_BY_WIDTH[from];
        if (!rule || typeof rule.to !== 'string') continue;

        var passMin = (typeof rule.minWidth !== 'number') || (w >= rule.minWidth);
        var passMax = (typeof rule.maxWidth !== 'number') || (w <= rule.maxWidth);
        if (!passMin || !passMax) continue;

        var fromAttr = /mobile/.test(from)    ? 'data-m-area' : 'data-d-area';
        var toAttr   = /mobile/.test(rule.to) ? 'data-m-area' : 'data-d-area';

        try {
            var nodes = document.querySelectorAll('.sas_mone[' + fromAttr + '="' + from + '"]');
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i]) {
                    nodes[i].removeAttribute(fromAttr);
                    nodes[i].setAttribute(toAttr, rule.to);
                }
            }
            if (nodes.length > 0) {
                rewrote[from] = rule.to;
                _weuronDebug && console.log(
                    '%c[Weuron]%c [blok_0000f] [REWRITE] ' + fromAttr + '="' + from + '" → ' + toAttr + '="' + rule.to + '"' +
                    ' (' + nodes.length + ' elem) | šířka=' + w + 'px',
                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', ''
                );
            }
        } catch (e) {
            _weuronDebug && console.warn('%c[Weuron]%c [blok_0000f] [REWRITE] chyba u pozice ' + from + ':',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', e);
        }
    }

    // Detekce konfliktu: stejná FROM area v REWRITE i HIDE pro aktuální viewport
    if (typeof HIDE_POSITIONS_BY_WIDTH === 'object' && HIDE_POSITIONS_BY_WIDTH) {
        for (var fromCheck in rewrote) {
            if (Object.prototype.hasOwnProperty.call(HIDE_POSITIONS_BY_WIDTH, fromCheck)) {
                var hideRule = HIDE_POSITIONS_BY_WIDTH[fromCheck];
                var hPassMin = (typeof hideRule.minWidth !== 'number') || (w >= hideRule.minWidth);
                var hPassMax = (typeof hideRule.maxWidth !== 'number') || (w <= hideRule.maxWidth);
                if (hPassMin && hPassMax) {
                    console.warn('[Weuron] [blok_0000f] KONFLIKT: "' + fromCheck + '" je v REWRITE_POSITIONS_BY_WIDTH' +
                        ' i HIDE_POSITIONS_BY_WIDTH pro viewport=' + w + 'px' +
                        ' — HIDE přepíše efekt REWRITE. Zkontroluj konfiguraci blok_0000.');
                }
            }
        }
    }

    return rewrote;
}

/**
 * applyHidePositionsByWidth
 * ─────────────────────────────────────────────────────────────────────────
 * Projde mapu HIDE_POSITIONS_BY_WIDTH a pro každou pozici, která splňuje
 * width podmínku při aktuální šířce okna, odebere z DOM všechny odpovídající
 * .sas_mone elementy (včetně jejich parentElement wrapperu — shodně s
 * chováním remone_sas_mone v cnn_sas_config.js).
 *
 * Pravidlo pro data-*-area selektor (shodné s remone_sas_mone):
 *   • název NEOBSAHUJE "mobile" → .sas_mone[data-d-area="<name>"]
 *   • název OBSAHUJE    "mobile" → .sas_mone[data-m-area="<name>"]
 *
 * Volat PŘED sas.loadmone i PŘED add_nonstandard_mone (resp. na začátku
 * call_sas_adserver).
 *
 * @returns {string[]} pole názvů adUnit, které byly odebrány (pro debug log)
 */
function applyHidePositionsByWidth() {
    var removed = [];
    if (!HIDE_POSITIONS_BY_WIDTH || typeof HIDE_POSITIONS_BY_WIDTH !== 'object') return removed;

    var w = document.documentElement.clientWidth || window.innerWidth;
    for (var area in HIDE_POSITIONS_BY_WIDTH) {
        if (!Object.prototype.hasOwnProperty.call(HIDE_POSITIONS_BY_WIDTH, area)) continue;
        var rule = HIDE_POSITIONS_BY_WIDTH[area];
        if (!rule || typeof rule !== 'object') continue;

        // Vyhodnotit podmínku: minWidth = odebrat pokud w >= minWidth,
        //                       maxWidth = odebrat pokud w <= maxWidth.
        // Lze kombinovat: { minWidth: 768, maxWidth: 1079 } = tablet range.
        var passMin = (typeof rule.minWidth !== 'number') || (w >= rule.minWidth);
        var passMax = (typeof rule.maxWidth !== 'number') || (w <= rule.maxWidth);
        if (!passMin || !passMax) continue; // podmínka nesplněna → nechme pozici být

        // Sestavit CSS selektor shodně s remone_sas_mone
        var isMobile = /mobile/.test(area);
        var selector = isMobile
            ? '.sas_mone[data-m-area="' + area + '"]'
            : '.sas_mone[data-d-area="' + area + '"]';

        try {
            var nodes = document.querySelectorAll(selector);
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i] && nodes[i].parentElement) {
                    nodes[i].parentElement.remove();
                }
            }
            if (nodes.length > 0) {
                removed.push(area);
                _weuronDebug && console.log(
                    '%c[Weuron]%c [blok_0000f] [HIDE] odebráno: ' + area +
                    ' (' + nodes.length + ' elem) | šířka=' + w + 'px' +
                    ' | pravidlo=' + JSON.stringify(rule),
                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', ''
                );
            }
        } catch (e) {
            // Defenzivní: pokud querySelector selže, pokračuj s ostatními pozicemi
            _weuronDebug && console.warn('%c[Weuron]%c [blok_0000f] [HIDE] chyba u pozice ' + area + ':', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', e);
        }
    }

    if (removed.length === 0) {
        _weuronDebug && console.log(
            '%c[Weuron]%c [blok_0000f] [HIDE] žádná pozice neodpovídá šířce ' + w + 'px — DOM beze změny',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', ''
        );
    } else {
        _weuronDebug && console.log(
            '%c[Weuron]%c [blok_0000f] [HIDE] celkem odebráno ' + removed.length + ' pozic: [' + removed.join(', ') + ']',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', ''
        );
    }

    return removed;
}

/**
 * resolveBranding
 * ─────────────────────────────────────────────────────────────────────────
 * Vrátí boolean pro parametr "branding" v sas.loadmone na základě
 * proměnné BRANDING_MIN_WIDTH a aktuální šířky okna.
 *
 *   BRANDING_MIN_WIDTH = 0 nebo false → vždy true (původní hardcoded chování)
 *   BRANDING_MIN_WIDTH = N > 0        → true pokud window.innerWidth >= N,
 *                                        jinak false
 *
 * DŮLEŽITÉ — OMEZENÍ TOHOTO PARAMETRU:
 *   Parametr "branding" v sas.loadmone() NEMÁ přímý vliv na doručení
 *   branding kreativy skrze CPEX HB/S2S. Funkce enableBranding() v sas.js
 *   je zakomentována — vždy vrací prázdný řetězec, tedy "branding: false"
 *   nezmění formáty v SAS URL.
 *
 *   Skutečná ochrana před nechtěnou brandingovou kreativou probíhá jinak:
 *   1. CPEX HB (client-side): v cpexPackageLoaded handleru, před runAuction(),
 *      je [2000,1400] odebráno z leaderboard-1 adUnit v cpexWebsiteSettings.
 *      Tím CPEX vůbec neodesílá bid na branding → SAS nedostane
 *      bidderSize=2000x1400 → branding se nedoručí.
 *   2. CPEX S2S / SAS direct: sas.loadmone() stále nedostane 2000x1400
 *      jako winning HB bid → branding se taktéž nedoručí.
 *
 *   Tato funkce je zachována pro případ, že sas.js bude v budoucnu opraven
 *   (enableBranding odkomentována) nebo pro dokumentační hodnotu.
 *
 * @returns {boolean}
 */
function resolveBranding() {
    if (!BRANDING_MIN_WIDTH || typeof BRANDING_MIN_WIDTH !== 'number' || BRANDING_MIN_WIDTH <= 0) {
        return true; // výchozí — branding vždy zapnutý
    }
    var result = (document.documentElement.clientWidth || window.innerWidth) >= BRANDING_MIN_WIDTH;
    _weuronDebug && console.log(
        '%c[Weuron]%c [blok_0000f] [BRANDING] šířka=' + (document.documentElement.clientWidth || window.innerWidth) +
        'px, BRANDING_MIN_WIDTH=' + BRANDING_MIN_WIDTH + 'px → branding=' + result,
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', ''
    );
    return result;
}

/**
 * applySizeRestrictionsByWidth — aplikuje SIZE_RESTRICTIONS_BY_WIDTH z blok_0000.
 *
 * Volat DVAKRÁT:
 *   target='hb'  — PŘED runAuction() v cpexPackageLoaded handleru (blok_0011)
 *                  filtruje mediaTypes.banner.sizes v cpexWebsiteSettings adUnits
 *   target='sas' — PŘED sas.loadmone() v call_sas_adserver (blok_0023g)
 *                  volá sas.setareas(map) — priority override v areaSize()
 *
 * Pro SAS side výpočet allowed-string používáme area_size_mapping (block_0000):
 *   SAS_EMBEDDED=true  → area_size_mapping je zároveň živá tabulka embedded SASu (blok_0000h).
 *   SAS_EMBEDDED=false → SAS má vlastní tabulku v CDN sas.js; my použijeme tutéž
 *                        block_0000 proměnnou (jediný zdroj, žádná duplicitní kopie).
 *
 * @param {string} target  'hb' nebo 'sas'
 * @param {number} _w      viewport šířka (clientWidth || innerWidth)
 */
function applySizeRestrictionsByWidth(target, _w) {
    if (typeof SIZE_RESTRICTIONS_BY_WIDTH === 'undefined' || !SIZE_RESTRICTIONS_BY_WIDTH) return;
    var _restrictions = SIZE_RESTRICTIONS_BY_WIDTH;
    var _areas = Object.keys(_restrictions);
    if (_areas.length === 0) return;

    if (target === 'hb') {
        // ── HB aukce: filtrovat cpexWebsiteSettings.headerbidding.adUnits
        // RELOAD-SAFE: origální sizes se cachují při prvním volání a před každým
        // filtrováním se obnoví → funkce je idempotentí a viewport-senzitivní
        // (změna viewportu mezi reload cykly se projeví správně).
        try {
            var _wsAdUnits = window.cpexWebsiteSettings &&
                             window.cpexWebsiteSettings.headerbidding &&
                             window.cpexWebsiteSettings.headerbidding.adUnits;
            if (!_wsAdUnits) return;
            for (var ai = 0; ai < _wsAdUnits.length; ai++) {
                var _adUnit = _wsAdUnits[ai];
                var _rule = _restrictions[_adUnit.code];
                if (!_rule || !Array.isArray(_rule.removeSizes)) continue;
                if (!_adUnit.mediaTypes || !_adUnit.mediaTypes.banner ||
                    !Array.isArray(_adUnit.mediaTypes.banner.sizes)) continue;
                var _banner = _adUnit.mediaTypes.banner;
                // Cache: zachovat původní sizes před jakýmkoli filtrováním
                if (!_banner._originalSizes) {
                    _banner._originalSizes = _banner.sizes.slice();
                }
                // Restore: vždy začínat od originálu (správné chování při změně viewportu)
                _banner.sizes = _banner._originalSizes.slice();
                var _inRange = true;
                if (_rule.minWidth !== undefined && _w < _rule.minWidth) _inRange = false;
                if (_rule.maxWidth !== undefined && _w > _rule.maxWidth) _inRange = false;
                if (!_inRange) continue; // mimo range: sizes obnoveny, filtr nepoužít
                var _before = _banner.sizes.length;
                var _remove = _rule.removeSizes;
                _banner.sizes = _banner.sizes.filter(function(sz) {
                    if (!Array.isArray(sz)) return true;
                    for (var ri = 0; ri < _remove.length; ri++) {
                        if (sz[0] === _remove[ri][0] && sz[1] === _remove[ri][1]) return false;
                    }
                    return true;
                });
                if (_banner.sizes.length < _before) {
                    _weuronDebug && console.log(
                        '%c[Weuron]%c [SIZE_RESTRICTIONS] HB [' + _adUnit.code + '] odebráno ' +
                        (_before - _banner.sizes.length) +
                        ' formátů (viewport=' + _w + 'px)',
                        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
                }
            }
        } catch (_e) { /* silent — nezastavit aukci */ }
    }

    if (target === 'sas') {
        // ── Přímé SAS kampaně: sas.setareas(map) → priority override v areaSize() ──
        if (typeof window.sas === 'undefined' || typeof window.sas.setareas !== 'function') return;
        // Pro výpočet filtered string používáme STEJNOU tabulku rozměrů, jakou používá SAS:
        // area_size_mapping je JEDINÁ proměnná v block_0000 (vedle SAS_SITE_BY_DOMAIN), společná
        // pro embedded SAS i tuto funkci. Žádná duplicitní kopie — zdroj pravdy je
        // src/echo24/dev/SAS/sas_mone_area_sizes.js (shodu kontrolovat při merge requestu).
        //
        // MZ_1a (2026-06-20): Dříve zde byla DRUHÁ (ručně udržovaná) kopie tabulky — navíc
        //   zpočátku ZKRÁCENÁ (jen 8 pozic z 'default') a bez per-web sekcí → dvojitá údržba
        //   a riziko driftu. Nyní se čte přímo area_size_mapping (block_0000).
        var _areaMap = (typeof area_size_mapping !== 'undefined' && area_size_mapping)
            ? area_size_mapping
            : {};
        var _defaultMap = _areaMap['default'] || {};

        // MZ_1a (2026-06-20): Replikace SAS rezoluce areaSize() — priorita per-web > default.
        //   SAS (sas_unminify.js / blok_0000h, fn areaSize) vybírá rozměry takto:
        //     configSite = (section ∈ {mobile,desktop,web_mobile,web_desktop}) ? site : section
        //     výsledek   = priority[area]  >  area_size_mapping[configSite][area]  >  default[area]
        //   My počítáme NOVÝ priority override, takže priority ignorujeme a základ bereme
        //   z per-web sekce (pokud pro daný web existuje), jinak z 'default'. Bez tohoto kroku
        //   by se na webu s vlastní sekcí (např. NaKluky, Playzone) počítal špatný základ
        //   a setareas by přebil per-web nastavení SASu.
        //   'site' = SAS_SITE (odvozen z WEURON_DOMAIN přes SAS_SITE_BY_DOMAIN, block_0000);
        //   'section' odvozujeme z viewportu jako call_sas_adserver.
        var _sasSite = (typeof SAS_SITE !== 'undefined' && SAS_SITE) ? SAS_SITE : '';
        var _sasBp = (typeof DEVICE_BREAKPOINT !== 'undefined') ? DEVICE_BREAKPOINT : 768;
        var _sasSection = _w < _sasBp ? 'mobile' : 'desktop';
        var _configSite = (_sasSection === 'mobile' || _sasSection === 'desktop' ||
                           _sasSection === 'web_mobile' || _sasSection === 'web_desktop')
            ? _sasSite
            : _sasSection;
        var _perSiteMap = (_areaMap[_configSite] && typeof _areaMap[_configSite] === 'object')
            ? _areaMap[_configSite]
            : null;
        var _sasMap = {};
        for (var si = 0; si < _areas.length; si++) {
            var _area = _areas[si];
            var _sRule = _restrictions[_area];
            if (!_sRule || !Array.isArray(_sRule.removeSizes)) continue;
            var _sInRange = true;
            if (_sRule.minWidth !== undefined && _w < _sRule.minWidth) _sInRange = false;
            if (_sRule.maxWidth !== undefined && _w > _sRule.maxWidth) _sInRange = false;
            if (!_sInRange) continue;
            // Základ rozměrů: per-web sekce (pokud pro daný web existuje), jinak 'default'
            // — stejná priorita jako SAS areaSize() (per-web > default). Viz _configSite výše.
            var _base = (_perSiteMap && _perSiteMap[_area]) || _defaultMap[_area];
            if (!_base) {
                // MZ_1a (2026-06-20): pozice je v SIZE_RESTRICTIONS_BY_WIDTH, ale chybí
                // v tabulce rozměrů → omezení pro přímé SAS kampaně NELZE spočítat.
                // Dříve se zde tiše přeskočilo (skrytá nefunkčnost). Nyní hlasitě varujeme.
                // Pozici doplňte do proměnné area_size_mapping v block_0000 (a do zdroje pravdy
                // src/echo24/dev/SAS/sas_mone_area_sizes.js). Při SAS_EMBEDDED=false navíc ověřte,
                // že tutéž pozici zná i CDN sas.js (SAS si v tom režimu čte vlastní tabulku).
                var _kam = (typeof SAS_EMBEDDED !== 'undefined' && SAS_EMBEDDED)
                    ? 'proměnné area_size_mapping v block_0000 (a do zdroje pravdy src/echo24/dev/SAS/sas_mone_area_sizes.js)'
                    : 'proměnné area_size_mapping v block_0000 (a do zdroje pravdy src/echo24/dev/SAS/sas_mone_area_sizes.js; v režimu false zároveň musí pozici znát i CDN sas.js)';
                console.warn(
                    '[Weuron] [SIZE_RESTRICTIONS] Pozice "' + _area + '" (web/section "' + _configSite +
                    '", SAS_EMBEDDED=' + (typeof SAS_EMBEDDED !== 'undefined' ? SAS_EMBEDDED : 'undef') +
                    ') není v tabulce rozměrů — SAS omezení se NEAPLIKUJE. Doplňte pozici do ' + _kam + '.');
                continue;
            }
            var _removeStrs = _sRule.removeSizes.map(function(s) { return s[0] + 'x' + s[1]; });
            var _allowed = _base.split(',').filter(function(s) {
                return _removeStrs.indexOf(s) === -1;
            }).join(',');
            if (_allowed) _sasMap[_area] = _allowed;
        }
        try {
            if (Object.keys(_sasMap).length > 0) {
                // Omezení platí: nastavit priority override
                window.sas.setareas(_sasMap);
                _weuronDebug && console.log(
                    '%c[Weuron]%c [SIZE_RESTRICTIONS] SAS setareas (viewport=' + _w + 'px):',
                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                    _sasMap);
            } else {
                // Mimo range: vymazat případný předchozí priority override
                // (setareas({}) → state.moneArea.priority = {} → areaSize() použije default)
                window.sas.setareas({});
                _weuronDebug && console.log(
                    '%c[Weuron]%c [SIZE_RESTRICTIONS] SAS setareas clear — viewport=' + _w + 'px mimo range, resetuji priority',
                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
            }
        } catch (_e) { /* silent */ }
    }
}

// --- KONEC BLOKU width_filter ---



/*
---------------------------------------------
Blok: blok_0000g
Název: custom_css_injector
Cesta: — (nový blok)
Závislosti: ANO (blok_0000: CUSTOM_CSS)
Komentář agenta:
Vloží obsah proměnné CUSTOM_CSS jako <style id="weuron-custom-css"> do <head>.
Spouští se synchronně při inicializaci — před voláním SAS/CPEX.
Idempotentní: pokud element již existuje (SPA re-init), přepíše jen obsah.
---------------------------------------------
*/
(function() {
    if (typeof CUSTOM_CSS !== 'string' || !CUSTOM_CSS.trim()) return;
    var _existing = document.getElementById('weuron-custom-css');
    if (_existing) {
        _existing.textContent = CUSTOM_CSS;
    } else {
        var _style = document.createElement('style');
        _style.id = 'weuron-custom-css';
        _style.textContent = CUSTOM_CSS;
        (document.head || document.documentElement).appendChild(_style);
    }
    _weuronDebug && console.log('%c[Weuron]%c [blok_0000e] CUSTOM_CSS vložen (' + CUSTOM_CSS.length + ' znaků)',
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
})();

// --- KONEC BLOKU custom_css_injector

/*
---------------------------------------------
Blok: blok_0000h
Název: embedded_sas
Cesta: src/sas/sas.js (webpack bundle z sas_core.js + assets)
Aktivní: pouze pokud SAS_EMBEDDED = true (blok_0000)
Popis: Embedded verze produkčního sas.js.
       Obsah je 1:1 s webpack bundle (https://static.primacdn.cz/sas/sas/sas.js?v=260).
       Postscribe v2.0.8 je vložen inline ze src/sas/assets/sas_postscribe.js.
       Při SAS_EMBEDDED=false se blok přeskočí, sas.js se načte z CDN (blok_0003).
ÚDRŽBA: při upgrade CDN sas.js — diff sas_unminify.txt vs nový bundle a synchronizovat.
Závislosti: SAS_EMBEDDED (blok_0000)
Sdílení: area_size_mapping je nově definován v block_0000 (mezi konfiguračními proměnnými);
         embedded SAS i applySizeRestrictionsByWidth ho čtou z outer IIFE scope (MZ_1a 2026-06-20).
---------------------------------------------
*/
// --- ZAČÁTEK BLOKU embedded_sas ---
// area_size_mapping je nově definován v block_0000 (mezi konfiguračními proměnnými) —
// embedded SAS níže ho čte z outer IIFE scope (už se zde NEdefinuje, viz MZ_1a 2026-06-20).
(function() {
    if (typeof SAS_EMBEDDED === 'undefined' || !SAS_EMBEDDED) return;
    // =============================================================================
    // 1. change_sas_status (webpack module 2963)
    //    Soubor: src/sas/assets/change_sas_status.js
    // =============================================================================
    
    function change_sas_status(id, area, status) {
        const element = document.getElementById(id);
        if (element) {
            document.getElementById(id).setAttribute("data-sas_status", status);
        }
    }
    
    // =============================================================================
    // 2. sas_mones_lazyload (webpack module 743)
    //    Soubor: src/sas/assets/sas_mones_lazyload.js
    // =============================================================================
    
    async function mones_lazyload(mones = [], topOffset = 0, callback) {
        if (mones.length === 0) return;
    
        function is_element_in_view_port(element, topOffset) {
            let rect = element.getBoundingClientRect();
            let viewPortBottom = window.innerHeight || document.documentElement.clientHeight;
            let elementHeight = element.clientHeight;
            let isTopInViewPort = (rect.top + elementHeight) >= 0,
                isBottomInViewPort = (rect.bottom - elementHeight - topOffset) <= viewPortBottom;
            return (isTopInViewPort && isBottomInViewPort && rect.top !== 0 && rect.bottom !== 0);
        }
    
        function scroll_lazyload() {
            try {
                if (mones.length === 0) return;
                mones.forEach((item, index) => {
                    let element = document.querySelector(`#${item.id}`);
                    let visible = is_element_in_view_port(element, topOffset);
                    let isVisible = element.getAttribute('data-mone-visible');
                    if (visible === true && isVisible === null) {
                        element.setAttribute('data-mone-visible', 'true');
                        callback(item);
                        mones.splice(index, 1);
                        if (mones.length === 0) {
                            document.removeEventListener("scroll", scroll_lazyload);
                        }
                    }
                });
            } catch (e) {
                console.error(`lazyload: ${e}`);
            }
        }
    
        // call after load
        scroll_lazyload();
        document.addEventListener("scroll", scroll_lazyload);
    }
    
    // =============================================================================
    // 3. postscribe v2.0.8 — inline (src/sas/assets/sas_postscribe.js)
    //    Nahrazuje webpack placeholder pro SAS_EMBEDDED=true.
    // =============================================================================
    /**
     * @file postscribe
     * @description Asynchronously write javascript, even with document.write.
     * @version v2.0.8
     * @see {@link https://krux.github.io/postscribe}
     * @license MIT
     * @author Derek Brans
     * @copyright 2016 Krux Digital, Inc
     * 
     */
    
    
    !function (t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports["postscribe"] = e() : t["postscribe"] = e() }(this, function () { return function (t) { function e(n) { if (r[n]) return r[n].exports; var o = r[n] = { "exports": {}, "id": n, "loaded": !1 }; return t[n].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports } var r = {}; return e.m = t, e.c = r, e.p = "", e(0) }([function (t, e, r) { "use strict"; function n(t) { return t && t.__esModule ? t : { "default": t } } var o = r(1), i = n(o); t.exports = i["default"] }, function (t, e, r) { "use strict"; function n(t) { if (t && t.__esModule) return t; var e = {}; if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]); return e["default"] = t, e } function o(t) { return t && t.__esModule ? t : { "default": t } } function i() { } function a() { var t = m.shift(); if (t) { var e = h.last(t); e.afterDequeue(), t.stream = s.apply(void 0, t), e.afterStreamStart() } } function s(t, e, r) { function n(t) { t = r.beforeWrite(t), g.write(t), r.afterWrite(t) } g = new p["default"](t, r), g.id = y++, g.name = r.name || g.id, u.streams[g.name] = g; var o = t.ownerDocument, s = { "close": o.close, "open": o.open, "write": o.write, "writeln": o.writeln }; c(o, { "close": i, "open": i, "write": function () { for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)e[r] = arguments[r]; return n(e.join("")) }, "writeln": function () { for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)e[r] = arguments[r]; return n(e.join("") + "\n") } }); var l = g.win.onerror || i; return g.win.onerror = function (t, e, n) { r.error({ "msg": t + " - " + e + ": " + n }), l.apply(g.win, [t, e, n]) }, g.write(e, function () { c(o, s), g.win.onerror = l, r.done(), g = null, a() }), g } function u(t, e, r) { if (h.isFunction(r)) r = { "done": r }; else if ("clear" === r) return m = [], g = null, void (y = 0); r = h.defaults(r, d), t = /^#/.test(t) ? window.document.getElementById(t.substr(1)) : t.jquery ? t[0] : t; var n = [t, e, r]; return t.postscribe = { "cancel": function () { n.stream ? n.stream.abort() : n[1] = i } }, r.beforeEnqueue(n), m.push(n), g || a(), t.postscribe } e.__esModule = !0; var c = Object.assign || function (t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]) } return t }; e["default"] = u; var l = r(2), p = o(l), f = r(4), h = n(f), d = { "afterAsync": i, "afterDequeue": i, "afterStreamStart": i, "afterWrite": i, "autoFix": !0, "beforeEnqueue": i, "beforeWriteToken": function (t) { return t }, "beforeWrite": function (t) { return t }, "done": i, "error": function (t) { throw new Error(t.msg) }, "releaseAsync": !1 }, y = 0, m = [], g = null; c(u, { "streams": {}, "queue": m, "WriteStream": p["default"] }) }, function (t, e, r) { "use strict"; function n(t) { if (t && t.__esModule) return t; var e = {}; if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]); return e["default"] = t, e } function o(t) { return t && t.__esModule ? t : { "default": t } } function i(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } function a(t, e) { var r = d + e, n = t.getAttribute(r); return f.existy(n) ? String(n) : n } function s(t, e) { var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, n = d + e; f.existy(r) && "" !== r ? t.setAttribute(n, r) : t.removeAttribute(n) } e.__esModule = !0; var u = Object.assign || function (t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]) } return t }, c = r(3), l = o(c), p = r(4), f = n(p), h = !1, d = "data-ps-", y = "ps-style", m = "ps-script", g = function () { function t(e) { var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; i(this, t), this.root = e, this.options = r, this.doc = e.ownerDocument, this.win = this.doc.defaultView || this.doc.parentWindow, this.parser = new l["default"]("", { "autoFix": r.autoFix }), this.actuals = [e], this.proxyHistory = "", this.proxyRoot = this.doc.createElement(e.nodeName), this.scriptStack = [], this.writeQueue = [], s(this.proxyRoot, "proxyof", 0) } return t.prototype.write = function () { var t; for ((t = this.writeQueue).push.apply(t, arguments); !this.deferredRemote && this.writeQueue.length;) { var e = this.writeQueue.shift(); f.isFunction(e) ? this._callFunction(e) : this._writeImpl(e) } }, t.prototype._callFunction = function (t) { var e = { "type": "function", "value": t.name || t.toString() }; this._onScriptStart(e), t.call(this.win, this.doc), this._onScriptDone(e) }, t.prototype._writeImpl = function (t) { this.parser.append(t); for (var e = void 0, r = void 0, n = void 0, o = []; (e = this.parser.readToken()) && !(r = f.isScript(e)) && !(n = f.isStyle(e));)e = this.options.beforeWriteToken(e), e && o.push(e); o.length > 0 && this._writeStaticTokens(o), r && this._handleScriptToken(e), n && this._handleStyleToken(e) }, t.prototype._writeStaticTokens = function (t) { var e = this._buildChunk(t); return e.actual ? (e.html = this.proxyHistory + e.actual, this.proxyHistory += e.proxy, this.proxyRoot.innerHTML = e.html, h && (e.proxyInnerHTML = this.proxyRoot.innerHTML), this._walkChunk(), h && (e.actualInnerHTML = this.root.innerHTML), e) : null }, t.prototype._buildChunk = function (t) { for (var e = this.actuals.length, r = [], n = [], o = [], i = t.length, a = 0; a < i; a++) { var s = t[a], u = s.toString(); if (r.push(u), s.attrs) { if (!/^noscript$/i.test(s.tagName)) { var c = e++; n.push(u.replace(/(\/?>)/, " " + d + "id=" + c + " $1")), s.attrs.id !== m && s.attrs.id !== y && o.push("atomicTag" === s.type ? "" : "<" + s.tagName + " " + d + "proxyof=" + c + (s.unary ? " />" : ">")) } } else n.push(u), o.push("endTag" === s.type ? u : "") } return { "tokens": t, "raw": r.join(""), "actual": n.join(""), "proxy": o.join("") } }, t.prototype._walkChunk = function () { for (var t = void 0, e = [this.proxyRoot]; f.existy(t = e.shift());) { var r = 1 === t.nodeType, n = r && a(t, "proxyof"); if (!n) { r && (this.actuals[a(t, "id")] = t, s(t, "id")); var o = t.parentNode && a(t.parentNode, "proxyof"); o && this.actuals[o].appendChild(t) } e.unshift.apply(e, f.toArray(t.childNodes)) } }, t.prototype._handleScriptToken = function (t) { var e = this, r = this.parser.clear(); r && this.writeQueue.unshift(r), t.src = t.attrs.src || t.attrs.SRC, t = this.options.beforeWriteToken(t), t && (t.src && this.scriptStack.length ? this.deferredRemote = t : this._onScriptStart(t), this._writeScriptToken(t, function () { e._onScriptDone(t) })) }, t.prototype._handleStyleToken = function (t) { var e = this.parser.clear(); e && this.writeQueue.unshift(e), t.type = t.attrs.type || t.attrs.TYPE || "text/css", t = this.options.beforeWriteToken(t), t && this._writeStyleToken(t), e && this.write() }, t.prototype._writeStyleToken = function (t) { var e = this._buildStyle(t); this._insertCursor(e, y), t.content && (e.styleSheet && !e.sheet ? e.styleSheet.cssText = t.content : e.appendChild(this.doc.createTextNode(t.content))) }, t.prototype._buildStyle = function (t) { var e = this.doc.createElement(t.tagName); return e.setAttribute("type", t.type), f.eachKey(t.attrs, function (t, r) { e.setAttribute(t, r) }), e }, t.prototype._insertCursor = function (t, e) { this._writeImpl('<span id="' + e + '"/>'); var r = this.doc.getElementById(e); r && r.parentNode.replaceChild(t, r) }, t.prototype._onScriptStart = function (t) { t.outerWrites = this.writeQueue, this.writeQueue = [], this.scriptStack.unshift(t) }, t.prototype._onScriptDone = function (t) { return t !== this.scriptStack[0] ? void this.options.error({ "msg": "Bad script nesting or script finished twice" }) : (this.scriptStack.shift(), this.write.apply(this, t.outerWrites), void (!this.scriptStack.length && this.deferredRemote && (this._onScriptStart(this.deferredRemote), this.deferredRemote = null))) }, t.prototype._writeScriptToken = function (t, e) { var r = this._buildScript(t), n = this._shouldRelease(r), o = this.options.afterAsync; t.src && (r.src = t.src, this._scriptLoadHandler(r, n ? o : function () { e(), o() })); try { this._insertCursor(r, m), r.src && !n || e() } catch (t) { this.options.error(t), e() } }, t.prototype._buildScript = function (t) { var e = this.doc.createElement(t.tagName); return f.eachKey(t.attrs, function (t, r) { e.setAttribute(t, r) }), t.content && (e.text = t.content), e }, t.prototype._scriptLoadHandler = function (t, e) { function r() { t = t.onload = t.onreadystatechange = t.onerror = null } function n() { r(), null != e && e(), e = null } function o(t) { r(), a(t), null != e && e(), e = null } function i(t, e) { var r = t["on" + e]; null != r && (t["_on" + e] = r) } var a = this.options.error; i(t, "load"), i(t, "error"), u(t, { "onload": function () { if (t._onload) try { t._onload.apply(this, Array.prototype.slice.call(arguments, 0)) } catch (e) { o({ "msg": "onload handler failed " + e + " @ " + t.src }) } n() }, "onerror": function () { if (t._onerror) try { t._onerror.apply(this, Array.prototype.slice.call(arguments, 0)) } catch (e) { return void o({ "msg": "onerror handler failed " + e + " @ " + t.src }) } o({ "msg": "remote script failed " + t.src }) }, "onreadystatechange": function () { /^(loaded|complete)$/.test(t.readyState) && n() } }) }, t.prototype._shouldRelease = function (t) { var e = /^script$/i.test(t.nodeName); return !e || !!(this.options.releaseAsync && t.src && t.hasAttribute("async")) }, t }(); e["default"] = g }, function (t, e, r) { !function (e, r) { t.exports = r() }(this, function () { return function (t) { function e(n) { if (r[n]) return r[n].exports; var o = r[n] = { "exports": {}, "id": n, "loaded": !1 }; return t[n].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports } var r = {}; return e.m = t, e.c = r, e.p = "", e(0) }([function (t, e, r) { "use strict"; function n(t) { return t && t.__esModule ? t : { "default": t } } var o = r(1), i = n(o); t.exports = i["default"] }, function (t, e, r) { "use strict"; function n(t) { return t && t.__esModule ? t : { "default": t } } function o(t) { if (t && t.__esModule) return t; var e = {}; if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]); return e["default"] = t, e } function i(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } e.__esModule = !0; var a = r(2), s = o(a), u = r(3), c = o(u), l = r(6), p = n(l), f = r(5), h = { "comment": /^<!--/, "endTag": /^<\//, "atomicTag": /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i, "startTag": /^</, "chars": /^[^<]/ }, d = function () { function t() { var e = this, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; i(this, t), this.stream = r; var o = !1, a = {}; for (var u in s) s.hasOwnProperty(u) && (n.autoFix && (a[u + "Fix"] = !0), o = o || a[u + "Fix"]); o ? (this._readToken = (0, p["default"])(this, a, function () { return e._readTokenImpl() }), this._peekToken = (0, p["default"])(this, a, function () { return e._peekTokenImpl() })) : (this._readToken = this._readTokenImpl, this._peekToken = this._peekTokenImpl) } return t.prototype.append = function (t) { this.stream += t }, t.prototype.prepend = function (t) { this.stream = t + this.stream }, t.prototype._readTokenImpl = function () { var t = this._peekTokenImpl(); if (t) return this.stream = this.stream.slice(t.length), t }, t.prototype._peekTokenImpl = function () { for (var t in h) if (h.hasOwnProperty(t) && h[t].test(this.stream)) { var e = c[t](this.stream); if (e) return "startTag" === e.type && /script|style/i.test(e.tagName) ? null : (e.text = this.stream.substr(0, e.length), e) } }, t.prototype.peekToken = function () { return this._peekToken() }, t.prototype.readToken = function () { return this._readToken() }, t.prototype.readTokens = function (t) { for (var e = void 0; e = this.readToken();)if (t[e.type] && t[e.type](e) === !1) return }, t.prototype.clear = function () { var t = this.stream; return this.stream = "", t }, t.prototype.rest = function () { return this.stream }, t }(); e["default"] = d, d.tokenToString = function (t) { return t.toString() }, d.escapeAttributes = function (t) { var e = {}; for (var r in t) t.hasOwnProperty(r) && (e[r] = (0, f.escapeQuotes)(t[r], null)); return e }, d.supports = s; for (var y in s) s.hasOwnProperty(y) && (d.browserHasFlaw = d.browserHasFlaw || !s[y] && y) }, function (t, e) { "use strict"; e.__esModule = !0; var r = !1, n = !1, o = window.document.createElement("div"); try { var i = "<P><I></P></I>"; o.innerHTML = i, e.tagSoup = r = o.innerHTML !== i } catch (t) { e.tagSoup = r = !1 } try { o.innerHTML = "<P><i><P></P></i></P>", e.selfClose = n = 2 === o.childNodes.length } catch (t) { e.selfClose = n = !1 } o = null, e.tagSoup = r, e.selfClose = n }, function (t, e, r) { "use strict"; function n(t) { var e = t.indexOf("-->"); if (e >= 0) return new c.CommentToken(t.substr(4, e - 1), e + 3) } function o(t) { var e = t.indexOf("<"); return new c.CharsToken(e >= 0 ? e : t.length) } function i(t) { var e = t.indexOf(">"); if (e !== -1) { var r = t.match(l.startTag); if (r) { var n = function () { var t = {}, e = {}, n = r[2]; return r[2].replace(l.attr, function (r, o) { arguments[2] || arguments[3] || arguments[4] || arguments[5] ? arguments[5] ? (t[arguments[5]] = "", e[arguments[5]] = !0) : t[o] = arguments[2] || arguments[3] || arguments[4] || l.fillAttr.test(o) && o || "" : t[o] = "", n = n.replace(r, "") }), { "v": new c.StartTagToken(r[1], r[0].length, t, e, (!!r[3]), n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")) } }(); if ("object" === ("undefined" == typeof n ? "undefined" : u(n))) return n.v } } } function a(t) { var e = i(t); if (e) { var r = t.slice(e.length); if (r.match(new RegExp("</\\s*" + e.tagName + "\\s*>", "i"))) { var n = r.match(new RegExp("([\\s\\S]*?)</\\s*" + e.tagName + "\\s*>", "i")); if (n) return new c.AtomicTagToken(e.tagName, n[0].length + e.length, e.attrs, e.booleanAttrs, n[1]) } } } function s(t) { var e = t.match(l.endTag); if (e) return new c.EndTagToken(e[1], e[0].length) } e.__esModule = !0; var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }; e.comment = n, e.chars = o, e.startTag = i, e.atomicTag = a, e.endTag = s; var c = r(4), l = { "startTag": /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, "endTag": /^<\/([\-A-Za-z0-9_]+)[^>]*>/, "attr": /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g, "fillAttr": /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i } }, function (t, e, r) { "use strict"; function n(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } e.__esModule = !0, e.EndTagToken = e.AtomicTagToken = e.StartTagToken = e.TagToken = e.CharsToken = e.CommentToken = e.Token = void 0; var o = r(5), i = (e.Token = function t(e, r) { n(this, t), this.type = e, this.length = r, this.text = "" }, e.CommentToken = function () { function t(e, r) { n(this, t), this.type = "comment", this.length = r || (e ? e.length : 0), this.text = "", this.content = e } return t.prototype.toString = function () { return "<!--" + this.content }, t }(), e.CharsToken = function () { function t(e) { n(this, t), this.type = "chars", this.length = e, this.text = "" } return t.prototype.toString = function () { return this.text }, t }(), e.TagToken = function () { function t(e, r, o, i, a) { n(this, t), this.type = e, this.length = o, this.text = "", this.tagName = r, this.attrs = i, this.booleanAttrs = a, this.unary = !1, this.html5Unary = !1 } return t.formatTag = function (t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r = "<" + t.tagName; for (var n in t.attrs) if (t.attrs.hasOwnProperty(n)) { r += " " + n; var i = t.attrs[n]; "undefined" != typeof t.booleanAttrs && "undefined" != typeof t.booleanAttrs[n] || (r += '="' + (0, o.escapeQuotes)(i) + '"') } return t.rest && (r += " " + t.rest), r += t.unary && !t.html5Unary ? "/>" : ">", void 0 !== e && null !== e && (r += e + "</" + t.tagName + ">"), r }, t }()); e.StartTagToken = function () { function t(e, r, o, i, a, s) { n(this, t), this.type = "startTag", this.length = r, this.text = "", this.tagName = e, this.attrs = o, this.booleanAttrs = i, this.html5Unary = !1, this.unary = a, this.rest = s } return t.prototype.toString = function () { return i.formatTag(this) }, t }(), e.AtomicTagToken = function () { function t(e, r, o, i, a) { n(this, t), this.type = "atomicTag", this.length = r, this.text = "", this.tagName = e, this.attrs = o, this.booleanAttrs = i, this.unary = !1, this.html5Unary = !1, this.content = a } return t.prototype.toString = function () { return i.formatTag(this, this.content) }, t }(), e.EndTagToken = function () { function t(e, r) { n(this, t), this.type = "endTag", this.length = r, this.text = "", this.tagName = e } return t.prototype.toString = function () { return "</" + this.tagName + ">" }, t }() }, function (t, e) { "use strict"; function r(t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""; return t ? t.replace(/([^"]*)"/g, function (t, e) { return /\\/.test(e) ? e + '"' : e + '\\"' }) : e } e.__esModule = !0, e.escapeQuotes = r }, function (t, e) { "use strict"; function r(t) { return t && "startTag" === t.type && (t.unary = s.test(t.tagName) || t.unary, t.html5Unary = !/\/>$/.test(t.text)), t } function n(t, e) { var n = t.stream, o = r(e()); return t.stream = n, o } function o(t, e) { var r = e.pop(); t.prepend("</" + r.tagName + ">") } function i() { var t = []; return t.last = function () { return this[this.length - 1] }, t.lastTagNameEq = function (t) { var e = this.last(); return e && e.tagName && e.tagName.toUpperCase() === t.toUpperCase() }, t.containsTagName = function (t) { for (var e, r = 0; e = this[r]; r++)if (e.tagName === t) return !0; return !1 }, t } function a(t, e, a) { function s() { var e = n(t, a); e && l[e.type] && l[e.type](e) } var c = i(), l = { "startTag": function (r) { var n = r.tagName; "TR" === n.toUpperCase() && c.lastTagNameEq("TABLE") ? (t.prepend("<TBODY>"), s()) : e.selfCloseFix && u.test(n) && c.containsTagName(n) ? c.lastTagNameEq(n) ? o(t, c) : (t.prepend("</" + r.tagName + ">"), s()) : r.unary || c.push(r) }, "endTag": function (r) { var n = c.last(); n ? e.tagSoupFix && !c.lastTagNameEq(r.tagName) ? o(t, c) : c.pop() : e.tagSoupFix && (a(), s()) } }; return function () { return s(), r(a()) } } e.__esModule = !0, e["default"] = a; var s = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i, u = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i }]) }) }, function (t, e) { "use strict"; function r(t) { return void 0 !== t && null !== t } function n(t) { return "function" == typeof t } function o(t, e, r) { var n = void 0, o = t && t.length || 0; for (n = 0; n < o; n++)e.call(r, t[n], n) } function i(t, e, r) { for (var n in t) t.hasOwnProperty(n) && e.call(r, n, t[n]) } function a(t, e) { return t = t || {}, i(e, function (e, n) { r(t[e]) || (t[e] = n) }), t } function s(t) { try { return Array.prototype.slice.call(t) } catch (r) { var e = function () { var e = []; return o(t, function (t) { e.push(t) }), { "v": e } }(); if ("object" === ("undefined" == typeof e ? "undefined" : f(e))) return e.v } } function u(t) { return t[t.length - 1] } function c(t, e) { return !(!t || "startTag" !== t.type && "atomicTag" !== t.type || !("tagName" in t)) && !!~t.tagName.toLowerCase().indexOf(e) } function l(t) { return c(t, "script") } function p(t) { return c(t, "style") } e.__esModule = !0; var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }; e.existy = r, e.isFunction = n, e.each = o, e.eachKey = i, e.defaults = a, e.toArray = s, e.last = u, e.isTag = c, e.isScript = l, e.isStyle = p }]) });
    /*postscribe end*/
    var postscribe = window.postscribe;
    
    
    // =============================================================================
    // 4. sas_s2s_creative_render (webpack module 7899)
    //    Soubor: src/sas/assets/sas_s2s_creative_render.js
    //    Rozhoduje o vykreslení S2S kreativy podle rozměrů a area
    // =============================================================================
    
    /**
     * Vykreslí S2S (server-to-server) kreativu do iframe.
     * Rozhodování podle rozměrů (width × height) a area:
     *   - Branding:      2000 × 1400
     *   - Popup:         mobilerectangle-1 s rozměry 500×200, 320×100, 300×250, 300×300
     *   - Rectangle:     480 × 480
     *   - Interscroller: 768×1230, 480×820, 720×1080, 720×1280, 600×1080,
     *                    nebo mobilerectangle-(2|3|4|5) s 300×600
     *
     * Pokud odpovídá speciálnímu formátu → volá se window.sas_s2s_creative_render(payload).
     * Pokud renderer neexistuje → „tichý" 1×1 iframe (nezobrazí se).
     * Jinak → standardní iframe s rozměry a creative jako srcdoc.
     *
     * @param {string} response   — HTML kreativa
     * @param {string} posId      — ID elementu (.sas_mone)
     * @param {number} width      — šířka kreativy
     * @param {number} height     — výška kreativy
     * @param {string} site       — název webu (nepovinné)
     * @param {string} area       — název area (adUnit)
     * @param {string} advertiser — ID inzerenta
     */
    function renderResponseIframe(response, posId, width, height, site = '', area = '', advertiser = '') {
        const el = document.querySelector(`#${posId}`);
        if (!el) {
            console.warn(`[s2s] Element #${posId} not found`);
            return;
        }
    
        const W = Math.round(Number(width) || 0);
        const H = Math.round(Number(height) || 0);
        const adv = advertiser;
        const areas = area;
    
        // Helper: bezpečné zavolání globálního rendereru
        const callRenderer = (name, payload) => {
            const fn = window[name];
            if (typeof fn === 'function') {
                try { fn(payload); } catch (e) { console.error(`[s2s] ${name} failed:`, e); }
                return true;
            }
            return false;
        };
    
        // Definice specializovaných handlerů podle rozměrů/area
        const handlers = [
            {
                name: 'sas_s2s_creative_render',
                match: () => W === 2000 && H === 1400               // Branding
            },
            {
                name: 'sas_s2s_creative_render',
                match: () =>                                         // Popup (mobile slide-up)
                    area === 'mobilerectangle-1' &&
                    (
                        (W === 500 && H === 200) ||
                        (W === 320 && H === 100) ||
                        (W === 300 && (H === 250 || H === 300))
                    )
            },
            {
                name: 'sas_s2s_creative_render',
                match: () => W === 480 && H === 480                  // Rectangle 480×480
            },
            {
                name: 'sas_s2s_creative_render',
                match: () =>                                         // Interscroller
                    (W === 768 && H === 1230) ||
                    (W === 480 && H === 820)  ||
                    (W === 720 && (H === 1080 || H === 1280)) ||
                    (W === 600 && H === 1080) ||
                    (/^mobilerectangle-(2|3|4|5)$/.test(area) && W === 300 && H === 600)
            }
        ];
    
        // Pokud existuje specializovaný renderer, zavolej jej a skonči
        for (const h of handlers) {
            if (h.match()) {
                const invoked = callRenderer(h.name, {
                    site, posId, response, width: W, height: H, advertiser: adv, area: areas
                });
                if (invoked) return;
                // Pokud odpovídá „speciálnímu" formátu, ale renderer chybí,
                // spadneme na „silent" 1×1 iframe níže.
                break;
            }
        }
    
        // Speciální formáty bez dostupného rendereru → „tichý" 1×1 iframe
        const isSpecialWithoutFn =
            (W === 2000 && H === 1400) ||
            (area === 'mobilerectangle-1' && (
                (W === 500 && H === 200) ||
                (W === 320 && H === 100) ||
                (W === 300 && (H === 250 || H === 300))
            ));
    
        // Připrav iframe
        const iframe = document.createElement('iframe');
        iframe.id = `s2s${posId}`;
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('marginHeight', '0');
        iframe.setAttribute('marginWidth', '0');
    
        // Rozměry (speciál = „tichý" 1×1)
        const renderW = isSpecialWithoutFn ? 1 : W;
        const renderH = isSpecialWithoutFn ? 1 : H;
    
        iframe.width = renderW;
        iframe.height = renderH;
        iframe.style.cssText = `
        width:${renderW}px;
        height:${renderH}px;
        border:none;
        display:${isSpecialWithoutFn ? 'none' : 'block'};
      `;
    
        // Vyčisti kontejner a vlož komentář + iframe
        el.textContent = '';
        el.append(
            document.createComment(`s2s render | adv:${adv} | ${W}x${H} | area:${area}`),
            iframe
        );
    
        // Pokud je to „tichý" speciální formát bez rendereru, nepíšeme původní creative
        if (isSpecialWithoutFn) {
            return;
        }
    
        // Render creative do iframe (preferuj srcdoc, fallback na document.write)
        if ('srcdoc' in iframe) {
            iframe.srcdoc = String(response ?? '');
        } else {
            try {
                const doc = iframe.contentWindow && iframe.contentWindow.document;
                if (doc) {
                    doc.open();
                    doc.write(String(response ?? ''));
                    doc.close();
                } else {
                    console.error('[s2s] Cannot access iframe document');
                }
            } catch (e) {
                console.error('[s2s] Fallback write failed:', e);
            }
        }
    }
    
    // =============================================================================
    // 5. sas_set_header_bidding (webpack module 8006)
    //    Soubor: src/sas/assets/sas_set_header_bidding.js
    //    Sestaví HB parametry pro SAS adserver URL
    // =============================================================================
    
    /**
     * Vrátí objekt s HB parametry pro danou area.
     * Čte z globálního pbjs.winningBidsSas[area].
     *
     * @param {string} a — název area (adUnit)
     * @returns {Object} — { bidTier, bidderCode, bidderSize, hbid, hbid_v, bidderPrice, bidDealId }
     */
    function setHeaderBidding(a) {
        let winBid = {
            bidTier: '',
            bidderCode: '',
            bidderSize: '',
            hbid: '',
            hbid_v: '',
            bidderPrice: '',
            bidDealId: ''
        };
    
        if (typeof pbjs !== 'undefined' &&
            typeof pbjs.winningBidsSas !== 'undefined' &&
            typeof pbjs.winningBidsSas[a] !== 'undefined') {
    
            const { bidTier, bidderCode, width, height, bid, bidderPrice, bidDealId } = pbjs.winningBidsSas[a];
    
            winBid = {
                bidTier: `/bidTier=${bidTier}`,
                bidderCode: `/bidderCode=${bidderCode}`,
                bidderSize: `/bidderSize=${width}x${height}`,
                hbid: `/HBID=${bid}`,
                hbid_v: `/HBID_V=${bidderCode}`,
                bidderPrice: typeof bidderPrice !== 'undefined' ? `/bidderPrice=${bidderPrice}` : `/bidderPrice=0`,
                bidDealId: typeof bidDealId !== '' ? `/bidDealId=${bidDealId}` : ``
            };
        }
    
        return winBid;
    }
    
    // =============================================================================
    // 6. sas_mone_area_sizes (webpack module 8937 — součást hlavního modulu)
    //    Soubor: src/sas/assets/sas_mone_area_sizes.js
    //    Mapování area → povolené rozměry per site
    //    MZ_1a (2026-06-20): area_size_mapping je nově JEDINÁ definice v block_0000
    //    (proměnná „area_size_mapping" mezi konfiguračními proměnnými, vedle SAS_SITE_BY_DOMAIN).
    //    Embedded SAS ji čte z outer IIFE scope, proto se zde už NEdefinuje (odstraněna duplicita).
    //    Zdroj pravdy zůstává src/echo24/dev/SAS/sas_mone_area_sizes.js.
    // =============================================================================
    
    // =============================================================================
    // 7. sas_core — createSASRenderer (webpack module 8937 — hlavní funkce)
    //    Soubor: src/sas/sas_core.js
    //    Hlavní logika SAS rendereru — vytváří instanci window.sas
    // =============================================================================
    
    /**
     * Vytvoří instanci SAS rendereru.
     * Vrací objekt s API: rendermone, loadmone, setareas, getDebugResponses.
     *
     * @param {Object} initial — počáteční konfigurace (volitelné)
     * @returns {Object} — veřejné API SAS rendereru
     */
    function createSASRenderer(initial = {}) {
    
        // ---- Konstanty a interní stav ----
    
        const AREAS_COUNTERS = {
            halfpagead: { counter: 1, max: 3 },
            leaderboard: { counter: 1, max: 3 },
            mobilerectangle: { counter: 2, max: 4 },
        };
    
        const DEVICES_ATTR = {
            desktop: 'data-d-area',
            mobil: 'data-m-area',
        };
    
        const state = {
            adserver: 'https://a.iprima.cz/iprima/bserverj/ball/random=',
            viewid: `/viewid=${rand()}`,
            moneClass: 'sas_mone',
            debug: /\bsas_debug=true\b/.test(location.href),
            activated: false,
            loadmoneCounter: 0,
            segments: [],
            callback: (_id, _area) => { },
            vignette: false,
            vignetteLink: '',
            vignetteId: `sas_${rand()}`,
            gdpr_param: /\bsas_gdpr=0\b/.test(location.href) ? 0 : 1,
            moneArea: area_size_mapping,
            dv: window.screen ? { w: window.screen.width, h: window.screen.height } : { w: 0, h: 0 },
            domain: location.hostname,
            consent: false,
            lazyLoad: { mones: [] },
            debugResponses: [],
            configs: {
                site: '',
                section: '',
                device: '',
                keyword: undefined,
                enableBranding: false,
                bgWidth: 0,
                tcstring: undefined,
                cookie: false,
                ...initial,
            },
        };
    
        // ---- Veřejné API --------------------------------------------------------
    
        /**
         * Vykreslí reklamy (renderMone) — jednorázový request bez lazyloadu.
         * Volá se při reload cyklu (sas.rendermone) nebo při galerii.
         */
        async function renderMone(params) {
            if (setConfigs(params) === -1) {
                saslog('renderMone - setConfigs returned -1');
                return -1;
            }
            const cmp = buildCmpString();
            return request(params, null, cmp);
        }
    
        /**
         * Načte reklamy (loadMone) — hlavní vstupní bod.
         * Nejprve načte non-lazy pozice, potom lazyload pozice.
         * Zamezuje paralelnímu volání (state.activated).
         */
        async function loadMone(params) {
            if (state.activated) return;
            state.activated = true;
            state.loadmoneCounter++;
    
            if (setConfigs(params) === -1) {
                state.activated = false;
                return -1;
            }
    
            const cmp = buildCmpString();
    
            // První dotaz — non-lazy pozice
            await request(params, null, cmp);
    
            // Lazyload pozice — čeká na scroll do viewportu
            await mones_lazyload(state.lazyLoad.mones, 400, async (item) => {
                const obj = { mones: [item] };
                await request(obj, null, cmp);
            });
    
            state.activated = false;
        }
    
        /**
         * Nastaví prioritní area → size mapování.
         * Volá se z per-site konfigurace (sas.setareas).
         */
        function setAreas(areasPriorityMap) {
            state.moneArea.priority = areasPriorityMap || {};
        }
    
        /**
         * Vrátí kopii debug odpovědí (pro diagnostiku).
         */
        function getDebugResponses() {
            return state.debugResponses.slice();
        }
    
        // ---- Interní pomocné funkce ---------------------------------------------
    
        /** Náhodné číslo 0–100000000 */
        function rand() {
            return Math.round(Math.random() * 100000000);
        }
    
        /** Logovací funkce (v produkci je saslog z utils, zde inline) */
        function saslog(msg) {
            const d = new Date();
            let h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
            h = h < 10 ? `0${h}` : h;
            m = m < 10 ? `0${m}` : m;
            s = s < 10 ? `0${s}` : s;
            const time = [h, m, s, d.getMilliseconds()].join(':');
            window.sasconsole = window.sasconsole || [];
            window.sasconsole.push({ time, msg });
        }
    
        /** Sestaví CMP (consent) string pro SAS URL */
        function buildCmpString() {
            const { tcstring } = state.configs;
            return `/gdpr=1/consent=${tcstring ?? ''}`;
        }
    
        /** Branding parametr pro leaderboard-1 (aktuálně vypnuto — vrací '') */
        function enableBranding(area, enable, width) {
            const can = area === 'leaderboard-1' && (enable && (!width || state.dv.w >= width));
            return ''; // can ? ',branding,2000x1400' : '';
        }
    
        /**
         * Vrátí povolené rozměry pro danou area.
         * Priorita: priority > per-site > default.
         */
        function areaSize(area) {
            const { site, section } = state.configs;
            const configSite =
                section === 'mobile' || section === 'desktop' || section === 'web_mobile' || section === 'web_desktop'
                    ? site
                    : section;
    
            if (state.moneArea.priority?.[area]) return state.moneArea.priority[area];
            if (state.moneArea[configSite]?.[area]) return state.moneArea[configSite][area];
            return state.moneArea.default?.[area];
        }
    
        /**
         * Nastaví konfiguraci z params (site, section, device, keyword, cookie, atd.).
         * Vrací -1 pokud chybí povinné parametry, 1 pokud OK.
         */
        function setConfigs(params) {
            const needed = ['site', 'section', 'device'];
            for (const key of needed) {
                if (!state.configs[key]) {
                    if (typeof params[key] === 'undefined') return -1;
                    state.configs[key] = params[key];
                }
            }
    
            state.consent = state.configs.cookie =
                typeof params.cookie !== 'undefined' ? params.cookie : state.configs.cookie;
            state.configs.enableBranding =
                typeof params.bgWidth !== 'undefined' && params.branding === true
                    ? true
                    : state.configs.enableBranding;
            state.configs.bgWidth =
                typeof params.bgWidth !== 'undefined' ? params.bgWidth : state.configs.bgWidth;
            state.configs.tcstring =
                typeof params.tcstring !== 'undefined' ? params.tcstring : state.configs.tcstring;
    
            if (typeof params.callback === 'function') state.callback = params.callback;
    
            // Default keyword z URL — jen origin + pathname, BEZ query stringu.
            // location.href by zahrnulo i query parametry (?debugssp&pbjs_debug=true...),
            // které regex /[0-9=?&#]/g smaže & ale ne písmena → slova splývají
            // ("debugssppbjs_debugtrue...") a kontaminují SAS keyword targeting.
            // Query parametry do SAS patří pouze pokud jsou explicitně v SAS_URL_KEYWORD_PARAMS.
            if (typeof state.configs.keyword === 'undefined') {
                state.configs.keyword = (location.origin + location.pathname)
                    .replace(/^https?:\/\//, '')
                    .replace(/[0-9=?&#]/g, '')
                    .replace(/%/g, '.')
                    .split(/[./-]/)
                    .join(',')
                    .replace(/,+/g, ',')
                    .toLowerCase();
            }
            if (typeof params.keyword !== 'undefined') {
                state.configs.keyword = `${state.configs.keyword},${params.keyword}`;
            }
    
            // Mone list & lazyload — pokud params.mones není definováno, sesbíráme z DOM
            if (typeof params.mones === 'undefined') {
                const result = computeMoneList();
                params.mones = result.mones;
                state.lazyLoad.mones = result.lazyLoad;
            }
    
            // Normalizace section
            if (state.configs.section === 'desktop' || state.configs.section === 'mobile') {
                state.configs.section = `web_${state.configs.section}`;
            }
    
            return 1;
        }
    
        /**
         * Sesbírá všechny .sas_mone elementy z DOM a rozdělí je na:
         *   - mones (okamžité načtení)
         *   - lazyLoad (načtení až při scrollu)
         */
        function computeMoneList() {
            const elements = document.getElementsByClassName(state.moneClass);
            const result = { mones: [], lazyLoad: [] };
    
            const { site, section, device } = state.configs;
            const configSite =
                section === 'mobile' || section === 'desktop' || section === 'web_mobile' || section === 'web_desktop'
                    ? site
                    : section;
    
            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];
                const areaAttrName = DEVICES_ATTR[device];
                if (!areaAttrName) continue;
    
                const area = el.getAttribute(areaAttrName);
                if (!area) continue;
    
                // Counter pro halfpagead, leaderboard, mobilerectangle
                if (AREAS_COUNTERS[area]) {
                    applyMoneCounter(area, el.id, areaAttrName);
                }
    
                const status = el.getAttribute('data-sas_status');
                if (status === 'loaded' || status === 'empty' || status === 'loading') continue;
    
                const hasArea =
                    !!state.moneArea.priority?.[area] ||
                    !!state.moneArea.default?.[area] ||
                    !!state.moneArea[configSite]?.[area];
    
                if (!hasArea) continue;
    
                const entry = { id: el.id, area };
                if (el.getAttribute('data-lazyload') === 'true') {
                    result.lazyLoad.push(entry);
                } else {
                    result.mones.push(entry);
                }
            }
            return result;
        }
    
        /**
         * Automatický counter pro pozice (halfpagead, leaderboard, mobilerectangle).
         * Přiřazuje -1, -2, -3 suffixy podle dostupnosti slotů v DOM.
         */
        function applyMoneCounter(area, moneID, areaAttrName) {
            const cfg = AREAS_COUNTERS[area];
            if (!cfg) return;
    
            const pickSlot = () => `${area}-${cfg.counter}`;
            const el = document.getElementById(moneID);
            if (!el) return;
    
            if (
                cfg.counter === cfg.max ||
                document.querySelector(`[${areaAttrName}="${pickSlot()}"]`) === null
            ) {
                el.setAttribute(areaAttrName, pickSlot());
                if (cfg.counter < cfg.max) cfg.counter++;
            } else {
                cfg.counter++;
                applyMoneCounter(area, moneID, areaAttrName);
            }
        }
    
        /**
         * Sestaví URL pro SAS adserver request.
         * Obsahuje: site, section, consent, keyword, HB bidy, rozměry pro každou pozici.
         *
         * @param {Object} params — { mones: [{id, area}], reload? }
         * @param {string} cmpString — GDPR consent string
         * @returns {string|-1} — URL pro fetch, nebo -1 pokud žádné validní pozice
         */
        function buildUrl(params, cmpString) {
            if (!Array.isArray(params.mones) || params.mones.length < 1) return -1;
    
            const consentMode = state.consent === true ? 'consent' : 'noconsent';
            const { site, section, device, keyword } = state.configs;
    
            const configSite =
                section === 'mobile' || section === 'desktop' || section === 'web_mobile' || section === 'web_desktop'
                    ? site
                    : section;
    
            // Odfiltruj nevalidní mone pozice
            const validMones = params.mones.filter((m) => {
                const el = document.getElementById(m.id);
                if (!el) return false;
                return (
                    state.moneArea.default?.[m.area] !== undefined ||
                    state.moneArea[configSite]?.[m.area] !== undefined ||
                    state.moneArea.priority?.[m.area] !== undefined
                );
            });
    
            if (validMones.length === 0) return -1;
    
            // Správa alter_area a reset viewid v galerii
            let actualViewid = `/viewid=${rand()}`;
            for (const m of validMones) {
                const el = document.getElementById(m.id);
                if (!el) continue;
    
                const moneElementArea = el.getAttribute(DEVICES_ATTR[device]);
                const alter = el.getAttribute('data-alter_area');
    
                if (m.area !== 'gallerymobilerectangle-2' && alter === null) {
                    el.setAttribute('data-alter_area', m.area);
                } else if (m.area !== moneElementArea && m.area !== 'gallerymobilerectangle-2' && !alter?.includes(m.area)) {
                    el.setAttribute('data-alter_area', `${alter};${m.area}`);
                } else {
                    actualViewid = `/viewid=${rand()}`;
                }
    
                const areaDef = state.moneArea.default?.[m.area];
                if (typeof areaDef !== 'undefined' && /gallery/.test(String(areaDef))) {
                    actualViewid = `/viewid=${rand()}`;
                }
            }
    
            // Základ URL
            const random = rand();
            const ab = Math.round(Math.random() * 1) === 1 ? 'a' : 'b';
            const countuu = Math.ceil(Math.random() * 7);
            const percentage = Math.ceil(Math.random() * 100);
    
            let url =
                `${state.adserver}${random}${actualViewid}` +
                `/ab=${ab}` +
                `/site=${site}` +
                `/section=${section}` +
                `${cmpString}` +
                `/showname=${consentMode}` +
                `/countuu=${countuu}` +
                `/percentage=${percentage}` +
                `/dev_display_width=${state.dv.w}` +
                `/dev_display_height=${state.dv.h}` +
                `/devwidth=${state.dv.w}` +
                `/devheight=${state.dv.h}` +
                `/dom=${state.domain}`;
    
            // Keyword + reload
            if (typeof state.configs.keyword !== 'undefined') {
                url += `/keyword=${state.configs.keyword}`;
                if (typeof params.reload !== 'undefined') url += `,reload`;
            } else if (typeof params.reload !== 'undefined') {
                url += `/keyword=reload`;
            }
    
            // Pozice — pro každou mone přidáme /bN/size=.../area=.../posid=...
            validMones.forEach((m, i) => {
                const el = document.getElementById(m.id);
                if (el) el.setAttribute('data-sas_status', 'loading');
    
                const branding = enableBranding(m.area, state.configs.enableBranding, state.configs.bgWidth);
                const hb = setHeaderBidding(m.area);
    
                let sz = el?.getAttribute('data-sas_size');
                if (!sz || sz === 'null') sz = areaSize(m.area);
    
                url += `/b${i + 1}/size=${sz}${branding}${hb.bidTier}${hb.bidderCode}${hb.bidderSize}${hb.hbid}${hb.hbid_v}${hb.bidderPrice}${hb.bidDealId}` +
                    `/area=${m.area}/posid=${m.id}`;
            });
    
            return `${url}/?`;
        }
    
        /**
         * Hlavní request na SAS adserver + zpracování odpovědi.
         *
         * Odpověď je JSON pole — pro každou pozici buď:
         *   a) objekt { creative, width, height } → S2S render (renderResponseIframe)
         *   b) string (HTML) → postscribe render (standardní SAS šablona)
         *
         * @param {Object} params — { mones: [{id, area}] }
         * @param {Function|null} responseDone — callback pro každou odpověď (vignette guard)
         * @param {string} cmpString — GDPR consent string
         * @returns {number} — 1 pokud OK, -1 pokud chyba
         */
        async function request(params, responseDone = null, cmpString = '') {
            const url = buildUrl(params, cmpString);
            if (url === -1) return -1;
    
            const res = await fetch(url, { credentials: 'include' });
            const answer = await res.json();
    
            state.debugResponses = [];
            for (let i = 0; i < params.mones.length; i++) {
                const mone = params.mones[i];
                let response = answer[i];
    
                try {
                    const el = document.getElementById(mone.id);
                    if (!el) continue;
                    el.innerHTML = '';
    
                    // Normalize http → https pro string odpovědi
                    try {
                        if (typeof response === 'string') {
                            response = response.replace(/http:/g, 'https:');
                        }
                        state.debugResponses.push({ area: mone.area, id: mone.id, response });
                    } catch (e) {
                        console.error('normalize http->https failed', e);
                    }
    
                    // Callback před renderem (vignette guard)
                    if (responseDone) {
                        if (mone.area === 'vignette' && typeof response === 'string' && !/data-vignette/.test(response)) {
                            if (state.vignetteLink) {
                                location.href = state.vignetteLink;
                                return -1;
                            }
                        }
                        responseDone(response);
                    }
    
                    // Nová JSON S2S odpověď (objekt s creative, width, height)
                    if (typeof response === 'object' && response) {
                        const { creative, width, height } = response;
                        const advertiser = 1; // zpětná kompatibilita
                        // [OBSERVABILITA] explicitní log větve request() — object → renderResponseIframe
                        _weuronDebug && console.log('%c[Weuron]%c [SAS request] %c[větev: OBJECT → iframe]%c area=' + mone.area
                            + ', posId=' + mone.id + ', site=' + mone.site + ', ' + width + 'x' + height
                            + ', creative=' + String(creative).replace(/\s+/g, ' ').substring(0, 120),
                            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                            'background:#4CAF50;color:#fff;border-radius:3px;padding:1px 4px;', '');
                        renderResponseIframe(creative, mone.id, width, height, mone.site, mone.area, advertiser);
                        change_sas_status(mone.id, mone.area, 'loaded');
                        continue;
                    }
    
                    // Stará verze S2S odpovědi (zakomentováno v produkci)
                    // if (typeof response === 'string') {
                    //     const reg = regex_answer(response);
                    //     const rAdv = reg?.advid;
                    //     const rW = reg?.width;
                    //     const rH = reg?.height;
                    //     const S2S_ADS = ['1', '2', '3', '4', '5', '3113', '4249'];
                    //     if (rW != null && rH != null && S2S_ADS.includes(rAdv)) {
                    //         renderResponseIframe(response, mone.id, rW, rH, mone.site, mone.area, rAdv);
                    //         change_sas_status(mone.id, mone.area, 'loaded');
                    //         continue;
                    //     }
                    // }
    
                    // Render standardních SAS kampaní přes postscribe.
                    // [TAG CAMPAIGN] Větev "Tag campaign" poznáme podle toho, že obsah
                    // kreativy volá sas_render_gam_pure_echo (GAM render = RT ve flowchartu).
                    // HB (sas_creative_render) ani Direct (plain HTML) tuto funkci nevolají,
                    // takže se z reloadu NEvyřadí. Pozici vyřadíme, pokud:
                    //   (1) obsah kreativy matchne TAG_CAMPAIGN_EXCLUDE_PATTERNS[area]
                    //       → vyřadit VŽDY (nezávisle na TAG_CAMPAIGN_RELOAD_STOP), nebo
                    //   (2) je to tag-campaign (GAM marker) A TAG_CAMPAIGN_RELOAD_STOP === true
                    //       → vyřadit plošně celou tag větev.
                    var _isTagCampaign = String(response).indexOf('sas_render_gam_pure_echo') !== -1;
                    var _excludeReason = null;
                    try {
                        var _rx = TAG_CAMPAIGN_EXCLUDE_PATTERNS[mone.area];
                        if (_rx && _rx.test(response)) {
                            _excludeReason = 'pattern match: ' + _rx.toString();
                        }
                    } catch (e) { /* vadný regex v konfiguraci — ignor */ }
                    if (!_excludeReason && _isTagCampaign && TAG_CAMPAIGN_RELOAD_STOP) {
                        _excludeReason = 'tag campaign (sas_render_gam_pure_echo) + TAG_CAMPAIGN_RELOAD_STOP=true';
                    }
                    if (_excludeReason) {
                        _tagCampaignExcluded[mone.area] = _excludeReason;
                    }
                    // [OBSERVABILITA] explicitní log větve request() — string → postscribe
                    _weuronDebug && console.log('%c[Weuron]%c [SAS request] %c[větev: STRING → postscribe' + (_isTagCampaign ? ' = TAG CAMPAIGN (GAM)' : '') + ']%c area=' + mone.area
                        + ', posId=' + mone.id + ', site=' + mone.site + ', délka=' + String(response).length
                        + (_excludeReason ? ' → vyřazeno z reloadu (' + _excludeReason + ')' : ' → reload poběží')
                        + ', náhled=' + String(response).replace(/\s+/g, ' ').substring(0, 120),
                        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                        'background:#3F51B5;color:#fff;border-radius:3px;padding:1px 4px;', '');
                    postscribe(`#${mone.id}`, response, {
                        done: () => {
                            try {
                                const el2 = document.getElementById(mone.id);
                                if (el2) el2.setAttribute('data-sas_status', 'loaded');
                            } catch (e) {
                                console.error('postscribe done', e);
                            }
                        },
                        error: () => { },
                        releaseAsync: true,
                    });
                } catch (e) {
                    console.error('request loop error:', e);
                }
            }
            return 1;
        }
    
        // ---- Návrat veřejného API ----
        return {
            rendermone: renderMone,
            loadmone: loadMone,
            setareas: setAreas,
            getDebugResponses,
        };
    }
    
    // =============================================================================
    // 8. Entry point
    //    Soubor: src/sas/sas.js
    //    Vytvoří globální window.sas instanci
    // =============================================================================
    
    window.sas = createSASRenderer();
})();
// --- KONEC BLOKU embedded_sas ---


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

// blok_source_0001 (adUnitsSZN — Seznam SSP konfigurace) ODSTRANĚN.
// S enableCpexBridge=true se adUnitsSZN nikde nečte (seznam_traffic=false vždy).
// Bidder primadformszn není v CPEX settings — pokud bude potřeba,
// řeší Jana s CPEXem přidání do CDN settings.
// Archivován v Nepotrebne_bloky_v_echo24.js jako spare_0014.



/*
---------------------------------------------
Blok: blok_source_0003
Název: seznam_traffic (volitelný modul detekce Seznam trafficu)
Cesta: src/echo24/dev/moduls/seznam_traffic.js
Použití v buildu: VOLITELNÝ — web BEZ tohoto modulu funguje normálně (seznam_traffic=false)
Závislosti: NE (žádné importy, jen globální window, document, location)
Chronologická pozice v cleaned.js:
  - DEFINICE funkcí: za blok_source_0002 (R2B2 HB adapter), před blok_0006
  - VOLÁNÍ detekce: uvnitř blok_0023e (init_iprima_ads), PŘED init_cpex_header_bidding
  - VOLÁNÍ kontextu: uvnitř call_adserver (blok_0023g), PŘED sas.loadmone

Návaznost na blokovou konvenci:
  blok_source_0002  — R2B2 HB adapter (volitelný zdroj)
  blok_source_0003  — Seznam traffic detekce (volitelný zdroj) ← TENTO MODUL
  [blok_source_0001 — adUnitsSZN — ODSTRANĚN, viz spare_0014]
  blok_0006         — gam_standard_tag_pure_echo
  ...
  blok_0023e        — init_iprima_ads → zde se volá detectSeznamTraffic()
  blok_0023f        — build_seznam_adserver_context → NAHRAZENO tímto modulem
  blok_0023g        — call_sas_adserver → zde se volá applySeznamAdserverContext()

Kontext (email Jana Jiříková, 1.4.2026; email František, 9.4.2026):
  - Pro seznam traffic se má používat oddělená HB konfigurace (jiné MIDy pro reporting)
  - František navrhl: JEDEN settings soubor s duplicitními řádky per pozice,
    filtrovanými na základě cookie promoSeznam (cookieIs / cookieIsNot)
  - CPEX Package v6.0.0 filterAdUnitsBeforeAuction() řeší filtrování automaticky
  - Detekce MUSÍ proběhnout PŘED init_cpex_header_bidding, aby cookie
    existovala v okamžiku, kdy cpex-package volá filterAdUnitsBeforeAuction()

Cookie promoSeznam:
  - Nastavuje se v setSeznamCookie() (voláno z detectSeznamTraffic při detekci)
  - Session-only (bez expires → smaže se při zavření prohlížeče)
  - CPEX Package ji čte přes getCookie() v filterAdUnitsBeforeAuction():
    · cookieIs: 'promoSeznam' → cookie existuje → adUnit ODSTRANĚN z aukce
    · cookieIsNot: 'promoSeznam' → cookie neexistuje → adUnit ODSTRANĚN z aukce
  - Výsledek: Seznam traffic → plný HB (všichni biddeři), normální → jen adform

Princip volitelnosti (obecné řešení pro více webů):
  - Web s tímto modulem: funkce detectSeznamTraffic existuje → detekce proběhne
  - Web BEZ tohoto modulu: funkce neexistuje → cleaned.js automaticky nastaví
    seznamTraffic=false a všechny navazující proměnné na výchozí hodnoty

  V cleaned.js (blok_0023e) to vypadá takto:

    var seznamTraffic = false;
    if (typeof detectSeznamTraffic === 'function') {
        seznamTraffic = await detectSeznamTraffic();
        // → detectSeznamTraffic() při detekci volá setSeznamCookie()
        //   → document.cookie = 'promoSeznam=filtercookie; path=/; SameSite=Lax'
        //   → CPEX Package pak filtruje adUnits dle cookie v filterAdUnitsBeforeAuction()
    }

  A v call_adserver (blok_0023g):

    var seznamCtx = (typeof applySeznamAdserverContext === 'function')
        ? applySeznamAdserverContext(seznamTraffic, breakpoint)
        : { section: section, skipInterstitial: false, skipLazyload: false, restrictedAreas: null };
    if (seznamCtx.restrictedAreas && typeof applySasAreaRestrictions === 'function') {
        applySasAreaRestrictions(seznamCtx);
    }
    add_nonstandard_mone(seznamCtx.skipInterstitial);
    // sas.loadmone({ section: seznamCtx.section, ... })

Zdroje (odkud pochází logika):
  src/echo24/prod/echo24_config.js       — řádky 103-200 (detekce + call_adserver)
  src/echo24/prod/assets/add_nonstandard_mone.js — interstitial podmínka
  src/fresh/prod/fresh_sas_config.js     — řádky 68-200 (referenční implementace)
  src/cool/prod/cool_sas_config.js       — řádky 55-95 (URL test flagy)
  src/header_bidding/szn_configs/         — separátní HB sady pro seznam (adUnitsSZN)
---------------------------------------------
*/


// ===========================
// KONFIGURACE (per-web úpravy)
// ===========================

var SSP_SCRIPT_URL = 'https://ssp.seznam.cz/static/js/ssp.js';

/**
 * UTM parametr pro detekci cross-portfolio seznam trafficu.
 * Když uživatel přijde z jiného webu portfolia (fresh, cool, zoom...),
 * odkaz obsahuje ?utm_source=www.seznam.cz&utm_medium=seznam_distribuce.
 *
 * Všechny weby v portfoliu tyto UTM parametry ZAPISUJÍ na odchozí odkazy
 * (add_utm_to_cross_content_footer_carousel, add_utm_to_footer),
 * ale dosud je žádný web NEČETL pro vlastní detekci.
 *
 * Detekce kontroluje: utm_source odpovídá SEZNAM_UTM_SOURCE.
 */
var SEZNAM_UTM_SOURCE = 'www.seznam.cz';


// ===========================
// DETEKCE
// ===========================

/**
 * Načte ssp.js do stránky, pokud ještě nebyl načten.
 * @returns {Promise<void>}
 */
function loadSspScript() {
    return new Promise(function (resolve, reject) {
        if (typeof window.sssp !== 'undefined') {
            resolve();
            return;
        }
        var s = document.createElement('script');
        s.src = SSP_SCRIPT_URL;
        s.async = true;
        s.onload = function () { resolve(); };
        s.onerror = function () { reject(new Error('ssp.js failed to load')); };
        document.head.appendChild(s);
    });
}

/**
 * Hlavní detekční funkce.
 * Načte SSP skript a vrátí true pokud uživatel přišel ze Seznam.cz.
 *
 * Kaskáda detekce (první true vyhrává):
 *   1) UTM parametr utm_source — cross-portfolio traffic
 *      (uživatel přišel z jiného webu portfolia, který při seznam trafficu
 *       přidává ?utm_source=www.seznam.cz&utm_medium=seznam_distribuce
 *       na odchozí cross-content odkazy)
 *      Ruční testování: stačí přidat ?utm_source=www.seznam.cz do URL.
 *   2) sssp.displaySeznamAds() — API Seznamu (přímý traffic ze seznam.cz)
 *
 * Zdroje:
 *   UTM zápis: src/fresh/prod/seznam.js:88, src/asset/seznam.js
 *              (add_utm_to_cross_content_footer_carousel, add_utm_to_footer)
 *   SSP API:   src/echo24/prod/echo24_config.js:103-112
 *
 * @returns {Promise<boolean>}
 */
async function detectSeznamTraffic() {
    // 1) UTM parametr — cross-portfolio traffic + ruční testování
    try {
        var urlParams = new URLSearchParams(window.location.search);
        var utmSource = urlParams.get('utm_source');
        if (utmSource && utmSource === SEZNAM_UTM_SOURCE) {
            _weuronDebug && console.log('%c[Weuron]%c [blok_source_0003] %c[seznam_traffic]%c UTM detected: utm_source=' + utmSource,
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                'background:#9C27B0;color:#fff;border-radius:3px;padding:1px 4px;', '');
            setSeznamCookie();
            return true;
        }
    } catch (e) {
        // URLSearchParams not supported — fallback to SSP only
    }

    // 3) SSP API — přímý traffic ze seznam.cz
    try {
        await loadSspScript();
    } catch (e) {
        _weuronDebug && console.warn('%c[Weuron]%c [blok_source_0003] [seznam_traffic] ssp.js load failed:', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', e);
        return false;
    }

    if (typeof window.sssp !== 'undefined'
        && typeof window.sssp.displaySeznamAds === 'function'
        && window.sssp.displaySeznamAds()) {
        _weuronDebug && console.log('%c[Weuron]%c [blok_source_0003] %c[seznam_traffic]%c sssp.displaySeznamAds() = true',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
            'background:#4CAF50;color:#fff;border-radius:3px;padding:1px 4px;', '');
        setSeznamCookie();
        return true;
    }

    _weuronDebug && console.log('%c[Weuron]%c [blok_source_0003] %c[seznam_traffic]%c NENÍ seznam traffic → normální traffic',
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
        'background:#607D8B;color:#fff;border-radius:3px;padding:1px 4px;', '');
    return false;
}

/**
 * Nastaví cookie promoSeznam pro aktuální session.
 * CPEX Package (filterAdUnitsBeforeAuction) filtruje adUnits
 * na základě přítomnosti/nepřítomnosti této cookie — viz CSV sloupce
 * cookieIs / cookieIsNot.
 */
function setSeznamCookie() {
    var expires = new Date(Date.now() + 30 * 60 * 1000).toUTCString();
    document.cookie = 'promoSeznam=filtercookie; path=/; SameSite=Lax; expires=' + expires;
    _weuronDebug && console.log('%c[Weuron]%c [blok_source_0003] %c[seznam_traffic]%c Cookie promoSeznam nastavena (platnost 30 min)',
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
        'background:#FF9800;color:#fff;border-radius:3px;padding:1px 4px;', '');
}


// ===========================
// ADSERVER KONTEXT
// ===========================

/**
 * Vrátí objekt s úpravami reklamní konfigurace na základě detekce.
 *
 * @param {boolean} isSeznamTraffic — výsledek z detectSeznamTraffic()
 * @param {number}  [breakpoint=768]
 * @returns {{
 *   seznamTraffic: boolean,
 *   section: string,
 *   skipInterstitial: boolean,
 *   skipLazyload: boolean,
 *   restrictedAreas: Object|null
 * }}
 *
 * Zdroj: src/echo24/prod/echo24_config.js:186-200
 *        src/echo24/prod/assets/add_nonstandard_mone.js
 */
function applySeznamAdserverContext(isSeznamTraffic, breakpoint) {
    if (typeof breakpoint !== 'number') breakpoint = (typeof DEVICE_BREAKPOINT !== 'undefined') ? DEVICE_BREAKPOINT : 768;
    var isMobile = (document.documentElement.clientWidth || window.innerWidth) < breakpoint;
    var defaultSection = isMobile ? 'mobile' : 'desktop';
    var section = defaultSection; // SAS_SECTION záměrně ignorováno — viz komentář DEVICE_BREAKPOINT

    if (!isSeznamTraffic) {
        return {
            seznamTraffic: false,
            section: section,
            skipInterstitial: false,
            skipLazyload: false,
            restrictedAreas: null,
        };
    }

    return {
        seznamTraffic: true,

        // SAS section přepnutá na seznam-specifickou
        // → SAS adserver načte odpovídající sadu reklamních zón
        // Zdroj: src/echo24/prod/echo24_config.js:188
        section: isMobile ? 'seznam_mobile' : 'seznam_desktop',

        // Interstitial/desktopstrip se při seznam trafficu nepřidávají
        // Zdroj: src/echo24/prod/assets/add_nonstandard_mone.js
        skipInterstitial: true,

        // Lazyload se vypíná — vše se načte hned
        // Zdroj: src/fresh/prod/fresh_sas_config.js:140
        skipLazyload: true,

        // Omezení povolených sizes pro mobilerectangle-1
        // Zdroj: src/echo24/prod/echo24_config.js:195
        restrictedAreas: {
            'mobilerectangle-1': '320x100,500x200,native',
        },
    };
}

/**
 * Aplikuje restrictedAreas na SAS (volá sas.setareas).
 * Volat PO načtení sas.js, PŘED sas.loadmone.
 *
 * @param {{ restrictedAreas: Object|null }} ctx — výstup z applySeznamAdserverContext
 */
function applySasAreaRestrictions(ctx) {
    if (ctx && ctx.restrictedAreas && typeof sas !== 'undefined' && typeof sas.setareas === 'function') {
        sas.setareas(ctx.restrictedAreas);
    }
}


// ===========================
// CROSS-PORTFOLIO LINK POLICY (Seznam, dokumentace ř. 65–125
// — sekce „Máte obsah na více doménách? Session při přechodech
//   mezi doménami")
// ===========================

/**
 * Vrátí aktivní Seznam kanál pro hodnotu `utm_campaign` na odchozím odkazu.
 *
 * Pořadí preferencí (vyhrává první neprázdný řetězec):
 *   1) sssp.getSource()  — oficiální způsob dle dokumentace; vrací aktivní
 *      kanál session ('hp_feed', 'hp_box', 'novinky', 'sbrowser', …)
 *      nebo null, pokud session neběží.
 *   2) utm_campaign z aktuální URL — uživatel právě přišel ze Seznamu,
 *      Seznam mu na URL nasadil utm_campaign = aktivní kanál; přebíráme.
 *   3) 'hp_feed' — konzervativní default („HP newsfeed"). Nikdy by k tomu
 *      nemělo dojít, protože volání této funkce je gated přes
 *      seznamTraffic === true.
 *
 * @returns {string} hodnota pro utm_campaign na odchozím linku
 */
function getActiveSeznamCampaign() {
    try {
        if (typeof window.sssp !== 'undefined'
            && typeof window.sssp.getSource === 'function') {
            var s = window.sssp.getSource();
            if (s && typeof s === 'string' && s.length > 0) return s;
        }
    } catch (e) { /* sssp není připraven */ }
    try {
        var p = (new URLSearchParams(window.location.search)).get('utm_campaign');
        if (p && p.length > 0) return p;
    } catch (e) { /* URLSearchParams not supported */ }
    return 'hp_feed';
}

/**
 * Rozhodne, zda hostname `target` patří do našeho portfolia (= zaslouží si
 * UTM rewrite / odstranění).
 *
 * Podporujeme i match přes subdoménu: položka 'cool.iprima.cz' v listu
 * SEZNAM_PORTFOLIO_HOSTNAMES zachytí i 'www.cool.iprima.cz'.
 *
 * Hostname AKTUÁLNÍ stránky (location.hostname) je z výběru implicitně
 * vyloučen — link „v rámci stejné domény" se podle dokumentace nepřepisuje.
 *
 * @param {string} target — hostname cílového odkazu (URL.hostname)
 * @param {string[]} list — SEZNAM_PORTFOLIO_HOSTNAMES
 * @param {string} ownHost — location.hostname (aktuální stránka)
 * @returns {boolean}
 */
function _isSeznamPortfolioHost(target, list, ownHost) {
    if (!target) return false;
    var t = String(target).toLowerCase();
    var own = String(ownHost || '').toLowerCase();
    if (t === own) return false;
    for (var i = 0; i < list.length; i++) {
        var h = String(list[i]).toLowerCase();
        if (!h) continue;
        if (t === h) return true;
        if (t.length > h.length + 1 && t.slice(-(h.length + 1)) === '.' + h) return true;
    }
    return false;
}

/**
 * Přepíše href tak, aby splňoval Seznam-spec pro multi-domain partnery
 * (dokumentace.txt, ř. 69–73).
 *
 * Přidá / přepíše tyto query parametry:
 *   utm_source   = 'www.seznam.cz'             (= SEZNAM_UTM_SOURCE)
 *   utm_medium   = 'seznam_distribuce'         (oficiální, platný od 1. 6. 2026)
 *   utm_campaign = getActiveSeznamCampaign()   (aktuální kanál session)
 *   szn-session  = location.hostname           (zdrojová doména)
 *
 * Použití URL API ošetřuje korektně linky, které už `?` mají
 * (oprava bugu starého řešení, kde se blindly připojoval druhý `?`).
 *
 * @param {HTMLAnchorElement} a — element <a>
 * @param {string} campaign — předem získaná hodnota z getActiveSeznamCampaign()
 * @param {string} ownHost — location.hostname
 */
function _rewriteSeznamCrossLink(a, campaign, ownHost) {
    if (!a) return;
    try {
        var u = new URL(a.href, window.location.origin);
        u.searchParams.set('utm_source',   SEZNAM_UTM_SOURCE);
        u.searchParams.set('utm_medium',   'seznam_distribuce');
        u.searchParams.set('utm_campaign', campaign);
        u.searchParams.set('szn-session',  ownHost || window.location.hostname);
        a.href = u.toString();
    } catch (e) {
        _weuronDebug && console.warn('%c[Weuron]%c [blok_source_0003] [seznam_traffic] rewrite link failed:',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', a && a.href, e);
    }
}

/**
 * Aplikuje cross-portfolio policy na všechny <a href> linky DNES v DOMu.
 * Je řízena globální proměnnou SEZNAM_TRAFFIC_CROS_WEB_PORTFOLIO_BEHAVIOR
 * (definovaná v blok_0000):
 *
 *   'rewrite' — přepíše href linků mířících na portfolio domény
 *               (utm_source, utm_medium=seznam_distribuce, utm_campaign,
 *                szn-session). Patička / linky zůstávají v DOMu.
 *
 *   'remove'  — neutralizuje href linků mířících na portfolio domény
 *               (href := '#') a element skryje (style.display = 'none').
 *               Imituje historické `hide_all_cross_footer` z prod kódu,
 *               ale per-link (granularita).
 *
 *   'none'    — žádný zásah. Vhodné, když web cross-portfolio linky
 *               nemá (echo24) nebo když má vlastní legacy modul.
 *
 * Při Seznam-trafficu navíc doplňuje multi-domain navazující krok dle
 * dokumentace.txt (ř. 91–122): pokud aktuální URL obsahuje
 * utm_medium=seznam_distribuce a SSP skript je k dispozici, zavoláme
 * sssp.setSessionCookie(utm_campaign). Tím na CÍLOVÉ doméně preventivně
 * obnovíme session cookie (ssp.js to z velké části dělá interně sám,
 * ale dokumentace pro multi-domain doporučuje explicitní volání).
 *
 * IMPORTANT: Nemá smysl volat tuto funkci na webu, který nepoužívá Seznam
 * (sssp.displaySeznamAds() === false a UTM v URL neexistuje); proto je
 * gated přes parametr isSeznamTraffic. Bez detekce no-op.
 *
 * @param {boolean} isSeznamTraffic — výsledek z detectSeznamTraffic()
 */
function applySeznamCrossPortfolioPolicy(isSeznamTraffic) {
    if (!isSeznamTraffic) return;

    // Vyhodnotit policy (výchozí 'none' pokud proměnná chybí — fail-safe).
    var policy = (typeof SEZNAM_TRAFFIC_CROS_WEB_PORTFOLIO_BEHAVIOR === 'string')
        ? SEZNAM_TRAFFIC_CROS_WEB_PORTFOLIO_BEHAVIOR
        : 'none';
    if (['rewrite', 'remove', 'none'].indexOf(policy) === -1) policy = 'none';

    // Multi-domain navazující krok: pokud jsme cílovou doménou cross-portfolio
    // hop (URL má utm_medium=seznam_distribuce), nasadit session cookie i tady.
    // Dle dokumentace.txt ř. 99–117. Volat NEZÁVISLE na hodnotě policy —
    // tohle je „příjem", ne „odesílání" a Seznam to vyžaduje vždy.
    try {
        var p = new URLSearchParams(window.location.search);
        var um = p.get('utm_medium');
        if (um && um.trim() === 'seznam_distribuce'
            && typeof window.sssp !== 'undefined'
            && typeof window.sssp.setSessionCookie === 'function') {
            var camp = (p.get('utm_campaign') || '').trim() || 'hp_feed';
            try {
                window.sssp.setSessionCookie(camp);
                _weuronDebug && console.log('%c[Weuron]%c [blok_source_0003] %c[seznam_traffic]%c sssp.setSessionCookie('+camp+')',
                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                    'background:#3F51B5;color:#fff;border-radius:3px;padding:1px 4px;', '');
            } catch (e) {
                _weuronDebug && console.warn('[Weuron] [blok_source_0003] setSessionCookie failed:', e);
            }
        }
    } catch (e) { /* URLSearchParams not supported */ }

    if (policy === 'none') {
        _weuronDebug && console.log('%c[Weuron]%c [blok_source_0003] %c[seznam_traffic]%c cross-portfolio policy: none (no-op)',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
            'background:#9E9E9E;color:#fff;border-radius:3px;padding:1px 4px;', '');
        return;
    }

    // Seznam portfolio domén — fail-safe pokud proměnná chybí.
    var hosts = (typeof SEZNAM_PORTFOLIO_HOSTNAMES !== 'undefined' && Array.isArray(SEZNAM_PORTFOLIO_HOSTNAMES))
        ? SEZNAM_PORTFOLIO_HOSTNAMES
        : [];
    if (hosts.length === 0) {
        _weuronDebug && console.warn('[Weuron] [blok_source_0003] SEZNAM_PORTFOLIO_HOSTNAMES is empty — nothing to '+policy);
        return;
    }

    var ownHost = window.location.hostname;
    var campaign = getActiveSeznamCampaign();
    var anchors = document.querySelectorAll('a[href]');
    var touched = 0;

    for (var i = 0; i < anchors.length; i++) {
        var a = anchors[i];
        var targetHost;
        try {
            targetHost = (new URL(a.href, window.location.origin)).hostname;
        } catch (e) { continue; }
        if (!_isSeznamPortfolioHost(targetHost, hosts, ownHost)) continue;

        if (policy === 'rewrite') {
            _rewriteSeznamCrossLink(a, campaign, ownHost);
        } else if (policy === 'remove') {
            // Neutralizuj link i jeho viditelnost — bez dotyku na okolní DOM.
            try { a.href = '#'; } catch (e) {}
            try { a.removeAttribute('target'); } catch (e) {}
            try {
                a.setAttribute('aria-hidden', 'true');
                a.setAttribute('data-weuron-seznam-removed', '1');
                a.style.display = 'none';
            } catch (e) {}
        }
        touched++;
    }

    _weuronDebug && console.log('%c[Weuron]%c [blok_source_0003] %c[seznam_traffic]%c cross-portfolio policy: '+policy+' (touched '+touched+' link(s), campaign='+campaign+')',
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
        'background:#3F51B5;color:#fff;border-radius:3px;padding:1px 4px;', '');
}


// ===========================
// VÝCHOZÍ KONTEXT (bez modulu)
// ===========================

/**
 * Vrátí výchozí kontext se všemi hodnotami na false/null.
 * Tuto funkci používá cleaned.js jako fallback, pokud modul NENÍ přítomen.
 * Definována zde pro referenci — v cleaned.js je inlinovaná.
 */
function getDefaultSeznamContext(breakpoint) {
    if (typeof breakpoint !== 'number') breakpoint = (typeof DEVICE_BREAKPOINT !== 'undefined') ? DEVICE_BREAKPOINT : 768;
    var isMobile = (document.documentElement.clientWidth || window.innerWidth) < breakpoint;
    var defaultSection = isMobile ? 'mobile' : 'desktop';
    return {
        seznamTraffic: false,
        section: defaultSection, // SAS_SECTION záměrně ignorováno — viz komentář DEVICE_BREAKPOINT
        skipInterstitial: false,
        skipLazyload: false,
        restrictedAreas: null,
    };
}






    /*
    ---------------------------------------------
    Blok: blok_0006
    Název: gam_standard_tag_pure_echo
    Cesta: src/creatives/sas_creative_templates.js
    Řádky: 171-320
    Použití v buildu: ANO (sas_render_gam_pure_echo)
    Závislosti: NE (všechny závislosti jsou globální – window, document, nebo jsou předávány parametrem)
     Zcela logická shoda source vs build verze: NE (vědomě rozšířeno)
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
        // Sdílené match flagy, aby se podmínky nerozjížděly na více místech.
        var isMobileRectangleArea = /^mobilerectangle/.test(area);
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

            if (isMobileRectangleArea) {
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
                                    if (advert?.width && advert.width > (document.documentElement.clientWidth || window.innerWidth)) {
                                        const scale = (document.documentElement.clientWidth || window.innerWidth) / advert.width;
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

        // Legacy scroll fallback je řízený přes RELOADING_MODE.
        // - hard: listener vždy, fallback se aktivuje dynamicky při limit=0
        // - selective: listener jen pro RELOAD_POSITIONS=0 / neuvedené area
        // - economical: fallback úplně vypnut
        var reloadMs = Number(reload);
        if (!isFinite(reloadMs) || reloadMs < 5000) {
            _weuronDebug && console.log('%c[Weuron]%c [blok_0006] [legacy reload skip] area=' + area +
                ' | neplatná/nízká hodnota reload=' + reload,
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
            return;
        }

        var hasReloadConfig = Object.prototype.hasOwnProperty.call(RELOAD_POSITIONS, area);
        var initialLimit = (typeof getEffectiveReloadLimit === 'function')
            ? getEffectiveReloadLimit(area)
            : (RELOAD_POSITIONS[area] || 0);
        var shouldRegisterLegacyListener = true;

        if (RELOADING_MODE === 'economical') {
            shouldRegisterLegacyListener = false;
        } else if (RELOADING_MODE === 'selective') {
            shouldRegisterLegacyListener = (!hasReloadConfig || initialLimit === 0);
        }

        if (!shouldRegisterLegacyListener) {
            _weuronDebug && console.log('%c[Weuron]%c [blok_0006] [legacy listener not registered] area=' + area +
                ' | mode=' + RELOADING_MODE +
                ' | initialLimit=' + initialLimit +
                ' | fallback přes scroll listener je pro tuto area vypnut',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
            return;
        }

        let first = true;
        let timeout = false;
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = document.documentElement.clientWidth || window.innerWidth;
            const elementHeight = rect.height;
            const elementWidth = rect.width;
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
            const visibleArea = (visibleHeight > 0 && visibleWidth > 0) ? (visibleHeight * visibleWidth) : 0;
            const totalArea = elementHeight * elementWidth;
            return totalArea > 0 && (visibleArea / totalArea) >= 0.25;
        }
        const element = document.getElementById(posId);
        if (element) {
            if (element.getAttribute('data-weuron-legacy-reload-bound') === '1') {
                return;
            }
            element.setAttribute('data-weuron-legacy-reload-bound', '1');
            window.addEventListener('scroll', function () {
                if (isInViewport(element)) {
                    if (timeout === false) {
                        timeout = true;
                        if (first === false) {
                            if (RELOADING_MODE === 'hard') {
                                // Dynamicky zkontroluj aktuální efektivní limit —
                                // pokud centrální manager danou area stále spravuje (limit > 0),
                                // fallback se přeskočí. Po vyčerpání centrálních reloadů
                                // (manager sám nastaví RELOAD_POSITIONS[area]=0) se podmínka
                                // splní a fallback se aktivuje.
                                var currentLimit = (typeof getEffectiveReloadLimit === 'function')
                                    ? getEffectiveReloadLimit(area)
                                    : (RELOAD_POSITIONS[area] || 0);
                                if (currentLimit > 0) {
                                    _weuronDebug && console.log('%c[Weuron]%c [blok_0006] [legacy reload skipped] area=' + area +
                                        ' | mode=hard | effectiveReloadLimit=' + currentLimit + ' > 0, centrální manager má prioritu',
                                        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
                                } else {
                                    _weuronDebug && console.log('%c[Weuron]%c [blok_0006] [legacy reload fired] area=' + area +
                                        ' | mode=hard | effectiveReloadLimit=' + currentLimit +
                                        ' (RELOAD_POSITIONS[area]=0 nebo neuvedeno — centrální manager neaktivní)',
                                        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
                                    window.renderAdMone(area, posId);
                                }
                            } else {
                                // selective: listener je registrován jen pro area bez aktivního
                                // centrálního reloadu, proto můžeme render volat přímo.
                                _weuronDebug && console.log('%c[Weuron]%c [blok_0006] [legacy reload fired] area=' + area +
                                    ' | mode=' + RELOADING_MODE + ' | fallback listener aktivní pro tuto area',
                                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
                                window.renderAdMone(area, posId);
                            }
                        }
                        setTimeout(function () {
                            timeout = false;
                            first = false;
                        }, 10000);
                    }
                }
            });
            _weuronDebug && console.log('%c[Weuron]%c [blok_0006] [legacy reload listener registered] area=' + area +
                ' | mode=' + RELOADING_MODE +
                ' | reloadMs=' + reloadMs +
                ' | aktuálně effectiveReloadLimit=' + ((typeof getEffectiveReloadLimit === 'function') ? getEffectiveReloadLimit(area) : (RELOAD_POSITIONS[area] || 0)) +
                ' | mode=hard čeká na limit=0, mode=selective renderuje přímo pro registrované area',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
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

async function init_cpex_header_bidding(_consent, call_adserver, r2b2_script = '', cpex_publisher = '', cpex_site = '', cpex_package = '') {
    window.pbjs = window.pbjs || {};
    pbjs.winningBidsSas = pbjs.winningBidsSas || {};
    // Příznak: cpexAuctionDone ještě nefiroval
    let cpexAuctionFired = false;

    window.cpexPackageConfig = {
        publisherSettingsPath: cpex_publisher,
        websiteSettingsPath: cpex_site,
        errorPath: ''
    };

    // ═══════════════════════════════════════════════════════════════════
    // WORKAROUND #1: adapter 'prima' → 'sastracker'
    // ═══════════════════════════════════════════════════════════════════
    // PŘÍČINA: cpex-package v6.0.0/v6.0.1 nemá AdServerPrima třídu, ale
    //   publisher settings stále mají adserver.adapter = 'prima'.
    // PROJEV: setAdServer() selže → load() vrátí false →
    //   cpexPackageLoaded se nedispatchne → HB se nespustí.
    // PO OPRAVĚ: Smazat po aktualizaci CPEX settings na cdn.cpex.cz.
    // ═══════════════════════════════════════════════════════════════════
    //
    // ═══════════════════════════════════════════════════════════════════
    // WORKAROUND #2: AdsObject stub
    // ═══════════════════════════════════════════════════════════════════
    // PŘÍČINA: AdServerSasTracker.call() vyžaduje window.AdsObject.ball.
    //   Echo24 AdsObject nepoužívá. Stub umlčí error.
    //   cpexPackageLoaded listener poté přepíše reálným AdsObject
    //   s device-filtrovanými pozicemi (viz blok níže).
    // PO OPRAVĚ: Smazat po implementaci CPEX publisher modulu pro iPrima.
    // ═══════════════════════════════════════════════════════════════════

    //od verze cpex-package_V_6_0_13.js zrušeno (12.6.2026)
    // window.cpexPackageQueue = window.cpexPackageQueue || [];
    // window.cpexPackageQueue.push(function() {
    //     if (window.cpexPackage && window.cpexPackage.settings &&
    //         window.cpexPackage.settings.adserver &&
    //         window.cpexPackage.settings.adserver.adapter === 'prima') {
    //         window.cpexPackage.settings.adserver.adapter = 'sastracker';
    //     }
    //     if (!window.AdsObject || !window.AdsObject.ball) {
    //         window.AdsObject = window.AdsObject || {};
    //         window.AdsObject.ball = window.AdsObject.ball || {};
    //     }
        // ── WORKAROUND: auctionTimeoutMs pojistka ─────────────────────────────
        // CDN config (echo24.cz.js) nemá auctionTimeoutMs → default 1000 ms.
        // Rubicon/appnexus/pubmatic vracejí bidy za ~2,5–2,7 s → timeoutují.
        // POZOR: runQueue() je voláno PO loadSettings(), ale PŘED new Headerbidding()
        //   → cpexPackage.headerbidding je v tomto okamžiku undefined.
        //   → správná cesta je cpexPackage.settings.headerbidding.auctionTimeoutMs.
        // PO OPRAVĚ: Smazat po nasazení auctionTimeoutMs do CDN settings.

        //od verze cpex-package_V_6_0_13.js zrušeno (12.6.2026)
        // if (window.cpexPackage && window.cpexPackage.settings &&
        //     window.cpexPackage.settings.headerbidding &&
        //     (window.cpexPackage.settings.headerbidding.auctionTimeoutMs || 0) < 3000) {
        //     var _prevTimeout = window.cpexPackage.settings.headerbidding.auctionTimeoutMs;
        //     window.cpexPackage.settings.headerbidding.auctionTimeoutMs = 3000;
        //     _weuronDebug && console.log('%c[Weuron]%c [cpexPackageQueue] auctionTimeoutMs → 3000 (bylo: ' + _prevTimeout + ')',
        //         'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
        // }
    //});

    // ═══════════════════════════════════════════════════════════════════
    // PARALELNÍ NAČÍTÁNÍ: sas.js + R2B2 + cpex-package SOUČASNĚ
    // ═══════════════════════════════════════════════════════════════════
    // PŮVODNÍ STAV: sas.js se await-oval PŘED appendem cpex-package scriptu
    //   → cpex-package se začal stahovat AŽ po sas.js (~200-300ms navíc)
    // OPRAVA: cpex-package append PŘED await → stahuje se paralelně se sas.js
    //   → celkový čas = max(sas.js, cpex-package) místo sas.js + cpex-package
    // BEZPEČNOST: cpexPackageConfig + cpexPackageQueue se nastavují PŘED
    //   appendem (viz výše), cpexPackageLoaded listener se registruje PŘED
    //   appendem (viz níže) → žádná race condition.
    // ═══════════════════════════════════════════════════════════════════
    // Spustit stahování cpex-package IHNED (fire-and-forget, paralelně se sas.js)
    document.head.appendChild(Object.assign(document.createElement('script'), { src: cpex_package, fetchPriority: 'high' }));

    // Promise pro signalizaci, že sas.js je načtený — všechny handlery
    // (cpexPackageLoaded catch/else, cpexAuctionDone, fallback timeout)
    // čekají na tuto promise, protože call_adserver potřebuje window.sas.
    var _sasReady;
    var sasReadyPromise = new Promise(function(resolve) { _sasReady = resolve; });

    // ═══════════════════════════════════════════════════════════════════
    // RUČNÍ SPUŠTĚNÍ HB AUKCE (v6.0.1 — autoRun vypnut Davidem)
    // ═══════════════════════════════════════════════════════════════════
    // PŘÍČINA: David Spohr (13.4.2026) vypnul autoRun v settings, protože
    //   bez AdsObject cpexPackage bidoval na VŠECHNY adUnits z CSV
    //   (i pozice, které na stránce nejsou) → špatný bid-to-win ratio
    //   → hrozí throttling od SSP.
    // ŘEŠENÍ: Po načtení cpexPackage nascanujeme DOM pro reálné pozice
    //   a zavoláme runAuction() jen s nimi. Event cpexPackageLoaded
    //   dispatchuje cpexPackage po load() (před run()).
    //   runAuction → processBids → cpexAuctionDone → call_adserver.
    // DOKUMENTACE: https://package.cpex.cz/branches/refactoring/Headerbidding.html#runAuction
    // PO OPRAVĚ: Pokud CPEX implementuje publisher modul pro iPrima
    //   s vlastním AdsObject, autoRun se zapne zpět a tento blok se smaže.
    // DŮLEŽITÉ: Listener MUSÍ být registrován PŘED await (sas.js),
    //   protože cpex-package se stahuje paralelně a při cache hit
    //   může cpexPackageLoaded firovat BĚHEM čekání na sas.js.
    // ═══════════════════════════════════════════════════════════════════
    window.addEventListener('cpexPackageLoaded', function () {
        // ═══════════════════════════════════════════════════════════
        // Nascanovat DOM a sestavit adUnitCodes + reálný AdsObject.
        // overwrite_sas_mone() již proběhl → kontejnery mají data-d-area/data-m-area.
        // 1) Pozice z DOM (data-d/m-area)
        // 2) Lazyload pozice (data-lazyload-area)
        // 3) RENDERING_AND_RELOADING_ALWAYS (dynamické, vždy viditelné)
        // Vše filtrováno matchesDevice() → RESPONSIVE_BREAKPOINTS + šířka.
        // Záměrně BEZ filtru přes RELOAD_POSITIONS:
        // RELOAD_POSITIONS řídí jen periodický reload, ne první aukci stránky.
        // ═══════════════════════════════════════════════════════════
        var adUnitCodes = [];
        var _w = document.documentElement.clientWidth || window.innerWidth;

        // Pomocná funkce: ověří zda pozice odpovídá aktuálnímu zařízení.
        // 1) RESPONSIVE_BREAKPOINTS = lokální override (zpravidla prázdný — šířkový
        //    filtr aukce dělá CPEX config přes filter.minWidth/maxWidth; viz dokumentace
        //    RESPONSIVE_BREAKPOINTS v block_0000).
        // 2) Standardní cesta = fallback dle názvu: "mobile" v názvu = mobilní, jinak desktop.
        function matchesDevice(area) {
            var bp = RESPONSIVE_BREAKPOINTS[area];
            if (bp) {
                if (bp.minWidth !== undefined && _w < bp.minWidth) return false;
                if (bp.maxWidth !== undefined && _w > bp.maxWidth) return false;
                return true;
            }
            // Implicitní klasifikace z názvu pozice
            var isMobile = /mobile/.test(area);
            if (isMobile && _w >= DEVICE_BREAKPOINT) return false;
            if (!isMobile && _w < DEVICE_BREAKPOINT) return false;
            return true;
        }

        // 1. Pozice z DOM (data-d-area, data-m-area)
        var _moneEls = document.querySelectorAll('.sas_mone[data-d-area], .sas_mone[data-m-area]');
        for (var i = 0; i < _moneEls.length; i++) {
            var _areaName = _moneEls[i].getAttribute('data-d-area') || _moneEls[i].getAttribute('data-m-area');
            if (_areaName && adUnitCodes.indexOf(_areaName) === -1 && matchesDevice(_areaName)) {
                adUnitCodes.push(_areaName);
            }
        }
        // 2. Lazyload pozice (data-lazyload-area)
        var _lazyEls = document.querySelectorAll('.sas_mone[data-lazyload-area]');
        for (var j = 0; j < _lazyEls.length; j++) {
            var _lazyName = _lazyEls[j].getAttribute('data-lazyload-area');
            if (_lazyName && adUnitCodes.indexOf(_lazyName) === -1 && matchesDevice(_lazyName)) {
                adUnitCodes.push(_lazyName);
            }
        }
        // 3. Pozice z RENDERING_AND_RELOADING_ALWAYS (vždy viditelné, mohou být
        //    přidány dynamicky a ještě v DOM nejsou). Filtrujeme matchesDevice().
        RENDERING_AND_RELOADING_ALWAYS.forEach(function (area) {
            if (adUnitCodes.indexOf(area) === -1 && matchesDevice(area)) {
                adUnitCodes.push(area);
            }
        });

        // ─────────────────────────────────────────────────────────────────
        // FILTR CPEX AUKCE — HIDE_POSITIONS_BY_WIDTH + BRANDING_MIN_WIDTH
        // ─────────────────────────────────────────────────────────────────
        // HIDE_POSITIONS_BY_WIDTH: vyřadit pozice z adUnitCodes, které
        // applyHidePositionsByWidth() stejně odebere z DOM → CPEX je
        // nebiduje = žádné zbytečné bidy, zachován bid-to-win ratio.
        // Bez tohoto by CPEX aukcoval pozici, SAS ji nenajde → vyhraný bid
        // nikdy nerendere, ale SSP ho zaregistruje jako no-win.
        if (typeof HIDE_POSITIONS_BY_WIDTH !== 'undefined') {
            adUnitCodes = adUnitCodes.filter(function(area) {
                var rule = HIDE_POSITIONS_BY_WIDTH[area];
                if (!rule) return true;
                var inHideRange = true;
                if (rule.minWidth !== undefined && _w < rule.minWidth) inHideRange = false;
                if (rule.maxWidth !== undefined && _w > rule.maxWidth) inHideRange = false;
                if (inHideRange) {
                    _weuronDebug && console.log(
                        '%c[Weuron]%c [blok_0011] [CPEX HIDE] ' + area +
                        ' vynecháno z CPEX aukce (HIDE_POSITIONS_BY_WIDTH, viewport=' + _w + 'px)',
                        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
                }
                return !inHideRange;
            });
        }

        // REWRITE_POSITIONS_BY_WIDTH: pro pozice v rewrite rozsahu vyřadit FROM area
        // z adUnitCodes a zařadit TO area (pokud matchesDevice vrátí true).
        // CPEX scan probíhá nad původním DOM (před applyRewritePositionsByWidth) →
        // bez tohoto filtru by CPEX aukcoval FROM area, ale SAS by ji nenašel
        // (atribut byl přepsán) → vyhraný bid se nikdy nezobraví = bid-to-win loss.
        if (typeof REWRITE_POSITIONS_BY_WIDTH !== 'undefined') {
            for (var _rFrom in REWRITE_POSITIONS_BY_WIDTH) {
                if (!Object.prototype.hasOwnProperty.call(REWRITE_POSITIONS_BY_WIDTH, _rFrom)) continue;
                var _rRule = REWRITE_POSITIONS_BY_WIDTH[_rFrom];
                if (!_rRule || typeof _rRule.to !== 'string') continue;

                var _rInRange = true;
                if (_rRule.minWidth !== undefined && _w < _rRule.minWidth) _rInRange = false;
                if (_rRule.maxWidth !== undefined && _w > _rRule.maxWidth) _rInRange = false;
                if (!_rInRange) continue;

                // Vyřadit FROM area
                var _rFromIdx = adUnitCodes.indexOf(_rFrom);
                if (_rFromIdx !== -1) {
                    adUnitCodes.splice(_rFromIdx, 1);
                    _weuronDebug && console.log(
                        '%c[Weuron]%c [blok_0011] [CPEX REWRITE] ' + _rFrom + ' vyřazeno z CPEX aukce → nahrazeno ' + _rRule.to,
                        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
                }

                // Zařadit TO area (pokud matchesDevice vrátí true a není v adUnitCodes)
                if (adUnitCodes.indexOf(_rRule.to) === -1 && matchesDevice(_rRule.to)) {
                    adUnitCodes.push(_rRule.to);
                    _weuronDebug && console.log(
                        '%c[Weuron]%c [blok_0011] [CPEX REWRITE] ' + _rRule.to + ' zařazeno do CPEX aukce (viewport=' + _w + 'px)',
                        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
                }
            }
        }

        // BRANDING_MIN_WIDTH: odebrat [2000, 1400] z adUnit leaderboard-1 v
        // cpexWebsiteSettings před runAuction(), pokud viewport < BRANDING_MIN_WIDTH.
        // PROČ JE TO NUTNÉ:
        //   branding: false v sas.loadmone NESTAČÍ — SAS sestaví URL s
        //   bidderSize=2000x1400 z pbjs.winningBidsSas a ad server branding
        //   doručí bez ohledu na branding parametr (enableBranding je v sas.js
        //   zakomentováno, vždy vrací ''). Jedinou zárukou je, aby CPEX vyhraný
        //   bid na 2000x1400 vůbec neměl.
        if (typeof BRANDING_MIN_WIDTH !== 'undefined' && BRANDING_MIN_WIDTH > 0 &&
            _w < BRANDING_MIN_WIDTH) {
            try {
                var _wsAdUnits = window.cpexWebsiteSettings &&
                                 window.cpexWebsiteSettings.headerbidding &&
                                 window.cpexWebsiteSettings.headerbidding.adUnits;
                if (_wsAdUnits) {
                    for (var ai = 0; ai < _wsAdUnits.length; ai++) {
                        if (_wsAdUnits[ai].code === 'leaderboard-1' &&
                            _wsAdUnits[ai].mediaTypes &&
                            _wsAdUnits[ai].mediaTypes.banner &&
                            Array.isArray(_wsAdUnits[ai].mediaTypes.banner.sizes)) {
                            var _beforeCount = _wsAdUnits[ai].mediaTypes.banner.sizes.length;
                            _wsAdUnits[ai].mediaTypes.banner.sizes =
                                _wsAdUnits[ai].mediaTypes.banner.sizes.filter(function(sz) {
                                    return !(Array.isArray(sz) && sz[0] === 2000 && sz[1] === 1400);
                                });
                            if (_wsAdUnits[ai].mediaTypes.banner.sizes.length < _beforeCount) {
                                _weuronDebug && console.log(
                                    '%c[Weuron]%c [blok_0011] [CPEX BRANDING] [2000,1400] odebráno' +
                                    ' z leaderboard-1 adUnit (BRANDING_MIN_WIDTH=' + BRANDING_MIN_WIDTH +
                                    ', viewport=' + _w + 'px)',
                                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
                            }
                        }
                    }
                }
            } catch (_be) { /* silent — nezastavit aukci kvůli chybě filtru */ }
        }

        // SIZE_RESTRICTIONS_BY_WIDTH (blok_0000): generalizovaný size-filtr pro HB aukci.
        // Odebere removeSizes z cpexWebsiteSettings adUnit PŘED runAuction().
        applySizeRestrictionsByWidth('hb', _w);

        // Vybudovat reálný AdsObject — přepíše WA#2 stub.
        // Struktura: { ball: {}, 0: { area: 'pozice' }, 1: { area: 'pozice' }, ... }
        // CPEX getAdsList() iteruje klíče, přeskočí 'ball', čte obj[areaKey].
        window.AdsObject = { ball: {} };
        for (var k = 0; k < adUnitCodes.length; k++) {
            window.AdsObject[k] = { area: adUnitCodes[k] };
        }

        _weuronDebug && console.log('%c[Weuron]%c [blok_0011] %c[runAuction]%c cpexPackageLoaded → ' + adUnitCodes.length + ' pozic (viewport=' + _w + 'px): ' + adUnitCodes.join(', '),
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
            'background:#9C27B0;color:#fff;border-radius:3px;padding:1px 4px;', '');

        if (window.cpexPackage && window.cpexPackage.headerbidding && adUnitCodes.length > 0) {
            _weuronDebug && console.log('%c[Weuron]%c [blok_0011] [HB START - odesláno do CPEXu]',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', adUnitCodes.join(', '));
            window.cpexPackage.headerbidding.runAuction({ adUnitCodes: adUnitCodes }).then(function (auction) {
                _weuronDebug && console.log('%c[Weuron]%c [blok_0011] %c[runAuction]%c aukce dokončena',
                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                    'background:#4CAF50;color:#fff;border-radius:3px;padding:1px 4px;', '', auction);
                // ── OPRAVA: ruční runAuction (autoRun=off) nedispatchne ────
                // cpexAuctionDone event → call_adserver se NEDOSTANE přes
                // addEventListener('cpexAuctionDone'). Bid mapping + call_adserver
                // musíme provést PŘÍMO zde v .then() handleru.
                // Bez tohoto: reklamy čekají na 10s fallback timeout.
                if (!cpexAuctionFired) {
                    cpexAuctionFired = true;
                    sasReadyPromise.then(function() {
                        // Namapovat winning bids do pbjs.winningBidsSas (pro SAS render callbacky)
                        if (typeof pbjs.getBidResponses === 'function') {
                            pbjs.SAS_codesWithResponse = Object.keys(pbjs.getBidResponses());
                            try {
                                for (var s = 0; s < pbjs.SAS_codesWithResponse.length; s++) {
                                    var area = pbjs.SAS_codesWithResponse[s];
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
                                }
                            } catch (e) {
                                // bid mapping error — pokračovat bez HB dat (adserver se zavolá, jen bez HB cen)
                                _weuronDebug && console.warn('%c[Weuron]%c [blok_0011] %c[runAuction]%c bid mapping error — pokračujeme bez HB dat:',
                                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                                    'background:#f44336;color:#fff;border-radius:3px;padding:1px 4px;', '', e);
                            }
                        }
                        call_adserver(_consent);
                    });
                }
            }).catch(function (err) {
                _weuronDebug && console.log('%c[Weuron]%c [blok_0011] %c[runAuction]%c CHYBA aukce → fallback call_adserver',
                    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                    'background:#f44336;color:#fff;border-radius:3px;padding:1px 4px;', '', err);
                // runAuction selhala → nečekat 10s timeout, zavolat adserver ihned
                if (!cpexAuctionFired) {
                    cpexAuctionFired = true;
                    sasReadyPromise.then(function() { call_adserver(_consent); });
                }
            });
        } else {
            _weuronDebug && console.log('%c[Weuron]%c [blok_0011] %c[runAuction]%c PŘESKOČENO — cpexPackage.headerbidding nedostupný nebo 0 pozic → fallback call_adserver',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                'background:#FF9800;color:#fff;border-radius:3px;padding:1px 4px;', '');
            // Žádné pozice nebo chybějící HB modul → nečekat 10s timeout
            if (!cpexAuctionFired) {
                cpexAuctionFired = true;
                sasReadyPromise.then(function() { call_adserver(_consent); });
            }
        }
    });

    // FALLBACK TIMEOUT: pokud cpexAuctionDone nepřijde do 10s, zavoláme adserver přímo
    setTimeout(function() {
        if (!cpexAuctionFired) {
            cpexAuctionFired = true;
            sasReadyPromise.then(function() { call_adserver(_consent); });
        }
    }, 10000);

    // akce na mobilni slide-up, pop-up — po zavření nastaví capping
    // Samotný reload řeší reload_manager (blok_0000b) v dalším cyklu.
    window.addEventListener('cpexSlideupClosed', function (e) {
        // Zjistit adUnit z CPEX Slideup instance (e.detail.adUnit)
        var closedArea = (e && e.detail && e.detail.adUnit) ? e.detail.adUnit : 'mobilerectangle-1';
        reloadSetCapping(closedArea);
    });

    // Vignette — stejný pattern jako slideup (viz CPEX_setings\CPEX - dohody (schváleno).txt → D5)
    // Vignette na echo24 aktuálně NENÍ aktivní v settings, listener připraven preventivně.
    window.addEventListener('cpexVignetteClosed', function (e) {
        var closedArea = (e && e.detail && e.detail.adUnit) ? e.detail.adUnit : 'mobilerectangle-1';
        reloadSetCapping(closedArea);
    });

    // SAS direct popup (šablony 284_weuron / 164_weuron) — po zavření nastaví capping.
    // Symetrické s cpexSlideupClosed výše. Event dispatchují nové _weuron šablony
    // místo původního reloadPopup(), který byl nekompatibilní s CPEX flow.
    window.addEventListener('sasPopupClosed', function (e) {
        var closedArea = (e && e.detail && e.detail.area) ? e.detail.area : 'mobilerectangle-1';
        _weuronDebug && console.log('%c[Weuron]%c [blok_0023e] %c[sasPopupClosed]%c event received → reloadSetCapping("' + closedArea + '") detail=' + JSON.stringify(e && e.detail),
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
            'background:#E91E63;color:#fff;border-radius:3px;padding:1px 4px;', '');
        reloadSetCapping(closedArea);
    });

    window.addEventListener('cpexAuctionDone', function (e) {
        if (cpexAuctionFired) {
            return;
        }
        cpexAuctionFired = true;
        // Počkat na sas.js — cpexAuctionDone může přijít PŘED dokončením sas.js
        // (cpex-package se stahuje paralelně a aukce může doběhnout dříve)
        sasReadyPromise.then(function() {
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
            call_adserver(_consent);
        });
        // Reload mobilní pozice řeší reload_manager (blok_0000b) centrálně.
    }, false);

    try {
        // SAS se načítá vždy; R2B2 HB adapter jen pokud je URL neprázdné
        // (pokud blok_source_0002 není přítomen, r2b2_script bude prázdný → přeskočí se)
        // SAS_EMBEDDED=true → sas.js je inline (blok_0000h), žádný HTTP request
        // SAS_EMBEDDED=false → load_script načte sas.js z CDN asynchronně
        var scriptsToLoad = (typeof SAS_EMBEDDED !== 'undefined' && SAS_EMBEDDED)
            ? []
            : [load_script(sas_lib)];
        if (r2b2_script) {
            scriptsToLoad.push(load_script(r2b2_script));
        }
        await Promise.all(scriptsToLoad);
    } catch (e) {
        // fallback: zavolat adserver bez HB dat
        call_adserver(_consent);
        return;
    }
    window.cpexHbRender = true;
    _sasReady(); // sas.js načteno → odblokovat cpexAuctionDone handler
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
function add_nonstandard_mone(skipInterstitial) {
    const breakpoint = DEVICE_BREAKPOINT;
    const device = (document.documentElement.clientWidth || window.innerWidth) < breakpoint ? "mobil" : "desktop";
    if (device === 'mobil' && (typeof window.SAS_KEYWORDS === 'undefined' || window.SAS_KEYWORDS !== 'noads')) {
        add_sas_mones([{
            selector: 'body',
            desktop: null,
            mobile: 'mobilerectangle-1',
            position: 'afterbegin',
            lazy: null
        }]);
    }

    if (!skipInterstitial && device === 'mobil' && (typeof window.SAS_KEYWORDS === 'undefined' || window.SAS_KEYWORDS !== 'noads')) {
        add_sas_mones([{
            selector: 'body',
            desktop: null,
            mobile: 'mobileinterstitial',
            position: 'beforeend',
            lazy: null
        }]);
    }

    if (!skipInterstitial && device === 'desktop' && (typeof window.SAS_KEYWORDS === 'undefined' || window.SAS_KEYWORDS !== 'noads')) {
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
Zcela logická shoda source vs build verze: NE (vědomě rozšířeno)
Rozdíly v logice:
- Přidán reset helperu reloadResetCentering(posElement) před aplikací
    interscroller stylů. Důvod: po reloadu může být na .sas_mone aktivní
    flex centrování pro non-interscroller kreativu; při návratu skutečného
    interscrolleru je potřeba tento stav nejdřív odstranit.
Komentář agenta:
Tento blok zajišťuje správu a pozorování interscroller reklamních pozic pomocí ResizeObserveru. Blok byl rozšířen o bezpečný reset reload centrování, aby se po střídání interscroller/non-interscroller kreativ nerozbíjelo layout chování. Základní interscroller logika zůstává stejná jako v buildu.
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
                // Reset centering pokud bylo nastaveno pro předchozí non-interscroller kreativu
                reloadResetCentering(posElement);
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
    const breakpoint = DEVICE_BREAKPOINT;
    const device = (document.documentElement.clientWidth || window.innerWidth) < breakpoint ? "mobil" : "desktop";
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
Zcela logická shoda source vs build verze: NE (vědomě rozšířeno)
Rozdíly v logice:
- Po cpexPackage.headerbidding.reRender() doplněno volání
    reloadCenterNonInterscroller(area) vedle reloadReleaseHeight(area).
    Důvod: po reloadu může v .sas_mone zůstat vh výška z předchozího
    interscrolleru, ale nová HB kreativa už může být standardní banner bez
    interscroller wrapperu; centrování zlepší vzhled a omezí vizuální skok.
Komentář agenta:
Funkce slouží k opětovnému vykreslení reklamní pozice přes CPEX header bidding. Blok byl rozšířen o post-render stabilizaci layoutu pro případy, kdy se po interscrolleru doručí non-interscroller kreativa. Základní HB render logika zůstává stejná jako v buildu.
Import pouze konkrétního bloku:
import { cpex_header_bidding_render } from '../../asset/cpex_header_bidding_render';
---------------------------------------------
*/
function cpex_header_bidding_render(params) {
    // Mapování: SAS callback dá {area} → wrapper najde DOM element a předá cpexPackage.
    // cpexPackage interně volá formats.match(elementId, adUnit, w, h, bidderCode)
    // a rozhodne, zda jde o custom formát (interscroller, slideup, skin...) nebo regular banner.
    //
    // Příklady reálných volání na echo24:
    //   area='mobilerectangle-2' → element.id='ad-mobilerectangle-2' → reRender('ad-mobilerectangle-2', 'mobilerectangle-2')
    //     → interscroller match přes adUnits ['mobilerectangle-2'] + size
    //   area='mobilerectangle-5' → element.id='ad-mobilerectangle-5' → reRender('ad-mobilerectangle-5', 'mobilerectangle-5')
    //     → interscroller match přes elementIds ['ad-mobilerectangle-5'] (adUnits nemá -5)
    //   area='mobilerectangle-1' → element.id='sas_738291456' → reRender('sas_738291456', 'mobilerectangle-1')
    //     → slideup match přes adUnits ['mobilerectangle-1'] (elementIds prázdné, OR logika)
    //   area='leaderboard-1' → element.id='ad-leaderboard-1' → reRender('ad-leaderboard-1', 'leaderboard-1')
    //     → skin match čistě dle rozměrů (2000×1400 atd.), nezávisí na pozici
    const { area } = params;
    try {        
        const element = document.querySelector(`.sas_mone[data-d-area=${area}]`) || document.querySelector(`.sas_mone[data-m-area=${area}]`);
        if (element) {
            // Stav PŘED reRender — co cpexPackage ví o této pozici
            var _hbBid = (typeof pbjs !== 'undefined' && pbjs.winningBidsSas) ? pbjs.winningBidsSas[area] : null;
            var _cpexReady = (typeof top.cpexPackage !== 'undefined' && typeof top.cpexPackage.headerbidding !== 'undefined');
            _weuronDebug && console.log('%c[Weuron]%c [blok_0017] [HB render] area=' + area +
                ' elementId=' + element.id +
                ' | cpexPackage.headerbidding: ' + (_cpexReady ? 'OK' : 'CHYBÍ') +
                ' | winningBidsSas[' + area + ']: ' + (_hbBid
                    ? 'bid=' + _hbBid.bid + ' bidder=' + _hbBid.bidderCode + ' ' + _hbBid.width + 'x' + _hbBid.height + ' tier=' + _hbBid.bidTier
                    : '(ŽÁDNÝ — pravděpodobný no-fill)'),
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');

            top.cpexPackage.headerbidding.reRender(element.id, area);

            // Uvolnit height reservation (CLS prevence) — HB kreativa vykreslena
            reloadReleaseHeight(area);
            // Centering pro případ non-interscroller kreativy v vh kontejneru
            reloadCenterNonInterscroller(area, {
                width: _hbBid && _hbBid.width,
                height: _hbBid && _hbBid.height,
                source: 'hb'
            });

            // Stav PO reRender — ověření, zda se něco vykreslilo (s krátkým zpožděním)
            setTimeout(function() {
                var el = document.getElementById(element.id);
                if (!el) return;
                var hasContent = el.querySelector('iframe') || el.querySelector('[class*="cpex-"]') || el.querySelector('img');
                var computedHeight = el.style.height || '';
                if (!hasContent && computedHeight) {
                    _weuronDebug && console.warn('%c[Weuron]%c [blok_0017] [HB no-fill] area=' + area +
                        ' elementId=' + element.id +
                        ' | reRender proběhl, ale pozice je PRÁZDNÁ (height=' + computedHeight + ')' +
                        ' | winningBidsSas: ' + JSON.stringify(_hbBid) +
                        ' → EVIDENCE: SAS doručil HB šablonu (sas_creative_render), ale cpexPackage.headerbidding.reRender() nevykreslil kreativu.',
                        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
                }
            }, 1000);
        } else {
            _weuronDebug && console.warn('%c[Weuron]%c [blok_0017] [HB render] area=' + area +
                ' | DOM element NENALEZEN (.sas_mone s data-d-area nebo data-m-area)',
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
        }
    } catch (e) {
        _weuronDebug && console.error('%c[Weuron]%c [blok_0017] [HB render ERROR] area=' + area + ' | ' + e.message,
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');
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
Zcela logická shoda source vs build verze: NE (vědomě rozšířeno)
Rozdíly v logice:
- Po top.cpexPackage.render() doplněno volání reloadCenterNonInterscroller(adUnit)
    vedle reloadReleaseHeight(adUnit).
    Důvod: stejný jako u HB cesty — po předchozím interscrolleru může na
    kontejneru zůstat vh výška, zatímco nová S2S kreativa je běžný banner bez
    interscroller wrapperu; centrování drží přijatelný vzhled a menší poskakování.
Komentář agenta:
Funkce slouží k vykreslení S2S creative přes CPEX. Blok byl rozšířen o post-render stabilizaci layoutu pro případy, kdy se po interscrolleru doručí non-interscroller kreativa. Základní S2S render logika zůstává stejná jako v buildu.
Import pouze konkrétního bloku:
import { cpex_s2s_render } from '../../asset/cpex_s2s_redner';
---------------------------------------------
*/
function cpex_s2s_render(params) {
    // Mapování: SAS S2S callback dá {posId, response, width, height, ...} → wrapper zjistí adUnit
    // z data-d-area/data-m-area atributu a zavolá cpexPackage.render().
    // cpexPackage interně volá formats.match(elementId, adUnit, w, h)
    // a rozhodne, zda jde o custom formát nebo regular banner (iframe).
    //
    // Příklady reálných volání na echo24:
    //   posId='ad-mobilerectangle-2', w=720, h=1280 → render('ad-mobilerectangle-2', 'mobilerectangle-2', creative, 720, 1280)
    //     → interscroller: size ✓ AND adUnits.includes('mobilerectangle-2') ✓
    //   posId='ad-mobilerectangle-5', w=720, h=1280 → render('ad-mobilerectangle-5', 'mobilerectangle-5', creative, 720, 1280)
    //     → interscroller: size ✓ AND elementIds.includes('ad-mobilerectangle-5') ✓ (adUnits nemá -5)
    //   posId='sas_738291456' (mobilerectangle-1), w=300, h=250 → render('sas_738291456', 'mobilerectangle-1', creative, 300, 250)
    //     → slideup: adUnits.includes('mobilerectangle-1') ✓ (elementIds prázdné, OR logika)
    //   posId='ad-leaderboard-1', w=2000, h=1400 → render('ad-leaderboard-1', 'leaderboard-1', creative, 2000, 1400)
    //     → skin: čistě dle rozměrů, nezávisí na pozici
    //
    // Viz CPEX_setings/Jak věci fungují.txt pro kompletní detekční logiku.
    const { site, posId, response, width, height, advertiser } = params;
    const elementId = posId;
    const adUnit = (document.documentElement.clientWidth || window.innerWidth) >= DEVICE_BREAKPOINT ? document.querySelector(`#${posId}`).dataset.dArea : document.querySelector(`#${posId}`).dataset.mArea;
    const creative = response;

    // Log S2S render — co SAS vrátil pro HB výhru
    var _hbBid = (typeof pbjs !== 'undefined' && pbjs.winningBidsSas) ? pbjs.winningBidsSas[adUnit] : null;
    _weuronDebug && console.log('%c[Weuron]%c [blok_0019] [S2S render] area=' + adUnit + ' posId=' + posId + ' ' + width + 'x' + height +
        ' advertiser=' + (advertiser || '(neuvedeno)') +
        ' | HB bid: ' + (_hbBid
            ? _hbBid.bid + ' ' + _hbBid.bidderCode + ' tier=' + _hbBid.bidTier + (_hbBid.bidDealId ? ' deal=' + _hbBid.bidDealId : '')
            : '(nenalezen v winningBidsSas)') +
        ' | SAS direct cena: (neznámá — srovnání proběhlo na SAS serveru)',
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '');

    try {
        top.cpexPackage.render(elementId, adUnit, creative, width, height);
    } catch (e) {
        // cpex s2s render error — tiché selhání
    }

    // Kontrola privilegovaného zdroje po S2S renderu — R2B2 nebo Performax
    // mohl přijít přes SAS šablonu i v reload ticku (ne jen při prvním načtení).
    // observeRealRenders() detekuje render přes childList MutationObserver,
    // ale cpexPackage.render() píše do iframu (subtree) → MO ho nezachytí.
    // Proto voláme identifyCreativeSource() přímo zde.
    // Efekt při detekci: RELOAD_POSITIONS[adUnit]=0 + _privilegedSources uložen
    // + #cpex-slideup odstraněn → náš reload se trvale zastaví pro tuto pozici.
    (function() {
        var _el = document.getElementById(elementId);
        if (_el) {
            // Dvojitá kontrola privilegovaného zdroje:
            // 1) Po 1000ms — R2B2 inline script se většinou spustí rychle;
            //    při brzké detekci odstraní #cpex-slideup co nejdřív
            //    a minimalizuje dobu kdy jsou na webu vidět dva overlaye najednou.
            // 2) Po 3000ms — safety net pro pomalé sítě / pomalý R2B2 response;
            //    identifyCreativeSource() má uvnitř vlastní 500ms delay,
            //    celkem tedy ~3500ms od cpexPackage.render() před finální detekcí.
            // Obě volání jsou idempotentní — druhé volání po úspěšné první
            // detekci je no-op (RELOAD_POSITIONS[area] už je 0).
            setTimeout(function() { identifyCreativeSource(adUnit, _el); }, 1000);
            setTimeout(function() { identifyCreativeSource(adUnit, _el); }, 3000);
        }
    })();

    // Uvolnit height reservation (CLS prevence) — S2S kreativa vykreslena
    reloadReleaseHeight(adUnit);
    // Centering pro případ non-interscroller kreativy v vh kontejneru
    reloadCenterNonInterscroller(adUnit, {
        width: width,
        height: height,
        source: 's2s'
    });
}





// blok_0019a (shared helpers + CSS) ODSTRANĚN.
// Všechny helpery osiřely po smazání fallback rendererů (spare_0012).
// cpexPackage má vlastní rendering, .sas__label CSS není referencováno.
// Archivován v Nepotrebne_bloky_v_echo24.js jako spare_0013.

// blok_0019b-0019h (fallback renderers) ODSTRANĚNY.
// Rendering HB+S2S kreativ nyní řeší cpexPackage (cpex_header_bidding_render, cpex_s2s_render).
// Archivovány v Nepotrebne_bloky_v_echo24.js jako spare_0012.
// Odstraněno: pickTargetEl, pickAdSize, creative_banner, creative_branding,
//   creative_popup, creative_interscroller, creative_desktop_strip,
//   render_s2s_and_header_bidding_creatives

// blok_0020 (global_header_bidding_render, global_s2s_render) ODSTRANĚN.
// Byly to triviální wrappery — inlinováno přímo do window.sas_creative_render
// a window.sas_s2s_creative_render. Archivováno jako spare_0016.

/*
---------------------------------------------
Blok: blok_0021a
Název: render_mone_global
Cesta: src/asset/render_ad_mone_global.js
Použití v buildu: ANO (používáno v renderAdMone — galerie, halfpagead-2)
Závislosti: ANO (vyžaduje renderCore, window.pbjs)
Komentář agenta:
Obnoveno 11.04.2026 — parametry antiadblock + SEZNAM_FORMATS vráceny
pro paritu s produkčním buildem (sas/echo24/dev/echo24_config.js).
HB refresh větve zůstávají odstraněny (cpexPackage řeší HB refresh interně).
antiadblock ovlivňuje preferNew flag v renderCore (pořadí SAS vs Seznam).
SEZNAM_FORMATS na echo24 je vždy {}, ale na jiných webech (cool ap.) může být plný.
---------------------------------------------
*/

function render_mone_global(area, elementId, _antiadblock) {
    _weuronDebug && console.log('%c[Weuron]%c %c[blok_0021a]%c render_mone_global("' + area + '", "' + elementId + '", _antiadblock=' + _antiadblock + ') → preferNew=' + (_antiadblock === true),
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
        'background:#2196F3;color:#fff;border-radius:3px;padding:1px 4px;', '');
    var SEZNAM_FORMATS = {};
    const BREAKPOINT = DEVICE_BREAKPOINT;
    const device = (document.documentElement.clientWidth || window.innerWidth) < BREAKPOINT ? "mobile" : "desktop";

    if (area === "gallerymobilerectangle-1") return;

    // Clear winning bids before fresh SAS render
    if (window.pbjs && typeof window.pbjs === "object") {
        pbjs.winningBidsSas = {};
    }

    // antiadblock=true → preferNew=true (nejdřív Seznam, pak SAS)
    // antiadblock=false → preferNew=false (nejdřív SAS, pak Seznam)
    renderCore(area, elementId, SEZNAM_FORMATS, device, _antiadblock === true);
}


// blok_0021b (galleryState) + blok_0021g (renderViaSeznamFormats) ODSTRANĚNY.
// S CPEX bridge je SEZNAM_FORMATS vždy {} → renderViaSeznamFormats vždy vracela false.
// galleryState byl používán pouze v renderViaSeznamFormats.
// Archivovány v Nepotrebne_bloky_v_echo24.js jako spare_0015.

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
Blok: blok_0021h
Název: renderCore
Cesta: src/asset/render_ad_mone_global.js
Použití v buildu: ANO (hlavní render logika pro wrapper)
Závislosti: resolveArea, mountWrapper, renderViaSas
Komentář agenta: Obnoveno 11.04.2026 — parametry SEZNAM_FORMATS + preferNew
  vráceny pro paritu s produkčním buildem.
  renderViaSeznamFormats odstraněna (SEZNAM_FORMATS = {} → vždy false),
  ale renderViaSas se volá vždy. Logika preferNew zachována pro budoucí
  weby kde SEZNAM_FORMATS nebude prázdný.
---------------------------------------------
*/
function renderCore(areaRaw, elementId, SEZNAM_FORMATS, device, preferNew) {
  const area = resolveArea(areaRaw, device);
  const { element, adId } = mountWrapper(elementId, area, device);
  if (!element || !adId) return;

  // renderViaSeznamFormats odstraněna (na echo24 SEZNAM_FORMATS = {} → vždy false).
  // Pro budoucí weby (cool ap.) kde by SEZNAM_FORMATS nebyl prázdný,
  // zde bude potřeba obnovit renderViaSeznamFormats a preferNew logiku:
  //   if (preferNew) {
  //     if (renderViaSeznamFormats(area, adId, SEZNAM_FORMATS, device)) return;
  //     if (renderViaSas(area, adId)) return;
  //   } else {
  //     if (renderViaSas(area, adId)) return;
  //     if (renderViaSeznamFormats(area, adId, SEZNAM_FORMATS, device)) return;
  //   }
  renderViaSas(area, adId);
}

/*
---------------------------------------------
Blok: blok_0022
Název: antiadblock detekce (cookie _adb.key)
Cesta: src/echo24/prod/echo24_config.js (řádek 23)
Použití v buildu: ANO (globální proměnná, předávána do render_mone_global
  a čtena v init_iprima_ads pro early return)
Závislosti: ANO (cookie — blok_0007)
Komentář agenta:
Detekce cookie _adb.key nastavené službou Performax (LetThereBeAds.io).
V produkci: const antiadblock = cookie.get("_adb.key") !== null ? true : false;
Proměnná se používá na dvou místech:
  1. init_iprima_ads (blok_0023e_aab) — early return, Performax přebírá delivery
  2. renderAdMone → render_mone_global — ovlivňuje preferNew (pořadí SAS vs Seznam)
Viz README.md sekce "AntiAdblock" (řádky 549–556)
---------------------------------------------
*/
const _adb_raw = cookie.get("_adb.key");
const antiadblock = _adb_raw !== null ? true : false;
_weuronDebug && console.log('%c[Weuron]%c %c[blok_0022]%c _adb.key cookie: raw=' + JSON.stringify(_adb_raw) + ' → antiadblock=' + antiadblock,
    'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
    'background:#9C27B0;color:#fff;border-radius:3px;padding:1px 4px;', '');

/*
---------------------------------------------
Blok: blok_0022b
Název: window.sas_creative_render (SAS HB renderer)
Cesta: src/echo24/prod/echo24_config.js
Použití v buildu: ANO (voláno v SAS Partner u Header bidding SSP)
Závislosti: ANO (cpex_header_bidding_render)
Komentář agenta: Zjednodušeno 31.03.2026 — přímé volání cpex funkce
  (blok_0020 dispatchers inlinovány).
---------------------------------------------
*/
window.sas_creative_render = function (area) {
    // SAS šablony volají buď sas_creative_render('leaderboard-1') [string]
    // nebo sas_creative_render({area:'leaderboard-1',...}) [objekt — starší API kontrakt].
    var _area = (area && typeof area === 'object') ? area.area : area;
    cpex_header_bidding_render({ area: _area });
};

/*
---------------------------------------------
Blok: blok_0023a
Název: window.sas_s2s_creative_render (SAS S2S renderer)
Cesta: src/echo24/prod/echo24_config.js
Použití v buildu: ANO (voláno v sas.js při detekci json odpovědi)
Závislosti: ANO (cpex_s2s_render)
Komentář agenta: Zjednodušeno 31.03.2026 — přímé volání cpex funkce.
---------------------------------------------
*/
/**
 * Rendrovaci funkce pro s2s SAS integraci - Magnite, Pubmatic
 * Funkce jsou volane v sas.js pri detekci json odpovedi
 * sas.js - sas_core.js - fce renderResponseIframe - sas/assets/sas_s2s_creative_render.js
 * site, posId, response, width: W, height: H, advertiser: adv
 */
window.sas_s2s_creative_render = function (params) {
    cpex_s2s_render(params);
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
Zcela logická shoda source vs build verze: NE (vědomě rozšířeno)
Rozdíly v logice:
- Po render_mone_global přidán podmíněný call reloadCenterNonInterscroller(area)
    pro interscroller-kandidátní pozice (mobilerectangle*).
    Důvod: při legacy fallback reloadu z blok_0006 (mode=hard/selective)
    může po předchozím interscrolleru zůstat vh výška; non-interscroller
    kreativa se pak vycentruje a obsah méně "poskakuje".
Komentář agenta:
Globální funkce pro dynamické vložení reklamní pozice v galerii.
Zjednodušeno — render_mone_global nyní přijímá jen (area, elementId).
hbAdUnit parametr zachován v signatuře pro zpětnou kompatibilitu
(galerie může volat s 3 argumenty), ale ignorován.
Navíc byl blok rozšířen o post-render stabilizaci layoutu pro případy,
kdy se po interscrolleru doručí standardní banner bez interscroller wrapperu.
---------------------------------------------
*/
/**
 * volani v galerii pri listovani mezi fotkami, dodatecne vlozeni pozice - halfpagead-2
 */
window.renderAdMone = function (area, elementId, hbAdUnit = null) {
    _weuronDebug && console.log('%c[Weuron]%c %c[blok_0023d]%c renderAdMone("' + area + '", "' + elementId + '") passing antiadblock=' + antiadblock,
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
        'background:#FF9800;color:#fff;border-radius:3px;padding:1px 4px;', '');
    render_mone_global(area, elementId, antiadblock);
    if (canAreaUseInterscroller(area)) {
        // Fallback z blok_0006 (mode=hard/selective) jde přes renderAdMone.
        // Detekce uvnitř helperu zajistí, že centering se aplikuje jen tam,
        // kde zůstane vh výška po předchozím interscrolleru.
        reloadCenterNonInterscroller(area);
    }
};

/*
---------------------------------------------
Blok: blok_0023e
Název: init_iprima_ads (hlavní inicializace reklamního systému)
Cesta: src/echo24/prod/echo24_config.js
Řádky: 69-227
Použití v buildu: ANO (hlavní inicializační funkce pro reklamy)
Závislosti: ANO (gdpr, load_script, init_cpex_header_bidding, call_adserver, add_nonstandard_mone, render_mone_global, SAS_KEYWORDS, SAS_SECTION, sas_lib, R2B2_HB_SCRIPT [volitelný — blok_source_0002], CPEX_* [blok_0000], cookie [blok_0007 — pro antiadblock detekci], detectSeznamTraffic [volitelný — blok_source_0003], applySeznamAdserverContext [volitelný — blok_source_0003], applySasAreaRestrictions [volitelný — blok_source_0003])
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

    // [CUSTOM_RESOURCES wire-up — blok_0000d]
    // Dispatch eventu 'weuron:consent-ready' v okamžiku, kdy gdpr()
    // callback obdržel CMP consent. Záznamy CUSTOM_RESOURCES s
    // when:'after-cmp-consent' se aktivují právě teď.
    try { window.dispatchEvent(new CustomEvent('weuron:consent-ready', { detail: { consent: _consent } })); } catch (_e) { /* ignore */ }

    /*
    ---------------------------------------------
    Blok: blok_0023e_aab
    Název: antiadblock detekce (Performax / LetThereBeAds.io)
    Cesta: src/echo24/prod/echo24_config.js (řádek 23)
    Použití v buildu: ANO (produkční echo24_config.js čte cookie _adb.key)
    Závislosti: ANO (cookie — blok_0007)
    Komentář agenta:
    Na iPrima webech běží služba Performax (LetThereBeAds.io), která detekuje
    aktivní adblock u uživatele. Performax knihovnu na web vkládá provozovatel
    webu (CMS šablona) — NE náš script. Knihovna je nezávislá na sas_config.

    Jak to funguje:
    1. Performax knihovna detekuje adblock → nastaví cookie _adb.key
    2. Performax přebírá kompletní ad delivery (maskované URL, vlastní SSP —
       Pubmatic PBS, vlastní wrappery px2_*, vlastní reloading ~60s)
    3. Náš script detekuje cookie _adb.key → USTOUPÍ (return)
       aby nedocházelo k duplicitním reklamám a konfliktu dvou ad systémů

    V produkci echo24_config.js:
      const antiadblock = cookie.get("_adb.key") !== null ? true : false;
      if (antiadblock === false) { return; } //normální flow
      // antiadblock === true → funkce skončí bez volání SAS/HB

    Kontakt Performax: Martin Michale <martin.michale@performax.cz>
    Viz README.md sekce "AntiAdblock" (řádky 549–556)
    ---------------------------------------------
    */
    // antiadblock se čte z blok_0022 (IIFE scope)
    _weuronDebug && console.log('%c[Weuron]%c %c[blok_0023e_aab]%c antiadblock check: antiadblock=' + antiadblock + ' (type=' + typeof antiadblock + ')',
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
        'background:#FF5722;color:#fff;border-radius:3px;padding:1px 4px;', '');
    if (antiadblock) {
        _weuronDebug && console.log('%c[Weuron]%c %c[blok_0023e_aab]%c ⛔ Antiadblock detekován (cookie _adb.key) → ad delivery přebírá Performax, náš script se neaktivuje.',
            'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
            'background:#FF5722;color:#fff;border-radius:3px;padding:1px 4px;', '');
        return;
    }
    _weuronDebug && console.log('%c[Weuron]%c %c[blok_0023e_aab]%c ✅ Žádný antiadblock → pokračuji s CPEX/HB inicializací',
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
        'background:#4CAF50;color:#fff;border-radius:3px;padding:1px 4px;', '');

    /*
     * runtimeConfig – konfigurace CPEX bridge a načítání balíčků.
     * Hodnoty se čtou z blok_0000 (CPEX_* proměnné).
     * Pro debug/stage stačí změnit příslušné CPEX_* proměnné v blok_0000.
     */
    const runtimeConfig = {
        enableCpexBridge: CPEX_ENABLED,
        cpexDebug: CPEX_DEBUG,
        packageStage: CPEX_PACKAGE_STAGE,
        publisherSettingsStage: CPEX_PUBLISHER_STAGE,
        websiteSettingsStage: CPEX_WEBSITE_STAGE,
    };

    // Seznam traffic detekce (blok_source_0003 — volitelný modul)
    // Bez modulu: detectSeznamTraffic neexistuje → seznamTraffic zůstane false.
    var seznamTraffic = false;
    if (typeof detectSeznamTraffic === 'function') {
        seznamTraffic = await detectSeznamTraffic();
    }
    _weuronDebug && console.log('%c[Weuron]%c [blok_0023e] %c[seznam_traffic]%c výsledek: seznamTraffic=' + seznamTraffic + ' → promoSeznam cookie: ' + (document.cookie.indexOf('promoSeznam') !== -1 ? 'NASTAVENA (seznam traffic)' : 'NENÍ (normální traffic)'),
        'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
        seznamTraffic ? 'background:#FF5722;color:#fff;border-radius:3px;padding:1px 4px;' : 'background:#607D8B;color:#fff;border-radius:3px;padding:1px 4px;', '');

    overwrite_sas_mone();
    /**
     * fix odstraneni containeru pro mobilni rozliseni
     */
    fix_mobile_skyscrapper();
    /**
     * CPEX Header Bidding inicializace
     * URL se sestavují z CPEX_* proměnných (blok_0000).
     */
    if (runtimeConfig.enableCpexBridge) {
        // Sestavení CPEX URL z blok_0000 proměnných
        var _cpexPubEnv = runtimeConfig.publisherSettingsStage ? 'stage' : 'production';
        var _cpexWebEnv = runtimeConfig.websiteSettingsStage ? 'stage' : 'production';
        var cpex_publisher = 'https://cdn.cpex.cz/settings/' + _cpexPubEnv + '/' + CPEX_PUBLISHER_ID + '.js';
        var cpex_site      = 'https://cdn.cpex.cz/settings/' + _cpexWebEnv + '/' + CPEX_PUBLISHER_ID + '/' + CPEX_SITE_ID + '.js';
        // CPEX_PACKAGE_PATH segment je volitelný: prázdná hodnota ('' / false)
        // → produkční balíček v kořeni (cdn.cpex.cz/package/cpex-package.min.js,
        //   produkční CDN od 11. 6. 2026 dle Davida). Neprázdná hodnota
        //   ('refactoring' / 'prima2') vloží /{PATH}/ segment (stage/branch verze).
        var _cpexPkgSeg    = (typeof CPEX_PACKAGE_PATH === 'string' && CPEX_PACKAGE_PATH) ? CPEX_PACKAGE_PATH + '/' : '';
        var cpex_package   = 'https://cdn.cpex.cz/' + (runtimeConfig.packageStage ? 'stage/' : '') + 'package/' + _cpexPkgSeg + 'cpex-package' + (runtimeConfig.cpexDebug ? '.js' : '.min.js');

        // Seznam traffic: CPEX Package filtruje adUnits na základě cookie
        // promoSeznam (cookieIs / cookieIsNot v settings CSV).
        // Cookie se nastavuje v detectSeznamTraffic() → setSeznamCookie().
        // Odpadá potřeba dvou různých settings URL — stačí jeden config.

        // Override cpex_package URL — pouze pro manuální testování konkrétní verze:
        if (typeof CPEX_TEST_PACKAGE === 'string' && CPEX_TEST_PACKAGE) {
            cpex_package = CPEX_TEST_PACKAGE;
            _weuronDebug && console.log('%c[Weuron]%c %c[blok_0023e]%c TEST package override: ' + cpex_package,
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                'background:#E91E63;color:#fff;border-radius:3px;padding:1px 4px;', '');
        }

        // Override cpex_site URL — pouze pro manuální testování:
        if (typeof CPEX_TEST_CONFIG === 'string' && CPEX_TEST_CONFIG) {
            cpex_site = CPEX_TEST_CONFIG;
            _weuronDebug && console.log('%c[Weuron]%c %c[blok_0023e]%c TEST config override: ' + cpex_site,
                'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '',
                'background:#E91E63;color:#fff;border-radius:3px;padding:1px 4px;', '');
        }

        init_cpex_header_bidding(
            _consent,
            call_adserver,
            (typeof R2B2_HB_SCRIPT !== 'undefined') ? R2B2_HB_SCRIPT : '',
            cpex_publisher,
            cpex_site,
            cpex_package
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
    // blok_0023f (build_seznam_adserver_context) INLINOVÁN.
    // S enableCpexBridge=true je seznam_traffic vždy false → funkce jen vracela { section: baseSection }.
    // Section se nyní počítá přímo v call_adserver.

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
        // FAIL-SAFE (na žádost — 2026-06-20): SAS_SITE je odvozen z WEURON_DOMAIN přes
        // SAS_SITE_BY_DOMAIN (blok_0000). Pokud doména v mapě CHYBÍ, SAS_SITE je prázdný.
        // To je VÁŽNÝ konfigurační stav — bez správné SAS „site" by SAS vybral cizí/výchozí
        // per-web sadu rozměrů. Proto SAS volání NESPOUŠTÍME a vypíšeme hlasité varování.
        // ŽÁDNÝ tichý fallback na 'IMM_Echo24' — to by maskovalo chybu konfigurace.
        if (typeof SAS_SITE === 'undefined' || !SAS_SITE) {
            console.error(
                '%c[Weuron] KONFIGURAČNÍ CHYBA%c SAS_SITE je prázdný — doména „' +
                (typeof WEURON_DOMAIN !== 'undefined' ? WEURON_DOMAIN : '(WEURON_DOMAIN undefined)') +
                '" není v mapě SAS_SITE_BY_DOMAIN (blok_0000). SAS reklamy se NESPUSTÍ. ' +
                'Doplňte řádek „doména → SAS site" do SAS_SITE_BY_DOMAIN.',
                'background:#B00020;color:#fff;font-weight:bold;border-radius:3px;padding:2px 6px;',
                'color:#B00020;font-weight:bold;');
            return;
        }
        const site = SAS_SITE;
        const breakpoint = DEVICE_BREAKPOINT;
        const device = document.documentElement.clientWidth < breakpoint ? "mobil" : "desktop";
        var keywords = (typeof SAS_KEYWORDS !== 'undefined') ? SAS_KEYWORDS : '';

        // Výpočet branding parametru (blok_0000f) — musí proběhnout PŘED loadmone.
        // BRANDING_MIN_WIDTH = 1380: branding=false pod 1380px (tablet/mobile),
        // branding=true od 1380px (plný desktop). 0 = vždy true (legacy chování).
        const branding = resolveBranding();

        // Width-podmíněné přepsání atributů pozic (blok_0000f) — musí proběhnout
        // PŘED applyHidePositionsByWidth i PŘED sas.loadmone.
        // REWRITE_POSITIONS_BY_WIDTH: prázdná mapa {} = no-op (výchozí).
        // Oba směry: data-d-area→data-m-area (DEVICE_BREAKPOINT vysoko)
        //        i   data-m-area→data-d-area (DEVICE_BREAKPOINT nízko).
        applyRewritePositionsByWidth();

        // Width-podmíněné odebrání pozic z DOM (blok_0000f) — musí proběhnout
        // PŘED add_nonstandard_mone i PŘED sas.loadmone.
        // HIDE_POSITIONS_BY_WIDTH: prázdná mapa {} = no-op (výchozí).
        // Pro CNN-like chování: { 'leaderboard-1': { minWidth: 768, maxWidth: 1079 }, ... }
        applyHidePositionsByWidth();

        // Weuron indikátor pro SAS — umožňuje Janě v SASu rozlišit
        // naše nové řešení (cleaned.js per overrides) od produkčního
        // (echo24_config.js). Jana nastaví nové insertions s keyword
        // targeting na "weuron" pro šablony 284_weuron/164_weuron.
        // Přechod do produkce = přidat tento keyword do produkčního skriptu.
        keywords = keywords ? (keywords + ',weuron') : 'weuron';

        // URL parametry z whitelistu SAS_URL_KEYWORD_PARAMS (blok_0000) jako standalone keywords.
        // Whitelist zajišťuje, že do SAS putují jen params s přímou SAS targeting sémantikou.
        try {
            var _urlSearchParams = new URLSearchParams(window.location.search);
            SAS_URL_KEYWORD_PARAMS.forEach(function(param) {
                if (_urlSearchParams.has(param)) {
                    keywords = keywords + ',' + param;
                }
            });
        } catch (_e) { /* URLSearchParams not supported — přeskočit */ }

        add_nonstandard_mone(adserverContext.skipInterstitial);

        // Vyloučit lazyload pozice z počátečního SAS loadmone
        // skipLazyload=true (seznam traffic) → přeskočit, vše se renderuje okamžitě
        if (!adserverContext.skipLazyload) {
            lazyloadExcludeFromLoad();
        }

        var _sasParams = {
            "site": site,
            "device": device,
            "section": adserverContext.section,
            "keyword": keywords,
            "branding": branding,
            "bgWidth": breakpoint,
            "cookie": _consent.enableCookies,
            "tcstring": _consent.tcString,
        };
        // SIZE_RESTRICTIONS_BY_WIDTH (blok_0000): sas.setareas() PŘED loadmone — přímé SAS kampaně.
        // Nastaví priority override v area_size_mapping → SAS nepošle request na oversized formáty.
        applySizeRestrictionsByWidth('sas', document.documentElement.clientWidth || window.innerWidth);
        _weuronDebug && console.log('%c[Weuron]%c [blok_0023g] [SAS loadmone]', 'background:#007281;color:#fff;border-radius:3px;padding:1px 4px;', '', _sasParams);
        sas.loadmone(_sasParams);

        // [CUSTOM_RESOURCES wire-up — blok_0000d]
        // Dispatch eventu 'weuron:first-render' po prvním sas.loadmone().
        // Záznamy CUSTOM_RESOURCES s when:'after-first-render' se aktivují.
        // Idempotence — _weuronFirstRenderDispatched chrání před dvojitým dispatchem
        // (call_adserver se sice volá jednou, ale defenzivně).
        if (!window._weuronFirstRenderDispatched) {
            window._weuronFirstRenderDispatched = true;
            try { window.dispatchEvent(new CustomEvent('weuron:first-render', { detail: { sasParams: _sasParams } })); } catch (_e) { /* ignore */ }
        }

        sas.emptyAds = function (id, area) {
            document.querySelector(`#${id}`).parentElement.style.display = 'none';
            // Pozice je prázdná (SAS neměl ani šablonu) → označit pro preventivní reload
            if (area && RELOAD_POSITIONS[area] !== undefined && !reloadState.emptyPositions.has(area)) {
                reloadState.emptyPositions.add(area);
                logSetChange(_RELOAD_CHECK_PREFIX + '[emptyPositions]', Array.from(reloadState.emptyPositions));
            }
        };

        // Inicializovat lazyload observery po SAS loadmone
        // skipLazyload=true (seznam traffic) → přeskočit, vše se renderuje okamžitě
        if (!adserverContext.skipLazyload) {
            lazyloadInit();
        }

        // Detekce reálného vykreslení — MutationObserver na všech .sas_mone
        observeRealRenders();

        // Spustit reload cyklus po prvním renderování
        startReloadCycle();
    }

    function call_adserver(_consent) {
        const breakpoint = DEVICE_BREAKPOINT;

        // Seznam traffic kontext (blok_source_0003 — volitelný modul)
        // Bez modulu: applySeznamAdserverContext neexistuje → výchozí hodnoty.
        var seznamCtx;
        if (seznamTraffic && typeof applySeznamAdserverContext === 'function') {
            seznamCtx = applySeznamAdserverContext(seznamTraffic, breakpoint);
        } else {
            let section = (document.documentElement.clientWidth || window.innerWidth) < breakpoint ? "mobile" : "desktop";
            // SAS_SECTION záměrně ignorováno — viz komentář DEVICE_BREAKPOINT
            seznamCtx = {
                seznamTraffic: false,
                section: section,
                skipInterstitial: false,
                skipLazyload: false,
                restrictedAreas: null,
            };
        }

        // Aplikovat omezení SAS oblastí pro seznam traffic
        if (seznamCtx.restrictedAreas && typeof applySasAreaRestrictions === 'function') {
            applySasAreaRestrictions(seznamCtx);
        }

        // Cross-portfolio link policy (Seznam multi-domain) — řízeno
        // proměnnou SEZNAM_TRAFFIC_CROS_WEB_PORTFOLIO_BEHAVIOR (blok_0000):
        //   'rewrite' → přepíše href cross-portfolio linků na partnerské
        //                domény (utm_source/medium/campaign + szn-session)
        //   'remove'  → neutralizuje a skryje cross-portfolio linky
        //   'none'    → no-op (default; pro echo24 OK, nemá cross linky)
        // Funkce navíc na CÍLOVÉ doméně (URL s utm_medium=seznam_distribuce)
        // zavolá sssp.setSessionCookie(utm_campaign) — preventivně dle
        // dokumentace.txt sekce „Máte obsah na více doménách?".
        if (seznamCtx.seznamTraffic && typeof applySeznamCrossPortfolioPolicy === 'function') {
            applySeznamCrossPortfolioPolicy(seznamCtx.seznamTraffic);
        }

        call_sas_adserver(_consent, seznamCtx);
    }
};



// Spuštění init flow podle WEB_MODE:
//   - 'classic' → gdpr(init_iprima_ads) hned (původní chování)
//   - 'spa'     → čekat na 'AdRequest' event od SPA hostitele
if (WEB_MODE === 'spa') {
    _spaActivate();
} else {
    gdpr(init_iprima_ads);
}

// [CUSTOM_RESOURCES wire-up — blok_0000d]
// Dispatch eventu 'weuron:cleaned-init' na konci IIFE — všechny funkce
// jsou definované, gdpr() flow je nastartované. Záznamy CUSTOM_RESOURCES
// s when:'after-cleaned-init' se aktivují právě teď.
try { window.dispatchEvent(new CustomEvent('weuron:cleaned-init')); } catch (_e) { /* ignore */ }
})();

