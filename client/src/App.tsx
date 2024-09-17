import ClientForm from "./components/ClientForm.tsx";
import ClientList from "./components/ClientList.tsx";
import {useState} from "react";
import Button from "./components/Button.tsx";

function App() {
    const [showForm, setShowForm] = useState<boolean>(false)

   return (
       <>
           <ClientList/>
           <div className="w-full text-right">
               <Button onClick={() => setShowForm(!showForm)} > {showForm ? 'Close' : 'Add Client'} </Button>
           </div>
           {showForm && <ClientForm />}
       </>

   )
}

export default App
