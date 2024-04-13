import './Task.css';
import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {AppContext} from "../App/App";
import {DataProps, ITask} from "../../data";
import {FormEdit} from "../Forms/FormEdit";
import plus from "../../svg/button-plus.svg";

export interface TaskContextProps {
  blockTitle?: string,
  taskId?: string,

  formVisible: boolean;
  setFormVisible: Dispatch<SetStateAction<boolean>>;

  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

export const TaskContext = createContext<TaskContextProps>({
  blockTitle: undefined,
  taskId: undefined,

  formVisible: false,
  setFormVisible: () => {},

  text: '',
  setText: () => {},
})

export const Task = () => {
  const { blockTitle, taskId } = useParams();
  const { data } = useContext(AppContext);
  const [ formVisible, setFormVisible ] = useState(false);

  const block = data.find((block: DataProps) => block.title === blockTitle);
  const task = block?.tasks.find((task: ITask) => task.id === taskId);

  const initialText = task?.description || 'This task has no description'

  const [ text, setText ] = useState<string>(initialText);

  return (
    <TaskContext.Provider value={{ blockTitle, taskId, formVisible, setFormVisible, text, setText }}>
      <div className={'task-details'}>
        <h2 className={'task-details-title'}>{task?.name}</h2>
        {
          formVisible ?
            <FormEdit />
            :
            <p className={'task-details-text'} onClick={() => setFormVisible(true)}>{text}</p>
        }
        <Link to={'/'}><button className={'details-button'}><img src={plus} className={'details-svg'} alt={'plus'}/></button></Link>
      </div>
    </TaskContext.Provider>
  )
}
