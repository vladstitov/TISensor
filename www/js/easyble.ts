/**
 * Created by Vlad on 2/25/2015.
 */
    var evothings:any;

module tisensortag{
    class EasyBLE{
        private reportDeviceOnce:boolean = false;
        private readCounter:number = 0;

        private internal:InternalClass = new tisensortag.InternalClass();
        constructor(){

        }

    }



   export class InternalClass{

        constructor(){}
      addMethodsToDeviceObject(device) {
       /** Connect to the device. */
       device.connect = function(win, fail)
       {
           internal.connectToDevice(device, win, fail);
       };

       /** Close the device. */
       device.close = function()
       {
           device.deviceHandle && evothings.ble.close(device.deviceHandle);
       };

       /** Read devices RSSI. Device must be connected. */
       device.readRSSI = function(win, fail)
       {
           evothings.ble.rssi(device.deviceHandle, win, fail);
       };

       /** Read all service info for the specified service UUIDs.
        // If serviceUUIDs is null, info for all services is read
        // (this can be time-consuming compared to reading a
        // selected number of services). */
       device.readServices = function(serviceUUIDs, win, fail)
       {
           internal.readServices(device, serviceUUIDs, win, fail);
       };

       /** Read value of characteristic. */
       device.readCharacteristic = function(characteristicUUID, win, fail)
       {
           internal.readCharacteristic(device, characteristicUUID, win, fail);
       };

       /** Read value of descriptor. */
       device.readDescriptor = function(characteristicUUID, descriptorUUID, win, fail)
       {
           internal.readDescriptor(device, characteristicUUID, descriptorUUID, win, fail);
       };

       /** Write value of characteristic. */
       device.writeCharacteristic = function(characteristicUUID, value, win, fail)
       {
           internal.writeCharacteristic(device, characteristicUUID, value, win, fail);
       };

       /** Write value of descriptor. */
       device.writeDescriptor = function(characteristicUUID, descriptorUUID, value, win, fail)
       {
           internal.writeDescriptor(device, characteristicUUID, descriptorUUID, value, win, fail);
       };

       /** Subscribe to characteristic value updates. */
       device.enableNotification = function(characteristicUUID, win, fail)
       {
           internal.enableNotification(device, characteristicUUID, win, fail);
       };

       /** Unsubscribe from characteristic updates. */
       device.disableNotification = function(characteristicUUID, win, fail)
       {
           internal.disableNotification(device, characteristicUUID, win, fail);
       };
   };
    }
}



