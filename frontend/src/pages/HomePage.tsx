import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";

export function HomePage() {
    const location=useLocation();
      const navigate = useNavigate();

    return (
        <div>
            <h1>OLÁ SEJA BEM VINDO: {location?.state.message} </h1>
              <Button
        onClick={()=>{
            localStorage.removeItem("user");
            navigate("/",{replace:true})
        }
        }
        >Logout</Button>
        </div>
    );
}