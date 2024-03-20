import { Transition } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import { Fragment, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import Logo from "../../public/images/logo.png"
import Ornament3 from "../../public/images/ornament-3.png";
import Ornament4 from "../../public/images/ornament-4.png";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay"
import { GreetingRes, ReqGreeting } from "@/types";
import dayjs from "dayjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL??"", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??"");


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
    className={`min-h-[calc(100vh-36px)] w-full flex flex-col items-center gap-6 justify-center`}
    id="welcome-section"
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
      <p className={`text-lg text-center my-4 text-primary-light`}>
        Special Invitation to: <br/>
        <strong className="text-primary-dark">NAMA_TAMU_UNDANGAN</strong>
      </p>
      <button 
        onClick={onStart}
        className={`w-full transition-all ease-in duration-700 ${!start ? "bg-primary-light text-whit hover:bg-slate-400 rounded-xl text-white" : "bg-none text-primary-dark font-bold"} w-2/3  p-2 flex flex-row align-middle justify-center gap-2 animate-bounce `}
      >
        {start && <span className="material-symbols-outlined">expand_more</span>}
        {!start ? "Buka undangan": "Scroll ke bawah"}
      </button>
    </div>
  </section>
)

const IntroSection = () => (
  <Section
    className={`flex flex-col items-center gap-4 justify-center`}
    id="welcome-section"
  >
    <div className="relative 
    w-full bg-primary-light/[0.1] shadow-sm p-[32px] backdrop-opacity-100 rounded-lg md:max-w-[425px] leading-relaxed
    before:content-[''] before:w-[100px] before:h-[100px] before:bg-ornament-1 before:absolute before:top-[-40px] before:left-[-8px] before:bg-contain before:bg-no-repeat before:rotate-[45deg]
    after:content-[''] after:w-[100px] after:h-[100px] after:bg-ornament-3 after:absolute after:bottom-[-20px] after:right-[-10px] after:bg-contain after:bg-no-repeat after:rotate[]
    ">
      <p className={`font-arabic text-4xl text-center text-primary-light mb-4`}>
        بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ  
      </p>
      <p className="text-primary-dark text-xl">{'"'}Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.{'"'}</p>
      <p className="mt-4 font-bold text-primary text-xl">QS. Ar-Rum: 21</p>
    </div>
  </Section>
);

const BrideSection = () => (
  <Section
    className={`flex flex-col items-center gap-4 justify-center`}
    id="bride-section"
  >
    <p className={`text-2xl text-center font-aesthetic text-primary-dark`}>Assalamualaikum Warrahmatullahi Wabarakatuh</p>
    <p className={`text-lg text-center text-primary lg:w-1/2`}>
      Kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami:
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 flex-wrap w-full lg:w-1/2">
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
      className={`flex flex-col gap-8 items-center justify-center`}
      id="location-section"
    >
      <h2 className={`text-4xl text-center font-aesthetic text-primary-light`}>
        Waktu & Tempat Acara
      </h2>
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

const GallerySection = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [apiCursor,setCusorApi] = useState<CarouselApi>();
  const onClickCursor = (index:number) => {
    api?.scrollTo(index);
  }
  useEffect(() => {
    if (!api || !apiCursor) {
      return
    }
    api.on("select", () => {
      apiCursor.scrollTo(api.selectedScrollSnap())
    })
  }, [api, apiCursor])
  return(
    <Section
      className={`flex flex-col items-center gap-4 justify-center`}
      id="gallery-section"
    >
      <h2 className={`text-4xl text-center font-aesthetic text-primary-light`}>Gallery</h2>
      <div className="relative w-full flex flex-col items-center justify-center  max-w-[425px]
        before:content-[''] before:w-[100px] before:h-[100px] before:bg-ornament-1 before:absolute before:top-[-40px] before:left-[-8px] before:bg-contain before:bg-no-repeat before:rotate-[45deg] before:z-20
      ">
        <Carousel 
          className="w-full mt-4 relative"
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute bottom-0 right-0 w-full bg-primary-dark/[0.1] rounded-b-lg">
          <div className="flex bottom-0 right-0 w-full max-w-[240px] gap-2 p-2 my-0 mx-auto">
            <Carousel className="w-full" 
              setApi={setCusorApi}
              opts={{
                align: "start",
                loop: true,
              }} 
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="basis-1/2 min-[375px]:basis-1/3 flex justify-center">
                    <div className="bg-white rounded-lg w-[80px] aspect-square flex items-center justify-center shadow-sm" onClick={()=> onClickCursor(index)}>
                      <div className="flex justify-center align-center ">
                        {index + 1}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </Section>
  )
}


