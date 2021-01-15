const randomGen = (minimum, maximum) => {
    let previousValue;
    return function random() {
        const number = Math.floor(
            (Math.random() * (maximum - minimum + 1)) + minimum
        );
        previousValue = number === previousValue && minimum !== maximum ? random() : number;
        return previousValue;
    };
};

module.exports = array => {
    const random = randomGen(0, array.length - 1);
    return () => array[random()];
};
