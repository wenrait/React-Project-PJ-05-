import './User.css';
import userAvatar from '../../svg/user-avatar.svg';
import {Arrow} from "../Arrow/Arrow";
import {useState} from "react";

export const User = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = ['Profile', 'Log out']

  return (
    <div className={"User"}>
      <div className="User__avatar">
        <img src={userAvatar} alt="User avatar" />

      </div>
      <button className="User__button" onClick={() => setIsOpen(!isOpen)}><Arrow fill={'white'}/></button>
      {
        isOpen && (
          <div className={'User__dropdown'}>
            <div className={'User__dropdown__square'}></div>
            <div className={'User__dropdown__options'}>
              {
                options.map((option: string) => <div key={option} className={'User__dropdown__options__option'}>{option}</div>)
              }
            </div>
          </div>

        )
      }
    </div>
  )
}