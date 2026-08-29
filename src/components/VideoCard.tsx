"use client";

import { useState } from "react";

export default function VideoCard({
  id,
  title,
  date,
  playLabel,
}: {
  id: string;
  title: string;
  date?: string;
  /** Accessible name for the play button, with `{title}` as a placeholder. */
  playLabel: string;
}) {
  const [playing, setPlaying] = useState(false);
  // maxresdefault only exists for videos with an HD thumbnail; fall back to
  // hqdefault (always available) instead of showing YouTube's grey 404 image.
  const [thumb, setThumb] = useState(
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden bg-navy">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={playLabel.replace("{title}", title)}
          >
            <img
              src={thumb}
              alt=""
              onError={() =>
                setThumb(`https://img.youtube.com/vi/${id}/hqdefault.jpg`)
              }
              // YouTube's "missing maxres" placeholder is a 120px grey image
              // served with HTTP 200, so onError alone can't catch it; the
              // load handler checks the natural size instead.
              onLoad={(e) => {
                if (
                  e.currentTarget.naturalWidth < 200 &&
                  thumb.includes("maxresdefault")
                ) {
                  setThumb(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
                }
              }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-navy/40 transition-colors group-hover:bg-navy/30" />
            <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110">
              <svg
                className="h-6 w-6 translate-x-0.5 text-navy"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        {date && (
          <p className="text-xs font-medium uppercase tracking-wide text-gold-600">
            {date}
          </p>
        )}
        <h3 className="mt-2 text-lg leading-snug text-navy">{title}</h3>
      </div>
    </article>
  );
}
