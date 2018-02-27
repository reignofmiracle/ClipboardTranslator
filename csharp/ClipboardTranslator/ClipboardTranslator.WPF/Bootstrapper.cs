using Prism.Mef;
using Prism.Modularity;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.ComponentModel.Composition.Hosting;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Windows;

namespace ClipboardTranslator.WPF
{
    [Export]
    internal class Bootstrapper : MefBootstrapper
    {
        protected override void ConfigureAggregateCatalog()
        {
            base.ConfigureAggregateCatalog();

            this.AggregateCatalog.Catalogs.Add(new AssemblyCatalog(typeof(Bootstrapper).Assembly));

            Func<string, IEnumerable<string>> GetDirectories = null;
            GetDirectories = (path) =>
            {
                var dirs = Directory.GetDirectories(path);
                return dirs.Concat(dirs.SelectMany(v => GetDirectories(v)));
            };

            Action<string> AddCatalogs = (path) =>
            {
                if (Directory.Exists(path))
                {
                    try
                    {
                        this.AggregateCatalog.Catalogs.Add(new DirectoryCatalog(path));
                    }
                    catch (Exception e)
                    {
                        Debug.WriteLine(e);
                    }
                }
            };

            var directories = GetDirectories(".");
            foreach (var dir in directories) AddCatalogs(dir);
        }

        protected override void ConfigureViewModelLocator()
        {
            base.ConfigureViewModelLocator();

            ViewModelLocationProvider.SetDefaultViewTypeToViewModelTypeResolver(
                t => t.GetTypeInfo().Assembly.GetType(t.FullName + "Model", true));
        }

        protected override IModuleCatalog CreateModuleCatalog()
        {
            return new ConfigurationModuleCatalog();
        }

        protected override DependencyObject CreateShell()
        {
            return this.Container.GetExportedValue<Shell>();
        }

        protected override void InitializeShell()
        {
            base.InitializeShell();

            Application.Current.MainWindow = (Window)this.Shell;
            Application.Current.MainWindow.Show();
        }
    }
}
