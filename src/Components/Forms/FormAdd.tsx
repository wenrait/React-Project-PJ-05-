import {DataProps, ITask} from "../../data";
import {ChangeEvent, createContext, Dispatch, SetStateAction, useCallback, useContext, useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {AppContext} from "../App/App";
import {BlockContext} from "../Block/Block";
import './FormToAdd.css'

export interface FormAddContextProps {
  taskToAdd: ITask,
  setTaskToAdd: Dispatch<SetStateAction<ITask>>;
}

export const FormAddContext = createContext<FormAddContextProps>({
  taskToAdd: { id: '', name: '', description: ''},
  setTaskToAdd: () => {}
});

export const FormAdd = () => {
  const { setData } = useContext(AppContext);
  const { setFormVisible } = useContext(BlockContext);

  const [taskToAdd, setTaskToAdd] = useState<ITask>({ id: generateUniqueID(), name: '', description: ''})

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { title, value } = e.target;
    setTaskToAdd(taskToAdd => {
      return {
        ...taskToAdd,
        [title]: value,
      }
    });
  },[setTaskToAdd]);

  const handleAddTask = useCallback(() => {
    if (taskToAdd.name !== '') {
      addTask(taskToAdd);
      setTaskToAdd({ id: generateUniqueID(), name: '', description: ''})
      setFormVisible(false)
    }
  }, [taskToAdd])

  const addTask = useCallback((taskToAdd: ITask) => {
    setData((prevData: DataProps[]) => {
      return prevData.map((block: DataProps) => {
        if (block.id === 0) {
          return {
            ...block, tasks: [...block.tasks, taskToAdd]
          };
        }
        return block
      })
    })
  }, [])

  return (
    <FormAddContext.Provider value={{ taskToAdd, setTaskToAdd }}>
      <div className={'form form-add'}>
        <input title={'name'} type={'text'} value={taskToAdd.name} placeholder={'New task...'} onChange={handleInputChange}/>
        <input title={'description'} type={'text'} value={taskToAdd.description} placeholder={'Description...'} onChange={handleInputChange} />
        <button className={'button-submit'} onClick={handleAddTask}>Submit</button>
      </div>
    </FormAddContext.Provider>
  )
}

