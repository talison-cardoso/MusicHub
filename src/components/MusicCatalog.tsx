export function MusicCatalog() {
  const tracks = [
    {
      badge: "Novo Single",
      title: "Noites Sem Fim",
      artist: "Young Nisioo ft. Guest",
      duration: "03:12",
      year: "2025",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfogzl5hfuuxak3qpHTYOj_Mdbu1GdcWBunFE7cwPF_HJzk7u5SSYvctp2Xc7MNRE_pR_aZsMktTaQzh0v0hvk6cTrkBYgbYXbXJSrIthM9geafJZsUO7WWXsvJLaA21RmpaATlpYD4d3LlgMTqPRDMLFvvEdeNT-XynAMfa65HiRhaCDrk_hNGvib2ND0uD92VmWdWPnHss4gk0a57mvzl5V6tp0SHRzZYdXtoskK9nCc0sqgmQoZ",
      altText: "Hip-hop single cover art glowing dark blue aesthetic showing city skyline at night with bold typography, premium street culture style",
      path: "ouvir-agora"
    },
    {
      badge: "Crushes & Lovers EP",
      title: "Sentimentos & Trap",
      artist: "Young Nisioo",
      duration: "02:50",
      year: "2024",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2-QG3A0EvoB4YuyfU_ul2x2qo-rpd1CO4eOX-ZlGTHJ1ISEez5Jfoumpfz6zdoYUXvtuE8z9uCWNX9vr0VpbFaO1Un_8ZKSaLE_Y7eZJnsNx_6qfDKE-UryX_dRTxAmtTE9WavbkxY7Kdh6i0ehEU3mjofHu6eTiJA_42urbUkUNb8m4H8baJMp4X9E0tdruH2M0iehGgZ0oKd4RZ6Xfom-5rXgAGBAXHkQ8MC0m-Q_0M5xOHT0jb",
      altText: "Conceptual music artwork with dark purple and cobalt lighting, abstract geometric chrome heart shape in studio background",
      path: "ouvir-agora"
    },
    {
      badge: "Destaque do Mês",
      title: "Conexão Real",
      artist: "Young Nisioo",
      duration: "03:35",
      year: "2024",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuApcQI-t_eCQ90K1MGcuP9u16c5dHIJ6AZIi5NyD6NYP7Chj8Rg0A04eFVfqJiihqXoVXC6qQ8g1IUdOYtDulRVv3UAhDhQ8uZtMBLgAzd3N1ggsh0dZiiNy-GRXW7YAHaJPhYp7vPicb0T7gGS8tyj3WKqT9rR_ZeWZkcgMGDKbQFAohZcIodBL4cZ0-ueqw18vpD8HN2QwkUkoSvSEBNFc57tsVHGvMg7PFeCBryxEWBZTzfTrYpO",
      altText: "Stylized typography album sleeve in deep navy and silver chrome, minimalist urban rap aesthetics",
      path: "ouvir-agora"
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-md text-label-md text-primary uppercase tracking-widest">
            Catálogo
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
            Músicas Recentes para Download
          </h2>
        </div>
        <a
          className="inline-flex items-center gap-2 font-label-lg text-label-lg text-primary hover:text-on-surface transition-colors"
          data-path="musicas"
          href="#"
        >
          Ver todas as 59 faixas
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {tracks.map((track, index) => (
          <div
            key={index}
            className="bg-surface-container rounded-xl p-5 shadow-xl flex flex-col justify-between gap-5 group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-lowest shrink-0 shadow-md">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  data-alt={track.altText}
                  src={track.coverUrl}
                  alt={track.title}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-secondary">
                  {track.badge}
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface truncate mt-0.5">
                  {track.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {track.artist}
                </p>
                <span className="font-label-md text-label-md text-on-surface-variant mt-2">
                  {track.duration} • {track.year}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t-0 bg-surface-container-low px-4 py-3 rounded-lg">
              <span className="font-label-md text-label-md text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Disponível Grátis
              </span>
              <a
                className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:bg-secondary-container transition-colors"
                data-path={track.path}
                href="#"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}