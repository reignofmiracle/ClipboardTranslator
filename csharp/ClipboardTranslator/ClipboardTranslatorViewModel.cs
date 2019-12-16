using ICSharpCode.AvalonEdit.Document;
using Prism.Mvvm;
using Reactive.Bindings;
using System;
using System.Collections.ObjectModel;
using System.ComponentModel.Composition;
using System.Linq;

namespace ClipboardTranslator
{
    [Export]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public class ClipboardTranslatorViewModel : BindableBase, IPartImportsSatisfiedNotification, IDisposable
    {
        private ClipboardObserver clipboardObserver = new ClipboardObserver();
        private GoogleTranslator googleTranslator = new GoogleTranslator();

        public void OnImportsSatisfied()
        {
            this.LanguageList = new ObservableCollection<Tuple<string, string>>(LanguageSupport.LanguageList);
            this.SelectedTranslateFrom.Value = this.LanguageList.FirstOrDefault(v => v.Item2 == "en");
            this.SelectedTranslateTo.Value = this.LanguageList.FirstOrDefault(v => v.Item2 == "ko");

            clipboardObserver.ClipboardText.Subscribe(v => ResultDocument.Text = this.googleTranslator.Translate(v, this.SelectedTranslateFrom.Value.Item2, this.SelectedTranslateTo.Value.Item2) ?? "");
        }

        public void Dispose()
        {
            this.clipboardObserver.Dispose();
        }

        public ObservableCollection<Tuple<string, string>> LanguageList { get; private set; }
        public ReactiveProperty<Tuple<string, string>> SelectedTranslateFrom { get; } = new ReactiveProperty<Tuple<string, string>>();
        public ReactiveProperty<Tuple<string, string>> SelectedTranslateTo { get; } = new ReactiveProperty<Tuple<string, string>>();
        public ReactiveCommand DoSave { get; } = new ReactiveCommand();

        public TextDocument ResultDocument { get; } = new TextDocument();
    }
}
