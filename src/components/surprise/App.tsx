import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";

import avatarMain from "../../../Avatares/Avatar.png";
import avatarOne from "../../../Avatares/Avatar 1.png";
import avatarTwo from "../../../Avatares/Avatar 2.png";
import avatarThree from "../../../Avatares/Avatar 3.png";
import avatarFour from "../../../Avatares/Avatar 4.png";
import dogAvatar from "../../../Avatares/Cachorro sem fundo.png";
import dogAvatarOne from "../../../Avatares/Cachorro limpo 1.png";
import dogAvatarTwo from "../../../Avatares/Cachorro limpo 2.png";
import dogAvatarThree from "../../../Avatares/Cachorro limpo 3.png";
import dogAvatarFour from "../../../Avatares/Cachorro limpo 4.png";
import herAvatarMain from "../../../AvataresDela/Avatar dela.png";
import herAvatarOne from "../../../AvataresDela/Avatar dela 1.png";
import herAvatarTwo from "../../../AvataresDela/Avatar dela 2.png";
import herAvatarThree from "../../../AvataresDela/Avatar dela 3.png";
import herAvatarFour from "../../../AvataresDela/Avatar dela 4.png";
import herAvatarFive from "../../../AvataresDela/Avatar dela 5.png";
import herAvatarSix from "../../../AvataresDela/Avatar dela 6.png";
import herAvatarSeven from "../../../AvataresDela/Avatar dela 7.png";
import soundtrack from "../../../Music/Aerosmith - I Don't Want to Miss a Thing (Lyrics) - Loku (youtube).mp3";

type Frame = {
  image: string;
  dogImage: string;
  title: string;
  message: string;
};

const frames: Frame[] = [
  {
    image: avatarMain,
    dogImage: dogAvatar,
    title: "Eu fiz isso pensando em você.",
    message: "Cada imagem aqui é um pedacinho do carinho que eu queria te mostrar.",
  },
  {
    image: avatarOne,
    dogImage: dogAvatarOne,
    title: "Você deixa tudo mais bonito.",
    message: "Até os momentos simples ficam especiais quando têm você no meio.",
  },
  {
    image: avatarTwo,
    dogImage: dogAvatarTwo,
    title: "Eu guardo nossos detalhes.",
    message: "As conversas, as risadas, os jeitos e tudo que só a gente entende.",
  },
  {
    image: avatarThree,
    dogImage: dogAvatarThree,
    title: "Tem coisa que vira lar.",
    message: "E estar perto de você virou uma dessas coisas para mim.",
  },
  {
    image: avatarFour,
    dogImage: dogAvatarFour,
    title: "Eu escolheria você de novo.",
    message: "Em qualquer versão da história, em qualquer quadro, em qualquer dia.",
  },
  {
    image: avatarOne,
    dogImage: dogAvatar,
    title: "Não quero perder nenhum detalhe.",
    message: "Por isso essa música, essa surpresa e esse jeito de te lembrar.",
  },
  {
    image: avatarThree,
    dogImage: dogAvatarTwo,
    title: "Ainda tem muito para viver.",
    message: "Que venham mais capítulos, mais planos e mais motivos para sorrir.",
  },
  {
    image: avatarMain,
    dogImage: dogAvatarFour,
    title: "Esse é só o começo.",
    message: "O resto da história eu quero continuar escrevendo com você.",
  },
];

