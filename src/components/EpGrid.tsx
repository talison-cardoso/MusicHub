import { h } from 'preact';
import data from '../data/eps.json';

export default function EpGrid() {
  return (
    <>
      {data.eps.map((ep) => (
        <div
          key={ep.id}
          className="group bg-surface-container-low hover:bg-surface-container rounded-2xl overflow-hidden transition-all duration-300 shadow-md flex flex-col justify-between"
        >
          <div className="relative aspect-square w-full bg-surface-container-high overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              data-alt={ep.alt}
              src={ep.image}
              alt={ep.title}
            />
            <div className="absolute inset-0 bg-linear-to-t from-surface-container-lowest/90 via-transparent to-transparent"></div>
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md font-label-md text-label-md uppercase ${ep.badgeClass}`}
              >
                {ep.badge}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-label-md text-label-md text-secondary-fixed uppercase tracking-wider">
                {ep.date}
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold mt-0.5">
                {ep.title}
              </h3>
            </div>
          </div>

          <div className="p-6 flex flex-col justify-between flex-1 gap-4">
            <p className="font-body-md text-body-md text-on-surface-variant">
              {ep.description}
            </p>
            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md">
                <span className={`material-symbols-outlined text-[18px] ${ep.badgeClass}`}>
                  download_done
                </span>
                <span>{ep.downloads}</span>
              </div>
              <a
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-label-md transition-colors"
                href="#"
                download={ep.zipFile}
              >
                <span className="material-symbols-outlined text-[16px]">folder_zip</span>
                <span>{ep.downloadText}</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}