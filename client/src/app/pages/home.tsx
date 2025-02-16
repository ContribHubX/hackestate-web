import { ModeToggle } from "@/components/ui/mode-toggle";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  console.log("user: " + JSON.stringify(user, null, 2));

  if (!user)
    return <p>No user login</p>

  return (
    <div className="">
      <ModeToggle/>
      <h1>Welcome: {user.name} {user.email}</h1>

      <p>Home Page lorem200</p>
    </div>
  )
}



export default Home