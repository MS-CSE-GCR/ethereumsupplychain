using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Devices.Client;
using Microsoft.Azure.Devices;
using System.Threading;


namespace ProducerIoTDevices.Helpers
{
    internal class TelemetryEventArgv
    {
        internal string Payload { get; set; }
        internal DateTime Timestamp { get; set; }
    }
    internal class IoTHubClientHelper
    {
        private string connString = null;
        private int telemetryInterval = 0;
        private bool running = false;
        private object locker = new object();
        private DeviceClient iotClient = null;
        internal delegate string AggregateTelemetryHandler();
        internal event AggregateTelemetryHandler AggregateTelemetry;
        internal delegate void TelemetrySentHandler(TelemetryEventArgv e);
        internal event TelemetrySentHandler TelemetrySent;

        private Thread telemetryThread = null;

       
        internal bool IsRunning
        {
            get
            {
                lock (locker) { return running; }
            }
            private set
            {
                lock (locker) { running = value; }
            }
        }
        private DeviceClient GetDeviceClient()
        {
            if(iotClient == null)
            {
                iotClient = DeviceClient.CreateFromConnectionString(connString, TransportType.Http1);
                Task.WhenAll(iotClient.OpenAsync());
            }
            return iotClient;
        }
        internal void Start()
        {
            Stop();
            IsRunning = true;
            telemetryThread = new Thread(new ThreadStart(() => {
                while (IsRunning)
                {
                    //get telemetry json and send to iot hub
                    var client = GetDeviceClient();
                    var message = AggregateTelemetry();
                    Task.WaitAll(client.SendEventAsync(new Message(Encoding.UTF8.GetBytes(message))));
                    TelemetrySent(new TelemetryEventArgv
                    {
                        Payload = message,
                        Timestamp = DateTime.UtcNow
                    });
                    Thread.Sleep(telemetryInterval * 1000);
                }
            }));
            telemetryThread.Start();
        }
        internal void Stop()
        {
            if (telemetryThread != null && telemetryThread.ThreadState == ThreadState.Running)
            {
                telemetryThread.Join(3000);
                telemetryThread.Abort();
                telemetryThread = null;
                IsRunning = false;
            }
        }

       
        internal void Dispose()
        {
            Stop();
            if (iotClient != null)
            {
                Task.WaitAll(iotClient.CloseAsync());
                iotClient = null;
            }
        }

        internal IoTHubClientHelper(string connectString, int interval)
        {
            connString = connectString;
            telemetryInterval = interval;
        }
    }
}
