using MahApps.Metro.Controls;
using System.ComponentModel.Composition;
using System.Windows;

namespace ClipboardTranslator.WPF
{
    [Export]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public partial class Shell : MetroWindow
    {
        public Shell()
        {
            InitializeComponent();

            this.Closed += (s, e) => Application.Current.Shutdown();
        }
    }
}
