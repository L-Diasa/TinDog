import profileIcon from '../images/icon-profile.png'
import logoIcon from '../images/logo.png'
import chatIcon from '../images/icon-chat.png'

export default function Header() {
  return (
    <header>
        <img src={profileIcon} alt="profile" />
        <img src={logoIcon} alt="logo" className='logo'/>
        <img src={chatIcon} alt="chat" />
    </header>
  )
}
