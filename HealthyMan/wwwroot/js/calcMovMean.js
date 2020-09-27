function calcMovMean(data, windowSize) {
    let wingSize = (windowSize - 1) / 2;
    let temp = [];
    let movMean = [];

    for (let j = 0; j < data.length; j++) {
        let first = j - wingSize;
        if (first < 0) first = 0;

        let last = j + wingSize;
        if (last > data.length - 1) last = data.length - 1;

        for (let i = first; i <= last; i++) temp.push(data[i]);

        movMean[j] = mean(temp);
        temp.length = 0;
    }
    return movMean;
}
