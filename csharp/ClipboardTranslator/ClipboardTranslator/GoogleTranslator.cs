using System;
using System.Collections.Generic;
using System.Net;
using System.Web;

namespace ClipboardTranslator
{
    public class GoogleTranslator
    {
        private WebClient webClient = new WebClient();
        private List<string> filterList = new List<string> { "\\r", "\\x3cbr\\x3e", "\\x26quot;"};

        public string Translate(string text, string translateFrom, string translateTo)
        {
            try
            {
                string url = String.Format("http://www.google.com/translate_t?hl=en&ie=UTF8&text={0}&langpair={1}", HttpUtility.UrlEncode(text), translateFrom + "|" + translateTo);
                string html = webClient.DownloadString(url);
                int from = html.IndexOf("TRANSLATED_TEXT='") + "TRANSLATED_TEXT='".Length;
                int to = html.Substring(from).IndexOf("';var");
                var raw = html.Substring(from, to);
                var result = WebUtility.HtmlDecode(raw);
                this.filterList.ForEach(v => result = result.Replace(v, ""));
                return result;
            }
            catch(Exception e)
            {
                return e.ToString();
            }
        }
    }
}
