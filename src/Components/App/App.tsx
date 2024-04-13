import {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import './App.css';
import {DataProps, mockData} from "../../data";
import {Section} from "../Section/Section";
import {Tasks} from "../Tasks/Tasks";
import {Task} from "../Task/Task";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export interface AppContextProps {
  data: DataProps[];
  setData: Dispatch<SetStateAction<DataProps[]>>;
}

export const AppContext = createContext<AppContextProps>({
  data: [],
  setData: () => {},
})

function App() {
  const getLocalStorageData = () => {
    const localData = localStorage.getItem('data');
    return localData? JSON.parse(localData) : mockData;
  }

  const [data, setData] = useState<DataProps[]>(getLocalStorageData());

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
    console.log('localStorage updated')
  }, [data]);
  
  return (
    <AppContext.Provider value={{ data, setData }}>
      <div className={'App'}>
        <header>
          <Section className={'Header'} />
        </header>
        <main>
          <BrowserRouter>
            <Routes>
              <Route path={'/'} element={<Tasks />} />
              <Route path={'/:blockTitle/:taskId'} element={<Task />} />
            </Routes>
          </BrowserRouter>
        </main>
        <footer>
          <Section className={'Footer'} data={data}/>
        </footer>
      </div>
    </AppContext.Provider>
  )
}

export default App


