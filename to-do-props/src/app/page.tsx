// import { TodoNoState } from "./components/noState/TodoNoState";
import { TodoWithProps } from "./components/usingProps/TodoWithProps";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen mx-auto">
  
    
    <TodoWithProps />
 
     
      {/* <TodoNoState /> */}
    </div>
  );
}