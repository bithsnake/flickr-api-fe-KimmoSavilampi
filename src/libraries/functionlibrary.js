import reactIcon from '../assets/flickr.svg';

export const SetDummyImage = () => {
        const photo = document.getElementById('_img');
        if (photo === null || photo === undefined) return;
        photo.src = reactIcon; // dummy svg
}

export  const RemoveChildElementIfExistsFrom = (_parentElement) => {
    const dummyElement = document.getElementById('_dummycontent');
    if (dummyElement !== null)
    _parentElement.removeChild(dummyElement);
}
export  const RemoveChildElementsIn = (_element) => {
    _element.replaceChildren(''); 
}
export  const ElementContainsClass = (_element,_class) => {
    return _element.classList.contains(_class);
}
export  const SetStatusContentText = (_elementId,_message) => {
    document.getElementById(_elementId).innerHTML = _message;
}
export  const ToggleBackgroundColor = (_backgroundColor = 'bg-primary-dark') => {
    document.getElementById('_gallery').classList.toggle(_backgroundColor);
}
export const CreateNewPhotogalleryElement = (_imageData,_galleryElement) => {
    const div = document.createElement('div');
    // const title = document.createElement('h3');
    // title.innerHTML = imageData.title;
    div.classList.add('container','gap-2','responsive');
    let img = document.createElement("img");
    // img.classList.add('w-full', 'h-full');
    img.src = _imageData.url;
    img.height = "300px";
    img.width = "300px";
    _galleryElement.appendChild(div).appendChild(img);
}
export const CreateButtonIfNotExist = () => {
    const buttonExists = document.getElementById("_toggle_background");
    if (buttonExists !== null) return;
    const newButton = document.createElement('button');
    newButton.innerHTML = 'toggle Background';
    newButton.id = "_toggle_background";
    newButton.classList.add('button');
    newButton.addEventListener('click', ToggleBackgroundColor);
    document.getElementById('_search_box').appendChild(newButton);
}