
export default function Box( { title, url } ) {
  return (
    <a href={url} className=" h-[150px] bg-slate-500 text-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center">
        <h2 className="text-xl text-center">{title}</h2>
    </a>
  )
}