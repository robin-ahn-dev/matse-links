
export default function Box( { title, url } ) {
  return (
    <a href={url} target="_blank" className=" h-[150px] bg-transparent border-[1px] border-blue-500 text-white shadow-lg rounded-2xl p-4 flex flex-col items-center justify-center">
        <h2 className="text-xl text-center">{title}</h2>
    </a>
  )
}