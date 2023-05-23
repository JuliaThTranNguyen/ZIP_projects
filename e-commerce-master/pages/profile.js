import Link from "next/link"
import { HiUsers } from "react-icons/hi"
import Header from "../components/header"

const domain = "https://admin-panel-julia.vercel.app";

export default function Profile() {

  return (
    <>
      <Header />
      <title>Profile</title>
      <section className="w-full mx-auto flex flex-col">
        <div className="title mt-10">
          <h1 className="text-4xl font-bold py-4 pl-5">Admin Dashboard</h1>
          <h5 className="text-gray-600 py-4 pl-5">Dont worry if you can not login. You can continue to shop without having an account.</h5>
          <h5 className="text-gray-600 py-4 pl-5">Welcome to signin if you are an admin user </h5>
        </div>

        <form className="flex flex-wrap items-center justify-center pt-32 pr-20 pb-5 mb-5 w-full h-auto sm:h-40">
          <div className="flex">
            <div className="flex-none">
              <span className="icon flex items-center px-4">
                <HiUsers size={25} />
              </span>
            </div>
            <div className="flex-none px-5 sm:px-40 ">
            <h5>Only if you are an admin</h5>
            <div className="flex items-center text-blue-600">
              
              <Link href={`${domain}`}>SignIn here</Link>
              </div>
             
            </div>
          </div>
        </form>

        
        
      </section>
    </>
  )
}

