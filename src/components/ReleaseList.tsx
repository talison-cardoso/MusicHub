import releasesData from '../data/releases.json';

export default function ReleaseList() {
  const toggleAudio = (button: HTMLElement) => {
    // Lógica opcional para o player de áudio
    console.log("Toggle audio clicked", button);
  };

  return (
    <>
      {releasesData.map((release) => (
        <div
          key={release.number}
          className="group relative bg-surface-container-low hover:bg-surface-container rounded-xl p-4 lg:p-6 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          {/* Left: Artwork + Meta */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <span className="font-stat-counter text-stat-counter text-outline-variant group-hover:text-primary transition-colors w-8 text-center shrink-0">
              {release.number}
            </span>

            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 shadow-md bg-surface-container-highest">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                data-alt={release.alt}
                src={release.image}
                alt={release.title}
              />
              <button
                type="button"
                aria-label={`Reproduzir ${release.title}`}
                className="absolute inset-0 bg-surface-container-lowest/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-primary cursor-pointer"
                onClick={(e) => toggleAudio(e.currentTarget as HTMLElement)}
              >
                <span
                  className="material-symbols-outlined text-[36px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_circle
                </span>
              </button>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`px-2 py-0.5 rounded-full font-label-md text-label-md uppercase ${release.badgeClass}`}
                >
                  {release.badge}
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    calendar_today
                  </span>{' '}
                  {release.date}
                </span>
              </div>

              <h2 className="font-headline-md text-headline-md text-on-surface truncate tracking-tight group-hover:text-primary transition-colors">
                {release.title}
              </h2>

              <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm mt-0.5">
                <span>{release.producer}</span>
                <span>•</span>
                <span>{release.genre}</span>
                <span>•</span>
                <span>{release.duration}</span>
              </div>
            </div>
          </div>

          {/* Center: Interactive Audio Waveform Visualizer */}
          <div className="hidden xl:flex flex-col items-center justify-center w-72 px-4">
            <div className="flex items-end gap-1 h-8 w-full justify-center">
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-3 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-6 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-4 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-7 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-8 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-5 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-7 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-4 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-6 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-3 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-7 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-5 rounded-full transition-all"></span>
              <span className="w-1 bg-surface-bright group-hover:bg-primary h-4 rounded-full transition-all"></span>
            </div>
            <span className="font-label-md text-label-md text-outline tracking-wider mt-1.5 uppercase">
              Preview Disponível
            </span>
          </div>

          {/* Right: Direct Download & Streaming Actions */}
          <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
            <div className="flex-col items-end mr-2 text-right hidden sm:flex">
              <span className="font-label-lg text-label-lg text-on-surface">
                {release.downloads}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {release.fileInfo}
              </span>
            </div>

            <button
              type="button"
              className="w-11 h-11 rounded-full bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface transition-colors cursor-pointer"
              onClick={(e) => toggleAudio(e.currentTarget as HTMLElement)}
              title="Prévia de 30s"
            >
              <span className="material-symbols-outlined text-[20px]">
                volume_up
              </span>
            </button>

            <a
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-secondary-container hover:text-on-surface font-label-lg text-label-lg shadow-sm transition-all transform active:scale-95"
              download={release.downloadFileName}
              href="#"
            >
              <span className="material-symbols-outlined text-[18px]">
                cloud_download
              </span>
              <span>Download</span>
            </a>
          </div>
        </div>
      ))}
    </>
  );
}