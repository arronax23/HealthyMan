using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyMan.Models
{
    public class ESP8266ConnectionData
    {
        public string SSID { get; set; }
        public string Password { get; set; }
        [Display(Name = "MQTT Server IP Adress")]
        public string MqttServerIpAdress { get; set; }
        [Display(Name = "Port Name")]
        public string PortName { get; set; }
    }
}
