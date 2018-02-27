import tkinter
from googletrans import Translator
import win32clipboard
import time
import threading

class ClipboardTranslator(object):

    def __init__(self):
        self.root = tkinter.Tk()
        self.root.title('Clipboard Translator')

        self.text = tkinter.Text(self.root, height=10, width=80, font=('Tahoma', 20))
        self.text.pack()

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
                    text.delete(1.0, tkinter.END)
                    text.insert(tkinter.END, result.text)                
            finally:
                time.sleep(0.2)

    def run(self):
        self.t.start()
        self.root.mainloop()

if __name__ == "__main__":
    ClipboardTranslator().run()
