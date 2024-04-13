import {DataProps} from "../../data";
import {User} from "../User/User";
import './Section.css';


export interface SectionProps {
  className: 'header' | 'footer';
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
    className === 'header' ? (
      <section className={'header'}>
        <h1 className="header-title">Awesome Kanban Board</h1>
        <User />
      </section>
    ) : (
      <section className={'footer'}>
        <div className="footer-tasks-container">
          <span className="active-tasks">Active Tasks: {activeTasks()}</span>
          <span className="finished-tasks">Finished Tasks: {finishedTasks()}</span>
        </div>
        <span className="project-author">Kanban board by Dmitry Egorov, 2024</span>
      </section>
    )




  )
}