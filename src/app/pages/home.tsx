import { SearchModal } from "@/components/home/search-modal";
import { LayoutHeader } from "@/components/layouts/LayoutHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
/* import { ModeToggle } from "@/components/ui/mode-toggle";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux"; */

const Home = () => {
  /*
  const user = useSelector((state: RootState) => state.auth.user);

  console.log("user: " + JSON.stringify(user, null, 2));

  if (!user)
    return <p>No user login</p> 
  
  */
  const navigate = useNavigate()

  return (
    <div className="bg-background h-screen flex flex-col">
      <LayoutHeader />

      {/* Search Area */}
      <div className="bg-background flex items-center justify-center p-8">
        <div className="w-3/5 flex flex-col gap-4 justify-center items-center text-center">
          <h1 className="text-4xl font-semibold">Find your place through</h1>

          <span className="flex gap-4 items-center w-full justify-center">
            <SearchModal />
            <h1>OR</h1>
            <Button className="bg-primary" onClick={() => navigate('/chat')}>
              Hestia AI
            </Button>
          </span>
        </div>
      </div>

      {/* Featured Area */}
      <div>

      </div>
    </div>
  )
}



export default Home
