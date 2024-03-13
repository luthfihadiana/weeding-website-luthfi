import { Transition } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";

import Logo from "../../public/images/logo.png"

export function useIsVisible(ref: RefObject<HTMLElement>): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting)
    });
  
    if (ref.current) {
      observer.observe(ref.current);
    }
  
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

const Section = ({children, className, id}:{
  children: ReactNode,
  className?: string,
  id?: string,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible1 = useIsVisible(ref);
  return(
    <section 
      ref={ref} 
      className={`min-h-screen w-full ${className??""} transition-all ease-in duration-700 ${isVisible1 ? "opacity-100" : "opacity-0"}`}
      id={id}
    >
      {children}
    </section>
  );
};

const WelcomeSection = ({
  start,
  onStart,
}:{onStart:()=> void, start:boolean}) => (
  <section
    className={`min-h-[calc(100vh-36px)] w-full flex flex-col items-center gap-6 snap-start`}
  >
    <h1 className={`text-4xl text-center font-aesthetic text-primary-light`}>
      The Weeding of<br/>
      Luthfi & Astri
    </h1>
    <Image
      src={Logo}
      alt="logo"
      width={375}
      height={375}
    />
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold text-primary">Minggu, 12 Mei 2024</h2>
      <p className={`text-lg text-center m-12 text-primary-light`}>
        Special Invitation to: <br/>
        <strong className="text-primary-dark">NAMA_TAMU_UNDANGAN</strong>
      </p>
      <button 
        onClick={onStart}
        className={`transition-all ease-in duration-700 ${!start ? "bg-primary-light text-whit hover:bg-slate-400 rounded-xl text-white" : "bg-none text-primary-dark font-bold"} w-2/3  p-2 flex flex-row align-middle justify-center gap-2 animate-bounce `}
      >
        {start && <span className="material-symbols-outlined">expand_more</span>}
        {!start ? "Buka undangan": "Scroll ke bawah"}
      </button>
    </div>
  </section>
)

const BrideSection = () => (
  <Section
    className={`flex flex-col items-center gap-8`}
    id="bride-section"
  >
    <p className={`font-arabic text-4xl text-center text-primary-light`}>
      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ  
    </p>
    <p className={`text-2xl text-center font-aesthetic text-primary-dark`}>Assalamualaikum Warrahmatullahi Wabarakatuh</p>
    <p className={`text-lg text-center text-primary lg:w-1/2`}>
      Kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami:
    </p>
    <div className="grid grid-cols-2 gap-10 flex-wrap w-full lg:w-1/2">
      <div className="flex flex-col items-center gap-2 flex-1">
        <Image
          src="https://picsum.photos/id/64/200/200"
          alt="pengantin pria"
          width={200}
          height={200}
          className="rounded-full"
        />
        <p className="text-xl font-bold font-aesthetic text-primary-dark text-center min-[375px]:text-2xl">Luthfi Ahmad MH</p>
        <p className="text-xl text-primary-light">Putra</p>
        <p className="text-center text-primary-dark text-sm min-[375px]:text-md">
          Bapak <strong>Prof Dr Ana Hadiana M.Eng.Sc</strong>
          <br/>& <br/>
          Ibu <strong>dr Rosye Arosdiani Apip M.Kom</strong>
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 flex-1">
        <Image
          src="https://picsum.photos/id/64/200/200"
          alt="pengantin wanita"
          width={200}
          height={200}
          className="rounded-full"
        />
        <p className="text-xl font-bold font-aesthetic text-primary-dark text-center min-[375px]:text-2xl">Astri Permatasari</p>
        <p className="text-xl text-primary-light">Putri</p>
        <p className="text-center text-primary-dark text-sm min-[375px]:text-md">
          Bapak <strong>Iyep Suhenri</strong> 
          <br/>& <br/>
          Ibu <strong>Titin Maryatin</strong>
        </p>
      </div>
    </div>
  </Section>
)

type CountdownItem = {
  num: number,
  title: string,
}


const CountdownItem = ({num,title}:CountdownItem) => (
  <div className="flex flex-col items-center gap-2 flex-1">
    <div className="flex gap-2">
      <div className="p-4 text-2xl bg-slate-500 text-white rounded font-bold flex-1 shadow-md">
        {Math.floor(num/10)}
      </div>
      <div className="p-4 text-2xl bg-slate-500 text-white rounded font-bold flex-1 shadow-md">
        {num % 10}
      </div>
    </div>
    <span className="text-center font-bold text-primary-dark">{title}</span>
  </div>
);

type CountdownProps = {
  num: number
}

const Countdown = ({
  num
}:CountdownProps) => {
  const numDay = Math.floor(num/86400);
  const restDay = num % 86400;
  const hours = Math.floor(restDay/3600);
  const restHour = restDay % 3600;
  const minutes = Math.floor(restHour/60);
  const seconds = minutes % 60;
  return(
    <div className="flex gap-4 justify-center w-full flex-wrap max-w-sm md:w-1/2">
      {numDay > 0  && <CountdownItem num={numDay} title="Hari"/>}
      <CountdownItem num={hours} title="Jam"/>
      <CountdownItem num={minutes} title="Menit"/>
      {numDay <= 0 && <CountdownItem num={seconds} title="Detik"/>}
    </div>
  );
}

const LocationSection = () => {
  const [seconds, setSeconds] = useState(()=>{
    const currentDate = new Date();
    const targetDate = new Date('2024-05-12T00:00:00');
    const differenceInSeconds = (targetDate.getTime() - currentDate.getTime()) / 1000;
    return Math.floor(differenceInSeconds);
  });

  useEffect(()=>{
    const interval = setInterval(()=>{
      setSeconds(prev => prev - 1);
    },1000);
    return () => clearInterval(interval);
  },[]);

  return(
    <Section
      className={`flex flex-col gap-8 items-center`}
    >
      <h1 className={`text-4xl text-center font-aesthetic text-primary-light`}>
        Waktu & Tempat Acara
      </h1>
      <Countdown num={seconds}/>
      <div className="flex flex-col items-center">
        <p className="text-md font-bold text-center text-primary w-full md:w-1/2 md:text-xl">
          {"Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, insyaAllah kami akan menyelenggarakan acara :"}
        </p>
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-4">
        <div className="flex flex-col items-center">
          <p className="text-3xl font-aesthetic text-primary-light">Akad</p>
          <p className="text-xl text-primary-dark text-center">Pukul 10.00 WIB - Selesai</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-aesthetic text-primary-light">Resepsi</p>
          <p className="text-xl text-primary-dark text-center">Pukul 10.00 WIB - Selesai</p>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <p className="text-3xl font-bold text-center font-aesthetic text-primary-light">
          Lokasi 
        </p>
        <p className="text-lg text-primary font-bold">Lobby Grand Metropolitan Mall</p>
        <p className="text-lg text-primary-dark">Jl. KH. Noer Ali, RT.007/RW.003, Pekayon Jaya, Kec. Bekasi Sel., Kota Bks, Jawa Barat 17148</p>
        <a
          target="_blank" href="https://www.google.com/maps/place/Grand+Metropolitan+Mall+Bekasi/@-6.2491109,106.9819604,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698c3669bb7bc5:0x553935395094b20e!8m2!3d-6.2491162!4d106.9845353!16s%2Fg%2F1hh_nxtg3?entry=ttu" rel="noopener noreferrer" 
          className="cursor-pointer bg-slate-600 p-2 rounded-xl m-4 text-white flex gap-2 items-center justify-center hover:bg-slate-500 transition-all ease-in-out"
        >
          <span className="material-symbols-outlined">map</span>
          Lihat Google Maps
        </a>
      </div>
    </Section>
  );
};



const GreetingSection = () => {
  const [show, setShow] =  useState(false);
  const [name, setName] = useState("");
  const [isPresent, setIsPresent] = useState(true);
  return(
    <Section
      className={`flex flex-col items-center gap-8`}
    >
      <h2 className={`text-4xl text-center font-aesthetic text-primary-light`}>Ucapan & Doa</h2>
      <div className="flex flex-row justify-center gap-10 w-full max-w-xl md:w-1/2">
        <div className="w-full bg-slate-100 rounded-xl shadow-md">
          <div className="w-full rounded-t-xl bg-primary-light p-4">
            <div className="flex align-middle gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex align-middle items-center">
                <Image
                  src={Logo}
                  alt="logo"
                  width={70}
                  height={70}
                />
              </div>
              <div>
                <p className="text-white font-bold">Ucapan & Doa</p>
                <p className="text-white">40 Pengirim</p>
              </div>
            </div>
          </div>
          <div className="w-full h-80 p-4 overflow-scroll">
            <div className="flex w-full p-1 justify-center">
              <span className="p-2 bg-primary-light rounded-lg text-white">7 Desember 2024</span>
            </div>
            <div className="flex w-full">
              <div className="flex align-end items-end gap-2 w-full mt-2 min-[425px]:w-3/4">
                <div className="bg-white p-4 rounded-lg max-w-1/2">
                  <div className="flex justify-between">
                    <p className="text-primary-light">Luthfi</p>
                    <span className="text-primary">~Hadir</span>
                  </div>
                  <p>Luthfi dadjsk adajkd nsjabdjkabd jksbjkdba ds</p>
                </div>
                <span className="text-primary-light">12:00</span>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <div className="flex flex-row-reverse align-end items-end gap-2 w-full mt-2 min-[425px]:w-3/4">
                <div className="bg-slate-200 p-4 rounded-lg max-w-1/2">
                  <div className="flex justify-between">
                    <p className="text-primary-light">Luthfi</p>
                    <span className="text-primary">~Hadir</span>
                  </div>
                  <p>Luthfi dadjsk adajkd nsjabdjkabd jksbjkdba ds</p>
                </div>
                <span className="text-primary-light">12:00</span>
              </div>
            </div>
          </div>
          <div className="w-full rounded-b-xl bg-slate-200 p-4" 
            onFocus={()=> {
              if(!show) setShow(true);
            }}
            onBlur={()=> {
              if(show) setShow(false);
            }}
          >
            <Transition
              show={show}
              className="flex flex-col mb-4"
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <label htmlFor="name" className="font-bold text-primary-light mb-2">Nama</label>
              <input type="text" id="name" className="rounded-lg p-1 mb-4" onChange={(e)=> setName(e.target.value)} value={name}/>
              <label
                htmlFor="toggleTwo"
                className="flex items-center cursor-pointer select-none text-dark dark:text-white"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggleTwo"
                    className="peer sr-only"
                    checked={isPresent}
                    onClick={()=> setIsPresent(prev => !prev)}
                  />
                  <div
                    className="block h-8 rounded-full bg-slate-300 w-14"
                  />
                  <div
                    className="absolute w-6 h-6 transition bg-white rounded-full dot dark:bg-dark-4 left-1 top-1 peer-checked:translate-x-full peer-checked:bg-primary-light"
                  />
                </div>
                <span className="ml-2 font-bold text-primary-light">{isPresent ? "Hadir": "Tidak Hadir"}</span>
              </label>
            </Transition>
            <div className="flex justify-between align-middle gap-2">
              <textarea
                className="rounded-lg flex-1 p-2"
                placeholder="Tuliskan pesanmu"
              />
              <div className="h-min p-1 rounded-lg text-white bg-primary-light text-center flex align-middle justify-center cursor-pointer">
                <span className="material-symbols-outlined">send</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const GiftSection = () => {
  const [show, setShow] = useState(false);
  return(
    <Section
      className={`flex flex-col items-center gap-8 snap-start`}
    >
      <h2 className={`text-4xl text-center font-aesthetic text-primary-light`}>Kirim Hadiah</h2>
      <p className="text-center text-md text-primary-dark w-full md:max-w-lg">Tanpa mengurangi rasa hormat, bagi anda yang ingin memberikan tanda kasih untuk mempelai, dapat melalui tombol menu berikut:</p>
      <button onClick={()=>setShow(true)} className={`transition-all ease-in duration-700 ${show ? "opacity-0 scale-0" : "opacity-100"} bg-primary-light p-2 rounded-xl text-white flex flex-row align-middle justify-center gap-2 hover:bg-slate-400`}>
        Kirim Hadiah di sini
      </button>
      <div className={`transition-all ease-in duration-700 grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:max-w-lg ${!show ? "opacity-0 scale-0" : "opacity-100"}`}>
        <div>
          <h3 className="font-bold text-center text-primary-dark mb-4">Nomor Rekening Mempelai <br/>Wanita</h3>
          <div className="shadow-md p-2 h-30 w-full bg-gradient-red rounded-xl text-white">
            <p className="font-bold text-end">Mandiri</p>
            <div className="w-full mt-10">
              <p>Nomor Rekening</p>
              <p className="font-bold">2131323</p>
              <p>a.n.</p>
              <p className="font-bold">Astri Permatasari</p>
            </div>
            <button className="w-full p-2 mt-2 text-black font-bold bg-white shadow-md rounded-lg">Salin rekening</button>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-center text-primary-dark mb-4">Nomor Rekening Mempelai <br/>Pria</h3>
          <div className="shadow-md p-2 h-30 w-full bg-gradient-blue rounded-xl text-white">
            <p className="font-bold text-end">BCA</p>
            <div className="w-full mt-10">
              <p>Nomor Rekening</p>
              <p className="font-bold">2131323</p>
              <p>a.n.</p>
              <p className="font-bold">Luthfi Ahmad M. H.</p>
            </div>
            <button className="w-full p-2 mt-2 text-black font-bold bg-white shadow-md rounded-lg">Salin rekening</button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function Home() {
  const [start, setStart] = useState(false);
  const refAudio = useRef<HTMLAudioElement>(null);
  useEffect(()=>{
    if(!start) return;
    if(refAudio.current){
      refAudio.current.play();
    }
  },[start]);
  return (
    <>
      <Head>
        <title>Weeding of Astri & Luthfi</title>
        <meta property="og:title" content="Weeding of Astri & Luthfi" key="title" />
      </Head>
      <main
        className={`px-2 py-8 min-w-screen md:px-6 flex flex-col gap-8 ${!start ? "max-h-screen overflow-y-hidden" : ""}`}
      >
        <WelcomeSection onStart={()=> {
          setStart(true);
        }} start={start}/>
        <BrideSection/>
        <LocationSection/>
        <GreetingSection/>
        <GiftSection/>
        {start && <audio
          ref={refAudio}
          loop
        >
          <source src="/amin-paling-serius.mp3"/>
        </audio>}
      </main>
    </>
  );
}
