import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import {ITask, DataProps} from "../../data";
import './Block.css';
import {List} from "../List/List";
import {AppContext} from "../App/App";

export interface BlockContextProps {
  block: DataProps;
  prevBlock: DataProps;

  formVisible: boolean;
  setFormVisible: Dispatch<SetStateAction<boolean>>;
}

export const BlockContext = createContext<BlockContextProps>({
  block: { id: 0, title: '', tasks: [] },
  prevBlock: { id: 0, title: '', tasks: [] },

  formVisible: false,
  setFormVisible: () => {},
})

export interface BlockProps {
  id: number,
  title: string,
  tasks: ITask[]
}

export const Block = ({id, title, tasks }: BlockProps) => {
  const { data } = useContext(AppContext);

  const block = data[id];
  const prevBlock = data[id - 1]

  const [formVisible, setFormVisible] = useState(false);

  return (
    <BlockContext.Provider value={{ block, prevBlock, formVisible, setFormVisible }}>
      <div className="Block">
        <h2 className="Block__title">{title}</h2>
        <List title={title} tasks={tasks}/>

      </div>
    </BlockContext.Provider>

  )
}
