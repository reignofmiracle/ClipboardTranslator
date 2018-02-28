using NUnit.Framework;
using System.Diagnostics;
using System.Web;

namespace ClipboardTranslator.Unittest.unittest
{
    [TestFixture]
    [Ignore("wait")]
    public class HtmlDecorderTest
    {
        [Test]
        public void Decode()
        {
            Debug.WriteLine(HttpUtility.UrlEncode("<br>test<br>"));
            Debug.WriteLine(HttpUtility.UrlDecode(HttpUtility.UrlEncode("<br>test<br>")));
        }
    }
}
