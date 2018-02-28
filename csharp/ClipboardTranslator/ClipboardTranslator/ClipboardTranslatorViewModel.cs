using ICSharpCode.AvalonEdit.Document;
using Prism.Mvvm;
using Reactive.Bindings;
using System;
using System.ComponentModel.Composition;

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
            this.TranslateFrom.Value = "en";
            this.TranslateTo.Value = "ko";

            clipboardObserver.ClipboardText.Subscribe(v => ResultDocument.Text = this.googleTranslator.Translate(v, this.TranslateFrom.Value, this.TranslateTo.Value) ?? "");
        }

        public void Dispose()
        {
            this.clipboardObserver.Dispose();
        }

        public ReactiveProperty<string> TranslateFrom { get; } = new ReactiveProperty<string>();
        public ReactiveProperty<string> TranslateTo { get; } = new ReactiveProperty<string>();
        public ReactiveCommand DoSave { get; } = new ReactiveCommand();

        public TextDocument ResultDocument { get; } = new TextDocument();
    }
}
