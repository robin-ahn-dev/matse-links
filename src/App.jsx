import Box from "./Box";
import { useEffect, useState } from "react";
import { X, Globe, Mail, Book, FileText, BookOpen } from 'lucide-react';

function App() {
  const [data, setData] = useState(null);
  const [popup, setPopup] = useState(null);

  const links = {
    "Allgemeines ": [
      { name: "Paddel", url: "https://matse.paddel.xyz/" },
      {
        name: "IHK Berichtsheft",
        url: "https://berufsausbildung-aachen-ihk.de/tibrosBB/BB_auszubildende.jsp",
      },
      {
        name: "Stundenplan",
        url: "https://www.matse.itc.rwth-aachen.de/stundenplan/web/index.html",
      },
      {
        name: "Ahornstraße",
        url: "https://www.studierendenwerk-aachen.de/de/Gastronomie/mensa-ahornstrasse-wochenplan.html",
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
        name: "BWL",
        url: "https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=56953",
      },
      {
        name: "Stochastik",
        url: "https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=1300898",
      },
      {
        name: "Softwaretechnik",
        url: "https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=1296678",
      },
      {
        name: "Datenbanken",
        url: "https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=134564",
      },
    ],
    Hausaufgaben: [
      {
        name: "Stochastik",
        url: "https://www.ili.fh-aachen.de/ilias.php?baseClass=ilexercisehandlergui&cmdNode=cd:n6&cmdClass=ilObjExerciseGUI&cmd=showOverview&ref_id=1303392&target=1303392",
      },
      {
        name: "Softwaretechnik",
        url: "https://www.ili.fh-aachen.de/ilias.php?baseClass=ilexercisehandlergui&cmdNode=cd:n6&cmdClass=ilObjExerciseGUI&cmd=showOverview&ref_id=1296680&target=1296680",
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

  return (
    <div className="h-full flex flex-col items-center mt-2 text-white">
      {popup && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/70"
          onClick={() => setPopup(null)}
        >
          <div
            className="bg-white p-4 rounded-lg w-[600px] relative max-w-[80%]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-blue-500">Informationen</h2>
            {[
              "name",
              "start",
              "end",
              "location.name",
              "lecturer.name",
              "information",
            ].map((key, i) => (
              <p key={i} className="mt-2 text-black">
                <strong>{key.split(".")[0]}:</strong>{" "}
                {key.includes("start") || key.includes("end")
                  ? new Date(popup[key.split(".")[0]]).toLocaleTimeString(
                      "de-DE",
                      { hour: "2-digit", minute: "2-digit" }
                    )
                  : popup[key.split(".")[0]]?.[key.split(".")[1]] ||
                    "Keine Angabe"}
              </p>
            ))}
            <button
              onClick={() => setPopup(null)}
              className="absolute top-3 right-3 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full"
            >
              <X />
            </button>
          </div>
        </div>
      )}
      <h2 className="text-3xl text-center font-bold mt-20 max-w-[80%] leading-30">
        Stundenplan{" "}
        <p className="font-normal text-[20px] text-gray-500">
        {new Date().toLocaleDateString("de-DE", { weekday: "long" })} (
        {new Date().toLocaleDateString("de-DE")})
        </p>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[80%] gap-8 mt-8">
        {data?.map((item, i) => (
          <div
            key={i}
            onClick={() => setPopup(item)}
            className={`cursor-pointer rounded-2xl p-5 flex flex-col items-center ${
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
        <section key={i} className="mt-20 w-[80%] mb-16">
          <h2 className="text-4xl font-bold mt-4 mb-8">
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
    </div>
  );
}
export default App;
