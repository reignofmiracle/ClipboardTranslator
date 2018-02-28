using System.ComponentModel.Composition;
using System.Windows.Controls;

namespace ClipboardTranslator
{
    [Export(nameof(ClipboardTranslatorView))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public partial class ClipboardTranslatorView : UserControl
    {
        public ClipboardTranslatorView()
        {
            InitializeComponent();

            this.PropertyGrid.SelectedObject = ResultTextEditor;
        }
    }
}
