using NLog;
using Prism.Mef.Modularity;
using Prism.Modularity;
using Prism.Regions;
using System;
using System.ComponentModel.Composition;
using System.Diagnostics;

namespace ClipboardTranslator
{
    [ModuleExport(typeof(ClipboardTranslatorModule))]
    public class ClipboardTranslatorModule : IModule
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();

        [Import]
        private IRegionManager regionManager = null;

        public void Initialize()
        {
            logger.Debug("ClipboardTranslatorModule.Initialize");

            this.regionManager.RequestNavigate("RootRegion", new Uri("/ClipboardTranslatorView", UriKind.Relative), v => Debug.WriteLine(v));
        }
    }
}
