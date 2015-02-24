/**
 * Created by Vlad on 2/24/2015.
 */

module tisensortag {
  export class Consts {
        public static ACCELEROMETER_SERVICE = 'f000aa10-0451-4000-b000-000000000000'
        public static ACCELEROMETER_CONFIG = 'f000aa12-0451-4000-b000-000000000000'

        public static ACCELEROMETER_PERIOD = 'f000aa13-0451-4000-b000-000000000000'
        public static ACCELEROMETER_DATA = 'f000aa11-0451-4000-b000-000000000000'
        public static ACCELEROMETER_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb'

        public static IRTEMPERATURE_SERVICE = 'f000aa00-0451-4000-b000-000000000000';
        public static IRTEMPERATURE_CONFIG = 'f000aa02-0451-4000-b000-000000000000';
        public static IRTEMPERATURE_DATA = 'f000aa01-0451-4000-b000-000000000000';
        public static IRTEMPERATURE_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb';

        public static HUMIDITY_SERVICE = 'f000aa20-0451-4000-b000-000000000000';
        public static HUMIDITY_CONFIG = 'f000aa22-0451-4000-b000-000000000000';
        public static HUMIDITY_DATA = 'f000aa21-0451-4000-b000-000000000000';
        public static HUMIDITY_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb';

        public static MAGNETOMETER_SERVICE = 'f000aa30-0451-4000-b000-000000000000';
        public static MAGNETOMETER_CONFIG = 'f000aa32-0451-4000-b000-000000000000';
        public static MAGNETOMETER_PERIOD = 'f000aa33-0451-4000-b000-000000000000';
        public static MAGNETOMETER_DATA = 'f000aa31-0451-4000-b000-000000000000';
        public static MAGNETOMETER_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb';

        public static BAROMETER_SERVICE = 'f000aa40-0451-4000-b000-000000000000';
        public static BAROMETER_CONFIG = 'f000aa42-0451-4000-b000-000000000000';
        public static BAROMETER_DATA = 'f000aa41-0451-4000-b000-000000000000';
        public static BAROMETER_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb';
        public static BAROMETRIC_PRESSURE_CALIBRATION = 'f000aa4304514000b000000000000000';

        public static GYROSCOPE_SERVICE = 'f000aa50-0451-4000-b000-000000000000';
        public static GYROSCOPE_CONFIG = 'f000aa52-0451-4000-b000-000000000000';
        public static GYROSCOPE_PERIOD = 'f000aa53-0451-4000-b000-000000000000';
        public static GYROSCOPE_DATA = 'f000aa51-0451-4000-b000-000000000000';
        public static GYROSCOPE_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb';

        public static KEYPRESS_SERVICE = '0000ffe0-0000-1000-8000-00805f9b34fb';
        public static KEYPRESS_DATA = '0000ffe1-0000-1000-8000-00805f9b34fb';
        public static KEYPRESS_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb';

        // FROM node
        public static GENERIC_ACCESS = '1800';
        public static GENERIC_ATTRIBUTE = '1801';
        public static DEVICE_INFORMATION = '180a';
        public static SIMPLE_KEY = 'ffe0';
        public static TEST = 'f000aa6004514000b000000000000000';
        public static TEST_CONFIGURATION = 'f000aa6204514000b000000000000000';
        public static OAD = 'f000ffc004514000b000000000000000';
        public static DEVICE_NAME = '2a00';
        public static APPEARANCE = '2a01';
        public static PERIPHERAL_PRIVACY_FLAG = '2a02';
        public static RECONNECTION_ADDRESS = '2a03';
        public static PERIPHERAL_PREFERRED_CONNECTION_PARAMETERS = '2a04';

        public static SYSTEM_ID = '2a23';
        public static MODEL_NUMBER = '2a24';
        public static SERIAL_NUMBER = '2a25';
        public static FIRMWARE_REVISION = '2a26';
        public static HARDWARE_REVISION = '2a27';
        public static SOFTWARE_REVISION = '2a28';
        public static MANUFACTURER_NAME = '2a29';
        public static REGULATORY_CERTIFICATE_DATA_LIST = '2a2a';
        public static PNP_ID = '2a50';
        public static SIMPLE_KEY_DATA = 'ffe1';
    }
}