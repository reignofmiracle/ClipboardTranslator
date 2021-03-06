﻿using System;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Timers;
using System.Windows;

namespace ClipboardTranslator
{
    public class ClipboardObserver : IDisposable
    {
        private Timer timer;

        private Subject<string> clipboardText = new Subject<string>();

        public ClipboardObserver()
        {
            this.timer = new Timer();
            timer.Interval = 100;
            timer.Elapsed += Observe;
            timer.Start();
        }

        public void Dispose()
        {
            this.timer.Stop();
            this.timer.Elapsed -= Observe;
        }

        private void Observe(object sender, ElapsedEventArgs e)
        {
            Application.Current.Dispatcher.Invoke(() => this.clipboardText.OnNext(Clipboard.GetText()));
        }

        public IObservable<string> ClipboardText => this.clipboardText.DistinctUntilChanged();
    }
}