const herFrames = [
  herAvatarMain,
  herAvatarOne,
  herAvatarTwo,
  herAvatarThree,
  herAvatarFour,
  herAvatarFive,
  herAvatarSix,
  herAvatarSeven,
];

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timer = window.setInterval(() => {
      setActiveFrame((current) => (current + 1) % frames.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, [started]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
  }, []);

  async function startExperience() {
    setStarted(true);
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
    }
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setMusicPlaying(true);
        setStarted(true);
      } catch {
        setMusicPlaying(false);
      }
      return;
    }

    audio.pause();
    setMusicPlaying(false);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  function showPreviousFrame() {
    setStarted(true);
    setActiveFrame((current) => (current - 1 + frames.length) % frames.length);
  }

  function showNextFrame() {
    setStarted(true);
    setActiveFrame((current) => (current + 1) % frames.length);
  }

  const currentFrame = frames[activeFrame];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#120d0a] text-[#fff8ef]">
      <audio
        ref={audioRef}
        src={soundtrack}
        loop
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />

      <div className="story-page-bg absolute inset-0" />

      <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
        <IconButton label={musicPlaying ? "Pausar musica" : "Tocar musica"} onClick={toggleMusic}>
          {musicPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </IconButton>
        <IconButton label={muted ? "Ativar som" : "Silenciar"} onClick={toggleMute}>
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </IconButton>
      </div>

      <section className="story-stage relative z-10 flex min-h-screen items-center justify-center px-4 pb-36 pt-16 sm:pb-44">
        <button
          onClick={showPreviousFrame}
          className="absolute left-4 z-20 hidden h-12 w-12 items-center justify-center rounded-md border border-[#f9c784]/25 bg-black/25 text-[#fff8ef] backdrop-blur-sm transition hover:bg-black/40 md:flex"
          aria-label="Imagem anterior"
          title="Imagem anterior"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>

        <div className="story-layout w-full max-w-7xl">
          <div className="story-main-frame story-scene relative overflow-hidden rounded-2xl border border-[#f9c784]/55 shadow-[0_24px_80px_rgba(52,26,14,0.28)]">
            <img
              key={activeFrame}
              src={currentFrame.image}
              alt="Avatar"
              className="story-avatar h-full w-full animate-story-photo-in object-contain object-center"
            />
            <img
              src={currentFrame.dogImage}
              alt="Cachorro"
              className="story-dog pointer-events-none absolute animate-story-photo-in drop-shadow-[0_18px_24px_rgba(74,38,18,0.32)]"
            />
          </div>

          <aside className="story-text-panel">
            <p className="story-text-kicker">Para você</p>
            <h2>{currentFrame.title}</h2>
            <p>{currentFrame.message}</p>
          </aside>
        </div>

        {!started && (
          <button
            onClick={startExperience}
            className="absolute flex h-24 w-24 items-center justify-center rounded-full border border-[#f9c784]/55 bg-[#2a1a14]/85 text-[#fff8ef] shadow-2xl backdrop-blur-sm transition hover:scale-105 hover:bg-[#3b251c]"
            aria-label="Comecar"
            title="Comecar"
          >
            <Play className="ml-1 h-11 w-11" fill="currentColor" />
          </button>
        )}

        <button
          onClick={showNextFrame}
          className="absolute right-4 z-20 hidden h-12 w-12 items-center justify-center rounded-md border border-[#f9c784]/25 bg-black/25 text-[#fff8ef] backdrop-blur-sm transition hover:bg-black/40 md:flex"
          aria-label="Proxima imagem"
          title="Proxima imagem"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </section>

      <HerFilmStrip />
    </main>
  );
}

export { App as SurpriseApp };

function HerFilmStrip() {
  const strip = [...herFrames, ...herFrames];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden bg-black/18 py-4">
      <div className="story-film-strip flex w-max gap-3 will-change-transform">
        {strip.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="h-24 w-36 shrink-0 overflow-hidden rounded-md border border-[#f9c784]/25 bg-[#f6dfbd] shadow-lg sm:h-32 sm:w-48"
          >
            <img src={image} alt="" className="h-full w-full object-contain" loading="eager" />
          </div>
        ))}
      </div>
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-md border border-[#f9c784]/30 bg-black/28 text-[#fff8ef] shadow-lg backdrop-blur-sm transition hover:border-[#f9c784]/70 hover:bg-black/42"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}
