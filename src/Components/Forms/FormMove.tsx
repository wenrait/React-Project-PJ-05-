import {DataProps, ITask} from "../../data";
import {useCallback, useContext, useState} from "react";
import {AppContext} from "../App/App";
import {BlockContext} from "../Block/Block";
import './FormToMove.css'
import {Arrow} from "../Arrow/Arrow";

export const FormMove = () => {
  const { setData } = useContext(AppContext);
  const { block, prevBlock, setFormVisible } = useContext(BlockContext);

  // const optionsRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [taskToMove, setTaskToMove] = useState<ITask>({id: '', name: ' ', description: ''});

  // useOutsideClickListener({ ref: optionsRef, callback: () => setIsOpen(false)})

  const handleSelectTask = useCallback((selectedTask: ITask) => {
   setTaskToMove({name: selectedTask.name, description: selectedTask.name, id: selectedTask.id})
  }, [prevBlock]);

  const handleMoveTask = useCallback(() => {
    if (taskToMove) {
      moveTask(prevBlock, block, taskToMove);
      setTaskToMove({id: '', name: ' ', description: ''})
      setFormVisible(false)
    }
  }, [taskToMove])

  const moveTask = useCallback((fromBlock: DataProps, toBlock: DataProps, taskToMove: ITask) => {
    setData((prevData: DataProps[]) => {
      return prevData.map((block: DataProps) => {
        if (block.id === fromBlock.id) {
          return {
            ...block,
            tasks: block.tasks.filter((task: ITask) => task.id !== taskToMove.id)
          };
        }
        if (block.id === toBlock.id) {
          return {
            ...block,
            tasks: [...block.tasks, taskToMove]
          }
        }
        return block
      })
    })
  }, []);

  return (
    <div className={'form form-move'}>
      <div className={"dropdown"} onClick={() => setIsOpen(!isOpen)}>
        <div className={"selected-option"}>
          {taskToMove.name}
          <div className={"selected-option-arrow"} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <Arrow fill={'black'}/>
          </div>
        </div>
        {
          isOpen && (
          <div className={"options"}>
            {prevBlock?.tasks.map((task: ITask) => <div key={task.id} className={"option"}
                                                        onClick={() => handleSelectTask(task)}>{task.name}</div>)}
          </div>
          )
        }
      </div>
      <button className={"button-submit"} onClick={handleMoveTask} autoFocus={true}>Submit</button>
    </div>
  )
}

