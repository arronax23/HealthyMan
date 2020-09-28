let threshold = {
    pulseValues: [],
    pulseTime: [],
    threshold: 1650,
    DN: 1650,
    P: 1650,
    enable1: false,
    enable2: false,
    thresholdArray: [1650],
    thresholdArrayTime: [0],
    calcThreshold: function () {
        for (let i = 0; i < this.pulseValues.length; i++) {
            if (this.pulseValues[i] > this.threshold && this.enable2 == true) {

                this.threshold = this.P - this.DN;
                this.thresholdArray.push(this.threshold);
                this.thresholdArrayTime.push(this.pulseTime[i]);
                this.enable1 = false;
                this.enable2 = false;

            }
            else if (this.pulseValues[i] < this.threshold) {
                this.enable2 = true;
            }
                

            if (this.pulseValues[i] < this.threshold && this.pulseValues[i] < this.DN) {
                this.DN = this.pulseValues[i];
            }
            else if (this.pulseValues[i] > this.threshold && this.pulseValues[i] > this.P) {
                this.P = this.pulseValues[i];
            }


        }  
    }
}