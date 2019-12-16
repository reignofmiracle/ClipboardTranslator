using HtmlAgilityPack;
using Jurassic;
using System;
using System.Net;
using System.Web;

namespace ClipboardTranslator
{
    public class GoogleTranslator
    {
        private WebClient webClient = new WebClient();        
        private ScriptEngine scriptEngine = new ScriptEngine();
        private HtmlDocument htmlDocument = new HtmlDocument();

        public string Translate(string text, string translateFrom, string translateTo)
        {
            try
            {
                string url = String.Format("http://www.google.com/translate_t?hl={0}&ie=UTF8&text={1}&langpair={2}", translateFrom, HttpUtility.UrlEncode(text), translateFrom + "|" + translateTo);
                string html = webClient.DownloadString(url);
                int from = html.IndexOf("TRANSLATED_TEXT='");
                int to = html.IndexOf("';var", from);
                var sub = html.Substring(from, to - from + 2);                
                var raw = this.scriptEngine.Evaluate(sub) as string;
                this.htmlDocument.LoadHtml(raw);
                return HttpUtility.HtmlDecode(this.htmlDocument.DocumentNode.InnerText);
            }
            catch(Exception e)
            {
                return e.ToString();
            }
        }
    }
}
