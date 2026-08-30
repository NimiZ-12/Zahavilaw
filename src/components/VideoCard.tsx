"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoCard({
  id,
  title,
  date,
  playLabel,
  credit,
  creditLabel,
}: {
  id: string;
  title: string;
  date?: string;
  /** Accessible name for the play button, with `{title}` as a placeholder. */
  playLabel: string;
  /** Outlet that produced the video, when it is not the firm's own. */
  credit?: string;
  /** Credit line template, with `{source}` as a placeholder. */
  creditLabel: string;
}) {
  const [playing, setPlaying] = useState(false);
  // maxresdefault only exists for videos with an HD thumbnail; fall back to
  // hqdefault (always available) instead of showing YouTube's grey 404 image.
  const [thumb, setThumb] = useState(
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  );
  const imgRef = useRef<HTMLImageElement | null>(null);

  // YouTube serves a 120px grey placeholder (HTTP 200) when maxresdefault is
  // missing, so the swap to hqdefault keys off the loaded image's natural
  // size. The onLoad/onError handlers below cover images that finish loading
  // after hydration - but a tiny placeholder on a fast connection often
  // finishes BEFORE React attaches them, the events never fire, and the card
  // is stuck on the grey box. This effect closes that race: on mount, if the
  // image already completed as either an error or something implausibly
  // small, apply the same fallback the handlers would have.
  useEffect(() => {
    const img = imgRef.current;
    if (
      img?.complete &&
      img.naturalWidth < 200 &&
      // src, not currentSrc: after a failed load currentSrc can be empty.
      img.src.includes("maxresdefault")
    ) {
      setThumb(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
    }
  }, [id]);

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
            {/* Deliberately a raw <img>, not next/image: the maxres->hq
                fallback below reads the source's naturalWidth, which the
                image optimizer would mask by re-encoding to the requested
                size. Routing YouTube thumbnails through the optimizer would
                also bill every view for no gain. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
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
        {/* Attribution for an interview filmed and published by someone else.
            The moral right of attribution under the Copyright Law survives
            even where the embed itself is licensed, so the outlet is named
            wherever the video appears. */}
        {credit && (
          <p className="mt-2 text-xs text-muted">
            {creditLabel.replace("{source}", credit)}
          </p>
        )}
      </div>
    </article>
  );
}
