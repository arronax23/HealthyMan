using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;
using HealthyMan.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace HealthyMan.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class ConfigurationController : Controller
    {
        private SerialPort serialPort;
        public IActionResult Index()
        {
            ESP8266ConnectionData eSP8266ConnectionData = new ESP8266ConnectionData();

            eSP8266ConnectionData.MqttServerIpAdress = GetLocalIPAddress();
            ViewBag.PortNames = new List<SelectListItem>();
            foreach (string portName in SerialPort.GetPortNames())
            {
                ViewBag.PortNames.Add(new SelectListItem() { Text = portName, Value = portName });
            }
            
            return View(eSP8266ConnectionData);
        }

        [HttpPost]
        public IActionResult SendConnectionDataToESP8266(ESP8266ConnectionData eSP8266ConnectionData)
        {
            serialPort = new SerialPort(eSP8266ConnectionData.PortName, 115200, System.IO.Ports.Parity.None, 8, System.IO.Ports.StopBits.One);
            serialPort.Open();
            serialPort.Write($"config:{eSP8266ConnectionData.SSID}:{eSP8266ConnectionData.Password}:{eSP8266ConnectionData.MqttServerIpAdress}");
            serialPort.Close();
            return RedirectToAction(nameof(Index));
        }

        public IActionResult MosquittoConfFile()
        {
            return File("~/configuration/mosquitto.conf", "text/plain", "mosquitto.conf");
        }

        private static string GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }

            return "Exception";
        }
    }
}