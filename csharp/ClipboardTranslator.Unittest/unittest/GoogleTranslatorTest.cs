using NUnit.Framework;
using System.Diagnostics;

namespace ClipboardTranslator.Unittest.unittest
{
    [TestFixture]
    //[Ignore("wait")]
    public class GoogleTranslatorTest
    {
        [Test]
        public void Translate()
        {
            var testObj = new GoogleTranslator();
            var ret = testObj.Translate(@"There seems to be some controversy about the advantages of static vs.
dynamic and strong vs. weak typing. Let me illustrate these choices
with a thought experiment. Imagine millions of monkeys at computer
keyboards happily hitting random keys, producing programs, compiling,
and running them.", "en", "ko");
            Debug.WriteLine(ret);
        }
    }
}
