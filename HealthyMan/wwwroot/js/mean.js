﻿function mean(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += data[i];

    return sum / data.length;
}