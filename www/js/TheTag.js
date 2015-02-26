/**
* Created by Vlad on 2/24/2015.
*/
/// <reference path="Consts.ts" />
var tisensortag;
(function (tisensortag) {
    var TheTag = (function () {
        function TheTag() {
            this.requiredServices = [];
            this.errorFun = function (err) {
            };
            this.statusFun = function (err) {
            };
            this.accelerometerCallback = function (fun, interval) {
                this.accelerometerFun = fun;
                this.accelerometerInterval = interval;
                this.requiredServices.push(tisensortag.Consts.ACCELEROMETER_SERVICE);
                return this;
            };
            this.humidityCallback = function (fun) {
                this.humidityFun = fun;
                this.requiredServices.push(tisensortag.Consts.HUMIDITY_SERVICE);
                return this;
            };
            this.gyroscopeCallback = function (fun, axes, interval) {
                this.gyroscopeFun = fun;
                this.gyroscopeAxes = axes;
                this.gyroscopeInterval = interval;
                this.requiredServices.push(tisensortag.Consts.GYROSCOPE_SERVICE);
                return this;
            };
        }
        TheTag.prototype.irTemperatureCallback = function (fun) {
            this.irTemperatureFun = fun;
            this.requiredServices.push(tisensortag.Consts.IRTEMPERATURE_SERVICE);
            return this;
        };

        TheTag.prototype.magnetometerCallback = function (fun, interval) {
            this.magnetometerFun = fun;
            this.magnetometerInterval = interval;
            this.requiredServices.push(tisensortag.Consts.MAGNETOMETER_SERVICE);
            return this;
        };

        TheTag.prototype.barometerCallback = function (fun) {
            this.barometerFun = fun;
            this.requiredServices.push(tisensortag.Consts.BAROMETER_SERVICE);
            return this;
        };

        TheTag.prototype.keypressCallback = function (fun) {
            this.keypressFun = fun;
            this.requiredServices.push(tisensortag.Consts.KEYPRESS_SERVICE);
            return this;
        };
        TheTag.prototype.errorCallback = function (fun) {
            this.errorFun = fun;
            return this;
        };
        TheTag.prototype.statusCallback = function (fun) {
            this.statusFun = fun;
            return this;
        };

        TheTag.prototype.sensorOn = function (configUUID, configValue, periodUUID, periodValue, dataUUID, notificationUUID, notificationFunction) {
            if (!notificationFunction)
                return;

            configUUID && this.device.writeCharacteristic(configUUID, new Uint8Array([configValue]), function () {
            }, this.errorFun);
            periodUUID && periodValue && this.device.writeCharacteristic(periodUUID, new Uint8Array([periodValue / 10]), function () {
            }, this.errorFun);
            dataUUID && notificationUUID && this.device.writeDescriptor(dataUUID, notificationUUID, new Uint8Array([1, 0]), function () {
            }, this.errorFun);
            dataUUID && this.device.enableNotification(dataUUID, function (data) {
                notificationFunction(new Int8Array(data));
            }, this.errorFun);
            return this;
        };

        TheTag.prototype.sensorOff = function (dataUUID) {
            dataUUID && this.device.disableNotification(dataUUID, function () {
            }, this.errorFun);
            return this;
        };
        TheTag.prototype.disconnectDevice = function () {
        };

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        TheTag.prototype.irTemperatureOn = function () {
            this.sensorOn(tisensortag.Consts.IRTEMPERATURE_CONFIG, 1, null, null, tisensortag.Consts.IRTEMPERATURE_DATA, tisensortag.Consts.IRTEMPERATURE_NOTIFICATION, this.irTemperatureFun);
            return this;
        };
        TheTag.prototype.irTemperatureOff = function () {
            this.sensorOff(tisensortag.Consts.IRTEMPERATURE_DATA);
            return this;
        };

        TheTag.prototype.accelerometerOn = function () {
            this.sensorOn(tisensortag.Consts.ACCELEROMETER_CONFIG, 1, tisensortag.Consts.ACCELEROMETER_PERIOD, this.accelerometerInterval, tisensortag.Consts.ACCELEROMETER_DATA, tisensortag.Consts.ACCELEROMETER_NOTIFICATION, this.accelerometerFun);
            return this;
        };
        TheTag.prototype.accelerometerOff = function () {
            this.sensorOff(tisensortag.Consts.ACCELEROMETER_DATA);
            return this;
        };

        TheTag.prototype.humidityOn = function () {
            this.sensorOn(tisensortag.Consts.HUMIDITY_CONFIG, 1, null, null, tisensortag.Consts.HUMIDITY_DATA, tisensortag.Consts.HUMIDITY_NOTIFICATION, this.humidityFun);
            return this;
        };
        TheTag.prototype.humidityOff = function () {
            this.sensorOff(tisensortag.Consts.HUMIDITY_DATA);
            return this;
        };

        TheTag.prototype.magnetometerOn = function () {
            this.sensorOn(tisensortag.Consts.MAGNETOMETER_CONFIG, 1, tisensortag.Consts.MAGNETOMETER_PERIOD, this.magnetometerInterval, tisensortag.Consts.MAGNETOMETER_DATA, tisensortag.Consts.MAGNETOMETER_NOTIFICATION, this.magnetometerFun);
            return this;
        };
        TheTag.prototype.barometerOn = function () {
            this.sensorOn(tisensortag.Consts.BAROMETER_CONFIG, 1, null, null, tisensortag.Consts.BAROMETER_DATA, tisensortag.Consts.BAROMETER_NOTIFICATION, this.barometerFun);

            return this;
        };

        TheTag.prototype.barometerOff = function () {
            this.sensorOff(tisensortag.Consts.BAROMETER_DATA);
            return this;
        };

        TheTag.prototype.gyroscopeOn = function () {
            this.sensorOn(tisensortag.Consts.GYROSCOPE_CONFIG, this.gyroscopeAxes, tisensortag.Consts.GYROSCOPE_PERIOD, this.gyroscopeInterval, tisensortag.Consts.GYROSCOPE_DATA, tisensortag.Consts.GYROSCOPE_NOTIFICATION, this.gyroscopeFun);

            return this;
        };
        TheTag.prototype.gyroscopeOff = function () {
            this.sensorOff(tisensortag.Consts.GYROSCOPE_DATA);
            return this;
        };
        TheTag.prototype.keypressOn = function () {
            this.sensorOn(null, null, null, null, tisensortag.Consts.KEYPRESS_DATA, tisensortag.Consts.KEYPRESS_NOTIFICATION, this.keypressFun);
            return this;
        };
        TheTag.prototype.keypressOff = function () {
            this.sensorOff(tisensortag.Consts.KEYPRESS_DATA);
            return this;
        };

        //////////////////////////////////////////////////////////////////////////////////////////////////////
        TheTag.prototype.activateSensors = function () {
            console.log('Sensors online');
            this.irTemperatureOn();
            this.accelerometerOn();
            this.humidityOn();
            this.magnetometerOn();
            this.barometerOn();
            this.gyroscopeOn();
            this.keypressOn();
        };
        TheTag.prototype.onConnectError = function (err) {
            console.log('ERROR', err);
        };
        TheTag.prototype.onConnectSuccess = function (device) {
            device.readServices(this.requiredServices, this.activateSensors, this.errorFun);
        };
        TheTag.prototype.connectToDevice = function () {
            var _this = this;
            console.log('Connecting...');
            this.device.connect(function (dev) {
                return _this.onConnectSuccess(dev);
            }, function (err) {
                return _this.onConnectError(err);
            });
        };

        TheTag.prototype.onFoundDevice = function (device) {
            if (this.deviceIsSensorTag(device) && device.rssi != 127) {
                if (device.rssi > this.strongestRSSI) {
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
        };

        TheTag.prototype.onErrorScan = function (err) {
            console.log('Error Scan ', err);
        };

        TheTag.prototype.connectToClosestDevice = function () {
            var _this = this;
            console.log('Scanning...');
            this.disconnectDevice();
            this.easyble.stopScan();
            this.easyble.reportDeviceOnce(false);
            this.stopScanTime = Date.now() + 2000;
            this.closestDevice = null;
            this.strongestRSSI = -1000;
            this.easyble.startScan(function (device) {
                return _this.onFoundDevice(device);
            }, function (err) {
                return _this.onErrorScan(err);
            });
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
        };

        TheTag.prototype.deviceIsSensorTag = function (device) {
            return (device != null) && (device.name != null) && (device.name.indexOf('Sensor Tag') > -1 || device.name.indexOf('SensorTag') > -1);
        };
        return TheTag;
    })();
})(tisensortag || (tisensortag = {}));
//# sourceMappingURL=TheTag.js.map
