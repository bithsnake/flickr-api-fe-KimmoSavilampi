import axios from 'axios';
import { useLocalhost } from './config/config';
import {
  RemoveChildElementIfExistsFrom,
  CreateButtonIfNotExist,
  CreateNewPhotogalleryElement,
  ElementContainsClass,
  RemoveChildElementsIn,
  SetStatusContentText,
} from "./libraries/functionlibrary";

function generatePhotos() {
    
    if (useLocalhost) {
        const config = {
            headers : {Accept : 'application/json'},
            method: 'get',
            url: 'http://localhost:5000/photos',
            data: '',
            body : { searchString : ''}
        }
        const statusContentId = document.getElementById('_status_content').id;
        
        SetStatusContentText(statusContentId, 'Loading...');
        const inputText = document.getElementById('_input_text');
        if (inputText.value.length === 0) {
            SetStatusContentText(statusContentId, 'You have to type in a keyword...');
            return;
        }
        let trimmedtext = String(inputText.value).trim().toLowerCase().replace(/\s/g, ''); // remove whitespaces
        config.body.searchString = trimmedtext;
        config.data = trimmedtext;
        
        axios.post('http://localhost:5000/photos',config).then(res => {
            const arrayLength = (res.data.length > 20) ? 20 : res.data.length;
            const galleryElement = document.getElementById('_gallery');

            console.log(`The response contains : ${res}`);

            if (res.status === 404) {
                SetStatusContentText(statusContentId, 'Something went wrong🙁');
                return;
            }
            if (arrayLength === 0) {
                SetStatusContentText(statusContentId, 'Your search resultet in 0 photos 🙁! ');
                return;
            }

            SetStatusContentText(statusContentId, 'Found data, outputting data!');
            
            RemoveChildElementIfExistsFrom(galleryElement);

            if (!ElementContainsClass(galleryElement,'container-full')) {
                galleryElement.classList.add('container-full');
            }

            CreateButtonIfNotExist();

            RemoveChildElementsIn(galleryElement);
            for (let i = 0; i < arrayLength; i++) {
                const element = res.data[i];
                CreateNewPhotogalleryElement(element,galleryElement);
            }

            SetStatusContentText(statusContentId, 'Enjoy your photos 🔥! ');

            setTimeout(() => {
                SetStatusContentText(statusContentId, 'Ready to start a new search! 🔥');
            }, 3000);

        })
            .catch(error => {
                // console.log("error: ", error);
                if (error.response === undefined || error.response === null) {
                    SetStatusContentText(statusContentId, `OOPS!..\n${error.toJSON().message}.\nCheck your browser console for status`);
                    return;
                }
                SetStatusContentText(statusContentId, `${error.response.data.statusText}. \n ${error.toJSON().message} `);
                return;
            }
            );
    } else if (!useLocalhost) {
        const config = {
            headers : {Accept : 'application/json'},
        }
        axios.get('https://icanhazdadjoke.com', config).then(res => {
            document.getElementById('_status_content').innerHTML = res.data.joke;
        });
    }

};
export default generatePhotos;