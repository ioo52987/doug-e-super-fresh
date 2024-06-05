export default function OrangeBtn(props){
    return(
        <>
        <button
          type="button"
          className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.1)]"
        >
          {props.text}
        </button>
        </>
    )
}