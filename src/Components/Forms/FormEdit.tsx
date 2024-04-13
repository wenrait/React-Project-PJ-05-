import {DataProps, ITask} from "../../data";
import {ChangeEvent, useCallback, useContext, useEffect} from "react";

import {TaskContext} from "../Task/Task";
import {AppContext} from "../App/App";

import './FormToEdit.css'

export const FormEdit = () => {
  const { setData } = useContext(AppContext);
  const { blockTitle, taskId, formVisible, setFormVisible, text, setText } = useContext(TaskContext);

  useEffect(() => {
    if (!formVisible && text === '') {
      setText('This task has no description')
    }
  })

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [setText]);

  const handleEditTask = useCallback(() => {
    if (blockTitle && taskId) {
      editTask(blockTitle, taskId, text);
      if (text === '') {
        setText('This task has no description')
      }
      setFormVisible(false);
    }
  }, [blockTitle, taskId, text])

  const editTask = useCallback((blockTitle: string, taskId: string, text: string) => {
    setData((prevData: DataProps[]) => {
      return prevData.map((block: DataProps) => {
        if (block.title === blockTitle) {
          return {
            ...block,
            tasks: block.tasks.map((task: ITask) => {
              if (task.id === taskId) {
                return {
                  ...task,
                  description: text
                };
              } else {
                return task;
              }
            })
          };
        } else {
          return block;
        }
      });
    });
  }, [setData]);


  return (
    <div className={'form-to-edit'}>
      <input
        className={'form-to-edit-input'}
        title={'description'}
        type={'text'}
        value={text}
        onChange={handleInputChange}
        autoFocus={true}
      />
      <button className={'button-submit'} onClick={handleEditTask}>
        Submit
      </button>
    </div>
  )
}
