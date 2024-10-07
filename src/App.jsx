import Box from "./Box";

function App() {
  return (
    <>
      <div className="h-full flex flex-col items-center">
        <h2 className="text-[50px] font-bold text-center mt-20 mb-4 text-white">
          Allgemeines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-8 w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%] gap-8">
          <Box title="Paddel" url="https://matse.paddel.xyz/" />
          <Box title="IHK Berichtsheft" url="https://berufsausbildung-aachen-ihk.de/tibrosBB/BB_auszubildende.jsp" />
          <Box title="Stundenplan" url="https://www.matse.itc.rwth-aachen.de/stundenplan/web/index.html" />
          <Box title="Ahornstraße" url="https://www.studierendenwerk-aachen.de/de/Gastronomie/mensa-ahornstrasse-wochenplan.html" />
          <Box title="Academica" url="https://www.studierendenwerk-aachen.de/de/Gastronomie/mensa-academica-wochenplan.html" />
        </div>

        <h2 className="text-[50px] font-bold text-center mt-20 mb-4 text-white">
          Emails
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-8 w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%] gap-8">
          <Box title="matse@alumni.fh-aachen.de" url="https://mail.fh-aachen.de/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fmail.fh-aachen.de%2fowa%2f" />
          <Box title="matse@rwth-aachen.de" url="https://mail.rwth-aachen.de/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fmail.rwth-aachen.de%2fowa%2f" />
        </div>

        <h2 className="text-[50px] font-bold text-center mt-20 mb-4 text-white">
          ILLIAS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-8 w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%] gap-8">
          <Box title="BWL" url="https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=56953" />
          <Box title="Stochastik" url="https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=1300898" />
          <Box title="Softwaretechnik" url="https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=1296678" />
          <Box title="Datenbanken" url="https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=134564" />
        </div>
        
        <h2 className="text-[50px] font-bold text-center mt-20 mb-4 text-white">
          Hausaufgaben
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-8 w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%] gap-8">
          {/* <Box title="BWL" url="" /> */}
          <Box title="Stochastik" url="https://www.ili.fh-aachen.de/ilias.php?baseClass=ilexercisehandlergui&cmdNode=cd:n6&cmdClass=ilObjExerciseGUI&cmd=showOverview&ref_id=1303392&target=1303392" />
          <Box title="Softwaretechnik" url="https://www.ili.fh-aachen.de/ilias.php?baseClass=ilexercisehandlergui&cmdNode=cd:n6&cmdClass=ilObjExerciseGUI&cmd=showOverview&ref_id=1296680&target=1296680" />
          {/* <Box title="Datenbanken" url="" /> */}
        </div>
        
        <h2 className="text-[50px] font-bold text-center mt-20 mb-4 text-white">
          MATSE Wiki
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-8 w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%] gap-8">
          <Box title="Mathematik" url="https://www.matse.itc.rwth-aachen.de/dienste/public/index.php?m=wiki&p=Lehrveranstaltungen/Pflichtmodule/Mathematik" />
          <Box title="Informatik" url="https://www.matse.itc.rwth-aachen.de/dienste/public/index.php?m=wiki&p=Lehrveranstaltungen/Pflichtmodule/Informatik" />
          <Box title="Termine" url="https://www.matse.itc.rwth-aachen.de/dienste/public/index.php?m=wiki&p=Termine" />
          <Box title="Hausaufgaben" url="https://www.matse.itc.rwth-aachen.de/dienste/protected/index.php?m=azubicheck&p=azubicheck&role=student&chooseSemester=30" />
          <Box title="Notenansicht" url="https://www.matse.itc.rwth-aachen.de/dienste/protected/index.php?m=grades&p=show" />
        </div>


      </div>
      <div className="mt-20 text-white h-5 w-full" />
    </>
  );
}

export default App;
