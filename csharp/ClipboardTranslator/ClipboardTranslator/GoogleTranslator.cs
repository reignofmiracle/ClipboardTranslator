using System;
using System.Collections.Generic;
using System.Net;
using System.Web;

namespace ClipboardTranslator
{
    public class GoogleTranslator
    {
        private WebClient webClient = new WebClient();

        public string Translate(string text, string translateFrom, string translateTo)
        {
            try
            {
                string url = String.Format("http://www.google.com/translate_t?hl={0}&ie=UTF8&text={1}&langpair={2}", translateFrom, HttpUtility.UrlEncode(text), translateFrom + "|" + translateTo);
                string html = webClient.DownloadString(url);
                int from = html.IndexOf("TRANSLATED_TEXT='") + "TRANSLATED_TEXT='".Length;
                int to = html.Substring(from).IndexOf("';var");
                var raw = html.Substring(from, to);
                var result = raw
                    .Replace(@"\r", "")
                    .Replace(@"\xa0", " ")
                    .Replace(@"\x3c", "<")
                    .Replace(@"\x3e", ">")
                    .Replace(@"\x26", "&")
                    .Replace(@"\x22", "\"")
                    .Replace(@"\x27", "'")
                    .Replace("<br>", " ");
                return result;
            }
            catch(Exception e)
            {
                return e.ToString();
            }
        }
    }
}
