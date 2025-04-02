import Box from "./Box";
import { useEffect, useState } from "react";
import {
  X,
  Globe,
  Mail,
  Book,
  FileText,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";

function App() {
  const [data, setData] = useState(null);
  const [popup, setPopup] = useState(null);
  const [currentSlot, setCurrentSlot] = useState([]);

  const setOverflow = (type) => {
    const body = document.querySelector("body");
    if (type) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  };

  const links = {
    "Allgemeines ": [
      { name: "Paddel", url: "https://matse.paddel.xyz/" },
      {
        name: "IHK Berichtsheft",
        url: "https://berufsausbildung-aachen-ihk.de/tibrosBB/BB_auszubildende.jsp",
      },
      {
        name: "Klausurenpläne",
        url: "https://www.fh-aachen.de/studium/studiengaenge/angewandte-mathematik-und-informatik-bsc-dual/fuer-studierende",
      },
      {
        name: "H1 Portal",
        url: "https://h1.fh-aachen.de/qisserver/pages/cs/sys/portal/hisinoneStartPage.faces",
      },
      {
        name: "GitLab",
        url: "https://git.fh-aachen.de/",
      },
      {
        name: "Academica",
        url: "https://www.studierendenwerk-aachen.de/de/Gastronomie/mensa-academica-wochenplan.html",
      },
    ],
    Emails: [
      {
        name: "matse@alumni.fh-aachen.de",
        url: "https://mail.fh-aachen.de/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fmail.fh-aachen.de%2fowa%2f",
      },
      {
        name: "matse@rwth-aachen.de",
        url: "https://mail.rwth-aachen.de/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fmail.rwth-aachen.de%2fowa%2f",
      },
    ],
    ILIAS: [
      {
        name: "Numerik",
        url: "https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=1374292",
      },
      {
        name: "WebEng & Internettechnologien",
        url: "https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=702992",
      },
      {
        name: "Kommunikationssysteme",
        url: "https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=1082426",
      },
      {
        name: "Wissenschaftliches Arbeiten",
        url: "",
      },
    ],
    Skripte: [
      {
        name: "Numerik Skript",
        url: "/pdf/num-skript.pdf",
      },
      {
        name: "Numerik Folien",
        url: "/pdf/num-folien.pdf",
      },
      {
        name: "Numerik Spicker",
        url: "/pdf/num-spicker.pdf",
      },
    ],
    "MATSE Wiki": [
      {
        name: "Mathematik",
        url: "https://www.matse.itc.rwth-aachen.de/dienste/public/index.php?m=wiki&p=Lehrveranstaltungen/Pflichtmodule/Mathematik",
      },
      {
        name: "Informatik",
        url: "https://www.matse.itc.rwth-aachen.de/dienste/public/index.php?m=wiki&p=Lehrveranstaltungen/Pflichtmodule/Informatik",
      },
      {
        name: "Termine",
        url: "https://www.matse.itc.rwth-aachen.de/dienste/public/index.php?m=wiki&p=Termine",
      },
      {
        name: "Hausaufgaben",
        url: "https://www.matse.itc.rwth-aachen.de/dienste/protected/index.php?m=azubicheck&p=azubicheck&role=student&chooseSemester=30",
      },
      {
        name: "Notenansicht",
        url: "https://www.matse.itc.rwth-aachen.de/dienste/protected/index.php?m=grades&p=show",
      },
    ],
  };

  useEffect(() => {
    (async () => {
      const date = new Date().toISOString().split("T")[0];
      //const date = "2025-03-27";
      const res = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          `https://www.matse.itc.rwth-aachen.de/stundenplan/web/eventFeed/2&null?start=${date}&end=${date}`
        )}`
      );
      setData(
        (await res.json()).sort((a, b) => new Date(a.start) - new Date(b.start))
      );
    })();
  }, []);

  useEffect(() => {
    const updateSlot = () => {
      const now = new Date();
      const currentSlot = data?.find((item) => {
        const start = new Date(item.start);
        const end = new Date(item.end);
        return now >= start && now <= end;
      });
      setCurrentSlot(currentSlot);
    };

    updateSlot(); // Initial ausführen
    const interval = setInterval(updateSlot, 60000); // Danach jede Minute

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="h-full flex flex-col items-center mt-2 text-white">
      {popup && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/70"
          onClick={() => (setPopup(null), setOverflow(false))}
        >
          <div
            className="bg-white opacity-100 z-50 p-4 rounded-lg w-[600px] relative max-w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-blue-500">Informationen</h2>
            <div className="flex flex-col mt-4 text-black">
              <strong>Name</strong>
              <p className="text-gray-700 mb-4">{popup.name}</p>
              <strong>Start</strong>
              <p className="text-gray-700 mb-4">
                {popup.start.split("T")[1].slice(0, 5)} -{" "}
                {popup.end.split("T")[1].slice(0, 5)}
              </p>
              <strong>Raum</strong>
              <p className="text-gray-700 mb-4">{popup.location.desc}</p>
              {popup.lecturer.name && (
                <>
                  <strong>Dozent</strong>
                  <p className="text-gray-700 mb-4">{popup.lecturer.name}</p>
                </>
              )}
              {popup.information !== "<br />" && popup.information && (
                <>
                  <strong>Informationen</strong>
                  <p
                    dangerouslySetInnerHTML={{ __html: popup.information }}
                    className="text-gray-700 mb-4"
                  ></p>
                </>
              )}
            </div>
            <button
              onClick={() => (setPopup(null), setOverflow(false))}
              className="absolute top-3 right-3 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full"
            >
              <X />
            </button>
          </div>
        </div>
      )}
      <h2
        className="text-3xl text-center font-bold mt-20 max-w-[90%] leading-30 cursor-pointer"
        onClick={() =>
          window.open(
            "https://www.matse.itc.rwth-aachen.de/stundenplan/web/index.html"
          )
        }
      >
        Stundenplan
        <ExternalLink className="inline ml-2 w-6 h-6 -mt-1" color="#3C82F6" />
        <p className="font-normal text-[18px] text-gray-500">
          {new Date().toLocaleDateString("de-DE", { weekday: "long" })} (
          {new Date().toLocaleDateString("de-DE")})
        </p>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-8 mt-8">
        {data?.map((item, i) => (
          <div
            key={i}
            onClick={() => (setPopup(item), setOverflow(true))}
            className={`cursor-pointer rounded-2xl p-5 flex flex-col items-center opacity-30 ${
              currentSlot?.isExercise === "0" && currentSlot?.name === item.name
                ? "!opacity-100"
                : ""
            } ${
              currentSlot?.isExercise === "1" &&
              currentSlot?.information === item.information
                ? "!opacity-100"
                : ""
            } 
              ${
                {
                  "Numerik 1": "bg-red-500",
                  "Web-Engineering und Internettechnologien": "bg-blue-500",
                  Kommunikationssysteme: "bg-green-500",
                  "Wissenschaftliches Arbeiten": "bg-yellow-500",
                }[item.name] || "bg-purple-500"
              }`}
          >
            <p className="bg-slate-900/20 rounded-lg px-2 py-1">
              {new Date(item.start).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(item.end).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <h2 className="text-lg text-center mt-4">{item.name}</h2>
          </div>
        ))}
      </div>
      {Object.keys(links).map((title, i) => (
        <section key={i} className="mt-20 w-[90%] mb-16">
          <h2 className="text-4xl text-center lg:text-left font-bold mt-4 mb-8">
            {title}{" "}
            {title === "Allgemeines " && (
              <Globe className="inline ml-2 w-10 h-10 -mt-2" />
            )}
            {title === "Emails" && (
              <Mail className="inline ml-2 w-10 h-10 -mt-2" />
            )}
            {title === "Hausaufgaben" && (
              <Book className="inline ml-2 w-10 h-10 -mt-2" />
            )}
            {title === "ILIAS" && (
              <FileText className="inline ml-2 w-10 h-10 -mt-2" />
            )}
            {title === "MATSE Wiki" && (
              <BookOpen className="inline ml-2 w-10 h-10 -mt-2" />
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {links[title].map((link, index) => (
              <Box key={index} title={link.name} url={link.url} />
            ))}
          </div>
        </section>
      ))}
      <footer className="w-full bg-transparent text-center py-10 mt-20 border-t border-gray-700 flex-col flex items-center">
        <div className="flex gap-4 mb-4">
          <a
            href="https://github.com/robin-ahn-dev"
            target="_blank"
            className="w-[29px] h-[29px]"
          >
            <FaGithub className="h-full w-full hover:text-blue-500 transition-all" />
          </a>
          <a
            href="https://instagram.com/robin_ahn_dev"
            target="_blank"
            className="w-[29px] h-[29px]"
          >
            <FaInstagram className="h-full w-full hover:text-blue-500 transition-all" />
          </a>
          <a
            href="https://linkedin.com/in/robin-ahn"
            target="_blank"
            className="w-[29px] h-[29px]"
          >
            <FaLinkedin className="h-full w-full hover:text-blue-500 transition-all" />
          </a>
        </div>
        <p className="text-gray-400">
          Copyright © 2025 Robin Ahn. Alle Rechte vorbehalten
        </p>
      </footer>
    </div>
  );
}
export default App;
