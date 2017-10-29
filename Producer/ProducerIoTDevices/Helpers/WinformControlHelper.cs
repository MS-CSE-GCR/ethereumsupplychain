using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ProducerIoTDevices.Helpers
{
    internal static class WinformControlHelper
    {
        static Random random = new Random((int)DateTime.UtcNow.Ticks);
        internal static string String(this TextBox txt)
        {
            return txt.Text.Trim();
        }
        internal static float Numeric(this TextBox txt)
        {
            float ret = float.NaN;
            float.TryParse(txt.Text.Trim(), out ret);

            return ret;
        }

        internal static float RandomNumeric(this TextBox txt, int randomPercentage)
        {
            float ret = float.NaN;
            if (float.TryParse(txt.Text.Trim(), out ret))
            {
                var factor = random.Next((int)(ret - (ret * randomPercentage) / 100), (int)(ret + (ret * randomPercentage) / 100));
                ret = (float)(factor + random.NextDouble());
            }
            return ret;
        }
    }
}
