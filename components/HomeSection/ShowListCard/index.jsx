import Link from "next/link";
import {BsCardChecklist} from "react-icons/bs";

const ShowListCard = () => {
    return ( <div className="bg-gradient-to-r from-[#F9C472] via-[#F58D37] to-[#F98F41] shadow sm:w-full p-5 rounded">
       <div className="bg-white rounded-md shadow w-full h-full flex flex-col justify-center items-center p-5 space-y-5">
      
       <div className="w-full">
          <p className="text-center md:text-2xl sm:text-xl font-medium mb-5">देनगीदार यादी</p>
          <hr />
          </div>
       <div className="bg-white p-2 rounded-full shadow">
       <Link href={'/show-list'}>
       <BsCardChecklist size={30} /></Link>
       </div>
       </div>
    </div> );
}
 
export default ShowListCard;