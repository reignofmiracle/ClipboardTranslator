import tkinter
from googletrans import Translator
import win32clipboard
import time
import threading

def clipboard_translator(text):
    
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

root = tkinter.Tk()
root.title('Clipboard Translator')

text = tkinter.Text(root, height=10, width=80, font=('Tahoma', 20))
text.pack()

t = threading.Thread(target=clipboard_translator, args=[text])
t.daemon = True
t.start()

root.mainloop()