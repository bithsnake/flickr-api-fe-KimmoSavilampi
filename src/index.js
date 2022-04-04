import generatePhotos from './generatePhotos';
import './styles/main.scss';
import {SetDummyImage} from './libraries/functionlibrary'

// sätt tillfälligt bild element
SetDummyImage();
// lägg till en referens till en function på knappen för att söka bilder
document.getElementById('_button').addEventListener('click', generatePhotos);