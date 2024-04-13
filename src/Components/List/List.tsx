import {ITask} from "../../data";
import {Link} from "react-router-dom";
import './List.css';
import {useContext} from "react";
import {BlockContext} from "../Block/Block";
import {FormMove} from "../Forms/FormMove";
import {FormAdd} from "../Forms/FormAdd";
import plus from "../../svg/button-plus.svg";

export interface ListProps {
  title: string;
  tasks: ITask[];
}

export const List = ({ title, tasks }: ListProps) => {
  const { formVisible, setFormVisible, prevBlock} = useContext(BlockContext);

  return (
    <ul className={'block-list'}>
      {tasks.map((task: ITask) => <Link to={`/${title}/${task.id}`} key={task.id} className={'block-list-link'}><li>{task.name}</li></Link>)}
      {
        formVisible?
          prevBlock?
            <FormMove /> : <FormAdd />
          :
          <button
            id={"add"}
            className={'button-add'}
            onClick={() => setFormVisible(true)}
            disabled={prevBlock?.tasks?.length === 0}
          >
            <img src={plus} alt={'add'}/>
            Add task
          </button>
      }
    </ul>
  )
}
