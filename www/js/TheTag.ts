/**
 * Created by Vlad on 2/24/2015.
 */
    /// <reference path="Consts.ts" />
module tisensortag{
    class TheTag{

        private requiredServices:string[] =[]
        private errorFun:Function =function(err){};
        private statusFun:Function = function(err){};

        private irTemperatureFun:Function;
        irTemperatureCallback(fun:Function):TheTag{
            this.irTemperatureFun = fun;
            this.requiredServices.push(Consts.IRTEMPERATURE_SERVICE);
            return this
        }

        private accelerometerInterval:number;
        private accelerometerFun:Function;
        accelerometerCallback = function(fun:Function, interval:number):TheTag  {
            this.accelerometerFun = fun;
            this.accelerometerInterval = interval
            this.requiredServices.push(Consts.ACCELEROMETER_SERVICE);
            return this;
        }

        private humidityFun:Function;
        humidityCallback = function(fun):TheTag{
            this.humidityFun = fun;
            this.requiredServices.push(Consts.HUMIDITY_SERVICE);
            return this;
        }

        private magnetometerFun:Function;
        private magnetometerInterval:number;
        magnetometerCallback(fun:Function, interval:number):TheTag {
            this.magnetometerFun = fun;
            this.magnetometerInterval = interval;
            this.requiredServices.push(Consts.MAGNETOMETER_SERVICE);
            return this;
        }

        private barometerFun:Function;
        barometerCallback(fun:Function):TheTag {
            this.barometerFun = fun;
            this.requiredServices.push(Consts.BAROMETER_SERVICE);
            return this;
        }

        private gyroscopeFun:Function;
        private gyroscopeAxes:any
        private gyroscopeInterval:number;
        gyroscopeCallback = function(fun:Function, axes, interval):TheTag {
            this.gyroscopeFun = fun
            this.gyroscopeAxes = axes
            this.gyroscopeInterval = interval
            this.requiredServices.push(Consts.GYROSCOPE_SERVICE);
            return this
        }

        private keypressFun:Function;
        keypressCallback(fun:Function):TheTag{
            this.keypressFun = fun
            this.requiredServices.push(Consts.KEYPRESS_SERVICE);
            return this
        }
        errorCallback(fun:Function):TheTag{
            this.errorFun=fun
        return this;
        }
        statusCallback(fun):TheTag {
            this.statusFun = fun;
            return this;
        }

        private device:any;

        sensorOn( configUUID,configValue, periodUUID,periodValue,dataUUID,notificationUUID,notificationFunction) {
            if (!notificationFunction)  return;

            configUUID && this.device.writeCharacteristic(configUUID, new Uint8Array([configValue]),function() {}, this.errorFun);
            periodUUID && periodValue && this.device.writeCharacteristic( periodUUID, new Uint8Array([periodValue / 10]), function() {},this.errorFun);
            dataUUID && notificationUUID && this.device.writeDescriptor( dataUUID,  notificationUUID,  new Uint8Array([1,0]), function() {},this.errorFun);
            dataUUID && this.device.enableNotification(dataUUID, function(data) { notificationFunction(new Int8Array(data)) },this.errorFun);
            return this;
        }

        sensorOff(dataUUID):TheTag  {
            dataUUID && this.device.disableNotification( dataUUID,function() {},this.errorFun);
            return this
        }
        disconnectDevice(){

        }
        easyble:any;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        private irTemperatureOn():TheTag {
            this.sensorOn(
                Consts.IRTEMPERATURE_CONFIG,
                1,
                null,
                null,
                Consts.IRTEMPERATURE_DATA,
                Consts.IRTEMPERATURE_NOTIFICATION,
                this.irTemperatureFun
            );
            return this }
        private irTemperatureOff() {this.sensorOff(Consts.IRTEMPERATURE_DATA);  return this;}

        private accelerometerOn():TheTag{
            this.sensorOn(
                Consts.ACCELEROMETER_CONFIG,
                1,
                Consts.ACCELEROMETER_PERIOD,
                this.accelerometerInterval,
                Consts.ACCELEROMETER_DATA,
                Consts.ACCELEROMETER_NOTIFICATION,
                this.accelerometerFun
            );
            return this;}
        private accelerometerOff():TheTag{this.sensorOff(Consts.ACCELEROMETER_DATA); return this; }

        private humidityOn():TheTag{
        this.sensorOn(
                Consts.HUMIDITY_CONFIG,
                1,
                null,
                null,
                Consts.HUMIDITY_DATA,
                Consts.HUMIDITY_NOTIFICATION,
                this.humidityFun
            )
        return this;
        }
        private humidityOff():TheTag{  this.sensorOff(Consts.HUMIDITY_DATA); return this; }

