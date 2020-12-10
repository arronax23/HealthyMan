function findpeaks(f,P1) {
    let peaks = [];
    for (i = 1; i < P1.length - 1; i++)
        if (P1[i] > P1[i - 1] && P1[i] > P1[i + 1]) {
            peaks.push({
                f: f[i],
                P1: P1[i]
            });
        }
    return peaks;
}