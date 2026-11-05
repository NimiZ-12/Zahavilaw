"use client";

/* ----------------------------------------------------------------------------
   Click-to-play video card inside an article (5.11 brief).
   ---------------------------------------------------------------------------
   A small facade card right under the answer box: thumbnail at the inline
   start (right in RTL), two text lines beside it. Nothing from YouTube is
   loaded until the visitor clicks - only the static thumbnail image; the
   click swaps the card for a column-wide youtube-nocookie player.
---------------------------------------------------------------------------- */

import { useState } from "react";
import { articlesHub } from "@/i18n/articles/hub";

/** Short display name: the series prefix ("מקרקעין - ") is dropped. */
function displayName(title: string): string {
  const i = title.indexOf(" - ");
  return i === -1 ? title : title.slice(i + 3);
}

/** "PT53S" -> "53 שניות"; "PT1M30S" -> "1:30 דקות". */
function displayDuration(iso: string): string {
  const m = iso.match(/^PT(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!m) return "";
  const total = Number(m[1] ?? 0) * 60 + Number(m[2] ?? 0);
  if (total < 60) return `${total} ${articlesHub.videoCard.seconds}`;
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return `${min}:${String(sec).padStart(2, "0")} ${articlesHub.videoCard.minutes}`;
}

export default function ArticleVideoCard({
  video,
}: {
  video: { id: string; title: string; duration: string };
}) {
  const [playing, setPlaying] = useState(false);
  const name = displayName(video.title);

  if (playing) {
    return (
      <div className="mt-6 overflow-hidden rounded-xl border border-gold/30 bg-navy">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`${articlesHub.videoCard.playAriaPrefix}${name}`}
      className="group mt-6 flex w-full items-center gap-4 rounded-xl border border-gold/30 bg-white p-3 text-start transition-all hover:border-gold/60 hover:shadow-sm sm:gap-5 sm:p-4"
    >
      <span className="relative block w-[150px] shrink-0 overflow-hidden rounded-lg bg-navy">
        {/* Raw <img>, like VideoCard: a YouTube thumbnail gains nothing from
            the image optimizer and would bill every view. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-white shadow-md transition-transform duration-200 group-hover:scale-110">
            <svg
              aria-hidden
              className="h-4 w-4 translate-x-0.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </span>
      <span className="min-w-0">
        <span className="block text-base font-bold leading-snug text-navy">
          {articlesHub.videoCard.lead}
        </span>
        <span className="mt-1 block text-sm text-muted">
          {name} · {displayDuration(video.duration)}
        </span>
      </span>
    </button>
  );
}