        private magnetometerOn ():TheTag{
        this.sensorOn(
                Consts.MAGNETOMETER_CONFIG,
                1, // Sensor on.
                Consts.MAGNETOMETER_PERIOD,
                this.magnetometerInterval,
                Consts.MAGNETOMETER_DATA,
                Consts.MAGNETOMETER_NOTIFICATION,
                this.magnetometerFun
            );
        return this;
    }
        barometerOn ():TheTag {
        this.sensorOn(
            Consts.BAROMETER_CONFIG,
            1, // Sensor on.
            null, // Not used.
            null, // Not used.
            Consts.BAROMETER_DATA,
            Consts.BAROMETER_NOTIFICATION,
            this.barometerFun
            )

            return this;
        }

        barometerOff():TheTag{
        this.sensorOff(Consts.BAROMETER_DATA);
        return this
        }

        gyroscopeOn ():TheTag {
        this.sensorOn(
            Consts.GYROSCOPE_CONFIG,
            this.gyroscopeAxes,
            Consts.GYROSCOPE_PERIOD,
            this.gyroscopeInterval,
            Consts.GYROSCOPE_DATA,
            Consts.GYROSCOPE_NOTIFICATION,
            this.gyroscopeFun
            )

            return this;
        }
        gyroscopeOff():TheTag {
        this.sensorOff(Consts.GYROSCOPE_DATA);
        return this
        }
        keypressOn ():TheTag {
        this.sensorOn(
            null, // Not used.
            null, // Not used.
            null, // Not used.
            null, // Not used.
            Consts.KEYPRESS_DATA,
            Consts.KEYPRESS_NOTIFICATION,
            this.keypressFun
        )
        return this;
    }
        keypressOff():TheTag {
        this.sensorOff(Consts.KEYPRESS_DATA);
        return this;
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////
        private activateSensors():void{
            console.log('Sensors online');
            this.irTemperatureOn();
            this.accelerometerOn();
            this.humidityOn();
            this.magnetometerOn();
            this.barometerOn();
            this.gyroscopeOn();
            this.keypressOn();
        }
        private onConnectError(err):void{
            console.log('ERROR',err);
        }
        private onConnectSuccess(device):void{
            device.readServices(this.requiredServices,this.activateSensors,this.errorFun);
        }
        private connectToDevice():void{
            console.log('Connecting...');
            this.device.connect((dev)=>this.onConnectSuccess(dev),(err)=>this.onConnectError(err));

        }

        private onFoundDevice(device){
           if(this.deviceIsSensorTag(device) && device.rssi != 127){
                if(device.rssi > this.strongestRSSI){
                    this.closestDevice = device;
                    this.strongestRSSI = device.rssi;
                }
               if (Date.now() >= this.stopScanTime) {
                   console.log('SensorTag found');
                   this.easyble.stopScan();
                   this.device = this.closestDevice;
                   this.connectToDevice();
               }
           }
        }



        private onErrorScan(err):void{
            console.log('Error Scan ',err);
        }
        private stopScanTime:number;
        private closestDevice:any;
        private strongestRSSI:number;

        connectToClosestDevice(){
            console.log('Scanning...');
            this.disconnectDevice();
            this.easyble.stopScan();
            this.easyble.reportDeviceOnce(false);
            this.stopScanTime = Date.now() + 2000
            this.closestDevice = null
            this.strongestRSSI = -1000;
            this.easyble.startScan((device)=>this.onFoundDevice(device),(err)=>this.onErrorScan(err));
            /*
            this.easyble.startScan(function(device)            {

                    if (sensortag.deviceIsSensorTag(device) && device.rssi != 127)// Invalid RSSI value
                    {
                        if (device.rssi > strongestRSSI){
                            closestDevice = device
                            strongestRSSI = device.rssi
                        }

                        if (Date.now() >= stopScanTime)
                        {
                            instance.statusFun('SensorTag found')
                            easyble.stopScan()
                            instance.device = closestDevice
                            instance.connectToDevice()
                        }
                    }
                },
                function(errorCode)
                {
                    instance.errorFun('Scan failed')
                })
            */
        }


        deviceIsSensorTag(device) {
            return (device != null) && (device.name != null) &&  (device.name.indexOf('Sensor Tag') > -1 ||  device.name.indexOf('SensorTag') > -1)
        }
    }
}