import './Tasks.css'
import { useContext } from "react";
import { Block } from "../Block/Block";
import { AppContext } from "../App/App";
import { DataProps } from "../../data";

export const Tasks = () => {
  const { data } = useContext(AppContext);

  return (
    <div className="Tasks">
      {
        data.map((block: DataProps) => (
          <Block key={block.id} id={block.id} title={block.title} tasks={block.tasks}/>
        ))
      }
    </div>
  )
}
