const imagesToLoad = doocument.querySelectorAll("img[data-src]");

const imgOptions = {
    threshold:  0,
    rootMargin:"0px 0px 50px 0px"
};

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute ('data-src'));
    image.onload = () => {image.removeAttribute('data-src');};
};

if ('IntersectionObserver' in  window)  {
    const imgObserver = new IntersectionObserver((items, Observer) => {
        items.forEach((item) => {
        });
    }, imgOptions);

    imagesTooLoad.forEach((img) => {
        imgObserver(img);
    });
}
else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}