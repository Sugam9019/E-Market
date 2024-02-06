import smtplib
from email.message import EmailMessage
msg=EmailMessage()
msg.set_content("aaaaaaaaaaaaaaaaaaaaaaaddddddddddddddddddddd")
msg['subject']="abcdefghij"
msg['to']="mytechno062001@gmail.com"
msg['from']="sugamn1ga20cs184@gmail.com"


server=smtplib.SMTP('smtp.gmail.com',587)
server.starttls()
server.login('sugamn1ga20cs184@gmail.com','xahr dmdh lcje cmsx')

# x=server.sendmail('sugamn1ga20cs184@gmail.com','mytechno062001@gmail.com',("Nmae : sugam ") )
server.send_message(msg)
server.quit()
