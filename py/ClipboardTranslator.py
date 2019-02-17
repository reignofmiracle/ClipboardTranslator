import tkinter as tk
from googletrans import Translator
import win32clipboard
import time
import threading

class ClipboardTranslator(object):

    def __init__(self):
        self.root = tk.Tk()
        self.root.title('Clipboard Translator')

        self.scrollbar = tk.Scrollbar(self.root)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        self.text = tk.Text(self.root, height=20, width=40, font=('Tahoma', 20))

        self.text.config(yscrollcommand=self.scrollbar.set)
        self.scrollbar.config(command=self.text.yview)

        self.text.pack(fill=tk.BOTH, expand=1)

        self.t = threading.Thread(target=ClipboardTranslator.worker, args=[self.text])
        self.t.daemon = True

    @staticmethod
    def worker(text):        
        last_text = None
        while True:    
            try:
                win32clipboard.OpenClipboard()
                new_text = win32clipboard.GetClipboardData()                
                if new_text != last_text:
                    last_text = new_text                
                    result = Translator().translate(new_text, dest='ko')
                    text.delete(1.0, tk.END)
                    text.insert(tk.END, result.text)                
            finally:
                win32clipboard.CloseClipboard()
                time.sleep(0.2)

    def run(self):
        self.t.start()
        self.root.mainloop()

if __name__ == "__main__":
    ClipboardTranslator().run()
