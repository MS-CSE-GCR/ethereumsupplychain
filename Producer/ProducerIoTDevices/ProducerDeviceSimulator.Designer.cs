namespace ProducerIoTDevices
{
    partial class ProducerDeviceSimulator
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.start = new System.Windows.Forms.Button();
            this.label7 = new System.Windows.Forms.Label();
            this.stop = new System.Windows.Forms.Button();
            this.log = new System.Windows.Forms.TextBox();
            this.label8 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.iotHubConnectionString = new System.Windows.Forms.TextBox();
            this.buildingId = new System.Windows.Forms.TextBox();
            this.batchId = new System.Windows.Forms.TextBox();
            this.interval = new System.Windows.Forms.TextBox();
            this.n2 = new System.Windows.Forms.TextBox();
            this.o2 = new System.Windows.Forms.TextBox();
            this.co2 = new System.Windows.Forms.TextBox();
            this.pm25 = new System.Windows.Forms.TextBox();
            this.humidity = new System.Windows.Forms.TextBox();
            this.temperature = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(18, 34);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(67, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "Temperature";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(18, 63);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(47, 13);
            this.label2.TabIndex = 1;
            this.label2.Text = "Humidity";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(18, 92);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(38, 13);
            this.label3.TabIndex = 2;
            this.label3.Text = "PM2.5";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(18, 121);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(28, 13);
            this.label4.TabIndex = 6;
            this.label4.Text = "CO2";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(18, 150);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(21, 13);
            this.label5.TabIndex = 8;
            this.label5.Text = "O2";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(18, 179);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(21, 13);
            this.label6.TabIndex = 10;
            this.label6.Text = "N2";
            // 
            // start
            // 
            this.start.Location = new System.Drawing.Point(21, 290);
            this.start.Name = "start";
            this.start.Size = new System.Drawing.Size(75, 23);
            this.start.TabIndex = 12;
            this.start.Text = "&Start";
            this.start.UseVisualStyleBackColor = true;
            this.start.Click += new System.EventHandler(this.start_Click);
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(18, 211);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(56, 13);
            this.label7.TabIndex = 13;
            this.label7.Text = "Interval (s)";
            // 
            // stop
            // 
            this.stop.Location = new System.Drawing.Point(121, 290);
            this.stop.Name = "stop";
            this.stop.Size = new System.Drawing.Size(75, 23);
            this.stop.TabIndex = 15;
            this.stop.Text = "S&top";
            this.stop.UseVisualStyleBackColor = true;
            this.stop.Click += new System.EventHandler(this.stop_Click);
            // 
            // log
            // 
            this.log.Location = new System.Drawing.Point(211, 31);
            this.log.Multiline = true;
            this.log.Name = "log";
            this.log.ReadOnly = true;
            this.log.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.log.Size = new System.Drawing.Size(594, 253);
            this.log.TabIndex = 16;
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(18, 8);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(133, 13);
            this.label8.TabIndex = 17;
            this.label8.Text = "IoT Hub Connection String";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(18, 241);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(46, 13);
            this.label9.TabIndex = 19;
            this.label9.Text = "BatchID";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(18, 267);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(37, 13);
            this.label10.TabIndex = 21;
            this.label10.Text = "Bld. Id";
            // 
            // iotHubConnectionString
            // 
            this.iotHubConnectionString.Location = new System.Drawing.Point(154, 5);
            this.iotHubConnectionString.Name = "iotHubConnectionString";
            this.iotHubConnectionString.Size = new System.Drawing.Size(651, 20);
            this.iotHubConnectionString.TabIndex = 18;
            // 
            // buildingId
            // 
            this.buildingId.Location = new System.Drawing.Point(96, 264);
            this.buildingId.Name = "buildingId";
            this.buildingId.Size = new System.Drawing.Size(100, 20);
            this.buildingId.TabIndex = 22;
            this.buildingId.Text = "Bld001";
            // 
            // batchId
            // 
            this.batchId.Location = new System.Drawing.Point(96, 238);
            this.batchId.Name = "batchId";
            this.batchId.Size = new System.Drawing.Size(100, 20);
            this.batchId.TabIndex = 20;
            this.batchId.Text = "A001";
            // 
            // interval
            // 
            this.interval.Location = new System.Drawing.Point(96, 208);
            this.interval.Name = "interval";
            this.interval.Size = new System.Drawing.Size(100, 20);
            this.interval.TabIndex = 14;
            this.interval.Text = "3";
            // 
            // n2
            // 
            this.n2.Location = new System.Drawing.Point(96, 176);
            this.n2.Name = "n2";
            this.n2.Size = new System.Drawing.Size(100, 20);
            this.n2.TabIndex = 11;
            this.n2.Text = "56";
            // 
            // o2
            // 
            this.o2.Location = new System.Drawing.Point(96, 147);
            this.o2.Name = "o2";
            this.o2.Size = new System.Drawing.Size(100, 20);
            this.o2.TabIndex = 9;
            this.o2.Text = "24";
            // 
            // co2
            // 
            this.co2.Location = new System.Drawing.Point(96, 118);
            this.co2.Name = "co2";
            this.co2.Size = new System.Drawing.Size(100, 20);
            this.co2.TabIndex = 7;
            this.co2.Text = "13";
            // 
            // pm25
            // 
            this.pm25.Location = new System.Drawing.Point(96, 89);
            this.pm25.Name = "pm25";
            this.pm25.Size = new System.Drawing.Size(100, 20);
            this.pm25.TabIndex = 5;
            this.pm25.Text = "12";
            // 
            // humidity
            // 
            this.humidity.Location = new System.Drawing.Point(96, 60);
            this.humidity.Name = "humidity";
            this.humidity.Size = new System.Drawing.Size(100, 20);
            this.humidity.TabIndex = 4;
            this.humidity.Text = "45";
            // 
            // temperature
            // 
            this.temperature.Location = new System.Drawing.Point(96, 31);
            this.temperature.Name = "temperature";
            this.temperature.Size = new System.Drawing.Size(100, 20);
            this.temperature.TabIndex = 3;
            this.temperature.Text = "22";
            // 
            // ProducerDeviceSimulator
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(817, 316);
            this.Controls.Add(this.buildingId);
            this.Controls.Add(this.label10);
            this.Controls.Add(this.batchId);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.iotHubConnectionString);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.log);
            this.Controls.Add(this.stop);
            this.Controls.Add(this.interval);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.start);
            this.Controls.Add(this.n2);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.o2);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.co2);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.pm25);
            this.Controls.Add(this.humidity);
            this.Controls.Add(this.temperature);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Name = "ProducerDeviceSimulator";
            this.Text = "Producer Device";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox temperature;
        private System.Windows.Forms.TextBox humidity;
        private System.Windows.Forms.TextBox pm25;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox co2;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.TextBox o2;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox n2;
        private System.Windows.Forms.Button start;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.TextBox interval;
        private System.Windows.Forms.Button stop;
        private System.Windows.Forms.TextBox log;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.TextBox iotHubConnectionString;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.TextBox batchId;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.TextBox buildingId;
    }
}

