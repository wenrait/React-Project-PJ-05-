export interface ITask {
  id: string;
  name: string;
  description: string;
}

export interface DataProps {
  id: number;
  title: string;
  tasks: ITask[];
}

export const mockData: DataProps[] = [
  {
    id: 0,
    title: 'Backlog',
    tasks: [],
  },
  {
    id: 1,
    title: 'Ready',
    tasks: []
  },
  {
    id: 2,
    title: 'In Progress',
    tasks: []
  },
  {
    id: 3,
    title: 'Finished',
    tasks: []
  }
]