const GreetingSection = () => {
  const [show, setShow] =  useState(false);
  const [name, setName] = useState("");
  const [isPresent, setIsPresent] = useState(true);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<GreetingRes>({
    greeting: {},
    numberGreeting: 0
  });

  useEffect(()=>{
    const fetchData = async () => {
      const response:GreetingRes = await fetch("/api/greeting", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then(res => res.json())
      setData(response)
    }
    fetchData()
    const subscription = supabase
      .channel('events')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'greeting' }, (payload) => {
        fetchData();
      })
      .subscribe()
    return () => {
      subscription.unsubscribe()
    }
  },[])

  const sendPost =  async () => {
    const body:ReqGreeting = {
      is_confirm: isPresent,
      message,
      alias_name: name,
      id_user: 1
    }
    await fetch("/api/greeting", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        data: body
      })
    })
    setName("");
    setIsPresent(true);
    setMessage("");
  };

  return(
    <Section
      className={`flex flex-col items-center gap-4 justify-center`}
      id="greeting-section"
    >
      <h2 className={`text-4xl text-center font-aesthetic text-primary-light`}>Ucapan & Doa</h2>
      <div className="flex flex-row justify-center gap-10 w-full max-w-xl md:w-3/4">
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
                <p className="text-white">{data.numberGreeting} Pengirim</p>
              </div>
            </div>
          </div>
          <div className="w-full h-80 p-4 overflow-scroll">
            {
              Object.keys(data.greeting).map(el => (
                <Fragment key={`chat-${el}`}>
                  <div className="flex w-full p-1 justify-center">
                    <span className="p-2 bg-primary-light rounded-lg text-white">{el}</span>
                  </div>
                  {
                    data.greeting[el].map(e => (
                      <div className="flex w-full" key={`${el}-${e.id}-chat-bubble`}>
                        <div className="flex align-end items-end gap-2 w-full mt-2 min-[425px]:w-3/4">
                          <div className="flex flex-col gap-2 bg-white p-4 rounded-lg max-w-1/2">
                            <p className="text-primary-light max-w-[100px] sm:max-w-[175px] lg:max-w-[300px] truncate">{e.alias_name}</p>
                            <p>{e.message}</p>
                            <span className={e.is_confirm ? "text-primary text-right": "text-zinc-600 text-right"}>~{e.is_confirm ? "Hadir": "Tidak hadir"}</span>
                          </div>
                          <span className="text-primary-light">{dayjs(e.created_at).format("HH:mm")}</span>
                        </div>
                      </div>
                    ))
                  }
                </Fragment>
              ))
            }
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
                className="rounded-lg flex-1 p-2 resize-y"
                placeholder="Tuliskan pesanmu"
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
              />
              <div className="h-min p-1 rounded-lg text-white bg-primary-light text-center flex align-middle justify-center cursor-pointer">
                <span className="material-symbols-outlined" onClick={sendPost}>send</span>
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
      className={`flex flex-col items-center gap-4 justify-center`}
      id="greeting-section"
    >
      <h2 className={`text-4xl text-center font-aesthetic text-primary-light`}>Kirim Hadiah</h2>
      <p className="text-center text-xl text-primary-dark w-full md:max-w-lg">Tanpa mengurangi rasa hormat, bagi anda yang ingin memberikan tanda kasih untuk mempelai, dapat melalui tombol menu berikut:</p>
      <button onClick={()=>setShow(true)} className={`transition-all ease-in duration-700 ${show ? "opacity-0 invisible absolute z-[-1] scale-0" : "opacity-100 visible static scale-100"} bg-primary-light p-2 rounded-xl text-white flex flex-row align-middle justify-center gap-2 hover:bg-slate-400`}>
        Kirim Hadiah di sini
      </button>
      <div className={`transition-all ease-in duration-700 grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:max-w-lg ${!show ? "opacity-0 invisible absolute z-[-1] scale-0" : "opacity-100 visible static scale-100"}`}>
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

const ClosingSection = () => (
  <Section
    className={`flex flex-col items-center justify-center`}
    id="closing-section"
  >
    <div className="w-full sm:w-1/2 max-w-[450px] flex flex-col items-center gap-6 relative pt-[32px]">
      <Image src={Ornament4} width={400} height={150} alt="ornament4" className="absolute top-[-80px] min-[375px]:top-[-120px] left-1/2 translate-x-[-50%]"/>
      <p className="text-primary-dark text-center w-full text-xl">
        Merupakan sebuah kehormatan dan kebahagiaan bagi kami apabila Bapak/ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai
      </p>
      <p className="text-primary text-2xl text-center">
        Hormat Kami yang berbahagia
      </p>
      <h2 className={`text-5xl text-center font-aesthetic text-primary-light`}>
        Luthfi <br/>&<br/> Astri
      </h2>
      <Image src={Ornament3} width={150} height={150} alt="ornament3"/>
    </div>
  </Section>
);

const Navbar = () => {
  const navitems = [
    {name: "Home", icon: "home", id: "welcome-section"},
    {name: "Mempelai", icon: "group", id: "bride-section"},
    {name: "Tanggal", icon: "event_available", id: "location-section"},
    {name: "Galeri", icon: "image", id: "gallery-section"},
    {name: "Ucapan", icon: "chat", id:"greeting-section"},
  ]

  const [clicked, setIsClicked] = useState(false);
  const [activeTab, setActiveTab] = useState(navitems[0].id);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [sections, setSections] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect && rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveTab(section.id);
        }
      });
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10 || clicked);
      setPrevScrollPos(currentScrollPos);
      setIsClicked(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, clicked, sections]);

  useEffect(() => {
    // Get all the sections and store them in state
    const sectionElements = document.querySelectorAll<HTMLElement>('section');
    setSections(Array.from(sectionElements));
  }, []);

  const onClick = (id:string) => {
    setActiveTab(id);
    setIsClicked(true);
    const element = document.getElementById(id);
    if(element){
      element.scrollIntoView();
    }
  }
  return(
    <nav className={`transition-all ${!isVisible ? "opacity-0 invisible absolute z-[-1] scale-0" : "opacity-100 visible fixed scale-100"} fixed flex flex-col right-[10px] bottom-1/2 translate-x-0 translate-y-1/2 sm:flex-row sm:bottom-[10px] sm:right-1/2 sm:translate-x-1/2 sm:translate-y-0 px-4 py-2 bg-primary-light/[0.5] rounded-lg shadow-md gap-8 sm:text-md text-white/[0.6]`}>
      {
        navitems.map((el,idx) => (
          <a className={`flex-1 flex flex-col items-center cursor-pointer transition-colors ease-in duration-300 ${activeTab === el.id ? "text-white font-bold": ""}`} key={`${el.name}-${idx}`} onClick={()=> onClick(el.id)}>
            <span className="material-symbols-outlined">
              {el.icon}
            </span>
            <p className="opacity-0 invisible absolute z-[-1] scale-0 sm:opacity-100 sm:visible sm:static sm:scale-100">{el.name}</p>
          </a>
        ))
      }
    </nav>
  );
};

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
        className={`px-4 min-w-screen flex flex-col gap-8 ${!start ? "max-h-screen overflow-y-hidden" : ""}`}
      >
        <WelcomeSection onStart={()=> {
          setStart(true);
        }} start={start}/>
        <IntroSection/>
        <BrideSection/>
        <LocationSection/>
        <GallerySection/>
        <GreetingSection/>
        <GiftSection/>
        <ClosingSection/>
        {start && <Navbar/>}
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
