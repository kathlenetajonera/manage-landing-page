new Splide( '.splide' ).mount();

let splide = new Splide('.splide', {
    type         : 'loop',
    start        : 1,
    perPage      : 1,
    gap          : '1rem',
    easing       : 'ease',
    autoplay     : true,
    interval     : 1500,
    pauseOnHover : true,
    pauseOnFocus : true,
    resetProgress: false
}).mount();
