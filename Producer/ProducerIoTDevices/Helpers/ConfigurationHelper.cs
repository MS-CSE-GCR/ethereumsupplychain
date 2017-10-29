using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProducerIoTDevices.Helpers
{
    internal class ConfigurationHelper
    {
        internal static string String(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }

        internal static float Value(string key)
        {
            float ret = float.NaN;
            float.TryParse(String(key), out ret);

            return ret;
        }

        internal static int Int(string key)
        {
            int ret = int.MinValue;
            int.TryParse(String(key), out ret);

            return ret;
        }
    }
}
