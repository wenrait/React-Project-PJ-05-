import {DataProps} from "../../data";
import {User} from "../User/User";
import './Section.css';


export interface SectionProps {
  className: 'Header' | 'Footer';
  data?: DataProps[];
}

export const Section = ({ className, data }: SectionProps) => {
  const activeTasks = () => {
    const backlog = data?.find((block) => block.title === 'Backlog')
    return backlog?.tasks.length
  }

  const finishedTasks = () => {
    const finished = data?.find((block) => block.title === 'Finished')
    return finished?.tasks.length
  }

  return (
    className === 'Header' ? (
      <section className={'Header'}>
        <h1 className="Header__title">Awesome Kanban Board</h1>
        <User />
      </section>
    ) : (
      <section className={'Footer'}>
        <div className="Footer__tasks">
          <span className="Footer__span">Active Tasks: {activeTasks()}</span>
          <span className="Footer__span">Finished Tasks: {finishedTasks()}</span>
        </div>
        <span className="Footer__span">Kanban board by Dmitry Egorov, 2024</span>
      </section>
    )




  )
}