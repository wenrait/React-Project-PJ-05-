import './User.css';
import userAvatar from '../../svg/user-avatar.svg';
import {Arrow} from "../Arrow/Arrow";
import {useState} from "react";

export const User = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = ['Profile', 'Log out']

  return (
    <div className={"user"}>
      <div className="user-avatar-container">
        <img src={userAvatar} alt="user-avatar" />

      </div>

      <button className="user-button" onClick={() => setIsOpen(!isOpen)}><Arrow fill={'white'}/></button>
      {
        isOpen && (

          <div className={'user-dropdown'}>
            <div className={'square'}></div>
            <div className={'user-dropdown-options'}>
              {
                options.map((option: string) => <div key={option} className={'user-dropdown-option'}>{option}</div>)
              }
            </div>
          </div>

        )
      }
    </div>
  )
}