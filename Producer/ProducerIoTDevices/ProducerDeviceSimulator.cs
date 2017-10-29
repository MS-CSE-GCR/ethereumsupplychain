using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ProducerIoTDevices.Helpers;
using ProducerIoTDevices.Helpers;

namespace ProducerIoTDevices
{
    public partial class ProducerDeviceSimulator : Form
    {
        private IoTHubClientHelper iot = null;
        public ProducerDeviceSimulator()
        {
            InitializeComponent();
            iotHubConnectionString.Text = ConfigurationHelper.String("iotHubConnectionString");

        }
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

        }
        private string AggregateTelemetry()
        {
            var msg = new
            {
                Temperature = temperature.RandomNumeric(10),
                Humidity = humidity.RandomNumeric(10),
                N2 = n2.RandomNumeric(10),
                O2 = o2.RandomNumeric(10),
                CO2 = co2.RandomNumeric(10),
                PM25 = pm25.RandomNumeric(10),
                BatchId = batchId.String(),
                BuildingId = buildingId.String()
            };

            return Newtonsoft.Json.JsonConvert.SerializeObject(msg);
        }
        private void start_Click(object sender, EventArgs e)
        {
            if(iot == null)
            {
                iot = new IoTHubClientHelper(iotHubConnectionString.String(),(int)interval.Numeric());
                iot.AggregateTelemetry += AggregateTelemetry;
                iot.TelemetrySent += TelemetrySent;
            }
            iot.Start();
        }
        private delegate void TelemetrySentDelegation(TelemetryEventArgv e);
        private void TelemetrySent(TelemetryEventArgv e)
        {
            if (!log.InvokeRequired)
            {
                var sb = new StringBuilder(log.Text);
                if(sb.Length > 1024 * 1024)
                {
                    sb = sb.Remove(0, 1024 * 512);
                }
                sb.Append($"[{e.Timestamp.ToString("yyyy-MM-dd HH:mm:ss.ffffff")}]{e.Payload}").Append(Environment.NewLine);
                log.Text = sb.ToString();
            }
            else
            {
                log.Invoke(new TelemetrySentDelegation(TelemetrySent), e);
            }
        }

        private void stop_Click(object sender, EventArgs e)
        {
            iot.Stop();
        }
    }
}
