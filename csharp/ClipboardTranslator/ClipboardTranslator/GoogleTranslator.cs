using System;
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
                string url = String.Format("http://www.google.com/translate_t?hl=en&ie=UTF8&text={0}&langpair={1}", HttpUtility.UrlEncode(text), translateFrom + "|" + translateTo);
                string html = webClient.DownloadString(url);
                int from = html.IndexOf("TRANSLATED_TEXT='") + "TRANSLATED_TEXT='".Length;
                int to = html.Substring(from).IndexOf("';var");
                var result = html.Substring(from, to);
                return result;
            }
            catch
            {
                return "";
            }
        }
    }
}
