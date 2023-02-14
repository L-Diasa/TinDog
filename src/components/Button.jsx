import heartIcon from '../images/icon-heart.png'
import crossIcon from '../images/icon-cross.png'

export default function Button({ disabled, iconName, handleClick }) {
    let iconSrc = ""

    if (iconName === 'heart') {
      iconSrc = heartIcon;
    } else if (iconName === 'cross') {
      iconSrc = crossIcon;
    } 
  
    return (
        <button 
            disabled={disabled} 
            onClick={handleClick} 
            className={iconName}
        >
            <img 
                src={iconSrc} 
                alt={iconName}
            />
        </button>
    )
}