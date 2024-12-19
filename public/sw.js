const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
  "/",
  "/dashboard/home",
  "/dashboard/profile",
  "/dashboard/establishment",
  "/dashboard/how-to-use",
  "/dashboard/shoplifting",
  "/dashboard/restricted-area",
  "/dashboard/face-recognition",
  "/dashboard/information",
  "/dashboard/people-flow",
  "/forgot-password",
  "/reset-password",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/favicon-32x32-bg-negro.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/crimson4042_VP8.webm",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/logo_bordes.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/guyhowtouse.jpg",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/createEstablishment.webm",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/editProfile.webm",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/widget.webm",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/aside.webm",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/people_shoplifting.webm",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/logo_bordes_100.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/flags/en.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/flags/es.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/flags/fr.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/flags/de.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/flags/it.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/flags/br.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/holdingPhoneDark.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/holdingPhoneLight.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/videoInformationW.webm",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/punteroSmallWhite.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/punteroLargeWhite.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/metaLogo.webp",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/playaLogo.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/abakusLogo.webp",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/generalfoodLogo.webp",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/guardLogo.webp",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/bahiaLogo.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/hyattLogo.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/liguaneaLogo.webp",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/jewelLogo.webp",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/propsolLogo.webp",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/crimson_white.png",
  "https://github.com/BPM94/CDNMD/raw/main/CTM/crimson_black.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.error(`Error caching ${url}:`, err);
          }),
        ),
      );
    }),
  );
});
